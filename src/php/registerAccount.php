<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");


    


    if (!empty($_POST['activationID'])) {
        $id = $_POST['activationID'];

        $query = $connection->prepare("SELECT email,firstName,lastName,password FROM user WHERE activationCode = :id");
        $query->bindParam(':id', $id);
        $query->execute();
        // Get the email address first before we delete it
        if ($query->rowCount() > 0) {

            //Grab the data
            $result = $query->fetch(PDO::FETCH_ASSOC);
            $email = $result['email'];
            $firstName= $result['firstName'];
            $lastName=$result['lastName'];
            $hashedpassword=$result['password'];

            // Data is stored locally, so delete it from the DB
            $query = $connection->prepare("DELETE FROM user WHERE activationCode = :id");
            $query->bindParam(':id', $id);
            $query->execute();
            
            // Transfer the row with a hashed password
            $query2 = $connection->prepare("INSERT INTO user (emailAddress,password,firstName,lastName) VALUES (:email,:password,:firstName,:lastName)");
            $query2->bindParam(':email', $email);
            $query2->bindParam(':password', $hashedpassword);
            $query2->bindParam(':firstName', $firstName);
            $query2->bindParam(':lastName', $lastName);
            $query2->execute();


            $query3=$connection->prepare("SELECT userID FROM user WHERE email = :emailAddress");
            $query3->bindParam(':emailAddress',$email);
            $query3->execute();
            $details = $query3->fetch(PDO::FETCH_ASSOC);

            echo $details['userID'];


        }
    } else {
        echo "Invalid or missing uniqueid value";
    }



?>