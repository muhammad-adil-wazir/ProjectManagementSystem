const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose/lib/types/objectid");
const { UnAuthorizedError, BadRequestError } = require("../errors");

const login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw new BadRequestError("username and password is required");
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    throw new UnAuthorizedError("invalid user name or password");
  }

    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).json({
      message: "login successful.",
      token,userId: user.id, userName: user.username ,roleId: user.roleid,departmentId : user.departmentid
    });

};
const getUserByID = async (req, res, next) => {
  const usr = await User.find( {'_id':ObjectId(req.params.id)}).populate('lectures').exec(function(err, user){
    if(err){
      res.status(404).json({
        err
      });
    }
    res.status(200).json({
      user,
    });
  });
};
const updateStudentLectures = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user.lectures = req.body;

      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "user with given id not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
module.exports = {
  login,
  getUserByID,
  updateStudentLectures
};
