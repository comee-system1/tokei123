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
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="normal"
            dark
            text
            small
            depressed
            temporary
            v-bind="props"
          >
            <v-icon>mdi-account-circle</v-icon>
            {{ loginName }}
          </v-btn>
        </template>

        <v-list
          v-for="(item, index) in accountMenu"
          :key="index"
          id
          class="accountMenu"
        >
          <v-list-item
            @click="loginDialogFlag = true"
            v-if="item.id == 3"
            height="24"
          >
            {{ item.title }}
          </v-list-item>
          <v-list-item
            v-else
            :to="item.link + '/' + this.queryParam"
            height="24"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <template>
      <v-dialog v-model="loginDialogFlag" width="400">
        <v-card class="loginDialog"
          >ログアウトします。よろしいですか？
          <v-row no-gutters class="mt-3">
            <v-col
              ><v-btn height="24" @click="loginDialogFlag = false"
                >キャンセル</v-btn
              ></v-col
            >
            <v-col
              ><v-btn height="24" class="logout" @click="onLogout()"
                >ログアウト</v-btn
              ></v-col
            >
          </v-row>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  mounted() {
    const searchURL = new URL(window.location);
    let query = searchURL.pathname.split('/');
    this.queryParam = query[2];
    this.loginName = this.keycloak.idTokenParsed.name;
  },
  props: ['keycloak'],

  data() {
    return {
      loginDialogFlag: false,
      queryParam: '',
      drawer: false,
      jigyoName: '社会福祉法人東経会',
      loginName: '',
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
      accountMenu: [
        {
          title: '管理者アカウント情報',
          id: 1,
          link: '/accountsData',
        },
        {
          title: 'チュートリアル',
          id: 2,
          link: '/',
        },
        {
          title: 'ログアウト',
          id: 3,
          link: '',
        },
      ],
    };
  },

  methods: {
    onLogout() {
      this.keycloak.logout();
    },
  },
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
div {
  &.v-list {
    &.accountMenu {
      padding: 0;
      border-radius: 0 !important;
      box-shadow: none !important;
      div {
        &.v-list-item-title,
        &.v-list-item__content {
          font-size: 0.85rem !important;
        }
      }
    }
  }

  .loginDialog {
    font-size: $default_fontsize;
    background-color: $white;
    text-align: center;
    padding: 20px;
    .logout {
      color: $red;
      border: 1px solid $red;
    }
  }
}
</style>
