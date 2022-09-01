<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'auth-app');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('T_APPS', 'applications');   // 連携サイト管理テーブル
define('T_TOKENS', 'approvals');    // アクセストークン管理テーブル
define('APP_NAME', '認可サーバー');
define('APP_URL', 'http://' . $_SERVER["HTTP_HOST"]);

// PHPのエラーを表示するように設定
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', "On");