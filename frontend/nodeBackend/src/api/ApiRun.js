// @ts-check
const axios = require('axios')
// @ts-ignore
const DOMAIN = process.env.NODE_ENV === 'production' ? 'http://192.168.10.32' : 'http://192.168.30.32'; //"";


module.exports = class ApiRun {
    constructor() {
        this.baseUrl = "";
        this.uniqueId = 1;
        this.traceid = 0;
        this.params = {};
        this.query = "";
    }
    // paramを取得しqueryを作成
    setQuery(param) {
        var query = "";
        Object.keys(param).forEach(function (key) {
            query += "&" + key + "=" + param[key];
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

    async api() {
        // x-corporation-unique-id は引数によって変わる
        const HEADER = {};
        if (this.getUniqID() == 1) {
            // HEADER['Content-type'] = "application/json";//GETでは不要
            HEADER['x-api-account'] = 'tokei';
            HEADER['x-api-key'] = '999';
        }
        if (this.getUniqID() == 2) {
            // HEADER['Content-type'] = "application/json";
            HEADER['x-api-account'] = 'tokei2';
            HEADER['x-api-key'] = '989';
        }
        if (this.getUniqID() == 3) {
            // HEADER['Content-type'] = "application/json";
            HEADER['x-api-account'] = 'tokei3';
            HEADER['x-api-key'] = '987';
        }

        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();
        //HEADER['x-corporation-unique-id'] = '2';
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
                console.log('API ERROR!');
                //console.log(error);
                // console.log(typeof error);
                // for (let key of Object.keys(error)) {
                //     console.log(key);
                //     console.log(error[key]);
                // }
                return false;
            });
    }

    async apiPost() {

        // x-corporation-unique-id は引数によって変わる

        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        if (this.getUniqID() == 1) {
            HEADER['Content-type'] = "application/json";
            HEADER['x-api-account'] = 'tokei';
            HEADER['x-api-key'] = '999';
        }
        if (this.getUniqID() == 2) {
            HEADER['Content-type'] = "application/json";
            HEADER['x-api-account'] = 'tokei2';
            HEADER['x-api-key'] = '989';
        }
        if (this.getUniqID() == 3) {
            HEADER['Content-type'] = "application/json";
            HEADER['x-api-account'] = 'tokei3';
            HEADER['x-api-key'] = '987';
        }
        HEADER['x-trace-id'] = this.getTraceID();
        HEADER['x-corporation-unique-id'] = this.getUniqID();
        var url = this.getURL();
        var input = this.getInputs();
        console.log(HEADER);
        // テストデータ
        return await axios
            // @ts-ignore
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
    async apiPut() {

        // x-corporation-unique-id は引数によって変わる

        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        if (this.getUniqID() == 1) {
            HEADER['x-api-account'] = 'tokei';
            HEADER['x-api-key'] = '999';
        }
        if (this.getUniqID() == 2) {
            HEADER['x-api-account'] = 'tokei2';
            HEADER['x-api-key'] = '989';
        }
        if (this.getUniqID() == 3) {
            HEADER['x-api-account'] = 'tokei3';
            HEADER['x-api-key'] = '987';
        }
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
                console.log('API ERROR');
                // console.log(error);
                // console.log(typeof error);
                // for (let key of Object.keys(error)) {
                //     console.log(key);
                //     console.log(error[key]);
                // }
                return false;
            });
    }

    async apiDelete() {

        // x-corporation-unique-id は引数によって変わる

        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        if (this.getUniqID() == 1) {
            HEADER['x-api-account'] = 'tokei';
            HEADER['x-api-key'] = '999';
        }
        if (this.getUniqID() == 2) {
            HEADER['x-api-account'] = 'tokei2';
            HEADER['x-api-key'] = '989';
        }
        if (this.getUniqID() == 3) {
            HEADER['x-api-account'] = 'tokei3';
            HEADER['x-api-key'] = '987';
        }
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
                console.log('API ERROR');
                console.log(error);
                console.log(typeof error);
                for (let key of Object.keys(error)) {
                    console.log(key);
                    console.log(error[key]);
                }
                return false;
            });
    }
}