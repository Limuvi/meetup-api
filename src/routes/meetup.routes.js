const { ROLE_USER, ROLE_ORGANIZER } = require('../constants');
const {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  addMemberToMeetup,
  deleteMeetupById,
} = require('../controllers/meetup.controller');
const { validator, checkRole } = require('../middlewares');
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
      checkRole(ROLE_ORGANIZER),
      validator(meetupSchema),
    ],
    createMeetup,
  );
  app.put(
    `${route}/:id`,
    [
      passport.authenticate('jwt', { session: false }),
      checkRole(ROLE_ORGANIZER),
      validator(meetupSchema),
    ],
    updateMeetupById,
  );
  app.patch(
    `${route}/:id/members`,
    [
      passport.authenticate('jwt', { session: false }),
      checkRole(ROLE_USER),
    ],
    addMemberToMeetup,
  );
  app.delete(
    `${route}/:id`,
    [
      passport.authenticate('jwt', { session: false }),
      checkRole(ROLE_ORGANIZER),
    ],
    deleteMeetupById,
  );
};
