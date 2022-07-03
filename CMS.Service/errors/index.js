// index class is exporting all custom error handlers
const BadRequestError = require("./badRequest");
const UnAuthorizedError = require("./unAuthorize");
const ResultNotFoundError = require("./notFound");

module.exports = {
  BadRequestError,
  UnAuthorizedError,
  ResultNotFoundError,
};
