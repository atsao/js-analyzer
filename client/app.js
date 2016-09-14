var app = angular.module('jsparser', [
  // dependency injections
  'ui.ace'
]);

app.controller('MainController', function($scope, $http) {
  $scope.parsed = {};
  $scope.loading = false;
  $scope.whitelistPass = false;
  $scope.whitelistTests = [];
  $scope.blacklistPass = false;
  $scope.blaclistTests = [];
  $scope.structurePass = false;
  $scope.structureTests = [];
  
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
      console.log('whitelist data:', response.data);
      return $http.get('/api/analyze/blacklist');
    })
    .then(function(response) {
      console.log('blacklist data:', response.data);
      return $http.get('/api/analyze/structure');
    })
    .then(function(response) {
      console.log('structure data:', response.data);
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