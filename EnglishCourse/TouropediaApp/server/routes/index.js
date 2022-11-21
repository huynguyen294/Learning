import userRoute from "./user.js";
import tourRoute from "./tour.js";

const route = (app) => {
  app.use("/users", userRoute);
  app.use("/tours", tourRoute);
  app.get("/", (req, res) => {
    res.send("Hello");
  });
};

export default route;
