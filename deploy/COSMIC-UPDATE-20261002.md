# 2026-10-02 入口与会员空间视觉更新

## 本次变化

- /world：夜海背景、原版蓝旗鱼标志、圆润大字、三个立体入口和鼠标倾斜反馈。
- /members：原有名录每页 12 人，缓慢椭圆轨道、暂停、键盘焦点停转、资料弹窗、城市筛选、搜索与列表切换。
- 760px 以下使用可点击的静态会员网格；减弱动态效果时停止轨道，页面离屏或隐藏时不运行循环。
- 继续使用原有鉴权、姓名掩码、头像接口和课件。未修改数据库结构或导入会员。

## 验证

Next 生产构建、相关文件 oxlint、git diff --check 通过。
浏览器完成轨道/暂停/弹窗/Esc/翻页/搜索空状态/城市筛选/列表往返/减弱动态效果检查。
/world 和 /members 在 320、375、414、768、1440px 无横向溢出；头像和品牌图片正常。
本地既有俱乐部账号登录成功，141 位可见俱乐部成员，课件下载 200，匿名会员接口 401，API 不含手机号或密码字段。
公开页面、健康接口、sitemap、robots、llms 均 200；首屏正文和正式域名 canonical 保留服务端输出。
未进行真实中端手机帧率测量。

## 发布状态

2026-10-02 已在阿里云正式部署应用版本 `4c04d23`，包含入口、会员空间及两套页面布局的导航修正。正式地址：https://lqy-ai.com/world 。

通过已登录的 Workbench 执行仓库部署脚本。正式域名健康接口返回 200，知识库、文章、企业服务、登录页面返回 200，匿名会员接口仍为 401。浏览器实测知识库导航 20px、返回按钮 18px、底框生效，返回 AI 世界跳转成功。

发布前后会员账号计数一致：club 103、fde 4；本次没有导入、删除或修改会员账号。数据库备份：`backups/bluefin-db-20261002-110202.tar.gz`。回退镜像：`bluefin-ai-fde-web:rollback-20261002-110038`。配置、日志及计数记录：`/home/admin/bluefin-release-uzmMnw7w`。保留服务器原有 package-lock.json 本地改动。

发布辅助脚本曾遇到 root 所有备份目录不可写及旧 curl 不支持参数，均已修正；部署本身成功后通过独立检查完成验证。本次没有重新验证真实账号密码登录。

生产目录：/home/admin/bluefin-ai-fde
目标分支：codex/bluefin-ai-world

恢复服务器连接后，先核对工作区无未提交改动、SITE_URL=https://lqy-ai.com、PREVIEW_MODE=false，以及持久卷 bluefin-ai-fde-data。保留当前镜像作为回退版本。然后在已有仓库按以下方式更新：

```bash
cd /home/admin/bluefin-ai-fde
git status --short
git fetch origin codex/bluefin-ai-world
git merge --ff-only origin/codex/bluefin-ai-world
bash scripts/deploy-aliyun.sh
```

若存在本地改动或不能快进则停止并核对，不能强制覆盖。部署脚本会构建、备份已有数据库并更新容器。禁止删除命名卷，禁止把本机 data 目录覆盖到服务器。
部署后验证 /world、会员登录、头像、筛选和课件下载，再确认正式上线。

## 新素材

public/world/ocean-night.webp，使用内置 imagegen 生成，后用 sharp 转成 WebP。
生成提示词：宽幅 3:1 的深蓝紫夜海背景；左侧留暗色文字空间，右侧留品牌标志叠放空间；远山和低对比海面倒影；无文字、无 Logo、无人物。
品牌标志和会员头像均沿用原资产。
