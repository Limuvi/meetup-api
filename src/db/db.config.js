const Sequelize = require('sequelize');
const meetupModel = require('./models/meetup.model');
const userModel = require('./models/user.model');
const roleModel = require('./models/role.model');
const {
  DB_DIALECT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD,
} = require('../constants');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Meetup = meetupModel(sequelize, Sequelize);
db.User = userModel(sequelize, Sequelize);
db.Role = roleModel(sequelize, Sequelize);

// Many-to-many relations
db.User.belongsToMany(db.Meetup, { through: 'userMeetups' });
db.Meetup.belongsToMany(db.User, { through: 'userMeetups' });

// One-to-many relations
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role);
db.User.hasMany(db.Meetup);
db.Meetup.belongsTo(db.User);

module.exports = db;
