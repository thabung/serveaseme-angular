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
    '$routeParams', function ($scope,$rootScope, ProductFactory,AddressFactory, $routeParams) {

        var promise = ProductFactory.getProductsByPath({path:"Laundry/"}).$promise;
        promise.then(function (productList) {
            console.log(productList);
            $scope.itemList = productList;
            $scope.laundryMenList = productList['Laundry/Men/'];
            $scope.laundryWomenList = productList['Laundry/Women/'];
            $scope.laundryKidList = productList['Laundry/Kids/'];
        });
        
//        $scope.show_price = true;
        console.log("TESTING ###");
//        console.log($rootScope.user.user.id);
       
        
        



    }]);





