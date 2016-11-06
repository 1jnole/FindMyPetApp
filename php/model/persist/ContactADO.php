<?php
/** userClass.php
 * Entity userClass
 * autor  Roberto Plana
 * version 2012/09
 */
require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "MailADO.php";
require_once "../model/ContactClass.php";
require_once "../model/ErrorsClass.php";
require_once "../frameworks/PHPMailer-master/PHPMailerAutoload.php";

class ContactADO implements EntityInterfaceADO {

    //----------Data base Values---------------------------------------
    private static $tableName = "contact";
    private static $colNameIdContact = "idContact";
    private static $colNameName = "name";
    private static $colNameEmail = "email";
    private static $colNamePhone = "phone";
    private static $colNameContent = "content";
    private static $colNameDateCreated = "dateCreated";

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
			$entity = ContactADO::fromResultSet( $row );
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
		$idContact = $res[ ContactADO::$colNameIdContact];
        $name = $res[ ContactADO::$colNameName ];
        $email = $res[ ContactADO::$colNameEmail ];
        $phone = $res[ ContactADO::$colNamePhone ];
        $content = $res[ ContactADO::$colNameContent ];
        $dateCreated = $res[ ContactADO::$colNameDateCreated ];

      	//Object construction
        $entity = new ContactClass();
        $entity->setIdContact($idContact);
        $entity->setName($name);
    		$entity->setEmail($email);
    		$entity->setPhone($phone);
        $entity->setContent($content);
        $entity->setDateCreated($dateCreated);
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
			error_log("Error executing query in ContactADO: " . $e->getMessage() . " ");
			die();
		}

		$res = $conn->execution($cons, $vector);

		return ContactADO::fromResultSetList( $res );
    }

    /**
	 * findById()
	 * It runs a query and returns an object array
	 * @param id
	 * @return object with the query results
    */
    public static function findById( $user ) {
		$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameId." = ?";
		$arrayValues = [$user->getId()];

		return UserLogADO::findByQuery($cons,$arrayValues);
    }

    /**
	 * findlikeName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findlikeName( $user ) {
		$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameName." like ?";
		$arrayValues = ["%".$user->getName()."%"];

		return UserLogADO::findByQuery($cons,$arrayValues);
    }



    /**
	* findByName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByName( $user ) {
		$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = ?";
		$arrayValues = [$user->getRole()];

		return UserLogADO::findByQuery($cons,$arrayValues);
    }

    /**
	* findByNickAndPass()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByNickAndPass( $user ) {
		//$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = \"".$user->getNick()."\" and ".UserLogADO::$colNamePassword." = \"".$user->getPassword()."\"";
		$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = ? and ".UserLogADO::$colNamePassword." = ?";
		$arrayValues = [$user->getNick(),$user->getPassword()];

		return UserLogADO::findByQuery( $cons, $arrayValues );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll( ) {
    $cons = "select * from `".UserLogADO::$tableName."`";
		$arrayValues = [];

		return UserLogADO::findByQuery( $cons, $arrayValues );
    }


    /**
	 * INSERT()
	 * insert a new row into the database
    */
    public function create($newContact) {
  		try{
  			$conn = DBConnect::getInstance();
  		}
  		catch (PDOException $e) {
  			print "Error connecting database contact: " . $e->getMessage() . " ";
  			die();
  		}
  		$cons="insert into ".ContactADO::$tableName." (`name`,`email`,`phone`, `content`,`dateCreated`) values (?,?,?,?,?)";
  		$arrayValues= [$newContact->getName(),$newContact->getEmail(),$newContact->getPhone(),$newContact->getContent(),$newContact->getDateCreated()];

      //var_dump($arrayValues);
  		$idContact = $conn->executionInsert($cons, $arrayValues);

  		$newContact->setIdContact($idContact);

      $senEmail = MailADO::sendingEmail($newContact);

  	  return $newContact->getIdContact();
	  }




    /**
	 * delete()
	 * it deletes a row from the database
    */
    public function delete($user) {
		//Connection with the database
		try {
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			print "Error connecting database: " . $e->getMessage() . " ";
			die();
		}

		$cons="delete from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameId." = ?";
		$arrayValues= [$user->getId()];

		$conn->execution($cons, $arrayValues);
    }


    /**
	 * update()
	 * it updates a row of the database
    */
	 public function update($user) {
		//Connection with the database
		try {
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			print "Error connecting database: " . $e->getMessage() . " ";
			die();
		}

		$cons="update `".UserLogADO::$tableName."` set ".UserLogADO::$colNameName." = ?, ".UserLogADO::$colNameSurname1." = ?, ".UserLogADO::$colNameNick." = ?, ".UserLogADO::$colNamePassword." = ?, ".UserLogADO::$colNameAddress." = ?, ".UserLogADO::$colNameTelephone." = ?, ".UserLogADO::$colNameMail." = ?, ".UserLogADO::$colNameBirthDate." = ?, ".UserLogADO::$colNameEntryDate." = ?, ".UserLogADO::$colNameDropOutDate." = ?, ".UserLogADO::$colNameActive." = ?, ".UserLogADO::$colNameImage." = ? where ".UserLogADO::$colNameId." = ?" ;
		$arrayValues= [$user->getName(),$user->getLastname(), $user->getNick(), $user->getPassword(), $user->getAddress(), $user->getTelephone(), $user->getMail(), $user->getBirthDate(), $user->getEntryDate(), $user->getDropOutDate(), $user->getActive(), $user->getImage()];

		$conn->execution($cons, $arrayValues);

    }
}
?>
