// custom error handler class to throw not found error
class ResultNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = ResultNotFoundError;
