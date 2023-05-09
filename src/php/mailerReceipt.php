<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
header('Access-Control-Allow-Origin: http://localhost:3000');
$env = parse_ini_file('../.env');
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'databaseConn.php';

$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$email = $_POST['email'];

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
    $mail->Subject ="Market first Order Receipt";
    $mail->Body .= "\n\nYour items will be shipped to:\n" . $address1 . "\n" . $address2;

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
