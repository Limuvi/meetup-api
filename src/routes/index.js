const express = require('express');
const meetupRouter = require('./meetup.routes');

const router = express.Router();

router.use('/meetups', meetupRouter);

module.exports = router;
