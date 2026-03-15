import { Router } from "express";
import { handleMidtransNotification } from "../controllers/webhookController";

const router = Router();

router.post("/", handleMidtransNotification);

export default router;