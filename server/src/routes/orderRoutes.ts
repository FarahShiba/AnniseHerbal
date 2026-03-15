import  express  from "express";
import { createOrder } from "../controllers/orderControllers";

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', createOrder);

export default router;