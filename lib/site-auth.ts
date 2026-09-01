import { env } from 'cloudflare:workers';

export function authenticatedSiteUser(requestHeaders: Headers) {
  const id = requestHeaders.get('oai-authenticated-user-id')?.trim() || '';
  const email =
    requestHeaders.get('oai-authenticated-user-email')?.trim().toLowerCase() ||
    '';
  const adminEmail = env.OPERATIONS_ADMIN_EMAIL?.trim().toLowerCase() || '';
  const localOwner =
    process.env.NODE_ENV !== 'production' && email === 'seedy@sites.test';
  return id && email && (localOwner || adminEmail === email)
    ? { id, email }
    : null;
}
