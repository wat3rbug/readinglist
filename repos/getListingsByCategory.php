<?php
require "Tables/Readinglist.php";
$category = $_POST['category'];

// $category = "Billy Lane";
if (isset($category)) {
	$db = new ReadingList();
	$data = $db->getListingsByCategory($category);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>