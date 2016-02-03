'use strict';
mainApp.factory('AddressFactory', ['$resource', '$rootScope', '$cookies', function ($resource, $rootScope, $cookies) {
        return $resource(API_ENGINE_URL + 'address/:id',
                {},
                {
                    get: {method: 'GET', headers: HEADERS, params: {id: '@id'}},
                    save: {method: 'POST', headers: HEADERS},
                    update: {method: 'PUT', headers: HEADERS},
                    getAddress: {method: 'GET', headers: HEADERS,params:{user_id:'@user_id'}}

                });

    }]);