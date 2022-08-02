import axios from 'axios';
import common from './Common';

export async function postConnect(type, params, ) {
    console.log("connect ok");
    console.log("type=>" + type);
    let str = type.slice(1);
    const data = params;
    return await axios.post(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/" + str + "/" + common.FOLDER, {
        data
    }).then(function (response) {
        // console.log("connects");
        //console.log(response.data);
        console.log('response body:', response.data);
        return response.data.response;
    }).catch(function (error) {
        console.log("api接続用サーバーに接続失敗。BACKENDの実行確認");
        console.log(error);
    });

}