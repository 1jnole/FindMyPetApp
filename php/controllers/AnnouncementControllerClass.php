<?php
require_once "ControllerInterface.php";
require_once "../model/persist/AnnouncementADO.php";
require_once "../model/AnnouncementClass.php";
require_once "../model/persist/AnimalADO.php";
require_once "../model/AnimalClass.php";
require_once "../model/UserDataClass.php";
require_once "../views/AnnouncementViewClass.php";


class AnnouncementControllerClass implements ControllerInterface  {
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
		$newFileNames = array();
		$outPutData = array();
		switch ($this->getAction()){
			case "10000": $announcementView = new AnnouncementViewClass($this->createAnnouncement());
				break;
			case "10100": $announcementView = new AnnouncementViewClass($this->loadAnnouncementsAnimalData());
				break;
			case "10200": $announcementView = new AnnouncementViewClass($this->loadAnnouncementsByIdUser());
				break;
			case "10300": $announcementView = new AnnouncementViewClass($this->removeAnnouncement());
				break;
			case "10400": $announcementView = new AnnouncementViewClass($this->updateAnnouncement());
			break;
      default:
          $outPutData = array();
          $errors = array();
          $outPutData[0]=false;
          $errors[]="Sorry, there has been an error. Try later";
          $outPutData[]=$errors;
          $announcementView = new AnnouncementViewClass($outPutData);
          error_log("Action not correct in AnnouncementControllerClass, value: ".$this->getAction());
      break;
		}
		return $announcementView->getData();
	}

	  private function createAnnouncement () {
				$announcementObj = json_decode(stripslashes($this->getJsonData()));
				$announcement = new AnnouncementClass();
				$announcement->setAll(
				"",
				$announcementObj->title,
				$announcementObj->description,
				$announcementObj->dateAdded,
				"0000-00-00",
				"0000-00-00",
				$announcementObj->locationMissed,
				$announcementObj->idUser,
			  $announcementObj->animal
				);

				$outPutData = array();
				$outPutData[]= true;
				$outPutData[]= AnnouncementADO::create($announcement);
				return $outPutData;
		}

		private function loadAnnouncementsAnimalData(){
			$announcement = new AnnouncementClass();
			$outPutData = array();
			$outPutData[0] = true;

			$announcementList = AnnouncementADO::findAll();
			if (count($announcementList)==0 ){
				$outPutData[0]=false;
				$errors[]="No announcement has found";
				$outPutData[1]=$errors;
			}else{
				$announcementsArray=array();
				foreach ($announcementList as $announcement){
				$animal = new AnimalClass();
				$animal->setIdAnimal($announcement->getAnimal());
				$animalList = AnimalADO::findById($animal);

				$announcement->setAnimal($animalList[0]->getAll());
				array_push($announcementsArray,$announcement->getAll()); //taking all the announcements and animal Data

				}
				$outPutData[1]=$announcementsArray; //position 1 contains all the announcement data and animalData

			}
			return $outPutData;
		}

		private function loadAnnouncementsByIdUser(){
		$userDataObj = json_decode(stripslashes($this->getJsonData()));
		$announcement = new AnnouncementClass();
		$userData = new UserDataClass();
		$userData->setAll(
				$userDataObj->idUser,
				$userDataObj->name,
				$userDataObj->lastName,
				$userDataObj->address,
				$userDataObj->postalCode,
				$userDataObj->phone,
				$userDataObj->email,
				$userDataObj->image,
				$userDataObj->dateAdded,
				$userDataObj->idUserLogin
		);
			$outPutData = array();
			$outPutData[0] = true;
			$announcementList = AnnouncementADO::findAnnounByIdUser($userData); //query to take the just the announcements that the user owns.
			if (count($announcementList)==0 ){
				$outPutData[0]=false;
				$errors[]="No announcement has found";
				$outPutData[1]=$errors;
			}else{
				$announcementsArray=array();
				foreach ($announcementList as $announcement){
				$animal = new AnimalClass();
				$animal->setIdAnimal($announcement->getAnimal());
				$animalList = AnimalADO::findById($animal);

				$announcement->setAnimal($animalList[0]->getAll());
				array_push($announcementsArray,$announcement->getAll()); //taking all the announcements and animal Data

				}
				$outPutData[1]=$announcementsArray; //position 1 contains all the announcement data and animalData

			}
			return $outPutData;
		}

	private function removeAnnouncement(){
	$announObj = json_decode(stripslashes($this->getJsonData()));
	$announcement = new AnnouncementClass();

	 $announcement -> setAll(
	 $announObj->idAnnouncement,
	 $announObj->title,
	 $announObj->description,
	 $announObj->dateAdded,
	 "0000-00-00",
	 $announObj->dateDeleted,
	 $announObj->locationMissed,
	 $announObj->idUser,
	 $announObj->animal);

	$outPutData = array();
	$outPutData[]= true;
	$outPutData[]= AnnouncementADO::delete($announcement);
	return $outPutData;

	}

	private function updateAnnouncement(){
		$announcementObj = json_decode(stripslashes($this->getJsonData()));

		$announcement = new AnnouncementClass();
		$announcement->setAll(
		$announcementObj->idAnnouncement,
		$announcementObj->title,
		$announcementObj->description,
		$announcementObj->dateAdded,
	  $announcementObj->dateModdified,
		"0000-00-00",
		$announcementObj->locationMissed,
		$announcementObj->idUser,
		$announcementObj->animal
		);

		$outPutData = array();
		$result= AnnouncementADO::update($announcement);

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

}
?>
