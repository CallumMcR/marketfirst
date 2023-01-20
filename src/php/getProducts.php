<?php
    require 'databaseConn.php';
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    
    //$postdata = file_get_contents("php://input");
    //$request = json_decode($postdata, true);
    //$array = $request[0];

    //$searchQuery = $array['searchQuery'];
    //$sortOrder = $array['sortOrder'];

    $query = $connection->prepare("SELECT * FROM PRODUCTS"); 
    $query->execute();
    $rows = array();

    while($row = $query->fetch())
    {
        $rows[] = $row;
    }

    print json_encode($rows);
?>