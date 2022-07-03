const express = require("express");
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
