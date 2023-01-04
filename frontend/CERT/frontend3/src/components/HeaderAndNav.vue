<template>
  <div id="headerAndNav">
    <v-app-bar absolute dark id="headerTitleBack" elevation="0" height="34">
      <v-toolbar-title>{{ jigyoName }}</v-toolbar-title>
      <v-btn depressed color="black" class="btn" height="28">設定</v-btn>
      <v-btn color="normal" dark text small depressed temporary>
        <v-icon>mdi-account-circle</v-icon>
        {{ loginName }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jigyoName: "管理者用アカウント管理",
      loginName: "いるか たろう",
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";

div#headerAndNav {
  #headerTitleBack {
    background-color: $deepgreen;
    color: $white;
    .v-toolbar-title {
      font-size: 14px;
    }
    .btn {
      background-color: $white;
    }
  }
}
</style>
