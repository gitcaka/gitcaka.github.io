# 曹武康 · 3D 个人主页

可探索的全屏 3D 工作室，中英文求职作品集。简历与名片放在桌面，机器人、小车、相机、显示器和书架物件连接实际项目。React 19、Vinext / Vite、Three.js；公开页面不依赖数据库。

## 本地运行

需要 Node.js 22.13 或更高版本。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址（默认 http://localhost:3000）。验证：

```sh
npx tsc --noEmit
npm run build
```

## 内容维护

- `content/portfolio.ts`：GitHub 作品、演示链接、截图、简历项目与内容日期。
- `content/projects.ts`：研究与工程项目详情，保留原有 slug，避免破坏分享链接。
- `content/outputs.ts`：论文准确标题、合著信息与竞赛成果。
- `content/profile.ts` / `contact.ts`：个人介绍与公开联系方式。
- `content/room.ts`：11 个场景物件的双语标签、提示与项目 slug 映射。
- `lib/room-world.ts`：程序化房间、家具、可拾取物件、贴图、昼夜灯光与资源释放，不需要外部模型。
- `components/room-scene.tsx`：镜头、鼠标/触屏拾取、动画、物件标记与 WebGL 生命周期。
- `components/pages/home-page.tsx`：房间 HUD、物件目录、原生阅读对话框及内容连接。
- `app/room.css`：全屏工作室、移动布局、阅读器与嵌入简历打印样式。
- `app/portfolio.css`：独立简历页、项目详情与共用内容样式。
- `public/media/`：实际公开演示截图，替换后保持相同文件名即可。

简历内容依据 2026-10-09 更新的最新版 DOCX 整理。原始简历含私人信息，不放入公开资源目录。`/resume` 提供双语网页简历，可通过浏览器打印保存为 PDF。更新项目指标时同时核对其测试范围，不能把仿真结果、拟合误差或逻辑测试写成实车全流程指标。

## 交互与兼容

- 首页就是整个 3D 房间。拖动环顾，滚轮或双指缩放；全景、工作台、机器人角、作品架提供四个镜头位置。
- 点击实体或编号查看内容：简历/名片离开桌面并面向视线，其他物件通过镜头靠近；关闭阅读器或按 Esc 后放回，动画完成前锁定再次拾取。
- 作品显示器包含四个公开 Web 演示；机器人、小车、相机、路锥、地图和相框对应七个工程项目；书架展示论文和荣誉。
- 画布焦点下左右方向键旋转、加减键缩放。物件目录提供全部入口，原生 dialog 管理阅读焦点，关闭后恢复到入口。
- 尊重系统减少动态效果偏好，后台暂停渲染；WebGL 不可用时仍可通过目录阅读全部内容与简历。
- 内部导航使用 `FullPageLink` 原生链接，以兼容当前 Vinext 托管环境。
- GitHub Pages 作品明确标为静态演示，后台检测能力以各仓库说明及本地运行结果为准。

## GitHub Pages

公开主页：https://gitcaka.github.io/ 。源码仓库：https://github.com/gitcaka/gitcaka.github.io 。

```sh
npm run build:pages
```

该命令以静态模式构建，校验页面和资源，并生成 `dist/client/`。GitHub Actions 在 `main` 分支更新后自动完成类型检查、构建及 Pages 部署，也可从 Actions 手动运行。只发布 `dist/client/`，不需要后台服务、数据库或额外部署密钥。

当前 Vinext beta 的尾斜杠预渲染会触发重定向，因此构建脚本在导出后补充目录索引，使 `/resume/` 和项目详情支持直接访问、刷新；同时生成 sitemap、robots 和 `.nojekyll`。`NEXT_PUBLIC_SITE_URL` 可覆盖站点地址。GitHub Pages 使用根域名仓库，不需要为静态资源添加项目路径前缀。

## 原 Sites 部署

保留 `.openai/hosting.json` 中的现有 Sites 项目归属。发布使用 Sites 插件提供的临时源代码仓库凭据、构建打包及部署流程；不要将凭据写入文件。2026-10-29 调用原项目时返回 `NOT_FOUND`，需要恢复该站点的托管访问后再更新原公开地址。
