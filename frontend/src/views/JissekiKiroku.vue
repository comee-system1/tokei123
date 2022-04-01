<template>
  <div>
    <h1>実績記録ページです</h1>
    <h1>↓にページタイトルが表示されます</h1>
    <P>{{currentPageTitle}}</P>
  </div>
</template>

<script>

export default{
  data(){
    return{
      currentPageTitle: this.$route.name
    }
  },
}

</script>

<style scoped>

</style>