# 大向人生指南接入记录（2026-10-14）

## 内容与入口

- 用户指定源文件：D:\codex\AI培训课程\output\孙哥访谈_大向人生指南_20261014\孙哥访谈-大向人生指南.html
- 源文件 SHA256：c9d5fd1bd79eb0e934594b1d5c46e3e22d0b42edba126113f7b1a0bfcf9a7fee
- 目标页面：/library/daxiang-life-guide.html
- 入口：知识库首条“孙宇晨访谈—大向人生指南”。
- 保留原文件正文、样式、互动工具、内嵌介绍海报与二维码；新增返回知识库 / AI 世界链接、canonical 与分享元数据。隔离本页清单存储键。
- 已加入 siteContent，所以 sitemap、llms.txt、内容索引可发现页面。使用条目独立更新时间，不变更其他文章的日期。

## 验证与发布状态

本地生产构建、针对修改 TS 文件的 oxlint、git diff --check 通过。页面、知识库、sitemap、llms.txt、内容索引全部 200，含新页面路径；站点地图 79 个公开 URL 均 200。浏览器已验证知识库往返、勾选计数和筛选器分数更新，已保存预览截图。源文件保持原样。

正式部署已完成：应用版本 3c8b332a649241eb18162013d7c56181d129bc92，发布脚本输出 RELEASE_OK。GitHub 直连失败后，通过 Workbench 上传经过 SHA256 核验的增量 Git bundle，使用原有受保护发布流程完成更新。PREVIEW_MODE=false，保留服务器 package-lock.json 改动与 SQLite 持久卷。

正式验收：新页面、知识库、sitemap、llms.txt、内容索引、健康接口及注册页均 200；正式 HTML 与 Git 提交文件逐字节一致（本机工作文件仅换行不同），包含两张内嵌图和正确 canonical。浏览器从知识库入口打开手册成功，已保存上线截图。发布前后账号均 club 103、fde 4。数据库备份 backups/bluefin-db-20261014-134621.tar.gz；回退与发布记录保存在 /home/admin/bluefin-release-bULa0dJZ。

