(function() {
    var recoverApp = angular.module("recoverApp", ['ngMessages']);
    /**
     * Se encarga de gestionar el login y el inicio de sesion     *
     */
    recoverApp.controller("recoverController", function($http, $scope, $filter,accessService) {

      $scope.userLogin = new userLogginObj();
      $scope.validPassword=0;

      this.sessionControl = function() {
          if (typeof(Storage) == "undefined") {
              alert("Your browser is not compatible with sessions, upgrade your browser");
          } else {
              /*if (sessionStorage.length > 0) {
                  var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));
                  var user = new userLogginObj();
                  user.construct(objAux.idUserLoggin, objAux.nick, objAux.password, objAux.role);
                  if (!isNaN(user.getIdUserLoggin())) {
                      window.open("admin.html", "_self");
                  }

              }*/
              var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                  controllerType: 0,
                  action: 10100,
                  jsonData: {
                      none: ""
                  }
              });
              promise.then(function(outPutData) {
                  if (outPutData[0] === true) {
                      if (typeof(Storage) == "undefined") {
                          alert("Your browser is not compatible with sessions, upgrade your browser");
                      } else {
                          console.log(user);
                          $scope.userManag = 0;
                          sessionStorage.setItem("connectedUser", JSON.stringify(outPutData[1]));
                          window.open("admin.html", "_self");
                      }
                  } else {
                      if (!angular.isArray(outPutData[1])) {
                          alert("There has been an error in the server, try later");
                      }
                  }
              });
          }
      }



        this.recoverSend = function () {

          $scope.userLogin = angular.copy($scope.userLogin);
          console.log($scope.userLogin);

          var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
              controllerType: 0,
              action: 10600,
              jsonData: JSON.stringify($scope.userLogin)
          });

          promise.then(function(outPutData) {
          //  console.log(outPutData);
              if (outPutData[0] === true) {
                  alert("Information changed correctly, now login");
                  window.open("../index.html", "_self");
              } else {
                  if (angular.isArray(outPutData[1])) {
                      showErrors(outPutData[1]);
                  } else {
                      alert("Can't change your password, try again");
                  }
              }
          });



        }

        this.checkPassword = function () {
          if($scope.userLogin.password == $scope.confirmPassword){
            $scope.validPassword = 1;
          } else {
              $scope.validPassword = 0;
          }

        }




    });

    recoverApp.factory('accessService', function($http, $log, $q) {
        return {
            getData: function(url, async, method, params, data) {
                var deferred = $q.defer();
                $http({
                        url: url,
                        method: method,
                        asyn: async,
                        params: params,
                        data: data
                    })
                    .success(function(response, status, headers, config) {
                        deferred.resolve(response);
                    })
                    .error(function(msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                        alert("There has been an error in the server, try later");
                    });

                return deferred.promise;
            }
        }
    });

})();
