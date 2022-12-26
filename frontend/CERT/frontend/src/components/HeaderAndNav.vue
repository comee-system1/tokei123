<template>
  <div id="headerAndNav">
    <v-app-bar app flat dark dense id="headerTitleBack" height="34">
      <v-flex class="d-flex">
        <v-toolbar-title class="text-subtitle-1">{{
          jigyoName
        }}</v-toolbar-title>
      </v-flex>
      <v-flex class="ml-auto justify-end text-right">
        <v-btn small class="white black--text">設定</v-btn>

        <v-btn color="normal" dark text small depressed temporary>
          <v-icon>mdi-account-circle</v-icon>
          {{ loginName }}
        </v-btn>
      </v-flex>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jigyoName: '管理者用アカウント管理',
      loginName: 'いるか たろう',
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#headerAndNav {
  #headerTitleBack {
    background-color: $deepgreen;
  }
}
</style>
