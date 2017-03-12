var router = require('express').Router();
var jwt = require('jwt-simple'); // for encoding and decoding tokens
var db = require('./models/db.js');
var goal = require('./models/goal');
var user = require('./models/user');
var bcrypt = require('bcrypt-promise');

router.get('/goals', function(req, res) {
  console.log('routes.js /goals get is running!!!');
  goal.getAllGoals()
  .then(function(goals) {
    res.send(goals);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.post('/goals', function(req, res) {
  console.log('routes.js /goals post is running!!!');
  goal.addNewGoal(req.body)
  .then(function(newGoal) {
    res.send(newGoal);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.get('/goals/:id', function(req, res) {
  console.log('routes.js /goals/:id get is running!!! id = ', req.params.id);
  goal.findByUserId(req.params.id)
  .then(function(userGoals) {
    res.send(userGoals);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.get('/detail/:id', function(req, res) {
  console.log('routes.js /detail/:id get is running!!! id = ', req.params.id);
  goal.findById(req.params.id)
  .then(function(goalDetails) {
    res.send(goalDetails);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.post('/detail/:id', function(req, res) {
  console.log('routes.js /detail/:id post is running!!!');
  goal.updateToCompleted(req.params.id)
  .then(function() {
    res.send('Status has been updated to Completed');
  })
  .catch(function(err) {
    console.error(err);
  });
});

var userId;

router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var secret = 'Super secret!'
  console.log('routes.js /signup -> user.findByUserName username = ',username,' is running');
  user.findByUsername(username)
  .then(function(result) {
    console.log('user.findByUsername is running result = ',result);
    if(result[0])
      res.sendStatus(409);
    else {
      bcrypt.hash(password, 10)
      .then(function(hashedPassword) {
        var token = jwt.encode(hashedPassword, username);
        var rawUserObj = {
          username: username,
          password: hashedPassword
        }
        user.addUser(rawUserObj)
        .then(function(result) {
          console.log('user.adduser result =',result);
          userId = result[0];
          console.log('the userId = ',userId);
          res.send(token);
        })
        .catch(function(err) {
          console.error(err);
        })
      })
    }
  })
  .catch(function(err) {
    console.error(err);
  })
  // TODO: Complete the signup functionality:
    // Search for username
    // If taken, send a 409 status code
    // If available, hash the password and store it in the database
      // Send back a 201
});

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('routes.js /login is running username = ', username);
  user.findByUsername(username)
  .then(function(result) {
    console.log('user.findByUsername result = ', result);
    userId = result[0].user_id;
    if(!result[0]) {
      console.log('result[0] is undefined')
      res.sendStatus(401);
    }
    else {
      bcrypt.compare(password, result[0].password)
      .then(function(err, same) {
        if(same) {
          console.log('the password is correct');
          var token = jwt.encode(result[0].password, username);
          res.send(token);
        }
        else
          res.sendStatus(401);
      })
    }
  })
  // TODO: Complete the login functionality:
    // Search for username
    // If not found, send back a 401 status code
    // If found, compare the hashed passwords
      // If there is a match
        // Create a token and send it to the client
      // If the match fails send back a 401 status code
});

router.get('/currentUserId', function(req, res) {
  console.log('router.js GET to /currentUserId is running userId = ', userId);
  res.send([userId])
});

module.exports = router;
