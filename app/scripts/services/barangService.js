(function () {
  'use strict';
  App.factory('BarangFactory', ['$q', 'BarangService', function ($q, BarangService) {
    return {
      getSNIOptions: function (page, q) {
        var deferred = $q.defer();
        BarangService.getSNIOptions(page, q).then(function (response) {
          deferred.resolve(response);
        });
        return deferred.promise;
      }
    }
  }])
    .service('BarangService', ['$http', 'HttpService', 'API_BASE_URL', '$filter', function ($http, HttpService, API_BASE_URL, $filter) {
      return {
        getMultiSNI: function(noSNI){
          return HttpService.get(API_BASE_URL + 'page/sertifikat/getMultiSNI', { noSNI: noSNI }, "Get SNI");
        },
        getSertifikatBerlaku: function (page, q, searchBy) {
          var data = {};
          if(page) data['page'] = page.toString();
          if(q) data['q'] = q;
          if(searchBy) data['searchBy'] = searchBy;

          return HttpService.get(API_BASE_URL + 'page/sertifikat/getSertifikatBerlaku', data, "Get Data");
        },
        getSertifikatTidakBerlaku: function (page, q, searchBy) {
          var data = {};
          if(page) data['page'] = page.toString();
          if(q) data['q'] = q;
          if(searchBy) data['searchBy'] = searchBy;

          return HttpService.get(API_BASE_URL + 'page/sertifikat/getSertifikatTidakBerlaku', data, "Get Data");
        },
        getData: function (page, q, searchBy) {
          var data = {};
          if(page) data['page'] = page.toString();
          if(q) data['q'] = q;
          if(searchBy) data['searchBy'] = searchBy;

          return HttpService.get(API_BASE_URL + 'page/sertifikat/getData', data, "Get Data");
        },
        getDataByLSPRO: function (idLSPRO, page, q, searchBy) {
          var data = {
            idLSPRO: idLSPRO
          };
          if(page) data['page'] = page.toString();
          if(q) data['q'] = q;
          if(searchBy) data['searchBy'] = searchBy;

          return HttpService.get(API_BASE_URL + 'page/sertifikat/getDataByLSPRO', data, "Get Data");
        },
        getPerusahaanOptions: function (idLSPRO) {
          return HttpService.get(API_BASE_URL + 'page/sertifikat/getPerusahaanOptions', { idLSPRO: idLSPRO }, "Get Penanggung Jawab");
        },
        getSNIOptions: function (page, q) {
          return HttpService.get(API_BASE_URL + 'page/sertifikat/getSNIOptions', { page: page, q: q }, "Get SNI Options");
        },
        submitAddSertifikat: function (input) {
          var namaPabrik = [];
          angular.forEach(input.namaPabrik, function (item) {
            namaPabrik.push(item.text);
          });
          var formatDate = 'yyyy-MM-dd';

          var getNoSNI = function (inputSNI) {
            var noSNI = [];
            angular.forEach(inputSNI, function (item) {
              noSNI.push(item.id);
            })
            return noSNI.join(';');
          }
          var data = {
            jenisProduk: input.jenisProduk,
            namaProduk: input.namaProduk,
            merk: input.merk,
            tipeProduk: input.tipeProduk,
            pJProduk: input.pJProduk.id_perusahaan,
            namaPabrik: namaPabrik.join(';'),
            noSNI: getNoSNI(input.sni),
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
          var getNoSNI = function (inputSNI) {
            var noSNI = [];
            angular.forEach(inputSNI, function (item) {
              noSNI.push(item.id);
            })
            return noSNI.join(';');
          }
          var data = {
            idMerk: input.idMerk,
            jenisProduk: input.jenisProduk,
            namaProduk: input.namaProduk,
            merk: input.merk,
            tipeProduk: input.tipeProduk,
            pJProduk: input.pJProduk.id_perusahaan,
            namaPabrik: namaPabrik.join(';'),
            noSNI: getNoSNI(input.sni),
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
})();