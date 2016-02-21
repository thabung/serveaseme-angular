'use strict';
mainApp.controller('mainController',['$scope','$rootScope',function($scope,$rootScope) {
    $rootScope.cart = [];
    $scope.$on('addToCart',function(idk,item) {
         $rootScope.cart.push(item);
         
     }); 
     
    $scope.$on('placeOrder',function(idk,item) {
//         $rootScope.cart.push(item);
        
        swal("Preview");
         
     });        
}]);