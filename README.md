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
- Tailwind CSS 4
- Node.js 内置 SQLite
- Drizzle ORM
- Docker Compose / Caddy
- 阿里云 ECS 自托管

## 阿里云部署（推荐）

当前仓库已经按“单台阿里云 ECS、先让官网完整运行”的目标配置完成：

- `web` 容器运行 Next.js standalone 生产服务
- `caddy` 容器提供反向代理、压缩和自动 HTTPS
- SQLite 保存申请、漏斗、GEO 和证据数据
- 数据库保存在 Docker 持久卷 `bluefin-ai-fde-data`，重新构建容器不会删除数据
- `/operations` 和 `/api/operations` 使用管理员邮箱、密码保护

2 核 2 GB、40 GB 系统盘足够运行。生产构建需要较多内存，建议先增加 2 GB swap。

### 1. 准备服务器

安全组放行 TCP `22`、`80`、`443`，不需要放行 `3000`。以下命令适用于 Ubuntu/Debian：

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2 git
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```

退出 SSH 后重新登录，使 Docker 用户组生效。

为 2 GB 内存的服务器增加 2 GB swap：

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

### 2. 下载并配置

```bash
git clone https://github.com/AmadeusGB/bluefin-ai-fde.git
cd bluefin-ai-fde
cp .env.example .env
nano .env
```

域名还没有解析时，可以先用公网 IP：

```env
SITE_URL=http://你的ECS公网IP
SITE_ADDRESS=:80
DATABASE_PATH=./data/bluefin.db
OPERATIONS_ADMIN_EMAIL=你的管理员邮箱
OPERATIONS_ADMIN_PASSWORD=至少24位的随机密码
```

生成随机密码可以执行：

```bash
openssl rand -base64 32
```

`.env` 不会提交到 Git。

### 3. 一键部署

```bash
npm run deploy:aliyun
```

如果服务器没有安装 Node/npm，也可以直接执行：

```bash
bash scripts/deploy-aliyun.sh
```

部署脚本会检查 Docker、环境变量和可用内存，构建镜像、启动服务并验证数据库健康状态。之后访问：

```text
http://你的ECS公网IP
http://你的ECS公网IP/api/health
```

IP 阶段只验证公开页面和健康接口。HTTP Basic 凭据必须通过 HTTPS 传输，不要在纯 HTTP 地址登录 `/operations`。

### 4. 绑定域名和 HTTPS

将域名的 A 记录解析到 ECS 公网 IP。DNS 生效后修改 `.env`：

```env
SITE_URL=https://www.your-domain.com
SITE_ADDRESS=www.your-domain.com
```

重新运行：

```bash
bash scripts/deploy-aliyun.sh
```

Caddy 会自动申请并续期 HTTPS 证书。`SITE_URL` 会写入 canonical、Open Graph、JSON-LD、`robots.txt`、`sitemap.xml` 和 `llms.txt`，所以更换域名后必须重新构建。

HTTPS 生效后，访问 `https://www.your-domain.com/operations`，使用 `.env` 中的管理员邮箱和密码登录。

如果服务器位于中国大陆，域名公开访问前需要完成 ICP 备案；已有备案但原接入商不是阿里云时，需要按实际情况办理新增接入。

### 5. 更新、日志与备份

更新官网：

```bash
git pull --ff-only
bash scripts/deploy-aliyun.sh
```

查看运行状态和日志：

```bash
docker compose ps
docker compose logs -f --tail=200 web
docker compose logs -f --tail=200 caddy
```

备份 SQLite：

```bash
npm run backup:db
```

备份会短暂停止 Web 容器，以确保 SQLite 主文件和 WAL 一致，然后将压缩包保存到 `backups/`。建议再把该目录定期同步到 OSS。恢复前应先停止容器，并保留当前数据卷的副本。

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

默认开发地址通常为 <http://localhost:3000>。本地数据库默认保存在 `data/bluefin.db`。

### 常用命令

```bash
npm run dev          # 本地开发
npm run build        # Next.js 生产构建
npm run start        # 启动 Next.js 生产服务器
npm run deploy:aliyun # Docker 一键构建并部署
npm run backup:db    # 备份生产 SQLite 数据卷
npm run lint         # 静态检查
npm run format       # 代码格式化
npm run db:generate  # 根据 schema 生成 Drizzle 迁移
```

## 环境变量

| 变量 | 是否必需 | 用途 |
| --- | --- | --- |
| `SITE_URL` | 是 | 网站公开地址，用于 canonical、sitemap 和结构化数据 |
| `SITE_ADDRESS` | 是 | Caddy 监听地址；首次 IP 部署用 `:80`，域名部署填写域名 |
| `DATABASE_PATH` | 是 | 本地 SQLite 文件位置；Docker 会覆盖为 `/app/data/bluefin.db` |
| `OPERATIONS_ADMIN_EMAIL` | 是 | `/operations` 管理员用户名 |
| `OPERATIONS_ADMIN_PASSWORD` | 是 | `/operations` 管理员密码，建议至少 24 位随机字符 |

生产环境变量保存在服务器 `.env` 中，不应提交到 Git。

## 目录结构

```text
app/          页面、API、robots、sitemap 与 llms.txt
components/   页面模块、交互工具和 UI 组件
db/           SQLite 访问、初始化与数据表定义
drizzle/      数据库迁移
lib/          诊断、GEO、证据、归因和知识图谱逻辑
public/       品牌、活动和培训图片资源
deploy/       Caddy 反向代理配置
scripts/      阿里云部署与 SQLite 备份脚本
```

## 数据与隐私

- 诊断申请、漏斗事件、GEO 测量和证据记录存储在持久化 SQLite。
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
6. 运行数据库备份后再更新生产容器

当前公开的 OpenAI Sites 版本可以继续保留，但本分支的生产运行目标已经切换为阿里云 Node.js + SQLite。`.openai/hosting.json` 仅保留原站点关联信息，不参与阿里云部署。

## Git 远程仓库

- `github`：本 GitHub 私有仓库，用于源码备份、协作与版本管理
- `origin`：Sites 内部源码仓库，用于现有公开网站发布

不要删除或覆盖 `origin`，否则可能影响后续 Sites 发布流程。

## 授权

本仓库为深圳市蓝旗鱼科技有限公司的私有项目，未附带开源许可证。未经明确书面许可，不得复制、分发或对外发布仓库内容。
