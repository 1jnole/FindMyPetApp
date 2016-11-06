function contactObj()
{

  this.idContact;
  this.name;
  this.email;
  this.phone;
  this.content;
  this.dateCreated;

  this.construct = function (idContact, name, email, phone, content, dateCreated)
  {
      this.setIdContact(idContact);
      this.setName(name);
      this.setEmail(email);
      this.setPhone(phone);
      this.setContent(content);
      this.setDateCreated(dateCreated);
  }


  this.setIdContact = function(idContact) { this.idContact = idContact; }
  this.getIdContact = function() { return this.idContact; }
  this.setName = function(name) { this.name = name; }
  this.getName = function() { return this.name; }
  this.setEmail = function(email) { this.email = email; }
  this.getEmail = function() { return this.email; }
  this.setPhone = function(phone) { this.phone = phone; }
  this.getPhone = function() { return this.phone; }
  this.setContent = function(content) { this.content = content; }
  this.getContent = function() { return this.content; }
  this.setDateCreated = function(dateCreated) { this.dateCreated = dateCreated; }
  this.getDateCreated = function() { return this.dateCreated; }

}
