import { Request, Response } from "express";
import { db } from "../config/firebase";
import { NewsletterSubscriberType, NewsletterSubscriptionRequestBody } from "../types/newsletter";
import { ValidateNewsletterSubscriberEmail } from "../untils/validations";
import { generateUniqueContactId as  generateUniqueSubscriberId} from "../untils/helpers";


/**
 * Subscription Form newslettersubscriber
 * 
 * Endpoint: POST /api/newsLetterSubscriber
 * 
 * Handles customer NewsletterSubscriber form submissions:
 * 1. Validates input data
 * 2. Saves to Firestore
 * 3. (Later) Sends newsletter marketing campagins 
 * 4. Returns success response
 * 
 * @param req - Express request with NewsletterSubscriberRequestBody in body
 * @param res - Express response
 */
export const submitNewsletterSubscriberForm = async (
    req:Request,
    res:Response
):Promise<void> =>{
    try {
        // step 1 : Extract the data from request body and logging 
        console.log("📧 Newsletter subscription request:", {
            email: req.body.email
        });
        const{email} = req.body as NewsletterSubscriptionRequestBody;


        // step 2: Validate the email data
        const valideationErrors = ValidateNewsletterSubscriberEmail(
            {
                email
            }
        )

        // step 3 if validation fails, return 400 errors
        if(valideationErrors){ // if true
            console.log("❌ Validation failed:", valideationErrors);
            res.status(400).json({
                success:false,
                error: "validation Failed",
                details: valideationErrors
            });
            return;
        }
        console.log("✅ Email validation passed");
        // Step 4: Normalize email (lowercase, trim)
        const normalizedEmail = email.toLowerCase().trim();

        // Step 4.2: Check if the email already exists in Firestore
        const existingSubscriber = await db
            .collection("newsletterSubscribers")
            .where("email", "==", normalizedEmail)
            .limit(1)
            .get();
        
        if (!existingSubscriber.empty) {
            console.log(`⚠️ Email already subscribed: ${normalizedEmail}`);
            
            // Return friendly message (don't reveal if email exists for privacy)
            res.status(200).json({
                success: true,
                message: "Congrats, u are already subsciber."
            });
            return;
        }
        console.log(`✅ Email available: ${normalizedEmail}`);

         // Step 6: Generate unique subscriber ID
        const subscriberId = generateUniqueSubscriberId();
        console.log(`✅ Generated ID: ${subscriberId}`);


        // step 5 Prepare newsletter subscriber data for database
        const subscriberData : NewsletterSubscriberType = {
            id: subscriberId,
            email: normalizedEmail,
            subscribedAt: new Date(),
            isActive: true
        };

        // step 6: Save the subscriber data to Firestore
        console.log(`💾 Saving to Firestore: newsletter_subscribers/${subscriberId}`);

        await db
        .collection("newsletterSubscribers")
        .doc(subscriberId)
        .set(subscriberData);
        console.log(`✅ Subscriber saved: ${subscriberId}`);


        // Step 7: TODO - Send welcome email (tomorrow with Brevo)
        // await sendWelcomeEmail(normalizedEmail);


        // step 7: Return success response
        res.status(201).json({ 
            success: true,
            message: "Newsletter subscription successful" });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error" });
    }
}
