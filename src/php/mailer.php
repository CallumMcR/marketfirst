<?php

use PHPMailer/PHPMailer;
use PHPMailer/PHPMailer/Exception;


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/STMP.php';


if(isset($_POST['send'])){
  $mail = new PHPMailer(true);

  $mail ->isSTMP();
  $mail->Host = 'stmp.gmail.com';
  $mail->Username='p110134092@student.peterborough.ac.uk';
  $mail->Password ='tlwuysrigspesqvj';
  $mail->STMPSecure ='ssl';
  $mail->Port =465;

  $mail->setForm('p110134092@student.peterborough.ac.uk');

  $mail->addAddress($_POST['email']);

  $mail->isHTML(true);

  $mail->Subject =$_POST["subject"];
  $mail->Body =$_POST["message"];

  $mail->send();

  echo
  "
  <script>
  alert('sent successfully')
  </script>
  "

}


// Multiple recipients
$recipient = 'johny@example.com, sally@example.com'; // note the comma

// Subject
$subject = 'Verification Email for account';

// Message
$message = '
<html>
<head>
  <title>Verification email for account</title>
</head>
<body>
  <button>Activate account</button>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';


// Mail it
mail($to, $subject, $message, implode("\r\n", $headers));
?>