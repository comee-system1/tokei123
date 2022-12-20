import axios from 'axios';
import common from './Common';
/**********************
 * 第一引数:実行ファイルのパス名
 * 第二引数：json形式
 * 第三引数：backendフォルダでの読み先のフォルダ名
 */
export async function postConnect(type, params, folderName = "", inputParams = []) {
    // console.log("connect ok");
    // console.log("type=>" + type);
    let str = type.slice(1);
    let folder = "";
    if (folderName == "") {
        folder = common.selectFolder(str);
    } else {
        folder = folderName;
    }


    return await axios.post(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + folder + "/" + str, {
        params,
        inputParams
    }).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}