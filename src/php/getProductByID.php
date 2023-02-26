<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    $productID = $_POST['productID'];   
    $query = $connection->prepare("SELECT * FROM PRODUCTS WHERE productID = :productID"); 
    $query->bindParam(':productID', $productID, PDO::PARAM_INT);
    $query->execute();
    $rows = array();

    while($row = $query->fetch())
    {
        $rows[] = $row;
    }

    print json_encode($rows);
?>
