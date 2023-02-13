// @ts-check
const Express = require('express');

const HttpContext = require('express-http-context');
const BodyParser = require("body-parser");
const Config = require('config');
const Helmet = require('helmet');
const Logger = require('./utils/logger').logger();
const {
    check,
    validationResult
} = require('express-validator')

// Express起動用のポート番号を指定する
const Port = process.env.PORT || Config.get('express').port;
const App = Express();
// 基本的な機能を利用可能にする
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

// @ts-ignore
App.use(Helmet({
    hsts: {
        maxAge: 15552000,
        includeSubDomains: false,
        preload: false
    }
}));

// リクエストIDを生成する
App.use(HttpContext.middleware);
App.use((req, res, next) => {
    const requestId = req.get('x-request-id');
    HttpContext.set('requestId', requestId);
    // 静的リソース以外へのアクセスについて開始ログを出力する。
    if (!/^\/(?:js|img|css|favicon.ico)/.exec(req.originalUrl)) {
        Logger.info('処理を開始します。[' +
            req.method + ',' +
            req.originalUrl +
            ',X-Original-For=' +
            req.header('X-Original-For') +
            ',X-Forwarded-For=' +
            req.header('X-Forwarded-For') + ']');
    }
    next();
});


// 待ち受けポートを設定する
App.listen(Port, () =>
    Logger.info('リクエストの待ち受けを開始します。[Port=' + Port + ']')
);

// getでリクエストがきたときの処理
App.get('/:folder/:name', (req, res) => {
    res.type('text/plain');
    try {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

        let filename = `${req.params.name}`;

        let params = `${req.query.param}`;
        params = JSON.parse(params);

        params['traceid'] = req.query.traceid;
        params['uniqid'] = req.query.uniqid;

        let folder = `${req.params.folder}`;
        const obj = require('./api/' + folder + '/' + filename);

        obj.connected(params).then(function (response) {
            res.send({
                response: response
            });
            Logger.info('処理が正常終了しました。');
        }).catch(function (error) {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        });
    } catch (error) {
        Logger.error(error);
        if (error.code == 'MODULE_NOT_FOUND') {
            Logger.error('URLが不正です。');
            res.status(404)
                .send('{"message":"URLが不正です。"}');
        } else {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        }

    }
});
// postの処理
App.post('/:folder/:name', (req, res) => {
    try {
        res.header('Content-Type', 'application/json; charset=utf-8')
        // res.header("Access-Control-Allow-Origin: *");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'POST');
        // res.header('Access-Control-Allow-Credentials', true);
        //res.header('Access-Control-Max-Age', '86400');
        //res.sendStatus(200);
        // postデータ
        // console.log(req.body);

        let filename = `${req.params.name}`;
        let folder = `${req.params.folder}`;
        let param = {
            query: req.body.params,
            data: req.body.inputParams,
        }
        // console.log(param);
        const obj = require('./api/' + folder + '/' + filename);

        // logger.info(`name=> ${req.params.name}`);
        // logger.info(`folder=> ${req.params.folder}`);
        // logger.info("params=>" + JSON.stringify(param));
        // logger.info(`request=> POST`);



        let defaults = {};
        defaults = {
            uniqid: param.data.uniqid,
            traceid: param.data.traceid
        };
        /*************************
         * データ登録用
         *****************/
        obj.registed(param.query, param.data).then(function (response) {
            res.send({
                response: response
            });
            Logger.info('処理が正常終了しました。');
        }).catch(function (error) {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        });
    } catch (error) {
        Logger.error(error);
        if (error.code == 'MODULE_NOT_FOUND') {
            Logger.error('URLが不正です。');
            res.status(404)
                .send('{"message":"URLが不正です。"}');
        } else {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        }
    }
});
// deleteの処理
App.delete('/:folder/:name', (req, res) => {
    try {
        res.header('Content-Type', 'application/json; charset=utf-8')
        // res.header("Access-Control-Allow-Origin: *");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'DELETE');
        //     res.header('Access-Control-Allow-Credentials', true);
        //res.header('Access-Control-Max-Age', '86400');
        //res.sendStatus(200);
        // postデータ
        //console.log(req.body);

        let filename = `${req.params.name}`;
        let folder = `${req.params.folder}`;
        let param = {
            query: req.body.params,
            data: req.body.inputParams,
        }
        const obj = require('./api/' + folder + '/' + filename);

        // logger.info(`name=> ${req.params.name}`);
        // logger.info(`folder=> ${req.params.folder}`);
        // logger.info("params=>" + JSON.stringify(param));
        // logger.info(`request=> DELETE`);

        let defaults = {};
        defaults = {
            uniqid: param.data.uniqid,
            traceid: param.data.traceid
        };
        /*************************
         * データ削除
         *****************/
        obj.deleted(param.query, param.data).then(function (response) {
            //console.log(response);
            res.send({
                response: response
            });
            Logger.info('処理が正常終了しました。');
        }).catch(function (error) {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        });
    } catch (error) {
        Logger.error(error);
        if (error.code == 'MODULE_NOT_FOUND') {
            Logger.error('URLが不正です。');
            res.status(404)
                .send('{"message":"URLが不正です。"}');
        } else {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        }

    }
});


// putの処理
App.put('/:folder/:name', (req, res) => {
    try {
        res.header('Content-Type', 'application/json; charset=utf-8')
        // res.header("Access-Control-Allow-Origin: *");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'PUT');
        //    res.header('Access-Control-Allow-Credentials', true);
        //res.header('Access-Control-Max-Age', '86400');
        //res.sendStatus(200);
        // putデータ
        // console.log(req.body);

        let filename = `${req.params.name}`;
        let folder = `${req.params.folder}`;
        let param = {
            query: req.body.params,
            data: req.body.inputParams,
        }
        // console.log(param);
        const obj = require('./api/' + folder + '/' + filename);

        // logger.info(`name=> ${req.params.name}`);
        // logger.info(`folder=> ${req.params.folder}`);
        // logger.info("params=>" + JSON.stringify(param));
        // logger.info(`request=> PUT`);



        let defaults = {};
        defaults = {
            uniqid: param.data.uniqid,
            traceid: param.data.traceid
        };
        /*************************
         * データ更新用
         *****************/
        obj.update(param.query, param.data).then(function (response) {
            //console.log(response);
            res.send({
                response: response
            });
            Logger.info('処理が正常終了しました。');
        }).catch(function (error) {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        });
    } catch (error) {
        Logger.error(error);
        if (error.code == 'MODULE_NOT_FOUND') {
            Logger.error('URLが不正です。');
            res.status(404)
                .send('{"message":"URLが不正です。"}');
        } else {
            Logger.error('システムエラーが発生しました。[' + error + ']');
            res.status(500)
                .send('{"message":"サーバで予期しないエラーが発生しました。"}');
        }
    }
});