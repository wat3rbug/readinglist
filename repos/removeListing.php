<?php
require "Tables/Listing.php";
$id =$_POST['id'];

if (isset($id)) {
    $db = new Listing();
    $db->removeListing($id);
}

?>