<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    $productID = $_POST['productID'];   
    $query = $connection->prepare("SELECT p.*, ps.size 
    FROM product p 
    JOIN productvariation pv ON p.productID = pv.productID 
    JOIN productsize ps ON pv.sizeID = ps.sizeID 
    WHERE p.productID = :productID"); 
    $query->bindParam(':productID', $productID, PDO::PARAM_INT);
    $query->execute();
    $rows = array();

    while($row = $query->fetch())
    {
        $rows[] = $row;
    }

    print json_encode($rows);
?>
