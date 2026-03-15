import dotenv from "dotenv";
import midtransClient from "midtrans-client";


// load environment variable from .env file 
dotenv.config();


console.log(" Environment:", process.env.NODE_ENV);
// console.log("🔍 Server Key:", process.env.MIDTRANS_SERVER_KEY);  
// console.log("🔍 Client Key:", process.env.MIDTRANS_CLIENT_KEY);  
// console.log("🔍 Is Production:", process.env.MIDTRANS_IS_PRODUCTION);  
const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    serverKey:  process.env.MIDTRANS_SERVER_KEY as string
});

export default snap;