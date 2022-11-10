const express = require("express");
const router = express.Router();

const tourController = require("../controllers/tour.js");
const { default: auth } = require("../middleware/auth.js");

router.post("/", auth, tourController.creatorTour);
router.get("/", tourController.getTour);

module.exports = router;
