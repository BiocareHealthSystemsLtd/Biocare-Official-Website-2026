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
    const referer = req.headers.referer || 'https://biocarehealthsystems.co.ke/';
    const origin = req.headers.origin || 'https://biocarehealthsystems.co.ke';

    // Send form data to FormSubmit AJAX endpoint
    const response = await fetch('https://formsubmit.co/ajax/biocarehealthsystems@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': referer,
        'Origin': origin
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
      const data = await response.json();
      
      // FormSubmit returns success: 'true' (string) on success
      // Or success: 'false' with an activation message on first submission
      const isSuccess = data.success === 'true' || data.success === true;
      const isActivation = data.message && (data.message.toLowerCase().includes('activate') || data.message.toLowerCase().includes('active'));

      if (isSuccess || isActivation) {
        return res.status(200).json({ success: true, message: data.message });
      } else {
        console.error('FormSubmit application error:', data);
        return res.status(400).json({ error: data.message || 'Failed to submit inquiry' });
      }
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
