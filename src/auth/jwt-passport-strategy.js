const { Strategy, ExtractJwt } = require('passport-jwt');
const userService = require('../services/user.service');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
