const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const { createEmailTemplate } = require("./email-template");

admin.initializeApp();
const db = admin.firestore();

// TODO: Set your SendGrid API Key here or use environment variables
// functions.config().sendgrid.key
const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY";
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Cloud Function to send new job notifications to all subscribers.
 * Trigger: HTTP Request (can be called from Admin Dashboard or Postman)
 */
exports.sendJobNotification = functions.https.onRequest(async (req, res) => {
  // 1. Security Check (Optional: Add simple auth token check)
  // const token = req.query.token;
  // if (token !== "YOUR_SECRET_TOKEN") return res.status(403).send("Unauthorized");

  const jobTitle = req.body.jobTitle || "New Position";
  const jobLink = req.body.jobLink || "https://tova-portal.web.app/careers.html";

  try {
    // 2. Fetch all subscribers
    const snapshot = await db.collection("career_subscribers").get();

    if (snapshot.empty) {
      return res.status(200).send("No subscribers found.");
    }

    const emails = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.email) {
        emails.push(data.email);
      }
    });

    if (emails.length === 0) {
      return res.status(200).send("No valid email addresses found.");
    }

    // 3. Prepare Email Content
    const htmlContent = createEmailTemplate(jobTitle, jobLink);

    // 4. Send Emails (Batching is recommended for large lists, here we do simple loop or bulk send)
    // SendGrid allows sending to multiple recipients in 'to' or 'bcc'
    const msg = {
      to: emails, // Be careful with privacy! Use 'bcc' or send individual emails for production.
      from: "careers@tova.inc", // Change to your verified sender
      subject: `TOVA Career Update: ${jobTitle}`,
      html: htmlContent,
      isMultiple: true // Important when passing array to 'to' to hide other recipients
    };

    await sgMail.send(msg);

    console.log(`Successfully sent emails to ${emails.length} subscribers.`);
    res.status(200).send({ success: true, count: emails.length });

  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

/**
 * Cloud Function to send a Welcome Email when a user subscribes.
 * Trigger: Firestore 'onCreate' event on 'career_subscribers' collection.
 */
exports.sendWelcomeEmail = functions.firestore
  .document("career_subscribers/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;

    if (!email) {
      console.log("No email found in document.");
      return null;
    }

    try {
      const { createWelcomeEmailTemplate } = require("./email-template");
      const htmlContent = createWelcomeEmailTemplate();

      const msg = {
        to: email,
        from: "careers@tova.inc", // Change to your verified sender
        subject: "Welcome to TOVA Career Updates",
        html: htmlContent,
      };

      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);

      // Optional: Update document to mark as welcome email sent
      // return snap.ref.update({ welcome_email_sent: true });

    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
    return null;
  });

/**
 * Cloud Function to forward Contact Form messages to Admin.
 * Trigger: Firestore 'onCreate' event on 'contact_messages' collection.
 */
exports.sendContactEmail = functions.firestore
  .document("contact_messages/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    try {
      const { createContactEmailTemplate } = require("./email-template");
      const htmlContent = createContactEmailTemplate(data);

      const msg = {
        to: "TOVA.dodle@gmail.com", // Admin email
        from: "careers@tova.inc", // Verified sender (reuse the same one for now)
        subject: `[TOVA Contact] ${data.subject} - ${data.name}`,
        html: htmlContent,
        replyTo: data.email // Allow replying directly to the user
      };

      await sgMail.send(msg);
      console.log(`Contact email forwarded to admin from ${data.email}`);

    } catch (error) {
      console.error("Error forwarding contact email:", error);
    }
    return null;
  });
