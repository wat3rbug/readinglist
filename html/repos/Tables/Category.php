<?php
class Category {
	
	private $conn;
	private $list;

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
	function getAllCategories() {
		$sql = "SELECT * from categories ORDER BY category ASC";
		$statment = $this->conn->query($sql);
		while($row = $statment->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getAllUsedCategories() {
		$sql = "SELECT categories.id, categories.category FROM categories JOIN readinglist ON categories.id = readinglist.category GROUP BY categories.id";
		$statment = $this->conn->query($sql);
		while($row = $statment->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function updateCategory($id, $category) {
		$statement = $this->conn->prepare("UPDATE categories SET category = ? where id = ?");
		$statement->bindParam(1, $category);
		$statement->bindParam(2, $id);
		$statement->execute();
	}
	
	function addCategory($category) {
		$statement = $this->conn->prepare("INSERT INTO categories (category) VALUES (?)");
		$statement->bindParam(1, $category);
		$statement->execute();
	}
	
	function removeCategory($category) {
		if (isset($category)) {
			$statement = $this->conn->prepare("DELETE FROM categories where category = ?");
			$statement->bindParam(1, $category);
			$statement->execute();
		}
	}
	
	function removeCategoryById($id) {
		if (isset($id) && $id > 0) {
			$statement = $this->conn->prepare("DELETE FROM categories where id = ?");
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
}
?>