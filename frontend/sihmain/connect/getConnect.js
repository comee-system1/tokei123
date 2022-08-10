import axios from 'axios';
import common from './Common';

export async function getConnect(type, params) {

    let str = type.slice(1);
    let param = JSON.stringify(params);
    return await axios.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + param + "/" + common.FOLDER).then(function (response) {
        console.log(response);
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        // console.log(error);
    });
}