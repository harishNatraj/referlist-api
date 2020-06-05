const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("DB connection established");
});
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error, ${err.message}`);
});

const user = require('./Routes/User');
const referral = require('./Routes/Referral');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/", user);
app.use("/", referral)

const port = process.env.PORT || 8080;
app.listen(port, () => `Listening on port ${port}`);