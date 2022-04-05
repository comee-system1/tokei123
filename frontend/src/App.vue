<template>
  <v-app>
    <v-main>
      <HeaderAndNav></HeaderAndNav>
      <PankuzuList></PankuzuList>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderAndNav from './components/HeaderAndNav';
import PankuzuList from './components/PankuzuList';

export default {
  name: 'App',
  components:{
    HeaderAndNav,
    PankuzuList
  },
};
</script>

<style scoped>

</style>