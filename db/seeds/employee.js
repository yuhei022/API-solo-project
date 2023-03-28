exports.seed = async function (knex) {
  await knex('employee').del();
  await knex('employee').insert([
    {
      id: 1,
      name: 'Ichiro Tanaka',
      age: 30,
    },
    {
      id: 2,
      name: 'Jiro Yamada',
      age: 41,
    },
    {
      id: 3,
      name: 'Saburo Sato',
      age: 28,
    },
  ]);
};
