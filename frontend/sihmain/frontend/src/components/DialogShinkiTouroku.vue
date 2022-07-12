<template>
  <v-dialog 
    v-model="parentFlag"
    width="500"
    persistent>
    <v-card class="pa-2" id="dialogShinkiTouroku">
      <v-card-title> 利用者台帳 新規利用者登録 </v-card-title>
      <v-btn
        elevation="2"
        icon
        small
        absolute
        top
        right
        @click="parentFlag = false"
        color="secondary"
        ><v-icon dark small> mdi-close </v-icon>
      </v-btn>
      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            コード
          </v-card>
          <v-text-field
            :value="inputCode"
            v-model="inputCode"
            single-line
            solo
            style="max-width: 100px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
          class="pl-1 mr-1 dialogHeader dialogHeader-25"
          height = "25"
          elevation ="0"
          color = "#EEE"
          >
            氏名
          </v-card>
          <v-text-field
            class="ma-0"
            :value="inputNames"
            v-model="inputNames"
            single-line
            solo
            style="max-width: 210px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            ﾌﾘｶﾞﾅ（半角）
          </v-card>
          <v-text-field
            class="ma-0"
            :value="inputKana"
            v-model="inputKana"
            single-line
            solo
            style="max-width: 210px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
          class="pl-1 mr-1 dialogHeader dialogHeader-75"
          height = "75"
          elevation ="0"
          color = "#EEE"
          >
            生年月日
          </v-card>
          <v-card elevation ="0" class="dialogBirthday">
            <v-card-actions class="pa-0 align-start">
              <v-radio-group 
                @change="switchDialogYear()"
                column class="mt-0 pt-0 d-block mr-3" 
                v-model="calendarKey"
                >
                <v-radio label="和暦" :key="1" :value="'1'" class="mb-0"></v-radio>
                <v-radio label="西暦" :key="2" :value="'2'" class="mb-0"></v-radio>
              </v-radio-group>
              <v-radio-group row
                @change="switchDialogYear()"
                class="mt-0 pt-0 dialogWareki"
                v-if="calendarKey === '1'"
                v-model="nengouKey"
                >
                <v-radio label="大正" :key="1" :value="'大正'" class="mb-0"></v-radio>
                <v-radio label="昭和" :key="2" :value="'昭和'" class="mb-0"></v-radio>
                <v-radio label="平成" :key="3" :value="'平成'" class="mb-0"></v-radio>
                <v-radio label="令和" :key="4" :value="'令和'" class="mb-0"></v-radio>
              </v-radio-group>
            </v-card-actions>
            <v-card elevation ="0" class="d-inline-flex dialogBirthday_input">
              {{dispNngou}}
              <v-text-field
                class="ml-1 mr-1 dialogBirthday_y"
                :value="inputBirthY"
                v-model="inputBirthY"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              年
              <v-text-field
                class="ml-1 mr-1 dialogBirthday_md"
                :value="inputBirthM"
                v-model="inputBirthM"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              月
              <v-text-field
                class="ml-1 mr-1 dialogBirthday_md"
                :value="inputBirthD"
                v-model="inputBirthD"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              日
              <div class="dialogAge_emphasis ml-3 mr-1">{{this.inputAge}}</div>
              <div class="dialogAge">歳</div>
            </v-card>
          </v-card>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
            <v-card 
              class="pl-1 mr-1 dialogHeader dialogHeader-25"
              height = "25"
              elevation ="0"
              color = "#EEE"
              >
              性別
            </v-card>
            <v-radio-group row class="mt-0 pt-0" v-model="inputGenderKey">
              <v-radio label="男" :key="1" :value="'1'" class="mb-0"></v-radio>
              <v-radio label="女" :key="2" :value="'2'" class="mb-0"></v-radio>
              <v-radio label="適用不能" :key="0" :value="'0'" class="mb-0"></v-radio>
            </v-radio-group>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-75"
            height = "75"
            elevation="0"
            color = "#EEE"
            >
            住所
          </v-card>
          <v-card class="d-block" elevation="0">
            <v-card elevation="0" class="mb-1 d-flex dialogAdress">
              〒
              <v-text-field
                class="ml-1 mr-1"
                :value="inputPostcode1"
                v-model="inputPostcode1"
                single-line
                solo
                style="max-width: 50px;"
              ></v-text-field>
              -
              <v-text-field
                class="ml-1"
                :value="inputPostcode2"
                v-model="inputPostcode2"
                single-line
                solo
                style="max-width: 47px;"
              ></v-text-field>
              <v-btn
                class = "ml-5"
                elevation="1"
                height = "25"
                small
                @click="replaceAddress()"
                >
                住所検索
              </v-btn>
            </v-card>
            <v-textarea
              height = "47"
              :value="inputAddress"
              v-model="inputAddress"
              single-line
              solo
              dense
              no-resize
              row-height="25"
              class="dialogAdrress"
              style="max-width: 300px;"
            ></v-textarea>
          </v-card>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            市区町村
          </v-card>
          <v-select
            :items="shikutyosonList"
            solo
            :value="inputShikutyoson"
            v-model="inputShikutyoson"
            height = "25"
            style="max-width: 150px;"
          ></v-select>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            連絡先①
          </v-card>
          <v-text-field
            :value="inputTell1"
            v-model="inputTell1"
            single-line
            solo
            style="max-width: 150px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            連絡先②
          </v-card>
          <v-text-field
            :value="inputTell2"
            v-model="inputTell2"
            single-line
            solo
            style="max-width: 150px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-3">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation ="0"
            color = "#EEE"
            >
            有効開始
          </v-card>
          <v-btn
            @click="inputCalendarClick()"
            tile
            outlined
            class="service dialogSymd"
            height="25"
            style="max-width: 150px;"
            >{{ year }}年{{ month }}月{{ date }}日
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-row>
        <hr size="1" />
        <v-card class="d-flex mt-3" elevation ="0">
          <v-card elevation ="0" class="ml-1">
            <v-btn @click="shinkiTouroku_dialog_clear()" tile outlined>
              クリア
            </v-btn>
          </v-card>
          <v-card elevation ="0" class="ml-auto">
            <v-btn @click="addRiyousyadata()" tile outlined>
              登録
            </v-btn>
          </v-card>
        </v-card>
      </v-container>
    </v-card>
    <v-dialog
      v-model="datepicker_dialog"
      width="290"
      class="datepicker_dialogs"
      >
      <v-date-picker
        id="jyuryoDatepicker"
        type="date"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>
  </v-dialog>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
export default {
  props: {},
  data() {
    return {
      addData:[],
      parentFlag: false,
      // 市区町村マスタの情報
      shikutyosonList: ['東経市', '西経市', '南経市', '北経市','A市','B市'],
      ja: ja,
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      date: moment().format('DD'),
      picker: '',
      datepicker_dialog: false,

      // 入力された値
      inputCode: '',
      inputNames: '',
      inputKana: '',
      inputBirthymd: '',
      dispBirthymd: [],
      inputBirthY: '',
      inputBirthM: '',
      inputBirthD: '',
      inputAge: '',
      inputGender: '',
      inputGenderKey: '',
      inputPostcode: '',
      inputPostcode1: '',
      inputPostcode2: '',
      inputAddress: '',
      inputTell1: '',
      inputTell2: '',
      inputShikutyoson: '',
      inputSymd: '',
      dispSymd: [],
      inputSartY: '',
      inputSartM: '',
      inputSartD: '',

      calendarKey: '',
      nengouKey: '',
      dispNngou: ''
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    open(riyousyadata) {
      this.parentFlag = true;
      this.addData = riyousyadata;
    },  
    /***********
     * 登録ボタンを押下
     */
    addRiyousyadata() {
      this.inputPostcode = this.inputPostcode;

      // 入力データをフォーマット
  
      // 開始日
      if (this.inputSymd === "") {
        // 開始日が空だった場合(カレンダー未操作)は今日の日付が入る
        this.dispSymd.push(new Date(this.year, Number(this.month) - 1, this.date));
      }
      // 性別
      let displayGender = "";    // 表示用性別
      if (this.inputGenderKey === 1) {
        displayGender = "男";
      } else if (this.inputGenderKey === 2) {
        displayGender = "女";
      } else if (this.inputGenderKey === 0) {
        displayGender = "適不";
      } else {
        displayGender = "";
      }

      // 住所
      // 入力された郵便番号をフォーマット
      let displayPostcode = "";    //画面表示用郵便番号
      displayPostcode = "〒" + this.inputPostcode1 + "-" + this.inputPostcode2;

      let displayAddress = ""    // 画面表示用住所
      displayAddress = displayPostcode + "\n" + this.inputAddress;

      // 入力情報を追加
      this.addData.push({
        code:            this.inputCode,
        names:            this.inputNames,
        kana:             this.inputKana,
        birthymd:         this.inputBirthymd,
        dispBirthymd:     new Date(this.inputBirthY, Number(this.inputBirthM) - 1, this.inputBirthD),
        age:              this.inputAge,
        gender:           displayGender,
        genderKey:        this.inputGenderKey,
        postcode:         this.inputPostcode,
        postcode1:        this.inputPostcode1,
        postcode2:        this.inputPostcode2,
        address:          displayAddress,
        dispAddress:      this.inputAddress,
        tell1:            this.inputTell1,
        tell2:            this.inputTell2,
        shikutyoson:      this.inputShikutyoson,
        symd:             this.inputSymd,
        dispSymd:         this.dispSymd,
      });
      console.log(this.addData);
      this.parentFlag = false;
      // 入力情報を追加した配列を親に返す
      this.$emit('addFormData', this.addData);

      // 入力情報をリセット
      this.inputDataClear();
    },
    /***********
     *dialog和暦西暦表示切り替え
     */
    switchDialogYear() {
      if (this.calendarKey === '1') {
        // 和暦選択時
        this.dispNngou = "  ";
        this.dispNngou = this.nengouKey;
      } else {
        // 西暦選択時
        this.dispNngou = "西暦";
        this.nengouKey ="";
      }
    },
    /***********
     * 生年月日からフォーカスが外れた場合に動作
     */
    calcRiyousyaAge() {
      // 入力値から年齢を計算

      // // 生年月日から年を切り出し
      // let inputBirthY = this.inputBirthymd.substr( 0, 4 );

      // // 生年月日の月日を切り出し
      // let inputBirthMd = this.inputBirthymd.substr( 4, 6 );
      let todayMd = "";
      let inputBirthMd = "";
      // 西暦の場合
      if (this.calendarKey ==='2') {
        // 現在の月日を成形
        todayMd = this.month + this.date;

        // 入力値の月日の成形
        inputBirthMd = this.inputBirthM + this.inputBirthD;

        if(todayMd < inputBirthMd) {
          //今年まだ誕生日が来ていない
          this.inputAge = this.year - this.inputBirthY -1;
        } else {
          // 既に誕生日を迎えている
          this.inputAge = this.year - this.inputBirthY;
        }
      }

    },
    /***********
     * 住所検索を押下
     */
    // API が来たら要修正
    replaceAddress () {
      // 仮住所データを作成
      if ((this.inputPostcode1 === '111')) {
        switch (this.inputPostcode2) {
          case '1234':
            this.inputAddress = '東経市〇〇町××00-0';
            break;
          case '1111':
            this.inputAddress = '西経市〇〇町××11-1';
            break;
          case '2222':
            this.inputAddress = '南経市〇〇町××22-2';
            break;
          case '3333':
            this.inputAddress = '東経市〇〇町××33-3';
            break;
          default:
            this.inputAddress = '東経市〇〇町××55-5';
        }
      } else if ((this.inputPostcode1 === "") &&
                 (this.inputPostcode2 === "")){
        this.inputAddress = "";
      } else {
        switch (this.inputPostcode2) {
          case '1234':
            this.inputAddress = 'テスト市〇〇町×× 00-0';
            break;
          case '1111':
            this.inputAddress = 'テスト市〇〇町×× 11-1';
            break;
          case '2222':
            this.inputAddress = 'テスト市〇〇町×× 22-2';
            break;
          case '3333':
            this.inputAddress = 'テスト市〇〇町×× 33-3';
            break;
          default:
            this.inputAddress = 'テスト市〇〇町××55-5';
        }
      }
    },
    /**********
     * カレンダーdialogの表示
     */
    inputCalendarClick: function () {
      let picker = '';
      picker = this.year + '-' + this.month + '-' + this.date;
      this.picker = picker;
      this.datepicker_dialog = true;
    },
    /**************
     * 月の選択 ダイアログの日付を押下
     */
    dateSelect: function () {
      let split = this.picker.split('-');
        this.year = split[0];
        this.month = split[1];
        this.date = split[2];

      this.inputSymd = this.year + this.month + this.date;
      this.datepicker_dialog = false;
    },
    /***********
     * クリアボタンを押下
     */
    shinkiTouroku_dialog_clear: function () {
      if (confirm('入力データの初期化を行います。\nよろしいですか？')) {
        this.inputDataClear();
      }
    },
    /***********
     * 入力データの初期化
     */
    inputDataClear() {
      this.inputCode = '';
      this.inputNames = '';
      this.inputKana = '';
      this.inputBirthymd = [];
      this.dispBirthymd = '';
      this.inputAge = '';
      this.inputGenderKey = '';
      this.inputPostcode = '';
      this.inputPostcode1 = '';
      this.inputPostcode2 = '';
      this.inputAddress = '';
      this.inputTell1 = '';
      this.inputTell2 = '';
      this.inputShikutyoson = '';
      this.inputSymd = '';
      this.dispSymd = [];
      this.year = moment().format('YYYY');
      this.month = moment().format('MM');
      this.date = moment().format('DD');

      this.calendarKey = '',
      this.nengouKey = '',
      this.dispNngou = ''
    }
  },
};
</script>

<style lang="scss" scope>
  @import '@/assets/scss/common.scss';
  #dialogShinkiTouroku {
       font-size: 12px;
    .wj-cell {
      padding: 2px 4px;
    }
    input.wj-form-control {
      min-height: initial;
      height: 25px;
    }
    .dialogHeader {
      border-radius: initial;
      width: 120px;
    }
    .dialogHeader-25 {
      line-height: 25px;
    }
    .dialogHeader-75 {
      line-height: 75px;
    }
    // inputのデザイン修正
    .v-text-field {
      .v-input__control {
        min-height: initial;
      }
      .v-input__slot {
        font-size: 12px;
        min-height: initial;
        height: 25px;
        margin: 0;
        padding: 0 4px;
        box-shadow: none;
        border: solid 1px #ccc;
        display: block;
        // inputの高さ文字位置調整
        .v-text-field__slot {
          input {
            height: 25px;
            max-height: 25px;
          }
        }
        // 住所幅文字調整
        textarea {
          margin-top: 0px;
          padding: 4px 4px 0 0;
          max-width: 290px;
          line-height: 1.2;
          height: 45px;
        }
      }
      .v-text-field__details{
        display: none;
      }
    }
    // 生年月日デザイン修正
    .dialogBirthday {
      .v-text-field__slot input {
        text-align: right;
      }
      .dialogBirthday_input {
        height: 25px;
        line-height: 25px;
        .v-input {
          display: block;
        }
      }
      .dialogBirthday_y {
        width: 40px;
        .v-input__slot {
          width: 40px;
        }
      }
      .dialogBirthday_md {
        width: 25px;
        .v-input__slot {
          width: 25px;
        }
      }
    }
    // 年齢デザイン調整
    .dialogAge {
      display: inline-block;
      height: 25px;
      line-height: 25px;
      padding: 0;
    }
    .dialogAge_emphasis {
      display: inline-block;
      background: lightYellow;
      width: 50px;
      text-align: right;
      padding-right: 8px;
    }
    // ラジオボタンデザイン修正
    .v-input--selection-controls {
      .v-input__slot {
        margin-bottom: 0;
      }
      .v-label {
        font-size: 12px;
      }
      .v-icon {
        font-size: 20px;
      }
      // 選択時の青背景の位置調整
      .v-input--selection-controls__ripple {
        height: 27px;
        width: 27px;
        left: -9px;
        top: calc(50% - 21px);
      }
      .v-messages {
        display: none;
      }
      .v-radio {
        margin-right: 0px;
      }
      .v-input--selection-controls__input {
        margin-right: 0;
      }
    }
    // 郵便番号縦中央寄せ
    .dialogAdress {
      line-height: 25px;
    }
    // セレクトボックスの文字位置調整
    .v-select {
      .v-select__slot {
        height: 25px;
      }
      .v-select__selection--comma {
        margin: 0;
      }
      .dialogSymd {
        border-radius: 4px;
      }
    }
  }
</style>