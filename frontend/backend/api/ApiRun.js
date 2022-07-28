import axios from 'axios';
import common from './Common';
const DOMAIN = common.DOMAIN;
const HEADER = {};

HEADER['Content-type'] = "application/json";
HEADER['x-api-account'] = "tokei";
HEADER['x-api-key'] = 999;

let baseUrl = "";
let uniqueId = 1;
export function getDomain() {
    return DOMAIN;
}
export function setURL(url) {
    baseUrl = url;
}
export function getURL() {
    return baseUrl;
}
export function setUniqID(id) {
    uniqueId = id;
}
export function getUniqID() {
    return uniqueId;
}

export async function setLogging(uniqid) {
    // ログの書き込み
    await axios.get(common.LOG_DOMAIN + ":" + common.LOG_PORT + "/aaaaa/" + uniqid).then(function (response) {
        console.log("OK");
        return response;
    }).catch(function (error) {
        console.log("ログの書き込みに失敗。サーバーの確認 log.jsの実行を行う");
        console.log(error);
    });
}

export async function api() {
    // x-corporation-unique-id は引数によって変わる
    HEADER['x-corporation-unique-id'] = getUniqID();

    // await setLogging(getUniqID());

    var url = getURL();
    return await axios
        .get(url, {
            headers: HEADER,
            data: {},
        })
        .then(function (response) {
            // console.log("OK");
            // console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log('ERROR');
            console.log(error);
            console.log(typeof error);
            for (let key of Object.keys(error)) {
                console.log(key);
                console.log(error[key]);
            }
            return false;
        });
}