# 曹武康 · 3D 个人主页

中英文求职作品集。React 19、Vinext / Vite、Three.js；公开页面不依赖数据库。

## 本地运行

需要 Node.js 22.13 或更高版本。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址（默认 http://localhost:3000）。验证：

```sh
npx tsc --noEmit
npm run lint
npm run build
```

## 内容维护

- `content/portfolio.ts`：GitHub 作品、演示链接、截图、简历项目与内容日期。
- `content/projects.ts`：研究与工程项目详情，保留原有 slug，避免破坏分享链接。
- `content/outputs.ts`：论文准确标题、合著信息与竞赛成果。
- `content/profile.ts` / `contact.ts`：个人介绍与公开联系方式。
- `components/portfolio-scene.tsx`：程序化 3D 机器人、车辆、显示屏与交互，不需要额外模型资源。
- `app/portfolio.css`：3D 首页、简历页与打印样式。
- `public/media/`：实际公开演示截图，替换后保持相同文件名即可。

简历内容依据 2026-10-09 更新的最新版 DOCX 整理。原始简历含私人信息，不放入公开资源目录。`/resume` 提供双语网页简历，可通过浏览器打印保存为 PDF。更新项目指标时同时核对其测试范围，不能把仿真结果、拟合误差或逻辑测试写成实车全流程指标。

## 交互与兼容

- 拖动 3D 视图旋转；使用 + / − 缩放、复位、暂停；点击机器人、车辆、显示屏选择方向。
- 画布获得焦点后可用左右方向键旋转，画布下方按钮也可直接切换方向。
- 尊重系统减少动态效果偏好；离屏和后台暂停渲染；不支持 WebGL 时保留完整作品与简历入口。
- 内部导航使用 `FullPageLink` 原生链接，以兼容当前 Vinext 托管环境。
- GitHub Pages 作品明确标为静态演示，后台检测能力以各仓库说明及本地运行结果为准。

## 发布

保留 `.openai/hosting.json` 中的现有 Sites 项目归属。发布使用 Sites 插件提供的临时源代码仓库凭据、构建打包及部署流程；不要将凭据写入文件。2026-10-29 调用原项目时返回 `NOT_FOUND`，需要恢复该站点的托管访问后再更新原公开地址。
