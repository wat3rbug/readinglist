<?php
require "Category.php";
$id = $_POST['id'];
$db = new Category();
$db->removeCategoryById($id);
?>