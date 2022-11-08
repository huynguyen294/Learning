const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.js");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/google-sign-in", userController.googleSignIn);

module.exports = router;
