mainApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login',
                {
                    templateUrl: 'app/users/login-partial.html',
                    controller: 'loginCtrl'
                }
        );
    }]);
mainApp.controller('loginCtrl', ['$scope', 'AuthFactory','$location', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.submit = function () {
            Auth.login($scope.user.email, $scope.user.password, function (err) {
                if (err) {
                    if (err.status == 401) {
                        $scope.errorMessage = "Login failed";
                    }
                } else {
                   // $rootScope.previous_url = "";
                   // $rootScope.previous_url = "/";
                   $location.path("/");
                } 

            });
        };

        $scope.logout = function () {
            Auth.logout();
            $location.path("/login");
        }


    }
]).directive('login', function () {
    return {
        restrict: 'E',
        template:'<div ng-show="$root.user.email"  class="dropdown nav navbar-nav navbar-right"\n\
     role="menu" aria-labelledby="menu1">\n\
<a data-target="#" href="" data-toggle="dropdown" class="dropdown-toggle">{{$root.user.email}}<b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#/orders">Orders</a></li><li><a href="#">My info</a></li><li><a href="" ng-click="logout();">Logout</a></li></ul></div>'    };
});