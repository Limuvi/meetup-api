/* eslint-disable no-console */
const db = require('./db.config');

async function initDB() {
  try {
    await db.sequelize.sync();
    console.log('Connected to DB.');

    await db.Role.findOrCreate({
      where: { name: 'organizer' },
      defaults: {
        name: 'organizer',
      },
    });
    await db.Role.findOrCreate({
      where: { name: 'user' },
      defaults: {
        name: 'user',
      },
    });
  } catch (error) {
    console.log(`Failed to connect to DB: ${error.message}`);
  }
}

module.exports = initDB;
