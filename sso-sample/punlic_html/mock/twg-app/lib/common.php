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
    }

    /**
     * リクエストのクライアントIDとリクエストURIが登録されているか確認
     *  登録されていた場合true、登録されていなかった場合falseを返す
     *
     * @param string $client_id
     * @param string|null $redirect_uri
     * @return boolean
     */
    function isEnableClient(string $client_id, string $redirect_uri = null)
    {
        $sql = 'SELECT * FROM ' . T_APPS . ' WHERE client_id = ?';
        $data[0] = $client_id;

        if ($redirect_uri !== null) {
            $sql .= ' AND redirect_url = ?';
            $data[1] = $redirect_uri;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($data);
        $resutl = $stmt->fetch(PDO::FETCH_ASSOC);
        return ($resutl) ? true : false;
    }

    /**
     * リクエストの必須パラメーターが正しいか確認
     *  正しい場合true、不足していた場合falseを返す
     *  必須：client_id, scope, redirect_uri
     *
     * @param array $param
     * @return boolean
     */
    function issetParam(array $param)
    {
        return ($this->isSetAndNotEmpty($param['client_id']) && 
                $this->isSetAndNotEmpty($param['scope']) &&
                $this->isSetAndNotEmpty($param['redirect_uri']));
    }

    /**
     * クライアント認証の結果を餃子サークルログインページにGETで返す
     *  パラメーターが不足していた場合、error_code=001、
     *  クライアント認証に失敗した場合、error_code=002をGETで返す
     * 
     * @return void
     */
    function authenticationClient()
    {
        $param = $_GET;
        if (!$this->issetParam($param)) {
                // 必須パラメータが設定されていない場合、エラー001
                $param['error_code'] = "001";
        } else {
            if (!$this->isEnableClient($param['client_id'], $param['redirect_uri'])) {
                // クライアントIDまたはリダイレクトURIが登録情報と違っていた場合、エラー002
                $param['error_code'] = "002";
            }
        }

        // 餃子サークルログインページにリダイレクト
        $url = 'http://twg-login.se-sendai.co.jp/sso-login';
        header('Location: ' . $url . '?' . http_build_query($param));
        exit;
    }

    /**
     * ユーザーが過去にクライアントアプリに対して連携を同意済みか確認
     *  同意済みの場合、status:1、未同意の場合、status:2をjson形式で出力
     *
     * @return void
     */
    function getApprovalStatus()
    {
        // POSTでクライアントIDとユーザーIDを受け取る
        $param = $_POST;
        $response = [];

        // パラメーター検証
        if (!$this->isSetAndNotEmpty($param['client_id']) |
            !$this->isSetAndNotEmpty($param['user_id'])) {
            // パラメーターが不足していた場合、エラー001
            $response['error_code'] = '001';
        } else {
            if (!$this->isEnableClient($param['client_id'])) {
                // クライアントIDが登録されていない場合、エラー003
                $response['error_code'] = '003';
            } else {
                // アクセストークン発行済みか確認
                $stmt = $this->db->prepare('SELECT * FROM ' . T_TOKENS . ' WHERE user_id = ? AND client_id = ?');
                $stmt->execute([$param['user_id'], $param['client_id']]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    // アクセストークン発行済みの場合、過去に連携同意されているため status:1
                    $response['status'] = 1;
                } else {
                    // アクセストークン未発行の場合、連携同意をまだしていないため status:0
                    $response['status'] = 0;
                }
            }
        }
        // 結果をjson形式で出力
        echo json_encode($response);
        exit;
    }

    /**
     * 認可コードを発行し、指定されたリダイレクトURIへGETで返す
     *
     * @return void
     */
    function createCode()
    {
        $response = [];
        // パラメーター検証
        $param = $_GET;
        if (!$this->issetParam($param) |
            !$this->isSetAndNotEmpty($param['user_id'])) {
                // 必須パラメータが設定されていない場合、エラー001
                $response['error_code'] = "001";
        } else {
            // 正しく認可リクエストされた場合

            // クライアント認証
            if (!$this->isEnableClient($param['client_id'], $param['redirect_uri'])) {
                // クライアントIDまたはリダイレクトURIが登録データと異なる場合、エラー002
                $response['error_code'] = 002;
            } else {
                // クライアント認証OKの場合、アクセストークン発行済みか確認
                $stmt = $this->db->prepare('SELECT * FROM ' . T_TOKENS . ' WHERE client_id = ? AND user_id = ?');
                $stmt->execute([$param['client_id'], $param['user_id']]);
                $token = $stmt->fetch(PDO::FETCH_ASSOC);

                // アクセストークン発行済みの場合データ更新、未発行の場合新規登録
                $code = uniqid();
                $token_time = date("Y-m-d H:i:s", strtotime("+5 minute"));  // 認可コード有効期限
                $scope = str_replace(' ', ',', $_GET['scope']);
                if ($token) {
                    // 発行済みの場合
                    $stmt = $this->db->prepare('UPDATE ' . T_TOKENS . ' SET applicate_code = ?, token_time = ?, get_culum = ? WHERE id = ?');
                    if (!$stmt->execute([$code, $token_time, $scope, $token['id']])) {
                        // データベース更新に失敗した場合
                        echo 'DB 更新失敗（認可コード更新）';
                        exit;
                    }
                } else {
                    // 未発行の場合
                    $token = uniqid();
                    $possible = date("Y-m-d H:i:s", strtotime("+6 months"));    // アクセストークン有効期限
                    $stmt = $this->db->prepare(
                        'INSERT INTO ' . T_TOKENS . 
                        '(applicate_code, access_token, user_id, client_id, get_culum, possible_time, token_time)' . 
                        ' VALUES(?, ?, ?, ?, ?, ?, ?)');
                    if (!$stmt->execute([$code, $token, $param['user_id'], $param['client_id'], $scope, $possible, $token_time])) {
                        // データベース登録に失敗した場合
                        echo 'DB 登録エラー（認可コード、アクセストークン新規登録）';
                        exit;
                    }
                }

                // データベースに登録した認可コードを返す
                $response['code'] = $code;
            }
        }
        // 指定のリダイレクトURIにGETで結果を返す
        header('Location: ' . $param['redirect_uri'] . '?' . http_build_query($response));
        exit;
    }

    /**
     * 認可コードに紐づくアクセストークンをjson形式で返す
     *
     * @return void
     */
    function getToken()
    {
        $response = [];
        // POSTデータ検証
        if (!$this->isSetAndNotEmpty($_POST['client_id']) | 
            !$this->isSetAndNotEmpty($_POST['code'])) {
                // 必須項目がない場合、エラー001
                $response['error_code'] = '001';
        } else {
            // クライアント認証
            if (!$this->isEnableClient($_POST['client_id'])) {
                // クライアントIDIが登録データと異なる場合、エラー002
                $response['error_code'] = "003";
            } else {
                // 認可コード検証
                $stmt = $this->db->prepare('SELECT * FROM ' . T_TOKENS .
                     ' WHERE applicate_code = ? AND client_id = ?');
                $stmt->execute([$_POST['code'], $_POST['client_id']]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$result) {
                    // 認可コードまたはクライアントIDが登録データと異なる場合、エラー004
                    $response['error_code'] = "004";
                } elseif ($result['token_time'] < date("Y-m-d H:i:s", strtotime(time()))) {
                    // 認可コード使用可能時間切れの場合、エラー005
                    $response['error_code'] = '005';
                } else {
                    // エラーがない場合
                    $response['access_token'] = $result['access_token'];
                    $response['scope'] = str_replace(',', ' ', $result['get_culum']);
                    $response['expire'] = $result['possible_time'];
                }
            }
        }
        // 結果をjson形式で出力
        echo json_encode($response);
        exit;
    }

    /**
     * アクセストークンに関する情報をjson形式で返す
     *  アクセストークンはopenid connect の仕様に準拠し、HTTPヘッダで受け取る
     * 　”Authorization: Bearer {アクセストークン}”
     *
     * @return void
     */
    function getTokenInfo()
    {
        $response = [];
        
        // HTTPヘッダからアクセストークンを取得
        $header = getallheaders();
        $auth = explode(' ', $header['Authorization']);
        $token = ($this->isSetAndNotEmpty($auth[1])) ? $auth[1] : $auth[0];

        // DB検索
        $stmt = $this->db->prepare('SELECT access_token, user_id, client_id, get_culum, possible_time FROM ' . T_TOKENS . ' WHERE access_token = ?');
        $stmt->execute([$token]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$result) {
            // アクセストークンが登録されていない場合、エラー006
            $response['error_code'] = '006';
        } else {
            $response['access_token'] = $result['access_token'];
            $response['user_id'] = $result['user_id'];
            $response['client_id'] = $result['client_id'];
            $response['scope'] = str_replace(',', ' ', $result['get_culum']);
            $response['expire'] = $result['possible_time']; 
        }

        // 結果をjson形式で出力
        echo json_encode($response);
        exit;
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
}