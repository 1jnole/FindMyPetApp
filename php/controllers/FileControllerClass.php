<?php
require_once "ControllerInterface.php";
require_once "../views/FileViewClass.php";

class FileControllerClass implements ControllerInterface  {
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
			case "10100":
				$outPutData[]=true;
				foreach($_FILES['images']['error'] as $key => $error){
					if($error == UPLOAD_ERR_OK){
						$name = $_FILES['images']['name'][$key];
						$fileNameParts = explode(".", $name);
						$nameWithoutExtension = $fileNameParts[0];
						$extension = end($fileNameParts);
						$newFileName = $this->getJsonData().".".$extension;
						move_uploaded_file($_FILES['images']['tmp_name'][$key], '../../html/images/animalImages/' . $newFileName);
						$newFileNames[]='images/animalImages/'.$newFileName;
					}else{
						$outPutData[0]=false;
					}
				}
				$outPutData[]=$newFileNames;
				$fileView = new FileViewClass($outPutData);
				break;
			case "10200":
				//This option is to remove files from the server
				//$_REQUEST["JSONData"] contains all the file's names to remove
				$filesToDeleteArray = json_decode(stripslashes($this->getJsonData()));

				foreach($filesToDeleteArray as $filename){
					if(file_exists('../../html/'.$filename)) unlink('../../html/'.$filename);
				}
				$outPutData[]=true;

				$fileView = new FileViewClass($outPutData);
				break;
			  default:
				echo "Action not correct: ".$_REQUEST["action"];
				break;
		}

		return $fileView->getData();
	}
}
?>
