import axios from 'axios';
import common from './Common';

export async function getConnect(type, uniqid, traceid) {

    let str = type.slice(1);
    return await axios.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + uniqid + "/" + traceid).then(function (response) {
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });
}