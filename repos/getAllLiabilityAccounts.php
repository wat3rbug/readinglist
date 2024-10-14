<?php
require "Tables/AccountRepository.php";

$db = new AccountRepository();
$data = $db->getAllLiabilityAccounts();
header('Content-type: application/json');
echo json_encode($data);
?>