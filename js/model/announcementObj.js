function announcementObj()
{


  this.idAnnouncement;
  this.title;
  this.description;
  this.dateAdded;
  this.dateModdified;
  this.dateDeleted;
  this.locationMissed;
  this.idUser;
  this.animal;

  this.construct = function (idAnnouncement, title, description, dateAdded, dateModdified, dateDeleted, locationMissed, idUser, animal)
  {
      this.setIdAnnouncement(idAnnouncement);
      this.setTitle(title);
      this.setDescription(description);
      this.setDateAdded(dateAdded);
      this.setDateModdified(dateModdified);
      this.setDateDeleted(dateDeleted);
      this.setLocationMissed(locationMissed);
      this.setIdUser(idUser);
      this.setAnimal(animal);

  }

  this.setIdAnnouncement = function(idAnnouncement) { this.idAnnouncement = idAnnouncement; }
  this.getIdAnnouncement = function() { return this.idAnnouncement; }
  this.setTitle = function(title) { this.title = title; }
  this.getTitle = function() { return this.title; }
  this.setDescription = function(description) { this.description = description; }
  this.getDescription = function() { return this.description; }
  this.setDateAdded = function(dateAdded) { this.dateAdded = dateAdded; }
  this.getDateAdded = function() { return this.dateAdded; }
  this.setDateModdified = function(dateModdified) { this.dateModdified = dateModdified; }
  this.getDateModdified = function() { return this.dateModdified; }
  this.setDateDeleted = function(dateDeleted) { this.dateDeleted = dateDeleted; }
  this.getDateDeleted = function() { return this.dateDeleted; }
  this.setLocationMissed = function(locationMissed) { this.locationMissed = locationMissed; }
  this.getLocationMissed = function() { return this.locationMissed; }
  this.setIdUser = function(idUser) { this.idUser = idUser; }
  this.getIdUser = function() { return this.idUser; }
  this.setAnimal = function(animal) { this.animal = animal; }
  this.getAnimal = function() { return this.animal; }



}
