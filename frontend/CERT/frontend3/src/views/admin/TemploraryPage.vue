<template>
  <div>
    <p>secret</p>
    <pre>
    {{ aaa }}
    {{ userName }}
    </pre>
  </div>
</template>
<script>
//import axios from 'axios';
import { reactive, effect } from 'vue';
export default {
  props: ['keycloak', 'userName'],
  data() {
    return {
      aaa: '',
    };
  },
  mounted() {
    console.log('sss');
    console.log(this.keycloak);
    //this.aaa = this.keycloak;

    const reactiveObj = reactive(this.keycloak);

    effect(() => {
      //reactiveObj.b = reactiveObj.a * 10;
    });
    console.log(reactiveObj);
    this.aaa = reactiveObj;
    /*
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
      */
  },
  methods: {},
};
</script>
