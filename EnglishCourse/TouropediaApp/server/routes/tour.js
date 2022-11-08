const express = require("express");
const router = express.Router();

const tourController = require("../controllers/tour.js");

router.post("/", tourController.creatorTour);
router.get("/", tourController.getTour);

module.exports = router;
