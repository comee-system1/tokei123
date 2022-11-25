var express = require("express");
var app = express();


const {
    execSync
} = require('child_process')
app.get("/api/keycloak/list", function (req, res, next) {
    const stdout = execSync('sh ./shell/sample.sh');
    res.send("hello world 123");
    console.log(`12stdout: ${stdout}`)
    return true;

});

app.listen(3000, () => console.log('http://localhost:3000'))