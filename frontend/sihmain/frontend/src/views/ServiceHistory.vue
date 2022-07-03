<template>
  <div id="serviceHistory" class="mt-n1">
    <v-container fluid class="container mt-0 user-info">
      <riyousyadaityo-sort-menu
        @displaySort="displaySort($event)"
        @sorted="sorted($event)"
        @alphabeted="alphabeted($event)"
        @selectedServiceJigyo="selectedServiceJigyo($event)"
        @selectedServiceNaiyo="selectedServiceNaiyo($event)"
        @kanaSearch="kanaSearch($event)"
        :kihonJyohoFlag="false"
        :serviceHistoryFlag="true"
        ref="childRiyousyadaityo"
      ></riyousyadaityo-sort-menu>
      <wj-flex-grid
        id="serviceHistoryGrid"
        :initialized="onInitialized"
        :selectionMode="3"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :itemsSource="historyData"
      >
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          :isReadOnly="true"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="left"
          valign="middle"
          width="2*"
          :isReadOnly="true"
          :visible="isVisible1"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyoCode'"
          align="center"
          valign="middle"
          :width="80"
          :isReadOnly="true"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyo'"
          align="left"
          valign="middle"
          width="3*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceCode'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceMeisyo'"
          align="left"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          :isReadOnly="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="left"
          valign="middle"
          width="2*"
          :isReadOnly="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          :binding="'spice'"
          align="center"
          valign="middle"
          :width="30"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'startDate'"
          :header="'開始日'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'endDate'"
          :header="'終了日'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'useYear'"
          align="right"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
    <dialog-service-history
      ref="dialog_service"
      :historyData="historyData"
    ></dialog-service-history>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';
import DialogServiceHistory from '../components/DialogServiceHistory.vue';

export default {
  data() {
    return {
      year: moment().year(),
      allData: [],
      historyData: [],
      displaySortTypeKey: 'all', // 表示項目の初期
      alphabetKey: 0, // 50音検索の初期
      sortedType: 'jigyo', // ソートの初期
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
      selectKey: '', // ダイアログに渡すキー
    };
  },
  components: {
    RiyousyadaityoSortMenu,
    DialogServiceHistory,
  },

  methods: {
    /***************:
     * かな検索
     */
    kanaSearch(value) {
      this.kanaText = value.input;
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    /*************************
     * サービス事業を選択
     */
    selectedServiceJigyo(service) {
      this.serviceJigyo = {
        serviceTeikyoJigyosyo: service.serviceTeikyoJigyosyo,
        serviceTeikyoJigyosyoCode: service.serviceTeikyoJigyosyoCode,
      };
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    selectedServiceNaiyo(service) {
      this.serviceNaiyo = {
        serviceMeisyo: service.serviceMeisyo,
        serviceCode: service.serviceCode,
      };
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    /**********************
     * 名前の絞り込み
     */
    alphabeted(data) {
      this.alphabetKey = data.alphabetKey;
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },

    /************************
     * 子コンポーネントのソート項目
     */
    sorted(type) {
      // 表示配列の合計列を省く
      let array = [];
      this.sortedType = type.sortedType;
      for (let i = 0; i < this.historyData.length; i++) {
        if (this.historyData[i].code) {
          array.push(this.historyData[i]);
        }
      }
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

        this.isVisible1 = true;
        this.isVisible2 = false;
      }
      if (type.sortedType === 'code') {
        array.sort((a, b) => {
          // コードの昇順
          if (parseInt(a.code) > parseInt(b.code)) {
            return 1;
          }
          if (parseInt(a.code) < parseInt(b.code)) {
            return -1;
          }
          return 0;
        });
        this.isVisible1 = true;
        this.isVisible2 = false;
      }
      if (type.sortedType === 'jigyo') {
        array.sort((a, b) => {
          // コードの昇順
          if (parseInt(a.code) > parseInt(b.code)) {
            return 1;
          }
          if (parseInt(a.code) < parseInt(b.code)) {
            return -1;
          }
          return 0;
        });
        array = this.changeSortting(array);

        this.isVisible1 = false;
        this.isVisible2 = true;
      }

      this.historyData = [];
      this.historyData = array;
      this.createHeaderMerge(this.mainFlexGrid);
    },
    /****************************
     * 子コンポーネントの表示項目
     */
    displaySort(type) {
      this.displaySortTypeKey = type.displaySortType;

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
        this.historyData = [];
        this.historyData = array;
      }
      // 終了
      // 終章日が本日以前のデータ
      if (type.displaySortType === 'finish') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let ed = '';
          if (this.allData[i].endDate) {
            ed = moment(this.allData[i].endDate);
          } else {
            ed = '';
          }
          if (ed && ed.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.historyData = [];
        this.historyData = array;
      }
      // 全員
      if (type.displaySortType === 'all') {
        this.historyData = [];
        this.historyData = this.allData;
      }

      // 表示配列の合計列を省く
      let array = [];
      for (let i = 0; i < this.historyData.length; i++) {
        if (this.historyData[i].code) {
          let kana = this.historyData[i].kana;
          if (
            (this.kanaText.length == 0 ||
              this.historyData[i].riyosyamei.indexOf(this.kanaText) != -1 ||
              this.historyData[i].code.toString().indexOf(this.kanaText) !=
                -1) &&
            (this.serviceNaiyo.serviceCode == 0 ||
              this.serviceNaiyo.serviceCode ==
                this.historyData[i].serviceCode) &&
            (this.serviceJigyo.serviceTeikyoJigyosyoCode == 0 ||
              this.serviceJigyo.serviceTeikyoJigyosyoCode ==
                this.historyData[i].serviceTeikyoJigyosyoCode) &&
            (this.alphabetKey == 0 ||
              (this.alphabetKey == 1 && kana.match(/^[ア-オ]/)) ||
              (this.alphabetKey == 2 && kana.match(/^[カ-コ]/)) ||
              (this.alphabetKey == 3 && kana.match(/^[サ-ソ]/)) ||
              (this.alphabetKey == 4 && kana.match(/^[タ-ト]/)) ||
              (this.alphabetKey == 5 && kana.match(/^[ナ-ノ]/)) ||
              (this.alphabetKey == 6 && kana.match(/^[ハ-ホ]/)) ||
              (this.alphabetKey == 7 && kana.match(/^[マ-モ]/)) ||
              (this.alphabetKey == 8 && kana.match(/^[ヤ-ヨ]/)) ||
              (this.alphabetKey == 9 && kana.match(/^[ラ-ロ]/)) ||
              (this.alphabetKey == 10 && kana.match(/^[ワ-ン]/)))
          ) {
            array.push(this.historyData[i]);
          }
        }
      }
      this.historyData = this.changeSortting(array);
      this.createHeaderMerge(this.mainFlexGrid);
    },
    onInitialized(flexGrid) {
      this.historyData = this.getData();
      this.mainFlexGrid = flexGrid;
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);

      this.methodCellFormatSetting(flexGrid);

      // 子コンポーネントにサービス事業を設定
      this.$refs.childRiyousyadaityo.setServiceJigyoCombo(this.historyData);
      this.$refs.childRiyousyadaityo.setServiceNaiyoCombo(this.historyData);
      flexGrid.select(-1, -1);

      // セルを押下
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);

        if (ht.cellType == wjGrid.CellType.Cell) {
          if (_self.historyData[ht.row].code) {
            _self.selectKey = ht.row;
            _self.$refs.dialog_service.openDialog(_self.selectKey);
          }
        }
      });
    },
    getData() {
      let historyData = [];
      historyData.push(
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 22,
          serviceMeisyo: '生活介護',
          code: 10000001,
          riyosyamei: '東経 太郎',
          kana: 'タロウトウケイ',
          gender: '男',
          genderKey: '1',
          birth: moment('19300615').format('YYYY/MM/DD'),
          age: 30,
          spice: '',
          startDate: moment('20230401').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '4ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 22,
          serviceMeisyo: '生活介護',
          code: 10000002,
          riyosyamei: '東経 花子',
          kana: 'ハナコトウケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('19820505').format('YYYY/MM/DD'),
          age: 30,
          spice: '',
          startDate: moment('20200901').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '1年11ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 22,
          serviceMeisyo: '生活介護',
          code: 10000003,
          riyosyamei: '東経 二郎',
          kana: 'ジロウトウケイ',
          gender: '男',
          genderKey: '1',
          birth: moment('19820505').format('YYYY/MM/DD'),
          age: 30,
          spice: '',
          startDate: moment('20181115').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '3年8ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 32,
          serviceMeisyo: '施設入所支援',
          code: 10000001,
          riyosyamei: '東経 太郎',
          kana: 'タロウトウケイ',
          gender: '男',
          genderKey: '1',
          birth: moment('19300615').format('YYYY/MM/DD'),
          age: 30,
          spice: '',
          startDate: moment('20210401').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '4ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 32,
          serviceMeisyo: '施設入所支援',
          code: 10000002,
          riyosyamei: '東経 花子',
          kana: 'ハナコトウケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('19300209').format('YYYY/MM/DD'),
          age: 30,
          spice: '',
          startDate: moment('20200901').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '1年11ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100101,
          serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
          serviceCode: 32,
          serviceMeisyo: '施設入所支援',
          code: 10000003,
          riyosyamei: '東経 ジロウ',
          kana: 'ジロウトウケイ',
          gender: '',
          genderKey: '',
          birth: '',
          age: '',
          spice: '',
          startDate: moment('20181105').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '3年8ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100102,
          serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
          serviceCode: 41,
          serviceMeisyo: '自立訓練(機能訓練)',
          code: 10000004,
          riyosyamei: '東経 三郎',
          kana: 'サブロウトウケイ',
          gender: '男',
          genderKey: '1',
          birth: moment('19790602').format('YYYY/MM/DD'),
          age: '36',
          spice: '',
          startDate: moment('20190210').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '2年5ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: 100102,
          serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
          serviceCode: 41,
          serviceMeisyo: '自立訓練(機能訓練)',
          code: 10000005,
          riyosyamei: '東経 明日香',
          kana: 'アスカトウケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('20080301').format('YYYY/MM/DD'),
          age: '23',
          spice: '',
          startDate: moment('20191220').format('YYYY/MM/DD'),
          endDate: '',
          useYear: '1年7ヶ月',
        },
        {
          serviceTeikyoJigyosyoCode: '',
          serviceTeikyoJigyosyo: '',
          serviceCode: null,
          serviceMeisyo: '',
          code: 10000006,
          riyosyamei: '東経 うみか',
          kana: 'ウミカトウケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('19911215').format('YYYY/MM/DD'),
          age: '32',
          spice: '通',
          startDate: '',
          endDate: '',
          useYear: '',
        },
        {
          serviceTeikyoJigyosyoCode: '',
          serviceTeikyoJigyosyo: '',
          serviceCode: null,
          serviceMeisyo: '',
          code: 10000009,
          riyosyamei: '西経 五郎',
          kana: 'ゴロウニシケイ',
          gender: '男',
          genderKey: '1',
          birth: moment('19870501').format('YYYY/MM/DD'),
          age: '30',
          spice: '',
          startDate: '',
          endDate: '',
          useYear: '',
        },
        {
          serviceTeikyoJigyosyoCode: '',
          serviceTeikyoJigyosyo: '',
          serviceCode: null,
          serviceMeisyo: '',
          code: 10000011,
          riyosyamei: '西経 みどり',
          kana: 'ミドリニシケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('19800818').format('YYYY/MM/DD'),
          age: '41',
          spice: '',
          startDate: '',
          endDate: '',
          useYear: '',
        },
        {
          serviceTeikyoJigyosyoCode: '',
          serviceTeikyoJigyosyo: '',
          serviceCode: null,
          serviceMeisyo: '',
          code: 10000015,
          riyosyamei: '西経 桃子',
          kana: 'モモコニシケイ',
          gender: '女',
          genderKey: '2',
          birth: moment('19900901').format('YYYY/MM/DD'),
          age: '29',
          spice: '',
          startDate: '',
          endDate: '',
          useYear: '',
        }
      );
      // サービス順に並び替え
      let returns = this.changeSortting(historyData);
      this.allData = returns;
      return returns;
    },

    /*********************
     * サービス順に並び替え
     */
    changeSortting(historyData) {
      // サービス順に並び替え
      historyData.sort((a, b) => {
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
      // サービス毎の合計数を取得
      let dict = this.getServiceCount(historyData);
      let returns = [];
      let n = 1;
      let noServiceCount = 0;
      for (let i = 0; i < historyData.length; i++) {
        returns.push(historyData[i]);
        if (dict[historyData[i].serviceCode] == n) {
          returns.push({
            serviceTeikyoJigyosyoCode: '計', // サービス提供事業所の位置に計(文字列)を表示する
            riyosyamei: n + '名', //利用者名の位置にカウント数を表示するため
          });
          n = 1;
        } else {
          n++;
        }
        // サービスコードが無いカウント
        if (!historyData[i].serviceCode) {
          noServiceCount++;
        }
      }
      // サービス情報が無い合計の列
      if (noServiceCount > 0 && this.sortedType == 'jigyo') {
        returns.push({
          serviceTeikyoJigyosyoCode: '未登録 計', // サービス提供事業所の位置に計(文字列)を表示する
          riyosyamei: noServiceCount + '名', //利用者名の位置にカウント数を表示するため
        });
      }
      this.noServiceCount = noServiceCount;

      // 子供関数実行
      // 件数のカウント
      this.$refs.childRiyousyadaityo.setTotalcount(historyData);
      return returns;
    },

    getServiceCount(data) {
      // ソートが事業所+サービスの時のみ有効
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
    methodCellFormatSetting(flexGrid) {
      let self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        // サービス毎の合計数を取得
        let dict = self.getServiceCount(self.historyData);
        let yellowLine = [];
        let rows = '';
        Object.keys(dict).forEach(function (key) {
          rows += dict[key];
          yellowLine.push(rows.toString());
          rows++;
        });

        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 8) {
            let text = e.cell.innerText;
            let classname = 'vertical';
            e.cell.innerHTML =
              '<div class="' + classname + '">' + text + '</div>';
          }
        }
        if (e.panel != flexGrid.columnHeaders) {
          if (yellowLine.indexOf(e.row.toString()) != -1) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
            e.cell.style.textAlign = 'center';
          } else {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.textAlign = 'left';
          }
          if (e.col == 0 || e.col == 2 || e.col == 6) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }
          if (e.col == 11) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
        }
      });
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'コード');
      panel.setCellData(0, 1, '利用者名');
      panel.setCellData(0, 2, 'サービス提供事業所');
      panel.setCellData(0, 4, 'サービス名称');
      panel.setCellData(0, 6, 'コード');
      panel.setCellData(0, 7, '利用者名');
      panel.setCellData(0, 8, '種類');
      panel.setCellData(0, 9, '利用期間');
      panel.setCellData(0, 11, '利用年数');
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 1, 7),
        new wjGrid.CellRange(0, 8, 1, 8),
        new wjGrid.CellRange(0, 9, 0, 10),
        new wjGrid.CellRange(0, 11, 1, 11),
      ];

      // サービス毎の合計数を取得
      let dict = this.getServiceCount(this.historyData);
      let ranges = [];
      let rows = 0;
      Object.keys(dict).forEach(function (key) {
        rows += dict[key];
        // ranges.push(new wjGrid.CellRange(rows, 0, rows, 4));
        rows++;
      });

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType != wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

div#serviceHistory {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1266px;

  .wj-cell.wj-header.wj-align-right,
  .wj-cell.wj-header.wj-align-left,
  .wj-cell.wj-header.wj-align-center {
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
  }

  .wj-cell {
    &.wj-state-selected {
      color: $font_color;
      background-color: $grid_hover_background;
    }
    &.wj-state-multi-selected {
      color: $font_color;
      background-color: $grid_hover_background;
    }
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
}
</style>