import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/firebase";
import { firestore, messaging } from "firebase-admin";
import { error, timeStamp } from "node:console";
import productsRouter from "./routes/products";
import contactRoutes from "./routes/contacts";
import newsletterSubscriberRoutes from "./routes/newsletter";

// load environment variables
dotenv.config();

// Initiallize express app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production"
        ? ["https://your-netlify-domain.netlify.app"] // todo: replace with an actuall domain
        : ["http://localhost:5173", "http://localhost:5174"], // Vite default ports
    credentials: true,
  }),
);

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    // // Just check if db is initialized
    const testRef = db.collection("healthCheck").doc("test");
    // This will create a document if it doesn't exist, or update it if it does. We don't care about the content, just that it works.
    await testRef.set({
      lastChecked: new Date().toISOString(),
      status: "ok",
    });

    //read it back to verfiy
    const testdoc = await testRef.get();
    if (!testdoc.exists) {
      throw new Error("Failed to verify Firestore connection");
    }

    res.status(200).json({
      status: "ok",
      message: "Server is running and connected to Firebase",
      timeStamp: new Date().toISOString(),
      firebase: "connected",
      // firestore: firestoreSettings,
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    console.error("health check error", error);
    res.status(500).json({
      status: "error",
      message: "Server is running but firebase connection failed",
      timeStamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});


// Mount products routes
app.use("/api/products", productsRouter);

// Mount get product by id route
app.use("/api/products/:category/:sizeName/:id", productsRouter);

// Mount send the contact data and sending email
app.use("/api", contactRoutes);

// Mount newsletter subscriber route
app.use("/api", newsletterSubscriberRoutes);


//welcome route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Annise Herbal API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      orders: "/api/orders (coming soon)",
      contact: "/api/contact",
      newsletter: "/api/newsLetterSubscriber",
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.log("Error;", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV == "development" ? err.message : undefined,
  });
});

//start server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Products endpoint: http://localhost:${PORT}/api/products`);
    console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`Newsletter endpoint: http://localhost:${PORT}/api/newsLetterSubscriber`);
  });
}

export default app;
