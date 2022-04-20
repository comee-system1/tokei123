<template>
  <div>
    <h3>給付明細itiraページです</h3>
    <h3>↓にページタイトルが表示されます</h3>
    <P>{{ currentPageTitle }}</P>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPageTitle: this.$route.name,
    };
  },
};
</script>

<style scoped>
</style>