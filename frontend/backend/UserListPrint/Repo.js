const axios = require('axios');
let uname = 'tokei';
let pwd = 'tokei';
const encoded = btoa(uname);
console.log(encoded);
axios.post("http://@172.32.1.190/sodan/v1/mst/title?pJigyoid=43&pKbn=1", {
auth: {
    username:uname,
    password:pwd
},
})
.then(function (response) {

console.log(response);
})
.catch(function (error) {
console.log("ERROR");
console.log(error);
console.log(typeof(error));
for(let key of Object.keys(error)) {
    console.log(key);
    console.log(error[key]);
  }
});


exports.hello = name => `Hello ${name}`
exports.goodbye = name => `Goodbye ${name}`