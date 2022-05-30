<template>
  <div>
    <h3>仮のページです</h3>
    <h3>↓にページタイトルが表示されます</h3>
    <P>{{currentPageTitle}}</P>
  </div>
</template>

<script>
export default{
  data(){
    return{
      currentPageTitle: this.$route.name
    }
  }
}
</script>
