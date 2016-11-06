<?php
/**@name: AnnouncementADO.php
 * @description:
 * @author: Jorge Nole & Luis Salvador
 * @version 2015/2016
 */
require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/AnnouncementClass.php";
require_once "../model/ErrorsClass.php";

class AnnouncementADO implements EntityInterfaceADO {

    //----------Data base Values---------------------------------------
    private static $tableName = "announcement";
    private static $colNameIdAnnouncement = "idAnnouncement";
    private static $colNameTitle = "title";
    private static $colNameDescription = "description";
    private static $colNameDateAdded = "dateAdded";
    private static $colNameDateModified = "dateModified";
    private static $colNamedateDeleted = "dateDeleted";
    private static $colNameLocationMissed = "locationMissed";
    private static $colNameIdUser = "idUser";
    private static $colNameIdAnimal = "idAnimal";

    //---Databese management section-----------------------

	/**
	 * fromResultSetList()
	 * this function runs a query and returns an array with all the result transformed into an object
	 * @param res query to execute
	 * @return objects collection
    */
    public static function fromResultSetList( $res ) {
		$entityList = array();
		$i=0;
		foreach ( $res as $row){
			$entity = AnnouncementADO::fromResultSet( $row );
			$entityList[$i]= $entity;
			$i++;
		}
		return $entityList;
    }

    /**
	* fromResultSet()
	* the query result is transformed into an object
	* @param res ResultSet del qual obtenir dades
	* @return object
    */
    public static function fromResultSet( $res ) {
	     //We get all the values form the query
		 $idAnnouncement = $res[ AnnouncementADO::$colNameIdAnnouncement];
        $title = $res[ AnnouncementADO::$colNameTitle ];
        $description = $res[ AnnouncementADO::$colNameDescription ];
        $dateAdded = $res[ AnnouncementADO::$colNameDateAdded ];
        $dateModified = $res[ AnnouncementADO::$colNameDateModified ];
        $dateDeleted = $res[ AnnouncementADO::$colNamedateDeleted ];
        $locationMissed = $res[ AnnouncementADO::$colNameLocationMissed ];
        $idUser = $res[ AnnouncementADO::$colNameIdUser ];
        $idAnimal = $res[ AnnouncementADO::$colNameIdAnimal ];

      	//Object construction
        $entity = new AnnouncementClass();
        $entity->setIdAnnouncement($idAnnouncement);
        $entity->setTitle($title);
        $entity->setDescription($description);
        $entity->setDateAdded($dateAdded);
        $entity->setDateModified($dateModified);
        $entity->setDateDeleted($dateDeleted);
        $entity->setLocationMissed($locationMissed);
        $entity->setIdUser($idUser);
        $entity->setAnimal($idAnimal);
        return $entity;
    }


    /**
	 * findByQuery()
	 * It runs a particular query and returns the result
	 * @param cons query to run
	 * @return objects collection
    */
    public static function findByQuery( $cons, $vector ) {
		//Connection with the database
		try {
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			echo "Error executing query.";
			error_log("Error executing query in AnnouncementADO: " . $e->getMessage() . " ");
			die();
		}

		$res = $conn->execution($cons, $vector);

		return AnnouncementADO::fromResultSetList( $res );
    }

    /**
	 * findById()
	 * It runs a query and returns an object array
	 * @param id
	 * @return object with the query results
    */
    public static function findById( $user ) {
		$cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameId." = ?";
		$arrayValues = [$user->getId()];

		return AnnouncementADO::findByQuery($cons,$arrayValues);
    }

	public static function findAnnounByIdUser($userData){
   	 $cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameIdUser." = ?";
      $arrayValues = [$userData->getIdUser()];
      return AnnouncementADO::findByQuery( $cons, $arrayValues );

	}
    /**
	 * findlikeName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findlikeName( $user ) {
		$cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameName." like ?";
		$arrayValues = ["%".$user->getName()."%"];

		return AnnouncementADO::findByQuery($cons,$arrayValues);
    }



    /**
	* findByName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByName( $user ) {
		$cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameNick." = ?";
		$arrayValues = [$user->getRole()];

		return AnnouncementADO::findByQuery($cons,$arrayValues);
    }

    /**
	* findByNickAndPass()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByNickAndPass( $user ) {
		//$cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameNick." = \"".$user->getNick()."\" and ".AnnouncementADO::$colNamePassword." = \"".$user->getPassword()."\"";
		$cons = "select * from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameNick." = ? and ".AnnouncementADO::$colNamePassword." = ?";
		$arrayValues = [$user->getNick(),$user->getPassword()];

		return AnnouncementADO::findByQuery( $cons, $arrayValues );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll() {
    $cons = "select * from `".AnnouncementADO::$tableName."`";
		$arrayValues = [];
		return AnnouncementADO::findByQuery( $cons, $arrayValues );
    }

	 public static function  findLastAnnInserted(){
	   $cons = "select * from ( SELECT * FROM `".AnnouncementADO::$tableName."` ORDER BY idAnnouncement DESC LIMIT 4 sub 		ORDER BY idAnnouncement ASC";
		$arrayValues = [];

		return AnnouncementADO::findByQuery( $cons, $arrayValues );


	 }

    /**
	 * INSERT()
	 * insert a new row into the database
    */
    public function create($announcement) {

  		try{
  			$conn = DBConnect::getInstance();
  		}
  		catch (PDOException $e) {
  			print "Error connecting database announcement: " . $e->getMessage() . " ";
  			die();
  		}
  		$cons="insert into ".AnnouncementADO::$tableName." (`title`,`description`,`dateAdded`, `locationMissed`,`idUser`,`idAnimal`) values (?,?,?,?,?,?)";

		$arrayValues= [$announcement->getTitle(),$announcement->getDescription(),$announcement->getDateAdded(),$announcement->getLocationMissed(),$announcement->getIdUser(), $announcement->getAnimal()->idAnimal];
		  $conn->execution($cons, $arrayValues);
	  }




    /**
	 * delete()
	 * it deletes a row from the database
    */
    public function delete($announcement) {
		//Connection with the database

		try {
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			print "Error connecting database: " . $e->getMessage() . " ";
			die();
		}

		$cons="delete from `".AnnouncementADO::$tableName."` where ".AnnouncementADO::$colNameIdAnnouncement." = ?";
		$arrayValues= [$announcement->getIdAnnouncement()];

		$conn->execution($cons, $arrayValues);
    }




    /**
	 * update()
	 * it updates a row of the database
    */
	 public function update($announcement) {
		//Connection with the database

    $errors = "";
    if ($errors == "") {
      try {
        $conn = DBConnect::getInstance();
      }
      catch (PDOException $e) {
        print "Error connecting database: " . $e->getMessage() . " ";
        die();
      }
      $cons="update `".AnnouncementADO::$tableName."` set ".AnnouncementADO::$colNameTitle." = ?, ".AnnouncementADO::$colNameDescription." = ?, ".AnnouncementADO::$colNameDateAdded." = ?, ".AnnouncementADO::$colNameDateModified." = ?, ".AnnouncementADO::$colNameLocationMissed." = ?, ".AnnouncementADO::$colNameIdUser." = ?, ".AnnouncementADO::$colNameIdAnimal." = ?  where ".AnnouncementADO::$colNameIdAnnouncement." = ?" ;
      $arrayValues= [$announcement->getTitle(),$announcement->getDescription(),$announcement->getDateAdded(), $announcement->getDateModified(), $announcement->getLocationMissed(), $announcement->getIdUser(),$announcement->getAnimal()->idAnimal,$announcement->getIdAnnouncement()];
      $conn->execution($cons, $arrayValues);

  

      return 1;
    }else{
      return $errors;
    }


    }
}
?>
