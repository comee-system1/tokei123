<template>
  <div id="jyukyuicrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-col>
        <v-row>
          <v-col cols="3">
            <label>利用者</label>
            <v-btn-toggle class="mt-0 flex-wrap" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(1)"
              >
                全員
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(2)"
              >
                ＊＊＊＊＊
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(3)"
              >
                ＊＊＊＊＊
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="3">
            <label>絞込</label>
            <v-btn-toggle class="mt-0 flex-wrap" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(1)"
              >
                全員
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(2)"
              >
                未入力
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="siborikomiUser(3)"
              >
                期限切れ
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="*" class="mt-2 mr-2">
            <v-row justify="end">
              <v-btn>受給者証修正</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="3">
            <label>ソート</label>
            <!-- mandatoryは初期選択 -->
            <v-btn-toggle class="mt-0 flex-wrap" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="sortUser(1)"
              >
                コード
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="sortUser(2)"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                :width="btnwidth"
                @click="sortUser(3)"
              >
                受給者番号
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="*">
            <v-btn-toggle class="flex-wrap" mandatory>
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
          </v-col>
          <v-col cols="2" class="mr-2">
            <v-row class="border-bottom" justify="end">
              <v-col class="pa-2" cols="4"
                ><label>
                  <font color="red"><b>エラー</b></font>
                </label>
              </v-col>
              <v-col class="pa-2" cols="*">
                <span>{{ errCnt }} 人 / {{ viewdata.length }} 人中</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col class="mr-2">
            <wj-flex-grid
              id="detailGrid"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'AllHeaders'"
              :allowResizing="false"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Row'"
              :isReadOnly="true"
              :initialized="onInitializeDetailGrid"
              :formatItem="onFormatItem"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewdata"
            >
              <wj-flex-grid-column
                v-for="column in headerList"
                :key="column.item"
                cssClass="cell-img"
                :cellTemplate="tplImage"
              />
            </wj-flex-grid>
          </v-col>
        </v-row>
      </v-col>
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

let sortSearch = '1';
let alphaSearch = '0';
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
  data: function () {
    return {
      alphabet: alphabet,
      myradio01: '1',
      errorcnt: '999',
      btnwidth: 80,
      headerList: [
        { dataname: 'err', title: 'エ\nラ\n|', width: '1.5*', align: 'center' },
        {
          dataname: 'no',
          title: '受給者証\n番号',
          width: '4*',
          align: 'center',
        },
        { dataname: 'name', title: '氏名', width: '7*', align: 'left' },
        {
          dataname: 'koufuymd',
          title: '交付日',
          width: '3.5*',
          align: 'center',
        },
        { dataname: 'engo', title: '援護者', width: '4*', align: 'left' },
        {
          dataname: 'jitibangou',
          title: '助成自治体\n番号',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'jyukyukbn',
          title: '受給者\n区分',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'jyukyuname',
          title: '受給者氏名',
          width: '6.5*',
          align: 'left',
        },
        {
          dataname: 'syougaisyu',
          title: '障害種別',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'syougaisienkbn',
          title: '障害\n支援\n区分',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'futanjyougen',
          title: '利用者負担\n上限月額',
          width: '3*',
          align: 'right',
        },
        {
          dataname: 'jyougenkanri',
          title: '上限額\n管理事業所',
          width: '6.5*',
          align: 'left',
        },
        {
          dataname: 'syokujiteikyo',
          title: '食事\n提供\n体制',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'tokubetukyufu',
          title: '特別\n給付費',
          width: '2.5*',
          align: 'right',
        },
        { dataname: 'syusei', title: '修正', width: '2*', align: 'center' },
      ],
      tplImage: CellMaker.makeImage(),
      viewdataAll: [],
      viewdata: [],
    };
  },
  computed: {
    errCnt: function () {
      return this.viewdata.filter(function (value) {
        return value.syusei.length > 0;
      }).length;
    },
  },
  methods: {
    onInitializeDetailGrid: function (flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].height = 60;

      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < 15; colIndex++) {
        let col = flexGrid.columns[colIndex];

        // if (colIndex <= 2) {
        //   col.allowMerging = true;
        // } else {
        //   col.allowMerging = false;
        // }

        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex > 0) {
          col.cssClass = '';
          col.cellTemplate = '';
        }

        if (colIndex == 10 || colIndex == 13) {
          col.format = 'n0';
        } else if (colIndex == 3) {
          col.format = 'gyy/MM/dd';
        } else {
          col.format = '';
        }

        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = '';
          if (1 <= colIndex && colIndex <= 13 && rowindex == 0) {
            title = '受給者情報';
          } else if (10 <= colIndex && colIndex <= 13 && rowindex == 1) {
            title = '利用者負担';
          } else {
            title = this.headerList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }
      // 初期データ読込
      this.viewdataAll = this.loadData();
      this.viewdata = this.viewdataAll;
    },
    onFormatItem(flexGird, e) {
      if (e.panel == flexGird.columnHeaders) {
        if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
          // css に scopedをつけると以下のように個別に設定が必要
          // e.cell.style.textAlign = 'center';
          // ヘッダのみ小さくする
          // e.cell.style.fontSize = '12px';
          // e.cell.style.justifyContent = 'center';
        }
      } else {
        if (
          e.col == 3 ||
          e.col == 4 ||
          e.col == 5 ||
          e.col == 8 ||
          e.col == 9 ||
          e.col == 10 ||
          e.col == 11 ||
          e.col == 13
        ) {
          let tmpitem = e.panel.rows[e.row].dataItem;
          if (tmpitem != null) {
            if (
              (e.col == 3 && tmpitem.koufuymd.length == 0) ||
              (e.col == 4 && tmpitem.engo.length == 0) ||
              (e.col == 5 && tmpitem.jitibangou.length == 0) ||
              (e.col == 8 && tmpitem.syougaisyu.length == 0) ||
              (e.col == 9 && tmpitem.syougaisienkbn.length == 0) ||
              (e.col == 10 && tmpitem.futanjyougen.length == 0) ||
              (e.col == 11 && tmpitem.jyougenkanri.length == 0) ||
              (e.col == 13 && tmpitem.tokubetukyufu.length == 0)
            ) {
              e.cell.style.backgroundColor = 'mistyrose';
            } else {
              e.cell.style.backgroundColor = 'white';
            }
          }
        }
      }
    },
    // onItemsSourceChanged(flexGird) {
    //   let tmpitem;
    //   flexGird.rows.forEach(function (row) {
    //     tmpitem = row.dataItem.name;
    //     if (tmpitem.syusei.length > 0) {
    //     }
    //   });
    // },
    loadData: function () {
      let tmpviewdata = [];
      let userCount = 100;
      // ★Date型はmonthが(0-11で表現されることに注意)
      for (let i = 0; i < userCount; i++) {
        tmpviewdata.push({
          id: i,
          err: require('@/assets/error_20px.png'),
          no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
            10,
            '0'
          ),
          name: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          koufuymd: new Date('2022', Number('09') - 1, '26'),
          engo: '第一東経市',
          jitibangou: String('9000' + Math.floor(Math.random() * 10) + 1),
          jyukyukbn: '0',
          jyukyuname: '受給者名太郎 ' + Math.floor(Math.random() * 10) + 1,
          syougaisyu: '2',
          syougaisienkbn: '3',
          futanjyougen: Number(Math.floor(Math.random() * 100) + '000'),
          jyougenkanri:
            '上限管理事業所　 ' + Math.floor(Math.random() * 10) + 1,
          syokujiteikyo: '4',
          tokubetukyufu: Number(Math.floor(Math.random() * 10) + '000'),
          syusei: '○',
        });
        if (i % 2 == 1) {
          tmpviewdata[i].err = '';
          tmpviewdata[i].syusei = '';
        } else {
          if (i == 4) {
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].err = tmpviewdata[i - 1].err;
            tmpviewdata[i].no = tmpviewdata[i - 1].no;
            tmpviewdata[i].name = tmpviewdata[i - 1].name;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
          }

          tmpviewdata[i].syougaisyu = '';
          tmpviewdata[i].syougaisienkbn = '';
          tmpviewdata[i].futanjyougen = '';
          tmpviewdata[i].jyougenkanri = '';
          tmpviewdata[i].syokujiteikyo = '';
          tmpviewdata[i].tokubetukyufu = '';
        }
      }
      return tmpviewdata;
    },
    sortUser: function (sortType) {
      sortSearch = sortType;
      this.userFilter();
    },
    onAlphabet: function (key) {
      alphaSearch = key;
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = [];
      if (alphaSearch > 0) {
        this.viewdataAll.forEach(function (value) {
          switch (alphaSearch) {
            case 1:
              if (value.kana.match(/^[ア-オ]/)) tmpviewdata.push(value);
              break;
            case 2:
              if (value.kana.match(/^[カ-コ]/)) tmpviewdata.push(value);
              break;
            case 3:
              if (value.kana.match(/^[サ-ソ]/)) tmpviewdata.push(value);
              break;
            case 4:
              if (value.kana.match(/^[タ-ト]/)) tmpviewdata.push(value);
              break;
            case 5:
              if (value.kana.match(/^[ナ-ノ]/)) tmpviewdata.push(value);
              break;
            case 6:
              if (value.kana.match(/^[ハ-ホ]/)) tmpviewdata.push(value);
              break;
            case 7:
              if (value.kana.match(/^[マ-モ]/)) tmpviewdata.push(value);
              break;
            case 8:
              if (value.kana.match(/^[ヤ-ヨ]/)) tmpviewdata.push(value);
              break;
            case 9:
              if (value.kana.match(/^[ラ-ロ]/)) tmpviewdata.push(value);
              break;
            case 10:
              if (value.kana.match(/^[ワ-ン]/)) tmpviewdata.push(value);
              break;
          }
        });
      } else {
        tmpviewdata = this.viewdataAll.concat();
      }
      //コード順でソート
      if (sortSearch == 1) {
        tmpviewdata.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      }
      //利用者名でソート
      if (sortSearch == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          return 0;
        });
      }
      //受給者番号でソート
      if (sortSearch == 3) {
        tmpviewdata.sort((a, b) => {
          if (a.no < b.no) return -1;
          if (a.no > b.no) return 1;
          return 0;
        });
      }
      this.viewdata = tmpviewdata;
    },
  },
};
</script>

<style  lang="scss">
div#jyukyuicrn {
  font-size: 14px;
  font-family: 'メイリオ';
  overflow-x: scroll;
  width: 1366px !important;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .user-info {
    // padding-top: 20px;
    // margin: 5px;
    padding: 5px;
    font-size: 14px;
    label {
      // margin-left: 10px;
      margin-right: 10px;
      padding-top: 10px;
      font-weight: bold;
    }
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
      width: 90px;
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
    label {
      font-size: 0.85em;
    }
  }
  #detailGrid {
    font-size: 14px;
    width: auto;
    height: 70vh;
    max-width: 100%;
    .wj-header {
      text-align: center;
      font-size: 12px;
    }
    .cell-img {
      width: 5px;
      height: 5px;
    }
    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
      transition: all 0.5s;
      background: #ccffcc !important;
    }

    .wj-cells .wj-cell.wj-state-multi-selected {
      background: #80adbf !important;
      color: #fff !important;
    }

    .wj-cells .wj-cell.wj-state-selected {
      background: #80adbf !important;
      color: #fff !important;
    }
  }
  /* css for hovering on non-header rows */

  v-btn {
    width: 80px;
  }
}
</style>
