import express from "express";
import { signIn, signUp, googleSignIn } from "../controllers/user.js";

const router = express.Router();

router.post("/sign-up", signIn);
router.post("/sign-in", signIn);
router.post("/google-sign-in", googleSignIn);

export default router;
