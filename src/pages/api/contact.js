import { sendContactEmail } from '../../lib/sendgrid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, company, category, message, consent } = req.body;

  // Basic validation checks
  if (!name || !email || !phone || !category || !message || !consent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const result = await sendContactEmail({
      name,
      email,
      phone,
      company,
      category,
      message,
    });
    
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('API Contact route dispatch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
