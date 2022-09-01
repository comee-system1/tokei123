# Laravel Passportによる認可サーバーの環境構築手順　～認可サーバー～

## GitHubからクローンする場合

1. Gitクローン

1. composerインストール

    ```
    cd authorization-server
    ```

    ```
    composer self-update
    ```

    ```
    composer install
    ```

1. `.env.example`を`.env`にリネームして編集

1. キーを生成
    
    ```
    php artisan key:generate
    ```

    ```
    php artisan passport:keys
    ```

1. マイグレーションでデータベース構築
    
    ```
    php artisan migrate
    ```
***

## 新規作成の場合

1. composerでLaravelインストール

    ```
    composer create-project --prefer-dist "laravel/laravel=7.*" authorization-server
    ```

    ※ 最新バージョンはまだ安定していないのでバージョン７を使用

1. 環境に合わせて`.env`ファイルを編集

1. passportを導入

    ```
    cd authorization-server
    ```

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
    php artisan ui vue --auth
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

***

**参考**

https://laravel.com/docs/7.x/passport#Installation