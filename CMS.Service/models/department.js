// loading mongoose library to communicate with mongodb
const mongoose = require("mongoose");
// initualizing department schema
const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "Please provide Department name"],
    maxlength: 50,
  },
  // it will just store the primary key of lectures instead of whole object
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
