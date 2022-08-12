<template>
  <div id="nyutaiin">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-service-select="parentSearch($event, searchArgument)"
      :nenkanRiyouNissuFlag="true"
      ref="childheader"
    ></header-services>

    <v-container fluid class="jijyougen-container mt-0 user-info">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn @click="printing()">印刷</v-btn>
          <v-row class="mt-1" no-gutters>
            <label>{{ filterString.syukei.title }}</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(1)"
              >
                {{ filterString.syukei.ans[1] }}
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(0)"
              >
                {{ filterString.syukei.ans[0] }}
              </v-btn>
            </v-btn-toggle>

            <label class="ml-1">{{ filterString.sort.title }}</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory v-model="sorted">
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(1)"
              >
                {{ filterString.sort.ans[0] }}
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(2)"
              >
                {{ filterString.sort.ans[1] }}
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(3)"
              >
                {{ filterString.sort.ans[2] }}
              </v-btn>
            </v-btn-toggle>
            <label class="ml-1">{{ filterString.kubun.title }}</label>
            <wj-menu
              :itemsSource="syogaisyaCombo"
              class="ml-1 w-100 customCombobox"
              :itemClicked="onSyogaisyaCombo"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              :isRequired="true"
              :v-model="selUser"
              header="指定なし"
            ></wj-menu>

            <v-btn class="ml-2" small>検索</v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-1">
        <v-col cols="4">
          <alphabet-button
            ref="alphabetButton"
            @onAlphabetical="onAlphabetical"
          ></alphabet-button>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="container" style="styles">
      <wj-flex-grid
        id="grid_nyutaiin"
        class="mt-n5"
        :selectionMode="'None'"
        :initialized="onInitialized"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :autoGenerateColumns="false"
        :itemsSource="nenkanRiyouNissuData"
      >
        <wj-flex-grid-column
          :binding="'riyocode'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          :binding="'names'"
          align="center"
          valign="middle"
          :width="160"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'syogaikbn'"
          align="center"
          valign="middle"
          :multiLine="true"
          :width="40"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'symd_view'"
          align="center"
          valign="middle"
          :width="80"
          :multiLine="true"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'eymd_view'"
          align="center"
          valign="middle"
          :width="80"
          :multiLine="true"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          v-for="(n, k) in 9"
          :key="k + 3"
          :binding="'nissu' + parseInt(n + 3)"
          :header="n + 3 + '月'"
          align="center"
          valign="middle"
          :width="50"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          v-for="(n, k) in 3"
          :key="k"
          :binding="'nissu' + n"
          :header="n + '月'"
          align="center"
          valign="middle"
          :width="50"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'gokei'"
          align="center"
          valign="middle"
          :width="80"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'avg'"
          align="center"
          valign="middle"
          width="*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';

import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';

import HeaderServices from '../components/HeaderServices.vue';
import { getConnect } from '@connect/getConnect';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';

const riyosyaCombo = [];
const receptCombo = [];
const jyougenkanriCombo = [];
const taServiceCombo = [];

export default {
  data() {
    return {
      filterString: {
        syukei: { title: '集計(開始終了月)', ans: ['含めない', '含める'] },
        sort: { title: 'ソート', ans: ['カナ', 'コード', '受給者番号'] },
        kubun: { title: '障害者支援区分' },
      },
      sorted: 0,
      nenkanRiyouNissuData: [],
      allData: [],
      alphabetSelect: 0,
      riyosyaCombo: riyosyaCombo,
      jyougenkanriCombo: jyougenkanriCombo,
      taServiceCombo: taServiceCombo,
      receptCombo: receptCombo,
      selUser: 0,
      syukeiFlag: 1,
      sortFlag: 1,
      searchArgument: '',
      selectedSyogaiShien: 0,
      syogaisyaCombo: [
        {
          key: 0,
          text: '指定なし',
        },
        {
          key: 1,
          text: '1',
        },
        {
          key: 2,
          text: '2',
        },
        {
          key: 3,
          text: '3',
        },
        {
          key: 4,
          text: '4',
        },
        {
          key: 5,
          text: '5',
        },
      ],
      headerheight: 260,
    };
  },
  components: {
    HeaderServices,
    AlphabetButton,
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    // バインドするスタイルを生成
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  created() {
    this.nenkanRiyouNissuData = [];
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    calculateWindowHeight() {
      if (document.getElementById('grid_nyutaiin') != null) {
        document.getElementById('grid_nyutaiin').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*******************
     * 印刷
     */
    printing() {
      let doc = new wjCore.PrintDocument({
        title: 'PrintDocumentテスト',
      });
      doc.Landscape = 1;
      doc.append('<h1 align=center>年間利用日数一覧</h1>');
      let today = moment().format('YYYY年MM月DD日');
      doc.append(`<div align=right>${today}</div>`);
      doc.append('<h4 class="f50">検索</h4>');
      doc.append(
        '<div><label>' +
          this.filterString.syukei.title +
          '</label>:' +
          this.filterString.syukei.ans[this.syukeiFlag] +
          '<label style="margin-left:30px;">' +
          this.filterString.kubun.title +
          '</label>:' +
          this.selUser +
          '</div>' +
          '<div><label>' +
          this.filterString.sort.title +
          '</label>:' +
          this.filterString.sort.ans[this.sorted] +
          '</div>'
      );
      let tbl =
        '<table style="border-collapse: collapse;border-spacing: 0;width:100%;" >';
      let flex = this.mainFlexGrid;
      // headers
      if (flex.headersVisibility & wjGrid.HeadersVisibility.Column) {
        tbl += '<thead >';

        for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
          // tbl += this._renderRow(flex.columnHeaders, r);
          let panel = flex.columnHeaders;
          let row = panel.rows[r];
          if (row.renderSize > 0) {
            tbl += '<tr style="height:30px;">';
            panel.columns.forEach((col, c) => {
              let content = panel.getCellData(r, c, true);
              if (!row.isContentHtml && !col.isContentHtml) {
                content = wjCore.escapeHtml(content);
              }
              let rowspan = 1,
                colspan = 1;
              if (r == 0) {
                if (c == 5) {
                  colspan = 9;
                } else if (c == 14) {
                  colspan = 3;
                }
              }
              if (c <= 4 || c >= 17) {
                rowspan = 2;
              }
              if (r == 0 && ((c >= 6 && c <= 13) || (c >= 15 && c <= 16))) {
                tbl += '';
              } else {
                if (r == 0 || (c >= 5 && c <= 16)) {
                  content = content.replace(/\n/g, '<br>');
                  tbl += `<td class='redcolor' style='border:1px solid;text-align:center;' colspan="${colspan}" rowspan="${rowspan}">${content}</td>`;
                }
              }
            });
            tbl += '</tr>';
          }
        }
        tbl += '</thead>';
      }

      tbl += '<tbody>';
      for (let r = 0; r < flex.rows.length; r++) {
        let panel = flex.cells;
        let row = panel.rows[r];
        if (row.renderSize > 0) {
          tbl += '<tr>';
          panel.columns.forEach((col, c) => {
            let content = panel.getCellData(r, c, true);
            if (!row.isContentHtml && !col.isContentHtml) {
              content = wjCore.escapeHtml(content);
              if (content < 0) {
                content = '';
              }
            }
            let align = 'left';
            if (c == 2) {
              align = 'center';
            }
            tbl += `<td style='border:1px solid;' align="${align}" >${content}</td>`;
          });
          tbl += '</tr>';
        }
      }
      tbl += '</tbody>';

      tbl += '</table>';
      doc.append(tbl);
      doc.print();
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      flexGrid.select(-1, -1);
      this.nendo = this.getChildYear();
      this.createHeader(flexGrid);
      this.createHeaderMerge(flexGrid);
      let uniqid = 1; // 現在は1のみapiが実行する
      let traceid = 123;
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        getkbn: 0,
        entpriid: 0,
        hokbn: 1,
        svcsyucode: 1,
        symd: '20220101',
        eymd: '20220101',
        syukeikbn: 1,
      };
      getConnect(this.$route.path, params).then((result) => {
        console.log(result);
        this.getData(result);
        this.settingFooterData(flexGrid, result);

        // フォーマット
        this.createSyukeiCellFormat(flexGrid);
      });
    },
    /**************
     * フォーマット
     */
    createSyukeiCellFormat(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        let classname = '';
        let text = e.cell.innerText;
        if (
          e.panel != flexGrid.columnHeaders &&
          e.panel != flexGrid.columnFooters
        ) {
          if (text == '-1') {
            text = '';
            e.cell.style.background = sysConst.COLOR.lightGray;
          } else {
            e.cell.style.background = sysConst.COLOR.lightYellow;
          }
          if (e.col == 1) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }

          if (
            tmpitem &&
            tmpitem['nissu_invisible_st'] &&
            tmpitem['nissu_invisible_st'] == e.col
          ) {
            e.cell.style.color = sysConst.COLOR.lightYellow;
          } else {
            e.cell.style.color = sysConst.COLOR.fontColor;

            if (
              tmpitem &&
              tmpitem['nissu_invisible_ed'] &&
              tmpitem['nissu_invisible_ed'] == e.col
            ) {
              e.cell.style.color = sysConst.COLOR.lightYellow;
            } else {
              e.cell.style.color = sysConst.COLOR.fontColor;
            }
          }
        }

        if (e.panel != flexGrid.columnHeaders) {
          if (e.col > 4) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
        }

        if (e.col == 3) {
          e.cell.style.borderRight = '1px solid ';
          e.cell.style.borderLeft = '1px solid ';
        }
        if (e.col == 4) {
          e.cell.style.borderRight = '1px solid ';
        }
        if (e.col == 17) {
          e.cell.style.borderLeft = '1px solid ';
        }

        e.cell.innerHTML =
          '<div class="' +
          classname +
          '">' +
          wjCore.escapeHtml(text) +
          '</div>';
      });
    },

    /***************
     * データ取得
     */
    getData(result) {
      this.nenkanRiyouNissuData = result.riyo_inf;
      this.allData = this.nenkanRiyouNissuData;
      this.nenkanRiyouNissuData = this.filtered();
    },
    settingFooterData(flexGrid, result) {
      var footerPanel = flexGrid.columnFooters;

      // 利用日数計
      let riyonissu = result.gokei_inf;
      let c = 5;
      for (let i = 4; i <= 12; i++) {
        let m = 'keinissu' + i;
        let value = riyonissu[m];
        footerPanel.setCellData(0, c, value);
        c++;
      }
      for (let i = 1; i <= 3; i++) {
        let m = 'keinissu' + i;
        let value = riyonissu[m];
        footerPanel.setCellData(0, c, value);
        c++;
      }
      footerPanel.setCellData(0, c++, riyonissu['keinissukei']);
      footerPanel.setCellData(0, c++, riyonissu['keiavg']);

      // 開所日数
      let kaisyonissu = result.kaisyo_inf;
      c = 5;
      for (let i = 4; i <= 12; i++) {
        let m = 'kainissu' + i;
        let value = kaisyonissu[m];
        footerPanel.setCellData(1, c, value);
        c++;
      }
      for (let i = 1; i <= 3; i++) {
        let m = 'kainissu' + i;
        let value = kaisyonissu[m];
        footerPanel.setCellData(1, c, value);
        c++;
      }
      footerPanel.setCellData(1, c++, kaisyonissu['kainissukei']);
      footerPanel.setCellData(1, c++, kaisyonissu['kaiavg']);
    },
    /************
     * ヘッダフッタ作成
     */
    // 親ヘッダからの年度データ
    parentSearch(searchArgument) {
      if (searchArgument.search_button) {
        this.nendo = searchArgument.defaultYear;
        var panel = this.mainFlexGrid.columnHeaders;
        panel.setCellData(0, 7, this.nendo + '年');
        panel.setCellData(0, 16, parseInt(this.nendo) + 1 + '年');
      }
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      var footerPanel = flexGrid.columnFooters;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.GroupRow());

      // 現在の年
      panel.setCellData(0, 0, 'コード');
      panel.setCellData(0, 1, '利用者名');
      panel.setCellData(0, 2, '障害\n支援\n区分');
      panel.setCellData(0, 3, '開始日');
      panel.setCellData(0, 4, '終了日');
      panel.setCellData(0, 5, this.nendo + '年');
      panel.setCellData(0, 14, parseInt(this.nendo) + 1 + '年');
      panel.setCellData(0, 17, '合計');
      panel.setCellData(0, 18, '平均');

      footerPanel.setCellData(0, 0, '利用日数 計');
      footerPanel.setCellData(1, 0, '開所日数');

      flexGrid.columnHeaders.rows[0].height = 30;
      flexGrid.columnHeaders.rows[1].height = 30;
      flexGrid.columnHeaders.rows[0].cssClassAll = 'middle';
      flexGrid.columnHeaders.rows[1].cssClassAll = 'middle';
    },
    createHeaderMerge(flexGrid) {
      let headerRanges = [];
      let footerRanges = [];
      headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 4),

        new wjGrid.CellRange(0, 5, 0, 13),
        new wjGrid.CellRange(0, 14, 0, 16),
        new wjGrid.CellRange(0, 17, 1, 17),
        new wjGrid.CellRange(0, 18, 1, 18),
      ];
      footerRanges = [
        new wjGrid.CellRange(0, 0, 0, 4),
        new wjGrid.CellRange(1, 0, 1, 4),
      ];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };

      flexGrid.mergeManager = mm;
    },
    /****************
     * 子の年度取得
     */
    getChildYear() {
      return this.$refs.childheader.getChildYear();
    },
    /**************
     * 絞り込み
     */
    filter(type) {
      this.syukeiFlag = type;
      for (let i = 0; i < this.nenkanRiyouNissuData.length; i++) {
        let st_m = '';
        if (this.nenkanRiyouNissuData[i].symd) {
          st_m = moment(this.nenkanRiyouNissuData[i].symd).format('M');
          st_m =
            st_m >= 4 && st_m <= 12 ? parseInt(st_m) + 2 : parseInt(st_m) + 14;
        }
        if (type == 0) {
          // 非表示にする列数を取得
          this.nenkanRiyouNissuData[i]['nissu_invisible_st'] = st_m;
        } else {
          this.nenkanRiyouNissuData[i]['nissu_invisible_st'] = '';
        }
        let st_e = '';
        if (this.nenkanRiyouNissuData[i].eymd) {
          st_e = moment(this.nenkanRiyouNissuData[i].eymd).format('M');
          st_e =
            st_e >= 4 && st_e <= 12 ? parseInt(st_e) + 2 : parseInt(st_e) + 14;
        }
        if (type == 0) {
          this.nenkanRiyouNissuData[i]['nissu_invisible_ed'] = st_e;
        } else {
          this.nenkanRiyouNissuData[i]['nissu_invisible_ed'] = '';
        }
      }

      this.mainFlexGrid.refresh();
    },
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (
          this.allData[i].syogaikbn == this.selectedSyogaiShien ||
          this.selectedSyogaiShien == 0
        ) {
          array.push(this.allData[i]);
        }
      }
      return this.$refs.alphabetButton.alphabetFilter(array, 'kana');
    },
    /******************
     * 障害支援区分
     */
    onSyogaisyaCombo(e) {
      this.selUser = e.selectedIndex;
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.selectedSyogaiShien = e.selectedIndex;
        this.nenkanRiyouNissuData = this.filtered();
      }
    },
    /**************
     * 並び順変更
     */
    sort(type) {
      let array = this.nenkanRiyouNissuData;
      // カナソート
      if (type == 1) {
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
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.riyocode < b.riyocode) {
            return -1;
          }
          if (a.riyocode > b.riyocode) {
            return 1;
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) {
            return -1;
          }
          if (a.jyukyuno > b.jyukyuno) {
            return 1;
          }
          return 0;
        });
      }
      this.mainFlexGrid.itemsSource = [];
      this.nenkanRiyouNissuData = array;
    },

    /************
     * アルファベットの絞り込み
     */
    onAlphabetical(key) {
      this.alphabetSelect = key;
      this.nenkanRiyouNissuData = this.filtered();
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#nyutaiin {
  font-size: 12px;
  font-family: 'メイリオ';
  .jijyougen-container {
    padding: 4px;
  }
  div#grid_nyutaiin {
    height: var(--height);
    max-width: 1280px;
  }
  .wj-flexgrid .wj-cell {
    font-size: 12px;
    font-weight: normal;
    padding: 0px;
    text-align: right;
    padding: 0px 4px 0px 4px;
    &:first-child {
      text-align: center;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
  }
  .wj-cells {
    .wj-row:last-child {
      .wj-cell {
        border-bottom: none !important;
      }
    }
  }

  .wj-colfooters {
    border-top: 1px solid $border_color;
  }
  .container {
    padding: 4px;
    margin-top: 16px;
  }
  label {
    &.serach {
      display: inline-block;
      font-weight: 700;
      width: 120px;
      margin-top: 5px;
    }
  }
  .w-100 {
    width: 100%;
  }

  .user-info {
    label:not(.errorlabel) {
      min-width: 120px;
    }
  }
  .wj-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
div.customCombobox {
  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
  &:hover {
    background-color: #e1e1e1;
  }
  &:focus {
    background-color: #fff;
  }
}

.redcolor {
  background-color: red !important;
  color: green;
  font-weight: bold;
}
.f50 {
  font-size: 50px !important;
}
</style>
