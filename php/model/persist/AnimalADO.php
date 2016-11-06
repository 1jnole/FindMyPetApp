<?php

require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/AnimalClass.php";
require_once "../model/ErrorsClass.php";


class AnimalADO {

  //----------Data base Values---------------------------------------
  private static $tableName = "animal";
  private static $colNameIdAnimal = "idAnimal";
  private static $colNameAnimalName = "animalName";
  private static $colNameWeight = "weight";
  private static $colNameHeight = "height";
  private static $colNameDescription = "description";
  private static $colNameAnimalImage = "animalImage";
  private static $colNameDateOfBirth = "dateOfBirth";
  private static $colNameDateAdded = "dateAdded";
  private static $colNameStatus = "status";
  private static $colNameIdUser = "idUser";


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
  //while ( ($row = $res->fetch_array(MYSQLI_BOTH)) != NULL ) {
  foreach ( $res as $row){
    //We get all the values an add into the array
    $entity = AnimalADO::fromResultSet( $row );

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
      $idAnimal = $res[ AnimalADO::$colNameIdAnimal];
      $animalName = $res[ AnimalADO::$colNameAnimalName ];
      $weight = $res[ AnimalADO::$colNameWeight ];
      $height = $res[ AnimalADO::$colNameHeight ];
      $description = $res[ AnimalADO::$colNameDescription ];
      $animalImage = $res[ AnimalADO::$colNameAnimalImage ];
      $dateOfBirth = $res[ AnimalADO::$colNameDateOfBirth ];
      $dateAdded = $res[ AnimalADO::$colNameDateAdded ];
      $status = $res[ AnimalADO::$colNameStatus ];
      $idUser = $res[ AnimalADO::$colNameIdUser ];


      //Object construction
      $entity = new AnimalClass();
      $entity->setIdAnimal($idAnimal);
      $entity->setAnimalName($animalName);
      $entity->setWeight($weight);
      $entity->setHeight($height);
      $entity->setDescription($description);
      $entity->setAnimalImage($animalImage);
      $entity->setDateOfBirth($dateOfBirth);
      $entity->setDateAdded($dateAdded);
      $entity->setStatus($status);
      $entity->setIdUser($idUser);

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
  			error_log("Error executing query in AnimalADO: " . $e->getMessage() . " ");
  			die();
  		}

  		$res = $conn->execution($cons, $vector);

  		return AnimalADO::fromResultSetList( $res );
      }

      /**
  	 * findById()
  	 * It runs a query and returns an object array
  	 * @param id
  	 * @return object with the query results
      */
      public static function findById($animal) {
  		$cons = "select * from `".AnimalADO::$tableName."` WHERE ".AnimalADO::$colNameIdAnimal  ." = ?";
  		$arrayValues = [$animal->getIdAnimal()];
  		return AnimalADO::findByQuery($cons,$arrayValues);
      }

      /**
  	 * findlikeName()
  	 * It runs a query and returns an object array
  	 * @param name
  	 * @return object with the query results
      */
      public static function findlikeName( $user ) {
  		$cons = "select * from `".AnimalADO::$tableName."` where ".AnimalADO::$colNameName." like ?";
  		$arrayValues = ["%".$user->getName()."%"];
  		return AnimalADO::findByQuery($cons,$arrayValues);
      }



      /**
  	* findByName()
  	 * It runs a query and returns an object array
  	 * @param name
  	 * @return object with the query results
      */
      public static function findByName( $user ) {
  		$cons = "select * from `".AnimalADO::$tableName."` where ".AnimalADO::$colNameNick." = ?";
  		$arrayValues = [$user->getRole()];

  		return AnimalADO::findByQuery($cons,$arrayValues);
      }

      /**
  	* findByNickAndPass()
  	 * It runs a query and returns an object array
  	 * @param name
  	 * @return object with the query results
      */
      public static function findByNickAndPass( $user ) {
  		//$cons = "select * from `".AnimalADO::$tableName."` where ".AnimalADO::$colNameNick." = \"".$user->getNick()."\" and ".AnimalADO::$colNamePassword." = \"".$user->getPassword()."\"";
  		$cons = "select * from `".AnimalADO::$tableName."` where ".AnimalADO::$colNameNick." = ? and ".AnimalADO::$colNamePassword." = ?";
  		$arrayValues = [$user->getNick(),$user->getPassword()];

  		return AnimalADO::findByQuery( $cons, $arrayValues );
      }

      /**
  	 * findAll()
  	 * It runs a query and returns an object array
  	 * @param none
  	 * @return object with the query results
      */
      public static function findAll( ) {
      $cons = "select * from `".AnimalADO::$tableName."`";
  		$arrayValues = [];

  		return AnimalADO::findByQuery( $cons, $arrayValues );
      }

      /**
  	 * create()
  	 * insert a new row into the database
      */
      public function create($animal) {

       $errors="";
 			 $errors .=ErrorsClass::validateStringsName($animal->getAnimalName());
       $errors .=ErrorsClass::validateTextArea($animal->getDescription());
			 $errors .=ErrorsClass::isDate($animal->getDateOfBirth());

     if($errors == ""){
       try {
   			$conn = DBConnect::getInstance();
   		}
   		catch (PDOException $e) {
   			print "Error connecting database: " . $e->getMessage() . " ";
   			die();
   		}
   		$cons="insert into ".AnimalADO::$tableName."(`animalName`,`weight`,`height`,`description`,`animalImage`,`dateOfBirth`,`dateAdded`,`status`,`idUser`) values (?,?,?,?,?,?,?,?,?)";
   		$arrayValues= [$animal->getAnimalName(),$animal->getWeight(), $animal->getHeight(), $animal->getDescription(), $animal->getAnimalImage(), $animal->getDateOfBirth(),$animal->getDateAdded(),$animal->getStatus(),$animal->getIdUser()];
      $conn->execution($cons, $arrayValues);
       return 1;
     }else{
       return $errors;
     }

  	}

      /**
  	 * delete()
  	 * it deletes a row from the database
      */
      public function delete($animal) {
  		//Connection with the database
  		try {
  			$conn = DBConnect::getInstance();
  		}
  		catch (PDOException $e) {
  			print "Error connecting database: " . $e->getMessage() . " ";
  			die();
  		}

  		$cons="delete from `".AnimalADO::$tableName."` where ".AnimalADO::$colNameIdAnimal." = ?";
  		$arrayValues= [$animal->getIdAnimal()];

  		$conn->execution($cons, $arrayValues);
      }


      public function findAnimalsByIdUser($user){

      //$cons = "select * from `".AnimalADO::$tableName."` inner join user on  `".AnimalADO::$tableName."`.idUser = user.idUser WHERE   `".AnimalADO::$tableName."`.".AnimalADO::$colNameIdUser." = ?";
      $cons =  "select * from animal inner join user on animal.idUser = user.idUser WHERE user.idUser = ?";
      $arrayValues = [$user->getIdUser()];
        //var_dump(AnimalADO::findByQuery( $cons, $arrayValues ));
      return AnimalADO::findByQuery( $cons, $arrayValues );


      }

      /**
  	 * update()
  	 * it updates a row of the database
      */
  	 public function update($animal) {
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
        $cons="update `".AnimalADO::$tableName."` set ".AnimalADO::$colNameAnimalName." = ?, ".AnimalADO::$colNameWeight." = ?, ".AnimalADO::$colNameHeight." = ?,
        ".AnimalADO::$colNameDescription." = ?, ".AnimalADO::$colNameDateOfBirth." = ?, ".AnimalADO::$colNameStatus." = ? where ".AnimalADO::$colNameIdAnimal." = ?" ;
        $arrayValues= [$animal->getAnimalName(),$animal->getWeight(), $animal->getHeight(), $animal->getDescription(), $animal->getDateOfBirth(),$animal->getStatus(),$animal->getIdAnimal()];
        $conn->execution($cons, $arrayValues);
        return 1;
      }else{
        return $errors;
      }

      }

}


 ?>
