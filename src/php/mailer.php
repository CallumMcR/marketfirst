<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
header('Access-Control-Allow-Origin: http://localhost:3000');
$env = parse_ini_file('../.env');
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'databaseConn.php';




// Code for adding to verification
$uniqueID ="";

if(!empty($_POST['email']))
{
    $currentDatetime = date('Y-m-d H:i:s');
    $email = $_POST['email'];
    $id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 16);
    $uniqueID =$id;

    $query2 = $connection->prepare("SELECT COUNT(*) FROM user WHERE emailAddress = :email");
    $query2->bindParam(':email', $email);
    $query2->execute();
    $count2 = $query2->fetchColumn();


    if($count2<1){ // Checking the email doesnt already exist
        // Check if the generated ID already exists in the database
        $query = $connection->prepare("SELECT COUNT(*) FROM user WHERE activationCode = :id");
        $query->bindParam(':id', $id);
        $query->execute();
        $count = $query->fetchColumn();

        

        if($count > 0){
            // If the ID already exists, generate a new one and try again
            $id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 16);
            $uniqueID =$id;
        }

        $password =$_POST['password'];
        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
        $firstName = $_POST['firstName'];
        $lastName=$_POST['lastName'];

        // Insert the email and ID into the database
        $query = $connection->prepare("INSERT INTO user (emailAddress, activationCode,password,firstName,lastName,accountCreationDate) VALUES (:email, :id,:hashedpassword,:firstName,:lastName,:currentDatetime)");
        $query->bindParam(':email', $email);
        $query->bindParam(':id', $id);
        $query->bindParam(':hashedpassword', $hashedpassword);
        $query->bindParam(':firstName', $firstName);
        $query->bindParam(':lastName', $lastName);
        $query->bindParam(':currentDatetime', $currentDatetime);
        $query->execute();

        // Check if the query was successful and return a message
        if($query->rowCount() > 0){
            echo "Data inserted successfully";
        } else {
            echo "Failed to insert data";
        }
    }   
}
else{
  echo "Email address is missing";
}


//Code below here sends the email

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
    $mail->Body = '<a href="http://localhost:3000/verifyaccount/' . $uniqueID . '">Activate account</a>';

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
