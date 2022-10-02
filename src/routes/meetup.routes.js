const express = require('express');
const {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
} = require('../controllers/meetup.controller');
const { validator } = require('../middlewares');
const { meetupSchema } = require('../validators');

const router = express.Router();

router.get('/', findMeetups);
router.get('/:id', findMeetupById);
router.post(
  '/',
  [validator(meetupSchema)],
  createMeetup,
);
router.put(
  '/:id',
  [validator(meetupSchema)],
  updateMeetupById,
);
router.delete('/:id', deleteMeetupById);

module.exports = router;
