<?php
require "Tables/Readinglist.php";

$db = new ReadingList();
$data = $db->getAllListings();
header('Content-type: application/json');
echo json_encode($data);
?>