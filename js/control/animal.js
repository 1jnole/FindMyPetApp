//JQuery code

//Angular code
(function() {
    //Application module
    var animalApp = angular.module('animalApp', ['angularUtils.directives.dirPagination', 'ngMessages', 'angular-datepicker']);

    animalApp.controller("sessionController", function($http, $scope, accessService, $filter) {

        $scope.user = new userLogginObj();
        $scope.userData = new userDataObj();

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
    });

    animalApp.controller("announcementManagementController", function($http, $scope, accessService, $filter) {
        //scope objects
        $scope.animal = new animalObj();
        $scope.announcement = new announcementObj();
        $scope.announcements = [];

        //Pagination variables
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        this.loadAllAnnouncements = function() {
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
                    console.log($scope.filteredDataAnnoun);
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

    animalApp.directive("animalManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animal-management.html",
            controller: function() {},
            controllerAs: 'animalManagement'
        };
    });

    animalApp.directive("userProfile", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/user-profile.html",
            controller: function() {

            },
            controllerAs: 'userProfile'
        };
    });

    animalApp.directive("animalsRegist", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/animals-regist.html",
            controller: function() {

            },
            controllerAs: 'animalsRegist'
        };
    });

    animalApp.directive("announcementManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/announcement-management.html",
            controller: function() {

            },
            controllerAs: 'announcementManagement'
        };
    });




    animalApp.directive("loginForm", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/login-form.html",
            controller: function() {},
            controllerAs: 'loginForm'
        };
    });

    animalApp.directive("listUsers", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/list-users.html",
            controller: function() {

            },
            controllerAs: 'listUsers'
        };
    });

    animalApp.factory('accessService', function($http, $log, $q) {
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
//own code
