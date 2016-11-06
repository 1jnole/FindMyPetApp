<?php

  require_once "../EntityInterface.php";

class AnnouncementClass implements EntityInterface {

  private $idAnnouncement;
  private $title;
  private $description;
  private $dateAdded;
  private $dateModified;
  private $dateDeleted;
  private $locationMissed;
  private $idUser;
  private $animal;


  public function getAll() {
  $data = array();
  $data["idAnnouncement"] = $this->idAnnouncement;
  $data["title"] = $this->title;
  $data["description"] = $this->description;
  $data["dateAdded"] = $this->dateAdded;
  $data["dateModified"] = $this->dateModified;
  $data["dateDeleted"] = $this->dateDeleted;
  $data["locationMissed"] = $this->locationMissed;
  $data["idUser"] = $this->idUser;
  $data["animal"] = $this->animal;
  return $data;
  }

  public function setAll($idAnnouncement, $title, $description,$dateAdded,$dateModified,$dateDeleted , $locationMissed, $idUser,$animal) {
    $this->setIdAnnouncement($idAnnouncement);
    $this->setTitle($title);
    $this->setDescription($description);
    $this->setDateAdded($dateAdded);
    $this->setDateModified($dateModified);
    $this->setDateDeleted($dateDeleted);
    $this->setLocationMissed($locationMissed);
    $this->setIdUser($idUser);
    $this->setAnimal($animal);
  }

  function __construct() {
  }


  public function getIdAnnouncement() {
      return $this->idAnnouncement;
  }

  public function getTitle() {
      return $this->title;
  }

  public function getDescription() {
      return $this->description;
  }

  public function getDateAdded() {
      return $this->dateAdded;
  }

  public function getDateModified() {
      return $this->dateModified;
  }

  public function getDateDeleted() {
      return $this->dateDeleted;
  }

  public function getLocationMissed() {
      return $this->locationMissed;
  }

  public function getIdUser() {
      return $this->idUser;
  }

  public function getAnimal() {
      return $this->animal;
  }

  public function setIdAnnouncement($idAnnouncement) {
      $this->idAnnouncement = $idAnnouncement;
  }

  public function setTitle($title) {
      $this->title = $title;
  }

  public function setDescription($description) {
      $this->description = $description;
  }

  public function setDateAdded($dateAdded) {
      $this->dateAdded = $dateAdded;
  }

  public function setDateModified($dateModified) {
      $this->dateModified = $dateModified;
  }

  public function setDateDeleted($dateDeleted) {
      $this->dateDeleted = $dateDeleted;
  }

  public function setLocationMissed($locationMissed) {
      $this->locationMissed = $locationMissed;
  }

  public function setIdUser($idUser) {
      $this->idUser = $idUser;
  }

  public function setAnimal($animal) {
      $this->animal = $animal;
  }





}

 ?>
