<?php

require_once '../php/pdo_connect.php';

// 商品情報を取得
$sql = 'SELECT * FROM items';
$prepare = $dbh->prepare($sql);
$prepare->execute();

// データをキャストして配列に格納
$items = [];
while ($row = $prepare->fetch(PDO::FETCH_ASSOC)) {
    $items[] = [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'price' => (int) $row['price'],
        'image' => (string) $row['image'],
        'delv' => (int) $row['delv'],
        'isSale' => (bool) $row['isSale'],
    ];
}

// 配列をJSONに変換
$data = json_encode($items, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// JSONを出力
header("Content-Type: application/json");
// header('Content-Disposition: attachment; filename="data.json"');
echo $data;
