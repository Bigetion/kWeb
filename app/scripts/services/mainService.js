(function() {
    'use strict';
    App.service('MainService', ['$http', 'HttpService', 'API_BASE_URL', function($http, HttpService, API_BASE_URL) {
        return {
            getUserInfo: function(){
                return HttpService.execute(API_BASE_URL + 'page/data/getUserInfo', {}, "Get User Info");
            },
            getImageSlider: function(){
                return HttpService.execute(API_BASE_URL + 'page/data/getImageSlider', {}, "Get Image Slider");
            }
        }
    }])

})();