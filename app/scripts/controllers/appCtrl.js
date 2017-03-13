(function () {
    'use strict';
    App.classy.controller({
        name: 'AppCtrl',
        inject: ['$rootScope', '$scope', 'AuthService', '$location', '$cookies'],
        data: {
            state: {

            },
            var: {

            }
        },
        init: function () {
            this._onInit();
        },
        watch: {},
        methods: {
            _onInit: function () {
                var _this = this;
                _this.onLoad().getIdRole();
            },
            onLoad: function () {
                var _this = this;
                return {
                    getActiveClass: function (currentState) {
                        if (_this.$rootScope.currentState == currentState) {
                            return 'active';
                        }
                    },
                    getIdRole: function () {
                        _this.AuthService.getIdRole().then(function (response) {
                            _this.$rootScope.idRole = response.idRole;
                        })
                    }
                };
            },
            onClick: function () {
                var _this = this;
                return {
                    logout: function () {
                        _this.AuthService.logout().then(function (response) {
                            _this.$location.path('/login');
                            _this.$cookies.remove("token");
                        });
                    }
                }
            }
        }
    });
})();