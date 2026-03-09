import { Request, Response } from "express";
import { CreateOrderRequest, OrderValidationErrors } from "../types/orders";
import {validateOrderRequest} from "../utils/orderValidation";
import {fetchAndBuildOrderItems} from "../utils/productHelpers";
import {buildOrderDocument, generateUniqueOrderId, generateOrderNumber} from "../utils/orderHelpers";
import { db } from "../config/firebase";
import { messaging } from "firebase-admin";

/**
 * Create a new order
 * This function handles incoming order requests from customers
 */
export const createOrder = async(req:Request, res:Response)=>{
    try {
        // step 1: Get order data from request body
        const orderData = req.body as CreateOrderRequest;

        console.log("Customer:", orderData.customer.name);
        console.log("Email:", orderData.customer.email);
        console.log("Items count", orderData.items.length);
        console.log("Shipping Method", orderData.shipping.method);
        console.log("Payment method", orderData.paymentMethod);


        // step 2: validate the data 
        const isValidData = validateOrderRequest(orderData);

        if(!isValidData.isValid){
            return res.status(400).json({
                success:false,
                error: "validation Failed",
                details: isValidData.errors
            });
        }

        // Validation passed! ✅
        console.log("✅ Validation passed!");
        const normalizedPhone = isValidData.normalizedPhone || orderData.customer.phoneNumber;


        // step 3:  Fetch products
        const fetchedProducts = await fetchAndBuildOrderItems(orderData.items);
        if(fetchedProducts.error){
            return res.status(404).json({ // error 404 product doesnt exists
                success:false,
                error: "Product validation failed",
                details: fetchedProducts.error
            });
        }
        // Successfully fetched the products! ✅
        console.log("✅ Validation passed!",fetchedProducts);
        // saving items results
        const orderItems = fetchedProducts.items!;

        
        // step 4: Build Order Document
        const orderDocument = buildOrderDocument(orderData, orderItems, normalizedPhone, undefined);

        console.log("✅ Order document passed!");
        console.log("Total price:", orderDocument.pricing.total)

        
        // Step 5: Save to Firestore

        //Generate order ID
        const orderId = generateUniqueOrderId();
        //Generate order number
        const orderNumber = generateOrderNumber(1);
        // Add timestamps
        const timeStamp = new Date();

        const completeOrder = {
            ...orderDocument,
            orderId: orderId,
            orderNumber: orderNumber,
            createdAt:timeStamp,
            updatedAt:timeStamp
        };
        // Remove undefined fields (Firestore doesn't allow them!)
        if (completeOrder.promoCode === undefined) {
            delete completeOrder.promoCode;
        }
        await db.collection("orders").doc(orderId).set(completeOrder);
        
        console.log("✅ Order saved! ID:", orderId);
        
        //step 6 return the success response 
        return res.status(200).json({
            success:true,
            message: "Order created successfully!",
            data:{
                orderId: completeOrder.orderId,
                orderNumber: completeOrder.orderNumber,
                total:completeOrder.pricing.total,
                status:completeOrder.status
            }
            
        });
    } catch (error) {
        console.error("❌ Error in createOrder:", error);
    
        return res.status(500).json({
            success: false,
            error: "Internal server error",
            message: "Something went wrong while processing your order"
        });
    }
}