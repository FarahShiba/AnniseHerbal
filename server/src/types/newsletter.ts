// structure of the newsletter subscriber data
export interface NewsletterSubscriberType {
    id:string;
    email:string;
    subscribedAt?: Date;
    isActive?: boolean;
}


/**
 * Newsletter Subscription Request Body
 * What frontend sends
 */
export interface NewsletterSubscriptionRequestBody {
    email: string;                 // Only email needed!
}


/**
 * Validation Errors
 */
export interface ValidationErrors {
    email?: string;                // Only email can have errors
}