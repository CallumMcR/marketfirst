<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");



    $email = $_POST['email'];
    $query=$connection->prepare("SELECT emailAddress,password,userID FROM users WHERE emailAddress = :emailAddress");
    $query->bindParam(':emailAddress',$email);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);


    $hashedPassword = $result['password'];
    $plainTextPassword = $_POST['password'];
    if (password_verify($plainTextPassword, $hashedPassword)) {
        echo $result['userID'];
    } else {
        echo "incorrect";
    }

?>