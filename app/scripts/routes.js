(function () {
    'use strict';
    App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('main', {
                url: "/",
                views: {
                    "content": {
                        controller: 'MainCtrl',
                        templateUrl: "scripts/templates/main.html"
                    }
                }
            })
            .state('barang', {
                url: "/barang-ber-sni",
                views: {
                    "content": {
                        controller: 'BarangCtrl',
                        templateUrl: "scripts/templates/barang.html"
                    }
                }
            })
            .state('qRCode', {
                url: "/qr-code",
                views: {
                    "content": {
                        controller: 'QRCodeCtrl',
                        templateUrl: "scripts/templates/qRCode.html"
                    }
                }
            })
            .state('pemetaan', {
                url: "/pemetaan-sni",
                views: {
                    "content": {
                        controller: 'PemetaanCtrl',
                        templateUrl: "scripts/templates/pemetaan.html"
                    }
                }
            })
            .state('login', {
                url: "/login",
                views: {
                    "login": {
                        controller: 'LoginCtrl',
                        templateUrl: "scripts/templates/login.html"
                    }
                }
            })
    }]);
})();