<?php
require 'databaseConn.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$userID = $_POST['user_id'];

$query = $connection->prepare("SELECT * FROM `order` WHERE userID = $userID");
$query->execute();
$rows = array();


while($row = $query->fetch()){
    $rows[] = $row;
}
print json_encode($rows);

?>