'use strict';
mainApp.factory('AuthFactory', ['$resource','$rootScope','$cookies',function($resource,$rootScope,$cookies){
var user;
return{
    setUser : function(aUser){
        
        $rootScope.user = aUser;
        $cookies.put('user',aUser);
        
    },
    syncCookieUser: function() {
        $rootScope.user =  $cookies.get('user');;
    },
    getUser: function() {
        return $rootScope.user;
    },
    logout :function() {
        $cookies.remove('auth_token');
        $rootScope.user = undefined;
    },
    isLoggedIn : function(){
        console.log(this.getUser());
        return(this.getUser())? true : false;
    },
    login: function(username,password) {
            var self = this;
            console.log(username + password);
            var Login = $resource(APP_URL.login,{},
                    {
                        login:{method:"POST"}
                    }
            );
            var promise = Login.login({email:username,password:password}).$promise;
            promise.then(function(result){
                
                if (result.token) {
                    console.log(result.token);
                    self.setUser({email:username,auth_token:result.token});
                }
                
            });
            
            
        
        
    }
  }
}]);