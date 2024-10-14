<?php
require "Tables/AssetRepository.php";
$year = 2024;
//$year = $_POST['year'];

if (isset($year)) {
	$db = new AssetRepository();
	$data = $db->getAssetsByYear($year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>