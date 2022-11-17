<template>
  <div>
    <p>token</p>
    <!--
    {{ keycloak.idToken }}
    <hr />
    -->
    <pre>
    {{ keycloak }}
    </pre>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['keycloak'],
  mounted() {
    axios
      .get(
        //'http://localhost:8884/realms/general910/protocol/openid-connect/userinfo', // ユーザー情報
        //'http://localhost:8884/realms/general910/.well-known/openid-configuration', // エンドポイント
        'http://localhost:8884/realms/general910/protocol/openid-connect/logout',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + this.keycloak.token,
          },
        }
      )
      .then(function (response) {
        console.log('API CONNECT OK');
        console.log(response);
      })
      .catch(function (error) {
        console.log('Api Error');
        console.log(error);
      })
      .finally(function () {
        // always executed(axiosの処理結果によらずいつも実行させたい処理を記述)
      });
  },
};
</script>
