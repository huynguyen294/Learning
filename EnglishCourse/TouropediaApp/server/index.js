import express from "express";
import cors from "cors";
import morgan from "morgan";

import connect from "./configs/db/index.js";
import route from "./routes/index.js";

const port = 8080;

const app = express();

connect();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
