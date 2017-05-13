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
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'ui.select2',
        'ui-notification',
        'ngLodash',
        'ngTagsInput',
        'angular-loading-bar',
        'smart-table',
        'angularMoment'
    ]).run(['$rootScope', '$state', '$location', 'AuthService', function ($rootScope, $state, $location, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {

        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            var stateName = $state.current.name;
            $rootScope.currentState = stateName;

            if (!$rootScope.idRole) {
                AuthService.getUserInfo().then(function (response) {
                    $rootScope.idRole = response.idRole;
                    $rootScope.idUser = response.idUser;
                    $rootScope.username = response.username;
                    $rootScope.roleName = response.roleName;

                    if ((stateName == 'barang' || stateName == 'qRCode' || stateName == 'pemetaan') && $rootScope.idRole != 2) {
                        $location.path('/');
                    } else if ((stateName == 'sertifikat' || stateName == 'pengguna' || stateName == 'perusahaan') && $rootScope.idRole == 2) {
                        $location.path('/login');
                    }
                });
            } else {
                if ((stateName == 'barang' || stateName == 'qRCode' || stateName == 'pemetaan') && $rootScope.idRole != 2) {
                    $location.path('/');
                } else if ((stateName == 'sertifikat' || stateName == 'pengguna' || stateName == 'perusahaan') && $rootScope.idRole == 2) {
                    $location.path('/login');
                }
            }
        });

    }])