const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "Please provide Department name"],
    maxlength: 50,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lectures",
      required: false,
    }
  ],
  remarks: {
    type: String,
    required: [false],
    maxlength: 100,
  },
});

const department = mongoose.model("departments", departmentSchema);

module.exports = department;
