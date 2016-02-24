'use strict';
mainApp.config(['$routeProvider', function ($routeProvider) {


        $routeProvider.when('/enquiry-preview',
                {
                    templateUrl: 'app/ordersenquiry/enquiry-preview.html',
                    controller: 'orderEnquiryCtrl'
                }
        );



    }]);
mainApp.controller('orderEnquiryCtrl', ['$scope', '$rootScope', 'AddressFactory','EnquiryFactory', '$cookies','$location', function ($scope, $rootScope, AddressFactory,EnquiryFactory, $cookies,$location) {


        $rootScope.$on('addToCartEnquiry', function (idk, item) {
            console.log($cookies.get('enquiry_made'));
            if ($cookies.get('enquiry_made') == undefined) {
                var enquiry = {items:{}};
                enquiry.items[item.id] = item;
            } else {
                var enquiry = JSON.parse($cookies.get('enquiry_made'));
                if (enquiry.items) {
                    enquiry.items[item.id] = item;

                } else {
                    enquiry.items = {};
                    enquiry.items[item.id] = item;
                }
            }
            $cookies.put('enquiry_made', JSON.stringify(enquiry));
            $rootScope.$emit('syncEnquiryMade');
        });
        
        
        $scope.removeFromEnquiryCart = function() {};

        $rootScope.$on('addEnquiryDetails', function (idk, item) {
            var enquiry = JSON.parse($cookies.get('enquiry_made'));
            angular.forEach(item, function (value, key) {
                enquiry[key] = value;
            });
            console.log("enquiry###########################");
            console.log(enquiry);
            $cookies.put('enquiry_made', JSON.stringify(enquiry));

            $rootScope.$emit('syncEnquiryMade');
        });

        $rootScope.$on('syncEnquiryMade', function () {
            console.log("FUXK");
            var enquiry = null;
            if ($cookies.get('enquiry_made')) {
                 enquiry = JSON.parse($cookies.get('enquiry_made'));
            }

            $rootScope.enquiry_made = enquiry;
            console.log($rootScope.enquiry_made);

        });
        $rootScope.$on('clearEnquiry', function () {
            
            $cookies.put('enquiry_made', JSON.stringify({}));
            $rootScope.$emit('syncEnquiryMade');
            
            

        });



        if ($rootScope.enquiry_made.address_id) {
            var promise = AddressFactory.get({id: $rootScope.enquiry_made.address_id}).$promise;
            promise.then(function (result) {
                if (result.error) {
                    $scope.errorMessage = result.error;
                } else {
                    $scope.errorMessage = "";
                    $scope.address = result;
                }

            });

        }
        $scope.enquiry_made = $rootScope.enquiry_made;
        
        $scope.placeEnquiry = function() {
            $rootScope.$emit('syncEnquiryMade');
            var items = Object.keys($rootScope.enquiry_made.items);
            var enquiry = $rootScope.enquiry_made;
            enquiry.items = items;
            var promise = EnquiryFactory.placeEnquiry(enquiry).$promise;
            promise.then(function(result) {
                swal("Order placed!","Our team will contact you soon!");
                $rootScope.$emit('clearEnquiry');
                $location.path("/");
                
            })
        };


    }]);

