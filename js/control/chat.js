//Angular code
(function() {
      var chatApp = angular.module("chatApp", ['pubnub.angular.service']);

      chatApp.controller("sessionController",  function($http, $scope, accessService, Pubnub) {
        $scope.user = new userLogginObj();
        $scope.userData = new userDataObj();
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
                    console.log(objAux);
                    var objAux2 = JSON.parse(sessionStorage.getItem('userData'));
                    $scope.userData.construct(objAux2.idUser, objAux2.name, objAux2.lastName, objAux2.address, objAux2.postalCode, objAux2.phone, objAux2.email, objAux2.image, objAux2.dateAdded);
                    console.log(objAux2);
                    $scope.passControl = $scope.user.getPassword();
                    $scope.sessionOpened = true;
                }
                if (isNaN($scope.user.getIdUserLoggin())) {
                    window.open("../index.html", "_self");
                }

            }
        }







  });
  chatApp.controller("chatController", function($http, $scope, accessService, Pubnub) {

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
       console.log($scope.messageContent);
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
                console.log(m);

            }

            //$scope.messageDB.setMessage($scope.messageContent);

            //console.log( $scope.messageDB );

            /*var promise = accessService.getData("../php/controllers/MainController.php", true, "POST", {
                controllerType: 1,
                action: 10300,
                jsonData: JSON.stringify($scope.userData)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var animal = new animalObj();
                        animal.construct(outPutData[1][i].idAnimal, outPutData[1][i].animalName, outPutData[1][i].weight, outPutData[1][i].height, outPutData[1][i].description, outPutData[1][i].animalImage, outPutData[1][i].dateOfBirth, outPutData[1][i].dateAdded, outPutData[1][i].idUser);
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
            });*/
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
  chatApp.factory('accessService', function($http, $log, $q) {
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
