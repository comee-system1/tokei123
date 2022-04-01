<template>
  <v-app>
    <v-main>
      <HeaderAndNav></HeaderAndNav>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderAndNav from './components/HeaderAndNav';

export default {
  name: 'App',
  components:{
    HeaderAndNav,
  },
};
</script>

<style scoped>

</style>