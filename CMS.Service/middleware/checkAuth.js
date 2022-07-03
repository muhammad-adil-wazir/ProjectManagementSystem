// loading jwt library to intercept and check all incoming requests
const jwt = require("jsonwebtoken");
// calling cutstom un authorze error handler
const { UnAuthorizedError } = require("../errors");

// this method intercepts all incoming request and check for authenticity
const authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // if there is no token then throw un authorize error
    throw new UnAuthorizedError("no token in the request.");
  }
  try {
    // if there is a token with the request and verify the token 
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY);
    //req.tokenData = { userId: payload.userId, userName: payload.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid token in the request.");
  }
};

module.exports = authCheck;
