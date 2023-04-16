<?php

require 'databaseConn.php';
header('Access-Control-Allow-Origin: http://localhost:3000');



if(!empty($_GET['email']))
{
    $currentDatetime = date('Y-m-d H:i:s');
    $email = $_GET['email'];
    $id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 16);


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
        }

        // Insert the email and ID into the database
        $query = $connection->prepare("INSERT INTO user (emailAddress, activationCode) VALUES (:email, :id)");
        $query->bindParam(':email', $email);
        $query->bindParam(':id', $id);
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

?>
