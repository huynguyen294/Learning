const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 8080;

const app = express();

const db = require('./configs/db');
const route = require('./routes');

db.connect();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
