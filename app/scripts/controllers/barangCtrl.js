(function () {
  'use strict';
  App.classy.controller({
    name: 'BarangCtrl',
    inject: ['$rootScope', '$scope', 'BarangService', 'Notif', 'lodash'],
    data: {
      state: {
        isBerlaku: true,
        isAddSertifikat: false,
        isEditSertifikat: false,
        isAddLisensi: false,
        isEditLisensi: false
      },
      var: {
        searchType: null,
        searchTypeList: [{
          id: 'jenis_produk',
          text: 'Jenis Produk'
        }, {
          id: 'merk',
          text: 'Merk'
        }, {
          id: 'nama_penanggung_jawab',
          text: 'Nama Perusahaan'
        }, {
          id: 'alamat_penanggung_jawab',
          text: 'Alamat'
        }, {
          id: 'no_SNI',
          text: 'No. SNI'
        }, {
          id: 'judul_SNI',
          text: 'Judul SNI'
        }, {
          id: 'no_sertifikat',
          text: 'No. Sertifikat'
        }, {
          id: 'no_lisensi',
          text: 'No. Lisensi'
        }, {
          id: 'tgl_terbit_sertifikat',
          text: 'Tanggal Penerbitan'
        }],
        options: {
          perusahaanOptions: [],
          sniOptions: []
        },
        rowSelected: {},
        inputLisensi: {

        },
        input: {
          idMerk: '',
          jenisProduk: '',
          namaProduk: '',
          merk: '',
          tipeProduk: '',
          pJProduk: '',
          namaPabrik: '',
          sni: {
            no_SNI: '',
            judul_SNI: ''
          },
          statusPenerapan: '',
          skemaSertifikasi: '',
          nomorSertifikat: '',
          masaBerlakuSertifikat: {
            from: new Date(),
            to: new Date()
          }
        }
      },
      collection: {
        produk: {
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
            if (_this.$rootScope.idRole == 2) {
              _this.BarangService.getSertifikatBerlaku().then(function (response) {
                _this.collection.produk.data = response.data;
              });
            } else {
              _this.BarangService.getData().then(function (response) {
                _this.collection.produk.data = response.data;
              });
            }
          },
          getPerusahaanOptions: function () {
            if (_this.$rootScope.idRole != 2) {
              _this.BarangService.getPerusahaanOptions().then(function (response) {
                _this.var.options.perusahaanOptions = response.data;
              });
            }
          },
          getSNIOptions: function () {
            if (_this.$rootScope.idRole != 2) {
              _this.BarangService.getSNIOptions().then(function (response) {
                _this.var.options.sniOptions = response.data;
              });
            }
          }
        };
      },
      onClick: function () {
        var _this = this;
        return {
          isBerlaku: function (condition) {
            _this.state.isBerlaku = condition;
            if (condition) {
              _this.BarangService.getSertifikatBerlaku().then(function (response) {
                _this.collection.produk.data = response.data;
              });
            } else {
              _this.BarangService.getSertifikatTidakBerlaku().then(function (response) {
                _this.collection.produk.data = response.data;
              });
            }
          },
          isAddSertifikat: function (condition) {
            _this.state.isAddSertifikat = condition;
            if (condition) {
              _this.var.input = {
                idMerk: '',
                jenisProduk: '',
                namaProduk: '',
                merk: '',
                tipeProduk: '',
                pJProduk: '',
                namaPabrik: '',
                sni: {
                  no_SNI: '',
                  judul_SNI: ''
                },
                statusPenerapan: '',
                skemaSertifikasi: '',
                nomorSertifikat: '',
                masaBerlakuSertifikat: {
                  from: new Date(),
                  to: new Date()
                }
              };
              _this.onLoad().getPerusahaanOptions();
              _this.onLoad().getSNIOptions();
            }
          },
          isEditSertifikat: function (condition, row) {
            _this.state.isEditSertifikat = condition;
            if (condition) {
              _this.var.rowSelected = row;

              var namaPabrik = [];
              var namaPabrikArray = _this.var.rowSelected.nama_pabrik.split(';');
              angular.forEach(namaPabrikArray, function (item) {
                namaPabrik.push({
                  text: item
                })
              });
              var statusPenerapan = _this.var.rowSelected.status_penerapan == 'voluntary' ? { id: 'voluntary', text: 'Voluntary' } : { id: 'mandatory', text: 'Mandatory' }
              _this.var.input = {
                idMerk: _this.var.rowSelected.id_merk,
                jenisProduk: _this.var.rowSelected.jenis_produk,
                namaProduk: _this.var.rowSelected.nama_produk,
                merk: _this.var.rowSelected.merk,
                tipeProduk: _this.var.rowSelected.tipe_produk,
                namaPabrik: namaPabrik,
                statusPenerapan: statusPenerapan,
                skemaSertifikasi: _this.var.rowSelected.skema_sertifikasi,
                nomorSertifikat: _this.var.rowSelected.no_sertifikat,
                masaBerlakuSertifikat: {
                  from: new Date(moment(_this.var.rowSelected.tgl_terbit_sertifikat)),
                  to: new Date(moment(_this.var.rowSelected.tgl_berakhir_sertifikat)),
                }
              }

              _this.BarangService.getPerusahaanOptions().then(function (response) {
                _this.var.options.perusahaanOptions = response.data;
                var pJProdukIndex = _this.lodash.findIndex(_this.var.options.perusahaanOptions, { id_perusahaan: _this.var.rowSelected.id_perusahaan });
                _this.var.input.pJProduk = _this.var.options.perusahaanOptions[pJProdukIndex];
              });

              _this.BarangService.getSNIOptions().then(function (response) {
                _this.var.options.sniOptions = response.data;
                var sniIndex = _this.lodash.findIndex(_this.var.options.sniOptions, { no_SNI: _this.var.rowSelected.no_SNI });
                _this.var.input.sni = _this.var.options.sniOptions[sniIndex];
              });
            }
          },
          isDeleteSertifikat: function (row, index) {
            var deleteRow = function () {
              _this.BarangService.submitDeleteSertifikat(row).then(function (response) {
                _this.collection.produk.data.splice(index, 1);
              });
            };
            _this.Notif.confirmation({
              headerTitle: 'Konfirmasi Hapus',
              message: 'Anda yakin ingin menghapus data ini ?',
              okFunction: deleteRow
            });
          },
          isAddLisensi: function (condition, row) {
            _this.state.isAddLisensi = condition;
            if (condition) {
              _this.var.rowSelected = row;
              _this.var.inputLisensi = {
                nomorLisensi: '',
                masaBerlakuLisensi: {
                  from: new Date(),
                  to: new Date()
                }
              }
            }
          },
          isEditLisensi: function (condition, row) {
            _this.state.isEditLisensi = condition;
            if (condition) {
              _this.var.rowSelected = row;
              _this.var.inputLisensi = {
                nomorLisensi: row.no_lisensi,
                masaBerlakuLisensi: {
                  from: new Date(),
                  to: new Date()
                }
              }
            }
          },
          isDeleteLisensi: function (row, index) {
            var deleteRow = function () {
              _this.BarangService.submitDeleteLisensi(row).then(function (response) {
                if (response.success_message) {
                  row.no_lisensi = '';
                }
              });
            };
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
          sertifikat: function (myForm) {
            if (myForm.$valid) {
              if (_this.state.isAddSertifikat) {
                _this.BarangService.submitAddSertifikat(_this.var.input).then(function (response) {
                  if (response.success_message) {
                    _this.collection.produk.data.push({
                      'id_merk': response.id_merk,
                      'jenis_produk': _this.var.input.jenisProduk,
                      'merk': _this.var.input.merk,
                      'nama_penanggung_jawab': _this.var.input.pJProduk.nama_penanggung_jawab,
                      'alamat_penanggung_jawab': _this.var.input.pJProduk.alamat_penanggung_jawab,
                      'no_SNI': _this.var.input.sni.no_SNI,
                      'judul_SNI': _this.var.input.sni.judul_SNI,
                      'no_sertifikat': _this.var.input.nomorSertifikat,
                      'no_lisensi': '-',
                      'tgl_terbit_sertifikat': _this.var.input.masaBerlakuSertifikat.from,
                      'tgl_berakhir_sertifikat': _this.var.input.masaBerlakuSertifikat.to,
                    });
                    _this.onClick().isAddSertifikat(false);
                  }
                });
              } else if (_this.state.isEditSertifikat) {
                _this.BarangService.submitEditSertifikat(_this.var.input).then(function (response) {
                  if (response.success_message) {
                    _this.var.rowSelected.id_merk = _this.var.input.idMerk;
                    _this.var.rowSelected.jenis_produk = _this.var.input.jenisProduk;
                    _this.var.rowSelected.nama_produk = _this.var.input.namaProduk;
                    _this.var.rowSelected.merk = _this.var.input.merk;
                    _this.var.rowSelected.tipe_produk = _this.var.input.tipeProduk;
                    _this.var.rowSelected.nama_pabrik = _this.var.input.namaPabrik;
                    _this.var.rowSelected.nama_penanggung_jawab = _this.var.input.pJProduk.nama_penanggung_jawab;
                    _this.var.rowSelected.alamat_penanggung_jawab = _this.var.input.pJProduk.alamat_penanggung_jawab;
                    _this.var.rowSelected.no_SNI = _this.var.input.sni.no_SNI;
                    _this.var.rowSelected.judul_SNI = _this.var.input.sni.judul_SNI;
                    _this.var.rowSelected.status_penerapan = _this.var.input.statusPenerapan;
                    _this.var.rowSelected.no_sertifikat = _this.var.input.nomorSertifikat;
                    _this.var.rowSelected.tgl_terbit_sertifikat = _this.var.input.masaBerlakuSertifikat.from;
                    _this.var.rowSelected.tgl_berakhir_sertifikat = _this.var.input.masaBerlakuSertifikat.to;
                    _this.onClick().isEditSertifikat(false);
                  }
                });
              }
            }
          },
          lisensi: function (myForm) {
            if (myForm.$valid) {
              if (_this.state.isAddLisensi) {
                _this.BarangService.submitAddLisensi(_this.var.rowSelected, _this.var.inputLisensi).then(function (response) {
                  if (response.success_message) {
                    _this.var.rowSelected.no_lisensi = _this.var.inputLisensi.nomorLisensi;
                    _this.onClick().isAddLisensi(false);
                  }
                });
              }
              else if (_this.state.isEditLisensi) {
                _this.BarangService.submitEditLisensi(_this.var.rowSelected, _this.var.inputLisensi).then(function (response) {
                  if (response.success_message) {
                    _this.var.rowSelected.no_lisensi = _this.var.inputLisensi.nomorLisensi;
                    _this.onClick().isEditLisensi(false);
                  }
                });
              }
            }
          }
        }
      }
    }
  });
})();