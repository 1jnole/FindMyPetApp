<?php
/** userClass.php
 * Entity userClass
 * author  Jorge Nole
 * version 2016/03
 */
 require_once "../EntityInterface.php";
class UserClass implements EntityInterface {

    private $idUserLogin;
    private $nick;
    private $password;
    private $role;
    private $pin;

    //----------Data base Values---------------------------------------
    private static $tableName = "userlogin";
    private static $colNameIdUserLogin = "idUserLogin";
    private static $colNameNick = "nick";
    private static $colNamePassword = "password";
    private static $colNameRole = "role";
    private static $colNamePin = "pin";

    function __construct() {
    }

    public function getAll() {
    $data = array();
    $data["idUserLogin"] = $this->idUserLogin;
    $data["nick"] = utf8_decode($this->nick);
    $data["password"] = utf8_decode($this->password);
    $data["role"] = $this->role;
    $data["pin"] = $this->pin;
    return $data;
    }

    public function setAll($idUserLogin, $nick, $password,$role,$pin) {
		$this->setIdUserLogin($idUserLogin);
    	$this->setNick($nick);
		$this->setPassword($password);
		$this->setRole($role);
    	$this->setPin($pin);
    }

    public function toString() {
        $toString = "userClass[id=" . $this->idUserLogin . "][nick=" . $this->getNick(). "][password=" . $this->password . "][pin=" . $this->pin . "]";
		return $toString;

    }
    public function getIdUserLogin() {
        return $this->idUserLogin;
    }

    public function getNick() {
        return $this->nick;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getRole() {
        return $this->role;
    }

    public function getPin() {
        return $this->pin;
    }


    public function setIdUserLogin($idUserLogin) {
        $this->idUserLogin = $idUserLogin;
    }


    public function setNick($nick) {
        $this->nick = $nick;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setRole($role) {
        $this->role = $role;
    }

    public function setPin($pin) {
        $this->pin = $pin;
    }




}
?>
