<?php
require "Readinglist.php";
$db = new ReadingList();

$title = $_POST['title'];
$link = $_POST['link'];

$id = $db->getIdForLastInsert($title, $link);
return $id['id'];
?>