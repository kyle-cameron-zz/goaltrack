exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('user_id').primary();
      table.string('username', 20);
      table.string('password', 50);
    }),
    knex.schema.createTableIfNotExists('goals', function (table) {
      table.increments('goal_id').primary();
      table.string('title', 20).defaultTo('No Title Set');
      table.string('description', 200);
      table.string('status', 20).defaultTo('Incomplete');
      table.timestamp('due_date');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user_id').inTable('users');
    })
  ]);

};

exports.down = function(knex, Promise) {
  // TODO: DROP OTHER TABLES
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('goals')
  ]);
};
