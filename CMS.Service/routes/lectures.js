const express = require("express");
const authCheck = require("../middleware/checkAuth");
const {
  getAllLectures,getAllLectureByDepartmentID
} = require("../controllers/lectureController");

const router = express.Router();
// All routes are protected with jwt token
router.get("/", authCheck, getAllLectures);
router.get("/:departmentid", authCheck, getAllLectureByDepartmentID);

module.exports = router;
