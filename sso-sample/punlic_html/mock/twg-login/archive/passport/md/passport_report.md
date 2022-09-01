# Laravel Passportによる認可サーバー構築 

## 目的

既存サイトにソーシャルログイン形式のSSOを実装するため、Laravel-Passportを使用して認可サーバーおよびリソースサーバーを構築する。

Passportで今回の要件を満たす認可サーバーの構築が可能か調査する。

## 仕様（全体）

- **<font color="Red">認可サーバー（新規）</font>** ... ユーザー毎、連携サイト毎のアクセストークンを発行するサーバー

- **<font color="Red">リソースサーバー（新規）</font>**  ... アクセストークンを解析し、TWG様既存サイトのアカウント情報を提供するサーバー

- **認証サーバー（既存）**... ユーザーがログインし、認証を行うサーバー（TWG様既存サイト）

- **外部サーバー（既存）**... TWG様既存サイトのアカウント情報を使用したSSOを実装するサーバー

![全体図](http://twg-login.se-sendai.co.jp/archive/passport/img/diagram.png)

## 認可・リソースサーバーで満たすべき要件

- ユーザー認証（ログイン）は別サーバーで行うため、別サーバーのユーザーIDと紐づけたアクセストークンの発行が可能であること（セキュアにIDを受け渡せる機能が実装されていることが理想）

- ネイティブアプリへのトークン発行機能（[RFC7636](https://tools.ietf.org/html/rfc7636)）が実装されていること

- リソースサーバー（ユーザー情報を提供するAPI）は認可サーバーと別に構築が可能であること

### Passportで可能なアクセストークン発行方法

- **OAuth2 with authorization codes (Auth Code)**

    ユーザー認証後、アクセストークン取得を許可する認可コードを発行し、アクセストークンを発行する。SNS認証でよく使用される発行方法であり、OAuth推奨。連携同意確認画面あり。

    <br>
    <font color="Red">
    **→ 今回実現したいトークン発行方法。ただし、Passportは認可サーバー上でユーザー認証（ログイン）することを前提としたつくりになっているため、認証を別サーバーに構築可能か検証する。**
    </font>
    <br>
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

    **→ 今回の要件にはそぐわないため調査対象外とする。。**


## 認可サーバーの実装

### 認証サーバー（TWG様ログインサイト）とのユーザーIDの紐づけ方法

1. 認証サーバーDBに登録済みのユーザーIDをCSV出力し、認可サーバーDBに登録する。

1. 以降認証サーバーでユーザー新規登録された場合は、認可サーバーDBにもユーザーIDを登録する。

1. 認証サーバーから認可コードリクエストを送る際には、URLパラメーターにユーザーIDを付加し、どのユーザーからの連携リクエストか特定する。

    <font color="red">
    ※ 現段階では一連の動作検証を行えれば良いため、上記の仕様で実装。今後、セキュアなユーザーIDの受け渡し方法の調査が必要。
    </font>

![フロー](http://twg-login.se-sendai.co.jp/archive/passport/img/passport_authorization.png)

### 環境構築

下記参照

http://twg-login.se-sendai.co.jp/archive/passport/environment_authorization.html

- 検証用：認証サーバー（TWG様既存ログインサイト）

    動作検証のためLaravelで別プロジェクトを作成し、ログイン機能を実装したサイトを用意。

### プログラム修正

**認可サーバー**

- 認可コードリクエスト受信時、未ログインの場合は認証サーバーのログインページ(http://passport-login.comee.ml/login)へリダイレクトする。
    <br>

    <font color="blue">
    **→実装済み**
    </font>
    <br>

- 認証サーバーでログイン後、再度送られてくる認可コードリクエストのURLパラメータからuser_idを取得する。
    <br>

    <font color="blue">
    **→実装済み**
    </font>
    <br>

- 取得した認証サーバーのユーザーIDと、自サーバーDBのユーザーIDはすでに紐づけられているため、自サーバーでも強制的にログイン状態（ユーザーIDをセッションに保存）にする。
    ※Passportが自サーバーでのログインを前提とした作りになっているため、強制的にログイン状態にすることで修正範囲が最小限に抑えられる。認証自体は別サーバーでユーザー自身にID,パスワードを入力してもらっているため、認可サーバーではIDのみの強制ログインで問題なし。
    <br>

    <font color="blue">
    **→実装済み**
    </font>
    <br>

**認証サーバー**

- ユーザー新規登録後、認可サーバーDBに接続してユーザーIDをusersテーブルに登録する。

    <font color="red">
    **→未実装**
    </font>
    <br>

- ユーザー認証リクエスト（ログインページアクセス）受信時、URLパラメーターを確認し、通常ログインか外部連携ログイン要求かを判定する。

    <br>

    <font color="blue">
    **→実装済み**
    </font>
    <br>

- 外部連携ログイン要求の場合、ログイン完了後、認可サーバーに認可コードリクエスト（`http://passport-authorization.comee.ml/oauth/authorize?client_id={clientID}&response_type=code&scope=*&user_id={userID}&redirect_uri=http://passport-outer.comee.ml/sso-login/callback`）を送信する。

    <font color="blue">
    **→実装済み**
    </font>
    <br>

### リクエスト・レスポンス確認

- **外部連携ログイン要求**

    - <font color="Gray">*Request*</font>

        外部サイトから「餃子サークル会員でログイン」ボタンをクリックして下記URLへアクセスする。

        http://passport-authorization.comee.ml/oauth/authorize?client_id=2&response_type=code&scope=*&redirect_uri=http://passport-outer.comee.ml/sso-login/callback

    - <font color="Gray">*Response*</font>

        認証サーバー（TWG様既存ログインサイト）のログイン画面が表示される。

        ![ログイン画面](http://twg-login.se-sendai.co.jp/archive/passport/img/login.PNG)

- **認可コードリクエスト**

    認証サーバーでログイン後、ユーザーIDを付加して下記URLへリダイレクトする。

    - <font color="Gray">*Request*</font>

        http://passport-authorization.comee.ml/oauth/authorize?client_id=2&response_type=code&scope=*&redirect_uri=http://passport-outer.comee.ml/sso-login/callback&user_id=1

    - <font color="Gray">*Response*</font>

        認可サーバーの連携同意画面が表示される。

        ![連携同意画面](http://twg-login.se-sendai.co.jp/archive/passport/img/agree.PNG)

        同意後↓

        - 成功時

            URLパラメータに認可コードを付加した状態で、外部連携サイトにリダイレクトされる。

            `http://passport-outer.comee.ml/sso-login/callback?code=def50200df26447a5d80d051e7c737d58824386b44513c0dac9787c66922a9288c03c9fad34608080a74fc2dbd81f1599267b53a35f9bdebaff4286a35a495f2cd94784c695c43c3a8386085c87ca7ad7d6a9ab4997b923d9e549b7b26063d7abc2aade1e77dd41bfe6cabc12361285468f4d5e854fdc35fabfc362c92a43f4b8078a08c6d520f1ce9df346c241bd68882c15853d44e0dd23c2443f8cf212dc430267dc7dc3a31d13dadc5a60b4a7f36807660639c030505ddfe86d5276b741f2dd2368ef6313a347384d4024a344257fef2b1723eb1732a0365b28cc54f4e6a9f63a9f5704ff81ab251f5b3ebb16939ce84664316fba4393fd1a65950e9a3ce4c51da2923cab650a70a4ba1ab8f79281c7e1e706b9b497849af14f7465051b5a1b4f591b46af91a4dd60bab69e46977dae37dc18443e99fb4e22015f29b21093dbde577b15840c0d9bf2a8b7df2df0f782cf79a5047e10fc8172eb9d48f01a03b679d44ff87066241e2b10913bd2c9a44c42f6392`

        - 失敗時

            認可サーバー上にエラー内容が出力される。
        
            ![認証エラー11](http://twg-login.se-sendai.co.jp/archive/passport/img/code_error.PNG)

- **アクセストークンリクエスト**

    - <font color="Gray">*Request*</font>

        認可コードを受け取った外部連携サイトが、下記を実行してアクセストークンを取得する。

        ```
        curl http://passport-authorization.comee.ml/oauth/token ^
            -d grant_type=authorization_code ^
            -d client_id=2 ^
            -d client_secret=749WEYjBzx5MxDFqqNeWX94vX3qGB2xSpzJSqBch ^
            -d redirect_uri=http://passport-outer.comee.ml/sso-login/callback ^
            -d code=def50200df26447a5d80d051e7c737d58824386b44513c0dac9787c66922a9288c03c9fad34608080a74fc2dbd81f1599267b53a35f9bdebaff4286a35a495f2cd94784c695c43c3a8386085c87ca7ad7d6a9ab4997b923d9e549b7b26063d7abc2aade1e77dd41bfe6cabc12361285468f4d5e854fdc35fabfc362c92a43f4b8078a08c6d520f1ce9df346c241bd68882c15853d44e0dd23c2443f8cf212dc430267dc7dc3a31d13dadc5a60b4a7f36807660639c030505ddfe86d5276b741f2dd2368ef6313a347384d4024a344257fef2b1723eb1732a0365b28cc54f4e6a9f63a9f5704ff81ab251f5b3ebb16939ce84664316fba4393fd1a65950e9a3ce4c51da2923cab650a70a4ba1ab8f79281c7e1e706b9b497849af14f7465051b5a1b4f591b46af91a4dd60bab69e46977dae37dc18443e99fb4e22015f29b21093dbde577b15840c0d9bf2a8b7df2df0f782cf79a5047e10fc8172eb9d48f01a03b679d44ff87066241e2b10913bd2c9a44c42f6392
        ```

    - <font color="Gray">*Response*</font>

        ```
        {
            "token_type":"Bearer",
            "expires_in":31536000,
            "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTczY2RjZjdiYjNhMzEyNjY0MWExMjVkNTMyNGEzNzFlMWQzM2FkOTNjMmQ1MmE5NzE3ZWIyZDhhYWIxNDgxYzJmNzI4MmYyYzU2ZmRmYjEiLCJpYXQiOjE2MDUxNzY3NzksIm5iZiI6MTYwNTE3Njc3OSwiZXhwIjoxNjM2NzEyNzc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RbCv5G6SbGhEPcDezw2gVyNySCg7zMNRLXsSFYq9rV0JsjSghMbI-Bsiv4kUAC2uRQ6eUlE6-PT7zTQkdpJNDbhwxHLuItTeWgKJHRaNrGrlkSQQYU-tA2Q6n13oHGDxlkC9NMSXwAPjaLURS28YkPjLj88DuQUCn0EJUU-SNBPqbGxHeam55-M6wTTpldc8Xxy3PgThH8wk6bCgrZRWsW8cOu5fzt9eMJE6PzMSVXdphYtCjyzRkbFfZgX89Og0HqnHO2hI1vDvy6CSoU6xAVpHG_VQpB0yoJt_swOEteq4oeZ0JMpC9soAJRuF_Wre4xLKs_cHOo-TB3fv9kFuChbn-WhnJguDW0slYZmLU45r8-WxSP88Y15mXRQJ7JYPbMP_PSkNnRfHVwKDe8S74Iuc3pajg0MdfnRJjd1jb3Mt9g5fTUig8hDvPAHxPH2rj_mOvMzjeFZV7P0P8K08iq7YX1f2sxoYpfwfQzwjHce71OT_Vnm9MfNiZMjTw-57LYV0w4cEmzxBZw_h-o-skbYZvHPJOVxFnnmhcpCkhp-zsxzeId4Q44A6Z2qh8dxE7zkTRxL0ShJaXIAwSRt3TIalrbR35Uv3C4m0fwv0mGDigwa3L75JltVLBpENs0hMw-Uca9wDkiZtpsWsu2bRgeKKh7LM4XI3aSw1ivsJ6rE",
            "refresh_token":"def50200dbc28fcf856258b9e34e1779d93907cc7ef7eeefbfa152b5923a3dcf47d2012864c915393b984cebf6e9f8f70636147cbaa4c3cd4e24a896a64f61f311beaab0090b845e54262bdb062a77ea212e6fdfe75ffcfe14f16b6ebe5d297e0173b86bb18fd3966f38a410c5d999936cc0b7072ee41406e81d2191fc468787b58ba1fc0a179a3b35345877aa240568928b59405c8da317869d1bc4236f111a6c157ebbed82a5864f5361557ba129e57ce11af5c70303b3b88800397effa6d7f233b4b3125f58c33461182b619275d59c9be1449364d9065dc0362491ac9696eb3a4558ddcf3a4c5be4bc5206787b956a8205b1805f1d1add957b414bb7b5c5d51060ace6246e6e089da2369bfe79e97e436c02cedc5ea1b1232a08e46cc2666ba7cbcc37d9c9a46dccdd3c787fe2053af3c9019cb913c3629b914a930986227a100d42be6de2eaf35af1f397ceeb3ba3a75a59647c3c9161aeb3be72bcfb4777"}
        ```

        ※ 取得したアクセストークンを[トークン解析Webアプリ](https://jwt.io/) を使用して確認したところ、ユーザーIDに紐づいたアクセストークンが発行されていることが確認できた。

        ```
        {
            "aud": "2",
            "jti": "973cdcf7bb3a3126641a125d5324a371e1d33ad93c2d52a9717eb2d8aab1481c2f7282f2c56fdfb1",
            "iat": 1605176779,
            "nbf": 1605176779,
            "exp": 1636712779,
            "sub": "1",
            "scopes": []
        }
        ```
        
        ※ sub = user id (OAuth仕様)

            

## リソースサーバーの実装

認可サーバーとは別のLaravelプロジェクトを作成して別サーバーとして構築する。

データベースは認証サーバー（TWG様既存ログインサイト）に接続する。

### 環境構築

調査中。

認可サーバーと同じように環境構築すると、アクセストークンを管理する認可サーバーとして機能してしまう。（データベース構造も認可サーバー仕様になる）

リソースサーバー用のパッケージはPassportでは提供されていない？（Laravel Authleteでは認可サーバー用とリソースサーバー用のパッケージを別でインストールできたが、Passportは認証、認可、リソースがすべて1つになっている）

### プログラム修正

調査中。

## 11月13日時点でのPassport調査結果まとめ

- Laravel Passportは自サーバー内でログイン認証することを前提としているため、別サーバーでのログインに対応させるには想定以上に改修が必要そうな印象。

- Passportを使用する・しないに関わらず、現在のサーバー構成（認可サーバーと認証サーバーが別）では、ログイン後、認可サーバーにユーザーIDを安全に渡す実装が必要。

## 今後の課題

**優先度：高**

- 要件を再度確認する。

    → 認証（ログイン）サーバーと認可サーバーを分ける必要があるかどうか。

    **既存ログインサイトのサーバー上（同一ドメイン上）に、ディレクトリで分けて認可サーバーを構築してよいのであれば、別サーバーにセキュアにユーザーIDを渡す実装が不要になるため、サーバーを分けるより構築しやすい。（ディレクトリで分けるため既存のプログラムに影響はない）**

- 認可と認証（ログイン）サーバーを別で構築しやすいオープンソースがないか調査。

    → PassportよりはKeycloakの方が今回のサーバー構成に合っている可能性がある。

    

**優先度：低**

- Yahoo!やGithub等、ソーシャルログインプロバイダーのサーバー構成を確認。

    認可とリソースサーバーを分けていないのでは？（アクセストークンリクエストとユーザー情報リクエスト先のドメインが同じ）

    PassportやAuthleteで認可サーバーを構築したところ、ユーザーエンドポイント（ユーザー情報を返すAPI）が一緒に実装されていたため。認可サーバーとリソースサーバーを分ける明確な理由がないのであれば、１つのサーバー（データベースは分けるが、プログラムは１つ）で提供した方がメンテナンスしやすいのでは？

- アクセストークンの有効期限が切れた場合のフローの確認。（外部連携サイト側で対応が必要？）