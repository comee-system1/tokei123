# Auth0で外部データベースを使用する方法

1. Auth0管理画面にログイン

1. 左メニューの【Connections】> 【Database】を選択

1. 【CREATE DB CONNECTION】を選択

1. 【Name】に任意の名前を入力し、【CREATE】を選択

1. 【Custom Database】タブを選択

1. 【Use my own database】をONにする

1. 【Login】タブが選択されていることを確認し、ソースコードを下記に書き換える

    ```
    function login(email, password, callback) {

        const mysql = require('mysql');
        const bcrypt = require('bcrypt');

        const connection = mysql.createConnection({
            host: '既存アカウントデータがあるDBのIPアドレス',
            user: 'DBユーザー名',
            password: 'DBパスワード',
            database: 'DB名'
        });

        connection.connect();

        const query = 'SELECT id, name, email, password FROM users WHERE email = ?';

        connection.query(query, [ email ], function(err, results) {
            
            // 入力値不正
            if (err) return callback(err);

            // 登録されていないメールアドレス
            if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
            const user = results[0];

            // パスワード検証

            // Laravel（TWGログインサンプルサイト）で生成するハッシュタイプのプレフィックスは「$2Y$」。
            // node (Auth0)で生成するハッシュタイプのプレフィックスは「$2a$」。
            // プレフィックスのみ置き換えしてパスワード検証する。
            // ※ Laravel側では自動で置き換えている（？）ので、Auth0で登録したアカウントでもそのままログイン可能。
            user.password = user.password.replace('$2y$', '$2b$');

            bcrypt.compare(password, user.password, function(err, isValid) {
            if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

            callback(null, {
                user_id: user.id.toString(),
                name: user.name,
                email: user.email
            });
            });
        });
    }
    ```

    ※ 使用するDBは、Auth0からのアクセスを許可すること（Auth0のIPアドレスはソースコード入力欄の下部に記載されている）

1. 【SAVE】後、【TRY】で動作確認