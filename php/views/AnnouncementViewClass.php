<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "ViewInterface.php";


class AnnouncementViewClass implements ViewInterface {
	private $data;

	function __construct($data) {
		$this->setData($data);
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }
}
?>
