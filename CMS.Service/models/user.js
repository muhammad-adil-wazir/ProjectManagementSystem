const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  gpa: {
    type: Number,
    required: false,
  },
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
