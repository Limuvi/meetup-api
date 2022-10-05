const initDB = require('./db.init');
const { Meetup, User, Role } = require('./db.config');

module.exports = {
  initDB,
  Meetup,
  User,
  Role,
};
