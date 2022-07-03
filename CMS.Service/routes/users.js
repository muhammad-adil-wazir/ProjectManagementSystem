// express framework is used in this project
const express = require("express");
// loading middleware to bind with with all incoming requests
const authCheck = require("../middleware/checkAuth");
const {  login, getUserByID,updateStudentLectures } = require("../controllers/userController");

const router = express.Router();
// login route is not protected, rest all are protected by middleware method
router.post("/login", login);
router.get('/:id',authCheck,getUserByID);
router.put("/:id", authCheck, updateStudentLectures);
module.exports = router;
