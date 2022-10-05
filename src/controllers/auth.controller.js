const { generateToken } = require('../helpers');
const { userService } = require('../services');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);
    if (user) {
      return res.status(409).send({ message: 'User is already exists' });
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
      return res.status(401).json({ message: 'Username or password didn\'t match!' });
    }

    const { id } = user;

    const token = generateToken({ id }, '1m');
    const refreshToken = generateToken({ id }, '30d');

    await userService.updateRefreshTokenById(id, refreshToken);

    res.cookie('access_token', token, { maxAge: 1000 * 60 * 1 });
    res.cookie('refresh_token', refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });

    return res.send();
  } catch (error) {
    return next(error);
  }
};
