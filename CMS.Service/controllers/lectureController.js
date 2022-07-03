// loading lecture schema from models folder
const Lectures = require("../models/lecture");
const { ResultNotFoundError } = require("../errors");
// objectId is required to query database for any particular record
const ObjectId = require("mongoose/lib/types/objectid");
// this methord will return all lectures
const getAllLectures = async (req, res, next) => {
  const lectures = await Lectures.find({});
  res.status(200).json({
    lectures,
  });
};
// thid method will return all lectures which either have department id same as request id or don't have any department id
const getAllLectureByDepartmentID = async (req, res, next) => {
  // query to find record by department id or if there is no department id column
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
