var test    = require('tape');
var request = require('supertest');
var app     = require('./server.js');

test('GET /goals', function(assert) {
  request(app)
    .get('/goals')
    .expect(200)
    .end(function(err, response) {
      assert.error(err);
      assert.equal(Array.isArray(response.body),
        true,
        'The server should responsd with an array');
      assert.end();
    });
});

test('GET /goals/:id', function(assert) {
  request(app)
    .get('/goals/1')
    .expect(200)
    .end(function(err, response) {
      assert.error(err);
      assert.equal(Array.isArray(response.body),
        true,
        'The server should responsd with an array');
      assert.end();
    });
});
