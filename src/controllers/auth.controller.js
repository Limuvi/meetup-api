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

    const token = generateToken({ id: user.id }, '30m');
    return res.send({ token });
  } catch (error) {
    return next(error);
  }
};
