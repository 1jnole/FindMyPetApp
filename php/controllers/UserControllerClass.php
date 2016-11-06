<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "ControllerInterface.php";
require_once "../model/persist/DBConnect.php";
require_once "../model/persist/EntityInterfaceADO.php";
require_once "../model/UserDataClass.php";
require_once "../model/UserClass.php";
require_once "../model/ContactClass.php";
require_once "../model/persist/UserLogADO.php";
require_once "../model/persist/UserDataADO.php";
require_once "../model/persist/ContactADO.php";
require_once "../views/UserViewClass.php"; //to make login
require_once "../views/UserDataViewClass.php"; //to make the register



class UserControllerClass implements ControllerInterface {
	private $action;
	private $jsonData;

	function __construct($action, $jsonData) {
		$this->setAction($action);
		$this->setJsonData($jsonData);
    }

    public function getAction() {
        return $this->action;
    }

    public function getJsonData() {
        return $this->jsonData;
    }

    public function setAction($action) {
        $this->action = $action;
    }
    public function setJsonData($jsonData) {
        $this->jsonData = $jsonData;
    }

	public function doAction(){
		switch ($this->getAction()){
			case 10000:
				$userView = new UserViewClass($this->userConnection());
				break;
			case 10100:
				$userView = new UserViewClass($this->sessionControl());
				break;
			case 10200:
				$userView = new UserDataViewClass($this->registerUser());
				break;
			case 10300:
				//Closing session
				session_unset();
				session_destroy();
				$outPutData = array();
				$outPutData[0]=true;
				$userView = new UserViewClass($outPutData);
				break;
			case 10400:
				$userView = new UserViewClass($this->insertContactFormData());
				break;
			case 10500:
				$userView = new UserViewClass($this->recoverPassword());
				break;
			case 10600:
				$userView = new UserViewClass($this->setNewInformation());
				break;
			case 10700:
				$userView = new UserViewClass($this->checkingNick());
				break;
			case 10800:
				$userView = new UserViewClass($this->checkingEmail());
				break;
			case 10900:
				$userView = new UserViewClass($this->getAllTheInformation());
				break;
			case 11000:
				$userView = new UserViewClass($this->updateUserData());
				break;
			case 11100:
		 		$userView = new UserViewClass($this->loadDataOfCurrentUser());
		 		break;
			case 11200:
			 	$userView = new UserViewClass($this->changePasswordProfile());
			 	break;
				case 11300:
					$userView = new UserViewClass($this->searchByWord());
					break;

			default:
				$outPutData = array();
				$errors = array();
				$outPutData[0]=false;
				$errors[]="Sorry, there has been an error. Try later";
				$outPutData[]=$errors;
				$userView = new UserViewClass($outPutData);
				error_log("Action not correct in UserControllerClass, value: ".$this->getAction());
				break;
		}
		return $userView->getData();
	}

	private function userConnection(){
		$userObj = json_decode(stripslashes($this->getJsonData()));
		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;

		$user = new UserClass();
		$userData = new UserDataClass();

		$user->setNick($userObj->nick);
		$user->setPassword(md5($userObj->password));

		$userList = UserLogADO::findByNickAndPass($user); //to find the user by nick and pass


		if (count($userList)==0 ){
			$outPutData[0]=false;
			$errors[]="No user has found with these data";
			$outPutData[1]=$errors;
		}else{
			$usersArray=array();
			foreach ($userList as $user){
			$userData->setIdUserLogin($user->getIdUserLogin());
			$usersArray[]=$user->getAll(); //taking all the values
			}

			$userDataList = UserDataADO::findById($userData); //to find the idUserLogin

			$outPutData[1]=$usersArray; //position 1 to save the data of the table userLoggin
			$userDataArray = array();
			foreach ($userDataList as $userData){
			$userDataArray[]=$userData->getAll();
			}
			$outPutData[2]=$userDataArray;
		}

		if(count($userDataList) == 0){
			$outPutData[0]=false;
			$errors[]="No data found for the user";
		}else{
			$userDataArray = array();
			foreach ($userDataList as $userData){
			$userDataArray[]=$userData->getAll();//taking all the values
			}
			$outPutData[2]=$userDataArray; //possition 2 to save the data user of the table users
		}
		return $outPutData;
}



	private function sessionControl(){
		$outPutData = array();
		$outPutData[]= true;

		if(isset($_SESSION['connectedUser'])){
				$outPutData[]=$_SESSION['connectedUser']->getAll();
		}else{
				$outPutData[0]=false;
				$errors[]="No session opened";
				$outPutData[1]=$errors;
		}

				return 	$outPutData;

}

	private function registerUser () {

		$userObj = json_decode(stripslashes($this->getJsonData()));
		$user = $userObj[0]; //contains credentials (nick password)
		$userData = $userObj[1]; //contains personal data

		$newUser = new UserClass();
		$newUserData  = new UserDataClass();

		$newUser->setAll("", $user->nick,md5($user->password), 1,md5($user->pin)); //default role 1
		// var_dump($newUser);
		$outPutData = array();
		$outPutData[]= true;
		$id = UserLogADO::create($newUser);

		$newUserData->setAll("", $userData->name,$userData->lastName, $userData->address, $userData->postalCode,$userData->phone, $userData->email,$userData->image,$userData->dateAdded,$id);

		$outPutData[]= UserDataADO::create($newUserData);
		//array de 3 posiciones
		return $outPutData;
	}

	 //Contact Form

	private function insertContactFormData(){
		$contactObj = json_decode(stripslashes($this->getJsonData()));
		$newContact = new ContactClass();

		$outPutData = array();

		$newContact->setAll("",$contactObj->name,$contactObj->email,$contactObj->phone,$contactObj->content,$contactObj->dateCreated);
		$returnFromMail = ContactADO::create($newContact);
		// var_dump($returnFromMail);

		if (count($returnFromMail) == 0 ){
			$outPutData[0]=false;
			$errors[1]="Error sending email";
			$outPutData[1]=$errors;
		} else {
			$outPutData[0]= true;
		}
		// var_dump($outPutData);
		return $outPutData;
	}

	private function recoverPassword(){
		$userRecoverObj = json_decode(stripslashes($this->getJsonData()));
		$outPutData= array();
		$errors = array();
		$userWithInformation = array();
		$userRecover = new UserDataClass();
		$userLoginRecover = new UserClass();
		$userRecover->setEmail($userRecoverObj->email);

		$userWithInformation = UserDataADO::findByEmail($userRecover);

		if (count($userWithInformation) == 0 ){
			$outPutData[]=false;
			$errors[]="No user has found with these data";
			$outPutData[]=$errors;

		} else {

			$userLoginRecover->setIdUserLogin($userWithInformation[0]->getIdUserLogin());
			$userLoginInformation = UserLogADO::findById($userLoginRecover);
			$userSendingEmail = UserDataADO::sendingEmail($userWithInformation);
			$outPutData[]= true;
		}

		return $outPutData;
	}

	private function setNewInformation(){
		$userLoginObj = json_decode(stripslashes($this->getJsonData()));
		$newUserLogin = new UserClass();

		$outPutData = array();

		$newUserLogin->setAll("",$userLoginObj->nick,$userLoginObj->password,0,md5($userLoginObj->pin));
		$newUserLoginWithNewPassword = UserLogADO::updatePass($newUserLogin);

		if (count($newUserLoginWithNewPassword) == 0 ){
			$outPutData[0]=false;
			$errors[1]="Error changing your password";
			$outPutData[1]=$errors;
		} else {
			$outPutData[0]= true;
		}

		return $outPutData;
	}

	private function checkingNick(){
		$userNickObj = json_decode(stripslashes($this->getJsonData()));
		$newUserLogin = new UserClass();

		$outPutData = array();
		$errors = array();

		$newUserLogin->setNick($userNickObj->nick);

		$userAlreadyExists = UserLogADO::checkNickAlready($newUserLogin);

		// var_dump($userAlreadyExists);
		if (count($userAlreadyExists) == 1 ){
			$outPutData[0]=false;
			$errors[]="This nick already exists";
			$outPutData[1]=$errors;
		} else {
			$outPutData[0]= true;
		}

		return $outPutData;
	}

	private function checkingEmail(){
		$userEmailObj = json_decode(stripslashes($this->getJsonData()));
		$newUser = new UserDataClass();

		$outPutData = array();
		$errors = array();

		$newUser->setEmail($userEmailObj->email);

		$emailAlreadyExists = UserDataADO::findByEmailRepeated($newUser);

		// var_dump($userAlreadyExists);
		if (count($emailAlreadyExists) == 1 ){
			$outPutData[0]=false;
			$errors[]="This email already exists";
			$outPutData[1]=$errors;
		} else {
			$outPutData[0]= true;
		}

		return $outPutData;
	}

	private function getAllTheInformation(){

		$userDataInformation = new UserClass();
		$userLoginInformation = new UserDataClass();

		$userDataArray = array();
		$userLoginArray = array();

		$outPutData = array();
		$errors = array();

		$allUsersInformations = UserDataADO::findAll();
		$allUsersLoginsInformations = UserLogADO::findAll();

		// var_dump($allUsersInformations);
		// var_dump(count($allUsersLoginsInformations)>1);
		if (count($allUsersInformations) > 1){
			$outPutData[0]=true;
			foreach ($allUsersInformations as $userDataInformation){
				$userDataArray[]=$userDataInformation->getAll(); //taking all the values
			}
			foreach ($allUsersLoginsInformations as $userLoginInformation){
				$userLoginArray[]=$userLoginInformation->getAll(); //taking all the values
			}
			$outPutData[1]=$userDataArray;
			$outPutData[2]=$userLoginArray;
		}
		else {
			$outPutData[0]=false;
			$errors[]="No users in the database found";
			$outPutData[1]=$errors;
		}

		return $outPutData;
	}

	private function updateUserData(){

		$userDataObj = json_decode(stripslashes($this->getJsonData()));
		$userData = new UserDataClass();
		$userData->setAll(
		$userDataObj->idUser,
		$userDataObj->name,
		$userDataObj->lastName,
		$userDataObj->address,
		isset($userDataObj->postalCode) ? $userDataObj->postalCode : "",
		isset($userDataObj->phone) ? $userDataObj->phone : "",
		$userDataObj->email,
		isset($userDataObj->image) ? $userDataObj->image : "",
		$userDataObj->dateAdded,
		$userDataObj->idUserLogin
		);

		$outPutData = array();
		$result= UserDataADO::update($userData);

		if ($result == 1) {
			$outPutData[0] = true;
			$outPutData[1] = $result;
		}else{
				$outPutData[0] = false;
				$aux[] = $result;
				$outPutData[1] = $aux;
		}
		return $outPutData;
	}

	 private function loadDataOfCurrentUser(){
		$userDataObj = json_decode(stripslashes($this->getJsonData()));
 		$userData = new UserDataClass();
 		$userData->setIdUser($userDataObj->idUser);

 		$outPutData = array();
 		$result= UserDataADO::findByIdUser($userData);

 		if (count($result) > 0) {
 			$outPutData[0] = true;
			foreach ($result as $userData){
				$userDataArray[]=$userData->getAll(); //taking all the values
			}
 			$outPutData[1] = $userDataArray;
 		}else{
 				$outPutData[0] = false;
 				$aux[] = $result;
 				$outPutData[1] = $aux;
 		}
 		return $outPutData;
	 }

	 private function changePasswordProfile(){
	 $passwords = json_decode(stripslashes($this->getJsonData()));
	 $oldPassword = $passwords->passwordsThings[0]->oldPassword;
	 $user = new UserClass();
	 $userParameters = UserLogADO::findByPass($oldPassword);
	if (count($userParameters) > 0) {
			foreach ($userParameters as $user) {
				$idUserUpdate = $user->getIdUserLogin();
			}
	} else {
		$outPutData[0] = false;
		$outPutData[1] = "Can't find the user";
		return $outPutData;
	}
	$newPassword = $passwords->passwordsThings[0]->newPassword;
	$user->setAll($idUserUpdate,"",$newPassword,"","");

	$result = UserLogADO::updatePassById($user);
	if ($result == 1) {
		$outPutData[0] = true;
		$outPutData[1] = $result;
	}else{
			$outPutData[0] = false;
			$aux[] = $result;
			$outPutData[1] = $aux;
	}
	return $outPutData;
	}

	private function searchByWord(){
		$value = json_decode(stripslashes($this->getJsonData()));

		var_dump($value);
	}
}
?>
