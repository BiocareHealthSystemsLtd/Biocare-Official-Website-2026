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
    // Send form data to FormSubmit AJAX endpoint for zero-config email delivery
    const response = await fetch('https://formsubmit.co/ajax/biocarehealthsystems@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Biocare Website Inquiry] - ${category} from ${name}`,
        Name: name,
        Email: email,
        Phone: phone,
        "Company / Facility": company || 'N/A',
        "Product Interest": category,
        Message: message
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errText = await response.text();
      console.error('FormSubmit response error:', errText);
      return res.status(500).json({ error: 'Failed to dispatch email' });
    }
  } catch (error) {
    console.error('FormSubmit dispatch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
