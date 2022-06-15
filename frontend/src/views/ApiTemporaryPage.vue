<template>
  <div>
    <h3>仮のページです</h3>
    <h3>↓にページタイトルが表示されます</h3>
    <P>{{ currentPageTitle }}</P>
  </div>
</template>

<script>
// require('../../../backend/api/UserListPrint');
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
var url =
  'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';

const params = new URLSearchParams();
params.append('x-api-account', 'tokei');
params.append('x-api-key', 999);
params.append('x-corporation-unique-id', 1);

export default {
  data() {
    return {
      currentPageTitle: this.$route.name,
    };
  },
  created() {
    // axios({
    //   method: 'GET',
    //   url: 'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0',
    //   params: { params },
    //   data: {},
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'x-api-account': 'tokei',
    //     'x-api-key': 999,
    //     'x-corporation-unique-id': 1,
    //   },
    // })

    // うまくいく
    // axios
    //   .get(url)
    // うまくいかない
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

      // axios({
      //   method: 'GET',
      //   url: url,
      //   dataType: 'json',
      //   params: {
      //     //timestamp: Date.now()
      //   },
      //   data: {},
      //   headers: {
      //     accept: 'application/json',
      //     'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'x-api-account': 'tokei',
      //     'x-api-key': 999,
      //     'x-corporation-unique-id': 1,
      //     'x-requested-with': 'XMLHttpRequest',
      //   },
      // })
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
  },
  // async mounted() {
  //   const data = await fetch(
  //     'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0',
  //     {
  //       method: 'GET',
  //       headers: new Headers({
  //         'X-API-ACCOUNT': 'tokei',
  //         'X-API-KEY': '999',
  //         'X-CORPORATION-UNIQUE-ID': '1',
  //       }),
  //     }
  //   );
  //   const json = await data.json();
  //   console.log(json);
  // },
};
</script>
