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

    function userinfo()
    {
        // HTTPヘッダからアクセストークンを取得
        $header = getallheaders();
        $auth = explode(' ', $header['Authorization']);
        $token = ($this->isSetAndNotEmpty($auth[1])) ? $auth[1] : $auth[0];
        if ($token) {
            // 取得したアクセストーンに関連する情報を認可サーバーから取得
            $url = AUTH_URL . '/introspection';
            $headerData = [
                'Authorization: Bearer ' . $token
            ];
            $tokenData = $this->curlExec($url, null, $headerData);
            if (!$tokenData) {
                // curl実行失敗
                echo 'アクセストークン情報取得curl実行失敗：' . APP_URL;
                exit;
            } else {
                // curl実行成功
                $tokenData = json_decode($tokenData, true);

                // アクセストークンに紐づくユーザーIDの情報を取得
                if ($this->isSetAndNotEmpty($tokenData['user_id']) && 
                    $this->isSetAndNotEmpty($tokenData['scope'])) {
                    $stmt = $this->db->prepare('SELECT id, ' . $tokenData['scope'] . ' FROM ' . T_USERS . ' WHERE id = ?');
                    $stmt->execute([$tokenData['user_id']]);
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);

                    // 取得したユーザー情報をjson形式で出力
                    echo json_encode($user);
                    exit;
                }
            }
        } else {
            echo 'アクセストークン受信エラー';
            exit;
        }
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