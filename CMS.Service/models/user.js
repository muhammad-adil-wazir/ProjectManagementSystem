// loading mongoose library to communicate with mongodb
const mongoose = require("mongoose");

// initializing user schema
// there are some common columns which are being used by different entities like teacher and student
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  username: {
    type: String,
    required: [true, "username is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required."],
    minlength: [3, "password must be greated then 3 characters"],
  },
  roleid: {
    type: Number,
    required: true,
  },
  departmentid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: false,
},
// gpa column is used by the user who is student
  gpa: {
    type: Number,
    required: false,
  },
  // lectures column is used by the user who is student
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lectures",
      required: false,
    }
  ],
});



const user = mongoose.model("users", userSchema);

module.exports = user;
