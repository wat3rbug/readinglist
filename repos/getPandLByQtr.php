<?php
require "Tables/PandLRepository.php";
$year = 2024;
$qtr = 1;
//$qtr = $_POST['qtr'];
//$year = $_POST['year'];

if (isset($year)) {
	$db = new PandLRepository();
	$data = $db->getPandLByQtr($qtr, $year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>