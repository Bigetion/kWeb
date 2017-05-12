(function () {
  'use strict';
  App.classy.controller({
    name: 'UserCtrl',
    inject: ['$rootScope', '$scope', 'UserService', 'lodash', 'Notif'],
    data: {
      state: {
        isAdd: false,
        isEdit: false
      },
      collection: {
        userList: {
          data: []
        }
      },
      var: {
        rowEdit: {},
        options: {
          roleOptions: [],
          LSPROOptions: [],
        },
        input: {
          nama: '',
          namaUser: '',
          role: '',
          email: '',
          password: '',
          passwordKonfirm: ''
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
        _this.onLoad().getUserList();
      },
      onLoad: function () {
        var _this = this;
        return {
          getUserList: function () {
            _this.UserService.getData().then(function (response) {
              _this.collection.userList.data = response.data;
            });
          },
          getRoleOptions: function () {
            _this.UserService.getRoleOptions().then(function (response) {
              _this.lodash.remove(response.data, function (o) { return o.id_role == 2 });
              _this.var.options.roleOptions = response.data;
            });
          },
          getLSPROOptions: function () {
            _this.UserService.getLSPROOptions().then(function (response) {
              _this.var.options.LSPROOptions = response.data;
            });
          }
        };
      },
      onClick: function () {
        var _this = this;
        return {
          isAdd: function (condition) {
            _this.state.isAdd = condition;
            if (condition) {
              _this.onLoad().getRoleOptions();
              _this.onLoad().getLSPROOptions();
              _this.var.input = {
                nama: '',
                namaUser: '',
                role: '',
                lspro: '',
                email: '',
                password: '',
                passwordKonfirm: ''
              }
            }
          },
          isEdit: function (condition, row) {
            _this.state.isEdit = condition;
            if (condition) {
              _this.var.rowEdit = row;
              _this.var.input = {
                nama: row.nama,
                namaUser: row.username,
                email: row.email
              }
              _this.UserService.getRoleOptions().then(function (response) {
                _this.lodash.remove(response.data, function (o) { return o.id_role == 2 });
                _this.var.options.roleOptions = response.data;
                var roleIndex = _this.lodash.findIndex(_this.var.options.roleOptions, { id_role: row.id_role });
                _this.var.input.role = _this.var.options.roleOptions[roleIndex];
              });

              _this.UserService.getLSPROOptions().then(function (response) {
                _this.var.options.LSPROOptions = response.data;
                var lsproIndex = _this.lodash.findIndex(_this.var.options.LSPROOptions, { id_user: row.id_user });
                _this.var.input.lspro = _this.var.options.LSPROOptions[lsproIndex];
              });
            }
          },
          delete: function (row, index) {
            var deleteRow = function () {
              _this.UserService.submitDelete(row.id_user, row.id_external).then(function (response) {
                if (response.success_message) {
                  _this.collection.userList.data.splice(index, 1);
                }
              });
            }
            _this.Notif.confirmation({
              headerTitle: 'Konfirmasi Hapus',
              message: 'Anda yakin ingin menghapus data ini ?',
              okFunction: deleteRow
            });
          }
        }
      },
      onSubmit: function () {
        var _this = this;
        return {
          add: function (myForm) {
            if (myForm.$valid) {
              _this.UserService.submitAdd(_this.var.input).then(function (response) {
                if (response.success_message) {
                  _this.collection.userList.data.push({
                    id_user: response.id,
                    nama: _this.var.input.nama,
                    username: _this.var.input.namaUser,
                    id_role: _this.var.input.role.id_role,
                    role_name: _this.var.input.role.role_name,
                    email: _this.var.input.email,
                    id_external: response.id_pengguna_internal
                  });

                  if (_this.var.input.role.id_role == 4) {
                    _this.UserService.submitUpdateLSPRO(response.id, _this.var.input.lspro.id_lspro).then(function (response) {

                    });
                  } else {
                    _this.UserService.submitUpdateLSPRO(0, _this.var.input.lspro.id_lspro).then(function (response) {

                    });
                  }

                  _this.state.isAdd = false;
                }
              });
            }
          },
          edit: function (myForm) {
            if (myForm.$valid) {
              _this.UserService.submitEdit(_this.var.rowEdit, _this.var.input).then(function (response) {
                if (response.success_message) {
                  if (_this.$rootScope.idUser == _this.var.rowEdit.id_user) {
                    _this.$rootScope.username = _this.var.input.nama;
                  };
                  _this.var.rowEdit.nama = _this.var.input.nama;
                  _this.var.rowEdit.username = _this.var.input.namaUser;
                  _this.var.rowEdit.id_role = _this.var.input.role.id_role;
                  _this.var.rowEdit.role_name = _this.var.input.role.role_name;
                  _this.var.rowEdit.email = _this.var.input.email;

                  if (_this.var.input.role.id_role == 4) {
                    _this.UserService.submitUpdateLSPRO(_this.var.rowEdit.id_user, _this.var.input.lspro.id_lspro).then(function (response) {

                    });
                  } else {
                    _this.UserService.submitUpdateLSPRO(0, _this.var.input.lspro.id_lspro).then(function (response) {

                    });
                  }

                  _this.state.isEdit = false;
                }
              });
            }
          }
        }
      }
    }
  });
})();