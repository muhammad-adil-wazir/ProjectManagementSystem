// doenv package allow us to load enviroment variable from .evn file so we can put all enviroment variables in one place
require("dotenv").config();
// this library is used to catch the error thrown by the middleware and async functions
require("express-async-errors");
// this project is using express framework
const express = require("express");
// cors library is used to allow cross origin access, so other domains can make request to the API
const cors = require("cors");
// morgan library is used to log errors
const morgan = require("morgan");
// loading connectDb method from dbconfig file to connect with database
const connectDb = require("./db/dbConfig");
// loading error handling method from middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
// loading custom routes from routes folder
const userRoute = require("./routes/users");
const lectureRoute = require("./routes/lectures");
const departmentRoute = require("./routes/departments");

const app = express();

app.use(cors());
// parse all request to json
app.use(express.json());
// it parses all url encoded bodies in the requests
app.use(express.urlencoded({ extended: false }));
// logging the errors
app.use(morgan("tiny"));
// configuring the routes defined in routes file
app.use("/api/user", userRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/department", departmentRoute);
// configuring the middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// assigning port from env file
const port = process.env.PORT;
const start = async () => {
  try {
    const url = process.env.MONGO_URI;
    // connecting to mongo db by getting db url from env file
    await connectDb(url);
    app.listen(port, () => {
      console.log(`Server is listening on Port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
