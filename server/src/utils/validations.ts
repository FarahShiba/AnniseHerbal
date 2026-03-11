
import { ContactRequestBody, ContactValidationErrors } from "../types/contacts";
import {NewsletterSubscriptionRequestBody, ValidationErrors as NewsletterValidationErrors} from "../types/newsletter";


/**
 * Validate Contact Form Data
 * 
 * @param data - The form data from request body
 * @returns ValidationErrors object if errors found, null if valid
 * 
 * Example usage:
 * const errors = validateContactForm(req.body);
 * if (errors) {
 *   return res.status(400).json({ success: false, errors });
 * }
 */



export const ValidateContactForm=(
    data:ContactRequestBody
):ContactValidationErrors | null=>{

    const errors: ContactValidationErrors ={};
    
    // validate Name 
    if(data.name.trim().length === 0){
        errors.name =  'Name is required';

    }else if (data.name.trim().length < 2){
        errors.name = "Name must be at least 1 characters";
    }else if(data.name.trim.length > 100){
        errors.name = "Name must not exceed 100 characters";
    }


    //validate contact (email)
    if(data.email.trim().length === 0){
        errors.email = "Email address is required"
    }else{
        const trimmedEmail = data.email.trim();

        //check if it looks like an email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(trimmedEmail);

        if(!isEmail){
            errors.name="Please provide a Valid email address"
        }
    }

    // validate phone number 
    if(!data.phone || data.phone.toString().trim().length === 0){
        errors.phone = "Phone number is required" as any;
    }else if(data.phone.toString().trim().length < 10 || data.phone.toString().trim().length > 13){
        errors.phone = "Phone number must be 10 - 13 digits" as any;
    }


    // validate message 
    if(!data.message || data.message.trim().length === 0){
        errors.message = "Message is requireds"
    }else if(!data.message || data.message.trim().length >1000){
        errors.message = "Message must be no longer than 1000 characters"
    }

    // return numm if no errors, otherwise retunr errors object
    return Object.keys(errors).length > 0 ? errors : null;  
}


/**
 * Validate Newsletter Subscriber Data
 * 
 * @param data - The subscriber data from request body
 * @returns ValidationErrors object if errors found, null if valid
 * 
 * Example usage:
 * const errors = ValidateNewsletterSubscriberEmail(req.body);
 * if (errors) {
 *   return res.status(400).json({ success: false, errors });
 * }
 */
export const ValidateNewsletterSubscriberEmail=(
    data:NewsletterSubscriptionRequestBody
): NewsletterValidationErrors | null=>{
    
    const errors: NewsletterValidationErrors = {};

    // Validate email
    if (!data.email || data.email.trim().length === 0) {
        errors.email = "Email address is required";
    }else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedEmail = data.email.toLowerCase().trim();
        if (!emailRegex.test(normalizedEmail)) {
            errors.email = "Please provide a valid email address";
        }
    }  

    // return null if no errors, otherwise return errors object
    return Object.keys(errors).length > 0 ? errors : null;  
}
