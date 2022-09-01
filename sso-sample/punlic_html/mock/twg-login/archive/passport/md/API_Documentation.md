
# 餃子サークル連携ログインWebAPIドキュメント

# 認可エンドポイント [/oauth/authorize{?client_id,response_type,redirect_uri,scope}]

アクセストークンを取得するための認可コードをURLパラメーターで返します。

##  認可コードの取得 [GET]

+ Parameters
    + client_id: 57297408867 (number, required) - 発行されたクライアントID
    + response_type: `code` (string, required) - トークン発行方法（`code`を指定します。）
    + scope: `*` (string, required) - 取得したいユーザー情報
    + redirect_uri: `https://your-site.com/social_login/callback` (string, required) - クライアント作成時に指定したリダイレクトURL

+ Response

    餃子サークルサイトのログイン、連携同意画面が表示されます。
    
    ユーザーがログイン後、指定したリダイレクトURLにパラメータで結果を返します。

    + **Parameters**
    
        + **code:**     認可コード

        ---

        + **error:**    エラータイトル
        + **error_description** エラー内容
        + **hint**  エラーを解消するためのヒント
        + **message**   エラーメッセージ

    + **Example:**

    ```
    https://your-site.com/social_login/callback?code=def50200389c45c040c387a5314b9063d46ea612f5a20e2932d44e9693b6cf56c105681bb80a148279d5eff0f93009f6ad05e0bb6c7d665cd51015c0474606e25734749a15c1ff7e589efd662daa1fd9cb4456be08ead32cef7a348627356222c44d65090739bdf1d9af50cd40bf2c7d4612df6051530196c43dfa0ad21bd7ba0ce2a6594fdb90f9bff283c54ed3b4ba59d25acb284e5f9bfb600ee9d98553da0c728a0e11bf9f117ed177d2589696d3253ba445a553d5703cf74c902300874f6ff7e5fc70153e858d91ca512d7dad9e3102f337438918d6939f5e5e091feaf91951e629f4b4bf7851647c1007b92863dee61c1bde3e202fbb73973cf504904a2fdc245ff80f09b4b74afd5117c5e1d52083284e688d744c972ee7160d3bbeb91093bcb2a1c88595411faefafea6c101399aaf5281bc59f50669dda604e220a7b52e2b69d9136a6afd34c6bd6c689ea1bfbede902e6412657b9a35f82b86db9b1a810f2f2db1c5dbd646cd8cf4df5c691b908a8d
    ```

    + Body

        ・クライアント認証に成功した場合

        {
            "code":"def50200389c45c040c387a5314b9063d46ea612f5a20e2932d44e9693b6cf56c105681bb80a148279d5eff0f93009f6ad05e0bb6c7d665cd51015c0474606e25734749a15c1ff7e589efd662daa1fd9cb4456be08ead32cef7a348627356222c44d65090739bdf1d9af50cd40bf2c7d4612df6051530196c43dfa0ad21bd7ba0ce2a6594fdb90f9bff283c54ed3b4ba59d25acb284e5f9bfb600ee9d98553da0c728a0e11bf9f117ed177d2589696d3253ba445a553d5703cf74c902300874f6ff7e5fc70153e858d91ca512d7dad9e3102f337438918d6939f5e5e091feaf91951e629f4b4bf7851647c1007b92863dee61c1bde3e202fbb73973cf504904a2fdc245ff80f09b4b74afd5117c5e1d52083284e688d744c972ee7160d3bbeb91093bcb2a1c88595411faefafea6c101399aaf5281bc59f50669dda604e220a7b52e2b69d9136a6afd34c6bd6c689ea1bfbede902e6412657b9a35f82b86db9b1a810f2f2db1c5dbd646cd8cf4df5c691b908a8d"
        }

        ・許可されていないスコープ（取得するユーザー情報の項目一覧）を指定された場合

        {
            "error":"invalid_scope", 
            "error_description":"The requested scope is invalid, unknown, or malformed",
            "hint":"Check the `email` scope",
            "message":"The requested scope is invalid, unknown, or malformed"
        }


+ Response 400

    ユーザーがログイン後、クライアント認証にエラーがあった場合は、餃子サークル認可サイトにエラー内容が出力されます。

    + **Parameters**

        + **error:**    エラータイトル

        + **error_description:**    エラー内容

        + **message:**  エラーメッセージ


    + Body

        ・クライアントID、またはリダイレクトURIが登録されている情報と異なる場合

        {
            "error":"invalid_client",
            "error_description":"Client authentication failed",
            "message":"Client authentication failed"
        }

        ・許可されていないレスポンスタイプが指定された場合

        {
            "error":"unsupported_grant_type",
            "error_description":"The authorization grant type is not supported by the authorization server.",
            "hint":"Check that all required parameters have been provided",
            "message":"The authorization grant type is not supported by the authorization server."
        }

# トークンエンドポイント [/oauth/token]

ユーザー情報にアクセスするためのアクセストークンをJSON形式で返します。

## トークンの取得 [POST]

+ Request (application/json)

    + **Parameters**
        + **client_id**:    発行されたクライアントID
        + **client_secret**:    発行方法クライアントシークレットキー
        + **grant_type**:   認証方式（`authorization_code` を指定します。）
        + **redirect_uri**: クライアント作成時に指定したリダイレクトURL
        + **code**:     取得した認可コード

    + Body

        {
            "client_id": 57297408867,
            "client_secret": "92APPFrBgfb3p24yZiWiDtAf9neoz8M7iB4ZrGWd",
            "grant_type": "authorization_code",
            "redirect_uri": "https://your-site.com/social_login/callback":,
            "code": "def50200389c45c040c387a5314b9063d46ea612f5a20e2932d44e9693b6cf56c105681bb80a148279d5eff0f93009f6ad05e0bb6c7d665cd51015c0474606e25734749a15c1ff7e589efd662daa1fd9cb4456be08ead32cef7a348627356222c44d65090739bdf1d9af50cd40bf2c7d4612df6051530196c43dfa0ad21bd7ba0ce2a6594fdb90f9bff283c54ed3b4ba59d25acb284e5f9bfb600ee9d98553da0c728a0e11bf9f117ed177d2589696d3253ba445a553d5703cf74c902300874f6ff7e5fc70153e858d91ca512d7dad9e3102f337438918d6939f5e5e091feaf91951e629f4b4bf7851647c1007b92863dee61c1bde3e202fbb73973cf504904a2fdc245ff80f09b4b74afd5117c5e1d52083284e688d744c972ee7160d3bbeb91093bcb2a1c88595411faefafea6c101399aaf5281bc59f50669dda604e220a7b52e2b69d9136a6afd34c6bd6c689ea1bfbede902e6412657b9a35f82b86db9b1a810f2f2db1c5dbd646cd8cf4df5c691b908a8d"
        }

+ Response 200 (application/json)
    + **Parameters**
        + **token_type:** アクセストークンの種類
        + **expires_in:** アクセストークンの有効期限
        + **access_token:**   アクセストークン
        + **refresh_token:**  アクセストークン再発行時に使用するリフレッシュトークン

    + Body

        {
            "token_type": "Bearer",
            "expires_in": 31536000,
            "access_token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTczY2RjZjdiYjNhMzEyNjY0MWExMjVkNTMyNGEzNzFlMWQzM2FkOTNjMmQ1MmE5NzE3ZWIyZDhhYWIxNDgxYzJmNzI4MmYyYzU2ZmRmYjEiLCJpYXQiOjE2MDUxNzY3NzksIm5iZiI6MTYwNTE3Njc3OSwiZXhwIjoxNjM2NzEyNzc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RbCv5G6SbGhEPcDezw2gVyNySCg7zMNRLXsSFYq9rV0JsjSghMbI-Bsiv4kUAC2uRQ6eUlE6-PT7zTQkdpJNDbhwxHLuItTeWgKJHRaNrGrlkSQQYU-tA2Q6n13oHGDxlkC9NMSXwAPjaLURS28YkPjLj88DuQUCn0EJUU-SNBPqbGxHeam55-M6wTTpldc8Xxy3PgThH8wk6bCgrZRWsW8cOu5fzt9eMJE6PzMSVXdphYtCjyzRkbFfZgX89Og0HqnHO2hI1vDvy6CSoU6xAVpHG_VQpB0yoJt_swOEteq4oeZ0JMpC9soAJRuF_Wre4xLKs_cHOo-TB3fv9kFuChbn-WhnJguDW0slYZmLU45r8-WxSP88Y15mXRQJ7JYPbMP_PSkNnRfHVwKDe8S74Iuc3pajg0MdfnRJjd1jb3Mt9g5fTUig8hDvPAHxPH2rj_mOvMzjeFZV7P0P8K08iq7YX1f2sxoYpfwfQzwjHce71OT_Vnm9MfNiZMjTw": "Hello, world!",
            "refresh_token": "def50200dbc28fcf856258b9e34e1779d93907cc7ef7eeefbfa152b5923a3dcf47d2012864c915393b984cebf6e9f8f70636147cbaa4c3cd4e24a896a64f61f311beaab0090b845e54262bdb062a77ea212e6fdfe75ffcfe14f16b6ebe5d297e0173b86bb18fd3966f38a410c5d999936cc0b7072ee41406e81d2191fc468787b58ba1fc0a179a3b35345877aa240568928b59405c8da317869d1bc4236f111a6c157ebbed82a5864f5361557ba129e57ce11af5c70303b3b88800397effa6d7f233b4b3125f58c33461182b619275d59c9be1449364d9065dc0362491ac9696eb3a4558ddcf3a4c5be4bc5206787b956a8205b1805f1d1add957b414bb7b5c5d51060ace6246e6e089da2369bfe79e97e436c02cedc5ea1b1232a08e46cc2666ba7cbcc37d9c9a46dccdd3c787fe2053af3c9019cb913c3629b914a930986227a100d42be6de2eaf35af1f397ceeb3ba3a75a59647c3c9161aeb3be72bcfb4777"
        }


+ Response 400 (application/json)

    + **Parameters**
        + **error:**  エラータイプ
        + **error_description:**  エラー内容
        + **message:**    エラーメッセージ
    
    + Body

        ・クライアントID、クライアントシークレットキー、またはリダイレクトURLが登録されている情報と異なる場合
        {
            "error": "invalid_client",
            "error_description": "92APPFrBgfb3p24yZiWiDtAf9neoz8M7iB4ZrGWd",
            "message": "Client authentication failed"
        }

# ユーザーエンドポイント [/api/user]

餃子サークル会員サイトで持つユーザー情報をJSON形式で返します。

## ユーザー情報取得 [POST]

+ Request (application/json)

    + **Hader Parameters**
        + **Authorization:** 認証方式 アクセストークン（認証方式は`Bearer` を指定します。）

    + Headers
        
        accept: application/json
        Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTczY2RjZjdiYjNhMzEyNjY0MWExMjVkNTMyNGEzNzFlMWQzM2FkOTNjMmQ1MmE5NzE3ZWIyZDhhYWIxNDgxYzJmNzI4MmYyYzU2ZmRmYjEiLCJpYXQiOjE2MDUxNzY3NzksIm5iZiI6MTYwNTE3Njc3OSwiZXhwIjoxNjM2NzEyNzc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RbCv5G6SbGhEPcDezw2gVyNySCg7zMNRLXsSFYq9rV0JsjSghMbI-Bsiv4kUAC2uRQ6eUlE6-PT7zTQkdpJNDbhwxHLuItTeWgKJHRaNrGrlkSQQYU-tA2Q6n13oHGDxlkC9NMSXwAPjaLURS28YkPjLj88DuQUCn0EJUU-SNBPqbGxHeam55-M6wTTpldc8Xxy3PgThH8wk6bCgrZRWsW8cOu5fzt9eMJE6PzMSVXdphYtCjyzRkbFfZgX89Og0HqnHO2hI1vDvy6CSoU6xAVpHG_VQpB0yoJt_swOEteq4oeZ0JMpC9soAJRuF_Wre4xLKs_cHOo-TB3fv9kFuChbn-WhnJguDW0slYZmLU45r8-WxSP88Y15mXRQJ7JYPbMP_PSkNnRfHVwKDe8S74Iuc3pajg0MdfnRJjd1jb3Mt9g5fTUig8hDvPAHxPH2rj_mOvMzjeFZV7P0P8K08iq7YX1f2sxoYpfwfQzwjHce71OT_Vnm9MfNiZMjTw-57LYV0w4cEmzxBZw_h-o-skbYZvHPJOVxFnnmhcpCkhp-zsxzeId4Q44A6Z2qh8dxE7zkTRxL0ShJaXIAwSRt3TIalrbR35Uv3C4m0fwv0mGDigwa3L75JltVLBpENs0hMw-Uca9wDkiZtpsWsu2bRgeKKh7LM4XI3aSw1ivsJ6rE

+ Response 200 (application/json)

    + **Parameters**
        + **id:**   ユーザーID
        + **name:** ユーザー名
        + **email:**    メールアドレス
        + **email_verified_at:**    メールアドレス確認日時
        + **created_at:**   ユーザー登録日時
        + **updated_at:**   ユーザー情報更新日時

    + Body

        {
            "id": 355,
            "name": "鈴木 太郎",
            "email": "taro@suzuki.com",
            "email_verified_at": "null",
            "created_at": "2020-11-18T00:31:07.000000Z",
            "updated_at": "2020-11-18T00:31:07.000000Z"
        }

+ Response 400 (application/json)

    + **Parameters**
        + **message:**  エラーメッセージ

    + Body

        ・アクセストークンの認証に失敗した場合
        
        {
            "message":"Unauthenticated."
        }
