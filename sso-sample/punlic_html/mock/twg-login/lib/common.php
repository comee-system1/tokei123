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
     *  登録されていた場合ユーザー、登録さていない場合falseを返す
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
            $result = $stmt->execute([$email, password_hash($pw, PASSWORD_DEFAULT)]);
            if ($result) {
                $this->userLogin($email, $pw);
                if (isset($_GET['client_id'])) {
                    header('Location: ' . APP_URL . '/sso-login?' . http_build_query($_GET));
                    exit;
                }
            }
            else
                echo 'ユーザー登録エラー';
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
            } else {
                echo 'パスワードが間違っている';
            }
        } else {
            echo 'メールアドレスが間違っている';
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
        if (isset($_SESSION['user']))   unset($_SESSION['user']);
    }

    /**
     * ユーザー一覧取得
     * 
     * @return PDOStatement | false
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





    // ======================
    // SSOログイン処理

        /**
         * 認可サーバーでクライアント認証後にリダイレクトで呼び出されるメソッド
         *
         * @return void
         */
        function ssoLogin()
        {
            $param = $_GET;
            if ($this->isSetAndNotEmpty($param['error_code'])) {
                // 認可サーバーでのクライアント認証に失敗した場合
                if ($param['error_code'] == 001)
                    echo 'SSOログインに必要なパラメーターが不正';
                elseif ($param['error_code'] == 002)
                    echo 'クライアントIDまたはリダイレクトURIが不正';
                else
                    echo '認可サーバーのクライアント認証でエラーが発生';
            } else {
                // 認可サーバーでのクライアント認証に成功した場合

                if ($this->isLogined()) {
                    // ログイン済みの場合、連携許可同意済みか確認
                    $this->checkApproval();
                } else {
                    // 未ログインの場合、ログイン画面表示
                    include(VIEW_DIR . '/login.ctp');
                }
            }
        }
        
        /**
         * ログインしたユーザーがクライアントアプリに対して連携許可済みか確認する
         *
         * @return void
         */
        function checkApproval()
        {
            // クライアントIDとユーザーIDを認可サーバーに送り、ユーザーが既に連携許可をしているか確認
            $param =  $_GET;
            $authUrl = AUTH_URL . '/status';
            $postData = [
                'client_id' => $param['client_id'],
                'user_id' => $_SESSION['user']['id']
            ];
            $result = $this->curlExec($authUrl, $postData);
            if ($result)
            {
                // curl成功時
                $data = json_decode($result, true);
                if ($this->isSetAndNotEmpty($data['status']) && $data['status'] == 1) {
                    // 連携許可同意済みの場合、認可サーバーに認可コードリクエストを送信
                    // （リクエスト後、認可サーバーから直接クライアントアプリに認可コードが返される）
                    $this->requestCode();
                } elseif ($this->isSetAndNotEmpty($data['error_code'])) {
                    echo '連携同意済みか確認';
                    if ($data['error_code'] == 001)
                        echo '（POSTデータが不足）';
                    elseif ($data['error_code'] == 003)
                        echo '（クライアントIDが不正）';
                } else {
                    // 連携未同意の場合、連携同意画面表示
                    include(VIEW_DIR . '/approval.ctp');
                }
            } else {
                // curl失敗時
                echo 'ユーザー連携済み確認curlに失敗';
            }
        }

        /**
         * 認可サーバーに認可コードリクエストを送る
         * 　（認可サーバーでコード発行後は直接クライアントアプリに返る）
         *
         * @return void
         */
        function requestCode()
        {
            // 認可コード要求URL生成
            $url = AUTH_URL . '/code';
            $url .= '?client_id=' . $_GET['client_id'];
            $url .= '&scope=' . $_GET['scope'];
            $url .= '&redirect_uri=' . $_GET['redirect_uri'];
            $url .= '&user_id=' . $_SESSION['user']['id'];

            // リダイレクト
            header('Location: ' . $url);
            exit;
        }

        /**
         * ユーザーが連携を同意しなかった場合、クライアントアプリにリダイレクトする
         *
         * @return void
         */
        function cancelSsoLogin()
        {
            $url = $_GET['redirect_uri'];
            $url .= '?action=cancel';
            header('Location: ' . $url);
            exit;
        }

        

        /**
         * カールを実行し取得結果を返す
         * 
         * @param string $url
         * @param array $postData   POSTで送るデータ
         * @param array $header     HTTPヘッダで送るデータ
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

        /**
         * SSOログインURLのパラメーターが正しいかどうか判定
         *
         * @return boolean
         */
        function isCorrectSsoLoginParam()
        {
            return $this->isSetAndNotEmpty($_GET['client_id']) && 
                    $this->isSetAndNotEmpty($_GET['redirect_uri']) && 
                    $this->isSetAndNotEmpty($_GET['scope']);
        }
}