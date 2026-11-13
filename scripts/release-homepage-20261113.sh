#!/usr/bin/env bash
# Guarded release for the 2026-11-13 Bluefin homepage and company-profile update.
set -euo pipefail
umask 077
cd /home/admin/bluefin-ai-fde

fail() { echo "STOP: $*" >&2; exit 1; }
test "$#" -eq 1 || fail 'usage: release-homepage-20261113.sh <full-target-commit>'
target=$(git rev-parse --verify "$1^{commit}")

command -v flock >/dev/null || fail 'flock is required'
exec 9>/tmp/bluefin-homepage-release.lock
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

release_dir=$(mktemp -d "${HOME:?}/bluefin-homepage-release-XXXXXXXX")
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

healthy=false
for attempt in {1..10}; do
  if curl --fail --silent --show-error --connect-timeout 5 --max-time 15 https://lqy-ai.com/api/health; then
    healthy=true
    break
  fi
  sleep 3
done
"$healthy" || fail 'public health check failed'

verify_page() {
  local path="$1"
  local needle="$2"
  local output="$3"
  curl --fail --silent --show-error "https://lqy-ai.com${path}" -o "$release_dir/$output"
  grep -Fq "$needle" "$release_dir/$output" || fail "expected content missing at $path"
}

verify_page / '加刘向个人微信' homepage.html
verify_page /contact '添加刘向个人微信' contact.html
verify_page /about '深圳市蓝旗鱼科技有限公司' about.html
verify_page /brand '蓝旗鱼 AI 品牌与媒体资料' brand.html
verify_page /founders/liuxiang '创始人兼CEO' founder-liuxiang.html
verify_page /services/personal-knowledge 'Codex + Obsidian' personal-knowledge.html
curl --fail --silent --show-error https://lqy-ai.com/official/wechat-liuxiang-personal-20261113.jpg -o "$release_dir/personal-wechat.jpg"
test "$(wc -c < "$release_dir/personal-wechat.jpg")" -gt 100000 || fail 'personal WeChat asset is unexpectedly small'

docker compose exec -T web node -e "$count_js" > "$release_dir/member-counts-after.json"
docker compose exec -T web node -e 'const a=JSON.parse(process.argv[1]),b=JSON.parse(process.argv[2]);if(a.some(x=>!(b.find(y=>y.section===x.section)?.count>=x.count)))process.exit(1);' "$(cat "$release_dir/member-counts-before.json")" "$(cat "$release_dir/member-counts-after.json")" || fail 'member counts decreased; inspect the saved rollback image'

echo 'Member counts before / after:'
cat "$release_dir/member-counts-before.json" "$release_dir/member-counts-after.json"
echo "RELEASE_OK $target"
echo "Release records: $release_dir"
