function userLogginObj(){
    //Attributes declaration
    this.idUserLoggin;
    this.nick;
    this.password;
    this.role;
    this.pin;
    //methods declaration
    this.construct = function (idUserLoggin, nick, password,role,pin){
    this.setIdUserLoggin(idUserLoggin);
    this.setNick(nick);
	  this.setPassword(password);
    this.setRole(role);
    this.setPin(pin);
    }

    //setters
    this.setIdUserLoggin = function (idUserLoggin) {this.idUserLoggin=idUserLoggin;}
    this.setNick = function (nick) {this.nick=nick;}
    this.setPassword = function (password) {this.password=password;}
    this.setRole = function (role) {this.role=role;}
    this.setPin = function (pin) {this.pin=pin;}

    //getters
    this.getIdUserLoggin = function () {return this.idUserLoggin;}
    this.getNick = function () {return this.nick;}
    this.getPassword = function () {return this.password;}
    this.getRole = function () {return this.role;}
    this.getPin = function () {return this.pin;}


    /*
    * @name: toString()
    * @author: Jorge Nole, Luis Salvador
    * @version: 3.1
    * @description: convert object to string
    * @date: 03/05/2016
   */
    this.toString = function (){
	  var userString ="id="+this.getIdUserLoggin()+ " nick="+this.getNick()+" password="+this.getPassword()+ " role="+this.getRole();
      return userString;
    }

    this.validateUserLoggin = function() {
      var errors = []
      try {
          if (this.getNick().length == 0 || this.getNick().length >= 15) {

              errors.push("Nick must be informed correctly");
          }
      } catch (e) {
          errors.push("Nick must be informed correctly");
      }

      try {
          if (this.getPassword().length == 0 || this.getPassword().length >= 15) {

              errors.push("Password must be informed correctly");
          }
      } catch (e) {
          errors.push("Password must be informed correctly");
      }

      return errors;
  }
}
