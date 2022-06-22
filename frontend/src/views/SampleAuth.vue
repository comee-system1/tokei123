<template>
  <div>
    <h3>Welcome =>{{ $store.state.userId }}</h3>
    <h3>Token =>{{ $store.state.userToken }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      message: '',
    };
  },
  created: function () {
    this.fetchHello();
  },
  methods: {
    fetchHello() {
      const uri = 'https://api.zipaddress.net/?zipcode=987-2202';
      this.axios
        .get(uri, {
          // headers: {
          //   'Content-Type': 'application/json',
          //   Authorization: this.$store.state.userToken,
          // },
          //   data: {},
        })
        .then((response) => {
          console.log(response);
          this.message =
            'ステータス「' + response.status + '」で認証成功しました';
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
