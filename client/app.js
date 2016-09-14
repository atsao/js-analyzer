var app = angular.module('jsparser', [
  // dependency injections
  'ui.ace'
]);

app.controller('MainController', function($scope, $http) {
  $scope.parsed = {};
  $scope.loading = false;
  $scope.whitelist = {
    pass: false,
    tests: []
  }
  $scope.blacklist = {
    pass: false,
    tests: []
  }
  $scope.structure = {
    pass: false,
    tests: []
  }
  
  $scope.testCode = function() {
    $scope.loading = true;

    var analyzeOptions = {
      method: 'POST',
      url: '/api/analyze',
      data: {
        code: $scope.code
      },
      contentType: 'application/json'
    };

    $http(analyzeOptions).then(function(response) {
      $scope.parsed = response.data;
      return $http.get('/api/analyze/whitelist');
    })
    .then(function(response) {
      $scope.whitelist.pass = response.data.pass;
      $scope.whitelist.tests = response.data.tests;
      return $http.get('/api/analyze/blacklist');
    })
    .then(function(response) {
      $scope.blacklist.pass = response.data.pass;
      $scope.blacklist.tests = response.data.tests;
      return $http.get('/api/analyze/structure');
    })
    .then(function(response) {
      $scope.structure.pass = response.data.pass;
      $scope.structure.tests = response.data.tests;
    })
    .catch(function(error) {
      console.error(error);
    })
    .finally(function() {
      console.log('end');
      console.log($scope.parsed);
      $scope.loading = false;
    })
  }
});

app.service('MainService', function($http) {
  var testCode = function(code) {
    return $http({
      method: 'POST',
      url: '/api/analyze',
      data: {
        code: code
      },
      contentType: 'application/json'
    })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      throw new Error(error);
    });
  }

  return {
    testCode: testCode
  }
});