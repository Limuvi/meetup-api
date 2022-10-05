const {
  signup,
  signin,
} = require('../controllers/auth.controller');
const { validate } = require('../middlewares');
const { userSchema } = require('../validators');

module.exports = (route, app) => {
  app.post(
    `${route}/signup`,
    [
      validate(userSchema),
    ],
    signup,
  );
  app.post(
    `${route}/signin`,
    [
      validate(userSchema),
    ],
    signin,
  );
};
