import sgMail from '@sendgrid/mail';
import siteConfig from '../data/siteConfig';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendQuoteEmail(formData) {
  const toEmail = process.env.CONTACT_EMAIL_TO || siteConfig.email;
  const fromEmail = process.env.CONTACT_EMAIL_FROM || 'noreply@biocarehealthsystems.co.ke';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #A54482;">New Website Inquiry / Quote Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Facility / Company:</strong> ${formData.company || 'N/A'}</p>
      <p><strong>Product Interest:</strong> ${formData.category}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <h3>Message / Requirements:</h3>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.message}</p>
      <br/>
      <p style="font-size: 12px; color: #777;">Sent via Biocare Health Systems Limited Website Contact Form</p>
    </div>
  `;

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `[Biocare Inquiry] ${formData.category} - ${formData.name}`,
    text: `New Inquiry from ${formData.name} (${formData.phone}, ${formData.email}): ${formData.message}`,
    html: htmlContent,
  };

  if (!process.env.SENDGRID_API_KEY) {
    console.log('[SendGrid Mock Dispatch - No SENDGRID_API_KEY in env]:', msg);
    return { success: true, mock: true };
  }

  await sgMail.send(msg);
  return { success: true };
}
