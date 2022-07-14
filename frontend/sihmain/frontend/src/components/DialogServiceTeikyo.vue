<template>
  <div class="text-center" id="dialogServiceTeikyo">
    <v-dialog v-model="dialog" width="620">
      <v-card elevation="2" class="pa-5">
        <v-toolbar-title class="text-subtitle-1"
          >サービス提供事業所　{{ serviceTitle }}</v-toolbar-title
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

        <div id="teikyoDialog" class="input_form">
          <v-card elevation="0" class="pl-2 pt-4">
            <v-row no-gutters>
              <v-col cols="2" class="d-flex align-center pl-2">コード</v-col>
              <v-col>
                <v-text-field
                  outlined
                  class="input pa-0 w100 ml-1"
                  :text="inputData.code"
                  v-model="input.code"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2"
                >サービス事業所</v-col
              >
              <v-col>
                <v-text-field
                  outlined
                  class="input pa-0 w400 ml-1"
                  :text="inputData.serviceJigyosyoMei"
                  v-model="input.serviceJigyosyoMei"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2">略称</v-col>
              <v-col>
                <v-text-field
                  outlined
                  class="input pa-0 w200 ml-1"
                  :text="inputData.ryakusyo"
                  v-model="input.ryakusyo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2"
                >サービス名称</v-col
              >
              <v-col class="mw60">
                <v-text-field
                  outlined
                  class="input w60"
                  :text="inputData.serviceMeisyoCode"
                  v-model="input.serviceMeisyoCode"
                ></v-text-field>
              </v-col>
              <v-col>
                <wj-combo-box
                  class="input w200 ml-1"
                  :itemsSource="serviceCombo"
                  :initialized="initServiceCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  :text="inputData.serviceMeisyo"
                  :selectedIndexChanged="onChangeServiceMeisyo"
                  v-model="comboSelectedIndex"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2"
                >事業所番号</v-col
              >
              <v-col>
                <v-text-field
                  outlined
                  class="input w160"
                  :text="inputData.jigyosyoBango"
                  v-model="input.jigyosyoBango"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2">住所</v-col>
              <v-col cols="10">
                <v-flex>
                  <v-row no-gutters>
                    <v-col class="mw60">
                      <v-text-field
                        outlined
                        class="input w60"
                        :text="inputData.post1"
                        v-model="input.post1"
                        maxLength="3"
                      ></v-text-field>
                    </v-col>
                    <v-col class="mt-1 mw14 text-center"> - </v-col>
                    <v-col class="mw80">
                      <v-text-field
                        outlined
                        class="input w80"
                        :text="inputData.post2"
                        v-model="input.post2"
                        maxLength="4"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn x-small elevation="0" outlined class="ml-2"
                        >住所検索</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-flex>
                <v-flex class="mt-3 ml-1">
                  <v-textarea
                    outlined
                    hide-details="false"
                    rows="2"
                    row-height="22"
                    class="text-caption"
                    no-resize
                    tile
                    flat
                    no-gutters
                    :value="inputData.jyusyo"
                    v-model="input.jyusyo"
                  ></v-textarea>
                </v-flex>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2">電話番号</v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.tel1"
                      v-model="input.tel1"
                      maxLength="3"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-1 mw14 text-center"> - </v-col>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.tel2"
                      v-model="input.tel2"
                      maxLength="4"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-1 mw14 text-center"> - </v-col>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.tel3"
                      v-model="input.tel3"
                      maxLength="4"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2">FAX番号</v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.fax1"
                      v-model="input.fax1"
                      maxLength="3"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-1 mw14 text-center"> - </v-col>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.fax2"
                      v-model="input.fax2"
                      maxLength="4"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-1 mw14 text-center"> - </v-col>
                  <v-col class="mw80">
                    <v-text-field
                      outlined
                      class="input w80"
                      :text="inputData.fax3"
                      v-model="input.fax3"
                      maxLength="4"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2"
                >メールアドレス</v-col
              >
              <v-col>
                <v-text-field
                  outlined
                  class="input w300"
                  :text="inputData.mail"
                  v-model="input.mail"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="2" class="d-flex align-center pl-2"
                >レセプト集計</v-col
              >
              <v-col>
                <v-checkbox
                  v-model="reseCheck"
                  class="text-caption pa-0 ma-0"
                  label="請求代表事業所"
                  hide-details="false"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-4" v-if="type == 'edit'">
              <v-col cols="2" class="d-flex align-center pa-1 pl-2"
                >無効登録</v-col
              >
              <v-col cols="2" class="ml-1 mt-1"> 無効年月日 </v-col>
              <v-col cols="3" class="position-relative">
                <v-text-field
                  outlined
                  class="input w300"
                  v-model="disabledDate"
                ></v-text-field>
                <v-icon
                  small
                  @click="datepicker_dialog = true"
                  class="calender_icon mt-n1 pl-3"
                  >mdi-calendar-month</v-icon
                >
                <v-row justify="center">
                  <v-dialog v-model="datepicker_dialog" width="290">
                    <v-date-picker
                      type="date"
                      v-model="picker"
                      locale="jp-ja"
                      :day-format="(date) => new Date(date).getDate()"
                      @change="dateSelect"
                    >
                    </v-date-picker>
                  </v-dialog>
                </v-row>
              </v-col>
              <v-col> </v-col>
            </v-row>
            <v-row no-gutters class="mt-6">
              <v-col cols="2">
                <v-btn small v-if="type == 'edit'" @click="disabled"
                  >無効登録</v-btn
                >
                <v-btn small v-if="type == 'add'" @click="clear"
                  >画面クリア</v-btn
                >
              </v-col>
              <v-col cols="8" class="mt-2" align="center"
                >最終登録者：R03/04/01 10:30 (明治 治夫)</v-col
              >
              <v-col cols="2">
                <v-btn small v-if="type == 'edit'" @click="regist"
                  >修正登録</v-btn
                >
                <v-btn small v-if="type == 'add'" @click="regist">登録</v-btn>
              </v-col>
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
      serviceTitle: '', // タイトル
      reseCheck: '',
      type: '', // 登録・編集
      input: this.formKey(),
      datepicker_dialog: false,
      disabledDate: moment().format('YYYY/MM/DD'),
      picker: '',
    };
  },
  components: {},
  mounted() {
    this.getCombobox();
  },
  methods: {
    /**************
     * 日付選択
     */
    dateSelect() {
      this.disabledDate = moment(this.picker).format('YYYY/MM/DD');
      this.datepicker_dialog = false;
    },
    /****************
     * 無効登録ボタン
     */
    disabled() {
      alert('disabled');
    },
    onChangeServiceMeisyo(e) {
      this.input.serviceMeisyoCode = e.selectedItem.key;
    },
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
    /**********************
     * 登録/修正登録ボタン
     */
    regist() {
      console.log(this.input);
      console.log(this.reseCheck);
    },
    /**********************
     * 画面クリア
     */
    clear() {
      for (let key in this.input) {
        this.input[key] = [];
      }
      this.reseCheck = '';
    },
    /***********
     * ダイアログ表示
     */
    formKey() {
      return {
        code: '',
        serviceJigyosyoMei: '',
        ryakusyo: '',
        serviceMeisyoCode: '',
        serviceMeisyo: '',
        jigyosyoBango: '',
        post1: '',
        post2: '',
        jyusyo: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
      };
    },
    openDialog(type, data) {
      this.dialog = true;
      this.type = type;
      // 編集登録
      if (type === 'edit') {
        for (let key in this.input) {
          this.inputData[key] = data[key];
          this.input[key] = data[key];
        }
        this.reseCheck = data.rese;
        this.serviceTitle = '修正登録';
      }
      // 基本登録
      if (type === 'add') {
        for (let key in this.input) {
          this.inputData[key] = '';
          this.input[key] = '';
        }
        this.reseCheck = '';
        this.serviceTitle = '新規登録';
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
  label {
    font-size: 12px;
  }
  div {
    .v-input__slot {
      padding: 0;
    }
  }
  .d-flex {
    background-color: $view_Title_background;
  }
  .position-relative {
    position: relative;
  }
  .calender_icon {
    position: absolute;
    top: 10px;
    right: -20px;
  }
  .wj-btn {
    border-left: none !important;
  }
  .mw14 {
    max-width: 14px;
  }
  .mw40 {
    max-width: 40px;
  }
  .mw60 {
    max-width: 60px;
  }
  .mw80 {
    max-width: 80px;
  }
  .v-text-field {
    input {
      line-height: 18px;
    }
  }
  .input {
    width: 200px;
    height: 24px;
    border-radius: 0px;
    padding: 0px 0px 0px 4px;
    div {
      min-height: 20px !important;
    }
    &.w40 {
      width: 40px;
    }
    &.w60 {
      width: 60px;
    }
    &.w80 {
      width: 80px;
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
    &.w400 {
      width: 400px;
    }
    &.w500 {
      width: 500px;
    }
  }
  .v-text-field {
    input {
      padding: 4px;
      font-size: 12px;
    }
    fieldset {
      border-radius: 0;
      border: 1px solid #ccc;
    }
    textarea {
      margin-top: 0 !important;
      padding-left: 4px;
    }
  }
}
</style>