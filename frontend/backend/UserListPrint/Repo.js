import axios from 'axios';
var url =
  'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  
axios
.get(url, {
  headers: {
    'Content-type': 'application/json',
    'x-api-account': 'tokei',
    'x-api-key': 999,
    'x-corporation-unique-id': 1,
  },
  data: {},
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log('ERROR');
  console.log(error);
  console.log(typeof error);
  for (let key of Object.keys(error)) {
    console.log(key);
    console.log(error[key]);
  }
});
