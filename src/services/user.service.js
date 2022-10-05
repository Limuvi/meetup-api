const CryptoJS = require('crypto-js');
const { User } = require('../db');

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

async function create({ username, password }) {
  const hashedPassword = hashPassword(password);
  const user = User.create({ username, hashedPassword });

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
