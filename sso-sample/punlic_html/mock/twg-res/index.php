<?php
require_once(__DIR__ . '/lib/common.php');
$c = new Common();

// URL解析
$url = parse_url(urldecode($_SERVER['REQUEST_URI']));
$requestAction = substr($url['path'], 1);

switch ($requestAction) {
     case 'userinfo':           // ユーザー情報リクエスト
          $c->userinfo();
          break;
}