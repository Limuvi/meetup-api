let meetups = [
  {
    id: 1,
    title: 'Node.js meetup',
    decription: 'blahblahblah',
    tags: ['js', 'node.js', 'backend'],
    date: '01.10.2022 12:30',
    location: 'Vitebsk',
  },
  {
    id: 2,
    title: 'React.js meetup',
    decription: 'blahblahblah',
    tags: ['js', 'react.js', 'frontend'],
    date: '01.10.2022 12:30',
    location: 'Vitebsk',
  },
];

function findMeetups(req, res) {
  res.send(meetups);
}

function findMeetupById(req, res) {
  const { id } = req.params;
  const meetup = meetups.find((element) => element.id === +id);
  res.send(meetup);
}

function createMeetup(req, res) {
  const { body } = req;
  const id = meetups.length + 1;

  meetups.push({ id, ...body });
  res.status(201).send();
}

function updateMeetupById(req, res) {
  const { params: { id }, body } = req;

  meetups[id - 1] = { id: +id, ...body };
  res.status(204).send();
}

function deleteMeetupById(req, res) {
  const { id } = req.params;
  meetups = meetups.filter((meetup) => meetup.id !== +id);
  res.status(204).send();
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
  updateMeetupById,
  deleteMeetupById,
};
