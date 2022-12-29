<template>
  <div>
    <p>secret</p>

    <p>token</p>

    {{ keycloak.idToken }}
    <hr />

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
      .get('http://localhost:3000/api/keycloak/list')
      .then(function (response) {
        console.log('aaa');
        console.log(response);
      })
      .catch(function (error) {
        console.log('api接続用サーバーに接続失敗。BACKENDの実行確認');
        console.log(error);
      });
  },
  methods: {},
};
</script>
