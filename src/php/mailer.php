<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Access-Control-Allow-Credentials: true");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$env = parse_ini_file('../.env');
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


if(!empty($_POST['email']))
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Username=$env["GOOGLE_SENDER"];
    $mail->SMTPAuth = "true";
    $mail->Password =$env["GOOGLE_PASSWORD"];
    $mail->SMTPSecure ='ssl';
    $mail->Port =465;
    $mail->setFrom($env["GOOGLE_SENDER"]);
    $mail->addAddress($_POST['email']);
    $mail->isHTML(true);
    $mail->Subject ="Market first account activation";
    $mail->Body ="Activate your account here";
    if($mail->send()) {
        echo "Email sent";
    } else {
        echo "Email not sent";
    }
}
else{
  echo "Email address is missing";
}

?>
