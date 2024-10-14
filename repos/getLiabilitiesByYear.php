<?php
require "Tables/LiabilityRepository.php";
$year = 2024;
//$year = $_POST['year'];

if (isset($year)) {
	$db = new LiabilityRepository();
	$data = $db->getLiabilitiesByYear($year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>