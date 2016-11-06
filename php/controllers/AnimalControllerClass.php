<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "ControllerInterface.php";
require_once "../model/persist/DBConnect.php";
require_once "../model/persist/EntityInterfaceADO.php";
require_once "../model/AnimalClass.php";
require_once "../model/UserDataClass.php";
require_once "../model/persist/AnimalADO.php";
require_once "../views/AnimalViewClass.php"; //to make login


class AnimalControllerClass implements ControllerInterface {
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
				$animalView = new AnimalViewClass($this->registerAnimal());
				break;
			case 10100:
	 			$animalView = new AnimalViewClass($this->loadAnimalData());
	 		break;
			case 10200:
				$animalView = new AnimalViewClass($this->removeAnimal());
			break;
			case 10300:
				$animalView = new AnimalViewClass($this->loadAnimalDataByIdUser());
			break;
			case 10400:
				$animalView = new AnimalViewClass($this->modifyAnimalData());
			break;

			default:
				$outPutData = array();
				$errors = array();
				$outPutData[0]=false;
				$errors[]="Sorry, there has been an error. Try later";
				$outPutData[]=$errors;
				$animalView = new AnimalViewClass($outPutData);
				error_log("Action not correct in AnimalControllerClass, value: ".$this->getAction());
				break;
		}
		return $animalView->getData();
	}

	private function registerAnimal () {

	$animalObj = json_decode(stripslashes($this->getJsonData()));
	$animal = new AnimalClass();

	//Default animal status = 1 equals lost

	$animal->setAll("", $animalObj->name,$animalObj->weight,$animalObj->height,$animalObj->description,$animalObj->animalImage,$animalObj->dateOfBirth, $animalObj->dateAdded,$animalObj->status, $animalObj->idUser);
	$outPutData = array();

	$result= AnimalADO::create($animal);
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

	private function loadAnimalData () {

	$animal = new AnimalClass();
	$outPutData = array();
	$outPutData[0] = true;
	$animalList = AnimalADO::findAll();

	if (count($animalList)==0 ){
		$outPutData[0]=false;
		$errors[]="No animals has found";
		$outPutData[1]=$errors;
	}else{
		$animalsArray=array();
		foreach ($animalList as $animal){
		$animalsArray[]=$animal->getAll(); //taking all the values
		}
		$outPutData[1]=$animalsArray; //position 1 to save the data of the table userLoggin
	}
	return $outPutData;
	}

	private function loadAnimalDataByIdUser(){
			$userObj = json_decode(stripslashes($this->getJsonData())); //Getting the user object with the id
			$user = new UserDataClass();
			$animal = new AnimalClass();

			$user->setIdUser($userObj->idUser);
			$outPutData = array();
			$outPutData[0] = true;
			$animalList = AnimalADO::findAnimalsByIdUser($user);

			if (count($animalList)==0 ){
				$outPutData[0]=false;
				$errors[]="No animals has found";
				$outPutData[1]=$errors;
			}else{
				$animalsArray=array();
				foreach ($animalList as $animal){
				$animalsArray[]=$animal->getAll(); //taking all the values
				}
				$outPutData[1]=$animalsArray; //position 1 to save the data of the table userLoggin
			}

			return $outPutData;
	}

	private function modifyAnimalData () {
		$animalObj = json_decode(stripslashes($this->getJsonData()));
    $animal = new AnimalClass();

		$animal->setAll(
		$animalObj->idAnimal,
		 $animalObj->name,
		 $animalObj->weight,
		 $animalObj->height,
		 $animalObj->description,
		 $animalObj->animalImage,
		 $animalObj->dateOfBirth,
		 $animalObj->dateAdded,
		 $animalObj->status,
		 $animalObj->idUser);

		$outPutData = array();
		$result = AnimalADO::update($animal);

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

	private function removeAnimal () {
	$animalObj = json_decode(stripslashes($this->getJsonData()));
	$animal = new AnimalClass();
	$animal->setAll($animalObj->idAnimal, $animalObj->name,$animalObj->weight,$animalObj->height,$animalObj->description,$animalObj->animalImage,$animalObj->dateOfBirth, $animalObj->dateAdded, $animalObj->idUser);
	$outPutData = array();
	$outPutData[]= true;
	$outPutData[]= AnimalADO::delete($animal);
	return $outPutData;
	}


}
?>
