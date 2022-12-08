import axios from 'axios';
import common from './Common';
/**********************
 * 第一引数:実行ファイルのパス名
 * 第二引数：json形式
 * 第三引数：backendフォルダでの読み先のフォルダ名
 */
export async function getConnect(type, params, folderName = "") {

    let str = type.slice(1);
    let param = JSON.stringify(params);
    let folder = "";
    if (folderName == "") {
        folder = common.selectFolder(str);
    } else {
        folder = folderName;
    }
    return await axios.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + param + "/" + folder).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}