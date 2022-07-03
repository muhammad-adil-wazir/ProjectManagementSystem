// loading mongoose library, which will be used to communicate with the mongodb
const mongoose = require("mongoose");

// this method let us connect with the database
const connectDb = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDb;
