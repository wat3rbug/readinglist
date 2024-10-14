<?php
require "Tables/Category.php";
$db = new Category();
$data = $db->getAllCategories();
header('Content-type: application/json');
echo json_encode($data);
?>