<template>
  <div>
    <h3>Welcome =>{{ $store.state.userId }}</h3>
    <h3>Token =>{{ $store.state.userToken }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { KJUR, b64utoutf8 } from 'jsrsasign';
export default {
  data() {
    return {
      message: '',
    };
  },
  beforeMount: function () {
    var sJWT = '';
    var token = this.$store.state.userToken;
    var ck = token.split(';');
    let self = this;
    ck.forEach(function (value) {
      //cookie名と値に分ける
      var content = value.split('=');
      if (content[0] === 'token') {
        sJWT = content[1];
      }
    });
    //console.log(sJWT);
    var isValid = KJUR.jws.JWS.verify(sJWT, 'oreore', { alg: ['HS256'] });
    //console.log(isValid);
    if (!isValid) {
      console.log('invalid authentication. route to login...');
      // ストレージに保存
      self.$store.dispatch('auth', {
        //   userId: response.data.code,
        userId: 200,
        userToken: '',
      });

      //  router.push({ name: 'Login', query: { next: this.$route.name } });
      self.$router.push('/SampleLogin');
    } else {
      var payload = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(sJWT.split('.')[1])
      );

      var until = new Date(payload.until);
      var now = new Date();
      console.log(now);
      console.log(until);
      if (now > until) {
        alert('期限切れ');
        console.log('JWT is expired. route to login...');
        // ストレージに保存
        self.$store.dispatch('auth', {
          //   userId: response.data.code,
          userId: 200,
          userToken: '',
        });
        //        router.push({ name: 'Login', query: { next: this.$route.name } });
        self.$router.push('/SampleLogin');
      }
    }
  },
  created: function () {},
  methods: {},
};
</script>
