const {
  Op: {
    and, iLike, gte, lte,
  },
} = require('sequelize');
const { Meetup, User } = require('../db');

async function find({
  page = null, limit = null, sortBy = 'id', orderBy = 'asc', title, startDate, endDate, tags, location,
}) {
  const meetups = await Meetup.findAll({
    where: {
      [and]: [
        title ? { title: { [iLike]: `%${title}%` } } : null,
        startDate ? { date: { [gte]: startDate } } : null,
        endDate ? { date: { [lte]: endDate } } : null,
        tags ? { tags: (Array.isArray(tags) ? tags : tags.split(',')) } : null,
        location ? { location: { [iLike]: `%${location}%` } } : null,
      ],
    },
    include: { model: User },
    order: [
      [
        sortBy,
        orderBy,
      ],
    ],
    limit,
    offset: ((page - 1) * limit),
  });
  return meetups;
}

async function findById(id) {
  const meetup = await Meetup.findOne({
    where: { id },
    include: { model: User },
  });
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

async function addUserToMeetupById(id, user) {
  const meetup = await findById(id);

  if (meetup) {
    await meetup.addUser(user);

    const updatedMeetup = await findById(id);
    return updatedMeetup;
  }
  return null;
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
  addUserToMeetupById,
  deleteById,
};
