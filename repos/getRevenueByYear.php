<?php
require "Tables/RevenueRepository.php";
$year = 2024;
//$year = $_POST['year'];

if (isset($year)) {
	$db = new RevenueRepository();
	$data = $db->getRevenueByYear($year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>