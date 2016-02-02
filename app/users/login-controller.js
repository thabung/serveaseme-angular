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
        $scope.submit = function() {
          Auth.login($scope.user.email,$scope.user.password);
        };

    }
]);