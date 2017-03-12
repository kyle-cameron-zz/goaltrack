angular.module('GoalPosts', [
  'GoalPosts.Auth.Service',
  'GoalPosts.Auth.Controller',
  'GoalPosts.Goals.Service',
  'GoalPosts.Detail.Controller',
  'GoalPosts.GoalForm.Controller',
  'GoalPosts.Goals.Controller',
  'ngRoute'
])

.config(function ($routeProvider, $httpProvider, $locationProvider) {
  $routeProvider
    .when('/goals/:id', {
      templateUrl: 'views/goals.html',
      controller: 'GoalsController',
      authenticate: true

    })
    .when('/goals', {
      templateUrl: 'views/goal-form.html',
      controller: 'GoalFormController',
      authenticate: true
    })
    .when('/detail/:id', {
      templateUrl: 'views/detail.html',
      controller: 'DetailController',
      authenticate: true
    })
    // .when('/currentUserId', {
    //   templateUrl: 'views/goal-form.html',
    //   controller: 'GoalFormController'
    // })

    .when('/signin', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/goals'
    })
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.gp');
      if (jwt) object.headers['x-access-token'] = jwt;
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
