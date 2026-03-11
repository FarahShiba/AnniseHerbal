const { BrevoClient } = require('@getbrevo/brevo');

// Environment variables are loaded in index.ts via dotenv.config()
console.log("Environment:", process.env.NODE_ENV);

const apiKey = process.env.SMTP_KEY || "";
const senderEmail = process.env.BREVO_SENDER_EMAIL || "";
const senderName = process.env.BREVO_SENDER_NAME || "Annise Herbal";

console.log("🔑 API Key loaded:", apiKey ? `${apiKey.substring(0, 20)}...` : "NOT FOUND");
console.log("📧 Sender email:", senderEmail);
console.log("🔍 Full API key length:", apiKey.length);
console.log("🔍 API key starts with:", apiKey.substring(0, 10));

// Initialize Brevo client with API key
const client = new BrevoClient({
    apiKey: apiKey
});

console.log("🔍 Client initialized with options:", JSON.stringify(client._options, null, 2));

// Export for use in other files
export { client as brevoClient, senderEmail, senderName };