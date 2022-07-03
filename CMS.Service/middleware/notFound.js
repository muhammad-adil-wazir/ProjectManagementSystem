// middleware method which is using custom error handler
const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
};

module.exports = notFound;
