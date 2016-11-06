function messageObj() {

  this.idMessage;
  this.message;
  this.dateCreated;
  this.idUserSend;
  this.idUserRecieved;

  this.construct = function (idMessage, message, dateCreated, idUserSend, idUserRecieved)
  {

      this.setIdMessage(idMessage);
      this.setMessage(message);
      this.setDateCreated(dateCreated);
      this.setIdUserSend(idUserSend);
      this.setIdUserRecieved(idUserRecieved);

  }

  this.setIdMessage = function(idMessage) { this.idMessage = idMessage; }
  this.getIdMessage = function() { return this.idMessage; }
  this.setMessage = function(message) { this.message = message; }
  this.getMessage = function() { return this.message; }
  this.setDateCreated = function(dateCreated) { this.dateCreated = dateCreated; }
  this.getDateCreated = function() { return this.dateCreated; }
  this.setIdUserSend = function(idUserSend) { this.idUserSend = idUserSend; }
  this.getIdUserSend = function() { return this.idUserSend; }
  this.setIdUserRecieved = function(idUserRecieved) { this.idUserRecieved = idUserRecieved; }
  this.getIdUserRecieved = function() { return this.idUserRecieved; }



}
