<?php
require "Tables/MainLedgerRepository.php";

// $current = "2024-05-05";
// $description = 'Steven P trip';
// $type = 1;
// $amount = 124.00;
// $account = 2;
// $car = 2;

$current = $_POST["date"];
$description = $_POST["description"];
$type = $_POST["type"];
$amount = $_POST["amount"];
$account = $_POST["account"];
$car = "2";
	
if (isset($current) && isset($description) && isset($type) && isset($amount) && isset($account) && isset($car)) {
	$db = new MainLedgerRepository();
	$db->addEntry($current, $description, $type, $amount, $account, $car);
}	
?>