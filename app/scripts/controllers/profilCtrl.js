(function () {
  'use strict';
  App.classy.controller({
    name: 'ProfilCtrl',
    inject: ['$rootScope', '$scope', 'UserService', 'Notification'],
    data: {
      state: {
        isChangePassword: false,
        isChangePasswordSuccess: false
      },
      var: {
        input: {
          passwordOld: '',
          passwordNew: '',
          passwordNewConfirm: ''
        },
        myProfile: {},
        message: {

        }
      }
    },
    init: function () {
      this._onInit();
    },
    watch: {},
    methods: {
      _onInit: function () {
        var _this = this;
        _this.onLoad().getProfile();
      },
      onClick: function () {
        var _this = this;
        return {
          isChangePassword: function (condition) {
            _this.state.isChangePassword = condition;

            if (condition) {
              _this.var.input = {
                passwordOld: '',
                passwordNew: '',
                passwordNewConfirm: ''
              }
            }
          }
        }
      },
      onLoad: function () {
        var _this = this;
        return {
          getProfile: function () {
            _this.UserService.getProfile(_this.$rootScope.idUser).then(function (response) {
              _this.var.myProfile = response.data[0];
            });
          }
        };
      },
      onSubmit: function () {
        var _this = this;
        return {
          changePassword: function (myForm) {
            if (myForm.$valid) {
              _this.UserService.changePassword(_this.$rootScope.idUser, _this.var.input.passwordOld, _this.var.input.passwordNew).then(function (response) {
                if (response.success_message) {
                  _this.var.input = {
                    passwordOld: '',
                    passwordNew: '',
                    passwordNewConfirm: ''
                  }
                  myForm.$setPristine();
                  myForm.$setUntouched();
                  _this.var.message.errorMessage = false;
                  _this.var.message.successMessage = "Ubah password berhasil";
                  // _this.Notification.success({ message: "Ubah password berhasil" });
                } else {
                  _this.var.message.errorMessage = "Password salah";
                  _this.var.message.successMessage = false;
                  // _this.Notification.error({message: "Ubah password berhasil"});
                }
              });
            }
          }
        }
      }
    }
  });
})();