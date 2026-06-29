import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
if (process.env.CLOUDINARY_URL) {
  // Cloudinary automatically picks up CLOUDINARY_URL if defined
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'biocarehealth',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export default cloudinary;
