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
            
            $scope.$emit('addToCart', $scope.enquiry.items);
            $location.path("/address");
        };
        
        
        $scope.$watch('$viewContentLoaded', function () {
            $scope.getChildren($routeParams.id,function(itemList) {
                $scope.laundryServiceTypes = itemList;

            });
        });


    }]).directive('laundryprices', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/services/laundry/laundry-prices.html'};
});;       