'use strict';
var Config = angular.module('myWebApp.config', []);
var App = angular
  .module('myWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'myWebApp.config',
    'classy',
    'ui.router',
    'ui.select',
    'ui-notification'
  ])
  .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            $rootScope.currentState = $state.current.name;
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            $rootScope.currentState = $state.current.name;
        });

    }])