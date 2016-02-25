mainApp.factory('OrderFactory', ['$resource',
    function ($resource) {
        return $resource(APP_URL.order_item,
                {},
                {
                    get: {method: 'GET', headers: HEADERS, params: {category_id: '@category_id', id: '@id'}, isArray: true},
                    placeOrder: {method: 'POST', params: {}},
                });
    }]);