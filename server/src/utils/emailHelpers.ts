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

/**
 * Send auto-reply confirmation email to customer who submitted contact form
 * @param name - Customer's name
 * @param email - Customer's email address
 */
export const sendContactConfirmationToCustomer = async (
    name: string,
    email: string
) => {
    const emailData = {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: email }],
        subject: "Terima kasih telah menghubungi kami - Annise Herbal",
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2d5016;">Terima Kasih, ${name}!</h2>
                <p>Kami telah menerima pesan Anda dan akan segera merespons.</p>
                <p>Tim kami biasanya merespons dalam 1-2 hari kerja.</p>
                <br>
                <p style="color: #666;">Salam hangat,<br>
                <strong>Tim Annise Herbal</strong></p>
                <hr style="border: 1px solid #eee;">
                <p style="font-size: 12px; color: #999;">
                    Email ini dikirim secara otomatis. Jangan balas email ini.<br>
                    Hubungi kami di annise.herbal20@gmail.com untuk pertanyaan lebih lanjut.
                </p>
            </div>
        `
    };

    try {
        const result = await brevoClient.transactionalEmails.sendTransacEmail(emailData);
        console.log(`✅ Confirmation email sent to customer:`, email);
    } catch (error) {
        console.error("❌ Failed to send confirmation email to customer:", error);
        throw error;
    }
}

/**
 * Send welcome email to newsletter subscriber
 * @param email - Subscriber's email address
 */
export const sendNewsletterWelcomeEmail = async (email: string) => {
    const emailData = {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: email }],
        subject: "Selamat Datang di Newsletter Annise Herbal! 🌿",
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h1 style="color: #2d5016; text-align: center;">🌿 Selamat Datang! 🌿</h1>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Terima kasih telah bergabung dengan Newsletter <strong>Annise Herbal</strong>!
                    </p>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Anda akan menerima:
                    </p>
                    <ul style="font-size: 15px; color: #555; line-height: 1.8;">
                        <li>✨ Penawaran eksklusif dan diskon khusus</li>
                        <li>📚 Tips kesehatan dan herbal terbaru</li>
                        <li>🎁 Promosi produk pilihan</li>
                        <li>📰 Berita dan artikel menarik</li>
                    </ul>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://anniseherbal.com" 
                           style="background-color: #2d5016; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            Kunjungi Website Kami
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
                        Salam sehat dan hangat,<br>
                        <strong>Tim Annise Herbal</strong>
                    </p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 12px; color: #999;">
                        Email ini dikirim ke ${email}<br>
                        Jika Anda tidak mendaftar, abaikan email ini.
                    </p>
                </div>
            </div>
        `
    };

    try {
        const result = await brevoClient.transactionalEmails.sendTransacEmail(emailData);
        console.log(`✅ Welcome email sent to subscriber:`, email);
    } catch (error) {
        console.error("❌ Failed to send welcome email to subscriber:", error);
        throw error;
    }
}

/**
 * Send notification to admin about new newsletter subscriber
 * @param email - Subscriber's email address
 */
export const sendNewSubscriberNotificationToAdmin = async (email: string) => {
    const emailData = {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: adminEmail }],
        subject: "🎉 New Newsletter Subscriber",
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2d5016;">New Newsletter Subscriber</h2>
                <p style="font-size: 16px; color: #333;">
                    Good news! Someone just subscribed to your newsletter.
                </p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0 0 0;"><strong>Subscribed at:</strong> ${new Date().toLocaleString('id-ID')}</p>
                </div>
                <p style="color: #666; font-size: 14px;">
                    The subscriber has been saved to your database and received a welcome email.
                </p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">
                    This is an automated notification from Annise Herbal website.
                </p>
            </div>
        `
    };

    try {
        const result = await brevoClient.transactionalEmails.sendTransacEmail(emailData);
        console.log(`✅ Admin notification sent for new subscriber:`, email);
    } catch (error) {
        console.error("❌ Failed to send admin notification:", error);
        throw error;
    }
}