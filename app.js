/** Author : Themba Makamu
 * Date: 31-05-2023
 **/
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { sequelize } = require("./models");
const appRouters = require("./routes/");
const { errorHandler } = require("./middlewares/errorHandler");

// initialize app
const app = express();

dotenv.config({ path: `${__dirname}/config/config.env` });

const port = process.env.PORT || 8001;

// middlewares
app.use(fileUpload());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("method :url :status :res[content-length] - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const NODE_ENV = process.env.NODE_ENV || "dev";

const BASE_URL = `/api/${NODE_ENV}`;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Yes, it is working"
  });
});

// use appRouters
app.use(`${BASE_URL}`, appRouters);

// error handling middlewares
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log(`Database connected on port ${5432}`);
  } catch (e) {
    console.log(e.message);
  }
});
