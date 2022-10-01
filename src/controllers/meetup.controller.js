const { meetupService } = require('../services');

function findMeetups(req, res) {
  const meetups = meetupService.find();
  res.send(meetups);
}

function findMeetupById(req, res) {
  const { id } = req.params;
  const meetup = meetupService.findById(id);
  res.send(meetup);
}

function createMeetup(req, res) {
  const { body } = req;

  meetupService.create(body);
  res.status(201).send();
}

function updateMeetupById(req, res) {
  const { params: { id }, body } = req;

  meetupService.updateById(id, body);
  res.status(204).send();
}

function deleteMeetupById(req, res) {
  const { id } = req.params;

  meetupService.deleteById(id);
  res.status(204).send();
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
};
