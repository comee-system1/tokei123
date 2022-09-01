<?php
require_once(__DIR__ . '/lib/common.php');
$c = new Common();

// ボタン処理
if (isset($_POST))
{
     // ログインボタン
     if (isset($_POST['login']) && $c->isSetAndNotEmpty($_POST['email']) && $c->isSetAndNotEmpty($_POST['password']))
          $c->userLogin($_POST['email'], $_POST['password']);
     // ログアウトボタン
     elseif (isset($_POST['logout']))
          $c->userLogout();
     // 新規登録ボタン
     elseif (isset($_POST['register']) && $c->isSetAndNotEmpty($_POST['email']) && $c->isSetAndNotEmpty($_POST['password']))
          $c->userRegister($_POST['email'], $_POST['password']);
     // 餃子サークル会員でログインボタン
     elseif (isset($_POST['sso-login']))
          $c->ssoLogin();
}

// URL解析
$url = parse_url(urldecode($_SERVER['REQUEST_URI']));
$requestAction = substr($url['path'], 1);

// HTML出力
if ($c->isLogined()) {
     include(VIEW_DIR . '/list.ctp');
} else {
     switch ($requestAction) {
          case 'register': 
               include(VIEW_DIR . '/register.ctp');
               break;
          case 'sso-login/callback':
               $c->ssoLoginCallback();
               break;
          default: 
               include(VIEW_DIR . '/login.ctp');
     }
}