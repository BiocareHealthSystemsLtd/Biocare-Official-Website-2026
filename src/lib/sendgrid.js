import sgMail from '@sendgrid/mail';

// Set SendGrid API key if available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendContactEmail({ name, email, phone, company, category, message }) {
  const toEmail = process.env.CONTACT_EMAIL_TO || 'biocarehealthsystems@gmail.com';
  const fromEmail = process.env.CONTACT_EMAIL_FROM || 'noreply@biocarehealthsystems.co.ke';

  const textContent = `
    New Inquiry from Biocare Health Systems Website:
    
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Company/Facility: ${company || 'N/A'}
    Product Category/Interest: ${category}
    
    Message:
    ${message}
  `;

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #0C447C; border-bottom: 2px solid #0F6E56; padding-bottom: 10px;">New Website Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 150px;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Interest:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${category}</strong></td>
        </tr>
      </table>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0C447C; margin-top: 15px; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #555;">Message:</h4>
        <p style="white-space: pre-wrap; line-height: 1.5; color: #444; margin: 0;">${message}</p>
      </div>
      <p style="font-size: 11px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
        This email was automatically generated from the contact form on biocarehealthsystems.co.ke
      </p>
    </div>
  `;

  const msg = {
    to: toEmail,
    from: fromEmail,
    replyTo: email,
    subject: `[Biocare Website Inquiry] - ${category} from ${name}`,
    text: textContent,
    html: htmlContent,
  };

  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY environment variable is not defined. Email content logged:');
    console.log(msg);
    return { success: true, mocked: true };
  }

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid email dispatch error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
}
