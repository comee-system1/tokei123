<template>
  <div id="headerAndNav">
    <v-navigation-drawer v-model="drawer" class="navi" temporary>
      <h1 id="top">福祉見聞録</h1>
      <v-list-item
        :to="value.link + '/' + this.queryParam"
        class="sublists"
        v-for="(value, k) in listItems"
        :key="k"
      >
        <v-list-item-title
          ><v-icon> {{ value.props.prependIcon }}</v-icon>
          {{ value.name }}</v-list-item-title
        >
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar absolute dark id="headerTitleBack" elevation="0" height="34">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          height="25"
          width="25"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title>{{ jigyoName }}</v-toolbar-title>
      <v-btn color="normal" dark text small depressed temporary>
        <v-icon>mdi-account-circle</v-icon>
        {{ loginName }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  mounted() {
    const searchURL = new URL(window.location);
    let query = searchURL.pathname.split('/');
    this.queryParam = query[2];
  },
  data() {
    return {
      queryParam: '',
      drawer: false,
      jigyoName: '社会福祉法人東経会',
      loginName: 'いるか たろう',

      listItems: [
        {
          name: '職員アカウント設定',
          id: 1,
          link: '/staffData',
          props: {
            prependIcon: 'mdi-clipboard-text-outline',
          },
        },
        {
          name: '管理者アカウント設定',
          id: 2,
          link: '/accountsData',
          props: {
            prependIcon: 'mdi-account ',
          },
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#headerAndNav {
  #top {
    background-image: url('../assets/logo_black.png');
    background-size: 50%;
    background-position: center center;
    height: 60px;
    text-indent: -999px;
  }
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
