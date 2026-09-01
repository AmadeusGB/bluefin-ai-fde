declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    OPERATIONS_ADMIN_EMAIL?: string;
  }
}

interface CloudflareEnv extends Cloudflare.Env {
  __cloudflareEnvBrand?: never;
}
