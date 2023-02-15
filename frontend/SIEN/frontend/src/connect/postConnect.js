import axios from 'axios';
import common from './Common';
/**********************
 * 第一引数:実行ファイルのパス名
 * 第二引数：json形式
 * 第三引数：backendフォルダでの読み先のフォルダ名
 */
export async function postConnect(type, params, folderName = "", requestBody = []) {
    // console.log("connect ok");
    // console.log("type=>" + type);
    let parameter = {};
    parameter = params;
    parameter.traceid = 123;
    parameter.uniqid = 110003;

    let str = type.slice(1);
    let folder = "";
    if (folderName == "") {
        folder = common.selectFolder(str);
    } else {
        folder = folderName;
    }

    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',

        },
        timeout: 2000,
        data: {}
    };

    // console.log(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + folder + "/" + str);
    return await axios.post(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + folder + "/" + str, {
            requestBody,
            parameter
        },
        headers
    ).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}