# Auth0による認可サーバー構築の調査結果 ver.0

## 目的

既存サイトにソーシャルログイン形式のSSOを実装するため、[Auth0](https://auth0.com/jp/)を使用して認可サーバーおよびリソースサーバーを構築する。

Auth0で今回の要件を満たす認可サーバーの構築が可能か調査する。

## Auth0で構築する認可・リソースサーバーで満たすべき要件

- ユーザー認証（ログイン）は別サーバーで行うため、別サーバーのユーザーIDと紐づけたアクセストークンの発行が可能であること（セキュアにIDを受け渡せる機能が実装されていることが理想）

    <br>

    **<font color="Red">→Auth0はAuth0用のログイン画面を使用する必要があるため、ユーザー認証を別サーバーに構築できない。</font>**

    **<font color="Red">　ただし、データベースは独自のもの使用することは可能。</font>**

    <br>

- ネイティブアプリへのトークン発行機能（[RFC7636](https://tools.ietf.org/html/rfc7636)）が実装されていること

    <br>

    <font color="Blue">→Auth0に実装されていることを確認済み</font>

## Auth0を使用した認可サーバーの構築

Auth0はAuth0用のログイン画面を使用する必要があるが、データベースをTWG様既存のデータベースに変更することでSSOの実現が可能。

![構成](http://twg-login.se-sendai.co.jp/archive/auth0/img/1.PNG)

**特徴**

- 既存ログインサイトの改修は不要。

- 外部連携サイトが行う作業はPassportの時と変わらない。

    (認可コード要求→アクセストークン要求→ユーザー情報取得→アカウント登録またはログイン) 

- ログイン、アカウント登録ページがAuth0と既存サイトで２つずつ存在してしまう。

    ※ ただし、DBは一緒のためどちらから作成したアカウントでも両方からログイン可能。

- 既存ログインサイトとAuth0でログイン状態を共有できない。

    （既存ログインサイトでログイン　→　外部サイトへ　→　外部サイトログインページの「TWGアカウントでログイン」をクリック　→　Auth0のログインページで再度TWGアカウント情報を入力してログインする必要がある）

    <font color="Red">→上記は既存ログインサイトのユーザー認証を完全にAuth0に移行することで解決可能だが、既存サイトの改修が必要。</font>

## 12月4日時点でのAuth0調査結果まとめ

- Auth0はAuth0でのログインが必要（ユーザー認証を外部サーバーに構築できない）。

- Auth0でのログイン、アカウント登録に使用するデータベースはカスタマイズ可能（既存のDBを使用可能）。

## 参考

- https://qiita.com/furuth/items/c80be851e304baf6d1cb

- https://community.auth0.com/t/custom-database-error-mysql-is-not-a-function/21052

- https://www.it-swarm-ja.tech/ja/php/php%E3%81%A8nodejs%E3%81%AE%E9%96%93%E3%81%AEbcrypt%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%81%AE%E6%AF%94%E8%BC%83/1048788395/

## 更新履歴

- ver.0 ... 2020/12/04