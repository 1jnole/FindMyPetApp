//Angular code
(function() {
    var findMyPet = angular.module("findMyPet", ['gm', 'ngMessages', 'angularUtils.directives.dirPagination', 'ngDialog']);

    /**
     * Se encarga de gestionar el login y el inicio de sesion
     *
     */
    findMyPet.controller("sessionController", function($http, $scope, $filter, accessService) {

        //scope objects
        $scope.user = new userLogginObj();
        $scope.userdata = new userDataObj();
        $scope.animalObj = new animalObj();

        $scope.userManag = 0;
        $scope.role = "";

        //Scope form variables to show
        $scope.showLogin = 0;
        $scope.loginformshow = 0;
        $scope.showRegisterForm = 0;
        $scope.validPassword = 0;
        $scope.recoverFormShow = 0;
        $scope.image;
        $scope.nameSearch;

        //sessionControl
        $scope.userAction = 0;
        $scope.passwordValid = true;
        $scope.nickValid = true;
        $scope.emailValid = true;

        $scope.inicioSesionSi = 0;

        /*
         * @name: sessionControl
         * @description: This functions allows control the session of the user
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.sessionControl = function() {
            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions, upgrade your browser");
            } else {
                if (sessionStorage.length > 0) {
                    var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));
                    var user = new userLogginObj();
                    user.construct(objAux.idUserLoggin, objAux.nick, objAux.password, objAux.role);
                    if (!isNaN(user.getIdUserLoggin())) {
                        $scope.inicioSesionSi = 1;
                        // window.open("html/admin.html", "_self");
                    }
                }
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
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
                            $scope.inicioSesionSi = 1;
                            // console.log(user);
                            $scope.userManag = 0;
                            sessionStorage.setItem("connectedUser", JSON.stringify(outPutData[1]));
                            // window.open("../admin.html", "_self");

                        }
                    } else {
                        if (!angular.isArray(outPutData[1])) {
                            alert("There has been an error in the server, try later");
                        }
                    }
                });
            }
        }

        /*
         * @name: connection
         * @description: This functions allows search anything (not implemented yet)
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */
        this.searchByWord = function() {
                alert("Not implemented yet, sorry we are working on it")
                    // var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                    //     controllerType: 0,
                    //     action: 11300,
                    //     jsonData: JSON.stringify($scope.nameSearch)
                    // });
                    // promise.then(function(outPutData) {
                    //     if (outPutData[0] === true) {
                    //         $scope.nickValid = true;
                    //         $("#inputNick").removeClass("ng-invalid").addClass("ng-valid"); //if the nick is validate correctly  we remove the ng-invalid class
                    //     } else {
                    //         if (angular.isArray(outPutData[1])) {
                    //             $scope.nickValid = false;
                    //             $("#inputNick").removeClass("ng-valid").addClass("ng-invalid"); //if the  isn't validate correctly we remove the ng-valid class
                    //         } else {
                    //             alert("There has been an error in the server, try later");
                    //         }
                    //     }
                    // });
            }
            /*
             * @name: connection
             * @description: This functions allows search users in our dataBase to validate
             * @version: 1.0
             * @params:
             * @date: 5/05/2016
             * @author: Jorge Nole
             */
        this.connection = function() {
            var flag = false;
            if ($scope.user.getNick() === null || $scope.user.getPassword() === null) {
                if (($scope.user.validateCredentials().length > 0)) {
                    showErrors($scope.user.validateCredentials()); //showing to the user the errors
                }
                flag = true;
            }
            if (!flag) {
                //copy
                $scope.user = angular.copy($scope.user);
                //Server conenction to verify user's data
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                    controllerType: 0,
                    action: 10000,
                    jsonData: JSON.stringify($scope.user)
                });
                promise.then(function(outPutData) {
                    if (outPutData[0] === true) {

                        var user = new userLogginObj();
                        user.construct(outPutData[1][0].idUserLogin, outPutData[1][0].nick, outPutData[1][0].password, outPutData[1][0].role, outPutData[1][0].pin);

                        var userData = new userDataObj();
                        userData.construct(outPutData[2][0].idUser, outPutData[2][0].name, outPutData[2][0].lastName, outPutData[2][0].address, outPutData[2][0].postalCode, outPutData[2][0].phone, outPutData[2][0].email, outPutData[2][0].image, outPutData[2][0].dateAdded, outPutData[2][0].idCity, outPutData[2][0].idAnimal, outPutData[2][0].idAnnouncement, outPutData[2][0].idUserLogin);

                        if (typeof(Storage) == "undefined") {
                            alert("Your browser is not compatible with sessions, upgrade your browser");
                        } else {
                            sessionStorage.setItem("connectedUser", JSON.stringify(user));
                            sessionStorage.setItem("userData", JSON.stringify(userData));

                            window.open("html/mainMenu.html?role=" + user.getRole() + "&id=" + userData.getIdUser(), target = "_self");

                        }
                        $scope.loginformshow = 0;
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
         * @name: checkPassword
         * @description: This functions allows check if the password match
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.checkPassword = function() {
            if ($scope.user.password == $scope.confirmPassword) {
                $scope.validPassword = 1;
            } else {
                $scope.validPassword = 0;
            }
        }

        /*
         * @name: checkNick
         * @description: This functions allows check if the nick does't exists
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.checkNick = function() {
            $scope.user = angular.copy($scope.user);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10700,
                jsonData: JSON.stringify($scope.user)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.nickValid = true;
                    $("#inputNick").removeClass("ng-invalid").addClass("ng-valid"); //if the nick is validate correctly  we remove the ng-invalid class
                } else {
                    if (angular.isArray(outPutData[1])) {
                        $scope.nickValid = false;
                        $("#inputNick").removeClass("ng-valid").addClass("ng-invalid"); //if the  isn't validate correctly we remove the ng-valid class
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }


        /*
         * @name: checkEmail
         * @description: This functions allows check if the email does't exists
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.checkEmail = function() {
            $scope.userdata = angular.copy($scope.userdata);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10800,
                jsonData: JSON.stringify($scope.userdata)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.emailValid = true;
                    $("#inputEmailLogin").removeClass("ng-invalid").addClass("ng-valid"); //if the email is correct we remove the ng-invalid class
                } else {
                    if (angular.isArray(outPutData[1])) {
                        $scope.emailValid = false;
                        $("#inputEmailLogin").removeClass("ng-valid").addClass("ng-invalid"); //if the email is incorrect we remove the ng-valid class
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }
    });



    //Register Conntroller
    findMyPet.controller("registerController", function($http, $scope, $filter, accessService) {

        /*
         * @name: checkEmail
         * @description: This functions allows register a new User
         * @version: 1.0
         * @params:
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.registerUser = function() {
            var flag = false;
            var date = new Date();
            var path = "images/userImages/default.gif";

            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.userdata.setDateAdded($scope.date);
            $scope.userdata.setImage(path);

            $scope.userdata = angular.copy($scope.userdata);
            $scope.user = angular.copy($scope.user);

            if (($scope.user.validateUserLoggin().length > 0)) { //Doing some validations
                showErrors($scope.user.validateUserLoggin()); //showing to the user the errors
                flag = true;
            }

            if ($scope.userdata.validateUserData().length > 0) { //Doing some validations
                showErrors($scope.userdata.validateUserData()); //showing to the user the errors
                flag = true;
            }

            if (!flag) {
                var fullUserData = [];
                fullUserData.push($scope.user);
                fullUserData.push($scope.userdata);
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
        this.test = function() {
            $scope.$parent.loginformshow = 0;
            $scope.$parent.showRegisterForm = 0;
        }
    });

    //Recover Password Controller
    findMyPet.controller("recoverController", function($http, $scope, accessService) {
        this.test = function() {
            $scope.$parent.loginformshow = 0;
            $scope.$parent.recoverFormShow = 0;
        }

        /*
         * @name: recoverPassword
         * @description: This functions allowsan user registered recover the password
         * @version: 1.0
         * @params: none
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.recoverPassword = function() {
            $scope.userdata = angular.copy($scope.userdata);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10500,
                jsonData: JSON.stringify($scope.userdata)
            });
            promise.then(function(outPutData) {
                //  console.log(outPutData);
                if (outPutData[0] === true) {
                    alert("Check your email, and the spam section just in case");
                    $scope.userRecover.$setPristine();
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




    findMyPet.controller("announcementManagementController", function($http, $scope, accessService, $filter, ngDialog) {
        //scope objects
        $scope.animal = new animalObj();
        $scope.announcement = new announcementObj();
        $scope.announcements = [];

        //Pagination variables
        $scope.pageSize = 9;
        $scope.currentPage = 1;

        this.createReport = function() {
                alert("We are sorry, action not implemented yet");
            }
            /*
             * @name: loadAllAnnouncements
             * @description: This functions allows load all the announcements
             * @version: 1.0
             * @params:
             * @date: 5/05/2016
             * @author: Jorge Nole
             */

        this.loadAllAnnouncements = function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                controllerType: 3,
                action: 10100,
                jsonData: {
                    none: ""
                }
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {

                    for (var i = 0; i < outPutData[1].length; i++) {
                        var animal = new animalObj();
                        var announcement = new announcementObj();
                        animal.construct(outPutData[1][i].animal.idAnimal, outPutData[1][i].animal.animalName,
                            outPutData[1][i].animal.weight, outPutData[1][i].animal.height,
                            outPutData[1][i].animal.description, outPutData[1][i].animal.animalImage,
                            outPutData[1][i].animal.dateOfBirth, outPutData[1][i].animal.dateAdded,
                            outPutData[1][i].animal.status, outPutData[1][i].animal.idUser);

                        announcement.construct(outPutData[1][i].idAnnouncement, outPutData[1][i].title, outPutData[1][i].description, outPutData[1][i].dateAdded, outPutData[1][i].dateModdified, outPutData[1][i].dateDeleted, outPutData[1][i].locationMissed, outPutData[1][i].idUser, animal);
                        $scope.announcements.push(announcement);
                    }
                    $scope.filteredDataAnnoun = angular.copy($scope.announcements);

                } else {
                    if (angular.isArray(outPutData[1])) {
                        //showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }



        /*
         * @name: getPet
         * @description: This functions allows load a template when the user click the button "i saw my pet"
         * @version: 1.0
         * @params:index, announcement
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        $scope.getPet = function($index, announcement) {
            ngDialog.open({
                template: 'templates/report-form.html',
                scope: $scope
            });
        }

    });


    //Contact  Controller
    findMyPet.controller("contactController", function($http, $scope, accessService, $filter) {
        $scope.contact = new contactObj();

        /*
         * @name: sendContact
         * @description: This functions allows send a cpntact message to our webmaster
         * @version: 1.0
         * @params:index, announcement
         * @date: 5/05/2016
         * @author: Jorge Nole
         */

        this.sendContact = function() {
            var date = new Date(); //to do the dateEntry when the user click the button buy
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd'); //taking the current date in format  dd/mm/yyy
            $scope.contact.setDateCreated($scope.date);
            $scope.contact = angular.copy($scope.contact);

            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10400,
                jsonData: JSON.stringify($scope.contact)
            });

            // console.log(outPutData);

            promise.then(function(outPutData) {
                if (outPutData[0] == true) {
                    alert("Message sent succesfully!");
                    $scope.contactFormRegist.$setPristine();
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



    findMyPet.directive("fileread", function() {
        return {
            scope: {
                image: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.image = loadEvent.target.result;
                        scope.$apply();
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    });

    //this directive contains the loginForm, that contains the login, register and the recover
    findMyPet.directive("loginForm", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/login-form.html",
            controller: function() {

            },
            controllerAs: 'loginForm'
        };
    });

    //this directive contains the contact form
    findMyPet.directive("contactForm", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/contact-form.html",
            controller: function() {

            },
            controllerAs: 'contactForm'
        };
    });

    findMyPet.directive("announcementManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/announcement-management.html",
            controller: function() {

            },
            controllerAs: 'announcementManagement'
        };
    });


    findMyPet.directive("aboutUs", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/about-us.html",
            controller: function() {

            },
            controllerAs: 'aboutUs'
        };
    });



    /*
     * @name: factory accessService
     * @version: 1.0
     * @params:
     * @date: 5/04/2016
     * @author: Jorge Nole
     */
    findMyPet.factory('accessService', function($http, $log, $q) {
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

//own code jquery

//NAVBAR
$(function() {
    return $(".side-menu .nav .dropdown").on('show.bs.collapse', function() {
        return $(".side-menu .nav .dropdown .collapse").collapse('hide');
    });
});

//BOX
$(function() {
    $('#loginButton').on('click', function(e) {
        Custombox.open({
            target: '#loginForm',
            effect: 'fadein'
        });
        e.preventDefault();
    });
});

$(function() {
    $('#registerButton').on('click', function(e) {
        Custombox.open({
            target: '#loginForm',
            effect: 'fadein'
        });
        e.preventDefault();
    });
});

$(function() {
    $('#contactButton').on('click', function(e) {
        Custombox.open({
            target: '#contactForm',
            effect: 'fadein'
        });
        e.preventDefault();
    });
});


$(function() {
    $('#aboutUsButton').on('click', function(e) {
        Custombox.open({
            target: '#aboutForm',
            effect: 'fadein'
        });
        e.preventDefault();
    });
});
