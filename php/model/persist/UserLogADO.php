<?php
/** userClass.php
 * Entity userClass
 * autor  Roberto Plana
 * version 2012/09
 */
require_once "DBConnect.php";
require_once "../model/ErrorsClass.php";
require_once "EntityInterfaceADO.php";
require_once "../model/UserClass.php";


class UserLogADO implements EntityInterfaceADO {

    //----------Data base Values---------------------------------------
    private static $tableName = "userlogin";
    private static $colNameIdUserLogin = "idUserLogin";
    private static $colNameNick = "nick";
    private static $colNamePassword = "password";
    private static $colNameRole = "role";
    private static $colNamePin = "pin";

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
			$entity = UserLogADO::fromResultSet( $row );
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
		 $idUserLogin = $res[ UserLogADO::$colNameIdUserLogin];
        $nick = $res[ UserLogADO::$colNameNick ];
        $password = $res[ UserLogADO::$colNamePassword ];
        $role = $res[ UserLogADO::$colNameRole ];
        $pin = $res[ UserLogADO::$colNamePin ];

      	//Object construction
        $entity = new UserClass();
        $entity->setIdUserLogin($idUserLogin);
        $entity->setNick($nick);
        $entity->setPassword($password);
        $entity->setRole($role);
        $entity->setPin($pin);
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
  			error_log("Error executing query in UserLogADO: " . $e->getMessage() . " ");
  			die();
  		}

  		$res = $conn->execution($cons, $vector);

  		return UserLogADO::fromResultSetList( $res );

    }


    /**
	 * findById()
	 * It runs a query and returns an object array
	 * @param id
	 * @return object with the query results
    */
    public static function findById( $user ) {
  		$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameIdUserLogin." = ?";
  		$arrayValues = [$user->getIdUserLogin()];

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
  //
  //   /**
	// * findByNickAndPass()
	//  * It runs a query and returns an object array
	//  * @param name
	//  * @return object with the query results
  //   */
  //   public static function findByNickAndPass( $user ) {
	// 	//$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = \"".$user->getNick()."\" and ".UserLogADO::$colNamePassword." = \"".$user->getPassword()."\"";
	// 	$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = ? and ".UserLogADO::$colNamePassword." = ?";
	// 	$arrayValues = [$user->getNick(),$user->getPassword()];
  //
	// 	return UserLogADO::findByQuery( $cons, $arrayValues );
  //   }

//copia
  public static function findByNickAndPass( $user ) {
  	//$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = \"".$user->getNick()."\" and ".UserLogADO::$colNamePassword." = \"".$user->getPassword()."\"";
  	$cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = ? and ".UserLogADO::$colNamePassword." = ?";
  	$arrayValues = [$user->getNick(),$user->getPassword()];

  	return UserLogADO::findByQuery( $cons, $arrayValues );


    }
    /**
  * findByName()
   * It runs a query and returns an object array
   * @param name
   * @return object with the query results
    */
    public static function checkNickAlready( $user ) {

      $cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNameNick." = ?";
      $arrayValues = [$user->getNick()];
      return UserLogADO::findByQuery($cons,$arrayValues);

    }

    /**
  * findByPass()
   * It runs a query and returns an object array
   * @param name
   * @return object with the query results
    */
    public static function findByPass( $pass ) {

      $cons = "select * from `".UserLogADO::$tableName."` where ".UserLogADO::$colNamePassword." = ?";
      $arrayValues = [md5($pass)];
      return UserLogADO::findByQuery($cons,$arrayValues);

    }

    /**
    * updatePassById()
   * It runs a query and returns an object array
   * @param name
   * @return object with the query results
    */
    public static function updatePassById( $user ) {

      $errors = "";
      if ($errors == "") {
        try {
          $conn = DBConnect::getInstance();
        }
        catch (PDOException $e) {
          print "Error connecting database: " . $e->getMessage() . " ";
          die();
        }
        $cons = "update `".UserLogADO::$tableName."` set ".UserLogADO::$colNamePassword." = ? where ".UserLogADO::$colNameIdUserLogin." = ? ";
        $arrayValues = [md5($user->getPassword()),$user->getIdUserLogin()];
        $conn->execution($cons, $arrayValues);
        return 1;
      } else {
        return $errors;
      }


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
    public function create($newUser) {
		try{
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			print "Error connecting database: " . $e->getMessage() . " ";
			die();
		}
		$cons="insert into ".UserLogADO::$tableName." (`nick`,`password`,`role`,`pin`) values (?,?,?,?)";
		$arrayValues= [$newUser->getNick(),$newUser->getPassword(), $newUser->getRole(), $newUser->getPin()];
    // var_dump($arrayValues);


		$id = $conn->executionInsert($cons, $arrayValues);
    
		$newUser->setIdUserLogin($id);

	  return $newUser->getIdUserLogin();
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

    public function updatepass($user) {
 	// 	Connection with the database
 		try {
 			$conn = DBConnect::getInstance();
 		}
 		catch (PDOException $e) {
 			print "Error connecting database: " . $e->getMessage() . " ";
 			die();
 		}

 		$cons="update `".UserLogADO::$tableName."` set ".UserLogADO::$colNamePassword." = ? where ".UserLogADO::$colNameNick." = ? and ".UserLogADO::$colNamePin." = ? ";
 		$arrayValues= [md5($user->getpassword()), $user->getNick(), $user->getPin()];

    $aux = $conn->execution($cons, $arrayValues);

    return $aux;

    }
}
?>
