<template>
  <div id="kihonJyoho">
    <v-container fluid class="mt-0 user-info">
      <riyousyadaityo-sort-menu
        @pearentShinkiDialogOpen="pearentShinkiDialogOpen()"
        @pearentAllowSyuseiTouroku="pearentAllowSyuseiTouroku()"
        @displaySort="displaySort($event)"
        @sorted="sorted($event)"
        @onDateSwitch="onDateSwitch($event)"
        :kihonJyohoFlag="true"
        :serviceHistoryFlag="false"
        ref="childRiyousyadaityo"
      ></riyousyadaityo-sort-menu>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="kihonJyohoGrid"
          :headersVisibility="'Column'"
          :allowDragging="false"
          :allowResizing="true"
          :deferResizing="false"
          :allowSorting="false"
          :autoRowHeights="true"
          :selectionMode="'Row'"
          :initialized="onInitialized"
          :itemsSource="kihonjyohoData"
          :style="gridHeight"
        >
          <wj-flex-grid-column
            :binding="'code'"
            :header="'コード'"
            align="center"
            :width="90"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'names'"
            :header="'利用者名'"
            :allowResizing="true"
            align="center"
            :width="139"
            :isReadOnly="true"
            :multiLine="true"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kana'"
            :header="'フリガナ'"
            align="center"
            :width="139"
            :isReadOnly="true"
            :allowResizing="true"
            :multiLine="true"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dispBirthymd'"
            :header="'生年月日'"
            align="center"
            :width="90"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'age'"
            :header="'年齢'"
            align="center"
            :width="40"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'gender'"
            :header="'性別'"
            align="center"
            :width="40"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dispAddress'"
            :header="'住所'"
            :multiLine="true"
            :wordWrap="true"
            align="center"
            :width="270"
            :isReadOnly="true"
            :allowResizing="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tell1'"
            :header="'連絡先①'"
            align="center"
            :width="125"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tell2'"
            :header="'連絡先②'"
            align="center"
            :width="125"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'shikutyoson[0]'"
            :header="'市区町村'"
            :width="91"
            :isReadOnly="false"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dispSymd'"
            :header="'開始日'"
            align="center"
            :width="90"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dispEymd'"
            :header="'終了日'"
            align="center"
            :width="90"
            :isReadOnly="true"
            :allowResizing="false"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <dialog-shinki-touroku 
        ref="dialog_shinki_tuika"
        @addFormData = "addFormData"
        ></dialog-shinki-touroku>
      <dialog-syusei-touroku 
        ref="dialog_syusei_touroku"
        ></dialog-syusei-touroku>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';
import DialogShinkiTouroku from '../components/DialogShinkiTouroku.vue';
import DialogSyuseiTouroku from '../components/DialogSyuseiTouroku.vue';
import sysConst from '@/utiles/const';
import '@grapecity/wijmo.cultures/wijmo.culture.ja'

export default {
  data() {
    return {
      displaySortTypeKey: 'all', // 表示項目の初期
      alphabetKey: 0, // 50音検索の初期
      sortedType: 'jigyo', // ソートの初期
      dialog_shinki_flag: false, // 新規登録モーダルの表示フラグ
      serviceJigyo: {
        serviceTeikyoJigyosyo: '',
        serviceTeikyoJigyosyoCode: '',
      }, // サービス事業の初期
      serviceNaiyo: {
        serviceMeisyo: '',
        serviceCode: '',
      }, // サービス事業の初期
      kanaText: '',
      isVisible1: false, // 初期選択状態
      isVisible2: true, // 初期選択状態
      syuseiTourokuFlag: false,
      kihonjyohoData: [],
      allData: [],
      mainFlexGrid: [],
      gridHeight: '', // グリッドの高さ
    };
  },
  components: {
    RiyousyadaityoSortMenu,
    DialogShinkiTouroku,
    DialogSyuseiTouroku,
  },
  mounted() {
    this.handleResize();
  },
  created() {
    // グリッドリサイズ
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 62;
      if (height > 800) {
        ht = 65;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
    /************************
     * 和暦西暦切り替え
     */
    onDateSwitch(type) {
      console.log(type.dateType);
      if (type.dateType === 'wareki') {
        this.mainFlexGrid.columns[3].format = sysConst.FORMAT.GYmd;
        this.mainFlexGrid.columns[10].format = sysConst.FORMAT.GYmd;
        this.mainFlexGrid.columns[11].format = sysConst.FORMAT.GYmd;
      } else {
        this.mainFlexGrid.columns[3].format = sysConst.FORMAT.Ymd;
        this.mainFlexGrid.columns[10].format = sysConst.FORMAT.Ymd;
        this.mainFlexGrid.columns[11].format = sysConst.FORMAT.Ymd;
      }
    },
    /************************
     * 新規登録タブ押下
     */
    pearentShinkiDialogOpen() {
      this.syuseiTourokuFlag = false;
      let array = [];
      array = this.kihonjyohoData;

      // モーダルに新データ追加用の配列を渡す
      this.$refs.dialog_shinki_tuika.open(array);
    },
    
    /************************
     * 修正登録タブ押下
     */
    pearentAllowSyuseiTouroku() {
      this.syuseiTourokuFlag = true;
    },

    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.syuseiTourokuFlag === true) {
          let ht = flexGrid.hitTest(e);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);
          // セル押下時のみ
          if (ht.cellType == wjGrid.CellType.Cell) {
            //クリックした行の利用者データを取得
            let RiyousyaKihonData = _self.getJyukyunoRow(hPage.row);
            _self.$refs.dialog_syusei_touroku.open(RiyousyaKihonData);
          }
        }
      });
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyunoRow(row) {
      let data = [];
      data = this.kihonjyohoData[row];
      return data;
    },
    /************************
     * 子コンポーネントのソート項目
     */
    sorted(type) {
      // 表示配列の合計列を省く
      let array = [];
      this.sortedType = type.sortedType;
      for (let i = 0; i < this.kihonjyohoData.length; i++) {
        if (this.kihonjyohoData[i].code) {
          array.push(this.kihonjyohoData[i]);
        }
      }
      console.log(array);
      if (type.sortedType === 'kana') {
        array.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });
      }
      if (type.sortedType === 'code') {
        array.sort((a, b) => {
          if (a.code > b.code) {
            return -1;
          }
          if (a.code < b.code) {
            return 1;
          }
          return 0;
        });
      }
      let returns = this.changeSortting(array);
      this.kihonjyohoData = [];
      this.kihonjyohoData = returns;
    },
    /****************************
     * 子コンポーネントの表示項目
     */
    displaySort(type) {
      // 有効
      // 開始日が本日以前のデータ
      if (type.displaySortType === 'enable') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let st = '';
          if (this.allData[i].startDate) {
            st = moment(this.allData[i].startDate);
          } else {
            st = '';
          }
          if (st && st.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.kihonjyohoData = [];
        this.kihonjyohoData = array;
      }
      // 終了
      // 終了日が本日以前のデータ
      if (type.displaySortType === 'finish') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let ed = '';
          if (this.allData[i].eymd) {
            ed = moment(this.allData[i].eymd);
          } else {
            ed = '';
          }
          if (ed && ed.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.kihonjyohoData = [];
        this.kihonjyohoData = array;
      }
      // 全員
      if (type.displaySortType === 'all') {
        this.kihonjyohoData = [];
        this.kihonjyohoData = this.allData;
      }

      // 表示配列の合計列を省く
      let array = [];
      for (let i = 0; i < this.kihonjyohoData.length; i++) {
        if (this.kihonjyohoData[i].code) {
          array.push(this.kihonjyohoData[i]);
        }
      }
      this.kihonjyohoData = this.changeSortting(array);
    },
    getData() {
      // this.JyuryouTsuchisyoData = result.icrn_inf;
      // this.allData = this.JyuryouTsuchisyoData;
      let kihonjyohoData = [];
      kihonjyohoData.push(
        {
          serviceTeikyoJigyosyoCode: 1001,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 22,
          serviceMeisyo: '生活介護',
          code: '1000000001',
          jyukyuno: '1000000001', //提供サービス
          names: '東経 太郎', // サービス種類コード
          kana: 'タロウ トウケイ', // 利用日数
          birthymd: '19920422',
          // dispBirthymd: moment('20200901').format('YYYY/MM/DD'),
          dispBirthymd: new Date('2000', Number('04') - 1, '01'),
          age: '20',
          gender: '男',
          genderKey: '1',
          postcode1: '001',
          postcode2: '2345',
          address: '〇〇市××町11-1',
          dispAddress: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          shikutyoson: ['東経市','A市'],
          symd: ['20220201','20220401'],
          dispSymd: new Date('2022', Number('02') - 1, '01'),
          startY: '2022',
          startM: '05',
          startD: '20',
          eymd: "",
        },
        {
          serviceTeikyoJigyosyoCode: 1001,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 22,
          serviceMeisyo: '生活介護',
          code: '1000000002',
          jyukyuno: '1000000002', //提供サービス
          names: '東経 花子', // サービス種類コード
          kana: 'ハナコ トウケイ', // 利用日数
          birthymd: '19920122',
          dispBirthymd: new Date('1990', Number('04') - 1, '01'),
          age: '30',
          gender: '女',
          genderKey: '2',
          postcode1: '001',
          postcode2: '2345',
          address: '〇〇市××町11-1',
          dispAddress: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          shikutyoson: ['左右市','B市'],
          symd: "20220201",
          dispSymd: new Date('2022', Number('02') - 1, '01'),
          symd: '20220520',
          startY: '2022',
          startM: '05',
          startD: '20',
          eymd: '20220622',
          dispEymd: new Date('2022', Number('06') - 1, '01'),
        },
        {
          serviceTeikyoJigyosyoCode: 1002,
          serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
          serviceCode: 41,
          serviceMeisyo: '自立訓練(機能訓練)',
          code: '1000000003',
          jyukyuno: '1000000003', //提供サービス
          names: '東経 太郎', // サービス種類コード
          kana: 'タロウ トウケイ', // 利用日数199200111
          birthymd: '19820222',
          dispBirthymd: new Date('1992', Number('04') - 1, '01'),
          age: '40',
          gender: '適不',
          genderKey: '0',
          postcode1: '001',
          postcode2: '2345',
          address: '〇〇市××町11-1',
          dispAddress: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          shikutyoson: ['西経市','B市'],
          symd: "20220301",
          dispSymd: new Date('2022', Number('03') - 1, '01'),
          eymd: moment('20181115').format('YYYY/MM/DD'),
          symd: "",
          startY: '',
          startM: '',
          startD: '',
          eymd: "",
        },
        {
          serviceTeikyoJigyosyoCode: 1002,
          serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
          serviceCode: 41,
          serviceMeisyo: '自立訓練(機能訓練)',
          code: '1000000004',
          jyukyuno: '1000000004', //提供サービス
          names: '１２３４５６７８９０１２３', // サービス種類コード
          kana: 'アスカ トウケイ', // 利用日数
          birthymd: '19880222',
          // dispBirthymd: moment('19880222').format('YYYY/MM/DD'),
          dispBirthymd: new Date('1980', Number('04') - 1, '01'),
          age: '34',
          gender: '女',
          genderKey: '2',
          postcode1: '001',
          postcode2: '2345',
          address: '〇〇市××町11-1',
          dispAddress: '〒001-2345 １２３４５６７８９０１２３４５６７８９０',
          tell1: '12345-1234-1234',
          tell2: '03-1111-2231',
          shikutyoson: ['１２３４５６'],
          symd: "20220301",
          dispSymd: new Date('2022', Number('03') - 1, '01'),
          startY: '2022',
          startM: '03',
          startD: '01',
          eymd: '20220622',
          dispEymd: new Date('2022', Number('06') - 1, '01'),
        }
      );
      this.kihonjyohoData = kihonjyohoData;
      this.allData = this.kihonjyohoData;
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.getData();
      // セルのクリックイベント(修正登録タブアクティブ時)
      this.clickEventCell(flexGrid);

      // 日付を和暦に変換（初期表示）
      this.mainFlexGrid.columns[3].format = sysConst.FORMAT.GYmd;
      this.mainFlexGrid.columns[10].format = sysConst.FORMAT.GYmd;
      this.mainFlexGrid.columns[11].format = sysConst.FORMAT.GYmd;

      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      flexGrid.itemsSource = this.kihonjyohoData;

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.color = '#333';
        s.fontWeight = 'initial';
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((c == 1) || (c == 2) || (c == 2) || (c == 6) || (c == 9)) {
            // テキスト左寄せ
            s.textAlign = 'left';
          }
        }
      };
      // 子コンポーネントにサービス事業を設定
      this.$refs.childRiyousyadaityo.setServiceJigyoCombo(this.kihonjyohoData);
      this.$refs.childRiyousyadaityo.setServiceNaiyoCombo(this.kihonjyohoData);
    },
    
    /*********************
     * サービス順に並び替え
     */
    changeSortting(kihonjyohoData) {
      // サービス順に並び替え
      
      console.log(kihonjyohoData);
      kihonjyohoData.sort((a, b) => {
        if (a.serviceCode === null || b.serviceCode === null) {
          return 2;
        }
        if (a.serviceCode < b.serviceCode) {
          return -1;
        }
        if (a.serviceCode > b.serviceCode) {
          return 1;
        }
        return 0;
      });
      console.log(12);
      // サービス毎の合計数を取得
      let dict = this.getServiceCount(kihonjyohoData);
      console.log(dict);
      let returns = [];
      let n = 1;
      let noServiceCount = 0;
      for (let i = 0; i < kihonjyohoData.length; i++) {
        returns.push(kihonjyohoData[i]);
        if (dict[kihonjyohoData[i].serviceCode] == n) {
          returns.push({
            code: '計', // サービス提供事業所の位置に計(文字列)を表示する
            riyosyamei: n + '名', //利用者名の位置にカウント数を表示するため
          });
          n = 1;
        } else {
          n++;
        }
        // サービスコードが無いカウント
        if (!kihonjyohoData[i].serviceCode) {
          noServiceCount++;
        }
      }
      // サービス情報が無い合計の列
      if (noServiceCount > 0 && this.sortedType == 'jigyo') {
        returns.push({
          code: '未登録 計', // サービス提供事業所の位置に計(文字列)を表示する
          riyosyamei: noServiceCount + '名', //利用者名の位置にカウント数を表示するため
        });
      }
      this.noServiceCount = noServiceCount;

      // 子供関数実行
      // 件数のカウント
      this.$refs.childRiyousyadaityo.setTotalcount(kihonjyohoData);
      return returns;
    },

    getServiceCount(data) {
      // ソートが事業所+サービスの時のみ有効
        console.log(data)
      if (this.sortedType != 'jigyo') {
        return [];
      }
      let serviceCode = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].serviceCode) {
          serviceCode.push(data[i].serviceCode);
        }
      }
      let dict = {};
      for (let key of serviceCode) {
        dict[key] = serviceCode.filter(function (x) {
          return x == key;
        }).length;
      }

      if (this.noServiceCount) {
        dict['noservice'] = this.noServiceCount;
      }

      return dict;
    },
    addFormData(addData) {
      // 新規入力データを配列に追加
      this.kihonjyohoData = addData;
      this.allData = this.kihonjyohoData;
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.kihonjyohoData;
    }
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#kihonJyohoGrid {
  width: auto;
  min-width: none;
  max-width: none;
}
div#kihonJyoho {
  font-family: 'メイリオ';
  min-width: 1323px;
  color: #333;
  font-size: 12px;
  .user-info {
    label {
      margin-right: 4px !important;
      width: 100px;
    }
  }
}
</style>