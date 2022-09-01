# AWS cognite 調査結果 ver.1.0

## congniteとは

Amazon Cognito は、ウェブアプリケーションやモバイルアプリケーションの認証、許可、ユーザー管理をサポートするサービス。

Amazon CognitoにはユーザープールとIDプールという2つのプールがある。
ユーザープールは、アプリユーザーのサインアップとサインインオプションを提供するユーザーディレクトリ。
ID プールは、AWS の他のサービスに対するアクセスをユーザーに許可する（今回の要件では使用しない）。

## 料金形態

5万MAUまで無料。
5万～10万MAU：0.0055USD/1MAU

データベースの移行にLambdaサービスを使用する場合は別料金が発生。([料金形態](https://aws.amazon.com/jp/lambda/pricing/))
パスワードリセットや多要素認証のコード送信にSMSを使用する場合は別料金が発生。

*参考：*

- https://aws.amazon.com/jp/cognito/pricing/

- https://aws.amazon.com/jp/cognito/faqs/

##  ユーザデータの移行

cognitoはAuthleteのように外部データベースのユーザテーブルを使用して認可サーバーを構築できないため、既存ユーザデータを移行する必要がある。

既存ユーザデータの移行方法は以下の２通り。

- ユーザープロファイル属性を含む CSV ファイルをアップロードして、ユーザーを一括で移行する。

    ※ ユーザにパスワードを再設定してもらう必要がある。

- ユーザーが Amazon Cognito を使用して初めてサインインするときに、ユーザー移行 Lambda トリガーを使用して、ユーザーを移行する。

    ※ 既存のパスワードを引き続き使用できる。

データ移行方法については現在調査中。

*参考：*

- https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/cognito-user-pools-import-users.html

- https://logmi.jp/tech/articles/321257#s8


## ユーザープール作成手順

https://qiita.com/saki-engineering/items/b327f93fe7f027913bd7

※ ユーザデータ移行方法については調査中。

## サインイン、サインアップページカスタイマイズ

AWSコンソールからサインインページのCSSは変更できるが、新規登録がないようなので構築が必要。

公式で用意されている[aws-amplify-react](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-react)が使用可能と思われる。

※ 現在調査中。

*参考：https://qiita.com/uramotot/items/2fc0def45334fac71fea*

## リクエスト・レスポンス

### 認可エンドポイント

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/authorization-endpoint.html*

**[GET] https://{cognitoドメイン}/oauth2/authorize**

**Request**

```
https://twg-sample-auth.auth.us-east-2.amazoncognito.com/oauth2/authorize
?response_type=code
&client_id=631b2olihc62r9o1rekarttal0
&redirect_uri=https://sample-site-a.comee.ml/cognito-login/callback
```

**Response**

```
https://sample-site-a.comee.ml/cognito-login/callback
?code=3e375a46-028a-40a5-a58d-4d71e051f366
```

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/authorization-endpoint.html*

## トークンエンドポイント

**[POST] https://{cognitoドメイン}/oauth2/token**

**Request**

```
curl https://twg-sample-auth.auth.us-east-2.amazoncognito.com/oauth2/token ^
    -d grant_type=authorization_code ^
    -d code=f77580ad-485d-45ed-86de-5dfa73a1f824 ^
    -d client_id=631b2olihc62r9o1rekarttal0 ^
    -d client_secret=v9qg3p7c75fubc2dions0v2ak80glbsssrj3ksnhon1fo0bgrsr ^
    -d redirect_uri=https://sample-site-a.comee.ml/cognito-login/callback
```

**Response**

```
{
    "id_token":"eyJraWQiOiJIeDZYNFUyNmdaaE9Pc21SSEdDYkVmQk1oXC9kVTRnWHdablJrbFhibkpnbz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSVVkaXU4WndFSW5zcHNuZG1QNU1GdyIsInN1YiI6IjE0NGJmOTYzLWZhMGItNGRiZS1hYWZmLWFlNzM2YzczMTI0MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9QVlZzc3Z4bGMiLCJjb2duaXRvOnVzZXJuYW1lIjoic2FtcGxlLXVzZXIiLCJhdWQiOiI2MzFiMm9saWhjNjJyOW8xcmVrYXJ0dGFsMCIsImV2ZW50X2lkIjoiYzUwMjVkNzItYzBjOS00OTViLTk4ODctMjg4MTBmMGZjMGVhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MDc0ODg2MzEsIm5hbWUiOiJzYW1wbGUtdXNlciIsImV4cCI6MTYwNzQ5MjIzMSwiaWF0IjoxNjA3NDg4NjMxLCJlbWFpbCI6InNhbXBsZS11c2VyQHRlc3QuY29tIn0.aMDk7rcJWMvCJXcmFYRPeH4IoMMiKXk6XiiGnSqqvEKMQM_bqBnhVvaOkOKnP-BO10kbMGmFY8TdKqm452vaj6wODAQ1dzbRRx8MSxApJlXeH7PmwY3jZe3XaCJdliklLR9AxmpY8cNMbKls_wIt14WF3T_Dojoj_ownXDOu37t2Zi5SlIWtiWlLGkGTqvcDTH0Eze0OsyeNQeDGmK22DpId06SMescN2UHl9nOQdUXwHR9FoTFNcRDobJGBZPPYoRv4rYq3xvZSQE1KTfHpLXRgKiM7HqS45VRBmqwxkGmz1AZYyNkhRRZ4a9TZlXKm2EzDVcwP17Kbx7bsRxEiBw",
    "access_token":"eyJraWQiOiI5ZnMwZW91dlJDd2ZYSTRZVFwvMzIwRzQzU1ZWVTdMXC8rRlpacWtCMDJhUHM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxNDRiZjk2My1mYTBiLTRkYmUtYWFmZi1hZTczNmM3MzEyNDAiLCJldmVudF9pZCI6ImM1MDI1ZDcyLWMwYzktNDk1Yi05ODg3LTI4ODEwZjBmYzBlYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MDc0ODg2MzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1BWVnNzdnhsYyIsImV4cCI6MTYwNzQ5MjIzMSwiaWF0IjoxNjA3NDg4NjMxLCJ2ZXJzaW9uIjoyLCJqdGkiOiJlMzA0Y2IzZi05ZDExLTQwOTUtYjQ2ZC0yZGQ0NjQxZjA5OTAiLCJjbGllbnRfaWQiOiI2MzFiMm9saWhjNjJyOW8xcmVrYXJ0dGFsMCIsInVzZXJuYW1lIjoic2FtcGxlLXVzZXIifQ.j4tV1oNJrPxTLRQHIwn0sc5sJOihKP1VMfZcFEpgRXtM1B2vVxsLO__AdyZKuga_dwfNDnyFSP-zrBXIGUh9eDln-mDqTPiNtVm1vi3Yi4o7tVnb12IOgZi_VVa8nA3v5Igt3ksVwBWdxh0vtpCJmKXwzr6HRS2fk_RK-82V9DXG4kp0Eppp0oIIIkhzZdCiIhYtES0bWD_hnaMDDVavNVAHyzJHCqmoJlOV3f7u6ZdX1yC1FNQJnRf7yWaE3ZgMpsl2BXpM1i4j2KSj9AknOsT0t8cea91ZF4NfUMEUObj59AunMzrEaac5LkllyQFKYZ2XAnUTP2-8ykrbCi5w3A",
    "refresh_token":"eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Vv6H9Iz-kGsBwXJVkU9UD9W2Obvgc2G0393PvMWW8-tRdnKKAZYlC9BmLPmYwIXR4YwC9V_Lv1CvOkUFRJVXSiWrvkgkolDzjfofjb7fDfh5_ji-aMaj4kesN-cbKg5Ju15wizTHxRuxp1iF3HJ7OLuXLNO5J2FFfScp81tyU--zwVoY1f-WOGgRZSUcJP9TxO4igWuQpg39E1DgOCaDCb-mUlK_XqlsEuYSBgcwjWYo51pc98tnnBz6ngV7ws8VbaSzCMR4fd6SCBACXZpAflMo9nzB3x141l9In_a9MQr02LUs7ODg_-iQNZUz_kK3r3M26-zYJ-t37Yzb9ukouA.S8-CsNSV4FAog-jJ.m9-YQ0wWQFx-nXcc1V9YPZi2_3p4xwzFKQPADodES6w9F7DDjMpH77O3UWu99dNHQC8tqY_NwmD3toJ3QOC_oqqtqOzr8_92n0Pf0ZKoWCeECWPoUzUm1-J1AnT_gYfUHmnSdToIRdIzrBHxKnX38GC766EjGdD34N7d9_LVwIFipNaIVvRzfptY2dFtXpADqO7X8L97JQYft-UCrm7RnQvGd2iuZeuAMEPz30GNVElz8koo94raZkwUXaFfVw6oodoxp7Sn3fPzpoF-6gobREkTtlRac2fn-v5ElPVKJEJaGvDVnB9TnWEyQGjwyXR3iju6llLV7gSPQjYFz4_KNT5AsD9JQoh7F8AaUPxmVmT-dvxpj6ToVDf0PXy3QqwiKfFF7ruiJFk3zb8CZ8Gdf5f6cLc26wi6FSlExjPhcp7AQfXF-beXwUqoCOdiHVv0Cm5fb66sorPtmNV33jcx-daLpgYMbCzoG3CS68vkkFo9KUd4TbalfV1fKNch83LWJCJeyW_LRKOuYkU1XNtrEw93ouFVdIyQ2wJDd3IECtngdQG2KH2VoDjPVAp6lAJ3n11Hs5hK4iX0QcIBu9yXpINrOb00HqP7REk7_zMwMU7QlPV-sWfF00efFXRjJ1A3KqIpp_6_-TywKNtLUjPs1WA63dhterKrya_T9R3uwCn9xtGULBjlBoS8G0uAHiw_GmnPxzA6sQYSUvSXuv7AKWT1buwuJBdNuVWVfUOfAO8aYbW3RQ_Mbd7hLucBhtpcmCs3J-AUSBSGqdHE733UuqAvq3sEvALGub7jb9ra8xrUIIxiMVtMVydiMdeN__wK-osEUaa1BayOQh2ZVGJ2Iq_acDfcNdR352QUOjL-pz82uPV5gMG3ffJd5Az5PebqAAnON-qozGiOVCniK1LaPam40QBaemZdy4j4azli1YZSgzYBxsWF9TTIY-9RKwQCo2VUq4NZ2Yuk-WEMZJcXj_ACKrtdR1sbJRBrKNVE1NM-n61I-Y_YtSwtlTVxqaV8Kw-QHpIgkI27yNw7MrkYlwRQLLPpLs3EBXTKcGvm_-oXEDiDQqsSNTRFiQjMJ_4i0EBeKIENIvGz_RNYhluiMQy8OHn6k4rMgMrnETeaDffDLWG7-2Ie_ZHXy30LvDpRMw_jNSCtHzkPG4R8QDk76WvSmccfzK6NFj-qBOrolpHL2fh_tSdINJAKtfgYuGpVaTlegxaNcNoapXcwanXHCkPwJrs3Wypc-OwOWPjvD2w3c2cHOAuhmQPpHNntoooOvIx5XsWFMEn2VU15wPI.zEQlFt99Uvkz9xOSPCh33w",
    "expires_in":3600,
    "token_type":"Bearer"
}
```

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/token-endpoint.html*

### ユーザーインフォエンドポイント

**[GET] https://{cognitoドメイン}/oauth2/userInfo**

**Authorization: Bearer {アクセストークン}**

**Request**

```
curl https://twg-sample-auth.auth.us-east-2.amazoncognito.com/oauth2/userInfo ^
    -H "Authorization: Bearer eyJraWQiOiI5ZnMwZW91dlJDd2ZYSTRZVFwvMzIwRzQzU1ZWVTdMXC8rRlpacWtCMDJhUHM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxNDRiZjk2My1mYTBiLTRkYmUtYWFmZi1hZTczNmM3MzEyNDAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCIsImF1dGhfdGltZSI6MTYwNzQ5MDMyMCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfUFZWc3N2eGxjIiwiZXhwIjoxNjA3NDkzOTIwLCJpYXQiOjE2MDc0OTAzMjAsInZlcnNpb24iOjIsImp0aSI6ImY5YzgyZDA1LWE0YTAtNDE0Ni05Y2UyLTk2YjZlZDVlOGM4ZSIsImNsaWVudF9pZCI6IjYzMWIyb2xpaGM2MnI5bzFyZWthcnR0YWwwIiwidXNlcm5hbWUiOiJzYW1wbGUtdXNlciJ9.H_iwjfGP-3waT3kNK_S5DHcHPxS7Mn0wfYzVIjiKF3PejiVA1inrRWvml1pypP4DyhbJTvn3L9m0T4qPGIL8N4jksBVHQRO5bMnaIYVDTG3brKRgBF3FWE12ZskrTm53YXSM0wcBglpL-vXfXXu4ixD8GB-5hrNiR4osoQ7QOJzENfsP1CyDTwfSCxPSypZUeU3Ia6GU4SAE3-kblpsaGIAesaZArB45Z68M1yMYy37FV28S7Dz1-UchwaYBCUfRm2_vwQx1kvE-YDgk_Y3yGQ55phhx9AQyff-c8PZOkI0vJPdMHXNOWnLMOBGoJsZHiGVf_L8VKRwDRxggkNB7jw"
```

**Response**

```
{
    "sub":"144bf963-fa0b-4dbe-aaff-ae736c731240",
    "email_verified":"true",
    "name":"sample-user",
    "email":"sample-user@test.com",
    "username":"sample-user"
}
```

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/userinfo-endpoint.html*

## ログインエンドポイント

[GET] https://{cognito ドメイン}/login

**Request**

```
https://twg-sample-auth.auth.us-east-2.amazoncognito.com/login
?response_type=code
&client_id=631b2olihc62r9o1rekarttal0
&redirect_uri=https://sample-site-a.comee.ml/cognito-login/callback
```

**Response**

```
https://sample-site-a.comee.ml/cognito-login/callback
?code=005ceade-d90d-4c03-96b7-6fac6353f352
```

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/login-endpoint.html*

## ログアウトエンドポイント

[GET] https://{cognito ドメイン}/logout

**Request**

① ログアウト後、クライアントアプリのトップページに戻る場合

```
https://twg-sample-auth.auth.us-east-2.amazoncognito.com/logout
?client_id=631b2olihc62r9o1rekarttal0
&logout_uri=https://sample-site-a.comee.ml
```

※ aws cognito apiリファレンスでは、logout_uriはオプショナルだが、指定しないとエラーになる。

② ログアウト後、cognitoログインページを表示する場合

```
https://twg-sample-auth.auth.us-east-2.amazoncognito.com/logout
?response_type=code
&client_id=631b2olihc62r9o1rekarttal0
&redirect_uri=https://sample-site-a.comee.ml/cognito-login/callback
&scope=email+profile
```

**Response**

cognitoからログアウトし、logout_uriに指定したページまたはcognitoログインページにリダイレクトされる。

*参考：https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/logout-endpoint.html*

# 更新履歴

- ver.1.0 (2020-12-11)