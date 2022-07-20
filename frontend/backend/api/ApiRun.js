import axios from 'axios';
const DOMAIN = "http://192.168.30.32:80";
const HEADER = {};
HEADER['Content-type'] = "application/json";
HEADER['x-api-account'] = "tokei";
HEADER['x-api-key'] = 999;


axios.get("http://localhost:3000/hoge").then(function (response) {
    console.log("OK");
    // console.log(response);
    //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response;
}).catch(function (error) {
    console.log(error);
});

// var xhr = new XMLHttpRequest();
// xhr.open("GET","http://localhost:3000/hoge");
// xhr.onload = function(resp){
// console.log(resp);
// }
// xhr.send();
  


let baseUrl = "";
let uniqueId = 1;
export function getDomain(){
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
export async function api() {


    // x-corporation-unique-id は引数によって変わる
    HEADER['x-corporation-unique-id'] = getUniqID();
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
