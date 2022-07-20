const express = require('express')
const app = express()
const log4js = require('log4js');


log4js.configure({
    appenders: {
      app: {
        type: 'file',
        filename: './app.log',
      },
    },
    categories: {
      default: { appenders: ['app'], level: 'info' },
    },
  });

  
const logger = log4js.getLogger();
logger.level = 'info'; // 追加



app.get('/:name', (req, res) => {
   // res.header('Content-Type', 'application/json; charset=utf-8')
   // res.header("Access-Control-Allow-Origin: *");

res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Max-Age', '86400');
//res.sendStatus(200);


    res.send({ message: `hello ${req.params.name}` })
    logger.info(`hello ${req.params.name}`); // 追加
});




app.listen(3000, () => console.log('http://localhost:3000'))
