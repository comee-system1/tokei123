<template>
    <v-layout>
      <v-flex md12 class="pankuzu-list">
        <P>入所レセプト請求＞{{pageTitle}}</P>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data(){
    return{
      pageTitle: this.$route.name,
		}
  },
	watch: {
    $route() {
      this.pageTitle = this.$route.name;
    }
  }
}
</script>

<style scoped>
.pankuzu-list{
  background-color: lightgrey;
}

.pankuzu-list p {
  margin:0;
  font-size:12px;
}
</style>