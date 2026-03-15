import { Request, Response } from "express";
import { db } from "../config/firebase";


// function to save the data and change the payment status from pending to paid
export const handleMidtransNotification = async (req:Request, res:Response)=>{
    try {
        //step 1: get the notification from Midtrans 
        const notification = req.body;

        //log it to see what we recieve
        console.log("📨 Webhook received:", notification);

        //step 2: extract important fields
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const transactionId = notification.transaction_id;
        const paymentType = notification.payment_type;

        // step 3: Determine order status
        let orderStatus : string;

        if(transactionStatus === "settlement"){
            orderStatus = "paid";
            
            // step 4: Find and update the order in Firestore 
            const fetchOrder =  db.collection("orders").doc(orderId);
            await fetchOrder.update({
                status: orderStatus,
                "payment.status": orderStatus
            })

            // step 5: Send the response to Midtrans
            return res.status(200).json({ message: "Notification received" });

        }else {
            // Payment not successful, order stays "pending"

            return res.status(200).json("OK");
        }

    } catch (error) {
        console.error("❌ Error in updating orderstatus:", error);
                
        return res.status(500).json({
            success: false,
            error: "Internal server error from finding the handleMidtransNotification",
            message: "Something went wrong while processing your order"
        });
    }
}