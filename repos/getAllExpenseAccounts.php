<?php
require "Tables/AccountRepository.php";

$db = new AccountRepository();
$data = $db->getAllExpenseAccounts();
header('Content-type: application/json');
echo json_encode($data);
?>