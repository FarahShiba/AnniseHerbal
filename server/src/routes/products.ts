import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/productsController';


const router = Router();

// Route to get all products
router.get('/', getAllProducts);

//Route to get product by id
router.get('/:category/:sizeName/:id', getProductById);

export default router;