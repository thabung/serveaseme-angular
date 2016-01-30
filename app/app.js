var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies']);

mainApp.config(['$routeProvider', '$sceProvider', function ($routeProvider, $sceProvider) {
        // check if the user is logged in
        // if no show the login form


    }]);

mainApp.run(['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event) {
            Auth.syncCookieUser();
            if (!Auth.isLoggedIn()) {
                Auth.login('thabungm@gmail.com','test');
                console.log('DENY');
                event.preventDefault();
              //  $location.path('/login');
            }
            else {
                console.log('ALLOW');
            }
        });
    }]);
//run(['$rootScope','$cookies','authFactory','$location','User','$http','Store',
//        function($rootScope,$cookies,authFactory,$location,User,$http,Store) {
//            
//            
//            
//        }]);

