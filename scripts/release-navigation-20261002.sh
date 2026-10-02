#!/usr/bin/env bash
# One-time, pinned release for the existing lqy-ai.com server.
set -euo pipefail
umask 077
cd /home/admin/bluefin-ai-fde
target=4c04d237c24846cf05e0dcccc17379536a26dc00
fail() { echo "STOP: $*" >&2; exit 1; }
command -v flock >/dev/null || fail 'flock is required'
exec 9>/tmp/bluefin-navigation-release.lock
flock -n 9 || fail 'another release is running'
test "$(git branch --show-current)" = codex/bluefin-ai-world || fail 'unexpected branch'
git cat-file -e "$target^{commit}"
git merge-base --is-ancestor HEAD "$target" || fail 'server revision needs review'
# Preserve the known server-only npm lockfile changes. Stop for other tracked changes.
test -z "$(git diff --name-only HEAD -- . ':!package-lock.json')" || fail 'unexpected local changes'
git diff --quiet HEAD "$target" -- package-lock.json || fail 'lockfile update needs review'
grep -Eq '^SITE_URL=https://lqy-ai.com/?[[:space:]]*$' .env || fail 'unexpected SITE_URL'
test "$(docker inspect bluefin-ai-fde-web --format '{{range .Mounts}}{{if eq .Destination "/app/data"}}{{.Name}}{{end}}{{end}}')" = bluefin-ai-fde-data || fail 'unexpected database volume'
test "$(df -Pk . | awk 'NR==2 {print $4}')" -gt 8500000 || fail 'insufficient disk space'

# Docker owns the database backup directory on this host. Keep admin-written
# release records outside both that directory and the Docker build context.
release_dir=$(mktemp -d "${HOME:?}/bluefin-release-XXXXXXXX")
chmod 700 "$release_dir"
cp -p .env compose.yaml package-lock.json "$release_dir/"
git rev-parse HEAD > "$release_dir/previous-commit.txt"
rollback="bluefin-ai-fde-web:rollback-$(date +%Y%m%d-%H%M%S)"
docker image tag "$(docker inspect bluefin-ai-fde-web --format '{{.Image}}')" "$rollback"
printf '%s\n' "$rollback" > "$release_dir/rollback-image.txt"
count_js="const {DatabaseSync}=require('node:sqlite');const d=new DatabaseSync('/app/data/bluefin.db',{readOnly:true});console.log(JSON.stringify(d.prepare('SELECT section,count(*) AS count FROM community_members GROUP BY section ORDER BY section').all()));"
docker compose exec -T web node -e "$count_js" > "$release_dir/member-counts-before.json"

swap_kib=$(awk '/SwapTotal/ {print $2}' /proc/meminfo)
if (( swap_kib < 2097152 )); then
  sudo -n true || fail 'sudo access needed for build swap'
  swap_path=$(sudo mktemp /var/tmp/bluefin-build-swap.XXXXXXXX)
  sudo chmod 600 "$swap_path"
  sudo fallocate -l 2G "$swap_path"
  sudo mkswap "$swap_path"
  sudo swapon "$swap_path"
  printf '%s\n' "$swap_path" > "$release_dir/build-swap-path.txt"
fi

git merge --ff-only "$target"
test "$(git rev-parse HEAD)" = "$target" || fail 'unexpected release revision'
echo "Building release; rollback image: $rollback"
bash scripts/deploy-aliyun.sh 2>&1 | tee "$release_dir/deploy.log"
curl --fail --silent --show-error --retry 10 --retry-delay 3 --retry-all-errors https://lqy-ai.com/api/health
curl --fail --silent --show-error https://lqy-ai.com/knowledge -o "$release_dir/knowledge.html"
grep -q 'site-page-navigation' "$release_dir/knowledge.html" || fail 'new knowledge navigation not visible'
curl --fail --silent --show-error https://lqy-ai.com/world -o "$release_dir/world.html"
grep -q 'cosmic-shell' "$release_dir/world.html" || fail 'new AI world not visible'
docker compose exec -T web node -e "$count_js" > "$release_dir/member-counts-after.json"
docker compose exec -T web node -e 'const a=JSON.parse(process.argv[1]),b=JSON.parse(process.argv[2]);if(a.some(x=>!(b.find(y=>y.section===x.section)?.count>=x.count)))process.exit(1);' "$(cat "$release_dir/member-counts-before.json")" "$(cat "$release_dir/member-counts-after.json")" || fail 'member counts decreased; inspect the saved rollback image'
echo 'Member counts before / after:'
cat "$release_dir/member-counts-before.json" "$release_dir/member-counts-after.json"
echo "RELEASE_OK $target"
echo "Release records: $release_dir"
