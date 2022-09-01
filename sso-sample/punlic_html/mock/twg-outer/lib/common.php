<?php
require_once(__DIR__ . '/config.php');

class Common
{
    private $db = null;

    function __construct()
    {
        // データベース接続
        $options = array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET CHARACTER SET 'utf8'"); // 文字化け対策
        try {
            $this->db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit;
        }

        // セッションスタート
        if (session_status() == PHP_SESSION_NONE)   session_start();
    }


    /**
     * 指定したメールアドレスがデータベースに登録されているか判定
     * 　登録された場合ユーザー、登録さていない場合falseを返す
     *
     * @param string $email
     * @return array|false
     */
    function checkEmail(string $email)
    {
        $stmt = $this->db->prepare('SELECT * FROM ' . T_USERS . ' WHERE email = ?');
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * ユーザー新規登録処理
     *
     * @param string $email
     * @param string $pw
     * @return void
     */
    function userRegister(string $email, string $pw)
    {
        if ($this->checkEmail($email)) {
            echo '登録済みメールアドレス';
        } else {
            $stmt = $this->db->prepare('INSERT INTO ' . T_USERS . ' (email, password) VALUES(?, ?)');
            if (!$stmt->execute([$email, password_hash($pw, PASSWORD_DEFAULT)])) {
                echo 'ユーザー登録エラー';
                exit;
            }
            $this->userLogin($email, $pw);
        }
    }

    /**
     * ログイン処理
     *
     * @param string $email
     * @param string $pw
     * @return void
     */
    function userLogin(string $email, string $pw)
    {
        $user = $this->checkEmail($email);
        if ($user) {
            if (password_verify($pw, $user['password'])) {
                unset($user['password']);
                $_SESSION['user'] = $user;
                header('Location: ' . APP_URL . '/list');
                exit;
            }
        } else {
            echo 'ログイン失敗';
        }
    }

    /**
     * ログイン中かどうか判定
     *
     * @return boolean
     */
    function isLogined()
    {
        return $this->isSetAndNotEmpty($_SESSION['user']);
    }

    /**
     * ログアウト処理
     *
     * @return void
     */
    function userLogout()
    {
        if (isset($_SESSION['user']))
            unset($_SESSION['user']);
    }

    /**
     * ユーザー一覧取得
     * 
     * @return PDOStatement|false
     */
    function getUserList()
    {
        return $this->db->query('SELECT id, email, regist_ts, update_ts FROM ' . T_USERS);
    }

    /**
     * 定義済み、null、empty判定
     * 
     * @param mixed $val
     * @return boolean
     */
    function isSetAndNotEmpty(&$val)
    {
        return isset($val) && !empty($val);
    }






    // ====================
    // SSOログイン処理

        /**
         * 餃子サークルログインページにリダイレクト
         *
         * @return void
         */
        function ssoLogin()
        {
            // 認可サーバーURL
            $url = 'http://twg-app.se-sendai.co.jp/client';
            // 認可サーバーから提供されたクライアントID
            $url .= '?client_id=' . SSO_CLIENT_ID;
            // 取得したい情報
            $url .= '&scope=email';
            // 認可サーバーからの応答を受け取るURL
            $url .= '&redirect_uri=' . APP_URL . '/sso-login/callback';
            header('Location: ' . $url);
            exit;
        }

        /**
         * 餃子サークルログイン後にリダイレクトで呼び出されるメソッド
         *
         * @return void
         */
        function ssoLoginCallback()
        {
            if (isset($_GET['code'])) {

                // 認可サーバーから発行された認可コードを取得
                $code = $_GET['code'];

                // 認可コードとクライアントIDを認可サーバーへcurlでPOSTし、アクセストークンを取得
                $authUrl = 'http://twg-app.se-sendai.co.jp/token';
                $postData = [
                    'code' => $code,
                    'client_id' => SSO_CLIENT_ID,
                ];
                $tokenData = $this->curlExec($authUrl, $postData);

                if ($tokenData) {
                    $tokenData = json_decode($tokenData, true);
                    // 取得したアクセストークンをリソースサーバーへ送信し、ユーザー情報を取得
                    if ($this->isSetAndNotEmpty($tokenData['access_token']))
                    {
                        $resUrl = "http://twg-res.se-sendai.co.jp/userinfo";
                        $headerData = [
                            'Authorization: Bearer ' . $tokenData['access_token']
                        ];
                        $userData = $this->curlExec($resUrl, null, $headerData);

                        // 取得したユーザー情報を使用し、ユーザー認証を行う
                        if ($userData) {
                            $userData = json_decode($userData, true);
                            // リソースサーバーから取得したメールアドレス（餃子サークルに登録されているメールアドレス）でデータベース検索
                            $user = $this->checkEmail($userData['email']);

                            if ($user) {
                                // 同じメールアドレスがデータベースに登録されていた場合、同一ユーザーとみなし、ログインする
                                $_SESSION['user'] = $user;
                                header('Location: ' . APP_URL . '/list');
                                exit;
                            } else {
                                // データベースに登録されていなかった場合、必要情報を補足して新規登録し、ログインする
                                $pw = substr(base_convert(md5(uniqid()), 16, 36), 0, 12);
                                $this->userRegister($userData['email'], $pw);
                            }
                        } else {
                            echo 'ユーザー情報要求curl失敗';
                        }
                    } else {
                        if ($this->isSetAndNotEmpty($tokenData['error_code'])) {
                            echo 'アクセストークン取得エラー';
                            if ($tokenData['error_code'] == 001)
                                echo '（POSTパラメーターが不足）';
                            elseif ($tokenData['error_code'] == 003)
                                echo '（クライアントIDが不正）';
                            elseif ($tokenData['error_code'] == 004)
                                echo '（認可コードが不正）';
                            elseif ($tokenData['error_code'] == 005)
                                echo '（認可コード使用可能時間切れ）';
                        }
                    }
                } else {
                    echo 'アクセストークン要求curl失敗';
                }
            } else {
                if (isset($_GET['action']) && $_GET['action'] === 'cancel') {
                    echo 'SSOログインキャンセル';
                } else {
                    echo '認可コード取得エラー';
                    if ($this->isSetAndNotEmpty($_GET['error_code'])) {
                        if ($_GET['error_code'] == 001)
                            echo '（認可リクエストパラメーター不足）';
                        if ($_GET['error_code'] == 002)
                            echo '（クライアント認証エラー）';
                    }
                }
            }
        }

        /**
         * カールを実行し取得結果を返す
         * 
         * @param string $url
         * @param array|null $postData   POSTで送るデータ
         * @param array|null $header     HTTPヘッダで送るデータ
         * 
         * @return string|boolean
         */
        function curlExec(string $url, array $postData = null, array $headerData = null)
        {
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);   // curl実行成功時、取得結果を返す
            if ($postData !== null) {
                curl_setopt($curl,CURLOPT_POST, TRUE);
                curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postData));
            }
            if ($headerData !== null) {
                curl_setopt($curl, CURLINFO_HEADER_OUT, 1);
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headerData);
            }
            $result = curl_exec($curl);
            curl_close($curl);
            return $result;
        }
}