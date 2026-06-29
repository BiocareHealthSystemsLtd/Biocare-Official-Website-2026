import cloudinary from '../../../lib/cloudinary';
import siteConfig from '../../../data/siteConfig';

// Extend Next.js body parser size limit to support base64 image strings
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

function checkAuth(req) {
  const cookies = req.headers.cookie || '';
  return cookies.includes(`${siteConfig.admin.sessionCookieName}=authorized`);
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image data is required (Base64 string)' });
  }

  try {
    // Upload image base64 directly to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'biocare_website',
      resource_type: 'image',
    });

    return res.status(200).json({ 
      success: true, 
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
  } catch (error) {
    console.error('[Cloudinary Upload Error]', error);
    return res.status(500).json({ 
      error: 'Failed to upload image to Cloudinary. Check your API credentials.' 
    });
  }
}
