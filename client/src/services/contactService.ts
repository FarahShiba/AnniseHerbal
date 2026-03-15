import {apiRequest} from '../utils/api';

export const submitContactForm = async(
    name:string,
    email:string,
    phone:string,
    message:string
)=>{
    return await apiRequest('/contact', {
        method:'POST', 
        body:JSON.stringify({
            name,
            email,
            phone,
            message
        })
    });
}