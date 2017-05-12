(function () {
    'use strict';
    App.service('PerusahaanService', ['$http', 'HttpService', 'API_BASE_URL', '$filter', function ($http, HttpService, API_BASE_URL, $filter) {
        return {
            getLSPRO: function (idUser) {
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/getLSPRO', { idUser: idUser }, "Get LSPRO");
            },
            getData: function () {
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/getData', {}, "Get List Perusahaan");
            },
            getDataByLSPRO: function (idLSPRO) {
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/getDataByLSPRO', { idLSPRO: idLSPRO }, "Get List Perusahaan");
            },
            submitAdd: function (input) {
                var data = {
                    namaPJProduk: input.namaPJProduk,
                    alamatPJProduk: input.alamatPJProduk,
                    provinsi: input.provinsi,
                    kabupaten: input.kabupaten,
                    kodePos: input.kodePos,
                    statusPJProduk: input.statusPJProduk,
                    nomorTelpon: input.nomorTelpon,
                    website: input.website,
                    email: input.email,
                    idLSPRO: input.idLSPRO
                };
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/submitAdd', data, "Submit Add");
            },
            submitEdit: function (row, input) {
                var data = {
                    idPerusahaan: row.id_perusahaan,
                    namaPJProduk: input.namaPJProduk,
                    alamatPJProduk: input.alamatPJProduk,
                    provinsi: input.provinsi,
                    kabupaten: input.kabupaten,
                    kodePos: input.kodePos,
                    statusPJProduk: input.statusPJProduk,
                    nomorTelpon: input.nomorTelpon,
                    website: input.website,
                    email: input.email
                };
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/submitEdit', data, "Submit Edit");
            },
            submitDelete: function (id) {
                var data = {
                    idPerusahaan: id
                };
                return HttpService.execute(API_BASE_URL + 'page/perusahaan/submitDelete', data, "Submit Delete");
            }
        }
    }])

})()