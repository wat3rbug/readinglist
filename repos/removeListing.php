<?php
require "Readinglist.php";
$db = new Readinglist();
$id =$_POST['id'];
$db->removeListing($id);
?>