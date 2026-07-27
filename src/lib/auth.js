import crypto from 'crypto';
import siteConfig from '../data/siteConfig';

export function getAdminToken() {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || siteConfig.admin.defaultPassword;
  return crypto.createHash('sha256').update(`biocare_admin_salt_${secret}`).digest('hex');
}

export function isValidAdminSession(req) {
  if (!req || !req.headers) return false;
  const cookies = req.headers.cookie || '';
  const expectedToken = getAdminToken();
  const cookieName = siteConfig.admin.sessionCookieName || 'biocare_session_token';
  return cookies.includes(`${cookieName}=${expectedToken}`);
}
