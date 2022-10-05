/* eslint-disable no-console */
const db = require('./db.config');
const { ROLE_ORGANIZER, ROLE_USER } = require('../constants');
const { hashPassword } = require('../helpers');

async function initDB() {
  try {
    await db.sequelize.sync();
    console.log('Connected to DB.');

    const [organizerRole] = await db.Role.findOrCreate({
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

    const username = 'admin';
    const password = '12345';
    const userData = {
      username,
      hashedPassword: hashPassword(password),
      roleId: organizerRole.id,
    };

    const user = await db.User.findOne({
      where: { username },
    });

    if (!user) {
      await db.User.create(userData);
    } else {
      await user.update(userData);
    }

    console.log(`Upserted ${ROLE_ORGANIZER}`, { username, password });
  } catch (error) {
    console.log(`Failed to connect to DB: ${error.message}`);
  }
}

module.exports = initDB;
