(function () {
    'use strict';
    App.classy.controller({
        name: 'LoginCtrl',
        inject: ['$rootScope', '$scope', 'AuthService', '$cookies', '$location'],
        data: {
            state: {

            },
            var: {
                username: '',
                password: '',
                message: {
                    error: '',
                    success: ''
                }
            }
        },
        init: function () {
            this._onInit();
        },
        watch: {},
        methods: {
            _onInit: function () {

            },
            onClick: function () {
                var _this = this;
                return {
                    submitLogin: function (myForm) {
                        if (myForm.$valid) {
                            _this.AuthService.submitLogin(_this.var.username, _this.var.password).then(function (response) {
                                _this.var.message = {
                                    error: response.error_message,
                                    success: response.success_message
                                }
                                if (response.success_message) {
                                    _this.$cookies.put('token', response.jwt);
                                    _this.$location.path('/');
                                }
                            });
                        }
                    }
                };
            },
            onLoad: function () {
                var _this = this;
                return {

                };
            }
        }
    });
})();