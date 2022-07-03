// express framework is used in this project
const express = require("express");
// loading middleware to bind with with all incoming requests
const authCheck = require("../middleware/checkAuth");
const {
  getAllDepartments,
  getDepartmentByID,updateDepartmentLectures
} = require("../controllers/departmentController");

const router = express.Router();
// All routes are protected with jwt token
router.get("/", authCheck, getAllDepartments);
router.get("/:id", authCheck, getDepartmentByID);
router.put("/:id", authCheck, updateDepartmentLectures);
module.exports = router;
