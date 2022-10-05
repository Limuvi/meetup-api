const CryptoJS = require('crypto-js');
const { ROLE_USER } = require('../constants');
const { User } = require('../db');
const roleService = require('./role.service');

async function findById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function findByUsername(username) {
  const user = await User.findOne({
    where: {
      username,
    },
  });

  return user;
}

function hashPassword(password) {
  return CryptoJS.SHA512(password).toString();
}

async function findByUsernameAndPassword(username, password) {
  const user = await User.findOne({
    where: {
      username,
      hashedPassword: hashPassword(password),
    },
  });

  return user;
}

async function create({ username, password, roleName = ROLE_USER }) {
  const hashedPassword = hashPassword(password);
  const role = await roleService.findByName(roleName);
  const user = await User.create({ username, hashedPassword, roleId: role.id });

  return user;
}

async function updateRefreshTokenById(id, refreshToken) {
  const user = User.update(
    { refreshToken },
    { where: { id } },
  );

  return user;
}

module.exports = {
  findById,
  findByUsername,
  findByUsernameAndPassword,
  create,
  updateRefreshTokenById,
};
