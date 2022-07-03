const express = require("express");
const authCheck = require("../middleware/checkAuth");
const {  login, getUserByID,updateStudentLectures } = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.get('/:id',authCheck,getUserByID);
router.put("/:id", authCheck, updateStudentLectures);
module.exports = router;
