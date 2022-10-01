const Sequelize = require('sequelize');
const meetupModel = require('./models/meetup.model');
require('dotenv').config();

const {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

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

module.exports = db;
