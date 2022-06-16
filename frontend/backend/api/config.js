import axios from 'axios';

const HEADER = {};
HEADER['Content-type']  = "application/json";
HEADER['x-api-account']  = "tokei";
HEADER['x-api-key']  = 999;

let baseUrl = "";
let uniqueId = 1;
export function setURL(url){
    baseUrl = url;
}
export function getURL(){
    return baseUrl;
}
export function setUniqID(id){
    uniqueId = id;
}
export function getUniqID(){
    return uniqueId;
}
export function api(myself) {
    // x-corporation-unique-id は引数によって変わるので、変更
    HEADER['x-corporation-unique-id']  = getUniqID();
    var url = getURL();
    axios
    .get(url, {
    headers: HEADER,
    data: {},
    })
    .then(function (response) {
        myself.settingRes(response);
        console.log("OK");
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