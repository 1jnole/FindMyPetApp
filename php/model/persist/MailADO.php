<?php
/** userClass.php
 * Entity userClass
 * autor  Roberto Plana
 * version 2012/09
 */


require_once "../model/MailClass.php";
require_once "../model/UserClass.php";
require_once "../model/UserDataClass.php";
require_once "../model/ErrorsClass.php";
require_once "../frameworks/PHPMailer-master/PHPMailerAutoload.php";


class MailADO {

  public function sendingEmail($newContact) {

    $mail = new PHPMailer;
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'webmasterfindmypet@gmail.com';                 // SMTP username
    $mail->Password = 'lasirenita13';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom($newContact->getEmail(), $newContact->getName());
    $mail->addAddress('webmasterfindmypet@gmail.com', 'Webmaster');     // Add a recipient
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Issues';
    $mail->Body    = $newContact->getContent()."  From: ".$newContact->getEmail();
    $mail->AltBody = '';

    if(!$mail->send()) {
        return 'Message could not be sent. ' . $mail->ErrorInfo;
    } else {
        return 'Message has been sent';
    }

  }

  public function sendingRecoverEmail($newContact) {

    $mail = new PHPMailer;
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'webmasterfindmypet@gmail.com';                 // SMTP username
    $mail->Password = 'lasirenita13';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom('webmasterfindmypet@gmail.com', 'Webmaster');
    $mail->addAddress($newContact[0]->getEmail(), $newContact[0]->getName());     // Add a recipient
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Team Management';
    $mail->Body    = "Enter into the following link to recover your password: http://provenapps.cat/~daw16-15/nau/html/recoverPassForm.html";
    $mail->AltBody = '';

    if(!$mail->send()) {
        return 'Message could not be sent. ' . $mail->ErrorInfo;
    } else {
        return 'Message has been sent';
    }

  }



}
