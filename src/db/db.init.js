/* eslint-disable no-console */
const db = require('./db.config');

function initDB() {
  db.sequelize.sync()
    .then(() => {
      console.log('Connected to DB.');
    })
    .catch((err) => {
      console.log(`Failed to connect to DB: ${err.message}`);
    });
}

module.exports = initDB;
