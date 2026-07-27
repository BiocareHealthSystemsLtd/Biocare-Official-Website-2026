import siteConfig from '../../../data/siteConfig';
import { getAdminToken, isValidAdminSession } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || siteConfig.admin.defaultPassword;

    if (password === adminPassword) {
      const token = getAdminToken();
      // Set secure session cookie
      res.setHeader(
        'Set-Cookie',
        `${siteConfig.admin.sessionCookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
      );
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  }

  if (req.method === 'GET') {
    if (isValidAdminSession(req)) {
      return res.status(200).json({ authenticated: true });
    } else {
      return res.status(401).json({ authenticated: false });
    }
  }

  if (req.method === 'DELETE') {
    // Logout by clearing session cookie
    res.setHeader(
      'Set-Cookie',
      `${siteConfig.admin.sessionCookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    );
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
