<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$id = $_POST['productID'];

$dir = 'E:\Team Based Development\PhP Server\EasyPHP-Devserver-17\eds-www\MarketFirst\my-app\src\images\products/'.$id;
$files = array();

if ($handle = opendir($dir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && !is_dir($dir.'/'.$entry) && pathinfo($dir.'/'.$entry, PATHINFO_EXTENSION) === 'png') {
            $files[] = $entry;
        }
    }
    closedir($handle);
}

header('Content-Type: application/json');
echo json_encode($files);

?>