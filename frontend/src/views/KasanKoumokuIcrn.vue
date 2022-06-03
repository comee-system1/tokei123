<template>
  <div id="KasanKoumokuIcrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="mt-0" no-gutters>
        <label>利用者</label>
        <wj-menu
          id="comboFilters1"
          class="combo"
          :itemsSource="userSelList"
          :initialized="initComboFilters"
          :isRequired="true"
          style="width: 270px"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selUser"
          :itemClicked="onUserClicked"
        >
        </wj-menu>
        <label class="ml-1">加算</label>
        <wj-menu
          id="comboFilters2"
          class="combo"
          :itemsSource="kasanList"
          :initialized="initComboFilters"
          :isRequired="true"
          style="width: 270px"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selKasan"
          :itemClicked="onKasanClicked"
        >
        </wj-menu>
        <v-btn
          class="ml-1"
          style="width: 20px; height: 30px"
          @click="searchClicked"
        >
          検索
        </v-btn>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <label>ソート</label>
        <v-btn-toggle class="flex-wrap" v-model="sortSearch" mandatory>
          <v-btn
            v-for="n in sortSelList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="sortUser(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <v-btn-toggle class="flex-wrap" v-model="alphaSearch" mandatory>
          <v-btn
            small
            outlined
            v-for="(n, k) in alphabet"
            :key="n"
            :width="30"
            p-0
            style="min-width: auto"
            @click="onAlphabet(k)"
          >
            {{ n }}
          </v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <label class="labelhosoku"> 上段：回数 下段：単位数 </label>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="mt-0" no-gutters>
        <wj-flex-grid
          id="kasanKoumokuIcrnGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'None'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializekasanKoumokuIcrnGrid"
          :formatItem="onFormatItem"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
        >
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import HeaderServices from '../components/HeaderServices.vue';
import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';

const keySort = ls.KEY.Sort;
const keyAlp = ls.KEY.Alphabet;
const keyKasan = ls.KEY.Kasan;
const styleDefault = '';
const styleNormal = 'normal';
const bgClrSelKasan = sysConst.COLOR.gridHeaderRemarkBackground;
const bgClrSelKasanData = sysConst.COLOR.gridRemarkBackground;
const bgClrTotal = sysConst.COLOR.gridTotalBackground;
const boderSolid = '1px solid';
const alignRight = 'right';
const writingModeTategeki = 'vertical-rl';
const fmtYen = sysConst.FORMAT.Num;
const fmtYmd = sysConst.FORMAT.Ymd;
const nisuTitle = '日数';
const taiseiTitle = '施設体制加算';
const kobetuTitle = '個別加算';
const totalTitle = '合計';
const totalNinzuTitle = '人数';
const totalTaniTitle = '単位数';
let alphabet = [
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
  components: {
    HeaderServices,
  },
  data() {
    return {
      alphabet: alphabet,
      errorcnt: '',
      sortSearch: 0,
      alphaSearch: 0,
      selKasan: 0,
      headerList: [
        {
          dataname: 'err',
          title: 'レセ確定',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'name',
          title: '氏名',
          width: 200,
          align: 'left',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'useymd',
          title: '利用日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'nyuinymd',
          title: '入院日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'gaihakuymd',
          title: '外泊日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
      ],
      selUser: 0,
      userSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月入所者' },
        { val: 2, name: '今月退所者' },
      ],
      kasanList: this.loadKasan(),
      sortSelList: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
        { val: 2, name: '受給者番号' },
      ],
      viewdataAll: [],
      viewdata: [],
      serviceArgument: '', // ヘッダメニューのサービス選択
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(keySort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(keyAlp));
    });
  },
  methods: {
    initComboFilters(combo) {
      if (combo.hostElement.id == 'comboFilters1') {
        combo.header = this.userSelList[0].name;
      } else if (combo.hostElement.id == 'comboFilters2') {
        this.selKasan = Number(ls.getlocalStorageEncript(keyKasan));
        let index = this.kasanList.findIndex(
          (element) => element.val == this.selKasan
        );
        if (index >= 0) {
          combo.header = this.kasanList[index].name;
        } else {
          combo.header = this.kasanList[0].name;
        }
      }
    },
    onUserClicked(s) {
      s.header = this.userSelList[s.selectedIndex].name;
      this.selUser = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    onKasanClicked(s) {
      ls.setlocalStorageEncript(keyKasan, s.selectedValue);
      s.header = this.kasanList[s.selectedIndex].name;
      this.selKasan = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    loadKasan() {
      return [
        { val: 0, kbn: 0, name: '指定なし' },
        { val: 1, kbn: 1, name: '夜間職員配置体制加算' },
        { val: 2, kbn: 1, name: '重度障害者支援加算Ⅰ' },
        { val: 3, kbn: 1, name: '夜間看護体制加算' },
        { val: 4, kbn: 1, name: '視覚・聴覚等支援体制加算' },
        { val: 5, kbn: 1, name: '地域生活移行個別支援加算' },
        { val: 6, kbn: 1, name: '口腔衛生管理体制加算' },
        { val: 7, kbn: 1, name: '処遇改善加算Ⅰ' },
        { val: 8, kbn: 1, name: '処遇改善特別加算' },
        { val: 9, kbn: 1, name: '特定処遇改善加算' },
        { val: 10, kbn: 2, name: '入所時特別支援加算' },
        { val: 11, kbn: 2, name: '入院・外泊時加算Ⅰ' },
        { val: 12, kbn: 2, name: '入院・外泊時加算Ⅱ' },
        { val: 13, kbn: 2, name: '経口維持加算Ⅰ' },
        { val: 14, kbn: 2, name: '口腔衛生管理加算' },
        { val: 15, kbn: 2, name: '栄養マネジメント加算' },
      ];
    },
    onInitializekasanKoumokuIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.frozenColumns = 5;
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = 100;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      flexGrid.endUpdate();
    },

    onItemsSourceChanging(flexGrid) {
      if (this.viewdata == null || this.viewdata.length == 0) {
        for (let colIndex = 5; colIndex < flexGrid.columns.length; colIndex++) {
          flexGrid.columnFooters.setCellData(0, colIndex, '');
          flexGrid.columnFooters.setCellData(1, colIndex, '');
        }
        return;
      }
      flexGrid.beginUpdate();
      let newheadList = this.headerList.concat();

      for (let i = 0; i < this.kasanList.length; i++) {
        if (this.kasanList[i].val == 0) {
          continue;
        }
        newheadList.push({
          dataname: String(this.kasanList[i].val),
          title: this.kasanList[i].name,
          width: 60,
          align: alignRight,
          kasankbn: this.kasanList[i].kbn,
          kasanval: this.kasanList[i].val,
        });
      }
      flexGrid.columns.clear();
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < newheadList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = newheadList[colIndex].dataname;
        col.header = newheadList[colIndex].title;
        col.width = newheadList[colIndex].width;
        col.align = newheadList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex == 0) {
          col.cssClass = 'cell-img';
          col.cellTemplate = CellMaker.makeImage();
        } else {
          col.cssClass = '';
          col.cellTemplate = '';
        }

        if (colIndex == 10 || colIndex == 14) {
          col.format = fmtYen;
        } else if (colIndex == 3) {
          col.format = fmtYmd;
        } else {
          col.format = '';
        }
        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = '';
          if (rowindex == 0 && 2 <= colIndex && colIndex <= 4) {
            title = nisuTitle;
          } else if (rowindex == 0 && 5 <= colIndex) {
            if (newheadList[colIndex].kasankbn == 1) {
              title = taiseiTitle;
            } else if (newheadList[colIndex].kasankbn == 2) {
              title = kobetuTitle;
            }
          } else {
            title = newheadList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }
      let kasancnt = this.kasanList.filter((x) => x.kbn == 1).length - 1;
      // セル結合
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 0, 4),
        new wjGrid.CellRange(0, 5, 0, 5 + kasancnt),
        new wjGrid.CellRange(
          0,
          5 + kasancnt + 1,
          0,
          flexGrid.columns.length - 1
        ),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0, 0, 1, 1),
        new wjGrid.CellRange(0, 2, 0, 4),
        new wjGrid.CellRange(1, 2, 1, 4),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let f = 0; f < footerRanges.length; f++) {
            if (footerRanges[f].contains(r, c)) {
              return footerRanges[f];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
      flexGrid.columnFooters.setCellData(0, 0, totalTitle);
      flexGrid.columnFooters.setCellData(0, 2, totalNinzuTitle);
      flexGrid.columnFooters.setCellData(1, 2, totalTaniTitle);
      this.viewdata.forEach(function (val) {
        console.log(val[flexGrid.columns[5].binding]);
      });
      if (this.viewdata.length > 0) {
        // 合計設定
        for (let colIndex = 5; colIndex < flexGrid.columns.length; colIndex++) {
          flexGrid.columnFooters.setCellData(
            0,
            colIndex,
            this.viewdata.filter(
              (x) => x.kbn == 1 || x.val == flexGrid.columns[colIndex].binding
            ).length
          );
          flexGrid.columnFooters.setCellData(
            1,
            colIndex,
            this.viewdata
              .filter((x) => x.kbn == 2)
              .reduce((prev, item) => {
                return prev + item[flexGrid.columns[colIndex].binding];
              }, 0)
          );
        }
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onFormatItem(flexGrid, e) {
      flexGrid.beginUpdate();
      e.cell.style.writingMode = styleDefault;
      e.cell.style.textAlign = styleDefault;
      e.cell.style.fontWeight = styleDefault;
      e.cell.style.justifyContent = styleDefault;
      e.cell.style.alignItems = styleDefault;
      e.cell.style.borderRight = styleDefault;
      e.cell.style.borderBottom = styleDefault;
      e.cell.style.borderTop = styleDefault;
      e.cell.style.backgroundColor = styleDefault;

      if (
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 2) ||
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 5) ||
        (e.panel == flexGrid.columnFooters && e.col == 2) ||
        4 == e.col ||
        (4 < e.col &&
          e.col < flexGrid.columns.length - 1 &&
          flexGrid.columnHeaders.getCellData(0, e.col, false) !=
            flexGrid.columnHeaders.getCellData(0, e.col + 1, false))
      ) {
        e.cell.style.borderRight = boderSolid;
      }
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col == 0 || (e.row == 1 && 2 <= e.col)) {
          // 縦書きで右から左へ
          e.cell.style.writingMode = writingModeTategeki;
        }
      } else if (e.panel == flexGrid.cells) {
        if (e.row == flexGrid.rows.length - 1) {
          e.cell.style.borderBottom = 0;
        } else {
          let tmpitem = e.panel.rows[e.row].dataItem;
          if (tmpitem.kbn == 1) {
            if (e.col <= 4) {
              e.cell.style.borderBottom = 0;
            }
          } else {
            e.cell.style.borderBottom = boderSolid;
          }
        }
      } else if (e.panel == flexGrid.columnFooters) {
        if (e.row == 0) {
          e.cell.style.borderTop = boderSolid;
        }
        if (5 <= e.col) {
          e.cell.style.fontWeight = styleNormal;
          e.cell.style.textAlign = alignRight;
          e.cell.style.justifyContent = alignRight;
          e.cell.style.alignItems = alignRight;
        }
        e.cell.style.backgroundColor = bgClrTotal;
      }
      // 加算絞込の場合は背景色を変える
      if (
        e.panel == flexGrid.columnHeaders ||
        e.panel == flexGrid.cells ||
        e.panel == flexGrid.columnFooters
      ) {
        if (!(e.panel == flexGrid.columnHeaders && e.row == 0)) {
          if (flexGrid.columns[e.col].binding == String(this.selKasan)) {
            if (
              e.panel == flexGrid.columnHeaders ||
              e.panel == flexGrid.columnFooters
            ) {
              e.cell.style.backgroundColor = bgClrSelKasan;
            } else {
              e.cell.style.backgroundColor = bgClrSelKasanData;
            }
          }
        }
      }
      flexGrid.endUpdate();
    },
    searchClicked() {
      // 初期データ読込
      this.viewdataAll = this.loadData();
      this.userFilter();
    },
    loadData() {
      let tmpviewdata = [];
      let userCount = 100;
      // ★Date型はmonthが0-11で表現されることに注意
      let kankaku = true;
      for (let i = 0; i < userCount; i++) {
        if (i % 2 == 0) {
          tmpviewdata.push({
            id: i,
            no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
              10,
              '0'
            ),
            err: require('@/assets/kaku_15px.png'),
            name: '東経太郎' + i,
            kana: 'トウケイタロウ' + i,
            useymd: String(99),
            nyuinymd: String(99),
            gaihakuymd: String(99),
            kbn: 1,
            isNyusyo: false,
            isTaisyo: false,
          });
          if (kankaku) {
            tmpviewdata[i].err = require('@/assets/kaku_15px.png');
            kankaku = false;
          } else {
            tmpviewdata[i].err = '';
            kankaku = true;
          }
          if (i < 10) {
            tmpviewdata[i].isNyusyo = true;
          } else if (i < 20) {
            tmpviewdata[i].isTaisyo = true;
          }
        } else {
          tmpviewdata.push({
            id: i - 1,
            no: tmpviewdata[i - 1].no,
            name: '(' + tmpviewdata[i - 1].no + ')',
            kana: tmpviewdata[i - 1].kana,
            useymd: '',
            nyuinymd: '',
            gaihakuymd: '',
            kbn: 2,
            isNyusyo: tmpviewdata[i - 1].isNyusyo,
            isTaisyo: tmpviewdata[i - 1].isTaisyo,
          });
        }

        // 動的に加算のプロパティを作成
        for (let kasan = 0; kasan < this.kasanList.length; kasan++) {
          if (this.kasanList[kasan].val == 0) {
            continue;
          }
          if (i % 2 == 0) {
            this.$set(
              tmpviewdata[i],
              String(this.kasanList[kasan].val),
              Number(Math.floor(Math.random() * 100))
            );
          } else {
            this.$set(
              tmpviewdata[i],
              String(this.kasanList[kasan].val),
              Number(Math.floor(Math.random() * 10000))
            );
          }
        }
      }
      return tmpviewdata;
    },

    sortUser(sortType) {
      ls.setlocalStorageEncript(keySort, sortType);
      this.sortSearch = sortType;
      this.userFilter();
    },
    onAlphabet(key) {
      ls.setlocalStorageEncript(keyAlp, Number(key));
      this.alphaSearch = Number(key);
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = [];
      let alpval = this.alphaSearch;
      if (alpval > 0) {
        this.viewdataAll.forEach(function (value) {
          switch (alpval) {
            case 1:
              if (value.kana.match(/^[ア-オ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 2:
              if (value.kana.match(/^[カ-コ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 3:
              if (value.kana.match(/^[サ-ソ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 4:
              if (value.kana.match(/^[タ-ト]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 5:
              if (value.kana.match(/^[ナ-ノ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 6:
              if (value.kana.match(/^[ハ-ホ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 7:
              if (value.kana.match(/^[マ-モ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 8:
              if (value.kana.match(/^[ヤ-ヨ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 9:
              if (value.kana.match(/^[ラ-ロ]/)) {
                tmpviewdata.push(value);
              }
              break;
            case 10:
              if (value.kana.match(/^[ワ-ン]/)) {
                tmpviewdata.push(value);
              }
              break;
          }
        });
      } else {
        tmpviewdata = this.viewdataAll.concat();
      }

      // 絞込１
      if (this.selUser == 1) {
        // 今月入所
        tmpviewdata = tmpviewdata.filter((x) => x.isNyusyo);
      } else if (this.selUser == 2) {
        // 今月退所
        tmpviewdata = tmpviewdata.filter((x) => x.isTaisyo);
      }

      //コード順でソート
      if (this.sortSearch == 0) {
        tmpviewdata.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      //利用者名でソート
      if (this.sortSearch == 1) {
        tmpviewdata.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      //受給者番号でソート
      if (this.sortSearch == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.no < b.no) {
            return -1;
          }
          if (a.no > b.no) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      this.viewdata = tmpviewdata;
    },
    //ヘッダメニューのサービス初回選択 検索ボタン
    parentServiceSelect(serviceArgument) {
      console.log(serviceArgument);
      this.viewdataAll = [];
      this.viewdata = [];
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#KasanKoumokuIcrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  div#comboFilters1,
  div#comboFilters2 {
    .wj-btn.wj-btn-default {
      border-left: none;
    }
  }
  .combo:hover {
    background-color: #e1e1e1;
  }

  .combo:focus {
    background-color: #fff;
  }

  #comboFilters1_dropdown,
  #comboFilters2_dropdown {
    .wj-listbox-item {
      background-color: $white !important;
      padding: 30px;
    }
  }

  .user-info {
    width: auto;
    padding: 4px;
    label:not(.labelhosoku) {
      display: inline-block;
      // margin-top: 2px;
      margin-right: 2px;
      padding-top: 2px;
      background: $view_Title_background;
      border: none;
      height: 27px;
      width: 60px;
      text-align: center;
    }
  }
  .labelhosoku {
    font-weight: normal;
  }

  .siborikomi-info,
  .sort-info {
    position: relative;
    display: inline-block;
    border: 1px solid lightgray;
    width: 350px;
    border-radius: 10px;

    .wj-labeled-input {
      font-size: 14px;
      position: relative;
      display: inline-block;
      width: 120px;
      height: auto;
      max-width: 100%;
      margin: 0 15px 0 0px;
      padding: 5px 0;

      input[type='radio'] + label {
        color: black;
      }
      input[type='radio']:checked + label {
        color: blue;
        font-weight: bold;
      }
    }
  }
  div.border-bottom {
    border-bottom: 1px solid red;
    width: 200px;
    label {
      font-size: 0.85em;
    }
  }
  #kasanKoumokuIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 98vw;
    min-width: 1300px;
    height: 63vh;
    // max-width: 100%;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    .wj-cell {
      padding: 2px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
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
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: $light-gray;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: $brawn;
      border-radius: 0px;
    }
  }

  .v-btn-toggle > .v-btn {
    width: 90px;
  }
}
</style>
