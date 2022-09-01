<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'sample-app');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('T_USERS', 'user_client');
define('VIEW_DIR', dirname(__DIR__) . '/view');
define('APP_NAME', '外部連携サイト');
define('APP_URL', 'http://' . $_SERVER["HTTP_HOST"]);
define('SSO_CLIENT_ID', '1111');    // twg-app(認可サーバーモック)に登録したクライアントID

// PHPのエラーを表示するように設定
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', "On");