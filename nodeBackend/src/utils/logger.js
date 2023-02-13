// @ts-check
const Log4js = require('log4js');
const HttpContext = require('express-http-context');
const Config = require('config');
const RetRequestId = function () {
    return HttpContext.get('requestId') ? HttpContext.get('requestId') : 'none';
};

Log4js.configure(Config.get('log4js'));

const Loggers = {};

/**
 * log4jsのロガーを生成する。以前に生成されたことのあるカテゴリが指定された場合、同一のロガーインスタンスを返す。
 * @param {string} category ロガーのカテゴリ
 * @returns ロガーインスタンス
 */
exports.logger = function (category = 'default') {
    var logger = null;
    if (category in Loggers) {
        logger = Loggers[category];
    } else {

        logger = Log4js.getLogger();

        Loggers[category] = logger;
    }
    logger.addContext('requestId', RetRequestId);
    return logger;
};