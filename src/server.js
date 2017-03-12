var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/db.js')
var app = express();
var router = require('./routes.js')

app.use(express.static('client'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)

// app.get('/*', function(req, res) {
//   res.sendFile('client/index.html')
// })

app.listen(8080, function () {
  console.log('GoalPosts App \nListening on port 8080...')
})

module.exports = app;
