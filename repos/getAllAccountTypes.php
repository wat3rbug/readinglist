<?php
require "Tables/AccountTypeRepository.php";

$db = new AccountTypeRepository();
$data = $db->getAllAccountTypes();
header('Content-type: application/json');
echo json_encode($data);

?>