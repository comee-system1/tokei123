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
    <v-dialog width="500" v-model="dialogAccountFlag" id="dialogAdmin">
      <!--アラート-->
      <v-card v-if="dialogAlertFlag">
        <v-card
          :class="{
            dialog_title_alert: true,
            class_edit_alert: dialogType == 'edit',
          }"
        >
          <h4>{{ dialog_title_message }}</h4>
          <!--編集用確認アラート-->
          <div v-if="dialogType == 'edit'">
            <v-row class="alertArea">
              <v-col
                ><v-btn height="24" @click="editConfCancel()"
                  >キャンセル</v-btn
                ></v-col
              >
              <v-col
                ><v-btn
                  height="24"
                  class="registButton"
                  @click="editConfRegist()"
                  >登録</v-btn
                ></v-col
              >
            </v-row>
          </div>
          <!--編集用確認アラート-->
          <div v-else class="alertArea mt-3">
            <p>管理者アカウントIDと仮パスワードをメールにて通知します。</p>
            <v-row no-gutters>
              <v-col width="7">ログイン中管理者メールアドレス</v-col>
              <v-col>:{{ dialogAdminName }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col width="7">新規管理者メールアドレス</v-col>
              <v-col>:{{ dialogAdminMail }}</v-col>
            </v-row>
            <v-row no-gutters class="mt-3">
              <v-btn class="okButton" @click="onDialogAlertOK()">OK</v-btn>
            </v-row>
          </div>
        </v-card>
      </v-card>
      <!--管理者アカウント新規登録フォーム-->
      <v-card v-if="dialogAccountRegistFormFlag">
        <v-card-title class="dialog_title">
          管理者アカウント情報
          <v-btn class="closeButton pa-0" @click="dialogAccountClose()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>
            管理者アカウントを発行し、管理者システムを利用できる状態にします。
          </p>
          <v-row no-gutters class="borderbottom pb-2 mt-1">
            <label class="tle inq">職員名</label>
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
              <v-btn class="deleteButton htmin" :disabled="deleteDisableFlag"
                >削除</v-btn
              >
            </v-col>
            <v-col class="text-end">
              <v-btn
                class="ml-2 registButton htmin"
                v-if="dialogType == 'new'"
                @click="dialogRegist()"
                >登録</v-btn
              >
              <v-btn
                class="ml-2 registButton htmin"
                v-if="dialogType == 'edit'"
                @click="dialogEditConf()"
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
export default {
  props: [],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
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
      dialogAccountFlag: false,
      deleteDisableFlag: false,
      dialogAlertFlag: false,
      dialogAccountRegistFormFlag: false,
      dialogEditConfFlag: false,
      adminViewData: [],
      headerheight: 140,
      dialogAdminName: '',
      dialogAdminMail: '',
      dialogMessageMail:
        '登録されたメールアドレスが、管理者システム画面にログインする際のIDとなります。他の管理者で使用しているメールアドレスと重複はできません。',
      dialog_title_message: '',
      dialog_title_new_message: '管理者アカウントを発行しました。',
      dialog_title_edit_message: '変更した内容を登録しますか？',
      dialogType: '', // new/edit/delete
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
    dialogAccountClose() {
      this.dialogAccountFlag = false;
      this.dialogAlertFlag = false;
    },
    /*****************
     * 新規登録ボタン
     * グリッドを押下編集
     */
    openDialog(type, editdata = []) {
      this.dialogAccountFlag = true;
      this.dialogAlertFlag = false;
      this.dialogType = type;
      this.dialogAccountRegistFormFlag = true; // アカウント情報新規登録フォーム
      this.dialogEditConfFlag = false;
      if (type == 'edit') {
        this.deleteDisableFlag = false; // 削除ボタン有効
      } else {
        this.deleteDisableFlag = true; // 削除ボタン無効化
      }
      this.dialogAdminName = editdata.adminName;
      this.dialogAdminMail = editdata.mailaddress;
    },
    /********************
     * ダイアログ登録ボタン
     */
    dialogRegist() {
      this.dialogAccountRegistFormFlag = false;
      this.dialogAlertFlag = true;
      this.dialog_title_message = this.dialog_title_new_message;
    },
    /************************
     * ダイアログ編集確認
     */
    dialogEditConf() {
      this.dialogAccountRegistFormFlag = false;
      this.dialogAlertFlag = true;
      this.dialog_title_message = this.dialog_title_edit_message;
    },
    /************************
     * ダイアログ編集キャンセル
     */
    editConfCancel() {
      this.dialogAccountClose();
    },
    /************************
     * ダイアログ編集登録
     */
    editConfRegist() {
      alert('aaaa');
    },
    /*********************
     * ダイアログ
     ************/
    onDialogAlertOK() {
      this.dialogAccountFlag = false;
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
      background-color: $view_Title_background_Main;
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
    border: 1px solid $red;
    color: $red;
  }
  .registButton {
    background-color: $view_Title_background_Main;
    color: $white;
  }

  .dialog_title_alert {
    border-top: 3px solid $green;
    padding: 20px 10px;

    h4 {
      text-align: right;
      width: 280px;
      height: 34px;
      line-height: 34px;
      margin: 0 auto;
      display: block;
      font-weight: normal;
      background-image: url('../../assets/minCheckCircle.png');
      background-repeat: no-repeat;
    }
    &.class_edit_alert {
      h4 {
        background: none;
        text-align: center;
      }
      .alertArea {
        .v-col {
          text-align: center;
          button {
            width: 120px;
          }
        }
      }
    }
    .alertArea {
      width: 95%;
      margin: 0 auto;

      .okButton {
        padding: 10px;
        text-align: center;
        width: 140px;
        margin: 0 auto;
        background-color: $gray;
        color: $white;
      }
    }
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
