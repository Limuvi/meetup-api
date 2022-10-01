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

function find() {
  return meetups;
}

function findById(id) {
  const meetup = meetups.find((element) => element.id === +id);
  return meetup;
}

function create(meetup) {
  const id = meetups.length + 1;
  meetups.push({ id, ...meetup });

  return meetups;
}

function updateById(id, meetup) {
  meetups[id - 1] = { id: +id, ...meetup };
  return meetups;
}

function deleteById(id) {
  meetups = meetups.filter((meetup) => meetup.id !== +id);
  return meetups;
}

module.exports = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
