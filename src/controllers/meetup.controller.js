const { meetupMapper } = require('../mappers');
const { NotFoundError } = require('../models/errors');
const { meetupService } = require('../services');

async function findMeetups(req, res, next) {
  try {
    const meetups = await meetupService.find();
    const dtos = meetups.map((meetup) => meetupMapper.mapMeetupToDto(meetup));
    return res.send(dtos);
  } catch (error) {
    return next(error);
  }
}

async function findMeetupById(req, res, next) {
  try {
    const { id } = req.params;
    const meetup = await meetupService.findById(id);
    const dto = meetupMapper.mapMeetupToDto(meetup);
    return res.send(dto);
  } catch (error) {
    return next(error);
  }
}

async function createMeetup(req, res, next) {
  try {
    const { body } = req;

    const dto = meetupMapper.mapDtoToMeetup(body);
    const meetup = await meetupService.create(dto);
    return res.status(201).location(`/meetups/${meetup.id}`).send();
  } catch (error) {
    return next(error);
  }
}

async function updateMeetupById(req, res, next) {
  try {
    const { params: { id }, body } = req;

    const dto = meetupMapper.mapDtoToMeetup(body);
    await meetupService.updateById(id, dto);
    res.status(204).send();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function deleteMeetupById(req, res, next) {
  try {
    const { id } = req.params;

    await meetupService.deleteById(id);
    res.status(204).send();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
};
