# 会员头像与会员数据发布

代码和私人数据分开交付。GitHub 只保存程序；会员手机号、密码哈希、头像分配和课件通过私有数据包迁移，不能上传到公开仓库或网站公开目录。

## 2026-09-30 数据范围

- 107 个真实账号（106 个签到表账号和刘向本人），38 份无手机号档案，共 145 人。
- AI 俱乐部 141 人，FDE 联盟 4 人。
- 145 张固定分配的 WebP 头像，320×320，约 1.9 MB；原始照片未修改。
- 3 份课件和 3 份标为演示的案例。正式模式不开放演示案例下载。
- 不含 3 个隐藏测试账号、登录会话、测试邀请码、限流记录或原始签到表。
- 原资料仍有 38 人缺手机号、95 人缺行业、67 人缺城市；未虚构补齐。
- 对其他会员返回的姓名已打码，后台与本人基本资料仍保留完整姓名。

## 数据包与演练

需要 Node.js >= 22.13。在受保护的本地目录执行，输出目录必须是新目录：

```sh
node scripts/community-transfer.mjs export data/preview.db /private/new-member-bundle
```

包内 `manifest.json` 包含文件大小及 SHA-256。`members.json` 含私人资料和密码哈希。头像与课件与资料一起校验。导出时只复制可见、有效的 145 份档案，使用当前已核对的数量作为防误导出检查。

导入先检查（不会修改数据库）：

```sh
node scripts/community-transfer.mjs import /private/new-member-bundle /actual/data/bluefin.db
```

确认服务器真实持久数据路径、旧站备份与回退镜像后，在维护窗口执行：

```sh
node scripts/community-transfer.mjs import /private/new-member-bundle /actual/data/bluefin.db --apply
```

导入会备份已存在的数据库，保留其他表。匹配到已有账号时保留密码、分组、展示状态和已填资料，只补空字段。重复执行不会创建重复成员。现存同名资源内容不同会停止，不会静默覆盖。身份冲突会停止，不能直接替换生产库。

Docker 环境中真实数据库为命名卷 `bluefin-ai-fde-data` 中的 `/app/data/bluefin.db`。数据包和迁移脚本需经 SSH 私有传输；使用 Node 容器时按 UID/GID 1001 保证卷内文件可读写。不要把整个本地 data 目录覆盖到生产卷。部署前暂停会员写入，避免导入检查和提交期间发生修改。

## 正式切换

1. 核对正在运行的提交、Compose 项目、域名、环境变量、持久卷和容器；备份旧程序配置、镜像及完整数据卷。
2. 将已校验代码与私有数据包传到服务器；先检查迁移计划，再在维护窗口导入。
3. 保留正式管理员凭据与邀请码。设置 SITE_URL=https://lqy-ai.com、PREVIEW_MODE=false、SECURE_COOKIES=true。
4. 按 README 使用 `bash scripts/deploy-aliyun.sh` 构建、备份并更新服务。不得运行 `docker compose down -v`。
5. 验证域名及 HTTPS、健康接口、公开页面、robots/sitemap/canonical、141/4 分组数量、登录、头像、三份课件、后台导出、匿名及跨组访问限制。核对 www 域名证书与跳转。
6. 保留回退镜像和数据备份。恢复数据库前暂停写入，单独保全切换后新增记录。

当前本机已完成私有迁移演练及预览端验证；没有可用 SSH 凭据、阿里云 CLI 配置或 GitHub Actions 部署工作流，尚未执行正式服务器部署。GitHub 更新不等于正式站已上线。
