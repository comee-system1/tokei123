const express = require('express');
const log4js = require('log4js');
const moment = require('moment')
const date = moment().format('YYYYMMDD');
app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? ['https://t-sct1wb00.fukushikenbunroku.com:50443', 'https://t-sct1wb00.fukushikenbunroku.com:55443'] : 'http://localhost:8080', //アクセス許可するオリジン
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

const config = {
    EXPRESS: app,
    LOG: logger
}

module.exports = config;