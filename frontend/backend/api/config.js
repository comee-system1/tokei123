import axios from 'axios';

const HEADER = {};
HEADER['Content-type'] = "application/json";
HEADER['x-api-account'] = "tokei";
HEADER['x-api-key'] = 999;

let baseUrl = "";
let uniqueId = 1;
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
export async function api() {
    // x-corporation-unique-id は引数によって変わるので、変更
    HEADER['x-corporation-unique-id'] = getUniqID();
    var url = getURL();
    return await axios
        .get(url, {
            // 本番は有効
            // headers: HEADER,
            // data: {},
        })
        .then(function (response) {
            console.log("OK");
            //console.log(response);
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