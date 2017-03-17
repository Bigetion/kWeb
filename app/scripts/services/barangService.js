(function () {
    'use strict';
    App.service('BarangService', ['$http', 'HttpService', 'API_BASE_URL', '$filter', function ($http, HttpService, API_BASE_URL, $filter) {
        return {
            getSertifikatBerlaku: function () {
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/getSertifikatBerlaku', {}, "Get Data");
            },
            getSertifikatTidakBerlaku: function () {
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/getSertifikatTidakBerlaku', {}, "Get Data");
            },
            getData: function () {
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/getData', {}, "Get Data");
            },
            getPerusahaanOptions: function () {
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/getPerusahaanOptions', {}, "Get Penanggung Jawab");
            },
            getSNIOptions: function () {
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/getSNIOptions', {}, "Get SNI Options");
            },
            submitAddSertifikat: function (input) {
                var namaPabrik = [];
                angular.forEach(input.namaPabrik, function (item) {
                    namaPabrik.push(item.text);
                });
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    jenisProduk: input.jenisProduk,
                    namaProduk: input.namaProduk,
                    merk: input.merk,
                    tipeProduk: input.tipeProduk,
                    pJProduk: input.pJProduk.id_perusahaan,
                    namaPabrik: namaPabrik.join(';'),
                    noSNI: input.sni.no_SNI,
                    statusPenerapan: input.statusPenerapan.id,
                    skemaSertifikasi: input.skemaSertifikasi,
                    nomorSertifikat: input.nomorSertifikat,
                    tanggalTerbit: $filter('date')(input.masaBerlakuSertifikat.from, formatDate),
                    tanggalBerakhir: $filter('date')(input.masaBerlakuSertifikat.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitAddSertifikat', data, "Submit Add Sertifikat");
            },
            submitEditSertifikat: function (input) {
                var namaPabrik = [];
                angular.forEach(input.namaPabrik, function (item) {
                    namaPabrik.push(item.text);
                });
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    idMerk: input.idMerk,
                    jenisProduk: input.jenisProduk,
                    namaProduk: input.namaProduk,
                    merk: input.merk,
                    tipeProduk: input.tipeProduk,
                    pJProduk: input.pJProduk.id_perusahaan,
                    namaPabrik: namaPabrik.join(';'),
                    noSNI: input.sni.no_SNI,
                    statusPenerapan: input.statusPenerapan.id,
                    skemaSertifikasi: input.skemaSertifikasi,
                    nomorSertifikat: input.nomorSertifikat,
                    tanggalTerbit: $filter('date')(input.masaBerlakuSertifikat.from, formatDate),
                    tanggalBerakhir: $filter('date')(input.masaBerlakuSertifikat.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitEditSertifikat', data, "Submit Edit Sertifikat");
            },
            submitDeleteSertifikat: function (row) {
                var data = {
                    idMerk: row.id_merk
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitDeleteSertifikat', data, "Submit Delete Sertifikat");
            },
            submitAddLisensi: function (row, input) {
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    idMerk: row.id_merk,
                    nomorLisensi: input.nomorLisensi,
                    tanggalTerbit: $filter('date')(input.masaBerlakuLisensi.from, formatDate),
                    tanggalBerakhir: $filter('date')(input.masaBerlakuLisensi.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitAddLisensi', data, "Submit Add Lisensi");
            },
            submitEditLisensi: function (row, input) {
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    idMerk: row.id_merk,
                    nomorLisensiOld: row.no_lisensi,
                    nomorLisensi: input.nomorLisensi,
                    tanggalTerbit: $filter('date')(input.masaBerlakuLisensi.from, formatDate),
                    tanggalBerakhir: $filter('date')(input.masaBerlakuLisensi.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitEditLisensi', data, "Submit Edit Lisensi");
            },
            submitDeleteLisensi: function (row) {
                var data = {
                    idMerk: row.id_merk,
                    nomorLisensi: row.no_lisensi,
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitDeleteLisensi', data, "Submit Delete Lisensi");
            }
        }
    }])

})()