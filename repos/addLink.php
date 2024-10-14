<?php
require "Readinglist.php";
$title = $_POST['title'];
$link = $_POST['link'];
$category = $_POST['category'];

if (isset($title) && isset($link) && isset($category)) {
	$db = new Readinglist();
	$db->addListing($title, $link, $category);
}
?>