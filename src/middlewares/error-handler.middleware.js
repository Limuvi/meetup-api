// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { message, status } = err;

  return res
    .status(status || 500)
    .send(status ? { message } : { message: 'Server error' });
}

module.exports = errorHandler;
