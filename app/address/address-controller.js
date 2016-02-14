mainApp.config(['$routeProvider', function ($routeProvider) {

        
        $routeProvider.when('/address',
                {
                    templateUrl: 'app/users/address-partial.html',
                    controller: 'addressCtrl'
                }
        );
        $routeProvider.when('/address/service/:service_type',
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


mainApp.controller('addressCtrl', ['$scope', 'AddressFactory', '$routeParams', '$rootScope', 'OrderFactory', '$location','EnquiryFactory', function ($scope, AddressFactory, $routeParams, $rootScope, OrderFactory, $location,EnquiryFactory) {
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
                if (0 == $scope.addressList.length) {
                    $scope.setMode('create_address');
                    console.log($scope.addressList.length);
                } else {
                    if ($location.path().indexOf("edit") > -1) {
                        console.log("EDIT MODE");
                        $scope.setMode("create_address");
                    } else {
                        $scope.setMode('');

                    }

                }

            });

        };

        $scope.setMode = function (mode) {
            $scope.mode = mode;
        };
        $scope.areaList = APP_LOCALITY;
        $scope.getAddressList();

        
        
        
        $scope.addressMode = "";
        $scope.save = function (isValid) {
            if (!isValid) {
                $scope.errorMessage = "Form fields incorrect";
                return;
            }
            $scope.address.user_id = $rootScope.user.id;

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
                    $scope.getAddressList();

                    $scope.address = result;
                    swal("Address saved!");
                    $rootScope.back();
                   
                }

            });
        };
        $scope.delete = function (deleteAddressId) {
//            console.log(deleteAddressId);
//            alert(deleteAddressId);
            
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", 
                confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, 
                function () {
//                swal("Deleted!", "Your imaginary file has been deleted.", "success");
                $scope.errorMessage = "";
                var promise = AddressFactory.delete({id: deleteAddressId}).$promise;
                promise.then(function (result) {
                    if (result.error) {
                        $scope.errorMessage = result.error;
                    } else {
                        swal("Delete successful!");
                        $scope.getAddressList();


                    }

                });
                
            });
            
            
            
        };
        $scope.order = {};
        var laundry_service = {dry_wash: 1, wash_iron: 2};
        if ($routeParams.service_type) {
            var laundry_type = $routeParams.service_type.split('=');
            var items = [];
            if (laundry_type[1]) {

                var temp = laundry_type[1].split(',');
                for (var i = 0; i < temp.length; i++) {

                    items.push(laundry_service[[temp[i]]]);
                }
                $scope.order.items = items;


            }
        } else {
            $scope.mode="create_address";
        }
//        console.log(items);
        $scope.order.updated_by = $rootScope.user.id;
        $scope.placeEnquiry = function () {
            if (!$scope.order.address_id) {
                $scope.errorMessage = "Please select an adress!";
                return;
            }
            if ($scope.order.items.length == 0) {
                $scope.errorMessage = "You have not selected any service!";
                return;
            }
            var promise = EnquiryFactory.placeEnquiry($scope.order).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {

                    $scope.errorMessage = "";
                    $location.path("/");
                    swal({title: "Great!", text: "Your have placed the enquiry! We will contact you soon!", type: "success"}, function () {

                    });
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

        $scope.$watch('$viewContentLoaded', function () {
            if ($routeParams.id) {
                $scope.get();
            }

        });

    }
]).directive('addressform', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/users/address-save.html'};
});
