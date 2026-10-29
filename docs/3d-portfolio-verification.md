# 3D portfolio verification · 2026-10-29

## Content

- Used the résumé last modified on 2026-10-09, newer than the September PDFs. Reviewed the source DOCX directly and compared project metrics, paper titles, roles, and dates.
- Included seven research/engineering projects and two coauthored papers. Kept fitting RMSE, simulation results, fixed-scenario experiments, and physical/logic validation scopes explicit.
- Verified GitHub account `gitcaka` and four public demo/repository pairs. Captured real screenshots. Helmet Vision uses its public login screen because the demo dashboard lacks a map key. All four links are labeled as static demos.
- No original résumé file, phone number, date of birth, or political affiliation is included in public assets.

## Validation performed

- TypeScript check and Oxlint passed.
- Sites production build completed; Three.js is lazy imported. The build reports a large-chunk notice for the 3D library.
- 18 desktop browser checks passed: WebGL canvas, drag rendering, zoom rendering, topic selection, filters, all screenshot assets, language switch and persistence, latest résumé, navigation and horizontal overflow.
- Six 390 px touch/mobile checks passed: layout, topic selection, native menu link to résumé, résumé width, filters and light theme.
- Production Worker tested locally with Wrangler: HTTP 200, real WebGL rendering, monitor/robot raycast selection, résumé navigation, reduced-motion behavior and WebGL fallback. Normal runtime had no browser errors.
- Chinese résumé printed to two A4 pages; both rendered pages visually reviewed. Print styles force a light page and keep project entries together.
- All original routes remain. Desktop and mobile internal navigation use native anchors.

The validation scripts, screenshots, and print PDF are retained in the parent task workspace, outside the deployable project.

## Publication state

The existing Sites project `appgprj_6a9334d2beb08191aac9725a9dcf62c5` returned `NOT_FOUND` from both site lookup and source-repository credential creation. No production update was made. The source, dependencies, and build are ready for publication when access to the existing project is restored. The existing project ID and public audience have not been replaced.
