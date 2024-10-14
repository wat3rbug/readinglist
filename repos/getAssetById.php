<?php
require "Tables/MainLedgerRepository.php";
// $id = "19";

$id = $_POST["id"];

	
if (isset($id)) {
	$db = new MainLedgerRepository();
	$data = $db->getEntryById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}	
?>