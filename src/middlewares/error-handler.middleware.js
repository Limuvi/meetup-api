function errorHandler(err, req, res, next) {
  const { message, status } = err;
  console.log(message);

  return res
    .status(status || 500)
    .send({ message: (message || 'Server error') });
}

module.exports = errorHandler;
