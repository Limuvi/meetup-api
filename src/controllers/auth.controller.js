const {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_JWT_EXPIRES_IN,
  REFRESH_TOKEN_JWT_EXPIRES_IN,
} = require('../constants');
const { generateToken } = require('../helpers');
const { ConflictError, UnauthorizedError } = require('../models/errors');
const { userService } = require('../services');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);
    if (user) {
      throw new ConflictError('User is already exists');
    }

    const newUser = userService.create({ username, password });

    return res.send(newUser);
  } catch (error) {
    return next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userService.findByUsernameAndPassword(username, password);

    if (!user) {
      throw new UnauthorizedError('Username or password didn\'t match!');
    }

    const { id } = user;

    const token = generateToken({ id }, ACCESS_TOKEN_JWT_EXPIRES_IN);
    const refreshToken = generateToken({ id }, REFRESH_TOKEN_JWT_EXPIRES_IN);

    await userService.updateRefreshTokenById(id, refreshToken);

    res.cookie('access_token', token, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE });
    res.cookie('refresh_token', refreshToken, { maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE });

    return res.send();
  } catch (error) {
    return next(error);
  }
};
