import { Router } from "express";
import { submitNewsletterSubscriberForm } from "../controllers/newsletterController";

const router = Router();

router.post("/newsletter/subscribe", submitNewsletterSubscriberForm);

export default router;
