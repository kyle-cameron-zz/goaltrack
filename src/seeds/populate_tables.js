exports.seed = function(knex, Promise) {
  console.log('seeds: seed data is populating!!!');
  return Promise.join(
    knex('users').del(),
    knex('goals').del(),
    // TODO: DELETE ALL ENTRIES IN EXISTING TABLES

    // Insert seed entries
    knex('users').insert({username: 'alice', password: 'alice'}), // :(
    knex('users').insert({username: 'bob', password: 'bob'}),
    knex('goals').insert({description: 'I would like to say Hello Alice!', user_id: 1}),
    knex('goals').insert({description: 'I would like to say Hello Bob!', user_id: 2})
    // TODO: INSERT DATA INTO TABLES
  );

};
