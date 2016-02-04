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
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
mainApp.controller('productController', ['$scope', 'ProductFactory',
    '$routeParams', function ($scope, ProductFactory,  $routeParams) {
        
        var promise = ProductFactory.getAllCategories().$promise;
        promise.then(function (productList) {
            $scope.categoryList = productList;
        });



    }]);



