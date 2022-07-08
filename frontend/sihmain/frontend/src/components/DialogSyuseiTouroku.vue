<template>
  <v-dialog 
    v-model="parentFlag"
    width="500"
    persistent>
    <v-card class="pa-2" id="DialogSyuseiTouroku">
      <v-card-title> 利用者台帳 修正登録 </v-card-title>
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
              :value="riyousyaCode"
              v-model="riyousyaCode"
              single-line
              solo
              style="max-width: 100px;"
            ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
          class="pl-1 mr-1 dialogHeader dialogHeader-25"
          height = "25"
          elevation="0"
          color = "#EEE"
          >
            氏名
          </v-card>
          <v-text-field
            class="ma-0"
            :value="riyousyaNames"
            v-model="riyousyaNames"
            single-line
            solo
            style="max-width: 210px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
          class="pl-1 mr-1 dialogHeader dialogHeader-25"
          height = "25"
          elevation="0"
          color = "#EEE"
          >
            フリガナ
          </v-card>
          <v-text-field
            class="ma-0"
            :value="riyousyaKana"
            v-model="riyousyaKana"
            single-line
            solo
            style="max-width: 210px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
          class="pl-1 mr-1 dialogHeader dialogHeader-25"
          height = "25"
          elevation="0"
          color = "#EEE"
          >
            生年月日
          </v-card>
          <v-text-field
            class="ma-0"
            :value="riyousyabirthymd"
            v-model="riyousyabirthymd"
            single-line
            solo
            style="max-width: 80px;"
          ></v-text-field>
          <v-card elevation="0" class="dialogAge_emphasis ml-7 mr-3">{{this.riyousyaAge}}</v-card>
          <v-card elevation="0" class="dialogAge">歳</v-card>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation="0"
            color = "#EEE"
            >
            性別
          </v-card>
          <v-radio-group class="mt-0 pt-0" v-model="riyousyaGenderKey">
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
                :value="riyousyaPostcode1"
                v-model="riyousyaPostcode1"
                single-line
                solo
                style="max-width: 50px;"
              ></v-text-field>
              -
              <v-text-field
                class="ml-1"
                :value="riyousyaPostcode2"
                v-model="riyousyaPostcode2"
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
              :value="riyousyaAddress"
              v-model="riyousyaAddress"
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
          elevation="0"
          color = "#EEE"
          >
            連絡先①
          </v-card>
          <v-text-field
            :value="riyousyaTell1"
            v-model="riyousyaTell1"
            single-line
            solo
            style="max-width: 150px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-3">
          <v-card 
            class="pl-1 mr-1 dialogHeader dialogHeader-25"
            height = "25"
            elevation="0"
            color = "#EEE"
            >
            連絡先②
          </v-card>
          <v-text-field
            :value="riyousyaTell2"
            v-model="riyousyaTell2"
            single-line
            solo
            style="max-width: 150px;"
          ></v-text-field>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="d-block shikutyoson_edit">
          <v-col>
            <v-btn-toggle
              mandatory
            >
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 100px; height: 25px"
                @click="editShikutyoson()"
              >
                修正
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 100px; height: 25px"
                @click="addShikutyoson()"
              >
                追加
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col class="mt-3">
            <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
              <v-card 
                class="pl-1 mr-1 dialogHeader dialogHeader-25"
                height = "25"
                elevation="0"
                color = "#EEE"
                >
                市区町村
              </v-card>
              <v-select
                :items="shikutyosonList"
                solo
                :value="riyousyaShikutyoson"
                v-model="riyousyaShikutyoson"
                height = "25"
                style="max-width: 150px;"
              ></v-select>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap" class="mb-3">
              <v-card 
                class="pl-1 mr-1 dialogHeader dialogHeader-25"
                height = "25"
                elevation="0"
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
              <v-btn
                elevation="0"
                color="white"
                class="pa-0 ml-1"
                x-small
                @click="calendarClick(1)"
                height="100%"
                style="min-width: auto; height: 25px"
                tile
                ><v-icon>mdi-arrow-left-bold</v-icon></v-btn
              >
              <v-btn
                x-small
                elevation="0"
                color="white"
                class="pa-0 ml-1"
                height="100%"
                style="min-width: auto; height: 25px"
                @click="calendarClick(2)"
                tile
                ><v-icon>mdi-arrow-right-bold</v-icon></v-btn
              >
            </v-row>
            <wj-flex-grid
              id="shikutyosonGrid"
              :headersVisibility="'Column'"
              :autoRowHeights="true"
              :allowDelete="false"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
              :selectionMode="'Row'"
              :initialized="onInitialized"
              :itemsSource="shikutyosonData"
            >
              <wj-flex-grid-column
                :binding="'key'"
                :header="''"
                :width="30"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column  
                :binding="'shikutyoson'"
                width="1*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :binding="'symd'"
                width="1*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
        <v-card class="d-flex justify-space-between mt-3" elevation="0">
          <v-card elevation="0">
            <v-btn @click="shinkiTouroku_dialog_clear()" tile outlined>
              クリア
            </v-btn>
          </v-card>
          <v-card elevation="0" class="last_registrant">
            <v-card-text >
              最終登録者：2020/08/04 10:38 明治　正雄
            </v-card-text>
          </v-card>
          <v-card elevation="0">
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
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  props: {},
  data() {
    return {
      addData:[],
      parentFlag: false,
      // 市区町村マスタの情報
      shikutyosonList: ['東経市', '西経市', '南経市', '北経市','A市','B市'],
      ja: ja,
      year: '',
      month: '',
      date: '',
      picker: '',
      datepicker_dialog: false,

      // 取得した利用者データ
      riyousyaCode: '',
      riyousyaNames: '',
      riyousyaKana: '',
      riyousyabirthymd: '',
      riyousyaAge: '',
      riyousyaGenderKey: '',
      riyousyaPostcode: '',
      riyousyaPostcode1: '',
      riyousyaPostcode2: '',
      riyousyaAddress: '',
      riyousyaTell1: '',
      riyousyaTell2: '',
      riyousyaShikutyoson: '',
      inputSymd: '',
      shikutyosonData: [],
      allData: [],
      mainFlexGrid: [],
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    open(riyousyadata) {
      this.parentFlag = true;
      // 利用開始日データをフォーマットして年月日を登録
      this.year = moment(riyousyadata['symd'][0]).format('YYYY');
      this.month = moment(riyousyadata['symd'][0]).format('MM');
      this.date = moment(riyousyadata['symd'][0]).format('DD');

      // 取得したデータをモーダルのvalueに設置
      this.riyousyaCode =            riyousyadata['code'];
      this.riyousyaNames =            riyousyadata['names'];
      this.riyousyaKana =             riyousyadata['kana'];
      this.riyousyabirthymd =         riyousyadata['birthymd'];
      this.riyousyaAge =              riyousyadata['age'];
      this.riyousyaGenderKey =        riyousyadata['genderKey'];
      this.riyousyaPostcode1 =        riyousyadata['postcode1'];
      this.riyousyaPostcode2 =        riyousyadata['postcode2'];
      this.riyousyaAddress =          riyousyadata['address'];
      this.riyousyaTell1 =            riyousyadata['tell1'];
      this.riyousyaTell2 =            riyousyadata['tell2'];
      this.riyousyaShikutyoson =      riyousyadata['shikutyoson'][0];
      this.riyousyaSymd =             riyousyadata['symd'][0];
    // 市区町村のデータ変更履歴の配列を作成
    let shikutyosonData = [];
    for (let i = 0; i < riyousyadata['shikutyoson'].length; i++) {
      let keyValue = riyousyadata['shikutyoson'].length - i;
      console.log(riyousyadata['symd'][i])
      shikutyosonData.push(
        {
          key: keyValue,
          shikutyoson: riyousyadata['shikutyoson'][i],
          symd: riyousyadata['symd'][i]
        }
      );
    }
     this.shikutyosonData = [];
     this.shikutyosonData = shikutyosonData;
      console.log(this.shikutyosonData);
      this.allData = this.shikutyosonData;
    },
    /***********
     * 登録ボタンを押下
     */
    addRiyousyadata() {
      this.riyousyaPostcode = this.riyousyaPostcode;

      // 入力データをフォーマット
      // 生年月日
      let formatBirthymd = moment(this.riyousyabirthymd).format('YYYY/MM/DD');

      // 開始日
      let formatSymd = "";
      if (this.inputSymd === "") {
        // 開始日が空だった場合は今日の日付が入る
        formatSymd = this.year + this.month + this.date;
      }
      formatSymd = moment(formatSymd).format('YYYY/MM/DD');
      // 性別
      let displayGender = "";    // 表示用性別
      if (this.riyousyaGenderKey === 1) {
        displayGender = "男";
      } else if (this.riyousyaGenderKey === 2) {
        displayGender = "女";
      } else if (this.riyousyaGenderKey === 0) {
        displayGender = "適用不能";
      } else {
        displayGender = "未選択";
      }

      // 住所
      // 入力された郵便番号をフォーマット
      let displayPostcode = "";    //画面表示用郵便番号
      displayPostcode = "〒" + this.riyousyaPostcode1 + "-" + this.riyousyaPostcode2;

      let displayAddress = ""    // 画面表示用住所
      displayAddress = displayPostcode + "\n" + this.riyousyaAddress;

      // 親から受け取ったデータ修正データとして登録
      this.addData.push({
        code:         this.riyousyaCode,
        names:         this.riyousyaNames,
        kana:          this.riyousyaKana,
        birthymd:      formatBirthymd,
        age:           this.riyousyaAge,
        gender:        displayGender,
        postcode:      this.riyousyaPostcode,
        address:       displayAddress,
        dispAddress:   this.inputAddress,
        tell1:         this.riyousyaTell1,
        tell2:         this.riyousyaTell2,
        shikutyoson: this.riyousyaShikutyoson,
        symd:          formatSymd,
      });
      this.parentFlag = false;
      // 入力情報を追加した配列を親に返す
      // this.$emit('addFormData', this.addData);

      // 入力情報をリセット
      this.riyousyaCode = '';
      this.riyousyaNames = '';
      this.riyousyaKana = '';
      this.riyousyabirthymd = '';
      this.riyousyaAge = '';
      this.riyousyaGenderKey = '';
      this.riyousyaPostcode = '';
      this.riyousyaPostcode1 = '';
      this.riyousyaPostcode2 = '';
      this.riyousyaAddress = '';
      this.riyousyaTell1 = '';
      this.riyousyaTell2 = '';
      this.riyousyaShikutyoson = '';
      this.riyousyaSymd = '';
    },
    /***********
     * 生年月日からフォーカスが外れた場合に動作
     */
    calcRiyousyaAge() {
      // 入力値から年齢を計算

      // 生年月日から年を切り出し
      let inputBirthY = this.inputBirthymd.substr( 0, 4 );

      // 生年月日の月日を切り出し
      let inputBirthMd = this.inputBirthymd.substr( 4, 6 );

      // 現在の月日を成形
      let todayMd = this.month + '' + this.date;

      if(todayMd < inputBirthMd) {
        //今年まだ誕生日が来ていない
        this.inputAge = this.year - inputBirthY -1;
      } else {
        // 既に誕生日を迎えている
        this.inputAge = this.year - inputBirthY;
      }
    },
    /***********
     * 住所検索を押下
     */
    // API が来たら要修正
    replaceAddress () {
      // 仮住所データを作成
      if ((this.riyousyaPostcode1 === '111')) {
        switch (this.riyousyaPostcode2) {
          case '1234':
            this.riyousyaAddress = '東経市〇〇町××00-0';
            break;
          case '1111':
            this.riyousyaAddress = '西経市〇〇町××11-1';
            break;
          case '2222':
            this.riyousyaAddress = '南経市〇〇町××22-2';
            break;
          case '3333':
            this.riyousyaAddress = '東経市〇〇町××33-3';
            break;
          default:
            this.riyousyaAddress = '東経市〇〇町××55-5';
        }
      } else if ((this.riyousyaPostcode1 === "") &&
                 (this.riyousyaPostcode2 === "")){
        this.riyousyaAddress = "";
      } else {
        switch (this.riyousyaPostcode2) {
          case '1234':
            this.riyousyaAddress = 'テスト市〇〇町×× 00-0';
            break;
          case '1111':
            this.riyousyaAddress = 'テスト市〇〇町×× 11-1';
            break;
          case '2222':
            this.riyousyaAddress = 'テスト市〇〇町×× 22-2';
            break;
          case '3333':
            this.riyousyaAddress = 'テスト市〇〇町×× 33-3';
            break;
          default:
            this.riyousyaAddress = 'テスト市〇〇町××55-5';
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
    //カレンダーボタンの日付遷移
    // 開始日 1:前日 2:翌日
    calendarClick(type) {
      let changeDate = this.year + this.month + this.date;
      if (type == 1) {
        // ←選択時
        this.month = moment(changeDate).subtract(1, 'days').format('MM');
        this.date = moment(changeDate).subtract(1, 'days').format('DD');
      } else if (type == 2) {
        // →選択時
        this.month = moment(changeDate).add(1, 'days').format('MM');
        this.date = moment(changeDate).add(1, 'days').format('DD');
      }
      this.inputSymd = this.year + this.month + this.date;
    },
    /***********
     * 市区町村修正
     */
    editShikutyoson() {
      // 利用者市区町村データを再表示
      // this.riyousyaShikutyoson =  riyousyadata['shikutyoson'][0];
      // this.year = moment(riyousyadata['symd'][0]).format('YYYY');
      // this.month = moment(riyousyadata['symd'][0]).format('MM');
      // this.date = moment(riyousyadata['symd'][0]).format('DD');
    },
    /***********
     * 市区町村新規追加
     */
    addShikutyoson() {
      // 利用者市区町村データを一旦初期化
      // this.riyousyaShikutyoson = "";
      // this.year = "";
      // this.month = "";
      // this.date = "";
    },
    /***********
     * クリアボタンを押下
     */
    shinkiTouroku_dialog_clear: function () {
      if (confirm('入力データの初期化を行います。\nよろしいですか？')) {
        this.riyousyaCode = '';
        this.riyousyaNames = '';
        this.riyousyaKana = '';
        this.riyousyabirthymd = '';
        this.riyousyaAge = '';
        this.riyousyaGenderKey = '';
        this.riyousyaPostcode = '';
        this.riyousyaPostcode1 = '';
        this.riyousyaPostcode2 = '';
        this.riyousyaAddress = '';
        this.riyousyaTell1 = '';
        this.riyousyaTell2 = '';
        this.riyousyaShikutyoson = '';
        this.riyousyatSymd = '';
      }
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // this.getData();
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合
      let headerRanges = [];
        headerRanges = [
          new wjGrid.CellRange(0, 0, 0, 2),
        ];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
      // グリッドのスタイルを変更
      flexGrid.columnHeaders.rows.height = 25;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontSize = '12px';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          if (r == 0) {
           s.textAlign = "center"
            cell.innerHTML = '市区町村変更履歴';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((c == 0)) {
            // テキスト右寄せ
            s.textAlign = 'right';
          }
          if (c == 1) {
            // テキスト左寄せ
            s.textAlign = 'left';
          }
          if (c == 2) {
            // テキスト左寄せ
            s.textAlign = 'center';
          }
        }
      };
    },
    // getData() {
    //   // let shikutyosonData = [];
    //   // shikutyosonData.push(
    //   //   {
    //   //     key: '1',
    //   //     shikutyoson: '東経市',
    //   //     symd: '20220622~',
    //   //   },
    //   //   {
    //   //     key: '2',
    //   //     shikutyoson: '西経市',
    //   //     symd: '20220622~',
    //   //   },
    //   //   {
    //   //     key: '3',
    //   //     shikutyoson: '北経市',
    //   //     symd: '20220622~',
    //   //   },
    //   //   {
    //   //     key: '4',
    //   //     shikutyoson: '南経市',
    //   //     symd: '20220622~',
    //   //   },
    //   // );
    //   console.log(this.shikutyosonData);
    //   this.allData = this.shikutyosonData;
    // }
  }
};
</script>

<style lang="scss" scope>
  @import '@/assets/scss/common.scss';
  #DialogSyuseiTouroku {
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
      width: 150px;
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
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: right;
      padding-right: 8px;
    }
    // ラジオボタン（性別）デザイン修正
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
        margin-right: 8px;
      }
      .v-input--radio-group__input {
        flex-direction: initial;
        align-items: flex-start;
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
    // 最終登録者デザイン修正
    .last_registrant {
      display: flex;
      align-items: flex-end;
      .v-card__text {
        color: #fff;
        padding: 0 4px;
        background-color: #ce3e47;
        animation-name: fadeInAnime;
        animation-fill-mode: forwards;
        opacity: 0;
        border-radius: initial;
      }
    }
    #shikutyosonGrid {
      width: 305px;
      max-height: 92px;
      border-bottom: none;
      border-right: none;
    }
  }
</style>