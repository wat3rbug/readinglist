<?php
require "Tables/AccountRepository.php";
// $id = "9";
// $name = "test me";
//  $type = "3";


$id = $_POST['id'];
$name = $_POST['name'];
$type = $_POST['account_type'];

if (isset($id) && isset($name) && isset($type)) {
	$db = new AccountRepository();
	$data = $db->updateAccountById($id, $name, $type);
}


?>