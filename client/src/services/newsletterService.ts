import {apiRequest} from '../utils/api';  


export const subscribeToNewsletter = async (email: string)=>{
  return await apiRequest('/newsletter/subscribe',{
    method:'POST',
    body:JSON.stringify({ email }),
  });
};