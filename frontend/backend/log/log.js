const express = require('express')
const app = express()
const log4js = require('log4js');
const moment = require('moment')
const date = moment().format('YYYYMMDD');

log4js.configure({
  appenders: {
    app: {
      type: 'file',
      filename: '../log/' + date + '.log',
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

app.get('/:name/:code', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  // res.header("Access-Control-Allow-Origin: *");
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  //res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  //res.header('Access-Control-Max-Age', '86400');
  //res.sendStatus(200);
  res.send({
    name: `hello ${req.params.name}`,
    code: `hello ${req.params.code}`
  })
  logger.info(`name=> ${req.params.name}`);
  logger.info(`code=> ${req.params.code}`);
});

app.listen(3000, () => console.log('http://localhost:3000'))