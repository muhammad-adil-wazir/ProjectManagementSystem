// loading user schema from models folder
const User = require("../models/user");
// jsonwebtoken library is required to use jwt authentication
const jwt = require("jsonwebtoken");
// objectId is required to query database for any particular record
const ObjectId = require("mongoose/lib/types/objectid");
// loading midlware methods to handle exceptions
const { UnAuthorizedError, BadRequestError } = require("../errors");

// login method will authenticate user against provided username and password, if successfull, respond with a token
const login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw new BadRequestError("username and password is required");
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    // if there is no user with provided username then throw an exception
    throw new UnAuthorizedError("invalid user name or password");
  }
  // if username and password matches a record in db then generate a jwt token and send it with the response
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
// this method will return a user record by id
const getUserByID = async (req, res, next) => {
  const usr = await User.find( {'_id':ObjectId(req.params.id)}).populate('lectures').exec(function(err, user){
    if(err){
      // if there is no user with the provided id then return not found error
      res.status(404).json({
        err
      });
    }
    res.status(200).json({
      user,
    });
  });
};
// this method updates lectures of a student
//  id will be received in the request parameter
const updateStudentLectures = async (req, res, next) => {
  try {
        // query db to find lectures by id and update lectures 
    let user = await User.findById(req.params.id);
    if (user) {
            // if user id not null then update its lectures from the request body
      user.lectures = req.body;
      // save records in database
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
