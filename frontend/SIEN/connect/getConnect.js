import axios from 'axios';
import common from './Common';
/**********************
 * 第一引数:実行ファイルのパス名
 * 第二引数：json形式
 */
export async function getConnect(type, params) {

    let str = type.slice(1);
    let param = JSON.stringify(params);
    let folder = common.selectFolder(str);


    return await axios.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + param + "/" + folder).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}