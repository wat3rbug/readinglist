<?php
require "Tables/MainLedgerRepository.php";
$id = $_POST["entry"];
// $temp = 12;
// $id = strval($temp);

$db = new MainLedgerRepository();
$data = $db->getEntryById($id);
header('Content-type: application/json');
echo json_encode($data);
?>