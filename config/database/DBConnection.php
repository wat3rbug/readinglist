<?php

class DBConnection {
	
	public $database;
	public $username;
	public $hostname;
	public $password;
	
	function __construct() {
		$this->password = "[password]";
		$this->database = "readinglist";
		$this->hostname = "[host]";
		$this->username = "readinglistuser";
	}
}
?>
