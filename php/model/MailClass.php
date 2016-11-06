<?php
/** ContactClass.php
 * Entity ContactClass
 * author  Jorge Nole
 * version 2016/03
 */
 require_once "../EntityInterface.php";
class MailClass implements EntityInterface {

    private $fromEmail;
    private $adressEmail;
    private $subject;
    private $content;


    function __construct() {
    }

    public function getAll() {
      $data = array();
      $data["fromEmail"] = $this->fromEmail;
      $data["adressEmail"] = $this->adressEmail;
      $data["subject"] = $this->subject;
      $data["content"] = $this->content;
      return $data;
    }

    public function setAll($fromEmail, $adressEmail, $subject, $content) {
  		$this->setFromEmail($fromEmail);
      $this->setAdressEmail($adressEmail);
  		$this->setSubject($subject);
      $this->setContent($content);
    }

    public function getFromEmail() {
        return $this->fromEmail;
    }

    public function getAdressEmail() {
        return $this->adressEmail;
    }

    public function getSubject() {
        return $this->subject;
    }

    public function getContent() {
        return $this->content;
    }

    public function setFromEmail($fromEmail) {
        $this->fromEmail = $fromEmail;
    }

    public function setAdressEmail($adressEmail) {
        $this->adressEmail = $adressEmail;
    }

    public function setSubject($subject) {
        $this->subject = $subject;
    }

    public function setContent($content) {
        $this->content = $content;
    }




}

?>
