# sso-sample

## ディレクトリ構造

.  
├── public_html ... プログラム保管場所  
│　　├── laravel-authlete ... Laravel Authleteによるモック  
│　　│　　├── authorization-server ... 認可サーバー (https://auth.comee.ml)  
│　　│　　└── resource-server ... リソースサーバー (https://res.comee.ml)  
│　　├── mock ... ライブラリ未使用のモック  
│　　│　　├── twg-app ... 認可サーバー (http://twg-res.se-sendai.co.jp)  
│　　│　　├── twg-login ... ログインサイト (http://twg-login.se-sendai.co.jp)  
│　　│　　├── twg-outer ... 外部連携サイト (http://twg-outer.se-sendai.co.jp)  
│　　│　　└── twg-res ... リソースサーバー (http://twg-res.se-sendai.co.jp)  
│　　├── passport ... Laravel Passportによるモック
│　　│　　├── authorization-server ... 認可・リソースサーバー (http://passport-auth-sample.comee.ml)  
│　　│　　└── login-server ... ログインサイト (http://passport-login-sample.comee.ml)  
│　　└── sample-site-a ...  外部連携サイト (https://sample-site-a.comee.ml)   
└── sso資料 ... 関連資料保管場所  

## その他資料

- ライブラリ未使用のモック設計書 ... http://twg-login.se-sendai.co.jp/archive/index.html  
- Laravel Passportの調査結果 (20201113) ... http://twg-login.se-sendai.co.jp/archive/passport/passport_report.html
- Laravel Passportの調査結果 (20201119) ... http://twg-login.se-sendai.co.jp/archive/passport/passport_report_v2.0.html