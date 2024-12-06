<?php
require "Tables/Category.php";
$id = $_POST['catId'];
$category = $_POST['category'];

if (isset($id) && isset($category) && $id > 0) {
	$db = new Category();
	$db->updateCategory($id, $category);
}
?>