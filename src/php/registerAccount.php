<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");


    


    if (!empty($_POST['activationID'])) {
        $id = $_POST['activationID'];

        $query = $connection->prepare("SELECT email FROM accountpendingverification WHERE uniqueActivationCode = :id");
        $query->bindParam(':id', $id);
        $query->execute();
        // Get the email address first before we delete it
        if ($query->rowCount() > 0) {
            $result = $query->fetch(PDO::FETCH_ASSOC);
            $email = $result['email'];
            $query = $connection->prepare("DELETE FROM accountpendingverification WHERE uniqueActivationCode = :id");
            $query->bindParam(':id', $id);
            $query->execute();
    
           
    
            $query2 = $connection->prepare("INSERT INTO users (emailAddress,password,firstName,lastName) VALUES (:email,123,123,123)");
            $query2->bindParam(':email', $email);
            $query2->execute();
        }



       






    } else {
        echo "Invalid or missing uniqueid value";
    }



?>