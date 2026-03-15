import admin, { firestore } from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

console.log("🔍 Environment:", process.env.NODE_ENV);
console.log(
  "🔍 Service Account Path:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
);

try {
  // Initialize Firebase Admin SDK
  const serviceAccountPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";

  // For local development, use the service account key file
  if (process.env.NODE_ENV !== "production") {
    const fullPath = path.resolve(serviceAccountPath);
    console.log("🔍 Resolved path:", fullPath);

    const serviceAccount = require(fullPath);

    console.log(
      "🔍 Project ID from service account:",
      serviceAccount.project_id,
    );

    // Initialize the Firebase Admin SDK with the service account credentials
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.firebasestorage.app`,
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`, // Add this line if using Realtime Database
    });

    console.log("✅ Firebase Admin SDK initialized (development)");
    console.log("✅ Project ID:", serviceAccount.project_id);
  } else {
    // In production (Cloud Functions), this automatically uses the environment credentials
    admin.initializeApp();
    console.log("✅ Firebase Admin initialized (production mode)");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", error);
  throw error;
}

const firestoreDb = admin.firestore();
firestoreDb.settings({
  databaseId: process.env.FIRESTORE_DATABASE_ID,
});

// Export Firebase services
export const db = firestoreDb;

export const auth = admin.auth();
export const storage = admin.storage();

console.log("✅ Firebase services exported");

export default admin;
