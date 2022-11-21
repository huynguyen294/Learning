import express from "express";
import { creatorTour, getTour } from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, creatorTour);
router.get("/", getTour);

export default router;
