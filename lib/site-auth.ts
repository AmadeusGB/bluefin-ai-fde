export function authenticatedSiteUser(requestHeaders: Headers) {
  const id = requestHeaders.get('oai-authenticated-user-id')?.trim() || '';
  const email =
    requestHeaders.get('oai-authenticated-user-email')?.trim().toLowerCase() ||
    '';
  const adminEmail =
    process.env.OPERATIONS_ADMIN_EMAIL?.trim().toLowerCase() || '';
  const localOwner =
    process.env.NODE_ENV !== 'production' && email === 'seedy@sites.test';
  if (id && email && (localOwner || adminEmail === email)) return { id, email };

  const basicUser = basicAuthUser(requestHeaders);
  return basicUser ? { id: `basic:${basicUser}`, email: basicUser } : null;
}

function safeEqual(left: string, right: string) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index++)
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  return difference === 0;
}

function decodeBasicCredentials(value: string) {
  if (!value.toLowerCase().startsWith('basic ')) return null;
  try {
    const bytes = Uint8Array.from(atob(value.slice(6).trim()), (character) =>
      character.charCodeAt(0),
    );
    const decoded = new TextDecoder().decode(bytes);
    const separator = decoded.indexOf(':');
    if (separator < 1) return null;
    return {
      username: decoded.slice(0, separator).trim().toLowerCase(),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function basicAuthUser(requestHeaders: Headers) {
  const configuredUser =
    process.env.OPERATIONS_ADMIN_EMAIL?.trim().toLowerCase() || '';
  const configuredPassword = process.env.OPERATIONS_ADMIN_PASSWORD || '';
  if (!configuredUser || !configuredPassword) return null;
  const credentials = decodeBasicCredentials(
    requestHeaders.get('authorization') || '',
  );
  if (
    !credentials ||
    !safeEqual(credentials.username, configuredUser) ||
    !safeEqual(credentials.password, configuredPassword)
  )
    return null;
  return configuredUser;
}
