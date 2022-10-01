function mapMeetupToDto(meetup) {
  return {
    id: meetup.id,
    title: meetup.title,
    description: meetup.description,
    tags: meetup.tags,
    date: meetup.date,
    location: meetup.location,
  };
}

function mapDtoToMeetup(dto) {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    tags: dto.tags,
    date: dto.date,
    location: dto.location,
  };
}

module.exports = {
  mapMeetupToDto,
  mapDtoToMeetup,
};
