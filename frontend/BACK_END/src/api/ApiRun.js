const axios = require('axios')

// const LOG_DOMAIN = "http://localhost";
// const LOG_PORT = "3000";
const DOMAIN = "http://192.168.30.32";

let baseUrl = "";
let uniqueId = 1;
let traceid = 0;
let params = {};

exports.getDomain = function () {
    return DOMAIN;
}
exports.setURL = function (url) {
    baseUrl = url;
}
exports.getURL = function () {
    return baseUrl;
}
exports.setUniqID = function (id) {
    uniqueId = id;
}

exports.getUniqID = function () {
    return uniqueId;
}
exports.setTraceID = function (id) {
    traceid = id;
}

exports.getTraceID = function () {
    return traceid;
}

exports.setInputs = function (param) {
    // 不要なカラムを削除
    delete param.data.code;
    delete param.data.uniqid;
    delete param.data.traceid;
    params = param.data;
}
exports.getInputs = function () {

    return params;
}

exports.api = async function () {

    // x-corporation-unique-id は引数によって変わる

    const HEADER = {};

    HEADER['Content-type'] = "application/json";
    HEADER['x-api-account'] = 'tokei';
    HEADER['x-api-key'] = '999';
    HEADER['x-trace-id'] = this.getTraceID();
    HEADER['x-corporation-unique-id'] = this.getUniqID();
    var url = this.getURL();
    return await axios
        .get(url, {
            headers: HEADER
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log('API ERROR!');
            //console.log(error);
            //console.log(typeof error);
            // for (let key of Object.keys(error)) {
            //     console.log(key);
            //     console.log(error[key]);
            // }
            return false;
        });
}

exports.apiPost = async function () {

    // x-corporation-unique-id は引数によって変わる

    const HEADER = {};

    HEADER['Content-type'] = "application/json";
    HEADER['x-api-account'] = 'tokei';
    HEADER['x-api-key'] = '999';
    HEADER['x-trace-id'] = this.getTraceID();
    HEADER['x-corporation-unique-id'] = this.getUniqID();
    var url = this.getURL();
    var input = this.getInputs();
    console.log("inputs");
    console.log(input);
    // テストデータ
    return await axios
        .post(url, input, {
            headers: HEADER
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log('API ERROR');
            console.log(error);
            // console.log(typeof error);
            // for (let key of Object.keys(error)) {
            //     console.log(key);
            //     console.log(error[key]);
            // }
            return false;
        });
}