<?php

class DBConnection {
	
	public $database;
	public $username;
	public $hostname;
	public $password;
	
	function __construct() {
		$this->password = "67triumph";
		$this->database = "underdog";
		$this->hostname = "db-server";
		$this->username = "underdoguser";
	}
}
?>