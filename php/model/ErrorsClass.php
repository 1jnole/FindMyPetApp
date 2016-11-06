<?php

class ErrorsClass{

  /*
  * @author: Jorge Nole & Luis Salvador
  * @name: validateIntegers
  * @description: Allow validate string values
  * @data: 26/05/2016
  * @version: 1.0
  * @params : $value
  */

	public static function validateStringsName($value){
					$nameErr="";
					$value=mb_strtolower($value,'UTF-8');
					$accents = array("à", "á", "è", "é", "í", "ò", "ó", "ú");
					$sense=array("a", "a", "e", "e", "i", "o", "o", "u");
					$value=str_replace($accents,$sense,$value);
					if (!preg_match("/^[a-zA-Z]*$/",$value)) {
						$nameErr = "$value: Only letters are  allowed\n";
					}else if (strlen($value) > 15){
						$nameErr = "Name field must be shorter than 15 caracters\n";
					}
					return $nameErr;
	}


    /*
    * @author: Jorge Nole & Luis Salvador
    * @name: validateIntegers
    * @description: Allow validate integer values
    * @data: 26/05/2016
    * @version: 1.0
    * @params : $value
    */
	public static function validateIntegers($value){
					$integerErr="";
					if(filter_var($value, FILTER_VALIDATE_INT) === false){
							$integerErr = "$value: Only numbers are allowed \n";
					}
					return $integerErr;
 }

   /*
   * @author: Jorge Nole & Luis Salvador
   * @name: ValidateWeigth
   * @description: Allow validate weight
   * @data: 26/05/2016
   * @version: 1.0
   * @params : $value
   */


 /*
 * @author: Jorge Nole & Luis Salvador
 * @name: ValidateHeight
 * @description: Allow validate height
 * @data: 26/05/2016
 * @version: 1.0
 * @params : $value
 */

   /*
   * @author: Jorge Nole & Luis Salvador
   * @name: ValidateWH
   * @description: Allow validate TextArea values
   * @data: 26/05/2016
   * @version: 1.0
   * @params : $value
   */

public static function validateTextArea($value){
       $textAreaErr="";
       $expression = "/<[^<]+>/";
       if (preg_match($expression, $value)) {
            $textAreaErr = "$value:  Html tags are not allowed \n";
        }else if($value == ""){
           $textAreaErr = "Textarea can't be empty \n";
       }
       return $textAreaErr;
}

  /*
  * @author: Jorge Nole & Luis Salvador
  * @name: ValidateWH
  * @description: Allow validate TextArea values
  * @data: 26/05/2016
  * @version: 1.0
  * @params : $value
  */
public static function isEmail($value){
   $emailErr = "";
    $expression = "/^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/";
    if (!preg_match($expression, $value)) {
      $emailErr = "Email is not correctly informed \n";
    }
    return $emailErr;

}

public static function isDate($value){
	$dateError = "";
	$expression = "/^\d{4}-(((0[13578]|1[02])-(0[1-9]|[12]\d|3[0-1]))|(02-(0[1-9]|[12]\d))|((0[469]|11)-(0[1-9]|[12]\d|30)))$/";
	if(!preg_match($expression, $value)){
		$dateError = "Date is not correctly informed";
	}
	return $dateError;
}

public static function isNick($value){
	$nickError = "";
	$expression = "/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,10}$/";

	if(!preg_match($expression, $value)){
		$nickError = "Nick is not correctly informed";
	}
	return $nickError;

}





}
?>
