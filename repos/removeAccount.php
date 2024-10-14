<?php
require "Tables/AccountRepository.php";
// $id = 8;

$id = $_POST['id'];

if (isset($id)) {
	$db = new AccountRepository();
	$data = $db->removeAccount($id);
}
?>