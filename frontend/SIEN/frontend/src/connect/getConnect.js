import axios from 'axios';
import common from './Common';
/**********************
 * 第一引数:実行ファイルのパス名
 * 第二引数：json形式
 * 第三引数：backendフォルダでの読み先のフォルダ名
 */
export async function getConnect(type, params, folderName = "") {

    let str = type.slice(1);
    let traceid = 123;
    let uniqid = 3;
    let sample = 123;
    let param = JSON.stringify(params);

    let folder = "";
    if (folderName == "") {
        folder = common.selectFolder(str);
    } else {
        folder = folderName;
    }

    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',

        },
        data: {}
    });
    instance.timeout = 5000;
    console.log(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + folder + "/" + str + "?param=" + param);
    return await instance.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + folder + "/" + str + "?param=" + param, {
        params: {
            traceid: traceid,
            uniqid: uniqid,
            sample: sample,
        }
    }).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
        throw error;
    });
}