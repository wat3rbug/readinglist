<?php
require "Tables/MainLedgerRepository.php";
// $id = 12;
// $editDate = new Date('2024-04-13');
// $description = $_POST['Key Programming'];
// $type = strval(1);
// $amount = strval(223);
// $cat = 'Assets';

$id = $_POST['id'];
$editDate = $_POST['editDate'];
$description = $_POST['description'];
$type = $_POST['type'];
$amount = $_POST['amount'];
$cat = $_POST['cat'];

if (isset($id) && isset($editDate) && isset($description) && isset($type) && isset($amount) && isset($cat)) {
	$db = new MainLedgerRepository();
	$data = $db->updateEntryById($id, $editDate, $description, $type, $amount, $cat);
}
