mainApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login',
                {
                    templateUrl: 'app/users/login-partial.html',
                    controller: 'loginCtrl'
                }
        );
    }]);
mainApp.controller('loginCtrl', ['$scope', 'AuthFactory', function ($scope, Auth) {
        $scope.user = {};
        $scope.submit = function () {
            Auth.login($scope.user.email, $scope.user.password, function (err) {
                if (err) {
                    if (err.status == 401) {
                        $scope.errorMessage = "Login failed";
                    }
                } else {
                    $rootScope.previous_url = "";
                    $rootScope.previous_url = "/";
                } 

            });
        };

        $scope.logout = function () {
            Auth.logout();
        }


    }
]).directive('login', function () {
    return {
        restrict: 'E',
        template: '<div>Name: {{$root.user.email}} <a href="#" ng-click="logout()">Logout</a></div>'
    };
});