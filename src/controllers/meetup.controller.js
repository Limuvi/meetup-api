const { meetupMapper } = require('../helpers');
const { NotFoundError } = require('../models/errors');
const { meetupService } = require('../services');

// todo(?): create validator for request params
async function findMeetups(req, res, next) {
  try {
    const meetups = await meetupService.find(req.query);
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

    if (!meetup) {
      throw new NotFoundError('Meetup is not found!');
    }

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
    const meetup = await meetupService.updateById(id, dto);

    if (!meetup) {
      const { id: newId } = await meetupService.create(dto);
      return res.status(201).location(`/meetups/${newId}`).send();
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function deleteMeetupById(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await meetupService.deleteById(id);

    if (!deleted) {
      throw new NotFoundError('Meetup is not found!');
    }

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
