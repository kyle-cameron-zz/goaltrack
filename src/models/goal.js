var db = require('./db');

var Goal = {};

Goal.addNewGoal = function(rawGoalObj) {
  return db('goals').insert(rawGoalObj)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.error(err)
    });
};

Goal.findById = function(goal_id) {
  return db('goals').where({ goal_id: goal_id }).select('*')
    .then(function(goal) {
      return goal;
    })
    .catch(function(err) {
      console.error(err)
    });
};

Goal.findByUserId = function(user_id) {
  return db('goals').where({ user_id: user_id }).select('*')
    .then(function(goalsByUser) {
      return goalsByUser;
    })
    .catch(function(err) {
      console.error(err)
    });
};
Goal.updateToCompleted = function(goal_id) {
  return db('goals').where({ goal_id: goal_id }).update({ status: 'completed' })
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.error(err)
    });
};
Goal.getAllGoals = function() {
  return db('goals').select('*')
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.error(err)
    });
};

module.exports = Goal;
