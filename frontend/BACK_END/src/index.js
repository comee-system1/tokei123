const express = require('express')
const app = express()
const log4js = require('log4js');
const moment = require('moment')
const date = moment().format('YYYYMMDD');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors({
    origin: 'http://localhost:8080', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


log4js.configure({
    appenders: {
        app: {
            type: 'file',
            filename: './src/log/' + date + '.log',
        },
    },
    categories: {
        default: {
            appenders: ['app'],
            level: 'info'
        },
    },
});

const logger = log4js.getLogger();
logger.level = 'info';

// getでリクエストがきたときの処理
app.get('/:name/:param/:folder', (req, res) => {

    res.header('Content-Type', 'application/json; charset=utf-8')
    // res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);


    let filename = `${req.params.name}`;
    let params = `${req.params.param}`;
    let param = JSON.parse(params);
    let folder = `${req.params.folder}`;
    const obj = require('./api/' + folder + '/' + filename);

    logger.info(`name=> ${req.params.name}`);
    logger.info("params=>" + params);
    logger.info(`folder=> ${req.params.folder}`);
    logger.info(`request=> GET`);

    obj.connected(param).then(function (response) {
        res.send({
            response: response
        });
        return true;
    }).catch(function (error) {
        console.log("接続失敗1");
        console.log(error);
        return false;
    });
});
// postの処理
app.post('/:name/:folder', (req, res) => {

    res.header('Content-Type', 'application/json; charset=utf-8')
    // res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Max-Age', '86400');
    //res.sendStatus(200);
    // postデータ
    //console.log(req.body);

    let filename = `${req.params.name}`;
    let folder = `${req.params.folder}`;
    let param = req.body;
    // console.log(param);
    const obj = require('./api/' + folder + '/' + filename);

    logger.info(`name=> ${req.params.name}`);
    logger.info(`folder=> ${req.params.folder}`);
    logger.info("params=>" + JSON.stringify(param));
    logger.info("code=>" + param.data.code);
    logger.info(`request=> POST`);



    let defaults = {};
    defaults = {
        uniqid: param.data.uniqid,
        traceid: param.data.traceid
    };
    if (param.data.code === 'POST') {
        /*************************
         * データ登録用
         *****************/
        obj.registed(defaults, param).then(function (response) {
            //console.log(response);
            res.send({
                response: response
            });
            return true;
        }).catch(function (error) {
            console.log("接続失敗");
            // console.log(error);
            return false;
        });

    } else {
        /*************************
         * データ取得用
         *****************/
        obj.connected(defaults).then(function (response) {
            //console.log(response);
            res.send({
                response: response
            });
            return true;
        }).catch(function (error) {
            console.log("接続失敗");
            // console.log(error);
            return false;
        });
    }
});


app.listen(8000, () => console.log('http://localhost:8000'))