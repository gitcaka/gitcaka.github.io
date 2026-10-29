import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gitcaka.github.io';
const result = spawnSync(
  process.execPath,
  [resolve(root, 'node_modules/vinext/dist/cli.js'), 'build'],
  {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      GITHUB_PAGES: 'true',
      NEXT_PUBLIC_SITE_URL: siteUrl,
    },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = resolve(root, 'dist/client');
const htmlFiles = [];
function collectHtml(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('_') &&
      !entry.name.startsWith('.')
    )
      collectHtml(file);
    else if (entry.isFile() && entry.name.endsWith('.html'))
      htmlFiles.push(file);
  }
}
collectHtml(output);
const routes = new Set(['/']);
// Vinext beta.5 redirects its prerender requests with trailingSlash enabled.
// Export normally, then add directory indexes for GitHub Pages deep links.
for (const file of htmlFiles) {
  const routeFile = relative(output, file).replaceAll('\\', '/');
  if (routeFile === '404.html' || routeFile === 'index.html') continue;
  const route = routeFile.replace(/(?:\/index)?\.html$/, '');
  const directory = resolve(output, route);
  mkdirSync(directory, { recursive: true });
  if (!routeFile.endsWith('/index.html'))
    copyFileSync(file, resolve(directory, 'index.html'));
  routes.add(`/${route}/`);
}
const base = siteUrl.replace(/\/$/, '');
writeFileSync(
  resolve(output, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
);
writeFileSync(
  resolve(output, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...routes,
  ]
    .sort()
    .map((route) => `  <url><loc>${base}${route}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
for (const file of [
  'index.html',
  'resume/index.html',
  'projects/index.html',
  'projects/ros-mobile-manipulator-logistics/index.html',
  'media/highway.png',
  'og.png',
  '404.html',
  'robots.txt',
  'sitemap.xml',
]) {
  if (!existsSync(resolve(output, file)))
    throw new Error(`Missing static output: ${file}`);
}
const homepage = readFileSync(resolve(output, 'index.html'), 'utf8');
if (!homepage.includes('room-canvas'))
  throw new Error('Static homepage does not contain the 3D studio');
if (!homepage.includes(siteUrl))
  throw new Error('Static homepage metadata has an unexpected site URL');
writeFileSync(resolve(output, '.nojekyll'), '');
console.log(`GitHub Pages output ready: ${output}`);
console.log(`Exported ${routes.size} page routes.`);
