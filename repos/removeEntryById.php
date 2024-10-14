<?php
require_once "Tables/MainLedgerRepository.php";
$id = $_POST["id"];
// $id = "25";

$db = new MainLedgerRepository();
$data = $db->removeEntryById($id);
