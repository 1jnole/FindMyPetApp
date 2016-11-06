<?php
/** ContactClass.php
 * Entity ContactClass
 * author  Jorge Nole
 * version 2016/03
 */
 require_once "../EntityInterface.php";
class ContactClass implements EntityInterface {

    private $idContact;
    private $name;
    private $email;
    private $phone;
    private $content;
    private $dateCreated;

    //----------Data base Values---------------------------------------
    private static $tableName = "contact";
    private static $colNameIdContact = "idContact";
    private static $colNameName = "name";
    private static $colNameEmail = "email";
    private static $colNamePhone = "phone";
    private static $colNameContent = "content";
    private static $colNameDateCreated = "dateCreated";

    function __construct() {
    }

    public function getAll() {
      $data = array();
      $data["idContact"] = $this->idContact;
      $data["name"] = $this->name;
      $data["email"] = $this->email;
      $data["phone"] = $this->phone;
      $data["content"] = $this->content;
      $data["dateCreated"] = $this->dateCreated;
      return $data;
    }

    public function setAll($idContact, $name, $email, $phone, $content, $dateCreated) {
  		$this->setIdContact($idContact);
      $this->setName($name);
  		$this->setEmail($email);
  		$this->setPhone($phone);
      $this->setContent($content);
      $this->setDateCreated($dateCreated);
    }

    public function toString() {
        $toString = "ContactClass [idContact=" . $this->idContact . "][name=" . $this->name . "][phone=" . $this->phone . "][content=" . $this->content . "][dateCreated=" . $this->dateCreated . "]";
		return $toString;

    }
    public function getIdContact() {
        return $this->idContact;
    }

    public function getName() {
        return $this->name;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPhone() {
        return $this->phone;
    }

    public function getContent() {
        return $this->content;
    }

    public function getDateCreated() {
        return $this->dateCreated;
    }

    public function setIdContact($idContact) {
        $this->idContact = $idContact;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setPhone($phone) {
        $this->phone = $phone;
    }

    public function setContent($content) {
        $this->content = $content;
    }

    public function setDateCreated($dateCreated) {
        $this->dateCreated = $dateCreated;
    }

}
?>
