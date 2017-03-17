(function() {
    'use strict';
    App.service('AuthService', ['$http', 'HttpService', 'API_BASE_URL', function($http, HttpService, API_BASE_URL) {
        return {
            submitLogin: function(username, password) {
                var data = {
                    username: username,
                    password: password
                }
                return HttpService.execute(API_BASE_URL + 'login', data, "Login");
            },
            logout: function() {
                return HttpService.execute(API_BASE_URL + 'login/logout', {}, "Logout");
            },
            getUserInfo: function(){
                return HttpService.execute(API_BASE_URL + 'page/data/getUserInfo', {}, "Get User Info");
            }
        }
    }])

})()