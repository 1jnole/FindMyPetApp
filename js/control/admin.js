//JQuery code

//Angular code
(function() {
    //Application module
    var findMyPetAdmin = angular.module('findMyPetAdmin', ['angularUtils.directives.dirPagination', 'ngMessages', 'angular-datepicker','ngDialog']);

    findMyPetAdmin.controller("sessionController", function($http, $scope, accessService, $filter,ngDialog,animals, userDataFact, announDataFact) {

        $scope.user = new userLogginObj();
        $scope.userData = new userDataObj();

        //Scope variables
        $scope.userAction = 0;
        $scope.nickValid = true;
        $scope.passwordValid = true;
        $scope.sessionOpened = false;

        //scope form variables
        $scope.animalsFormShow = 0;
        $scope.animalsManagement = 0;
        $scope.userProfileTem = 0;
        $scope.showRegisterForm = 0;
        $scope.listUsersShow = 0;

        //load form variables
        $scope.userProfileInf = 0;
        $scope.postPublish = 1;
        $scope.animalRegistForm = 0;
        $scope.animalManagementForm = 0;
        $scope.announcementForm = 0;
        $scope.showAnnouncementManagement = 0;

        //to determine if it's an admin or not (useful in some cases)
        $scope.adminYes = 0;

        //Pagination variables
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        //user profile form
        $scope.accountData = 0;
        $scope.showUserData = 1;
        $scope.showInputPass = 0;
        $scope.showInputText = 0;
        $scope.hideLink = 1;
        $scope.hideButton = 0;

        $scope.clickToOpen = function() {
          ngDialog.open({
            template: '../templates/announcement-form.html'
          });
        };

        $scope.openRegistAnimalForm = function() {
          ngDialog.open({
            template: '../templates/animals-regist.html'
          });
        };


        $scope.options = {
          format: 'yyyy-mm-dd', // ISO formatted date
          onClose: function(e) {
            // do something when the picker closes
          }
        }

        /*
         * @name: sessionControl
         * @description: This functions allows the control the session
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.sessionControl = function() {

          if (typeof(Storage) == "undefined") {
            //El navegador és compatible LocalStorage;
            alert("This browser does not accept local sessions management");
          } else {
            if (sessionStorage.length > 0) {
              var objAux = JSON.parse(sessionStorage.getItem('connectedUser'));
              $scope.user.construct(objAux.idUserLoggin, objAux.nick, objAux.password, objAux.role, objAux.pin);
              var objAux2 = JSON.parse(sessionStorage.getItem('userData'));
              $scope.userData.construct(objAux2.idUser, objAux2.name, objAux2.lastName, objAux2.address, objAux2.postalCode, objAux2.phone, objAux2.email, objAux2.image, objAux2.dateAdded, objAux2.idUserLogin);
              $scope.passControl = $scope.user.getPassword();
              $scope.sessionOpened = true;
              userDataFact.push($scope.userData);
            }
            if (isNaN($scope.user.getIdUserLoggin())) {
              window.open("../index.html", "_self");
            }
          }
        }

        this.logOut = function() {
            //Local session destroy
            if (typeof(Storage) == "undefined") {
                //El navegador és compatible LocalStorage;
                alert("This browser does not accept local sessions management");
            } else {
                sessionStorage.removeItem('connectedUser');
                sessionStorage.removeItem('userData');
                //Server session destroy
                var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                    controllerType: 0,
                    action: 10300,
                    jsonData: {
                        none: ""
                    }
                });
                promise.then(function(outPutData) {
                    if (outPutData[0] === true) {
                        window.open("../index.html", "_self");
                    } else {
                        if (angular.isArray(outPutData[1])) {
                            showErrors(outPutData[1]);
                        } else {
                            alert("There has been an error in the server, try later");
                        }
                    }
                });
            }
        }

        /*
         * @name: loadCurrentUser
         * @description: This functions allows show the data of the user logged
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.loadCurrentUser = function(){
          $scope.userDataAux = new userDataObj();
          var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
            controllerType: 0,
            action: 11100,
            jsonData: JSON.stringify($scope.userData)
          });
          promise.then(function(outPutData) {
            if (outPutData[0] === true) {
              for (var i = 0; i < outPutData[1].length; i++) {
                var userData2 = new userDataObj();
                userData2.construct(outPutData[1][i].idUser, outPutData[1][i].name, outPutData[1][i].lastName, outPutData[1][i].address, outPutData[1][i].postalCode, outPutData[1][i].phone, outPutData[1][i].email, outPutData[1][i].image, outPutData[1][i].dateAdded, outPutData[1][i].idUserLogin);
                $scope.userDataAux = angular.copy(userData2);
              }

            } else {
              if (angular.isArray(outPutData[1])) {
                showErrors(outPutData[1]);
              } else {
                alert("There has been an error in the server, try later");
              }
            }
          });
        }

    });
    //se encarga de gestionar el registro entre otras funciones
    findMyPetAdmin.controller("registerController", function($http, $scope, $filter, accessService) {


        this.registerUser = function() {
                var flag = false;
                var date = new Date();
                $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                $scope.userData.setDateAdded($scope.date);

                //$scope.userdata.setIdCity(1);
                //$scope.userdata.setIdUserLoggin(6);

                $scope.userData = angular.copy($scope.userData);
                $scope.user = angular.copy($scope.user);

                if (($scope.user.validateUserLoggin().length > 0)) { //Doing some validations
                    showErrors($scope.user.validateUserLoggin()); //showing to the user the errors
                    flag = true;
                }

                if ($scope.userData.validateUserData().length > 0) { //Doing some validations
                    showErrors($scope.userData.validateUserData()); //showing to the user the errors
                    flag = true;
                }


                if (!flag) {
                    var fullUserData = [];
                    fullUserData.push($scope.user);
                    fullUserData.push($scope.userData);
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                        controllerType: 0,
                        action: 10200,
                        jsonData: JSON.stringify(fullUserData)
                    });
                    promise.then(function(outPutData) {
                        if (outPutData[0] === true) {
                            alert("Registered  succesfully");
                            $scope.userRegistration.$setPristine();
                        } else {
                            if (angular.isArray(outPutData[1])) {
                                showErrors(outPutData[1]);
                            } else {
                                alert("There has been an error in the server, try later");
                            }
                        }
                    });
                }
            }
            //The scope variables from the parent weren't taken by this controller, so i decided to make a function where
            //i can pass the scope variables.
        this.checkPassword = function() {
            if ($scope.user.password == $scope.confirmPassword) {
                $scope.validPassword = 1;
            } else {
                $scope.validPassword = 0;
            }
        }
    });

    findMyPetAdmin.controller("listUsersController", function($http, $scope, $filter, accessService) {

        this.loadUsers = function() {
            $scope.userArray = [];
            $scope.userArrayLoggin = [];
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10900,
                jsonData: {
                    none: ""
                }
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var user = new userDataObj();
                        user.construct(outPutData[1][i].idUser, outPutData[1][i].name, outPutData[1][i].lastname, outPutData[1][i].address, outPutData[1][i].postalCode, outPutData[1][i].phone, outPutData[1][i].email, outPutData[1][i].image, outPutData[1][i].dateAdded, outPutData[1][i].idCity, outPutData[1][i].idUserLogin);
                        $scope.userArray.push(user);

                    }
                    for (var j = 0; j < outPutData[2].length; j++) {
                        var userLoggin = new userLogginObj();
                        userLoggin.construct(outPutData[2][i].idUserLogin, outPutData[2][i].nick, outPutData[2][i].password, outPutData[2][i].role, outPutData[2][i].pin);
                        $scope.userArrayLoggin.push(userLoggin);
                    }
                    console.log($scope.user);
                    // console.log($scope.userArrayLoggin);

                    // for (var i = 0; i < outPutData[1].length; i++) {
                    // var user = new userLogginObj();


                    // animal.construct(outPutData[1][i].idAnimal, outPutData[1][i].animalName, outPutData[1][i].weight, outPutData[1][i].height, outPutData[1][i].description, outPutData[1][i].animalImage, outPutData[1][i].dateOfBirth, outPutData[1][i].dateAdded, outPutData[1][i].idUser);
                    // $scope.animals.push(animal);
                    // }
                    // $scope.filteredData = angular.copy($scope.animals);

                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

    });

    findMyPetAdmin.controller("animalManagementController", function($http, $scope, accessService, $filter,ngDialog,animals, userDataFact, announDataFact) {

        $scope.animal = new animalObj();
        $scope.animals = [];

        this.registerAnimal = function() {
            var date = new Date(); //to do take the current date
            var imageFile = $("#imageAnimal")[0].files[0];
            var imagesArrayToSend = new FormData();

            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd'); //taking the current date in format  yyyy-MM-dd
            imagesArrayToSend.append('images[]', imageFile);
            $http({
                method: 'POST',
                url: '../php/controllers/MainController.php?controllerType=2&action=10100&jsonData=' + $scope.animal.getName(),
                headers: {
                    'Content-Type': undefined
                },
                data: imagesArrayToSend,
                transformRequest: function(data, headersGetterFunction) {
                    return data;
                }
            }).success(function(outPutData) {
                if (outPutData[0] === true) {
                    //File uploaded
                    $scope.animal.setDateAdded($scope.date);
                    $scope.animal.setImage(outPutData[1][0]);
                    $scope.animal.setIdUser($scope.$parent.idUser);
                    $scope.animal = angular.copy($scope.animal);
                    var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                        controllerType: 1,
                        action: 10000,
                        jsonData: JSON.stringify($scope.animal)
                    });
                    promise.then(function(outPutData) {
                        if (outPutData[0] === true) {
                            alert("Done");
                        } else {
                            if (angular.isArray(outPutData[1])) {
                                showErrors(outPutData[1]);
                            } else {
                                alert("There has been an error in the server, try later");
                            }
                        }
                    });
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

        this.removeAnimal = function(rowToDelete, animal) {
            $scope.animal = angular.copy(animal);
            console.log($scope.animal);
            if (confirm("Are you sure you want delete this animal?")) {
                var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                    controllerType: 1,
                    action: 10200,
                    jsonData: JSON.stringify($scope.animal)
                });

                promise.then(function(outPutData) {
                    if (outPutData[0] === true) {
                        alert("Animal has been deleted  succesfully");
                        $scope.animalsForm.$setPristine();
                    } else {
                        if (angular.isArray(outPutData[1])) {
                            showErrors(outPutData[1]);
                        } else {
                            alert("There has been an error in the server, try later");
                        }
                    }
                });
            }

        }



        this.modifyAnimal = function() {}
            /*
             * @name: loadanimals
             * @description: This functions allows load all the animals introduced in the dataBase
             * @version: 1.0
             * @params:
             * @date: 23/04/2016
             * @author: Jorge Nole
             */

        this.loadAnimals = function() {
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 1,
                action: 10100,
                jsonData: {
                    none: ""
                }
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var animal = new animalObj();
                        animal.construct(outPutData[1][i].idAnimal, outPutData[1][i].animalName, outPutData[1][i].weight, outPutData[1][i].height, outPutData[1][i].description, outPutData[1][i].animalImage, outPutData[1][i].dateOfBirth, outPutData[1][i].dateAdded, outPutData[1][i].status, outPutData[1][i].idUser);
                        $scope.animals.push(animal);
                    }
                    $scope.filteredData = angular.copy($scope.animals);
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }
    });

    findMyPetAdmin.directive("animalManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animal-management.html",
            controller: function() {},
            controllerAs: 'animalManagement'
        };
    });

    findMyPetAdmin.directive("userProfile", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/user-profile.html",
            controller: function() {

            },
            controllerAs: 'userProfile'
        };
    });

    findMyPetAdmin.directive("animalsRegist", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animals-regist.html",
            controller: function() {

            },
            controllerAs: 'animalsRegist'
        };
    });

    findMyPetAdmin.directive("loginForm", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/login-form.html",
            controller: function() {

            },
            controllerAs: 'loginForm'
        };
    });

    findMyPetAdmin.directive("listUsers", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/list-users.html",
            controller: function() {

            },
            controllerAs: 'listUsers'
        };
    });



    findMyPetAdmin.factory('accessService', function($http, $log, $q) {
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


    findMyPetAdmin.factory('animals', function() {
      var animals = [];
      return animals;

    });

    findMyPetAdmin.factory('userDataFact', function() {
      var userDataFact = [];
      return userDataFact;

    });

    findMyPetAdmin.factory('announDataFact', function() {
      var announDataFact = [];
      return announDataFact;
    });



    findMyPetAdmin.factory('userDataModFact', function() {
      var userDataModFact = new userDataObj();
      return userDataModFact;
    });



    findMyPetAdmin.directive("fileread", function() {
        return {
            scope: {
                userImage: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.userImage = loadEvent.target.result;
                        scope.$apply();
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    });
})();
//own code
