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

        $routeProvider.when('/forgot-password',
                {
                    templateUrl: 'app/users/forgot-password.html',
                    controller: 'userCtrl'
                }
        );

        $routeProvider.when('/address',
                {
                    templateUrl: 'app/users/address-partial.html',
                    controller: 'addressCtrl'
                }
        );
        $routeProvider.when('/address/:id/edit',
                {
                    templateUrl: 'app/users/address-save.html',
                    controller: 'addressCtrl'
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
        $scope.user = {};
        $scope.submitForgotPassword = function () {
            var promise = UserFactory.forgotPassword($scope.user).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                    $scope.successMessage = result.message;
                    
                }

            });
        };
        $scope.$watch('$viewContentLoaded', function(){
            $scope.get();
        });

    }
]);

mainApp.controller('addressCtrl', ['$scope', 'AddressFactory','$routeParams','$rootScope', function ($scope, AddressFactory,$routeParams,$rootScope) {
        $scope.address = {};
        $scope.get = function () {
            $scope.errorMessage = "";
            var promise = AddressFactory.get({id: $routeParams.id}).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                    $scope.address = result;
                }

            });
        };
        
        $scope.getAddressList = function () {
            var promise = AddressFactory.getAddressByUser({id: $rootScope.user.id}).$promise;
            promise.then(function (result) {
                $scope.addressList = result;

            });

        };
        $scope.areaList = APP_LOCALITY;
        $scope.getAddressList();
        
         
        $scope.addressMode = "";
        $scope.save = function () {
            $scope.errorMessage = "";
            if ($routeParams.id) {
                $scope.address.id = $routeParams.id;
                var promise = AddressFactory.update($scope.address).$promise;

            } else {
                var promise = AddressFactory.save($scope.address).$promise;

            }
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                    $scope.address = result;
                    /*
                       if (address mode == 'order') {
                            
                       
                       
                       }
                     */
                }

            });
        };
        
        $scope.update = function () {
            $scope.errorMessage = "";
            console.log($scope.address);
            var promise = AddressFactory.update($scope.address).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                }

            });
        };
        
        $scope.$watch('$viewContentLoaded', function(){
            if ($routeParams.id) {
                $scope.get();
            }
            
        });

    }
]);