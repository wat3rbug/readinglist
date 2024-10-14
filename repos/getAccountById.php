<?php
require "Tables/AccountRepository.php";
$id = $_POST["id"];
 // $id = 2;

$db = new AccountRepository();
$data = $db->getAccountById($id);
header('Content-type: application/json');
echo json_encode($data);
?>