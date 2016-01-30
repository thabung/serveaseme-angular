mainApp.controller('loginCtrl', [ '$scope', 'AuthFactory', function ($scope, Auth) {
  //submit
    $scope.login = function (email,password) {
    
    Auth.login()

    Auth.setUser(user); //Update the state of the user in the app
  };
}])