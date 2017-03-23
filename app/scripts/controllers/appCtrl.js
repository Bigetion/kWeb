(function () {
    'use strict';
    App.classy.controller({
        name: 'AppCtrl',
        inject: ['$rootScope', '$scope', '$interval', 'AuthService', '$location', '$cookies', 'MainService'],
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
                _this.onLoadApp().globalTick();

                _this.$interval(_this.onLoadApp().globalTick, 10);
            },
            onLoadApp: function () {
                var _this = this;
                return {
                    globalTick: function(){
                        if (angular.element('#loading-bar').length ) {
                            _this.$rootScope.isGlobalLoading = true;
                        }else{
                            _this.$rootScope.isGlobalLoading = false;
                        }
                    },
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