(function () {
    'use strict';
    App.classy.controller({
        name: 'AppCtrl',
        inject: ['$rootScope', '$scope', 'AuthService', '$location', '$cookies', 'MainService'],
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
                _this.onLoadApp().getUserInfo();
            },
            onLoadApp: function () {
                var _this = this;
                return {
                    getActiveClass: function (currentState) {
                        if (_this.$rootScope.currentState == currentState) {
                            return 'active';
                        }
                    },
                    getUserInfo: function () {
                        if (!_this.$rootScope.idRole) {
                            _this.MainService.getUserInfo().then(function (response) {
                                _this.$rootScope.idRole = response.idRole;
                                _this.$rootScope.idUser = response.idUser;
                                _this.$rootScope.username = response.username;
                                _this.$rootScope.roleName = response.roleName;
                            });
                        }
                    }
                };
            },
            onClickApp: function () {
                var _this = this;
                return {
                    logout: function () {
                        _this.AuthService.logout().then(function (response) {
                            _this.$rootScope.idRole = 2;
                            _this.$rootScope.idUser = 2;
                            _this.$location.path('/');
                            _this.$cookies.remove("token");
                        });
                    }
                }
            }
        }
    });
})();