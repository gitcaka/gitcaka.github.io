# 曹武康个人主页内容待补清单

页面只会展示已经确认的真实信息。以下字段当前为空，因此相关按钮、链接或栏目已自动隐藏。

## P0：上线前优先补充

- [ ] 确认英文姓名格式是否固定为 `Wukang Cao`。修改位置：`content/profile.ts`
- [ ] 提供公开邮箱。修改位置：`content/contact.ts` 的 `email`
- [ ] 提供 GitHub 主页。修改位置：`content/contact.ts` 的 `github`
- [ ] 提供最新版简历 PDF，放入 `public/media/`，再修改 `content/profile.ts` 的 `resume`
- [ ] 提供正式网站域名或确认部署域名。部署环境变量：`NEXT_PUBLIC_SITE_URL`
- [ ] 人工复核所有英文项目名称、职责和研究表述。修改位置：`content/*.ts`

## P1：显著提升可信度与完整性

- [ ] 学校与学院名称。建议新增到 `content/profile.ts` 或新建 `content/education.ts`
- [ ] 当前学历与教育经历起止时间。建议新建 `content/education.ts`
- [ ] 导师姓名及是否允许公开。建议新建 `content/education.ts`
- [ ] 个人头像；如不提供，网站继续使用 WC 抽象标识。文件位置：`public/media/profile/`
- [ ] Google Scholar、ORCID、LinkedIn 或其他学术主页。修改位置：`content/contact.ts`
- [ ] 微信二维码及是否允许公开。文件位置：`public/media/contact/`，配置位置：`content/contact.ts`

## P1：项目证据材料

每张图片请同时给出可公开确认、简短说明和推荐顺序。文件建议放在 `public/media/projects/<项目 slug>/`，配置位于 `content/projects.ts`。

- [ ] 协同感知项目：系统结构图、实验流程图、真实实验图或仿真图
- [ ] DiffusionDrive 项目：方法流程图、NAVSIM 或相关评测截图
- [ ] 高速公路抛洒物项目：平台截图、架构图、获奖证书
- [ ] Apollo 项目：仿真截图、关键场景示意图
- [ ] ROS 2 机器人项目：机器人照片、识别和抓取过程图
- [ ] 嵌入式项目：硬件照片、示波器图或系统连接图
- [ ] 可公开项目仓库、演示视频、项目主页或报告链接。修改位置：`content/projects.ts` 中各项目的 `repository`、`demo`、`paper`

## P2：成果与经历

- [ ] 真实论文或在研稿件信息：标题、作者、年份、状态、摘要、链接。修改位置：`content/outputs.ts`
- [ ] 专利、技术报告或开源软件信息。修改位置：`content/outputs.ts`
- [ ] 获奖证书图片与官方比赛名称确认。修改位置：`content/outputs.ts` 和项目媒体目录
- [ ] 科研、竞赛和工程经历的明确时间。修改位置：`content/experience.ts`
- [ ] 实习、奖学金或其他经历仅在确认可公开后添加。修改位置：`content/experience.ts`

## P2：技术笔记

- [ ] 将真实文章写入 `content/notes/`，参考 `draft-writing-template.md`
- [ ] 在 `content/notes.ts` 登记标题、日期、摘要、标签和阅读时间
- [ ] 完成复核后将 `published` 改为 `true`

## 内容安全提醒

- 不要把密码、Token、API Key、数据库地址、服务器 IP、SSH 信息、私有数据或本地绝对路径写进前端内容文件。
- `.env` 只用于本地环境变量，并保持在 `.gitignore` 中。
- 项目指标、论文状态和获奖级别必须有可公开核对的真实依据。
