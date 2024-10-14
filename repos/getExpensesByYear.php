<?php
require "Tables/ExpenseRepository.php";
$year = 2024;
//$year = $_POST['year'];

if (isset($year)) {
	$db = new ExpenseRepository();
	$data = $db->getExpensesByYear($year);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>