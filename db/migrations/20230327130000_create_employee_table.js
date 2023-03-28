exports.up = function (knex) {
  return knex.schema.createTable('employee', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('age');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('employee');
};
