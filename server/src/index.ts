import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {db} from './config/firebase';
import { messaging } from 'firebase-admin';
import { error, timeStamp } from 'node:console';


// load environment variables
dotenv.config();


// Initiallize express app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({
    origin: process.env.NODE_ENV == 'production'
    ? ['https://your-netlify-domain.netlify.app'] // todo: replace with an actuall domain 
    : ['http://localhost:5173', 'http://localhost:5174'], // Vite default ports
    credentials: true,
}));


app.use(express.json());// Parse JSON request bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies


// Health check endpoint
app.get('/api/health', async (req: Request, res: Response)=>{
try {
    const testDoc = await db.collection('_healthcheck').doc('test').get();
    
    res.status(200).json({
        status:'ok', 
        message:'Server is running and connected to Firebase',
        timeStamp: new Date().toISOString(),
        firebase:'connected',
        environment:process.env.NODE_ENV || "wr development"
    });
} catch (error) {
    console.error('health check error', error); 
    res.status(500).json({
        status:'errror',
        message: 'Server is running but firebase connection failed',
        timeStamp: new Date().toISOString(),
        error:error instanceof Error ? error.message : 'Unkown error ',
    });
}

});

//welcome route 
app.get('/', (req: Request, res: Response)=>{
res.json({
    message:'Welcome to Annise Herbal API',
    version:'1.0.0',
    endpoints:{
        health: '/api/health',
        products:'/api/products (coming soon)',
        orders:'/api/orders (coming soon)'
    }

});
});


// 404 handler
app.use((req:Request, res:Response) =>{
    res.status(404).json({
        error:'Endpoint not found',
        path: req.path,
    });
});

// Error handler
app.use((err: Error, req:Request, res:Response, next: any)=>{
    console.log('Error;', err);
    res.status(500).json({
        error:'Internal server error', 
        message: process.env.NODE_ENV == 'development' ? err.message : undefined,
    });

});


//start server
if(process.env.NODE_ENV !== 'production'){
    app.listen(PORT, ()=>{
        console.log('server running on http://localhost:${PORT}');
        console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
}


export default app;