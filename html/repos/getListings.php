<?php
require "Tables/Listing.php";

$db = new Listing();
$data = $db->getAllListings();
header('Content-type: application/json');
echo json_encode($data);
?>