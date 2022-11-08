const userRoute = require("./user.js");
const tourRoute = require("./tour.js");

function route(app) {
  app.use("/users", userRoute);
  app.use("/tours", tourRoute);
  app.get("/", (req, res) => {
    res.send("Hello");
  });
}

module.exports = route;
