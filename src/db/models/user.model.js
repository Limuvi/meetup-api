module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};
