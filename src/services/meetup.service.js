const { Meetup } = require('../db');

async function find() {
  const meetups = await Meetup.findAll();
  return meetups;
}

async function findById(id) {
  const meetup = await Meetup.findByPk(id);
  return meetup;
}

async function create(data) {
  const meetup = Meetup.create(data);

  return meetup;
}

async function updateById(id, data) {
  const [meetup] = await Meetup.update(data, {
    where: { id },
  });
  return meetup;
}

async function deleteById(id) {
  const deleted = await Meetup.destroy({
    where: { id },
  });
  return deleted;
}

module.exports = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
