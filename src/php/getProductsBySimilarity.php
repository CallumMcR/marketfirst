<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    $productID = $_POST['productID'];   
    $query = $connection->prepare("SELECT p.*
    FROM Product p
    WHERE p.productID != $productID
      AND (p.Brand = (SELECT Brand FROM Product WHERE productID = $productID)
           OR p.productType = (SELECT productType FROM Product WHERE productID = $productID)) LIMIT 12"); 
    $query->bindParam(':productID', $productID, PDO::PARAM_STR);
    $query->execute();
    $rows = array();

    while($row = $query->fetch())
    {
        $rows[] = $row;
    }

    print json_encode($rows);
?>
