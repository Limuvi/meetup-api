const { Role } = require('../db');

async function findByName(name) {
  const role = await Role.findOne({
    where: {
      name,
    },
  });

  return role;
}

module.exports = {
  findByName,
};
