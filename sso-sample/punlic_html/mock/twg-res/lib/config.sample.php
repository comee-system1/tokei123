<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'login-app'); // 今回はログイン用（twg-login）と同じデータベースを使用する
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('T_USERS', 'twg_client');   // ユーザー情報管理テーブル
define('APP_NAME', 'リソースサーバー');
define('APP_URL', 'http://' . $_SERVER["HTTP_HOST"]);
define('AUTH_URL', 'http://twg-auth-local');

// PHPのエラーを表示するように設定
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', "On");