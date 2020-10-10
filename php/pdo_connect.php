<?php

require_once '../php/dotenv_load.php';

define('DSN', 'mysql:dbname=' . $_ENV['DB_NAME'] . ';host=' . $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);

try {
    $dbh = new PDO(DSN, DB_USER, DB_PASSWORD);
    // echo 'Connection success!';
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
