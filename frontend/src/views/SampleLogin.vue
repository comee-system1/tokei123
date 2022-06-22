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
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    console.log(this.$store);
  },
  methods: {
    doLogin() {
      // const uri = 'https://api.zipaddress.net/?zipcode=987-2202';
      // this.axios.get(uri).then((response) => {
      //   console.log(response);

      this.$store.dispatch('auth', {
        //   userId: response.data.code,
        userId: 200,
        userToken: 'ddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      });

      this.$router.push('/SampleAuth');
      //  });
    },
  },
};
</script>
