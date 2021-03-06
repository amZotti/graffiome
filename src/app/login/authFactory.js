(function() {
  'use strict';
  angular.module('graffio.authFactory', [])
  .factory('authFactory', function() {
    var factory = {};
    factory.logIn = function(ref, scope, state) {
      ref.authWithPassword({
        email    : scope.email,
        password : scope.password
      }, function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          chrome.runtime.sendMessage({action: 'setToken', token: authData.token});
          state.go('main');
        }
      });
    };

    factory.signUp = function(ref, scope, state) {
      ref.createUser({
        email    : scope.email,
        password : scope.password
      }, function(error, authData) {
        if (error) {
          console.log('Error creating user:', error);
        } else {
          ref.authWithPassword({
            email    : scope.email,
            password : scope.password
          }, function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
            } else {
              chrome.runtime.sendMessage({action: 'setToken', token: authData.token});
              state.go('main');
            }
          });
        }
      });
    };
    return factory;
  });
})();
