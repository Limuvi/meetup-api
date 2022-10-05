const { meetupMapper } = require('../helpers');
const { NotFoundError } = require('../models/errors');
const { ForbiddenError } = require('../models/errors');
const { meetupService } = require('../services');

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
    const { body, user: { id: userId } } = req;

    const dto = meetupMapper.mapDtoToMeetup(body);
    const meetup = await meetupService.create({ ...dto, userId });
    return res.status(201).location(`/meetups/${meetup.id}`).send();
  } catch (error) {
    return next(error);
  }
}

async function updateMeetupById(req, res, next) {
  try {
    const { params: { id }, body, user: { id: userId } } = req;

    const dto = meetupMapper.mapDtoToMeetup(body);
    const meetup = await meetupService.findById(id);

    if (!meetup) {
      const { id: newId } = await meetupService.create({ ...dto, userId });
      return res.status(201).location(`/meetups/${newId}`).send();
    }
    if (meetup.userId !== userId) {
      throw new ForbiddenError();
    }

    await meetupService.updateById(id, dto);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function addMemberToMeetup(req, res, next) {
  try {
    const { params: { id }, user } = req;

    const meetup = await meetupService.addUserToMeetupById(id, user);

    if (!meetup) {
      throw new NotFoundError('Meetup is not found!');
    }

    const dto = meetupMapper.mapMeetupToDto(meetup);

    return res.status(200).send(dto);
  } catch (error) {
    return next(error);
  }
}

async function deleteMeetupById(req, res, next) {
  try {
    const { params: { id }, user: { id: userId } } = req;

    const meetup = await meetupService.findById(id);

    if (meetup.userId !== userId) {
      throw new ForbiddenError();
    }

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
  addMemberToMeetup,
  deleteMeetupById,
};
