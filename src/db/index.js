const initDB = require('./db.init');
const { Meetup, User } = require('./db.config');

module.exports = {
  initDB,
  Meetup,
  User,
};
