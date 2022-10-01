const express = require('express');
const {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
} = require('../controllers/meetup.controller');

const router = express.Router();

router.get('/', findMeetups);
router.get('/:id', findMeetupById);
router.post('/', createMeetup);
router.put('/:id', updateMeetupById);
router.delete('/:id', deleteMeetupById);

module.exports = router;
