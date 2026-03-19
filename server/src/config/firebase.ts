import admin, { firestore } from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

console.log("🔍 Environment:", process.env.NODE_ENV);
console.log("🔍 Service Account Path:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

try {
  // For local development, use the service account key file
  if (process.env.NODE_ENV !== "production") {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
    const fullPath = path.resolve(serviceAccountPath);
    console.log("🔍 Resolved path:", fullPath);

    const serviceAccount = require(fullPath);
    console.log("🔍 Project ID from service account:", serviceAccount.project_id);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.firebasestorage.app`,
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });

    console.log("✅ Firebase Admin SDK initialized (development)");
    console.log("✅ Project ID:", serviceAccount.project_id);
  } else {
    // In production (Cloud Run), use Application Default Credentials
    console.log("🔍 Initializing Firebase Admin in production mode...");
    
    admin.initializeApp({
      projectId: "annise-herbal", // Your Firebase project ID
    });
    
    console.log("✅ Firebase Admin initialized (production mode)");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", error);
  throw error;
}

// Initialize Firestore
const firestoreDb = admin.firestore();

// Export Firebase services
export const db = firestoreDb;
export const auth = admin.auth();
export const storage = admin.storage();

console.log("✅ Firebase services exported");

export default admin;