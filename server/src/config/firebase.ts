import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
console.log("🔍 Environment:", process.env.NODE_ENV);
console.log("🔍 Is Production:", isProduction);

try {
  if (isProduction) {
    // In production (Cloud Run), use Application Default Credentials
    // Cloud Run automatically provides Firebase credentials for the same project
    console.log("🔍 Initializing Firebase Admin in production mode...");
    admin.initializeApp({
      projectId: "annise-herbal",
    });
    console.log("✅ Firebase Admin initialized (production mode)");
  } else {
    // For local development, use the service account key file
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
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", error);
  throw error;
}

// Initialize Firestore - use named database if FIRESTORE_DATABASE_ID is set
const databaseId = process.env.FIRESTORE_DATABASE_ID;
const firestoreDb = databaseId
  ? getFirestore(admin.app(), databaseId)
  : getFirestore();

console.log(`✅ Using Firestore database: ${databaseId || "default"}`);

// Export Firebase services
export const db = firestoreDb;
export const auth = admin.auth();
export const storage = admin.storage();

console.log("✅ Firebase services exported");

export default admin;