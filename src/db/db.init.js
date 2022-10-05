/* eslint-disable no-console */
const db = require('./db.config');
const { ROLE_ORGANIZER, ROLE_USER } = require('../constants');

async function initDB() {
  try {
    await db.sequelize.sync();
    console.log('Connected to DB.');

    await db.Role.findOrCreate({
      where: { name: ROLE_ORGANIZER },
      defaults: {
        name: ROLE_ORGANIZER,
      },
    });
    await db.Role.findOrCreate({
      where: { name: ROLE_USER },
      defaults: {
        name: ROLE_USER,
      },
    });
  } catch (error) {
    console.log(`Failed to connect to DB: ${error.message}`);
  }
}

module.exports = initDB;
