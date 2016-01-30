'use strict';
mainApp.factory('ProductFactory', ['$resource',
    function ($resource) {
        return $resource(API_ENGINE_URL + 'items/:itemId', {}, {
            get: {method: 'GET', params: {itemId: '@itemId'}},
            save: {method: 'GET', isArray: true}

            //tree: {method:'GET', isArray:true,url:API_ENGINE_URL+"category/tree"}
        });
    }]);

mainApp.factory('ProductListFactory', ['$resource',
    function ($resource) {
        return $resource(API_ENGINE_URL + 'category/:id/items',
        {}, 
        {
            get: {method: 'GET', params: {category_id: '@category_id', id: '@id'},isArray:true},
            save: {method: 'GET', isArray: true}
            
        });
    }]);



