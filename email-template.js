/**
 * Generates the HTML email content for job notifications.
 * @param {string} jobTitle - The title of the new position.
 * @param {string} jobLink - The URL to the careers page or specific job post.
 * @returns {string} HTML string.
 */
exports.createEmailTemplate = (jobTitle, jobLink) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
    .header { background-color: #0a192f; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 30px 20px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #f1c40f; color: #0a192f; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 20px; }
    .footer { font-size: 12px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TOVA Inc.</h1>
    </div>
    <div class="content">
      <h2>New Career Opportunity: ${jobTitle}</h2>
      <p>Hello,</p>
      <p>We are excited to announce a new opening at TOVA Inc. As someone who has expressed interest in joining our team, we wanted you to be the first to know.</p>
      <p>We are looking for passionate individuals to help us redefine the future of logistics.</p>
      <a href="${jobLink}" class="button">View Job Details</a>
    </div>
    <div class="footer">
      <p>&copy; 2025 TOVA Inc. All rights reserved.</p>
      <p>You are receiving this email because you subscribed to career updates on our website.</p>
      <p><a href="#" style="color: #888;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Generates the HTML content for the Welcome email.
 * @returns {string} HTML string.
 */
exports.createWelcomeEmailTemplate = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
    .header { background-color: #0a192f; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 30px 20px; }
    .footer { font-size: 12px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to TOVA Careers</h1>
    </div>
    <div class="content">
      <h2>Subscription Confirmed</h2>
      <p>Thank you for subscribing to TOVA Career updates.</p>
      <p>You have been successfully added to our notification list. We will send you an email as soon as a new position that matches our high standards becomes available.</p>
      <p>We look forward to potentially working with you to redefine the future of logistics.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 TOVA Inc. All rights reserved.</p>
      <p><a href="#" style="color: #888;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Generates the HTML content for the Contact Form notification (to Admin).
 * @param {Object} data - The contact form data (name, email, subject, message).
 * @returns {string} HTML string.
 */
exports.createContactEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
    .header { background-color: #f1c40f; color: #0a192f; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; }
    .value { background: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Subject</div>
        <div class="value"><strong>${data.subject}</strong></div>
      </div>
      <div class="field">
        <div class="label">From</div>
        <div class="value">${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value" style="white-space: pre-wrap;">${data.message}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
