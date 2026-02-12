import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve(__dirname, '../serviceAccountKey.json');

// config for the local development environment, use the service account key file
if(process.env.NODE_ENV === 'production'){
    
    const serviceAccount = require(path.resolve(serviceAccountPath));
    // initialize the Firebase Admin SDK with the service account credentials
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount), 
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
    });
    console.log('Firebase Admin SDK initialized with service account credentials local environment: ' + serviceAccount.project_id);

}else{
      // In production (Cloud Functions), this automatically uses the environment credentials
    admin.initializeApp();
    console.log('Firebase Admin initialized(production mode)')
}

// export Firebase services
export const db = admin.firestore();
export const auth = admin.auth(); 
export const storage = admin.storage(); 


export default admin;