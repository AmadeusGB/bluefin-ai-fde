#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v docker >/dev/null 2>&1; then
  echo "未找到 Docker。请先按 README 的阿里云部署章节安装 Docker。" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "未找到 Docker Compose v2（docker compose）。" >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "已生成 .env。请填写域名、管理员邮箱和密码后重新执行。" >&2
  exit 1
fi

if grep -q 'replace-with-a-long-random-password\|www.example.com' .env; then
  echo ".env 仍包含示例值，请先修改后重新执行。" >&2
  exit 1
fi

for key in SITE_URL OPERATIONS_ADMIN_EMAIL OPERATIONS_ADMIN_PASSWORD; do
  value=$(grep -m1 "^${key}=" .env | cut -d= -f2- || true)
  if [[ -z "$value" ]]; then
    echo ".env 缺少 ${key}。" >&2
    exit 1
  fi
done

admin_password=$(grep -m1 '^OPERATIONS_ADMIN_PASSWORD=' .env | cut -d= -f2-)
if (( ${#admin_password} < 24 )); then
  echo "OPERATIONS_ADMIN_PASSWORD 至少需要 24 个字符。" >&2
  exit 1
fi

available_kib=$(awk '/MemAvailable/ {print $2}' /proc/meminfo 2>/dev/null || echo 0)
swap_kib=$(awk '/SwapTotal/ {print $2}' /proc/meminfo 2>/dev/null || echo 0)
if (( available_kib + swap_kib < 1800000 )); then
  echo "警告：可用内存和交换空间不足约 1.8 GiB，Docker 构建可能失败。"
  echo "请先按 README 为服务器增加 2 GiB swap，再重新部署。"
  exit 1
fi

available_disk_kib=$(df -Pk . | awk 'NR==2 {print $4}')
if (( available_disk_kib < 6000000 )); then
  echo "可用磁盘不足约 6 GB，请先清理磁盘再构建。" >&2
  exit 1
fi

docker compose build
if docker compose ps --status running --services | grep -qx web; then
  bash scripts/backup-sqlite.sh
fi
docker compose up -d --remove-orphans
docker compose ps
docker compose exec -T web node -e \
  "fetch('http://127.0.0.1:3000/api/health').then(async r=>{console.log(await r.text());if(!r.ok)process.exit(1)}).catch(error=>{console.error(error);process.exit(1)})"
echo "部署完成。"
