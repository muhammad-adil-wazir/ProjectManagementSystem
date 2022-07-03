// custom error handler class to throw un authorized error
class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthorizedError;
