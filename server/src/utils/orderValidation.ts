import { 
  Order, 
  SUPPORTED_PROVINCES, 
  ShippingMethod,
  CreateOrderRequest,
  OrderValidationErrors ,
  OrderItemRequest
} from "../types/orders";


/**
 * Order validation utility functions
 */
export const validateName = (
  name: string,
): { isValid: boolean; error?: string } => {
  const nameTrimmed = name.trim();
  if (nameTrimmed.length === 0) {
    return { isValid: false, error: "Name is required" };
  } else if (nameTrimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  } else if (nameTrimmed.length > 20) {
    return { isValid: false, error: "Name must not exceed 20 characters" };
  }

  // lets validate the special characters
  const specialCharPattern = /^[a-zA-Z\s]+$/;
  const hasSpecialChar = specialCharPattern.test(nameTrimmed);

  if (!hasSpecialChar) {
    return {
      isValid: false,
      error: "Name can only contain letters and spaces",
    };
  } else {
    return { isValid: true };
  }
};

// 2 : validate an email address
export const validateEmail = (
  email: string,
  
): { isValid: boolean; error?: string } => {
    

  const emailTrimmed = email.trim();
  //check if it looks like an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(emailTrimmed);

  if (!isEmail) {
    return { isValid: false, error: "Please provide a valid email address" };
  } else {
    return { isValid: true };
  }
};

// 3 : validate phone number
export const validatePhoneNumber = (
  phoneNumber: string,
): { isValid: boolean; error?: string; normalizedPhone?: string } => {
  const phoneNumberTrimmed = phoneNumber.trim();

  // Check if empty
  if (phoneNumberTrimmed.length === 0) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Check format: must start with 08 and be 10-13 digits
  const phoneRegex = /^08\d{8,11}$/;
  if (!phoneRegex.test(phoneNumberTrimmed)) {
    return { 
      isValid: false, 
      error: "Phone number must start with 08 and be 10-13 digits" 
    };
  }

  // Normalize: 08xxx → +628xxx
  const normalizedPhone = "+62" + phoneNumberTrimmed.substring(1);

  return { isValid: true, normalizedPhone };
};

// 4: Validation Address
export const validateAddress = (
  address: string,
): { isValid: boolean; error?: string } => {
  const addressTrimmed = address.trim();

  // check if empty
  if (addressTrimmed.length === 0) {
    return { isValid: false, error: "Address field must not be empty" };
  } else if (addressTrimmed.length >= 200) {
    return { isValid: false, error: "Address field must not be too long." };
  }

  return { isValid: true };
};

// 5: Validate Province

export const validateProvince = (
  province: string,
): { isValid: boolean; error?: string } => {
  const provinceTrimmed = province.trim();

  // check if empty
  if (provinceTrimmed.length === 0) {
    return { isValid: false, error: "Province field must not be empty" };
  }else if (!SUPPORTED_PROVINCES.includes(provinceTrimmed as any)) {
    return { isValid: false, error: "Province is not supported" };
  }

  return { isValid: true };
};

// 6: validate PostalCode 
export const validatePostalCode = (postalCode: string): { isValid: boolean; error?: string } => {
    const postalCodeTrimmed = postalCode.trim();
    
    // Check if empty
    if(postalCodeTrimmed.length === 0){
        return {isValid: false, error: "Postalcode field must not be empty" }
    }
    
    // Check if all digits: /^\d{5}$/ and exactly 5 characters
    const isValidPostalCode = /^\d{5}$/.test(postalCodeTrimmed);
    if(!isValidPostalCode){
        return {isValid: false, error: "Invalid Postal Code" }
    }
    
    // Return success
    return { isValid: true };
}


// 7: validate validate City
export const validateCity = (city: string): { isValid: boolean; error?: string } => {
    const cityTrimmed = city.trim();
    
    // Check if empty
    if(cityTrimmed.length === 0){
        return {isValid: false, error: "City field must not be empty" }
    }
    // Check max length (20 characters)
    if(cityTrimmed.length > 20){
         return {isValid: false, error: "City field must not be longer than 20" }
    }
    // Return success
    return { isValid: true };
} 


// 8: Validation Customer Validator (Combines All Fields)
export const validateCustomer=(customer:{
    name: string;
    email: string;
    phoneNumber: string;
    address: string; 
    city: string;
    province: string;
    postalCode: string;
    specialInstruction?: string;
}): {
    isValid: boolean;
    errors?: {
        name?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        city?: string;
        province?: string;
        postalCode?: string;
    };
    normalizedPhone?: string;
}=>{
    // create errors object
    const errors: any = {};
    let normalizedPhone: string | undefined;
    
    //vaidate name 
    const nameResult = validateName(customer.name);
    if(!nameResult.isValid){
        errors.name = nameResult.error;
    }
    
    // validate email
    const emailResult = validateEmail(customer.email)
    if(!emailResult.isValid){
        errors.email = emailResult.error;
    }

    // Validate phone - call validatePhoneNumber()
    const phoneResult = validatePhoneNumber(customer.phoneNumber);
    if(!phoneResult.isValid){
        errors.phoneNumber = phoneResult.error;
    } else {
        normalizedPhone = phoneResult.normalizedPhone;
    }

    // validate address
    const addressResult = validateAddress(customer.address);
    if(!addressResult.isValid){
        errors.address = addressResult.error;
    }

    // validate city
    const cityResult = validateCity(customer.city);
    if(!cityResult.isValid){
        errors.city = cityResult.error;
    }

    // validate province
    const provinceResult = validateProvince(customer.province)
    if(!provinceResult.isValid){
        errors.province = provinceResult.error;
    }

    // validate postal code
    const postalCodeResult = validatePostalCode(customer.postalCode);   
    if(!postalCodeResult.isValid){
        errors.postalCode = postalCodeResult.error;
    }

    // if there are any errors, return them. Otherwise return isValid true
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
        return { isValid: false, errors };
    }

    return { isValid: true, normalizedPhone };
}



// 9: Validation Items Validator
export const validateOrderItems = (items: OrderItemRequest[]): { 
  isValid: boolean; 
  error?: string 
} => {
  // Check if array exists and not empty
  if (!items || items.length === 0) {
    return { isValid: false, error: "Cart is empty. Please add items to your order" };
  }

  // Validate each item
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Check if productId exists
    if (!item.productId || item.productId.trim().length === 0) {
      return { isValid: false, error: `Item ${i + 1}: Product ID is required` };
    }

    // Check if quantity is a number
    if (typeof item.quantity !== 'number') {
      return { isValid: false, error: `Item ${i + 1}: Quantity must be a number` };
    }

    // Check if quantity > 0
    if (item.quantity <= 0) {
      return { isValid: false, error: `Item ${i + 1}: Quantity must be at least 1` };
    }

    // Check if quantity <= 20 (your bulk order limit)
    if (item.quantity > 20) {
      return { 
        isValid: false, 
        error: `Item ${i + 1}: Maximum quantity is 20. For bulk orders, please contact us at [your-phone/email]` 
      };
    }
  }

  return { isValid: true };
};

// #10: Shipping Method Validator
export const validateShippingMethod = (method: string): {
  isValid: boolean;
  error?: string;
} => {
  const validMethods: ShippingMethod[] = ["standard", "express"];
  
  if (!validMethods.includes(method as ShippingMethod)) {
    return { 
      isValid: false, 
      error: "Invalid shipping method. Choose 'standard' or 'express'" 
    };
  }
  
  return { isValid: true };
};


// 11 validate payment 
export const validatePaymentMethod = (method: string): {
  isValid: boolean;
  error?: string;
} => {
  const validMethods = ["bank_transfer", "gopay", "qris", "shopeepay"];
  
  // Check if method is in validMethods array
  
  if (!validMethods.includes(method)) {
      return { isValid: false, error: "Invalid payment method" };
  }
  return { isValid: true };
};


// 12: Validation Idempotency Key Validator
export const validateIdempotencyKey = (key: string): {
  isValid: boolean;
  error?: string;
} => {
  // Check if empty
  if (!key) {
      return { isValid: false, error: "Idempotency key must not be empty" };
  }

  // Check if at least 10 characters (reasonable minimum)
  if (key.length < 10) {
      return { isValid: false, error: "Idempotency key must be at least 10 characters long" };
  }

  // Return result
  return { isValid: true };
};


/**
 * MAIN VALIDATOR - Validates complete order request
 * This is the ONE function controllers call
 */
export const validateOrderRequest = (
    orderData: CreateOrderRequest
):{
    isValid: boolean;
    errors?: OrderValidationErrors;
    normalizedPhone?: string;
}=>{
    const errors: OrderValidationErrors = {};

    // Validate customer details
    const customerValidation = validateCustomer(orderData.customer);
    if(!customerValidation.isValid){
        errors.customer = customerValidation.errors;
    }
    const normalizedPhone = customerValidation.normalizedPhone

    //validate order Items 
    const itemValidation = validateOrderItems(orderData.items);
    if(!itemValidation.isValid){
        errors.items = itemValidation.error;
    }

    // validate shipping method
    const shippingValidation = validateShippingMethod(orderData.shipping.method);
    if(!shippingValidation.isValid){
        errors.shipping = shippingValidation.error;
    }

    // validate payment method
    const paymentValidation = validatePaymentMethod(orderData.paymentMethod);
    if(!paymentValidation.isValid){
        errors.paymentMethod = paymentValidation.error;
    }


    // 5. Validate Idempotency Key
    const idempotencyValidation = validateIdempotencyKey(orderData.idempotencyKey);
    if (!idempotencyValidation.isValid) {
        errors.idempotencyKey = idempotencyValidation.error;
    }

    // 6. Validate Promo Code (Optional)
    if (orderData.promoCode) {
        // We'll implement promo validation later when you have promo collection
        // For now, just accept any promo code
        // Later: const promoValidation = await validatePromoCode(orderData.promoCode);
    }

    // Check if any errors exist
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
        return { isValid: false, errors };
    }

    // All validations passed!
    return { isValid: true, normalizedPhone };
}
