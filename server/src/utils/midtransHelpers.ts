import snap from "../config/midtrans";
import {
  Order,
  OrderItem,
  ShippingAddressType,
  ShippingDetailsType,
  PricingBreakdownType,
} from "../types/orders";



export const buildMidtransTransaction = (
  // What parameters do you need?
  orderId:string,
  customer_details: ShippingAddressType,
  transaction_details:PricingBreakdownType,
  item_details:OrderItem[]
) => {
  return{
    // Function body will go here
  transaction_details:{
    order_id: orderId as string,
    gross_amount: transaction_details.total
  },
  customer_details:{
    first_name: customer_details.name,
    email: customer_details.email,
    phone: customer_details.phoneNumber
  },
  item_details:item_details.map((item_detail) =>({
    id:item_detail.productId,
    name:item_detail.name,
    price:item_detail.pricePerUnit,
    quantity:item_detail.quantity
  })).concat([{
    id:"SHIPPING",
    name:"Shipping Cost",
    price:transaction_details.shippingCost,
    quantity:1
  }])
} 
};

type MidtransTransactionData = {
    transaction_details:{
       order_id : string,
       gross_amount:number, 
    },
    customer_details:{
        first_name:string,
        email:string,
        phone:string
    },
    item_details: Array<{
        id:string;
        name:string;
        price:number;
        quantity:number
    }>

}

//  Take the formatted transaction data and send it to Midtrans to get a payment token.
export const generatePaymentToken = async (midtransData: MidtransTransactionData )=>{
    try {
        // Step 1: Call Midtrans API
        const response = await snap.createTransaction(midtransData);
        // Step 2: Return what we need
        return{
            token: response.token,
            redirectUrl: response.redirect_url
        }



    } catch (error) {
     // throw erros 
    console.error("Error generating payment token:", error);
    throw error; // Re-throw so caller knows it failed
    }
}