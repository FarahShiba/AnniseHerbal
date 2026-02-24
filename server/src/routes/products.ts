import { Router } from 'express';
import { getAllProducts } from '../controllers/productsController';


const router = Router();

// Route to get all products
router.get('/', getAllProducts);

export default router;