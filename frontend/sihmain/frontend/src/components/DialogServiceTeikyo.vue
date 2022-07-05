<template>
  <div class="text-center" id="dialogServiceTeikyo">
    <v-dialog v-model="dialog" width="620">
      <v-card elevation="2" class="pa-5">
        <v-toolbar-title class="text-subtitle-1"
          >サービス提供事業所　追加登録</v-toolbar-title
        >

        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close()"
          class="closeButton"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >

        <div id="teikyoDialog">
          <v-card elevation="0" class="pl-2 pt-4">
            <v-row dense>
              <v-col cols="2">コード</v-col>
              <v-col>
                <wj-combo-box
                  class="input w100"
                  :text="inputData.code"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">サービス事業所</v-col>
              <v-col>
                <wj-combo-box
                  class="input w300"
                  :text="inputData.serviceJigyosyoMei"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">略称</v-col>
              <v-col>
                <wj-combo-box
                  class="input w200"
                  :text="inputData.ryakusyo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">サービス名称</v-col>
              <v-col cols="1">
                <wj-combo-box
                  class="input w40"
                  :text="inputData.serviceMeisyoCode"
                  readonly
                ></wj-combo-box>
              </v-col>
              <v-col>
                <wj-combo-box
                  class="input w200"
                  :itemsSource="serviceCombo"
                  :initialized="initServiceCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  :text="inputData.serviceMeisyo"
                  v-model="comboSelectedIndex"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">事業所番号</v-col>
              <v-col>
                <wj-combo-box class="input w160"></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">住所</v-col>
              <v-col cols="10">
                <v-flex>
                  <wj-combo-box class="input w40"></wj-combo-box>-
                  <wj-combo-box class="input w60"></wj-combo-box>
                  <v-btn x-small elevation="0" outlined class="ml-2"
                    >住所検索</v-btn
                  >
                </v-flex>
                <v-flex class="mt-2">
                  <v-textarea
                    outlined
                    hide-details="false"
                    rows="2"
                    row-height="22"
                    class="text-caption pa-1"
                    no-resize
                    tile
                    flat
                    dense
                  ></v-textarea>
                </v-flex>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">電話番号</v-col>
              <v-col>
                <wj-combo-box class="input w40" maxLength="3"></wj-combo-box> -
                <wj-combo-box class="input w60" maxLength="4"></wj-combo-box> -
                <wj-combo-box class="input w60" maxLength="4"></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">FAX番号</v-col>
              <v-col>
                <wj-combo-box class="input w40" maxLength="3"></wj-combo-box> -
                <wj-combo-box class="input w60" maxLength="4"></wj-combo-box> -
                <wj-combo-box class="input w60" maxLength="4"></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">メールアドレス</v-col>
              <v-col>
                <wj-combo-box class="input w300"></wj-combo-box>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" class="mt-5">レセプト集計</v-col>
              <v-col>
                <v-checkbox
                  class="text-caption pa-0"
                  label="請求代表事業所"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row dense class="mt-6">
              <v-col cols="2"><v-btn small>無効登録</v-btn></v-col>
              <v-col cols="8" class="mt-2" align="center"
                >最終登録者：R03/04/01 10:30 (明治 治夫)</v-col
              >
              <v-col cols="2"><v-btn small>修正登録</v-btn></v-col>
            </v-row>
          </v-card>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: [],
  data() {
    return {
      dialog: false,
      inputData: {},
      serviceCombo: [],
      comboSelectedIndex: '',
      selectedIndex: '',
    };
  },
  components: {},
  mounted() {
    this.getCombobox();
  },
  methods: {
    /************
     * コンボボックス設定
     */
    initServiceCombo() {
      this.comboSelectedIndex = this.selectedIndex;
    },
    getCombobox() {
      this.serviceCombo.push(
        {
          key: 22,
          value: '生活介護',
        },
        {
          key: 24,
          value: '短期入所',
        },
        {
          key: 32,
          value: '施設入所支援',
        },
        {
          key: 41,
          value: '自立訓練(機能訓練)',
        },
        {
          key: 43,
          value: '就労移行支援',
        },
        {
          key: 46,
          value: '就労継続支援事業B型',
        },
        {
          key: 33,
          value: '共同生活援助',
        },
        {
          key: 45,
          value: '就労継続支援A型',
        }
      );
    },
    /***********
     * ダイアログ表示
     */
    openDialog(type, data) {
      console.log(data);
      this.dialog = true;
      if (type === 'edit') {
        this.inputData.code = data.code;
        this.inputData.serviceJigyosyoMei = data.serviceJigyosyoMei;
        this.inputData.ryakusyo = data.ryakusyo;
        this.inputData.serviceMeisyoCode = data.serviceMeisyoCode;
        this.inputData.serviceMeisyo = data.serviceMeisyo;
        this.selectedIndex = data.serviceMeisyoCode;
      }
      if (type === 'add') {
        this.inputData.code = '';
        this.inputData.serviceJigyosyoMei = '';
        this.inputData.ryakusyo = '';
        this.inputData.serviceMeisyoCode = '';
        this.inputData.serviceMeisyo = '';
        this.selectedIndex = '';
      }
    },
    header_dialog_close: function () {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';

div#dialogServiceTeikyo {
  font-size: 12px;
  font-family: 'メイリオ';
}
div#teikyoDialog {
  font-size: 12px;
  .input {
    width: 200px;
    height: 20px;
    border-radius: 0px;
    &.w40 {
      width: 40px;
    }
    &.w60 {
      width: 60px;
    }
    &.w100 {
      width: 100px;
    }
    &.w160 {
      width: 160px;
    }
    &.w200 {
      width: 200px;
    }
    &.w300 {
      width: 300px;
    }
    &.w500 {
      width: 500px;
    }
  }
}
</style>