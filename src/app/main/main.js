'use strict';
angular.module('graffio.mainController', [])
.controller('mainController', function($scope, $state, mainFactory) {
  var ref = new Firebase('https://radiant-heat-919.firebaseio.com');


  mainFactory.getStatus(function(status, tabID) {
    if (status.switch === 'on') {
      $state.go('draw');
    }
  });

  $scope.draw = function(){
    $state.go('draw');
  }

  $scope.logout = function() {
    ref.unauth();
    chrome.runtime.sendMessage({action: 'clearToken'});
    $state.go('login');
  };
}).controller('onOffController', function($scope, mainFactory){ 
  $scope.onOffButtonTxt = 'loading...';

  var setStatusUi = function(status) {
    $scope.$apply(function() {
      if (status === 'off') {
        $scope.onOffButtonTxt = 'On';
      } else {
        $scope.onOffButtonTxt = 'Off';
      }
    });
  };

  $scope.toggleStatus = function() {
    mainFactory.getStatus(function(status, tabID) {
      mainFactory.sendTabMessage(status, tabID);
      if (status === 'off') {
        setStatusUi('on');  
      } else {
        setStatusUi('off');
      }
    });
  };
 
  mainFactory.getStatus(function(status) {
    setStatusUi(status);
  });
})
