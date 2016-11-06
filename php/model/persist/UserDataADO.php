<?php
/** userClass.php
 * Entity userClass
 * autor  Roberto Plana
 * version 2012/09
 */
require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/UserDataClass.php";
require_once "../model/ErrorsClass.php";

class UserDataADO implements EntityInterfaceADO {

    //----------Data base Values---------------------------------------
    private static $tableName = "user";
    private static $colNameIdUser = "idUser";
    private static $colNameName = "name";
    private static $colNameLastName = "lastName";
    private static $colNameAddress = "address";
    private static $colNamePostalCode = "postalCode";
    private static $colNamePhone = "phone";
    private static $colNameEmail = "email";
    private static $colNameImage = "image";
    private static $colNameDateAdded = "dateAdded";
    private static $colNameIdUserLogin = "idUserLogin";



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
			$entity = UserDataADO::fromResultSet( $row );
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
		    $idUser = $res[ UserDataADO::$colNameIdUser];
        $name = $res[ UserDataADO::$colNameName ];
        $lastName = $res[ UserDataADO::$colNameLastName ];
        $address = $res[ UserDataADO::$colNameAddress ];
        $postalCode = $res[ UserDataADO::$colNamePostalCode];
        $phone = $res[ UserDataADO::$colNamePhone ];
        $email = $res[ UserDataADO::$colNameEmail ];
        $image = $res[ UserDataADO::$colNameImage ];
        $dateAdded = $res[ UserDataADO::$colNameDateAdded ];
        $idUserLogin = $res[ UserDataADO::$colNameIdUserLogin ];


      	//Object construction
        $entity = new UserDataClass();
        $entity->setIdUser($idUser);
        $entity->setName($name);
        $entity->setLastName($lastName);
        $entity->setAddress($address);
        $entity->setPostalCode($postalCode);
        $entity->setPhone($phone);
        $entity->setEmail($email);
        $entity->setImage($image);
        $entity->setDateAdded($dateAdded);
        $entity->setIdUserLogin($idUserLogin);
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
			error_log("Error executing query in UserDataADO: " . $e->getMessage() . " ");
			die();
		}

		$res = $conn->execution($cons, $vector);

		return UserDataADO::fromResultSetList( $res );
    }

    /**
	 * findById()
	 * It runs a query and returns an object array
	 * @param id
	 * @return object with the query results
    */
    public static function findById( $userData ) {
		$cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameIdUserLogin." = ?";
		$arrayValues = [$userData->getIdUserLogin()];

		return UserDataADO::findByQuery($cons,$arrayValues);
    }

    /**
   * finByIdUser()
   * It runs a query and returns an object array
   * @param id
   * @return object with the query results
    */
    public static function findByIdUser( $userData ) {
    $errors = "";
    if ($errors == "") {
      $cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameIdUser." = ?";
      $arrayValues = [$userData->getIdUser()];
      // var_dump($cons);
      // var_dump($arrayValues);
      return UserDataADO::findByQuery($cons,$arrayValues);
    }else{
      return $errors;
    }

    }




    /**
   * findByEmailRepeated()
   * It runs a query and returns an object array
   * @param id
   * @return object with the query results
    */
    public static function findByEmailRepeated( $userData ) {
    $cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameEmail." = ?";
    $arrayValues = [$userData->getEmail()];

    return UserDataADO::findByQuery($cons,$arrayValues);
    }

    /**
	 * findlikeName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findlikeName( $user ) {
		$cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameName." like ?";
		$arrayValues = ["%".$user->getName()."%"];

		return UserDataADO::findByQuery($cons,$arrayValues);
    }



    /**
	* findByName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByName( $user ) {
		$cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameNick." = ?";
		$arrayValues = [$user->getRole()];

		return UserDataADO::findByQuery($cons,$arrayValues);
    }

    /**
	* findByNickAndPass()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByNickAndPass( $user ) {
		//$cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameNick." = \"".$user->getNick()."\" and ".UserDataADO::$colNamePassword." = \"".$user->getPassword()."\"";
		$cons = "select * from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameNick." = ? and ".UserDataADO::$colNamePassword." = ?";
		$arrayValues = [$user->getNick(),$user->getPassword()];

		return UserDataADO::findByQuery( $cons, $arrayValues );
    }

    /**
   * findByEmail()
   * It runs a query and returns an object array
   * @param none
   * @return object with the query results
    */

    public static function findByEmail( $user ) {
      $cons = "select * from userlogin inner join user on userlogin.idUserLogin = user.idUserLogin where ".UserDataADO::$colNameEmail." = ?";
      $arrayValues = [$user->getEmail()];
      return UserDataADO::findByQuery($cons,$arrayValues);
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll( ) {
    $cons = "select * from `".UserDataADO::$tableName."`";
		$arrayValues = [];
		return UserDataADO::findByQuery( $cons, $arrayValues );
    }

    public static function sendingEmail( $user ) {
      $sendEmail = MailADO::sendingRecoverEmail($user);
      // var_dump($user[0]->getEmail());

    }


    /**
	 * create()
	 * insert a new row into the database
    */
    public function create($userData) {
		//Connection with the database
		try {
			$conn = DBConnect::getInstance();
		}
		catch (PDOException $e) {
			print "Error connecting database: " . $e->getMessage() . " ";
			die();
		}
		$cons="insert into ".UserDataADO::$tableName."(`name`,`lastName`,`phone`,`email`,`image`,`dateAdded`,`idUserLogin`) values (?,?,?,?,?,?,?)";
		$arrayValues= [$userData->getName(),$userData->getLastname(), $userData->getPhone(), $userData->getEmail(),$userData->getImage(), $userData->getDateAdded(),$userData->getIdUserLogin()];

  	$conn->execution($cons, $arrayValues);

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

		$cons="delete from `".UserDataADO::$tableName."` where ".UserDataADO::$colNameId." = ?";
		$arrayValues= [$user->getId()];

		$conn->execution($cons, $arrayValues);
    }


    /**
	 * update()
	 * it updates a row of the database
    */
	 public function update($userData) {
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
      $cons="update `".UserDataADO::$tableName."` set ".UserDataADO::$colNameName." = ?, ".UserDataADO::$colNameLastName." = ?, ".UserDataADO::$colNameAddress." = ?, ".UserDataADO::$colNamePostalCode." = ?, ".UserDataADO::$colNamePhone." = ?,".UserDataADO::$colNameEmail." = ?, ".UserDataADO::$colNameImage." = ?  where ".UserDataADO::$colNameIdUser." = ?" ;
      $arrayValues= [$userData->getName(),$userData->getLastname(), $userData->getAddress(), $userData->getPostalCode(), $userData->getPhone(), $userData->getEmail(), $userData->getImage(), $userData->getIdUser()];

      $conn->execution($cons, $arrayValues);

      return 1;
    }else{
      return $errors;
    }
 }
}
?>
