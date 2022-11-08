const TourModal = require("../models/tour.js");

class tourController {
  //[POST] /tours/
  async creatorTour(req, res) {
    const tour = req.body;
    const newTour = new TourModal({
      ...tour,
      createAt: new Date().toISOString(),
    });

    try {
      await newTour.save();
      res.status(201).json(newTour);
    } catch (error) {
      res.status(500).json({ message: "something went wrong!" });
      console.log(error);
    }
  }

  //[POST] /tours/
  async getTour(req, res) {
    try {
      const tours = await TourModal.find();
      res.status(201).json(tours);
    } catch (error) {
      res.status(500).json({ message: "something went wrong!" });
      console.log(error);
    }
  }
}

module.exports = new tourController();
