(function() {
    'use strict';
    App.classy.controller({
        name: 'MainCtrl',
        inject: ['$rootScope', '$scope', 'MainService'],
        data: {
            state: {

            },
            var: {
              imageSlider:[]
            }
        },
        init: function() {
            this._onInit();
        },
        watch: {},
        methods: {
            _onInit: function() {
                var _this = this;
                // _this.onLoad().getImageSlider();
            },
            onLoad: function() {
                var _this = this;
                return {
                    getImageSlider: function(){
                        _this.MainService.getImageSlider().then(function(response){
                            _this.var.imageSlider = response.image;
                        });
                    }
                };
            }
        }
    });
})();