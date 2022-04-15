<?php

header('Access-Control-Allow-Origin: http://localhost:8081');

header('Access-Control-Allow-Headers: Content-Type');
$array = [];
for($i=0;$i<=10;$i++){
    $array[$i][ 'riid' ] = 5000+$i;
    $array[$i][ 'riyocode' ] = $i+10001;
}
$json_encode = json_encode($array);
echo $json_encode;
