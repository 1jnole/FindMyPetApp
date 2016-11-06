function userDataObj(){
    //Attributes declaration
    this.idUser;
    this.name;
    this.lastName;
    this.address;
    this.postalCode;
    this.phone;
    this.email;
    this.image;
    this.dateAdded;
    this.idCity;
    this.idUserLogin;

    //methods declaration
    this.construct = function (idUser, name, lastName, address, postalCode, phone, email, image, dateAdded,idCity,idUserLogin){
        this.setIdUser(idUser);
        this.setName(name);
        this.setLastName(lastName);
        this.setAddress(address);
        this.setPostalCode(postalCode);
        this.setPhone(phone);
        this.setEmail(email);
        this.setImage(image);
        this.setDateAdded(dateAdded);
        this.setIdCity(idCity);
        this.setIdUserLogin(idUserLogin);
    }



    //setters
    this.setIdUser = function (idUser) {this.idUser=idUser;}
    this.setName = function (name) {this.name=name;}
    this.setLastName = function (lastName) {this.lastName=lastName;}
    this.setAddress = function (address) {this.address=address;}
    this.setPostalCode = function (postalCode) {this.postalCode=postalCode};
    this.setPhone = function (phone) {this.phone=phone;}
    this.setEmail = function (email) {this.email=email;}
    this.setImage = function (image) {this.image=image;}
    this.setDateAdded = function (dateAdded) {this.dateAdded=dateAdded;}
    this.setIdCity = function(idCity) { this.idCity = idCity; }
    this.setIdUserLogin = function(idUserLogin) { this.idUserLogin = idUserLogin; }

    //getters
    this.getIdUser = function () {return this.idUser;}
    this.getName = function () {return this.name;}
    this.getLastName = function () {return this.lastName;}
    this.getAddress = function () {return this.address;}
    this.getPostalCode = function () {return this.postalCode;}
    this.getPhone = function () {return this.phone;}
    this.getEmail = function () {return this.email;}
    this.getImage = function () {return this.image;}
    this.getDateAdded = function () {return this.dateAdded;}
    this.getIdCity = function() { return this.idCity; }
    this.getIdUserType = function() { return this.idUserType; }
    this.getIdUserLogin = function() { return this.idUserLogin; }

    /*
    * @name: toString()
    * @author: Jorge Nole & Luis Salvador
    * @version: 3.1
    * @description: convert object to string
    * @date: 04/03/2015
   */
    this.toString = function (){
  	var userString ="id="+this.idUser()+" name="+this.getName()+" surname="+this.getLastName();
  	userString +=" phone="+this.getPhone()+" postalCode"+this.getPostalCode()+" email="+this.getEmail();
  	userString +=" image="+this.getImage()+" idUserLogin="+this.getIdUserLogin()+" idCity"+this.getIdCity()+" idAnimal"+this.getIdAnimal()+" idAnnouncement"+this.getIdAnnouncement();
  	return userString;
    }

    this.validateUserData = function() {
      var errors = []
      try {
          if (this.getName().length == 0 || this.getName().length >= 15) {

              errors.push("Name must be informed correctly");
          }
      } catch (e) {
          errors.push("Name must be informed correctly");
      }

      try {
          if (this.getLastName().length == 0 || this.getLastName().length >= 15) {

              errors.push("Last name must be informed correctly");
          }
      } catch (e) {
          errors.push("Last name  must be informed correctly");
      }


      // try {
      //     if (this.getAddress().length >= 15) {
      //
      //         errors.push("Address must be informed correctly");
      //     }
      // } catch (e) {
      //     errors.push("Address  must be informed correctly");
      // }


      // try {
      //     if (this.getPostalCode().length == 0 || this.getPostalCode().length > 5) {
      //
      //         errors.push("Postal code must be informed correctly");
      //     }
      // } catch (e) {
      //     errors.push("Postal code must be informed correctly");
      // }



      // try {
      //     if (this.getPhone().length > 9) {
      //
      //         errors.push("Phone  must be informed correctly");
      //     }
      // } catch (e) {
      //     errors.push("Phone  must be informed correctly");
      // }


      try {
          if (this.getEmail().length == 0 || this.getEmail().length >= 30) {

              errors.push("Email  must be informed correctly");
          }
      } catch (e) {
          errors.push("Email  must be informed correctly");
      }

      return errors;
  }

}
