<?php
class Listing
{
	private $conn;
	
	function __construct() {
		include_once("DBConnection.php");
		$db = new DBConnection();
		$servername = $db->hostname;
		$username = $db->username;
		$password = $db->password;
		$charset = "utf8mb4";
		$database = $db->database;
		$dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
		$options = [
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES		=> true,
		];
		try {
			$this->conn = new PDO($dsn, $username, $password);
		} catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
	}
	
	function addListing($title, $link, $category) {
		$statement = $this->conn->prepare("INSERT INTO readinglist (title, link, category) VALUES (?, ?, ?)");
		$statement->bindParam(1, $title);
		$statement->bindParam(2, $link);
		$statement->bindParam(3, $category);
		$statement->execute();
	}
	
	function getIdForLastInsert($title, $link) {
		$statement = $this->conn->prepare("SELECT id FROM readinglist where title = ? AND link = ? ORDER BY id DESC LIMIT 1");
		$statement->bindParam(1, $title);
		$statement->bindParam(2, $link);
		$statement->execute();
		$id = $statement->fetch();
		echo $id['id'];
	}
	
	function getAllListings() {
		$sql = "SELECT readinglist.id AS id, title, link, categories.category AS category FROM readinglist JOIN categories ON readinglist.category = categories.id  ORDER BY category, categories.id ASC";
		$statment = $this->conn->query($sql);
		while($row = $statment->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function removeListing($id) {
		if (isset($id) && $id > 0) {
			$statement = $this->conn->prepare("DELETE FROM readinglist WHERE id = ?");
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function getListingsByCategory($category) {
		if (isset($category)) {
			$sql = "SELECT * FROM readinglist JOIN categories ON readinglist.category = categories.id WHERE categories.category = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $category);
			$statement->execute();
			$output = array();
			while($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
}
?>