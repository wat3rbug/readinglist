<?php
require "Tables/AccountRepository.php";

// $name = "test";
// $account_type = 2;

$name = $_POST['name'];
$account_type = $_POST['account_type'];


if (isset($name) && isset($account_type)) {
	$db = new AccountRepository();
	$db->addAccount($name, $account_type);
}
?>