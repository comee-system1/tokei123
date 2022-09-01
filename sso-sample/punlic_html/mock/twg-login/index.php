<?php
require_once(__DIR__ . '/lib/common.php');
$c = new Common();

// ボタン押下処理
if (isset($_POST)) {
     // ログインボタン
     if (isset($_POST['login']) && $c->isSetAndNotEmpty($_POST['email']) && $c->isSetAndNotEmpty($_POST['password']))
          $c->userLogin($_POST['email'], $_POST['password']);
     // ログアウトボタン
     elseif (isset($_POST['logout']))
          $c->userLogout();
     // 新規登録ボタン
     elseif (isset($_POST['register']) && $c->isSetAndNotEmpty($_POST['email']) && $c->isSetAndNotEmpty($_POST['password']))
          $c->userRegister($_POST['email'], $_POST['password']);
     // 連携同意ボタン
     elseif (isset($_POST['approval']) && $_POST['approval'] == 1)
          $c->requestCode();
     // 連携キャンセルボタン
     elseif (isset($_POST['approval']) && $_POST['approval'] == 0)
          $c->cancelSsoLogin();
}

// URL解析
$url = parse_url(urldecode($_SERVER['REQUEST_URI']));
$requestAction = substr($url['path'], 1);

if ($requestAction === 'sso-login') {
     // SSOログインリクエスト
     $c->ssoLogin();
} else {
     // 通常リクエスト
     if ($c->isLogined()) {
          // ログイン中の場合
          include(VIEW_DIR . '/list.ctp');
     } else {
          // 未ログインの場合
          if ($requestAction === 'register')
               include(VIEW_DIR . '/register.ctp');
          else
               include(VIEW_DIR . '/login.ctp');
     }
}