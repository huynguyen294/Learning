import TourModal from "../models/tour.js";

//[POST] /tours/
export const creatorTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
    console.log(error);
  }
};

//[POST] /tours/
export const getTour = async (req, res) => {
  try {
    const tours = await TourModal.find();
    res.status(201).json(tours);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
    console.log(error);
  }
};
