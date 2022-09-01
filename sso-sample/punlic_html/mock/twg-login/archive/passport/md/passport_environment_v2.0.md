# Laravel Passportによる認可サーバーの環境構築手順 ver.2.0

- TWG様既存ログインサイトのサンプルもLaravelで構築する。
- ログインサイトと認可サーバーのセッションを共有する。

## サンプル用既存ログインサイト構築手順

### GitHubからクローンする場合

1. Gitクローン

1. インストール

    ```
    composer install
    ```

1. `.env.example`をコピーして`.env`にリネーム

1. `.env`のデータベース情報を環境に合わせて編集

1. データベース構築

    ```
    php artisan migrate
    ```

### 新規作成する場合

1. Laravelプロジェクト作成

    ```
    composer create-project --prefer-dist "laravel/laravel=7.*" login-server
    ```

1. `.env`のデータベース情報を環境に合わせて編集

1. セッションの保存方法をデータベースに変更

    ※下記参照
    https://qiita.com/mgmgmogumi/items/a6a39aad036b395702c5

1. セッション保存用のテーブルを作成するmaigrationを追加

    ```
    php artisan session:table
    ```

1. ログイン機能を追加

    ```
    composer require laravel/ui:^2.4
    ```

    ```
    php artisan ui vue --auth
    ```

1. データベース構築

    ```
    php artisan migrate
    ```

1. sassビルド

    ```
    npm install && npm run dev
    ```

## 認可・リソースサイト（Passport）構築手順

### GitHubからクローンする場合

1. Gitクローン

1. インストール

    ```
    composer install
    ```

1. `.env.example`をコピーして`.env`にリネーム

1. `.env`のデータベース情報を環境に合わせて編集

1. Passportを使用するためのKeyを生成

    ```
    php artisan passport:keys
    ```

1. データベース構築

    ```
    php artisan migrate
    ```

### 新規作成する場合

1. Laravelプロジェクト作成

    ```
    composer create-project --prefer-dist "laravel/laravel=7.*" authorization-server
    ```

1. `.env`のデータベース情報を環境に合わせて編集

1. セッションの保存方法をデータベースに変更

    ※下記参照
    https://qiita.com/mgmgmogumi/items/a6a39aad036b395702c5

1. `database\migrations`配下のファイルを削除
    
    ※ ログイン用Laravelで既にテーブル作成済みのため

1. passport導入

    ```
    composer require laravel/passport "~9.0"
    ```

1. マイグレーションでデータベース構築
    
    ```
    php artisan migrate
    ```

1. passportをインストール

    ```
    php artisan passport:install
    ```

    ※ client idにuuidを使用する場合

    ```
    php artisan passport:install --uuids
    ```

1. uiコンポーネントを導入し、フロントのスタイルを適用

    ```
    composer require laravel/ui:^2.4
    ```

    ```
    php artisan ui vue
    ```

    ```
    php artisan vendor:publish --tag=passport-components
    ```

    ```
    npm install && npm run dev
    ```

1. 下記ファイルを修正してpassportを有効化

    - app\User.php

        ```
        use Laravel\Passport\HasApiTokens;	// 追加

        class User extends Authenticatable	
        {
            use HasApiTokens	// 追加
        ```

    - app\providers\AuthServiceProvider.php
	 
        ```
        use Laravel\Passport\Passport;	// 追加

        class AuthServiceProvider extends ServiceProvider	
        {
            public function boot()
            {
                $this->registerPolicies();
                
                Passport::routes();	// 追加
        ```
        
    - config\auth.php

        ```
        'guards' => [
            'web' => [
                ・・・
            
            'api' => [
                    // 'driver' => 'token',	// 削除
                    'driver' => 'passport'	// 追加
                    'provider' => 'users',
            ],
        ```

    - Http\kernel.php

        ```
        use Laravel\Passport\Http\Middleware\CheckClientCredentials;	//追加

        class  Kernel  extends  HttpKernel
        {
        
            ・・・
        
            protected $routeMiddleware = [
                'client' => CheckClientCredentials::class,	// 追加
        ```

1. 未ログイン時のリダイレクト先をログインサイトのURLに変更

    - app\Http\Middleware\Authenticate.php

        ```
        protected function redirectTo($request)
        {
            if (! $request->expectsJson()) {
                // return route('login');   // 削除
                return 'http://passport-login-sample.comee.ml/login';   // 追加
            }
        }
        ```

## 参考

- https://laravel.com/docs/7.x/passport#Installation
- https://qiita.com/mgmgmogumi/items/a6a39aad036b395702c5