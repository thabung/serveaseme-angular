var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies','ngMessages']);
var HEADERS = {};
var isPublicRoute = function(path) {
    publicPathArray = ['/signup','/login','/forgot-password','/auth/facebook']; 
    if (publicPathArray.indexOf(path) > -1) {
        return true;
    } else {
        return false;
    }
};
mainApp.config(['$routeProvider', '$sceProvider', function ($routeProvider, $sceProvider) {
    }]);

mainApp.run(['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event) {
            
            Auth.syncCookieUser();
            console.log($location.path());
            if (!Auth.isLoggedIn() && !isPublicRoute($location.path())) {
                console.log('DENY');
                $location.path('/login');
            }
            else {
                if (Auth.isLoggedIn() && $location.path() == '/login') {
                    $location.path('/');
                } 
                console.log('ALLOW');
                
            }
        });
    }]);


