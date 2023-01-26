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

        <v-list class="accountMenu">
          <v-list-item
            @click="
              changetypeNumber = 1;
              adminDialog = true;
            "
            height="24"
          >
            管理者アカウント情報
          </v-list-item>
          <v-list-item :to="'/' + this.queryParam" height="24">
            チュートリアル
          </v-list-item>
          <v-list-item @click="logoutDialogFlag = true" height="24"
            >ログアウト
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <ConfirmDialog
      :message="`ログアウトします。よろしいですか？`"
      :width="460"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'ログアウト'"
      v-if="logoutDialogFlag"
      args="logout"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <!--
    <ConfirmDialog
      :message="`変更した内容を登録しますか？`"
      :width="460"
      :leftButton="'キャンセル'"
      :rightButton="'登録'"
      v-if="changetypeNumber == 3"
      args="changed"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
-->
    <ChangeFormDialog
      :title="changeTitle"
      :message="changeMessage"
      :width="460"
      :leftButton="'キャンセル'"
      :rightButton="'登録'"
      v-if="changetypeNumber == 2"
      :args="{
        changing: changetype,
        adminName: form.adminName,
        adminMail: form.adminMail,
      }"
      @dialogChangeMethod="dialogChangeMethod"
      @dialogChangeCancelMethod="dialogChangeCancelMethod"
    />
    <AlertDialog
      v-if="changetypeNumber == 3"
      :message="`登録完了しました`"
      :width="300"
    />
    <v-dialog
      width="500"
      v-if="changetypeNumber == 1"
      v-model="adminDialog"
      id="adminDialog"
      no-click-animation
    >
      <v-card>
        <v-card-title class="dialog_title">
          管理者アカウント情報
          <v-btn class="closeButton pa-0" @click="changetypeNumber = 0">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>ログイン中管理者アカウントの情報を確認・変更ができます。</p>

          <div
            class="mt-3 pb-2 borderbottom"
            :class="{ none: item.id == 3 }"
            v-for="item in adminChangeList"
            :key="item.id"
          >
            <label class="d-flex">
              <span>{{ item.name }}</span>
              <input
                :type="`${item.type}`"
                :class="`yellow v-card ml-1 box pl-1 ${item.class}`"
                v-model="form[item.model_value]"
              />
              <v-tooltip
                v-if="item.adminTooltipText.text"
                class="tooltips"
                :text="`${item.adminTooltipText.text}`"
                max-width="420"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </label>
            <div class="mt-2">
              <v-btn @click="changingForm(`${item.model_value}`)">変更</v-btn>
            </div>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ChangeFormDialog from '@/components/ChangeFormDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';

export default {
  mounted() {
    const searchURL = new URL(window.location);
    let query = searchURL.pathname.split('/');
    this.queryParam = query[2];
    this.loginName = this.keycloak.idTokenParsed.name;
  },
  props: ['keycloak'],
  components: {
    ConfirmDialog,
    ChangeFormDialog,
    AlertDialog,
  },
  data() {
    return {
      adminMailAddress: '',
      adminDialog: true,
      logoutDialogFlag: false,
      // 管理者アカウント情報表示の画面遷移 1:管理者アカウント情報 2:変更情報更新画面 3:変更確認 4:完了
      changetypeNumber: 0,
      // 編集対象のmodel_valueが入る(adminName等)
      changetype: '',
      changeArgs: {},
      adminChangeList: [
        {
          id: 1,
          type: 'text',
          name: '管理者名',
          model_value: 'adminName',
          class: 'min',
          adminTooltipText: {
            text: 'ログイン中の管理者名として表示されます。',
          },
        },
        {
          id: 2,
          type: 'text',
          name: 'メールアドレス',
          model_value: 'adminMail',
          class: 'middle',
          adminTooltipText: {
            text: '管理者システム画面にログインするためのIDにもなります。また、管理者アカウントの認証コードの通知、職員アカウントの追加・変更・無効化・削除の通知にも使用されます。',
          },
        },
        {
          id: 3,
          type: 'password',
          name: 'パスワード',
          model_value: 'adminPassword',
          class: 'middle',
          adminTooltipText: {
            text: '',
          },
        },
      ],
      form: {
        adminName: this.keycloak.idTokenParsed.name,
        adminMail: this.keycloak.idTokenParsed.email,
        adminPassword: '*******',
      },
      changeTitle: '',
      changeDialogTitle: {
        name: '管理者名',
        mail: 'メールアドレス',
        password: 'パスワード',
      },
      changeMessage: '',
      changeDialogMessage: {
        name: 'ログイン中管理者アカウントの管理者名を変更します。',
        mail: 'ログイン中管理者アカウントのメールアドレスを変更します。',
        password: 'ログイン中管理者アカウントのパスワードを変更します。',
      },
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
    };
  },

  methods: {
    dialogConfirmMethod() {
      if (this.logoutDialogFlag) {
        this.keycloak.logout();
      }
      // if (this.changetypeNumber == 3) {
      //   this.changetypeNumber = 4;
      // }
    },
    dialogConfirmCancelMethod() {
      if (this.logoutDialogFlag) {
        this.logoutDialogFlag = false;
      }
      if (this.changetypeNumber == 1) {
        this.changetypeNumber = 0;
      }
      if (this.changetypeNumber == 3) {
        this.changetypeNumber = 1;
      }
    },
    dialogChangeMethod(args) {
      this.changeArgs = args;
      this.changeConfirmFlag = true;
      this.changetypeNumber = 3;
    },
    dialogChangeCancelMethod() {
      this.changetypeNumber = 1;
    },

    changingForm(type) {
      if (type == 'adminName') {
        this.changeTitle = this.changeDialogTitle.name;
        this.changeMessage = this.changeDialogMessage.name;
      }
      if (type == 'adminMail') {
        this.changeTitle = this.changeDialogTitle.mail;
        this.changeMessage = this.changeDialogMessage.mail;
      }
      if (type == 'adminPassword') {
        this.changeTitle = this.changeDialogTitle.password;
        this.changeMessage = this.changeDialogMessage.password;
      }
      this.changetypeNumber = 2;
      this.changetype = type;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
$height: 24px;
%commonCloseButton {
  height: $height;
  min-width: 30px;
  color: $black;
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
}
%doButton {
  color: $white;
  background-color: $dialog_blue;
}

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
#adminDialog {
  font-size: $default_fontsize;
  padding: 10px;
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        @extend %commonCloseButton;
      }
    }
  }

  label {
    display: block;
    position: relative;
    span {
      width: 120px;
      word-wrap: normal;
      display: inline-block;
      background-color: $dialog_label;
      text-align: center;
    }

    .questionIcon {
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      margin-left: 10px;
      background-color: $black;
      color: $white;
      font-size: 8px;
    }
    input {
      &.box {
        border: 1px solid $light-gray;
      }
      &.min {
        width: 240px;
      }
      &.middle {
        width: 320px;
      }
      &.yellow {
        background-color: $dialog_yellow;
      }
    }
  }

  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
    &.none {
      border-bottom: none;
    }
    div {
      text-align: right;
      button {
        height: $height;
        width: 100px;
      }
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
