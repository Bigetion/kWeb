(function () {
    'use strict';
    App.service('LSPROService', ['$http', 'HttpService', 'API_BASE_URL', '$filter', function ($http, HttpService, API_BASE_URL, $filter) {
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
            submitAddSertifikat: function (input1, input2) {
                var namaPabrik = [];
                angular.forEach(input2.namaPabrik, function (item) {
                    namaPabrik.push(item.text);
                });
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    namaPJProduk: input1.namaPJProduk,
                    alamatPJProduk: input1.alamatPJProduk,
                    provinsi: input1.provinsi,
                    kabupaten: input1.kabupaten,
                    kodePos: input1.kodePos,
                    statusPJProduk: input1.statusPJProduk,
                    nomorTelpon: input1.nomorTelpon,
                    website: input1.website,
                    email: input1.email,
                    jenisProduk: input2.jenisProduk,
                    namaProduk: input2.namaProduk,
                    merk: input2.merk,
                    tipeProduk: input2.tipeProduk,
                    pJProduk: input2.pJProduk.id_perusahaan,
                    namaPabrik: namaPabrik.join(';'),
                    noSNI: input2.sni.no_SNI,
                    statusPenerapan: input2.statusPenerapan.id,
                    skemaSertifikasi: input2.skemaSertifikasi,
                    nomorSertifikat: input2.nomorSertifikat,
                    tanggalTerbit: $filter('date')(input2.masaBerlakuSertifikat.from, formatDate),
                    tanggalBerakhir: $filter('date')(input2.masaBerlakuSertifikat.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitAddSertifikat', data, "Submit Add Sertifikat");
            },
            submitEditSertifikat: function (input1, input2) {
                var namaPabrik = [];
                angular.forEach(input2.namaPabrik, function (item) {
                    namaPabrik.push(item.text);
                });
                var formatDate = 'yyyy-MM-dd';
                var data = {
                    idMerk: "",
                    idPerusahaan: "",
                    namaPJProduk: input1.namaPJProduk,
                    alamatPJProduk: input1.alamatPJProduk,
                    provinsi: input1.provinsi,
                    kabupaten: input1.kabupaten,
                    kodePos: input1.kodePos,
                    statusPJProduk: input1.statusPJProduk,
                    nomorTelpon: input1.nomorTelpon,
                    website: input1.website,
                    email: input1.email,
                    jenisProduk: input2.jenisProduk,
                    namaProduk: input2.namaProduk,
                    merk: input2.merk,
                    tipeProduk: input2.tipeProduk,
                    pJProduk: input2.pJProduk.id_perusahaan,
                    namaPabrik: namaPabrik.join(';'),
                    noSNI: input2.sni.no_SNI,
                    statusPenerapan: input2.statusPenerapan.id,
                    skemaSertifikasi: input2.skemaSertifikasi,
                    nomorSertifikat: input2.nomorSertifikat,
                    tanggalTerbit: $filter('date')(input2.masaBerlakuSertifikat.from, formatDate),
                    tanggalBerakhir: $filter('date')(input2.masaBerlakuSertifikat.to, formatDate)
                };
                return HttpService.execute(API_BASE_URL + 'page/sertifikat/submitEditSertifikat', data, "Submit Edit Sertifikat");
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

})();