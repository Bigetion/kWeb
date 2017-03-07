(function() {
    'use strict';
    App.classy.controller({
        name: 'AppCtrl',
        inject: ['$rootScope', '$scope'],
        data: {
            state: {

            },
            var: {

            }
        },
        init: function() {
            this._onInit();
        },
        watch: {},
        methods: {
            _onInit: function() {
              var _this = this;
              
            },
            onLoad: function() {
                var _this = this;
                return {
                    getActiveClass: function(currentState){
                      if(_this.$rootScope.currentState == currentState){
                        return 'active';
                      }
                    }
                };
            }
        }
    });
})();