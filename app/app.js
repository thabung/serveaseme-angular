var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies','ngMessages']);
var HEADERS = {};
mainApp.config(['$routeProvider', '$sceProvider', function ($routeProvider, $sceProvider) {
        // check if the user is logged in
        // if no show the login form


    }]);

mainApp.run(['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event) {
            console.log("--------------------------------");
            Auth.syncCookieUser();
            if (!Auth.isLoggedIn()) {
                console.log('DENY');
                $location.path('/login');
            }
            else {
                console.log('ALLOW');
                
            }
        });
    }]);


