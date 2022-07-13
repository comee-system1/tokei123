<template>
  <v-dialog 
    v-model="parentFlag"
    width="600"
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
                :value="riyousyaBirthY"
                v-model="riyousyaBirthY"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              年
              <v-text-field
                class="ml-1 mr-1 dialogBirthday_md"
                :value="riyousyaBirthM"
                v-model="riyousyaBirthM"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              月
              <v-text-field
                class="ml-1 mr-1 dialogBirthday_md"
                :value="riyousyaBirthD"
                v-model="riyousyaBirthD"
                single-line
                solo
                @blur="calcRiyousyaAge()"
              ></v-text-field>
              日
              <div class="dialogAge_emphasis ml-3 mr-1">{{this.riyousyaAge}}</div>
              <div class="dialogAge">歳</div>
            </v-card>
          </v-card>
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
          <v-radio-group row class="mt-0 pt-0" v-model="riyousyaGenderKey">
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
        <v-row no-gutters style="flex-wrap: nowrap" class="d-block">
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
          <v-col class="pt-3 pb-3 d-flex shikutyosonEditBox">
            <v-row no-gutters class="d-block mr-1">
              <v-card elevation="0" class="d-flex">
                <v-card 
                  class="pl-1 mr-1 mb-1 dialogHeader dialogHeader-25"
                  height = "25"
                  elevation="0"
                  color="#EEE"
                  >
                  市区町村
                </v-card>
                <v-select
                  :items="shikutyosonList"
                  solo
                  :value="riyousyaShikutyoson"
                  v-model="riyousyaShikutyoson"
                  height="25"
                  style="max-width: 150px;"
                ></v-select>
              </v-card>
              <v-card elevation="0" class="d-flex">
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
              </v-card>
              <v-card elevation="0" class="shikutyosonDelete">
                <v-btn
                  @click="shinkiTouroku_dialog_delete()"
                  tile
                  outlined
                  v-if="this.editShikutyosonFlag"
                  >
                  削除
                </v-btn>
              </v-card>
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
                :width="20"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column  
                :binding="'shikutyoson'"
                :width="90"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :binding="'symd'"
                :width="90"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
        <v-card class="d-flex justify-space-between mt-3" elevation="0">
          <v-card elevation="0" class="last_registrant">
            <v-card-text >
              最終登録者：2020/08/04 10:38 明治　正雄
            </v-card-text>
          </v-card>
          <v-card elevation="0">
            <v-btn @click="addRiyousyadata()" tile outlined>
              修正登録
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
import '@grapecity/wijmo.cultures/wijmo.culture.ja'
export default {
  props: {},
  data() {
    return {
      editData:[],
      parentFlag: false,
      // 市区町村マスタの情報
      shikutyosonList: ['東経市', '西経市', '南経市', '北経市','A市','B市','１２３４５６'],
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
      riyousyaBirthY: '',
      riyousyaBirthM: '',
      riyousyaBirthD: '',
      riyousyaAge: '',
      riyousyaGenderKey: '',
      riyousyaPostcode: '',
      riyousyaPostcode1: '',
      riyousyaPostcode2: '',
      riyousyaAddress: '',
      riyousyaTell1: '',
      riyousyaTell2: '',
      riyousyaShikutyoson: '',
      riyousyaSymd: '',
      riyousyaDispSymd: '',

      shikutyosonData: [],
      allData: [],
      mainFlexGrid: [],

      calendarKey: '1',
      nengouKey: '',
      dispNngou: '',
      // 市区町村修正
      editShikutyosonFlag: true,
      addShikutyosonFlag: true
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
      this.riyousyaDispSymd =         riyousyadata['dispSymd'][0];

    // 市区町村のデータ変更履歴の配列を作成
    let shikutyosonData = [];
    for (let i = 0; i < riyousyadata['shikutyoson'].length; i++) {
      let keyValue = riyousyadata['shikutyoson'].length - i;
      shikutyosonData.push(
        {
          key: keyValue,
          shikutyoson: riyousyadata['shikutyoson'][i],
          symd: riyousyadata['dispSymd'][i]
        }
      );
    }
    this.shikutyosonData = [];
    this.shikutyosonData = shikutyosonData;
    this.allData = this.shikutyosonData;
    },

    /***********
     * 登録ボタンを押下
     */
    addRiyousyadata() {
      // 入力データをフォーマット

      // 開始日
      if (this.inputSymd === "") {
        // 開始日が空だった場合は今日の日付が入る
        this.dispSymd.push(new Date(this.year, Number(this.month) - 1, this.date));
      }
      // 性別
      let displayGender = "";    // 表示用性別
      if (this.riyousyaGenderKey === 1) {
        displayGender = "男";
      } else if (this.riyousyaGenderKey === 2) {
        displayGender = "女";
      } else if (this.riyousyaGenderKey === 0) {
        displayGender = "適用不能";
      } else {
        displayGender = "";
      }

      // 住所
      // 入力された郵便番号をフォーマット
      let displayPostcode = "";    //画面表示用郵便番号
      displayPostcode = "〒" + this.riyousyaPostcode1 + "-" + this.riyousyaPostcode2;

      let displayAddress = ""    // 画面表示用住所
      displayAddress = displayPostcode + "\n" + this.riyousyaAddress;

      // 修正データとして登録
      this.editData.push({
        code:         this.riyousyaCode,
        names:         this.riyousyaNames,
        kana:          this.riyousyaKana,
        birthymd:      new Date(this.inputBirthY, Number(this.inputBirthM) - 1, this.inputBirthD),
        age:           this.riyousyaAge,
        gender:        displayGender,
        postcode:      this.riyousyaPostcode,
        address:       displayAddress,
        dispAddress:   this.inputAddress,
        tell1:         this.riyousyaTell1,
        tell2:         this.riyousyaTell2,
        shikutyoson:   this.riyousyaShikutyoson[0],
        symd:          this.symd,
        dispSymd :     new Date(this.year, Number(this.month) - 1, this.date),
      });
      if (this.editShikutyosonFlag === true) {
        // 修正タブが選択されている場合
        // 配列の値を入力値に修正
        console.log(this.editData);
        this.shikutyosonData[0]['shikutyoson'] = this.riyousyaShikutyoson;
        this.shikutyosonData[0]['symd'] = this.editData[0]['dispSymd'];
      } else if (this.addShikutyosonFlag === true) {
        // 追加タブが選択されている場合
        // 追加データを登録
        this.shikutyosonData.unshift(
          {
            key: this.shikutyosonData.length + 1,
            shikutyoson: this.riyousyaShikutyoson,
            symd: this.riyousyaDispSymd
          }
        );
      } else {
        alert(エラー);
      }
      this.allData = this.shikutyosonData;
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.shikutyosonData;
      this.mainFlexGrid.columns[2].format = sysConst.FORMAT.GYmd;
      console.log(this.mainFlexGrid.itemsSource)

      // 市区町村データ修正追加確認
      // this.parentFlag = false;

      // 入力情報を追加した配列を親に返す
      // this.$emit('addFormData', this.editData);

      // 入力情報をリセット
      // this.riyousyaCode = '';
      // this.riyousyaNames = '';
      // this.riyousyaKana = '';
      // this.riyousyabirthymd = '';
      // this.riyousyaAge = '';
      // this.riyousyaGenderKey = '';
      // this.riyousyaPostcode = '';
      // this.riyousyaPostcode1 = '';
      // this.riyousyaPostcode2 = '';
      // this.riyousyaAddress = '';
      // this.riyousyaTell1 = '';
      // this.riyousyaTell2 = '';
      // this.riyousyaShikutyoson = '';
      // this.riyousyaSymd = '';
    },
    /***********
     *dialog和暦西暦表示切り替え
     */
    switchDialogYear() {
      if (this.calendarKey === '1') {
        // 和暦選択時
        this.dispNngou = "";
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

      this.riyousyaDispSymd = this.year + this.month + this.date;
      this.datepicker_dialog = false;
    },
    /***********
     * 市区町村修正タブ押下
     */
    editShikutyoson() {
      // グリッドの選択を有効化する
      this.mainFlexGrid.selectionMode = wjGrid.SelectionMode.ListBox;

      this.editShikutyosonFlag = true;
      this.addShikutyosonFlag = false;

      // 利用者の最新の市区町村データ、有効開始日データを再表示
      this.riyousyaShikutyoson = this.shikutyosonData[0]['shikutyoson'];
      this.year = moment(this.shikutyosonData[0]['symd']).format('YYYY');
      this.month = moment(this.shikutyosonData[0]['symd']).format('MM');
      this.date = moment(this.shikutyosonData[0]['symd']).format('DD');
    },
    
    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.editShikutyosonFlag === true) {
          let ht = flexGrid.hitTest(e);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);
          // セル押下時のみ
          console.log(flexGrid.Selected)
          if (ht.cellType == wjGrid.CellType.Cell) {
            //クリックした行の利用者データを取得
            let SelectShikutyousonData = _self.getSelectRow(hPage.row);
            // クリックした行の利用者データを表示
            _self.riyousyaShikutyoson = SelectShikutyousonData['shikutyoson'];
            _self.year = moment(SelectShikutyousonData['symd']).format('YYYY');
            _self.month = moment(SelectShikutyousonData['symd']).format('MM');
            _self.date = moment(SelectShikutyousonData['symd']).format('DD');

            
            return SelectShikutyousonData;
          }
        }
      });
    },
    /*************
     * 選択した行を取得
     */
    getSelectRow(row) {
      let data = [];
      data = this.shikutyosonData[row];
      return data;
    },
    /***********
     * 市区町村新規追加タブ押下
     */
    addShikutyoson() {
      // グリッドの選択を無効にする
      this.mainFlexGrid.selectionMode = wjGrid.SelectionMode.None;

      this.editShikutyosonFlag = false;
      this.addShikutyosonFlag = true;

      // 利用者市区町村データを一旦初期化
      this.riyousyaShikutyoson = "";

      // 有効開始日を本日に変更
      this.year = moment().format('YYYY');
      this.month = moment().format('MM');
      this.date = moment().format('DD');
    },
    /***********
     * 削除ボタンを押下
     */
    shinkiTouroku_dialog_delete: function () {
      if (confirm('市町村データを削除します。\nよろしいですか？')) {
        // 最新の市町村データを削除
        this.shikutyosonData.shift();  
        this.allData = this.shikutyosonData;
        this.mainFlexGrid.itemsSource = this.kihonjyohoData;
      }
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;

      // セルのクリックイベント(修正タブアクティブ時)
      this.clickEventCell(flexGrid);
      // 日付を和暦に変換（初期表示）
      this.mainFlexGrid.columns[2].format = sysConst.FORMAT.GYmd;

      // this.getData();

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
      flexGrid.rowHeaders.rows[0].height = 27;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontSize = '12px';
        s.fontWeight = 'initial';
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
      height: 25px;
      line-height: 25px;
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
    // 市区町村修正箇所
    .shikutyosonEditBox {
      border: solid 1px #ccc;
      .shikutyosonDelete {
        margin-top: 21px;
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
      width: auto;
      max-height: 75px;
      min-height: 75px;
      .wj-cell {
        height: 25px;
      }
      .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
        transition: all 0s;
        background: $grid_hover_background;
      }

      .wj-cells .wj-cell.wj-state-multi-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
      }

      .wj-cells .wj-cell.wj-state-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
      }
    }
  }
</style>