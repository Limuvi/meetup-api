const {
  signup,
  signin,
} = require('../controllers/auth.controller');
const { validator } = require('../middlewares');
const { userSchema } = require('../validators');

module.exports = (route, app) => {
  app.post(
    `${route}/signup`,
    [
      validator(userSchema),
    ],
    signup,
  );
  app.post(
    `${route}/signin`,
    [
      validator(userSchema),
    ],
    signin,
  );
};
