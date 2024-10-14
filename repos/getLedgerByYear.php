<?php
require "Tables/MainLedgerRepository.php";
$year = 2024;
//$year = $_POST['year'];

if (isset($year)) {
	$db = new MainLedgerRepository();
	$data = $db->getLedgerByYear($year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>