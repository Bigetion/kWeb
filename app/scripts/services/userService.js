(function () {
    'use strict';
    App.service('UserService', ['$http', 'HttpService', 'API_BASE_URL', function ($http, HttpService, API_BASE_URL) {
        return {
            getData: function () {
                return HttpService.execute(API_BASE_URL + 'page/pengguna/getList', {}, "Get List User");
            },
            getProfile: function (idUser) {
                var data = {
                    idUser: idUser
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/getProfile', data, "Get Profil");
            },
            changePassword: function (idUser, passwordOld, passwordNew) {
                var data = {
                    idUser: idUser,
                    passwordOld: passwordOld,
                    passwordNew: passwordNew
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/changePassword', data, "Change Password");
            },
            getRoleOptions: function () {
                return HttpService.execute(API_BASE_URL + 'page/pengguna/getRoleOptions', {}, "Get Role Options");
            },
            getLSPROOptions: function () {
                return HttpService.execute(API_BASE_URL + 'page/pengguna/getLSPROOptions', {}, "Get LSPRO Options");
            },
            submitAdd: function (input) {
                var data = {
                    nama: input.nama,
                    namaUser: input.namaUser,
                    email: input.email,
                    idRole: input.role.id_role,
                    password: input.password
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/submitAdd', data, "Submit Add User");
            },
            submitEdit: function (row, input) {
                var data = {
                    idUser: row.id_user,
                    idExternal: row.id_external,
                    nama: input.nama,
                    namaUser: input.namaUser,
                    email: input.email,
                    idRole: input.role.id_role,
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/submitEdit', data, "Submit Edit User");
            },
            submitDelete: function (idUser, idExternal) {
                var data = {
                    idUser: idUser,
                    idExternal: idExternal
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/submitDelete', data, "Submit Delete User");
            },
            submitUpdateLSPRO: function (idUser, idLSPRO) {
                var data = {
                    idUser: idUser,
                    idLSPRO: idLSPRO
                };
                return HttpService.execute(API_BASE_URL + 'page/pengguna/submitUpdateLSPRO', data, "Submit Update LSPRO");
            }
        }
    }])

})();