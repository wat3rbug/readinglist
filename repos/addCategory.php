<?php
require "Tables/Category.php";
$category = $_POST['category'];	


if (isset($category)) {
	$db = new Category();
	$db->addCategory($category);
}
?>
