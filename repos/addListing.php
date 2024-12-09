<?php
require "Tables/Listing.php";

// $cat = "2";
// $title = "test";
// $link = "something";
$cat = $_POST["cat"];
$title = $_POST["title"];
$link = $_POST["link"];

if (isset($cat) && isset($title) && isset($link)) {
    $db = new Listing();
    $db->addListing($title, $link, $cat);
}
?>