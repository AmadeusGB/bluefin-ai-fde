<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Alibaba Cloud deployment

This repository's production target is a single Alibaba Cloud ECS instance using
Docker Compose, Caddy, Next.js standalone output, and persistent SQLite.

Before deploying or updating production:

1. Read the complete `README.md` section titled `阿里云部署（推荐）`.
2. Never commit `.env`, SQLite files, backups, certificates, or credentials.
3. Keep the SQLite database in the named Docker volume
   `bluefin-ai-fde-data`; never use `docker compose down -v` in production.
4. Set `SITE_URL` to the final public origin before building because canonical
   URLs, sitemap, robots, JSON-LD, and social metadata are generated at build
   time.
5. Use `bash scripts/deploy-aliyun.sh` for first deployment and updates. It
   validates resources and configuration, builds, backs up an existing database,
   starts the containers, and checks `/api/health`.
6. Use `bash scripts/backup-sqlite.sh` for an explicit database backup.
7. Do not expose port 3000 publicly. Alibaba Cloud security groups should expose
   only SSH (22), HTTP (80), and HTTPS (443).
8. Do not use `/operations` over plain HTTP because it uses HTTP Basic
   authentication. Configure the domain and HTTPS first.
9. On the current 2-core, 2-GiB ECS instance, keep at least 2 GiB of swap enabled
   before building the image.

The legacy `.openai/hosting.json` only identifies the previously hosted Sites
project and is not part of the Alibaba Cloud deployment. The former Wrangler,
OpenNext, and Cloudflare D1 deployment path has been removed from this branch.
