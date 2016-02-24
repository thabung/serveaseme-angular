mainApp.config(['$routeProvider', function ($routeProvider) {
        
        
        $routeProvider.when('/service/Laundry/:id',
                {
                    templateUrl: 'app/services/laundry/laundry.html',
                    controller: 'laundryCtrl'
                }
        );}]);
        
        
mainApp.controller('laundryCtrl', ['$scope', 'CategoryFactory',
    '$routeParams',"$rootScope","$location", function ($scope, CategoryFactory, $routeParams,$rootScope,$location) {
        $scope.laundryServiceTypes = {};
        $scope.laundryServiceNames = {};
        $scope.now_showing = "service_types";
        $scope.getChildren = function (id,callback) {
            var promise = CategoryFactory.getChildren({parent_id:id}).$promise;
            promise.then(function (itemList) {
                callback(itemList);
                
            });
        };
        $scope.clothPrices = {};
        $scope.showClothPriceList = function() {
            angular.forEach($scope.laundryServiceTypes, function (value, key) {
                $scope.laundryServiceNames[value.id] = value.name;
                $scope.getChildren(value.id,function(itemList) {
                    $scope.clothPrices[value.name] = itemList;
                
                });
                $scope.now_showing = "price_list";
                
            });
            
            
        };
        $scope.enquiry = {};
//        $scope.enquiry 
        $scope.showServices = function() {
            $scope.now_showing = "service_types";
        };
        $scope.addCartLaundry = function() {
            angular.forEach($scope.enquiry.items,function(value,key) {
//                var temp = value.split(":");
                $rootScope.$emit('addToCartEnquiry', {id:value,name:$scope.laundryServiceNames[value]});
            });
            
            $location.path("/address");
        };
        
        
        $scope.$watch('$viewContentLoaded', function () {
            $scope.getChildren($routeParams.id,function(itemList) {
                $scope.laundryServiceTypes = itemList;
                angular.forEach($scope.laundryServiceTypes, function (value, key) {
                    $scope.laundryServiceNames[value.id] = value.name;
                })

            });
        });


    }]).directive('laundryprices', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/services/laundry/laundry-prices.html'};
});;       