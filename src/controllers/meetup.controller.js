const { meetupService } = require('../services');

async function findMeetups(req, res) {
  try {
    const meetups = await meetupService.find();
    res.send(meetups);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function findMeetupById(req, res) {
  try {
    const { id } = req.params;
    const meetup = await meetupService.findById(id);
    res.send(meetup);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createMeetup(req, res) {
  try {
    const { body } = req;

    const meetup = await meetupService.create(body);
    res.status(201).location(`/meetups/${meetup.id}`).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateMeetupById(req, res) {
  try {
    const { params: { id }, body } = req;

    await meetupService.updateById(id, body);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteMeetupById(req, res) {
  try {
    const { id } = req.params;

    await meetupService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
};
