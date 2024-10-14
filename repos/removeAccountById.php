<?php
require "Tables/AccountRepository.php";
$id = $_POST["id"];
 // $id = 2;

$db = new AccountRepository();
$data = $db->removeAccountById($id);

?>