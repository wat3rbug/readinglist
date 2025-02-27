<?php
require "Tables/Category.php";

// This file calls the Category class and makes the call.  Category is the 
// repo class for accessing the database.  This file uses the http POST
// call and doesn't return a value.

$id = $_POST['catId'];
$category = $_POST['category'];

if (isset($id) && isset($category) && $id > 0) {
	$db = new Category();
	$db->updateCategory($id, $category);
}
?>