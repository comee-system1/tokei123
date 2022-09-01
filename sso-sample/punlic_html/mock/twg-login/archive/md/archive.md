# シングルサインオンサンプル

## 初期処理
*最初にapplicationsテーブルにデータを登録しておく
 - 対象クライアントの有効性の確認


## クライアントページ

## サンプルURL
<code>http://twg-outer.se-sendai.co.jp</code>

## 画面イメージ
<img src="/archive/img/login.png" width="240">

## ファイル
- .htaccess
  - 設定ファイル
    - ファイルもしくはフォルダがない場合はindex.phpを読み込む
    - ctpファイルをphpとして扱う
- index.php 
  - インデックスページ
     - パラメータがない場合はログインページを表示
     - ユーザー情報登録処理
     - ログイン処理
     - 認証情報受け取り処理
     - 登録情報表示

- /php/list.php
  - 登録情報表示

- /lib/lib_common.php
  - 関数群

- /view/login.ctp
  - ログインテンプレート
- /view/regist.ctp
  - ユーザー情報登録テンプレート
- /view/list.ctp
  - ユーザー情報一覧テンプレート

## 機能

- **① ログインページ**
    1. ログイン前後で表示の切り替えを行う
    1. シングルサインオンログインリンクの設置
       - 「クライアントID」 「リダイレクトurl」 を付与して、認可サーバーにリダイレクトする
         - 必要な情報をパラメータに接続する
           - 例) scope=open_id+email



- **⑦ 認証情報取得処理**
   - TWGログインページからログイン認証後、実行(リダイレクト処理で認可コードを受け取る)



- **⑧ 認可コードを元にアクセストークンの取得(curl)**
  - 認可サーバーからアクセストークンの取得を行う

- **⑪ アクセストークンを元にユーザー情報を取得(curl)**
  - リソースサーバーへアクセストークンを元にユーザーIDの取得を行う



---
# TWG用ログインページ
## サンプルURL
<code>http://twg-login.se-sendai.co.jp</code>

## 画面イメージ
<img src="/archive/img/twglogin.JPG" width="240">

## ファイル
- .htaccess
  - 設定ファイル
    - ファイルもしくはフォルダがない場合はindex.phpを読み込む
    - ctpファイルをphpとして扱う

- index.php 
  - インデックスページ
     - パラメータがない場合はログインページを表示
     - ユーザー情報登録処理
     - ログイン処理
     - 認証情報受け取り処理
     - 登録情報表示


- /lib/lib_common.php
  - 関数群

- /view/login.ctp
  - ログインテンプレート
- /view/regist.ctp
  - ユーザー情報登録テンプレート
- /view/list.ctp
  - ユーザー情報一覧テンプレート


## 機能


- **⑤ログインの実施**
   - ログイン状態の確認を行う(sessionより確認)
   - 未ログイン状態の時
     - ログイン画面の表示
       - ログインの実施

     - 認証同意画面に繊維

   - ログイン状態の時
     - 同意状況のチェック
       - 未同意
         - 認証同意画面に遷移
       - 同意済
         - 認証同意処理

- **⑥認証同意処理**
    - 認可サーバーへ下記パラメータを保持し、アクセストークン発行・認証コードの要求
       * ユーザーID
       * クライアントID
    
- **⑮ユーザー情報の取得**
    - ユーザーIDを元にユーザー情報の取得を行う
    - ユーザ情報取得カラムを元に必要カラムの取得を行う


---
# 認可サーバー
## サンプルURL
<code>http://twg-login.se-sendai.co.jp</code>

## ファイル
- index.php
-- 認証処理
-- 認可情報登録

## 機能
- **②クライアント認証確認**
   - 下記パラメータを元に認証機能の利用確認を行う。
      - クライアントID
      - リダイレクトURL
- **③クライアント認証不可**
   - クライアントサーバーにリダイレクト
     - 処理の終了

- **④ クライアント認証可**
   - TWGサーバーにリダイレクト(下記パラメータを保持)
     * クライアントID
     * リダイレクトurl
     * その他必要な情報をパラメータに付与
      - 例) scope=open_id+email
   　


- **⑦ 認証コード・アクセストークンの発行要求**
   - TWG用ログインページにより、ログインの実施後に下記実行
     - 下記内容をテーブルに保存
        - アクセストークンの発行
        - 認可コード発行
        - user_id
        - client_id
        - 取得カラム
        - 連携許可時間 現在時間から半年後の時間
        - アクセストークンの要求時間 現在時間から 5分後

- **⑧ 認可コードをクライアントサーバーに送るGET**

- **⑩ 認可コードを元にアクセストークンを取得**
  - 取得した認証コードを元に、テーブルからアクセストークンの取得を行う

- **⑬ アクセストークンを元にデータ取得**
  - 取得したアクセストークンを元に「ユーザーID」「取得カラム」の取得を行う


---
# リソースサーバー
## サンプルURL
<code>http://twg-login.se-sendai.co.jp</code>

## ファイル
- index.php
-- 登録ユーザー情報の取得


## 機能
- **⑫ 「ユーザーID」「ユーザ情報取得カラム」の取得を行う(curl)**
    - 取得したアクセストークンを元に、認可サーバーへ「ユーザーID」「ユーザ情報取得カラム」の取得を行う。(curl)
    
- **⑫ ユーザーIDを元にユーザー情報の取得(curl)**
    - TWGサーバーにユーザーIDを渡す

- **⑭ 「ユーザーID」「ユーザー情報取得カラム」を元にユーザー情報の取得(curl)**
 - TWGサーバーへ下記パラメータを保持し、必要なユーザー情報の取得を行う
   * ユーザーID
   * ユーザー情報取得カラム

---
# 全体イメージ
<a href="/archive/img/sso.jpg" target=_blank><img src="/archive/img/sso.jpg" style="width:100%;"></a>

---
# 確認事項
- リソースサーバーからTWGサーバーのテーブルにアクセスを行うこと
- リソースサーバーの利用について、openID connectに準拠しているが、リソースサーバーを利用していないサービスも存在しているため確認(認可サーバーにまとめることが可能)
- aglioを利用しての情報共有方法
- notionの利用を検討

---
# DB
### クライアントサーバー

user_client

|カラム|型|備考|
|:--|:--|:--|
|id|int(11)||
|email|varchar(128)||
|password|varchar(11)||
|regist_ts|timestamp||
|update_ts|timestamp|DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP|


### TWG用サーバー
twg_client

|カラム|型|備考|
|:--|:--|:--|
|id|int(11)||
|email|varchar(128)||
|password|varchar(11)||
|regist_ts|timestamp||
|update_ts|timestamp|DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP|


### 認証用サーバー
applications

|カラム|型|備考|
|:--|:--|:--|
|id|int(11)||
|client_id|varchar(128)||
|redirect_url|varchar(128)||
|regist_ts|timestamp||
|update_ts|timestamp|DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP|


approvals

|カラム|型|備考|
|:--|:--|:--|
|id|int(11)||
|applicate_code|varchar(128)|認証コード|
|access_token|varchar(128)|アクセストークン|
|user_id|int(11)||
|client_id|varchar(128)||
|get_culum|text|ユーザ情報を取得する際に取得データのカラムを指定する。カンマ区切りで保持|
|possible_time|datetime|連携許可時間 登録時間+半年|
|token_time|datetime|アクセストークン要求時間+5分|
|regist_ts|timestamp||
|update_ts|timestamp|DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP|
