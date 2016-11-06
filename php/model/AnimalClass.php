<?php


require_once "../EntityInterface.php";

class AnimalClass implements EntityInterface {

  private $idAnimal;
  private $animalName;
  private $weight;
  private $height;
  private $description;
  private $animalImage;
  private $dateOfBirth;
  private $dateAdded;
  private $status;
  private $idUser;



  function __construct() {
  }

  public function getIdAnimal() {
      return $this->idAnimal;
  }

  public function getAnimalName() {
      return $this->animalName;
  }

  public function getWeight() {
      return $this->weight;
  }

  public function getHeight() {
      return $this->height;
  }

  public function getDescription() {
      return $this->description;
  }

  public function getAnimalImage() {
      return $this->animalImage;
  }

  public function getDateOfBirth() {
      return $this->dateOfBirth;
  }

  public function getDateAdded() {
      return $this->dateAdded;
  }

  public function getStatus() {
      return $this->status;
  }


  public function getIdUser() {
      return $this->idUser;
  }

  public function setIdAnimal($idAnimal) {
      $this->idAnimal = $idAnimal;
  }

  public function setAnimalName($animalName) {
      $this->animalName = $animalName;
  }

  public function setWeight($weight) {
      $this->weight = $weight;
  }

  public function setHeight($height) {
      $this->height = $height;
  }

  public function setDescription($description) {
      $this->description = $description;
  }

  public function setAnimalImage($animalImage) {
      $this->animalImage = $animalImage;
  }

  public function setDateOfBirth($dateOfBirth) {
      $this->dateOfBirth = $dateOfBirth;
  }

  public function setDateAdded($dateAdded) {
      $this->dateAdded = $dateAdded;
  }

  public function setStatus($status) {
      $this->status = $status;
  }

  public function setIdUser($idUser) {
      $this->idUser = $idUser;
  }

  public function getAll() {
    $data = array();
    $data["idAnimal"] = $this->idAnimal;
    $data["animalName"] = $this->animalName;
    $data["weight"] = $this->weight;
    $data["height"] = $this->height;
    $data["description"] = $this->description;
    $data["animalImage"] = $this->animalImage;
    $data["dateOfBirth"] = $this->dateOfBirth;
    $data["dateAdded"] = $this->dateAdded;
    $data["status"] = $this->status;
    $data["idUser"] = $this->idUser;

    return $data;

  }

  public function setAll($idAnimal, $animalName, $weight, $height, $description, $animalImage, $dateOfBirth, $dateAdded,$status, $idUser) {
    $this->setIdAnimal($idAnimal);
    $this->setAnimalName($animalName);
    $this->setWeight($weight);
    $this->setHeight($height);
    $this->setDescription($description);
    $this->setAnimalImage($animalImage);
    $this->setDateOfBirth($dateOfBirth);
    $this->setDateAdded($dateAdded);
    $this->setStatus($status);
    $this->setIdUser($idUser);
  }

}


?>
