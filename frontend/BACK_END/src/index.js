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
app.use(bodyParser.urlencoded({ extended: true }));


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
app.get('/:name/:uniqid/:trace', (req, res) => {

    res.header('Content-Type', 'application/json; charset=utf-8')
    // res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Max-Age', '86400');
    //res.sendStatus(200);


    let filename = `${req.params.name}`;
    let uniqid = `${req.params.uniqid}`;
    let trace = `${req.params.trace}`;
    const obj = require('./api/' + filename);

    logger.info(`name1=> ${req.params.name}`);
    logger.info(`uniqid=> ${req.params.uniqid}`);
    logger.info(`trace=> ${req.params.trace}`);
    logger.info(`request=> GET`);

    obj.connected(uniqid, trace).then(function (response) {
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
});
// postの処理
app.post('/:name/:uniqid/:trace', (req, res) => {

    res.header('Content-Type', 'application/json; charset=utf-8')
    // res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Max-Age', '86400');
    //res.sendStatus(200);
    console.log("ddddddddddddd");
    console.log(req.body);

    let filename = `${req.params.name}`;
    let uniqid = `${req.params.uniqid}`;
    let trace = `${req.params.trace}`;

    //    const obj = require('./api/' + filename);

    logger.info(`name1=> ${req.params.name}`);
    logger.info(`uniqid=> ${req.params.uniqid}`);
    logger.info(`trace=> ${req.params.trace}`);
    logger.info(`request=> POST`);

    // obj.connected(uniqid, trace).then(function (response) {
    //     //console.log(response);
    //     res.send({
    //         response: response
    //     });
    //     return true;
    // }).catch(function (error) {
    //     console.log("接続失敗");
    //     // console.log(error);
    //     return false;
    // });
});


app.listen(8000, () => console.log('http://localhost:8000'))