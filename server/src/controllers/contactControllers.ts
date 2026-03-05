import { Request, Response } from "express";
import { db } from "../config/firebase";
import { ContactTypes, ContactRequestBody } from "../types/contacts";
import { ValidateContactForm } from "../utils/validations";
import { generateUniqueContactId } from "../utils/helpers";


/**
 * Submit Contact Form
 * 
 * Endpoint: POST /api/contact
 * 
 * Handles customer contact form submissions:
 * 1. Validates input data
 * 2. Saves to Firestore
 * 3. (Later) Sends email notification via Brevo
 * 4. Returns success response
 * 
 * @param req - Express request with ContactRequestBody in body
 * @param res - Express response
 */
export const submitContactForm = async (
    req:Request,
    res:Response
):Promise<void> =>{
    try {
        // step 1 : Extract the data from request body
        const {name, email, phone, message} = req.body as ContactRequestBody;

        //step 2: Validate the data
        const validationErrors = ValidateContactForm(
            {
                name,
                email,
                phone,
                message
            }
        )

        // step 3 if validation fails, return 400 errors
        if(validationErrors){ // if true
            console.log("❌ Validation failed:", validationErrors);
            res.status(400).json({
                success:false,
                error: "validation Failed",
                details: validationErrors
            });
            return;
        }

        // step 4 Generate unique contact ID
        const contactId = generateUniqueContactId();
        console.log(`✅ Validation passed. Generating ID: ${contactId}`)


        //step 5: Prepare contact data for database 
        const contactData : ContactTypes = {
            id:contactId,
            name:name.trim(),
            email:email.trim(),
            phone:parseInt(String(phone).replace(/\D/g, '')),
            message:message.trim(),
            createdAt:new Date(),
        }

        // step 6 : save to firebase 
        console.log(`Saving to Firestore: contacts/${contactId}`);
        await db.collection('contacts').doc(contactId).set(contactData);
        console.log(`✅ Contact saved successfully: ${contactId}`);

        // Step 7: TODO - Send email notification (tomorrow with Brevo)
        // await sendEmailNotification(contactData);

        // Step 8: Return success response
        res.status(201).json({
            success: true,
            message: "Pesan Anda telah diterima. Kami akan membalas segera!",
            contactId: contactId
        });

    } catch (error) {
        console.error("❌ Error submitting contact form:", error);
        res.status(500).json({
            success: false,
            error: "Failed to submit contact form",
            message: "Terjadi kesalahan. Silakan coba lagi nanti."
        });
    }
}

