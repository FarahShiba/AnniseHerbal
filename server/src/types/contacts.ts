// structure of the contact form data
export interface ContactTypes {
    id:string;
    name:string;
    email:string;
    phone:number;
    message:string;
    createdAt?: Date;
}

// structure of the contact form request body
export interface ContactRequestBody {
    name:string;
    email:string;
    phone:number;
    message:string;
}

// validation function for contact form data
export interface ContactValidationErrors {
    name?: string;
    email?: string;
    phone?:number;
    message?: string;
}


