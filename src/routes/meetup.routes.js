const {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  addMemberToMeetup,
  deleteMeetupById,
} = require('../controllers/meetup.controller');
const { validator } = require('../middlewares');
const { meetupSchema } = require('../validators');

module.exports = (route, app, passport) => {
  app.get(
    `${route}/`,
    findMeetups,
  );
  app.get(`${route}/:id`, findMeetupById);
  app.post(
    `${route}/`,
    [
      passport.authenticate('jwt', { session: false }),
      validator(meetupSchema),
    ],
    createMeetup,
  );
  app.put(
    `${route}/:id`,
    [
      passport.authenticate('jwt', { session: false }),
      validator(meetupSchema),
    ],
    updateMeetupById,
  );
  app.patch(
    `${route}/:id/members`,
    [
      passport.authenticate('jwt', { session: false }),
    ],
    addMemberToMeetup,
  );
  app.delete(
    `${route}/:id`,
    [
      passport.authenticate('jwt', { session: false }),
    ],
    deleteMeetupById,
  );
};
