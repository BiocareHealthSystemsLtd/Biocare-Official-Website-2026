const https = require('https');

function postToFormSubmit(data, referer, origin) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: 'formsubmit.co',
      port: 443,
      path: '/ajax/biocarehealthsystems@gmail.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'Referer': referer,
        'Origin': origin,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

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

    // Call FormSubmit via native HTTPS request to ensure maximum compatibility across Node.js versions
    const result = await postToFormSubmit({
      _subject: `[Biocare Website Inquiry] - ${category} from ${name}`,
      Name: name,
      Email: email,
      Phone: phone,
      "Company / Facility": company || 'N/A',
      "Product Interest": category,
      Message: message
    }, referer, origin);

    if (result.statusCode === 200) {
      const data = JSON.parse(result.body);
      
      const isSuccess = data.success === 'true' || data.success === true;
      const isActivation = data.message && (data.message.toLowerCase().includes('activate') || data.message.toLowerCase().includes('active'));

      if (isSuccess || isActivation) {
        return res.status(200).json({ success: true, message: data.message });
      } else {
        console.error('FormSubmit application error:', data);
        return res.status(400).json({ error: data.message || 'Failed to submit inquiry' });
      }
    } else {
      console.error('FormSubmit response code error:', result.statusCode, result.body);
      return res.status(500).json({ error: 'Failed to dispatch email' });
    }
  } catch (error) {
    console.error('FormSubmit dispatch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
