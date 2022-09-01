# Laravel Passportによる認可サーバー構築 ver.2.0

## はじめに

本文書は[前回のレポート](http://twg-login.se-sendai.co.jp/archive/passport/passport_report.html)のアップデート版です。

[仕様（全体）](http://twg-login.se-sendai.co.jp/archive/passport/passport_report_v2.0.html#header-仕様（全体）)、[認可・リソースサーバーで満たすべき要件](http://twg-login.se-sendai.co.jp/archive/passport/passport_report_v2.0.html#header-認可・リソースサーバーで満たすべき要件)の項目で、前回から変更があった個所には取り消し線及び緑文字で修正内容を記載しています。

今回作成したモックは下記URLで公開しています。

- 外部サイト ... http://sample-site-a.comee.ml

- ログインサイト ... http://passport-login-sample.comee.ml

- 認可サイト ... http://passport-auth-sample.comee.ml


## 目的

既存サイトにソーシャルログイン形式のSSOを実装するため、Laravel-Passportを使用して認可サーバーおよびリソースサーバーを構築する。

Passportで今回の要件を満たす認可サーバーの構築が可能か調査する。

## 仕様（全体）

- ~~**<font color="Red">認可サーバー（新規）</font>** ... ユーザー毎、連携サイト毎のアクセストークンを発行するサーバー~~

- ~~**<font color="Red">リソースサーバー（新規）</font>**  ... アクセストークンを解析し、TWG様既存サイトのアカウント情報を提供するサーバー~~

- **<font color="green">認可・リソースサーバー（新規）** ... ユーザー毎、連携サイト毎のアクセストークンの管理、及びアクセストークン制限付きのユーザー情報返却APIを備えたサーバー</font>

- **認証サーバー（既存）**... ユーザーがログインし、認証を行うサーバー（TWG様既存サイト）

- **外部サーバー（既存）**... TWG様既存サイトのアカウント情報を使用したSSOを実装するサーバー

![全体図](http://twg-login.se-sendai.co.jp/archive/passport/img/diagram_20201118.png)

## 認可・リソースサーバーで満たすべき要件

- ~~ユーザー認証（ログイン）は別サーバーで行うため、別サーバーのユーザーIDと紐づけたアクセストークンの発行が可能であること（セキュアにIDを受け渡せる機能が実装されていることが理想）~~

- <font color="green">ユーザー認証は同一ドメインの別サイトで行うため、ログインサイトとセッションを共有できること</font>

- ネイティブアプリへのトークン発行（[RFC7636](https://tools.ietf.org/html/rfc7636)）が実装されていること

- ~~リソースサーバー（ユーザー情報を提供するAPI）は認可サーバーと別に構築が可能であること~~

### Passportで可能なアクセストークン発行方法

- **OAuth2 with authorization codes (Auth Code)**

    ユーザー認証後、アクセストークン取得を許可する認可コードを発行し、アクセストークンを発行する。SNS認証でよく使用される発行方法であり、OAuth推奨。連携同意確認画面あり。

    <br>

    **<font color="Red">→ 今回実現したいトークン発行方法。ただし、Passportは認可サーバー上でユーザー認証（ログイン）することを前提としたつくりになっているため、認証を別サーバーに構築可能か検証する。</font>**
    
    <br>

- **Implicit Grant Token**

    上記 authorization codesの認可コード発行なしバージョン。ダイレクトにアクセストークンを返す（リダイレクトURLにフラグメントとして付加する形式）[1]。クライアントシークレットキーを使用しないクライアント認証。

    [1]:例：http://outer.com/sso-login/callback#access_token=kfmndfasdyhkj・・・

    <br>
    
    **→ authorization codesよりセキュリティが弱く、OAuthでも推奨されていないため、今回の調査対象から除外する。**

    <br>

- **Password Grant Token**

    上記 authorization codesやImplicit Grant Tokenのようにユーザー認証後にアクセストークンを要求するのではなく、アクセストークン要求時に同時にユーザー認証を行う。認可コードを発行せず、ダイレクトにアクセストークンを返す。連携確認画面なし。

    <br>

    **→ 今回の要件にはそぐわないため調査対象外とする。**

    <br>

- **Client Credentials Grant Token**

    ユーザー認証を行わず、クライアント認証のみでアクセストークンを発行する。マシン間通信向け。認可コード発行なし。連携確認画面なし。リフレッシュトークンなし。

    <br>

    **→ 別サーバーでユーザー認証後に、ユーザーIDを渡してこの手順を実行することで要件を満たせる可能性があるが、認可コード・連携確認画面・リフレッシュトークンがなく、改修に時間を要するため現段階では調査対象外とする。**

    <br>

- **Personal Access Token**

    通常のトークン発行フローを使用せずに、ログインしたユーザーがアプリケーションのUIを介して自分自身にアクセストークンを発行する。開発段階等でよく使用される。

    <br>

    **→ 今回の要件にはそぐわないため調査対象外とする。**


## Passportを使用したSSOモックの構築手順

### 外部連携サイト (http://sample-site-a.comee.ml)

連携ログインを実装するサイトのサンプルをCakePHP3で構築する。

- ComposerでCakePHP3プロジェクトを作成。

- ログインページに「Passport Sample Login」ボタンを追加。

    - リンク先：認可エンドポイント（`http://passport-auth-sample.comee.ml/oauth/authorize`）

- 認可コード要求後にリダイレクトで呼び出される関数を作成。

    - urlパラメータから認可コードを取得。

    - 認可コードをcurlでpost送信し、アクセストークンを取得。

        - 送信先：トークンエンドポイント（`http://passport-auth-sample.comee.ml/oauth/token`）

    - アクセストークンをcurlでpostし、ユーザー情報を取得。

        - 送信先：ユーザーエンドポイント（`http://passport-auth-sample.comee.ml/api/user`）

    - 取得したユーザー情報のemailで、登録済みユーザーか確認。

        - 未登録のユーザーの場合、passwordを自動生成してユーザー登録。

    - ユーザーをログイン状態にする。

### ログインサイト（http://passport-login-sample.comee.ml）

既存ログインサイトのサンプルをLaravel7で構築する。

ユーザーのログイン状況を認可サーバーと共有するため、セッション保存方法をデータベースに変更する。

参考：https://qiita.com/mgmgmogumi/items/a6a39aad036b395702c5

セッション保存方法の変更以外は特に変更なく、通常のログイン機能を持ったサイトとして構築。（詳細は[Laravel Passportによる認可サーバーの環境構築手順 ver.2.0](http://twg-login.se-sendai.co.jp/archive/passport/environment_authorization_v2.0.html)を参照）

### 認可・リソースサイト（http://passport-auth-sample.comee.ml）

認可・リソースサーバーをLaravel Passportを使用して構築する。

ユーザーのログイン状況を認可サーバーと共有するため、セッション保存方法をデータベースに変更する。

参考：https://qiita.com/mgmgmogumi/items/a6a39aad036b395702c5

詳細な構築方法は[Laravel Passportによる認可サーバーの環境構築手順 ver.2.0](http://twg-login.se-sendai.co.jp/archive/passport/environment_authorization_v2.0.html)を参照。

## リクエスト・レスポンス確認

### 認可コードリクエスト

#### <font color="Gray">*Request*</font>

[外部サイト](http://sample-site-a.comee.ml)の「Passport Sample Login」ボタンをクリックして認可コードリクエストを送る。

```
http://passport-auth-sample.comee.ml/oauth/authorize?client_id=1&response_type=code&scope=*&redirect_uri=http://passport-outer.comee.ml/passport-login-callback
```

#### <font color="Gray">*Response*</font>

認証サイトのログイン画面が表示される。

![ログイン画面](http://twg-login.se-sendai.co.jp/archive/passport/img/login2.PNG)

↓

ログイン後

- 失敗時（クライアントIDが不正等）

    認可サイト上にエラーが出力される。

    ![認可コードリクエストエラー画面](http://twg-login.se-sendai.co.jp/archive/passport/img/code_error2.PNG)

- 成功時

    認可サイトの連携同意確認画面が表示される。

    ![連携同意確認画面](http://twg-login.se-sendai.co.jp/archive/passport/img/agree2.PNG)

    ↓

    連携同意、またはキャンセルボタンクリック後

    認可コードリクエスト結果をURLパラメータに付加して外部サイトへリダイレクト

    - 連携同意キャンセル時

        ```
        http://sample-site-a.comee.ml/sso-login-callback?error=access_denied&state=
        ```
        
    - 連携同意許可時

        ```
        http://sample-site-a.comee.ml/sso-login/callback?code=def50200389c45c040c387a5314b9063d46ea612f5a20e2932d44e9693b6cf56c105681bb80a148279d5eff0f93009f6ad05e0bb6c7d665cd51015c0474606e25734749a15c1ff7e589efd662daa1fd9cb4456be08ead32cef7a348627356222c44d65090739bdf1d9af50cd40bf2c7d4612df6051530196c43dfa0ad21bd7ba0ce2a6594fdb90f9bff283c54ed3b4ba59d25acb284e5f9bfb600ee9d98553da0c728a0e11bf9f117ed177d2589696d3253ba445a553d5703cf74c902300874f6ff7e5fc70153e858d91ca512d7dad9e3102f337438918d6939f5e5e091feaf91951e629f4b4bf7851647c1007b92863dee61c1bde3e202fbb73973cf504904a2fdc245ff80f09b4b74afd5117c5e1d52083284e688d744c972ee7160d3bbeb91093bcb2a1c88595411faefafea6c101399aaf5281bc59f50669dda604e220a7b52e2b69d9136a6afd34c6bd6c689ea1bfbede902e6412657b9a35f82b86db9b1a810f2f2db1c5dbd646cd8cf4df5c691b908a8d
        ```

### **アクセストークンリクエスト**

#### <font color="Gray">*Request*</font>

認可コードを受け取った外部連携サイトが、下記を実行してアクセストークンリクエストを送る。

```
curl http://passport-authorization.comee.ml/oauth/token ^
    -d grant_type=authorization_code ^
    -d client_id=1 ^
    -d client_secret=92APPFrBgfb3p24yZiWiDtAf9neoz8M7iB4ZrGWd ^
    -d redirect_uri=http://passport-outer.comee.ml/passport-login-callback ^
    -d code=def50200df26447a5d80d051e7c737d58824386b44513c0dac9787c66922a9288c03c9fad34608080a74fc2dbd81f1599267b53a35f9bdebaff4286a35a495f2cd94784c695c43c3a8386085c87ca7ad7d6a9ab4997b923d9e549b7b26063d7abc2aade1e77dd41bfe6cabc12361285468f4d5e854fdc35fabfc362c92a43f4b8078a08c6d520f1ce9df346c241bd68882c15853d44e0dd23c2443f8cf212dc430267dc7dc3a31d13dadc5a60b4a7f36807660639c030505ddfe86d5276b741f2dd2368ef6313a347384d4024a344257fef2b1723eb1732a0365b28cc54f4e6a9f63a9f5704ff81ab251f5b3ebb16939ce84664316fba4393fd1a65950e9a3ce4c51da2923cab650a70a4ba1ab8f79281c7e1e706b9b497849af14f7465051b5a1b4f591b46af91a4dd60bab69e46977dae37dc18443e99fb4e22015f29b21093dbde577b15840c0d9bf2a8b7df2df0f782cf79a5047e10fc8172eb9d48f01a03b679d44ff87066241e2b10913bd2c9a44c42f6392
```

#### <font color="Gray">*Response*</font>

- 成功時

    ```
    {
        "token_type":"Bearer",
        "expires_in":31536000,
        "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTczY2RjZjdiYjNhMzEyNjY0MWExMjVkNTMyNGEzNzFlMWQzM2FkOTNjMmQ1MmE5NzE3ZWIyZDhhYWIxNDgxYzJmNzI4MmYyYzU2ZmRmYjEiLCJpYXQiOjE2MDUxNzY3NzksIm5iZiI6MTYwNTE3Njc3OSwiZXhwIjoxNjM2NzEyNzc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RbCv5G6SbGhEPcDezw2gVyNySCg7zMNRLXsSFYq9rV0JsjSghMbI-Bsiv4kUAC2uRQ6eUlE6-PT7zTQkdpJNDbhwxHLuItTeWgKJHRaNrGrlkSQQYU-tA2Q6n13oHGDxlkC9NMSXwAPjaLURS28YkPjLj88DuQUCn0EJUU-SNBPqbGxHeam55-M6wTTpldc8Xxy3PgThH8wk6bCgrZRWsW8cOu5fzt9eMJE6PzMSVXdphYtCjyzRkbFfZgX89Og0HqnHO2hI1vDvy6CSoU6xAVpHG_VQpB0yoJt_swOEteq4oeZ0JMpC9soAJRuF_Wre4xLKs_cHOo-TB3fv9kFuChbn-WhnJguDW0slYZmLU45r8-WxSP88Y15mXRQJ7JYPbMP_PSkNnRfHVwKDe8S74Iuc3pajg0MdfnRJjd1jb3Mt9g5fTUig8hDvPAHxPH2rj_mOvMzjeFZV7P0P8K08iq7YX1f2sxoYpfwfQzwjHce71OT_Vnm9MfNiZMjTw-57LYV0w4cEmzxBZw_h-o-skbYZvHPJOVxFnnmhcpCkhp-zsxzeId4Q44A6Z2qh8dxE7zkTRxL0ShJaXIAwSRt3TIalrbR35Uv3C4m0fwv0mGDigwa3L75JltVLBpENs0hMw-Uca9wDkiZtpsWsu2bRgeKKh7LM4XI3aSw1ivsJ6rE",
        "refresh_token":"def50200dbc28fcf856258b9e34e1779d93907cc7ef7eeefbfa152b5923a3dcf47d2012864c915393b984cebf6e9f8f70636147cbaa4c3cd4e24a896a64f61f311beaab0090b845e54262bdb062a77ea212e6fdfe75ffcfe14f16b6ebe5d297e0173b86bb18fd3966f38a410c5d999936cc0b7072ee41406e81d2191fc468787b58ba1fc0a179a3b35345877aa240568928b59405c8da317869d1bc4236f111a6c157ebbed82a5864f5361557ba129e57ce11af5c70303b3b88800397effa6d7f233b4b3125f58c33461182b619275d59c9be1449364d9065dc0362491ac9696eb3a4558ddcf3a4c5be4bc5206787b956a8205b1805f1d1add957b414bb7b5c5d51060ace6246e6e089da2369bfe79e97e436c02cedc5ea1b1232a08e46cc2666ba7cbcc37d9c9a46dccdd3c787fe2053af3c9019cb913c3629b914a930986227a100d42be6de2eaf35af1f397ceeb3ba3a75a59647c3c9161aeb3be72bcfb4777"
    }
    ```

- 失敗時

    ```
    {
        "error":"invalid_client",
        "error_description":"Client authentication failed",
        "message":"Client authentication failed"
    }
    ```

### ユーザー情報リクエスト

#### <font color="Gray">*Request*</font>

アクセストークンを受け取った外部サイトが、下記を実行してユーザー情報リクエストを送る。

```
curl http://passport-auth-sample.comee.ml/api/user ^
	-H "accept: application/json" ^
	-H "Content-type: application/json" ^
	-H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWI0ZTRlMTEyOWQxMWYxMmQ1NGY5ZjgxN2NhZWY4NTkwNGYwY2YxZTA1NGY5ODkxNzZiYjg1YWRhNmMzMDU3MTljYTBjYTc1YzYwOGFjZWQiLCJpYXQiOjE2MDU2NjcxNjUsIm5iZiI6MTYwNTY2NzE2NSwiZXhwIjoxNjM3MjAzMTY1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.qMaB0peD9eJinYU-fYL17ulvnE1zN_jLXQ5DGmaKzH03dX1061CmCPuC1u8nTr7kZdijX-b0O5qixzQQzSvAJOylL1v81vBqt5DZR6XwgrGMd8WkhZJQN-1FDGC48d9t4sh6mjtxh4ZXThcJajVGQvPk7DhDP0sDgvFbI8cK1sqDwKaJ4rn8gJQcOGOSPweiC7mCG_OzL3d_LlLhGzi8sHwglVeAdYjN21gpqR604nr4dMgU4Yugha5MMLS3i9PQnwwgUpSEVb_sNGe7eUExVA9Pzg5Wom14TCIFQ8cgwVMawLSWBACMCe-4ft08xAo-Ar2UKIAfiemlld3ImymRcCJ6ysox-3_9nWTOIUpIGsxAvhVOsoUIzYTMxhvlnMDrr6Sra1z7bk0DMB7UU4anTNYaeNF4zcr7-66Q2PqXqaVFi-7PvGaS_mkeQxhm-ruegoeMNtxDXVowGt-x3T3EgeXv8jpKM1oKSlGLQY-lwObBA7TwwCg5uAS-MLZN5xea_XVlGdD5FIsBecxYXBCItUGgQjY011OpYSjfp3jh14naEEIjxFkrYAuTTs6tTyBRvJGgaT4UrUbjPAXmVdhIDqo7Bvofyt9V-jjF_1sYa8hZISnUGkO91t5UGcD9C6h_FmqGg8I7l5d4DlZ3I_ViHzKqYHs36eSqJ1_rz6RAnv0"
```

#### <font color="Gray">*Response*</font>

- 成功時

    ```
    {
        "id":1,
        "name":"test",
        "email":"test@test.com",
        "email_verified_at":null,
        "created_at":"2020-11-18T00:31:07.000000Z",
        "updated_at":"2020-11-18T00:31:07.000000Z"
    }
    ```

- 失敗時

    ```
    {
        "message":"Unauthenticated."
    }
    ```

## 11月19日時点でのPassport調査結果まとめ

- Laravel Passportは、既存のログインサイトとセッション（ユーザーのログイン状況）及びデータベースを共有することで、今回の要件を満たす認可サーバーの構築が可能。

- 検証は未実施だが、PECKを使った認可コードリクエスト（[RFC7636](https://tools.ietf.org/html/rfc7636)）が実装されているため、ネイティブアプリからのSSOログイン要求にも対応可能と思われる。（参考：https://readouble.com/laravel/7.x/ja/passport.html　「PKCEを使った認可コードグラント」）

- Laravel Authleteのように、管理者がクライアント（外部サイト）を登録、編集するページは初期実装にないため、新規で作成する必要がある。（初期はコマンドラインでクライアントを新規作成することしかできない。）

## 今後の課題

1. Passportにおけるscope(アクセス権があるユーザー情報の項目/例：email, address, etc...)の使用方法の調査。

1. アクセストークンの有効期限が切れた場合の再発行手順（リフレッシュトークンの使用方法）の調査。

1. PECKを使った認可コードリクエスト（ネイティブアプリからのログイン要求時）の手順の調査

