(function () {
  'use strict';
  App.classy.controller({
    name: 'PerusahaanCtrl',
    inject: ['$rootScope', '$scope', 'PerusahaanService', 'Notif', 'lodash'],
    data: {
      state: {
        isAdd: false,
        isEdit: false
      },
      var: {
        idLSPRO: '',
        searchType: null,
        searchTypeList: [{
          id: 'nama_penanggung_jawab',
          text: 'Nama Perusahaan'
        }, {
          id: 'alamat_penanggung_jawab',
          text: 'Alamat'
        }, {
          id: 'provinsi',
          text: 'Provinsi'
        }, {
          id: 'kode_pos',
          text: 'Kode Pos'
        }, {
          id: 'status',
          text: 'Status'
        }, {
          id: 'website',
          text: 'Website'
        }, {
          id: 'email',
          text: 'Email'
        }],
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
      },
      collection: {
        perusahaan: {
          data: [],
          isLoaded: false
        }
      },
    },
    init: function () {
      this._onInit();
    },
    watch: {},
    methods: {
      _onInit: function () {
        var _this = this;

        if (_this.$rootScope.idRole == 4) {
          _this.PerusahaanService.getLSPRO(_this.$rootScope.idUser).then(function (response) {
            if (response.data.length > 0) _this.var.idLSPRO = response.data[0].id_lspro;
            else _this.var.idLSPRO = '';

            _this.onLoad().getDataByLSPRO();
          });
        } else {
          _this.var.idLSPRO = '';
          _this.onLoad().getData();
        }
      },
      onLoad: function () {
        var _this = this;
        return {
          getData: function () {
            _this.PerusahaanService.getData().then(function (response) {
              _this.collection.perusahaan.data = response.data;
              _this.collection.perusahaan.isLoaded = true;
            });
          },
          getDataByLSPRO: function () {
            _this.PerusahaanService.getDataByLSPRO(_this.var.idLSPRO).then(function (response) {
              _this.collection.perusahaan.data = response.data;
              _this.collection.perusahaan.isLoaded = true;
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
                email: '',
                idLSPRO: _this.var.idLSPRO
              }
            }
          },
          isEdit: function (condition, row) {
            _this.state.isEdit = condition;
            if (condition) {
              _this.var.rowEditSelected = row;
              _this.var.input = {
                idPerusahaan: row['id_perusahaan'],
                namaPJProduk: row['nama_penanggung_jawab'],
                alamatPJProduk: row['alamat_penanggung_jawab'],
                provinsi: row['provinsi'],
                kabupaten: row['kota'],
                kodePos: row['kode_pos'],
                statusPJProduk: row['status'],
                nomorTelpon: row['telp'],
                website: row['website'],
                email: row['email'],
              }
            }
          },
          delete: function (row, index) {
            var deleteRow = function () {
              _this.PerusahaanService.submitDelete(row.id_perusahaan).then(function (response) {
                if (response.success_message) {
                  _this.collection.perusahaan.data.splice(index, 1);
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
          submit: function (myForm) {
            if (_this.state.isAdd) _this.onSubmit().add(myForm);
            else if (_this.state.isEdit) _this.onSubmit().edit(myForm);
          },
          add: function (myForm) {
            if (myForm.$valid) {
              _this.PerusahaanService.submitAdd(_this.var.input).then(function (response) {
                if (response.success_message) {
                  _this.collection.perusahaan.data.push({
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
              _this.PerusahaanService.submitEdit(_this.var.rowEditSelected, _this.var.input).then(function (response) {
                if (response.success_message) {
                  _this.var.rowEditSelected['nama_penanggung_jawab'] = _this.var.input.namaPJProduk;
                  _this.var.rowEditSelected['alamat_penanggung_jawab'] = _this.var.input.alamatPJProduk;
                  _this.var.rowEditSelected['provinsi'] = _this.var.input.provinsi;
                  _this.var.rowEditSelected['kota'] = _this.var.input.kabupaten;
                  _this.var.rowEditSelected['kode_pos'] = _this.var.input.kodePos;
                  _this.var.rowEditSelected['status'] = _this.var.input.statusPJProduk;
                  _this.var.rowEditSelected['telp'] = _this.var.input.nomorTelpon;
                  _this.var.rowEditSelected['website'] = _this.var.input.website;
                  _this.var.rowEditSelected['email'] = _this.var.input.email;
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