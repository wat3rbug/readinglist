<?php

class DBConnection {
	
	public $database;
	public $username;
	public $hostname;
	public $password;
	
	function __construct() {
		$this->password = "67triumph";
		$this->database = "readinglist";
		//$this->hostname = "localhost";
		$this->hostname = "phobos";
		$this->username = "readinglistuser";
	}
}
?>
