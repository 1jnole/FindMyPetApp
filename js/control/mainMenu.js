//Angular code
(function() {
    var mainMenuApp = angular.module("mainMenuApp", ['gm', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngDialog', 'angular-datepicker', 'xeditable', 'pubnub.angular.service']);


    mainMenuApp.controller("sessionController", function($http, $scope, accessService, ngDialog, animals, userDataFact, announDataFact, $filter) {
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

        $scope.supportMessage = function(){
          alert("We are sorry, we are working on it");
        }


        //scope objects array variables
        $scope.animals = [];
        $scope.filteredData = [];
        $scope.announcements = [];
        $scope.filteredDataAnnounAux = [];
        $scope.filteredDataAnnoun = [];
        $scope.filteredDataAllAnimals = [];
        //scope  objects variables
        $scope.user = new userLogginObj();
        $scope.userData = new userDataObj();
        $scope.annoucement = new announcementObj();
        $scope.nameSearch;
        //load form variables
        $scope.userProfileInf = 0;
        $scope.postPublish = 1;
        $scope.animalRegistForm = 0;
        $scope.animalManagementForm = 0;
        $scope.announcementForm = 0;
        $scope.showAnnouncementManagement = 0;
        $scope.showChat = 0;
        //validate
        $scope.nickValid = true;
        $scope.emailValid = true;
        $scope.image;

        //user profile form
        $scope.accountData = 0;
        $scope.showUserData = 1;
        $scope.showInputPass = 0;
        $scope.showInputText = 0;
        $scope.hideLink = 1;
        $scope.hideButton = 0;

        /*
         * @name: sendValues
         * @description: This functions allows send values
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.sendValues = function(data) {
            $scope.userData = data;
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10200,
                jsonData: JSON.stringify($scope.userData)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    alert("done");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        // showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });

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

        /*
         * @name: loadCurrentUser
         * @description: This functions allows show the data of the user logged
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.loadCurrentUser = function() {
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

        /*
         * @name: initObj
         * @description: This functions allows init an  $scope object value
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.initObj = function() {
            $scope.userData = angular.copy($scope.userDataAux);
        }



        /*
         * @name: loadanimals
         * @description: This functions allows load all the animals by User introduced in the dataBase
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole & Luis Salvador
         */

        this.loadAnimals = function() {
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 1,
                action: 10300,
                jsonData: JSON.stringify($scope.userData)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var animal = new animalObj();
                        animal.construct(outPutData[1][i].idAnimal, outPutData[1][i].animalName, outPutData[1][i].weight, outPutData[1][i].height, outPutData[1][i].description, outPutData[1][i].animalImage, outPutData[1][i].dateOfBirth, outPutData[1][i].dateAdded, outPutData[1][i].status, outPutData[1][i].idUser);
                        $scope.animals.push(animal);
                        animals.push(animal);
                    }
                    $scope.filteredData = angular.copy($scope.animals);
                    //animals =  angular.copy($scope.animals);
                    //console.log(animals);

                } else {
                    if (angular.isArray(outPutData[1])) {
                        // showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

        /*
         * @name: logOut
         * @description: This functions allows the user exit
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

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
         * @name: updateUserData
         * @description: This functions allows the user update their personal data
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.updateUserData = function() {
            $scope.userData.setIdUserLogin($scope.user.getIdUserLoggin());
            $scope.userData = angular.copy($scope.userData);
            if (confirm("Are you sure you want do this changes in your personal data?")) {
                var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                    controllerType: 0,
                    action: 11000,
                    jsonData: JSON.stringify($scope.userData) //sending the images url to delete
                });
                promise.then(function(outPutData) {
                    if (outPutData[0] === true) {
                        alert("Your data has been updated succesfully");
                        sessionStorage.setItem('userData', JSON.stringify($scope.userData));
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
         * @description: This functions allows check if the password is valid or not
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.checkPassword = function() {
            if ($scope.newPassword == $scope.confirmPassword) {
                $scope.validPassword = 1;
            } else {
                $scope.validPassword = 0;
            }
        }

        /*
         * @name: sendChangePassword
         * @description: This functions allows send the password values to change the password of the user.
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */


        this.sendChangePassword = function() {
            var passwordChanges = '{ "passwordsThings" : [{ "oldPassword":' + $scope.currentPassword + ', "newPassword": ' + $scope.newPassword + '} ]}';
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 0,
                action: 11200,
                jsonData: JSON.parse(passwordChanges)
            });
            promise.then(function(outPutData) {
                //  console.log(outPutData);
                if (outPutData[0] === true) {
                    alert("Your password has been changed correctly");
                    // window.open("../index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("Can't change your password, try again");
                    }
                }
            });
        }

        /*
         * @name: checkNick
         * @description: This functions allows check if the nick exist or not
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        this.checkNick = function() {
            $scope.user = angular.copy($scope.user);
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
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
    });

    /**************************************************************** ANIMAL  CONTROLLER ***************************************************************/

    mainMenuApp.controller("animalManagementController", function($http, $scope, accessService, $filter, ngDialog, animals, userDataFact) {
        //$scope.animals = animals;
        $scope.userDataAux = userDataFact;
        $scope.animal = new animalObj();
        //Pagination variables
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        /*
         * @name: registerAnimal
         * @description: This functions allows the user delete the animal image in the server and in the database
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.registerAnimal = function() {
            //$scope.animal = angular.copy($scope.animal);
            var path = "images/animalImages/defaultanimal.jpg";
            var date = new Date(); //to do take the current date
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd'); //taking the current date in format  yyyy-MM-dd to save in the database as a dateAdded
            var imageFile = $("#image")[0].files[0];
            var imagesArrayToSend = new FormData();
            imagesArrayToSend.append('images[]', imageFile);
            if (imageFile != undefined) {
                $http({ //the first thing that we do is insert the image in the server
                    method: 'POST',
                    url: '../php/controllers/MainController.php?controllerType=2&action=10100&jsonData=' + $scope.animal.getName(),
                    headers: {
                        'Content-Type': undefined
                    },
                    data: imagesArrayToSend,
                    transformRequest: function(data, headersGetterFunction) {
                        return data;
                    }
                }).success(function(outPutData) { //if the image is uploaded successfully we insert the values in the dataBase with the values that the user filled before in the form
                    if (outPutData[0] === true) {
                        //File uploaded
                        //console.log(outPutData[1][0]);
                        //Buildin the object to send to the server
                        $scope.animal.setDateAdded($scope.date);
                        $scope.animal.setAnimalImage(outPutData[1][0]);
                        $scope.animal.setIdUser($scope.userDataAux[0].idUser);
                        $scope.animal.setStatus(1); //Default status animal lost
                        $scope.animal = angular.copy($scope.animal);

                        var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                            controllerType: 1,
                            action: 10000,
                            jsonData: JSON.stringify($scope.animal)
                        });
                        promise.then(function(outPutData) {
                            if (outPutData[0] === true) {
                                alert("Done");
                                location.reload();
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
            if (imageFile == undefined) {
                //if the image is doesnt't exist we put a default image to show
                $scope.animal.setDateAdded($scope.date);
                $scope.animal.setAnimalImage(path); //default image
                $scope.animal.setIdUser($scope.userDataAux[0].idUser);
                $scope.animal.setStatus(1); //Default status animal lost
                $scope.animal = angular.copy($scope.animal);
                var promise2 = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                    controllerType: 1,
                    action: 10000,
                    jsonData: JSON.stringify($scope.animal)
                });
                promise2.then(function(outPutData) {
                    if (outPutData[0] === true) {
                        alert("Done");
                        location.reload();
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
         * @name: removeAnimal
         * @description: This functions allows the user delete the animal image in the server and in the database
         * @version: 1.0
         * @params: rowToDelete, animal
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        this.removeAnimal = function(rowToDelete, animal) {
            $scope.animal = angular.copy(animal);
            var path = "images/animalImages/defaultanimal.jpg";
            if (confirm("Are you sure you want delete this animal?")) { //If the user confirms the action the system do the next action
                if ($scope.animal.getAnimalImage() != path) { //if the image is not the default image... I delete the image and the values in the data base
                    var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                        controllerType: 2,
                        action: 10200,
                        jsonData: JSON.stringify([$scope.animal.getAnimalImage()]) //sending the images url to delete
                    });
                    promise.then(function(outPutData) {
                        if (outPutData[0] === true) {
                            var promise2 = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                                controllerType: 1,
                                action: 10200,
                                jsonData: JSON.stringify($scope.animal) //sending the images url to delete
                            });
                            promise2.then(function(outPutData) {
                                if (outPutData[0] === true) {
                                    alert("Animal has been deleted succesfully");
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
                } else {
                    var promise3 = accessService.getData("../php/controllers/MainController.php", true, "POST", { //otherwise i only delete the values in the dataBase
                        controllerType: 1,
                        action: 10200,
                        jsonData: JSON.stringify($scope.animal) //sending the images url to delete
                    });
                    promise3.then(function(outPutData) {
                        if (outPutData[0] === true) {
                            alert("Animal has been deleted succesfully");
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
        }

        /*
         * @name: loadAllAnimals
         * @description: This functions allows load all the animals registereds
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.loadAllAnimals = function() {
            //Pagination variables
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.allAnimals = [];
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
                        $scope.allAnimals.push(animal);
                    }
                    $scope.filteredDataAllAnimals = angular.copy($scope.allAnimals);

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
         * @name: modifyAnimalData
         * @description: This functions allows load the modify animal template
         * @version: 1.0
         * @params: $index , animal
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        $scope.modifyAnimalData = function($index, animal) {
            $scope.animalToUpd = new animalObj();
            $scope.animalToUpd = animal;
            $scope.animalToUpd = angular.copy($scope.animalToUpd);
            ngDialog.open({
                template: '../templates/modify-animal.html',
                scope: $scope
            });
        }

        /*
         * @name: UpdateAnimalData
         * @description: This functions allows update the animal data
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        this.UpdateAnimalData = function() {
            //Sending the announcement object to modify
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 1,
                action: 10400,
                jsonData: JSON.stringify($scope.animalToUpd)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    alert("Animal data  has been modified succesfully");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }


        /*
         * @name: validateSelect()
         * @description: This functions allows validate if the user choose a correct option and change the class.
         * @version: 1.0
         * @params: indexChecked
         * @date: 1/06/2016
         * @author: Jorge Nole
         */
        this.validateSelect = function() {
            $scope.validStat = true;
            if ($scope.animalToUpd.getStatus() == 0) {
                $("#statusSelected").removeClass("ng-valid").addClass("ng-invalid");
                $scope.validStat = false;
            } else {
                $("#statusSelected").removeClass("ng-invalid").addClass("ng-valid");
            }

            if ($scope.validStat) {
                $("#statusSelected").removeClass("ng-invalid").addClass("ng-valid");
            }
        }

    });

    /**************************************************************** ANNOUNCEMENENT CONTROLLER *********************************************************/
    mainMenuApp.controller("announcementController", function($http, $scope, accessService, $filter, ngDialog, animals, userDataFact, announDataFact) {
        $scope.userDataAux = userDataFact;
        $scope.animals = animals;
        //scope announcement variables
        $scope.announcement = new announcementObj();
        $scope.showAnnoun = 0;
        /*
         * @name: removeAnnouncement
         * @description: This functions allows the user delete announcements published by the user
         * @version: 1.0
         * @params: $index, $announcement
         * @date: 20/05/2016
         * @author: Jorge Nole & Luis Salvador
         */
        this.removeAnnouncement = function($index, $announcement) {
                $scope.announcement.setDateAdded("0000-00-00");
                $scope.announcement = angular.copy($announcement);
                if (confirm("Are you sure you want delete this announcement?")) { //If the user confirms the action the system do the next action
                    var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                        controllerType: 3,
                        action: 10300,
                        jsonData: JSON.stringify($scope.announcement) //sending the images url to delete
                    });
                    promise.then(function(outPutData) {
                        if (outPutData[0] === true) {
                            alert("Announcement deleted succesfully");
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
             * @name: createAnnouncement
             * @description: This functions allows the user create a new user when he lose a pet.
             * @version: 1.0
             * @params: none
             * @date: 20/05/2016
             * @author: Jorge Nole & Luis Salvador
             */
        this.createAnnouncement = function() {
            var date = new Date(); //Getting the current date
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
            //scope Google maps variables
            $scope.lat = undefined;
            $scope.lng = undefined;
            //scope Google maps  functions
            $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
                var location = $scope.autocomplete.getPlace().geometry.location;
                $scope.lat = location.lat();
                $scope.lng = location.lng();
                $scope.$apply();
            });

            //building the object animal to send to the server
            //building the object announcement to save in the database
            $scope.announcement.setLocationMissed($scope.autocomplete.getPlace().formatted_address);
            $scope.announcement.setDateAdded($scope.date);
            $scope.announcement.setIdUser($scope.userDataAux[0].idUser);
            $scope.announcement.setAnimal($scope.animalAux);
            $scope.announcement = angular.copy($scope.announcement);
            // $scope.animalAux = angular.copy($scope.animalAux); //animal selected by the user
            //Sending to the server the 2 objects builds
            //To get the id of the user we do an ajax call then when we got all the values we do the insert
            //in the database
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 3,
                action: 10000,
                jsonData: JSON.stringify($scope.announcement)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    alert("Announcement created succesfully");
                    location.reload();
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

        /*
         * @name: modifyAnnouncement
         * @description: This functions allows load the modify announ template
         * @version: 1.0
         * @params: $index , announcement
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        $scope.modifyAnnouncement = function($index, announcement) {
            $scope.announToUpd = new announcementObj();
            $scope.announToUpd = announcement;
            $scope.announToUpd = angular.copy($scope.announToUpd);
            ngDialog.open({
                template: '../templates/modify-announ.html',
                scope: $scope
            });
        }

        /*
         * @name: updateAnnouncement
         * @description: This functions allows update the  announcement data that the user choose
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        this.updateAnnouncement = function() {
            var date = new Date(); //Getting the current date
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.announToUpd.setDateModdified($scope.date);
            $scope.announToUpd = angular.copy($scope.announToUpd);

            //Sending the announcement object to modify
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 3,
                action: 10400,
                jsonData: JSON.stringify($scope.announToUpd)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    alert("Announcement modified succesfully");

                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

        /*
         * @name: loadAnnouncements
         * @description: This functions allows load all the animals that the user have.
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */
        this.loadAnnouncements = function() {
            //Pagination variables
            $scope.pageSize = 10;
            $scope.currentPage = 1;

            $scope.userData.setIdUserLogin($scope.user.getIdUserLoggin());
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 3,
                action: 10200,
                jsonData: JSON.stringify($scope.userData)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var animal = new animalObj();
                        var announcement = new announcementObj();
                        animal.construct(outPutData[1][i].animal.idAnimal, outPutData[1][i].animal.animalName, outPutData[1][i].animal.weight, outPutData[1][i].animal.height, outPutData[1][i].animal.description, outPutData[1][i].animal.animalImage, outPutData[1][i].animal.dateOfBirth, outPutData[1][i].animal.dateAdded, outPutData[1][i].animal.idUser);
                        announcement.construct(outPutData[1][i].idAnnouncement, outPutData[1][i].title, outPutData[1][i].description, outPutData[1][i].dateAdded, outPutData[1][i].dateModdified, outPutData[1][i].dateDeleted, outPutData[1][i].locationMissed, outPutData[1][i].idUser, animal);
                        $scope.announcements.push(announcement);

                    }
                    $scope.filteredDataAnnounAux = angular.copy($scope.announcements);
                    announDataFact.push($scope.filteredDataAnnounAux);
                } else {
                    if (angular.isArray(outPutData[1])) {
                        // showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });
        }

        /*
         * @name: loadAllAnnouncements
         * @description: This functions allows load all announcements to show in the main page
         * @version: 1.0
         * @params: none
         * @date: 20/05/2016
         * @author: Jorge Nole, Luis Salvador
         */

        this.loadAllAnnouncements = function() {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.announcements = [];
            var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
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
    });



    /**************************************************************** CHAT CONTROLLER ***************************************************************/
    mainMenuApp.controller("chatController", function($http, $scope, accessService, $filter, ngDialog, animals, userDataFact, announDataFact, Pubnub) {

        $scope.messageDB = new messageObj();
        $scope.messages = [];
        $scope.channel = 'messages-channel';

        $scope.messageContent = '';
        // Generating a random uuid between 1 and 100 using utility function from lodash library.
        // $scope.uuid = _.random(1000000).toString();
        $scope.uuid = $scope.$parent.user.getNick();
        // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
        Pubnub.init({
            publish_key: 'pub-c-f108948d-bef8-403e-98c1-8069d36706cf',
            subscribe_key: 'sub-c-445bf3ba-ff16-11e5-a492-02ee2ddab7fe',
            ssl: true,
            uuid: $scope.uuid
        });

        // Fetching a uniq random avatar from the robohash.org service.
        $scope.avatarUrl = function(uuid) {
            return '//robohash.org/' + uuid + '?set=set2&bgset=bg2&size=70x70';
        };
        // Send the messages over PubNub Network
        $scope.sendMessage = function() {
            // Don't send an empty message

            if (!$scope.messageContent ||
                $scope.messageContent === '') {
                return;
            }
            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    content: $scope.messageContent,
                    sender_uuid: $scope.uuid,
                    date: new Date()
                },
                callback: function(m) {
                  //  console.log(m);
                }
            });
            // Reset the messageContent input
            $scope.messageContent = '';
        }

        // Subscribe to messages channel
        Pubnub.subscribe({
            channel: $scope.channel,
            triggerEvents: ['callback']
        });

        // Make it possible to scrollDown to the bottom of the messages container
        $scope.scrollDown = function(time) {
            var $elem = $('.collection');
            $('body').animate({
                scrollTop: $elem.height()
            }, time);
        };

        // Listenning to messages sent.
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function(ngEvent, m) {
            $scope.$apply(function() {
                $scope.messages.push(m)
            });
            $scope.scrollDown(400);
        });

    });
    /*
     * @name: factory accessService
     * @version: 1.0
     * @params:
     * @date: 5/04/2016
     * @author: Jorge Nole
     */
    mainMenuApp.factory('accessService', function($http, $log, $q) {
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

    /************************** FACTORIES *********************/
    mainMenuApp.factory('animals', function() {
        var animals = [];
        return animals;

    });
    mainMenuApp.factory('userDataFact', function() {
        var userDataFact = [];
        return userDataFact;

    });
    mainMenuApp.factory('announDataFact', function() {
        var announDataFact = [];
        return announDataFact;
    });

    mainMenuApp.factory('userDataModFact', function() {
        var userDataModFact = new userDataObj();
        return userDataModFact;
    });

    /************************** TEMPLATES *********************/
    mainMenuApp.directive("announcementForm", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/announcement-form.html",
            controller: function() {},
            controllerAs: 'announcementForm'
        };
    });
    mainMenuApp.directive("animalsRegist", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animals-regist.html",
            controller: function() {},
            controllerAs: 'animalsRegist'
        };
    });

    mainMenuApp.directive("userProfile", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/user-profile.html",
            controller: function() {

            },
            controllerAs: 'userProfile'
        };
    });

    mainMenuApp.directive("animalManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animal-management.html",
            controller: function() {

            },
            controllerAs: 'animalManagement'
        };
    });

    mainMenuApp.directive("announcementManagementAdmin", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/announcement-management-admin.html",
            controller: function() {

            },
            controllerAs: 'announcementManagementAdmin'
        };
    });

    mainMenuApp.directive("announcementManagementUser", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/announcement-management-user.html",
            controller: function() {

            },
            controllerAs: 'announcementManagementUser'
        };
    });


    mainMenuApp.directive("userChat", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/user-chat.html",
            controller: function() {

            },
            controllerAs: 'userChat'
        };
    });

    /************************** File Read directive *********************/
    mainMenuApp.directive("fileread", function() {
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
})();
