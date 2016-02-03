'use strict';
mainApp.factory('AuthFactory', ['$resource', '$rootScope', '$cookies', function ($resource, $rootScope, $cookies) {
        var user;
        return{
            setAuthorizationHeader: function () {
                HEADERS = {Authorization: "Bearer " + $rootScope.user.auth_token};
            },
            resetAuthorizationHeader: function() {
                HEADERS = null;
            }
            ,
            setUser: function (aUser) {

                $rootScope.user = aUser;
                $cookies.put('user', JSON.stringify(aUser));
                this.setAuthorizationHeader();


            },
            
            syncCookieUser: function () {

                var user = $cookies.get('user');
                if (!user) {
                    return;
                }
                $rootScope.user = JSON.parse(user);

                console.log(JSON.stringify($rootScope.user));
                console.log($rootScope.user);
                this.setAuthorizationHeader();

            },
            getUser: function () {

                return $rootScope.user;
            },
            logout: function () {
                $rootScope.user = undefined;
                this.resetAuthorizationHeader();
                $cookies.remove("user");
                
            },
            isLoggedIn: function () {
                console.log(this.getUser());
                return(this.getUser()) ? true : false;
            },
            login: function (username, password,errorCallback) {
                var self = this;
                console.log(username + password);
                var Login = $resource(APP_URL.login, {},
                        {
                            login: {method: "POST"}
                        }
                );
                var promise = Login.login({email: username, password: password}).$promise;
                promise.then(function (result) {

                    if (result.token) {
                        console.log(result.token);
                        self.setUser({email: username, auth_token: result.token});

                    } 
                    

                },function(error) {
                    console.log(error);
                    errorCallback(error) 
                });
            }
        }
    }]);