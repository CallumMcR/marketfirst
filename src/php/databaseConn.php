<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Credentials: true');

    $host = 'localhost';
    $db   = 'marketfirst';
    $user = 'root';
    $pass = '';

    $dsn = "mysql:host=$host;dbname=$db";

    $options = [    
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,    
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,    
    PDO::ATTR_EMULATE_PREPARES   => false,];

    try 
    {    
        $connection = new PDO($dsn, $user, $pass, $options);
    } 
    catch (\PDOException $e) 
    {     
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
?>