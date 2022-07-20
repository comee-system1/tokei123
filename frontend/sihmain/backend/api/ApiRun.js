import axios from 'axios';


const DOMAIN = "http://192.168.30.32:80";
const HEADER = {};
HEADER['Content-type'] = "application/json";
HEADER['x-api-account'] = "tokei";
HEADER['x-api-key'] = 999;

let baseUrl = "";
let uniqueId = 1;
let pageid = 1;
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
export function setPageID(id) {
    pageid = id;
}
export function getPageID() {
    return pageid;
}
export async function api() {
    // x-corporation-unique-id は引数によって変わる
    HEADER['x-corporation-unique-id'] = getUniqID();
    //HEADER['x-trace-id'] = getPageID();
    // セッションストレージから取得
    // ログインした時に生成されるID
    HEADER['x-trace-id'] = 'aaa1234';
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