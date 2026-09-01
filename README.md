# 蓝旗鱼 AI｜企业 AI 落地与 FDE

蓝旗鱼 AI 面向中国企业提供 Forward Deployed Engineering（FDE）落地服务：进入真实业务现场，识别高价值问题，用真实数据完成最小可行部署（MVD），并将结果沉淀为可长期运营和复制的系统能力。

**公开网站：<https://bluefin-ai-fde.liuxiangth.chatgpt.site>**

> 法律主体：深圳市蓝旗鱼科技有限公司  
> 核心方法：诊断 → MVD → 生产部署 → 采用 → 复制

## 项目现状

这是蓝旗鱼 AI 官网的正式源码仓库。网站同时承担五项职能：

- FDE 品类定义与品牌表达
- 方法、案例和证据的可信发布
- 企业 AI 业务诊断与线索转化
- 面向搜索引擎和生成式搜索的 GEO 内容中枢
- 诊断、交付、验收和复查工具的公开入口

当前公开内容包括 FDE 定义、交付方法、行业解决方案、知识库、问答页、证据体系、研究方法和生产验收工具。未获得客户授权或可核验数据的内容不会包装成成功案例。

## GEO 与机器入口

网站正文由服务端输出为可抓取 HTML，并提供以下公开入口：

- [robots.txt](https://bluefin-ai-fde.liuxiangth.chatgpt.site/robots.txt)：允许百度、字节、搜狗、360、神马、Google、Bing 和 OAI 搜索爬虫
- [sitemap.xml](https://bluefin-ai-fde.liuxiangth.chatgpt.site/sitemap.xml)：公开页面清单
- [llms.txt](https://bluefin-ai-fde.liuxiangth.chatgpt.site/llms.txt)：面向模型的站点与核心内容说明
- [知识图谱 API](https://bluefin-ai-fde.liuxiangth.chatgpt.site/api/knowledge-graph)：Organization、Service、DefinedTerm、HowTo 等实体关系
- [FDE 问答](https://bluefin-ai-fde.liuxiangth.chatgpt.site/answers)：面向真实决策问题的直接回答
- [案例与证据](https://bluefin-ai-fde.liuxiangth.chatgpt.site/evidence)：证据等级、授权边界与案例模板
- [生产验收清单](https://bluefin-ai-fde.liuxiangth.chatgpt.site/tools/production-acceptance-checklist)：可读页面及 JSON/CSV 数据

GEO 工程只能证明网站具备被发现、抓取、理解和引用的条件。豆包、千问、DeepSeek 等平台的实际提及率和引用率，需要通过固定查询集持续测量，不能由站点结构直接推断。

## 技术栈

- Node.js 22.13+
- React 19
- TypeScript 5
- Next.js 16（App Router）
- OpenNext for Cloudflare
- Tailwind CSS 4
- Cloudflare Workers / D1
- Drizzle ORM
- OpenAI Sites 托管

## 本地开发

### 环境要求

- Node.js `>=22.13.0`
- npm

### 启动

```bash
npm ci
cp .env.example .env.local
npm run dev
```

默认开发地址通常为 <http://localhost:3000>。本地 D1 绑定由 OpenNext for Cloudflare、Wrangler 和 `.openai/hosting.json` 共同配置。

### 常用命令

```bash
npm run dev          # 本地开发
npm run build        # Next.js 生产构建
npm run build:worker # 生成 Cloudflare / Sites 部署产物
npm run start        # 启动 Next.js 生产服务器
npm run lint         # 静态检查
npm run format       # 代码格式化
npm run db:generate  # 根据 schema 生成 Drizzle 迁移
```

## 环境变量

| 变量 | 是否必需 | 用途 |
| --- | --- | --- |
| `OPERATIONS_ADMIN_EMAIL` | 否 | 允许匹配的已认证 Sites 用户访问 `/operations` 运维后台 |

公开页面不依赖该变量。生产环境变量应配置在托管平台中，不应提交到 Git。

## 目录结构

```text
app/          页面、API、robots、sitemap 与 llms.txt
components/   页面模块、交互工具和 UI 组件
db/           D1 访问与数据表定义
drizzle/      数据库迁移
lib/          诊断、GEO、证据、归因和知识图谱逻辑
public/       品牌、活动和培训图片资源
.openai/      Sites 项目标识与资源绑定
```

## 数据与隐私

- 诊断申请、漏斗事件、GEO 测量和证据记录存储在 D1。
- 页面来源统计使用聚合事件，不建立访客画像。
- 不在 Git 中保存真实联系人、运行时数据库、密码、Token 或私钥。
- 数据收集范围和用途以网站的[隐私说明](https://bluefin-ai-fde.liuxiangth.chatgpt.site/privacy)为准。

## 发布与验证

正式发布前至少完成：

1. `npm ci`
2. `npm run build`
3. 检查 `git diff --check`
4. 验证关键页面、API、robots.txt、sitemap.xml 和 llms.txt 返回成功
5. 抓取 sitemap 中全部公开 URL，确认没有异常状态码
6. 提交源码并保存 Sites 版本后再部署

当前公开站由 OpenAI Sites 托管；`.openai/hosting.json` 中的 `project_id` 用于关联既有站点，不能替换为新项目 ID。

## Git 远程仓库

- `github`：本 GitHub 私有仓库，用于源码备份、协作与版本管理
- `origin`：Sites 内部源码仓库，用于现有公开网站发布

不要删除或覆盖 `origin`，否则可能影响后续 Sites 发布流程。

## 授权

本仓库为深圳市蓝旗鱼科技有限公司的私有项目，未附带开源许可证。未经明确书面许可，不得复制、分发或对外发布仓库内容。
