(function () {
    'use strict';
    App.classy.controller({
        name: 'BarangCtrl',
        inject: ['$rootScope', '$scope'],
        data: {
            state: {
                isBerlaku: true
            },
            var: {
                searchType:null,
                searchTypeList:[{
                    id:'1',
                    text:'Jenis Produk'
                },{
                    id:'1',
                    text:'Merk'
                },{
                    id:'1',
                    text:'Nama Perusahaan'
                },{
                    id:'1',
                    text:'Alamat'
                },{
                    id:'1',
                    text:'No. SNI'
                },{
                    id:'1',
                    text:'Judul SNI'
                },{
                    id:'1',
                    text:'No. Sertifikat'
                },{
                    id:'1',
                    text:'No. Lisensi'
                },{
                    id:'1',
                    text:'Tanggal Penerbitan'
                }]
            },
            collection: {
                sertifikat: []
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
                    isBerlaku: function (condition) {
                        _this.state.isBerlaku = condition;
                        if (condition) {

                        } else {

                        }
                    }
                }
            },
            onLoad: function () {
                var _this = this;
                return {

                };
            }
        }
    });
})();