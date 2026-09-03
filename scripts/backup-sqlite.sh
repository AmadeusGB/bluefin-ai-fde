#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p backups
backup_file="bluefin-db-$(date +%Y%m%d-%H%M%S).tar.gz"

docker compose stop web
restart_web() { docker compose start web >/dev/null; }
trap restart_web EXIT

docker run --rm \
  -v bluefin-ai-fde-data:/data:ro \
  -v "$PWD/backups:/backup" \
  caddy:2-alpine \
  tar -czf "/backup/$backup_file" -C /data .

restart_web
trap - EXIT
echo "数据库备份已保存到 backups/$backup_file"
