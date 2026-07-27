import { sendQuoteEmail } from '../../lib/sendgrid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, company, category, message } = req.body;

  if (!name || !email || !phone || !category || !message) {
    return res.status(400).json({ error: 'Missing required inquiry fields' });
  }

  try {
    await sendQuoteEmail({ name, email, phone, company, category, message });
    return res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('[Quote API Error]:', error);
    return res.status(500).json({ error: 'Failed to deliver quote request. Please try again or call us.' });
  }
}
