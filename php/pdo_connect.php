<?php

require_once '../php/dotenv_load.php';

$dsn = 'mysql:dbname=' . $_ENV['DB_NAME'] . ';host=' . $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASSWORD'];

try {
    $dsn = new PDO($dsn, $user, $pass);
    echo 'Connection success!';
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

echo __DIR__;
