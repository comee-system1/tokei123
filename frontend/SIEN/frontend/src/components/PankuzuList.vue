<template>
  <v-layout>
    <v-flex md12 class="pankuzu-list mt-1">
      <P>
        {{ pageMainTitle }}＞<b>{{ pageTitle }}</b>
      </P>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: this.$route.name,
      pageMainTitle: this.$route.meta.title,
    };
  },
  watch: {
    $route() {
      this.pageTitle = this.$route.name;
      this.pageMainTitle = this.$route.meta.title;
    },
  },
};
</script>

<style scoped>
.pankuzu-list {
  /*background-color: lightgrey;
  */
}

.pankuzu-list p {
  margin: 0;
  font-size: 14px;
}
</style>
