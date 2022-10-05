const { Strategy } = require('passport-jwt');
const userService = require('../services/user.service');
require('dotenv').config();

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.access_token;
  }

  return jwt;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, (async (payload, next) => {
  const user = await userService.findById(payload.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
}));

module.exports = {
  jwtStrategy,
};
