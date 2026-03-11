import { brevoClient, senderEmail, senderName } from '../config/brevo';
/**
 * contact form emaid to admin - when someone sends an email to us
 * auto-reply to customer - Thanking them for contacting 
 * Newsletter welcome  email - When someone subscribes
 * 
*/
const adminEmail = process.env.ADMIN_EMAIL || "";
export const sendContactNotificationToAdmin = async (
    name:string,
    email:string,
    phone:number,
    message:string
)=>{
    // send an email using brevo
    // create the email object 
    const emailData = {
        sender: {email:senderEmail, name:senderName},
        to:[{email: adminEmail}],
        subject: "New Contact Form Submission from Website",
        htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `
    }

    // acctually send the email 
    try {
        const result = await brevoClient.transactionalEmails.sendTransacEmail(emailData);
        console.log(`✅ Email sent successfully:`, result);
    } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;  // Re-throw so controller knows it failed
    }

}