<template>
  <div id="serviceHistory">
    <v-container fluid class="container">
      <riyousyadaityo-sort-menu
        @parent-calendar="parentCalendar($event, dateArgument)"
        @parent-search="parentSearch($event, searchArgument)"
        :shinkiTourokuFlag="true"
        :shuseiTourokuFlag="false"
        :rirekiTourokuFlag="false"
      ></riyousyadaityo-sort-menu>
      <wj-flex-grid
        id="serviceHistoryGrid"
        :initialized="onInitialized"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :itemsSource="historyData"
      >
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
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="left"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'gender'"
          align="center"
          valign="middle"
          :width="30"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'birth'"
          align="center"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'age'"
          align="center"
          valign="right"
          :width="30"
          :isReadOnly="true"
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
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';

const alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];

export default {
  data() {
    return {
      alphabet: alphabet,
      year: moment().year(),
      historyData: this.getData(),
    };
  },
  components: {
    RiyousyadaityoSortMenu,
  },

  methods: {
    onInitialized(flexGrid) {
      flexGrid.select(-1, -1);
      this.mainFlexGrid = flexGrid;
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);

      this.methodCellFormatSetting(flexGrid);
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
          startDate: moment('20210401').format('YYYY/MM/DD'),
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
        }
      );

      // サービス順に並び替え
      historyData.sort((a, b) => {
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
      }
      return returns;
    },
    getServiceCount(data) {
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

      return dict;
    },
    methodCellFormatSetting(flexGrid) {
      let _self = this;
      // サービス毎の合計数を取得
      let dict = this.getServiceCount(this.historyData);
      let yellowLine = [];
      let rows = '';
      Object.keys(dict).forEach(function (key) {
        rows += dict[key];
        yellowLine.push(rows.toString());
        rows++;
      });
      console.log(yellowLine);
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 6 || e.col == 8 || e.col == 9) {
            let text = e.cell.innerText;
            let classname = 'vertical';
            e.cell.innerHTML =
              '<div class="' + classname + '">' + text + '</div>';
          }
        }
        if (e.panel != flexGrid.columnHeaders) {
          console.log(yellowLine.indexOf(e.row.toString()));
          if (yellowLine.indexOf(e.row.toString()) != -1) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            if (e.col == 5) {
              e.cell.style.textAlign = 'center';
              e.cell.style.justifyContent = 'center';
              e.cell.style.alignItems = 'center';
            }
          }
        }
      });
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'サービス提供事業所');
      panel.setCellData(0, 2, 'サービス名称');
      panel.setCellData(0, 4, 'コード');
      panel.setCellData(0, 5, '利用者名');
      panel.setCellData(0, 6, '性別');
      panel.setCellData(0, 7, '生年月日');
      panel.setCellData(0, 8, '年齢');
      panel.setCellData(0, 9, '種類');
      panel.setCellData(0, 10, '利用期間');
      panel.setCellData(0, 12, '利用年数');

      // flexGrid.columnHeaders.columns[6].cssClassAll = 'vertical';
      // flexGrid.columnHeaders.columns[8].cssClassAll = 'vertical';
      // flexGrid.columnHeaders.columns[9].cssClassAll = 'vertical';
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 4),
        new wjGrid.CellRange(0, 5, 1, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 1, 7),
        new wjGrid.CellRange(0, 8, 1, 8),
        new wjGrid.CellRange(0, 9, 1, 9),
        new wjGrid.CellRange(0, 10, 0, 11),
        new wjGrid.CellRange(0, 12, 1, 12),
      ];

      // サービス毎の合計数を取得
      let dict = this.getServiceCount(this.historyData);
      let ranges = [];
      let rows = 0;
      Object.keys(dict).forEach(function (key) {
        rows += dict[key];
        ranges.push(new wjGrid.CellRange(rows, 0, rows, 4));
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
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      if (this.receptFlag) {
        this.$refs.receptChild.parentAlphabet(key);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentAlphabet(key);
      } else {
        this.$refs.tajougenChild.parentAlphabet(key);
      }
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