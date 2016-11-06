<?php
/* Classe encarregada de gestionar las connexions a la base de dades */
class DBConnect{

   private $server;
   private $user;
   private $password;
   private $dataBase;
   private $link;
   private $stmt;
   private $array = array();

   static $_instance;

   /*La función construct és privada per  evitar que l'objecte pugui ser creat mitjançant new*/
   private function __construct(){
      $this->setConnection();
      $this->connection();
   }

   /*Mètode per establir els paràmetres de la connexió*/
   private function setConnection(){

      $this->server='localhost';
      $this->dataBase='daw1615';
      $this->user='daw16-15';
      $this->password='ko2Aeg';
   }

   /*Evitem el clonatge de l'obejcte: Patró Singleton*/
   private function __clone(){ }


   /*Funció encarregada de crear, si s'escau, l'objete. Aquesta és la funció que hem de cridar des de fora de la classe per a instanciar l'objecte i així poder fer servir els seus mètodes*/

   public static function getInstance(){
      if (!(self::$_instance instanceof self)){
         self::$_instance=new self();
      }

      return self::$_instance;
   }

   /*Realitza la connexió a la base de dades.*/
   private function connection(){
	    try{
			$this->link=new PDO('mysql:dbname='.$this->dataBase.';host='.$this->server, $this->user, $this->password,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION , PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	    }catch(PDOException $e){
			$this->link=null;
			echo "Error connecting to database.";
			error_log("Error connecting to database: ".$e);
		}
   }


   public function execution($sql,$vector){
	  if($this->link !=null){
		  $this->stmt=$this->link->prepare($sql);

		  try
		  {
			$this->stmt->execute($vector);
		  }
		  catch (PDOException $e) {
			     $this->link=null;
			echo "Error executing query.";
			error_log("Error executing query: ".$e);
		  }
	  }else{
		  $this->stmt=null;
	  }

	  return $this->stmt;//retorna la consulta select o el número de files afectades
   }

   //si necessitem altres coses, com per exemple, saber el darrer id insertat, l'hem de codificar a banda
   public function executionInsert($sql,$vector){
	   if($this->link !=null){
		   $this->stmt=$this->link->prepare($sql);
		   try
		   {
			$this->stmt->execute($vector);
			$id=$this->link->lastInsertId();
		   }
		   catch (PDOException $e) {
			$this->link=null;
			echo "Error executing insert.";
			error_log("Error executing insert: ".$e);
		   }
	   } else {
		   $id=null;
	   }
	   return $id;
   }


}

?>
