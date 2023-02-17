// @ts-check
const axios = require('axios')
const Config = require('config');
// @ts-ignore
const DOMAIN = process.env.NODE_ENV === 'production' ? Config.get('api_sogo').base_url : 'http://192.168.30.32:80'; //"";


module.exports = class ApiRun {

    constructor() {
        this.baseUrl = "";
        this.uniqueId = 1;
        this.traceid = 0;
        this.params = {};
        this.query = "";
        this.apiAccount = Config.get('api_sogo').x_api_account;
        this.apiKey = Config.get('api_sogo').x_api_key;
    }
    // paramを取得しqueryを作成
    setQuery(param) {
        var query = "";
        Object.keys(param).forEach(function (key) {
            if (key != "traceid" && key != 'uniqid') {
                query += "&" + key + "=" + param[key];
            }

        });
        this.query = query.slice(1);
    }
    // 値のみでqueryが作成されている場合のquery作成
    setQueryValueOnly(param) {
        var query = "";
        Object.keys(param).forEach(function (key) {
            query += "/" + param[key];
        });
        this.query = query.slice(1);
    }
    getQuery() {
        return this.query;
    }
    getDomain() {
        return DOMAIN;
    }
    setURL(url) {
        this.baseUrl = url;
    }
    getURL() {
        return this.baseUrl;
    }
    setUniqID(id) {
        this.uniqueId = id;
    }

    getUniqID() {
        return this.uniqueId;
    }
    setTraceID(id) {
        this.traceid = id;
    }

    getTraceID() {
        return this.traceid;
    }

    setInputs(data) {
        this.params = data;
    }
    getInputs() {
        return this.params;
    }
    setApiAccount(key = 'api_sogo') {
        this.apiAccount = Config.get(key).x_api_account;
        this.apiKey = Config.get(key).x_api_key;
    }

    async api() {
        const HEADER = {};

        HEADER['x-api-account'] = this.apiAccount;
        HEADER['x-api-key'] = this.apiKey;
        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();
        var url = this.getURL();
        return await axios
            // @ts-ignore
            .get(url, {
                headers: HEADER
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                throw error;

            });
    }

    async apiPost() {
        const HEADER = {};
        HEADER['Content-type'] = "application/json";

        HEADER['x-api-account'] = this.apiAccount;
        HEADER['x-api-key'] = this.apiKey;
        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();
        var url = this.getURL();
        var input = this.getInputs();

        return await axios
            // @ts-ignore
            .post(url, input, {
                headers: HEADER
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                throw error;
            });
    }
    async apiPut() {


        const HEADER = {};
        HEADER['Content-type'] = "application/json";

        HEADER['x-api-account'] = this.apiAccount;
        HEADER['x-api-key'] = this.apiKey;
        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();

        var url = this.getURL();
        var input = this.getInputs();

        // テストデータ
        return await axios
            // @ts-ignore
            .put(url, input, {
                headers: HEADER
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                throw error;
            });
    }

    async apiDelete() {

        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        HEADER['x-api-account'] = this.apiAccount;
        HEADER['x-api-key'] = this.apiKey;
        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();
        var url = this.getURL();
        var input = this.getInputs();
        return await axios
            // @ts-ignore
            .delete(url, {
                headers: HEADER,
                data: input
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {

                throw error;
            });
    }
}