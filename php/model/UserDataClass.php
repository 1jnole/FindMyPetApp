<?php
/** userClass.php
 * Entity userClass
 * author  Jorge Nole
 * version 2016/03
 */
 require_once "../EntityInterface.php";
class UserDataClass implements EntityInterface {

    private $idUser;
    private $name;
    private $lastName;
    private $address;
    private $postalCode;
    private $phone;
    private $email;
    private $image;
    private $dateAdded;
    private $idUserLogin;



    function __construct() {
    }
    public function getAll() {
    $data = array();
    $data["idUser"] = $this->idUser;
    $data["name"] = utf8_decode($this->name);
    $data["lastName"] = utf8_decode($this->lastName);
    $data["address"] = $this->address;
    $data["postalCode"] = $this->postalCode;
    $data["phone"] = $this->phone;
    $data["email"] = $this->email;
    $data["image"] = $this->image;
    $data["dateAdded"] = $this->dateAdded;
    $data["idUserLogin"] = $this->idUserLogin;
    return $data;
    }

    public function setAll($idUser,$name,$lastName,$address,$postalCode,$phone,$email,$image,$dateAdded,$idUserLogin) {
		$this->setIdUser($idUser);
    $this->setName($name);
		$this->setLastName($lastName);
		$this->setAddress($address);
    $this->setPostalCode($postalCode);
    $this->setPhone($phone);
    $this->setEmail($email);
    $this->setImage($image);
    $this->setDateAdded($dateAdded);
    $this->setIdUserLogin($idUserLogin);

    }

    public function toString() {
        $toString = "userDataClass[id=" . $this->idUser . "][Name=" . $this->getName(). "][LastName=" . $this->getLastName() . "]";
		return $toString;
    }

    public function getIdUser() {
      return $this->idUser;
  }

  public function getName() {
      return $this->name;
  }

  public function getLastName() {
      return $this->lastName;
  }

  public function getAddress() {
      return $this->address;
  }

  public function getPostalCode() {
      return $this->postalCode;
  }

  public function getPhone() {
      return $this->phone;
  }

  public function getEmail() {
      return $this->email;
  }

  public function getImage() {
      return $this->image;
  }

  public function getDateAdded() {
      return $this->dateAdded;
  }






  public function getIdUserLogin() {
      return $this->idUserLogin;
  }

  public function setIdUser($idUser) {
      $this->idUser = $idUser;
  }

  public function setName($name) {
      $this->name = $name;
  }

  public function setLastName($lastName) {
      $this->lastName = $lastName;
  }

  public function setAddress($address) {
      $this->address = $address;
  }

  public function setPostalCode($postalCode) {
      $this->postalCode = $postalCode;
  }

  public function setPhone($phone) {
      $this->phone = $phone;
  }

  public function setEmail($email) {
      $this->email = $email;
  }

  public function setImage($image) {
      $this->image = $image;
  }

  public function setDateAdded($dateAdded) {
      $this->dateAdded = $dateAdded;
  }



  public function setIdUserLogin($idUserLogin) {
      $this->idUserLogin = $idUserLogin;
  }


}
?>
