<?php
require "Tables/TransactionRepository.php";

$db = new TransactionRepository();
	$data = $db->getAllYears();
	header('Content-type: application/json');
	echo json_encode($data);
?>