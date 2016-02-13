mainApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/category/:category_id/items',
                {
                    templateUrl: 'app/products/partial-product.html',
                    controller: 'productController'
                }
        );

        $routeProvider.when('categ/items',
                {
                    templateUrl: 'app/products/user-detail.html',
                    controller: 'productController'
                }
        );
        $routeProvider.when('/',
                {
                    templateUrl: 'app/products/all-products.html',
                    controller: 'productController'
                }
        );
        $routeProvider.when('/service/laundry',
                {
                    templateUrl: 'app/products/laundry.html',
                    controller: 'laundryCtrl'
                }
        );
        $routeProvider.when('/laundry/price-list',
                {
                    templateUrl: 'app/products/laundry-prices.html',
                    controller: 'laundryCtrl'
                }
        );
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
mainApp.controller('productController', ['$scope', 'ProductFactory',
    '$routeParams', function ($scope, ProductFactory, $routeParams) {

        var promise = ProductFactory.getAllCategories().$promise;
        promise.then(function (productList) {
            $scope.categoryList = productList;
            
        });



    }]);


mainApp.controller('laundryCtrl', ['$scope','$rootScope', 'ProductFactory','AddressFactory',
    '$routeParams','$location', function ($scope,$rootScope, ProductFactory,AddressFactory, $routeParams,$location) {
        $scope.order = {};
        $scope.order.service_type = [] ;
        
        
        var promise = ProductFactory.getProductsByPath({path:"Laundry/"}).$promise;
        promise.then(function (productList) {
            console.log(productList);
            $scope.itemList = productList;
            $scope.laundryMenList = productList['Laundry/Men/'];
            $scope.laundryWomenList = productList['Laundry/Women/'];
            $scope.laundryKidList = productList['Laundry/Kids/'];
        });
        
        
        $scope.addService = function() {
            
            if ($scope.order.service_type.length == 0) {
                
                $scope.errorMessage = "Please tick atleast 1 service!";
            } else {
                $location.path("/address/service/?service_type=" + $scope.order.service_type.join(","));
//                $location.path("/address?z=1");
//                                  #/address
            }
            //#/address
        }
       
        
        console.log("TESTING ###");

    }]);





