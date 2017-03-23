(function () {
  'use strict';
  App.classy.controller({
    name: 'LSPROCtrl',
    inject: ['$rootScope', '$scope', 'LSPROService', 'Notif', 'lodash'],
    data: {
      state: {
        isAdd: false,
        isEdit: false
      },
      var: {
        rowEditSelected: {},
        input: {
          idPerusahaan: '',
          namaPJProduk: '',
          alamatPJProduk: '',
          provinsi: '',
          kabupaten: '',
          kodePos: '',
          statusPJProduk: '',
          nomorTelpon: '',
          website: '',
          email: ''
        },
        collection: {
          lspro: {
            data: []
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
          _this.onLoad().getData();
        },
        onLoad: function () {
          var _this = this;
          return {
            getData: function () {
              _this.LSPROService.getData().then(function (response) {
                _this.collection.lspro.data = response.data;
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
                _this.var.input = {
                  idPerusahaan: '',
                  namaPJProduk: '',
                  alamatPJProduk: '',
                  provinsi: '',
                  kabupaten: '',
                  kodePos: '',
                  statusPJProduk: '',
                  nomorTelpon: '',
                  website: '',
                  email: ''
                }
              }
            },
            isEdit: function (condition, row) {
              _this.state.isEdit = condition;
              if (condition) {
                _this.var.rowEditSelected = row;
                _this.var.input = {
                  idPerusahaan: '',
                  namaPJProduk: '',
                  alamatPJProduk: '',
                  provinsi: '',
                  kabupaten: '',
                  kodePos: '',
                  statusPJProduk: '',
                  nomorTelpon: '',
                  website: '',
                  email: ''
                }
              }
            },
            delete: function (row, index) {
              var deleteRow = function () {
                _this.PerusahaanService.submitDelete(row.id_user).then(function (response) {
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
                _this.PerusahaanService.submitAdd(_this.var.input).then(function (response) {
                  if (response.success_message) {
                    _this.collection.userList.data.push({
                      id_perusahaan: response.id,
                      nama_penanggung_jawab: _this.var.input.namaPJProduk,
                      alamat_penanggung_jawab: _this.var.input.alamatPJProduk,
                      provinsi: _this.var.input.provinsi,
                      kota: _this.var.input.kabupaten,
                      kode_pos: _this.var.input.kodePos,
                      status: _this.var.input.statusPJProduk,
                      telp: _this.var.input.nomorTelpon,
                      website: _this.var.input.website,
                      email: _this.var.input.email
                    });
                    _this.state.isAdd = false;
                  }
                });
              }
            },
            edit: function (myForm) {
              if (myForm.$valid) {
                _this.PerusahaanService.submitEdit(_this.var.rowEdit, _this.var.input).then(function (response) {
                  if (response.success_message) {
                    _this.var.rowEditSelected = {
                      id_perusahaan: _this.var.rowEditSelected.id_perusahaan,
                      nama_penanggung_jawab: _this.var.input.namaPJProduk,
                      alamat_penanggung_jawab: _this.var.input.alamatPJProduk,
                      provinsi: _this.var.input.provinsi,
                      kota: _this.var.input.kabupaten,
                      kode_pos: _this.var.input.kodePos,
                      status: _this.var.input.statusPJProduk,
                      telp: _this.var.input.nomorTelpon,
                      website: _this.var.input.website,
                      email: _this.var.input.email
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