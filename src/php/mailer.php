<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
  $mail = new PHPMailer(true);

  $mail->isSMTP();
  $mail->Host = 'stmp.gmail.com';
  $mail->Username='p110134092@student.peterborough.ac.uk';
  $mail->Password ='tlwuysrigspesqvj';
  $mail->SMTPSecure ='ssl';
  $mail->Port =465;
  $mail->setFrom('p110134092@student.peterborough.ac.uk');
  if(!empty($_POST['email'])){
    $mail->addAddress($_POST['email']);

    $mail->isHTML(true);

    $mail->Subject ="Market first account activation";
    $mail->Body ="Activate your account here";

    $mail->send();

    echo
    "
    <script>
    alert('sent successfully')
    </script>
    ";
  }else{
    echo "Please provide recipient email and subject";
  }

?>
