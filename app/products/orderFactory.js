mainApp.factory('OrderFactory', ['$resource',
    function ($resource) {
        return $resource(APP_URL.order_item ,
        {}, 
        {
            get: {method: 'GET',headers:HEADERS, params: {category_id: '@category_id', id: '@id'},isArray:true},
            save: {method: 'GET',headers:HEADERS, isArray: true},
            order: {method: 'POST',headers:HEADERS,params:{}},
            
        });
    }]);


mainApp.factory('EnquiryFactory', ['$resource',
    function ($resource) {
        return $resource(APP_URL.place_enquiry ,
        {}, 
        {
            get: {method: 'GET',headers:HEADERS, params: {category_id: '@category_id', id: '@id'},isArray:true},
            save: {method: 'GET',headers:HEADERS, isArray: true},
            placeEnquiry: {method: 'POST',headers:HEADERS,params:{}},
            
        });
    }]);