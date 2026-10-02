// Canonical bytes shared by the Netlify edge signer and Hetzner verifier.
// No credentials or patient fields are ever logged by this module.
export const MAX_BODY = 6 * 1024 * 1024;

export function canonical({ method, target, timestamp, clientIp, nonce, bodyHash }) {
  return [method, target, timestamp, clientIp, nonce, bodyHash].join('\n');
}

export async function sha256(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function sign(secret, fields) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(canonical(fields)));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}
