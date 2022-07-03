const Lectures = require("../models/lecture");
const { ResultNotFoundError } = require("../errors");
const ObjectId = require("mongoose/lib/types/objectid");

const getAllLectures = async (req, res, next) => {
  const lectures = await Lectures.find({});
  res.status(200).json({
    lectures,
  });
};
const getAllLectureByDepartmentID = async (req, res, next) => {
  const lectures = await Lectures.find({
    $or: [
      { departmentid: { $exists:false } },
      { departmentid:ObjectId(req.params.departmentid) }
    ]});
  res.status(200).json({
    lectures,
  });
};

module.exports = {
  getAllLectures,
  getAllLectureByDepartmentID
};
