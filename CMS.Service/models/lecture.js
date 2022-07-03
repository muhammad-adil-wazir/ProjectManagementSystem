const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  lectureName: {
    type: String,
    required: [true, "Please provide Lecture name"],
    maxlength: 50,
  },
  credit: {
    type: Number
  },
  departmentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      required: false,
  },
  remarks: {
    type: String,
    required: [false],
    maxlength: 100,
  },
});

const lecture = mongoose.model("lectures", lectureSchema);

module.exports = lecture;
