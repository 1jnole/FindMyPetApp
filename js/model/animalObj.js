function animalObj() {

    this.idAnimal;
    this.name;
    this.weight;
    this.height;
    this.description;
    this.animalImage;
    this.dateOfBirth;
    this.dateAdded;
    this.status;
    this.idUser;

    this.construct = function(idAnimal, name, weight, height, description, animalImage, dateOfBirth, dateAdded, status, idUser) {
        this.setIdAnimal(idAnimal);
        this.setName(name);
        this.setWeight(weight);
        this.setHeight(height);
        this.setDescription(description);
        this.setAnimalImage(animalImage);
        this.setDateOfBirth(dateOfBirth);
        this.setDateAdded(dateAdded);
        this.setStatus(status);
        this.setIdUser(idUser);
    }

    this.setIdAnimal = function(idAnimal) {
        this.idAnimal = idAnimal;
    }
    this.getIdAnimal = function() {
        return this.idAnimal;
    }
    this.setName = function(name) {
        this.name = name;
    }
    this.getName = function() {
        return this.name;
    }
    this.setWeight = function(weight) {
        this.weight = weight;
    }
    this.getWeight = function() {
        return this.weight;
    }
    this.setHeight = function(height) {
        this.height = height;
    }
    this.getHeight = function() {
        return this.height;
    }
    this.setDescription = function(description) {
        this.description = description;
    }
    this.getDescription = function() {
        return this.description;
    }
    this.setAnimalImage = function(animalImage) {
        this.animalImage = animalImage;
    }
    this.getAnimalImage = function() {
        return this.animalImage;
    }
    this.setDateOfBirth = function(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    this.getDateOfBirth = function() {
        return this.dateOfBirth;
    }
    this.setDateAdded = function(dateAdded) {
        this.dateAdded = dateAdded;
    }
    this.getDateAdded = function() {
        return this.dateAdded;
    }
    this.setStatus = function(status) {
        this.status = status;
    }
    this.getStatus = function() {
        return this.status;
    }

    this.setIdUser = function(idUser) {
        this.idUser = idUser;
    }
    this.getIdUser = function() {
        return this.idUser;
    }



}
