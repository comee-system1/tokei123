import axios from 'axios';
import common from './Common';

export async function postConnect(type, params) {
    // console.log("connect ok");
    // console.log("type=>" + type);
    let str = type.slice(1);
    let data = JSON.stringify(params);
    return await axios.post(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + common.FOLDER, {
        data
    }).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}