import axios from 'axios';
import common from './Common';

export async function postConnect(type, uniqid, traceid) {
    console.log("connect ok1");
    console.log("type=>" + type);
    let str = type.slice(1);
    const data = {
        firstName: 'firstTest',
        lastName: 'lastTest'
    };
    return await axios.post(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + uniqid + "/" + traceid, { data }).then(function (response) {
        // console.log("connects");
        //console.log(response.data);
        console.log('response body:', response.data);
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });

}