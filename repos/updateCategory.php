<?php
require "Tables/Category.php";
$id = $_POST['catId'];
// $id = "21";
$category = $_POST['category'];
// $category = "Kitty Lee"; // its Kitty Lee

if (isset($id) && isset($category) && $id > 0) {
	$db = new Category();
	$db->updateCategory($id, $category);
}
?>