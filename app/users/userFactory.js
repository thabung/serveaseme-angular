'use strict';
mainApp.factory('UserFactory', ['$resource', '$rootScope', '$cookies', function ($resource, $rootScope, $cookies) {
        return $resource(API_ENGINE_URL + 'users/:id',
                {},
                {
                    get: {method: 'GET', headers: HEADERS, params: {id: '@id'}},
                    save: {method: 'POST', headers: HEADERS},
                    update: {method: 'PUT', headers: HEADERS},
                    changePassword: {method: 'PUT', headers: HEADERS,url: APP_URL.change_password}
                });

    }]);