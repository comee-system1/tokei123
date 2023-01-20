<template>
  <div class="pa-1" id="adminData">
    <v-row no-gutters class="d-flex pt-1 pb-1" id="subTitle">
      <h2>{{ $route.meta.title }}</h2>
      <label>{{ $route.meta.sub }}</label>
    </v-row>
    <v-row no-gutters class="mt-1">
      <v-btn height="24" @click="openDialog('new')">
        <v-icon>mdi-alert-circle</v-icon>
        新規登録</v-btn
      >
    </v-row>
    <v-row no-gutters class="mt-2">
      <wj-flex-grid
        id="adminListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="4"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="adminViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-column
          :width="80"
          header="コード"
          binding="code"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :width="200"
          header="管理者名"
          binding="adminName"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :width="300"
          header="メールアドレス"
          binding="mailaddress"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>

        <wj-flex-grid-filter />
      </wj-flex-grid>
    </v-row>

    <completeDialog
      v-if="dialogType == 'newResult'"
      :message="`管理者アカウントを発行しました。`"
      :width="650"
      args="adminAccountRegist"
      @dialogCompleteMethod="dialogCompleteMethod"
      :body="{
        text1: '管理者アカウントIDと仮パスワードをメールにて通知します。 ',
        text2: {
          title: 'ログイン中管理者メールアドレス',
          body: adminMailAddress,
        },
        text3: {
          title: '新規管理者メールアドレス',
          body: dialogAdminMail,
        },
      }"
    />
    <ConfirmDialog
      :message="`変更した内容を登録しますか?`"
      :width="300"
      v-if="dialogType == 'editConf'"
      args="editConf"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <AlertDialog
      v-if="dialogType == 'editFin'"
      :message="`登録完了しました`"
      :width="300"
    />

    <ConfirmDialog
      :message="deleteAdminName + `さんの管理者アカウントを削除しますか？`"
      :submessage="`削除すると下記の情報が失われ、管理者システムにログインできなくなります。`"
      :listBox="{
        list1: '管理者名',
        list2: 'メールアドレス',
      }"
      :width="630"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogType == 'delete'"
      args="adminDelete"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <ConfirmDialog
      :message="`本当に削除してもよろしいですか？`"
      alertIcon="alert"
      :submessage="`※元に戻す場合は、管理者アカウントの再登録が必要になります。`"
      :width="530"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogType == 'deleteConf'"
      args="adminDeleteConf"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="dialogType == 'deleteFin'"
      :message="`削除完了しました`"
      :width="300"
    />

    <v-dialog width="500" v-model="dialogAccountFlag" id="dialogAdmin">
      <!--管理者アカウント新規登録フォーム-->
      <v-card
        v-if="
          dialogType == 'new' ||
          dialogType == 'edit' ||
          dialogType == 'editConf' ||
          dialogType == 'delete'
        "
      >
        <v-card-title class="dialog_title">
          管理者アカウント情報
          <v-btn class="closeButton pa-0" @click="dialogAccountFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>
            管理者アカウントを発行し、管理者システムを利用できる状態にします。
          </p>
          <v-row no-gutters class="borderbottom pb-2 mt-1">
            <label class="tle inq">管理者名</label>
            <input
              type="text"
              class="v-card ml-1 box min pl-1"
              v-model="dialogAdminName"
            />
          </v-row>
          <v-row no-gutters class="pb-2 mt-1">
            <div>
              <label class="tle inq">メールアドレス</label>
            </div>
            <div class="questionarea">
              <input
                type="text"
                class="v-card ml-1 box mdl pl-1"
                v-model="dialogAdminMail"
              />
              <v-tooltip
                data-html="true"
                :text="dialogMessageMail"
                max-width="420"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-row>

          <v-row no-gutters class="mt-3">
            <v-col cols="3">
              <v-btn
                class="deleteButton htmin"
                :disabled="deleteDisableFlag"
                @click="dialogDelete()"
                >削除</v-btn
              >
            </v-col>
            <v-col class="text-end">
              <v-btn class="ml-2 registButton htmin" @click="dialogRegist()"
                >登録</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';

import completeDialog from '@/components/completeDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';

export default {
  props: ['keycloak'],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    completeDialog,
    ConfirmDialog,
    AlertDialog,
  },
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  data() {
    return {
      flexGrid: {},
      gridSelectedRow: 0,
      dialogAccountFlag: false,
      deleteDisableFlag: false,
      dialogType: '', // new/newResult/edit/editConf/editFin/delete/deleteConf/deleteFin

      adminViewData: [],
      headerheight: 140,
      dialogAdminName: '',
      dialogAdminMail: '',
      deleteAdminName: '',
      dialogMessageMail:
        '登録されたメールアドレスが、管理者システム画面にログインする際のIDとなります。他の管理者で使用しているメールアドレスと重複はできません。',
      adminMailAddress: this.keycloak.idTokenParsed.email,
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('adminListGrid') != null) {
        document.getElementById('adminListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.adminViewData = [];
      let tmp = [];
      tmp.push({
        code: '001',
        adminName: 'いるか　たろう',
        mailaddress: 'taro.ifuka@example.com',
      });
      tmp.push({
        code: '002',
        adminName: 'みどり　たろう',
        mailaddress: 'taro.ifuka@example.com',
      });
      tmp.push({
        code: '003',
        adminName: 'おれんじ　たろう',
        mailaddress: 'taro.ifuka@example.com',
      });
      tmp.push({
        code: '004',
        adminName: 'すいか　たろう',
        mailaddress: 'taro.ifuka@example.com',
      });
      tmp.push({
        code: '005',
        adminName: 'ほんぶ　たろう',
        mailaddress: 'taro.ifuka@example.com',
      });
      this.adminViewData = tmp;
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        _self.gridSelectedRow = ht.row;
        if (ht.panel == flexGrid.cells) {
          let temp = flexGrid.itemsSource;
          _self.openDialog('edit', temp[ht.row]);
        }
      });
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col >= 1) {
          e.cell.style.textAlign = 'left';
        }
      }
    },

    /*****************
     * 新規登録ボタン
     * グリッドを押下編集
     */
    openDialog(type, editdata = []) {
      this.dialogAccountFlag = true;
      this.dialogType = type;

      if (type == 'edit') {
        this.deleteDisableFlag = false; // 削除ボタン有効
      } else {
        this.deleteDisableFlag = true; // 削除ボタン無効化
      }
      this.dialogAdminName = editdata.adminName;
      this.dialogAdminMail = editdata.mailaddress;
    },
    /***********************
     * ダイアログ削除ボタン
     */
    dialogDelete() {
      this.dialogType = 'delete';

      let tmp = this.flexGrid.itemsSource[this.gridSelectedRow];
      this.deleteAdminName = tmp.adminName;
    },

    /****************
      ダイアログ登録ボタン
    */
    dialogRegist() {
      // 新規登録の時
      if (this.dialogType == 'new') {
        this.dialogType = 'newResult';
        this.dialogAccountFlag = false;
      }
      // 編集の時
      if (this.dialogType == 'edit') {
        this.dialogType = 'editConf';
      }
    },
    /*********************************
     * 完了ダイアログからの戻り
     */
    dialogCompleteMethod(args = {}) {
      console.log(args);
      if (this.dialogType == 'newResult') {
        this.dialogAccountFlag = false;
      }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数
     */
    dialogConfirmMethod(args = {}) {
      console.log(args);
      if (this.dialogType == 'editConf') {
        this.dialogAccountFlag = false;
        this.dialogType = 'editFin';
      }
      if (this.dialogType == 'delete') {
        this.dialogType = 'deleteConf';
      } else if (this.dialogType == 'deleteConf') {
        this.dialogType = 'deleteFin';
        this.dialogAccountFlag = false;
      }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数(キャンセル)
     */
    dialogConfirmCancelMethod(args = {}) {
      console.log(args);
      if (this.dialogType == 'editConf') {
        this.dialogType = 'edit';
      }
      if (this.dialogType == 'delete') {
        this.dialogType = 'edit';
      }
      if (this.dialogType == 'deleteConf') {
        this.dialogType = 'delete';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 24px;
#dialogAdmin {
  font-size: $default_fontsize;
  input[type='text']:disabled {
    background: $light-gray;
  }
  label {
    &.tle {
      background-color: $view_Title_background_Blue;
      width: 160px;
      display: inline-block;
      text-align: center;
      position: relative;
      &.inq {
        &:before {
          content: '*';
          color: $red;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .questionarea {
    position: relative;
    .questionIcon {
      position: absolute;
      top: 0;
      left: auto;
      right: -25px;
      font-size: 8px;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      background-color: $black;
      color: $white;
    }
    .questionStatusButton {
      width: 70px;
      height: 21px;
      background-size: 80%;
      text-indent: -9999px;
      background-position: 2px 2px;
    }
  }
  .v-card {
    &.box {
      border: 1px solid #ccc;
      display: inline-block;
      &.min {
        width: 200px;
      }
      &.mdl {
        width: 250px;
      }
    }
  }
  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
  }
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        height: $height;
        min-width: 30px;
        color: $black;
        position: absolute;
        left: auto;
        right: 10px;
        top: 10px;
      }
    }
  }
  .htmin {
    height: $height;
    width: 120px;
    font-size: $cell_fontsize;
  }
  .deleteButton {
    border: 1px solid $dialog_red;
    color: $red;
    &.v-btn--disabled {
      background-color: $light-gray;
      color: $gray;
      border: 1px solid $light-gray;
    }
  }
  .registButton {
    background-color: $view_Title_background_Main;
    color: $white;
  }
}

div#adminData {
  font-size: 12px;
  min-width: 1266px;

  #subTitle {
    border-bottom: 1px solid $black;
    h2 {
      font-weight: normal;
    }
    label {
      line-height: 28px;
      margin-left: 20px;
    }
  }
}
</style>
