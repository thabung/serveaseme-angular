mainApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/user/edit/:id',
                {
                    templateUrl: 'app/users/edit-partial.html',
                    controller: 'userCtrl'
                }
        );
        $routeProvider.when('/changepassword/:id',
                {
                    templateUrl: 'app/users/change-password-partial.html',
                    controller: 'userCtrl'
                }
        );
    }]);
mainApp.controller('userCtrl', ['$scope', 'UserFactory','$routeParams', function ($scope, UserFactory,$routeParams) {
        $scope.user = {};
        $scope.get = function () {
            $scope.errorMessage = "";
            var promise = UserFactory.get({id: $routeParams.id}).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                    $scope.user = result;
                }

            });
        };
        
        $scope.update = function () {
            $scope.errorMessage = "";
            console.log($scope.user);
            var promise = UserFactory.update($scope.user).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                }

            });
        };
        
        $scope.passwordObject = {};
        $scope.changePassword = function () {
            $scope.passwordObject.id = $routeParams.id;
            if ($scope.passwordObject.new_password != $scope.passwordObject.reenter_new_password ) {
                $scope.errorMessage = "renenter password mismatch";
                return false;
            }
            console.log($scope.passwordObject);
            var promise = UserFactory.changePassword($scope.passwordObject).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                }

            });
        };
        
        
        
         $scope.$watch('$viewContentLoaded', function(){
            $scope.get();
        });

    }
]);