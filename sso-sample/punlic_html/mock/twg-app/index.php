<?php
require_once(__DIR__ . '/lib/common.php');
$c = new Common();

// URL解析
$url = parse_url(urldecode($_SERVER['REQUEST_URI']));
$requestAction = substr($url['path'], 1);

switch ($requestAction) {
     case 'client':           // クライアント認証リクエスト
          $c->authenticationClient();
          break;
     case 'status':           // ユーザー連携同意状況確認リクエスト
          $c->getApprovalStatus();
          break;
     case 'code':             // 認可コードリクエスト
          $c->createCode();
          break;
     case 'token':            // トークンリクエスト
          $c->getToken();
          break;
     case 'introspection':    // アクセストークン情報リクエスト
          // 参考：https://docs.authlete.com/#introspection-endpoint
          $c->getTokenInfo();
          break;
}