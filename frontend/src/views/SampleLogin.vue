<template>
  <div>
    <form v-on:submit.prevent="doLogin">
      <label>User ID</label>
      <br />
      <input type="text" placeholder="customer id" v-model="user.userId" />
      <br />
      <label>Password</label>
      <br />
      <input type="password" placeholder="password" v-model="user.password" />
      <br />
      <p>token「{{ $store.state.userToken }}」</p>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
import { KJUR } from 'jsrsasign';

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    console.log(this.$store);
    console.log(KJUR);
  },
  methods: {
    doLogin() {
      // const uri = 'https://api.zipaddress.net/?zipcode=987-2202';
      // this.axios.get(uri).then((response) => {
      //   console.log(response);
      let self = this;
      var url = 'https://api.zipaddress.net/?zipcode=987-2202';
      this.axios.get(url, {}).then(function (response) {
        // 応答が戻ってきたら結果を処理。
        if (response.status === 200) {
          /* JWTトークンの生成 */
          // JWT用のシークレットトークンをセット(【注意】実際にはコードの中に書いてはいけない！)
          var secretToken = 'oreore';
          // JWTのヘッダー部を定義
          var oHeader = { alg: 'HS256', typ: 'JWT' };
          // JWTペイロードを作成
          var offset = Math.floor(Math.random() * Math.floor(15));
          var DO = new Date();
          DO.setSeconds(DO.getSeconds() + offset);
          var dY = DO.getFullYear();
          var dm = DO.getMonth() + 1;
          var dd = DO.getDate();
          var dH = ('0' + DO.getHours()).slice(-2);
          var dM = ('0' + DO.getMinutes()).slice(-2);
          var dS = ('0' + DO.getSeconds()).slice(-2);
          var dStr =
            dY +
            '/' +
            dm +
            '/' +
            dd +
            ' ' +
            dH +
            ':' +
            dM +
            ':' +
            dS +
            ' +0900';
          var oPayload = { username: 'aaaaaaaaaaaaaaaa', until: dStr };
          console.log(oHeader, oPayload);
          // JWTを生成
          var sJWT = KJUR.jws.JWS.sign(
            'HS256',
            JSON.stringify(oHeader),
            JSON.stringify(oPayload),
            secretToken
          );
          console.log(sJWT);

          // ストレージに保存
          self.$store.dispatch('auth', {
            //   userId: response.data.code,
            userId: 200,
            userToken: 'token=' + sJWT,
          });

          self.$router.push('/SampleAuth');

          /*
          // ストレージから取得
          // 複合化
          let token = self.$store.state.userToken;
          var isValid = KJUR.jws.JWS.verify(token, 'oreore', {
            alg: ['HS256'],
          });

          console.log(isValid);
          // 有効期限が取り出せるか検証
          */
        }
      });
      // this.$router.push('/SampleAuth');
      //  });
    },
  },
};
</script>
