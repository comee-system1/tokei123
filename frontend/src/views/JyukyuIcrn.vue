<template>
  <div id="jyukyuicrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="mt-0">
        <v-col cols="4" class="pt-1">
          <label>利用者</label>
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              v-for="n in userSelList"
              :key="n"
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="siborikomiUser(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="4" class="pt-1">
          <label>絞込</label>
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              v-for="n in siborikomiSelList"
              :key="n"
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="siborikomiUser2(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="*" class="mt-2 mr-2 pt-1">
          <v-row justify="end">
            <v-btn>受給者証修正</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="4" xl="3" class="pt-1">
          <label>ソート</label>
          <!-- mandatoryは初期選択 -->
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              v-for="n in sortSelList"
              :key="n"
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="sortUser(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="*" class="pt-3 pb-1">
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
        <v-col cols="2" class="pt-3">
          <v-row class="border-bottom">
            <v-col class="pa-2" cols="4">
              <label>
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
        <v-col>
          <wj-flex-grid
            id="jyukyuIcrnGrid"
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
            :initialized="onInitializejyukyuIcrnGrid"
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

const strMaru = '○';
const bgClrInput = 'white';
const bgClrError = 'mistyrose';
const fmtYen = 'n0';
const fmtYmd = 'gyy/MM/dd';
const daiTitle = '受給者証情報';
const chuTitle = '利用者負担';
// const currentDate = new Date();
let siborikomiSearch = '1';
let siborikomiSearch2 = '1';
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
      errorcnt: '',
      btnwidth: 120,
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
        { dataname: 'engo', title: '援護者', width: '3.5*', align: 'left' },
        {
          dataname: 'jitibangou',
          title: '助成自治\n体番号',
          width: '2.5*',
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
          width: '7*',
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
          width: '7*',
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
        { dataname: 'syusei', title: '修正', width: '1.5*', align: 'center' },
      ],
      userSelList: [
        { val: 1, name: '全員' },
        { val: 2, name: '今月入所者' },
        { val: 3, name: '今月退所者' },
      ],
      siborikomiSelList: [
        { val: 1, name: '全員' },
        { val: 2, name: '未入力' },
        { val: 3, name: '期限切れ' },
      ],
      sortSelList: [
        { val: 1, name: 'コード' },
        { val: 2, name: 'カナ' },
        { val: 3, name: '受給者番号' },
      ],
      tplImage: CellMaker.makeImage(),
      viewdataAll: [],
      viewdata: [],
    };
  },
  computed: {
    errCnt: function () {
      return this.viewdata.filter(
        (x) =>
          !x.koufuymd ||
          !x.engo ||
          !x.jitibangou ||
          !x.jyukyukbn ||
          !x.jyukyuname ||
          !x.syougaisyu ||
          !x.syougaisienkbn ||
          !x.futanjyougen ||
          !x.jyougenkanri ||
          !x.syokujiteikyo ||
          !x.tokubetukyufu
      ).length;
    },
  },
  methods: {
    onInitializejyukyuIcrnGrid: function (flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (
          ht.panel == flexGrid.cells &&
          ht.col == flexGrid.columns.length - 1
        ) {
          if (ht.panel.getCellData(ht.row, ht.col) == strMaru) {
            ht.panel.setCellData(ht.row, ht.col, '');
          } else {
            ht.panel.setCellData(ht.row, ht.col, strMaru);
          }
        }
      });

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
          col.format = fmtYen;
        } else if (colIndex == 3) {
          col.format = fmtYmd;
        } else {
          col.format = '';
        }

        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = '';
          if (1 <= colIndex && colIndex <= 13 && rowindex == 0) {
            title = daiTitle;
          } else if (10 <= colIndex && colIndex <= 13 && rowindex == 1) {
            title = chuTitle;
          } else {
            title = this.headerList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }

      // 初期データ読込
      this.viewdataAll = this.loadData();
      this.viewdata = this.viewdataAll;
      flexGrid.endUpdate();
    },
    onFormatItem(flexGrid, e) {
      if (e.panel == flexGrid.columnHeaders) {
        if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
          // css に scopedをつけると以下のように個別に設定が必要
          // e.cell.style.textAlign = 'center';
          // ヘッダのみ小さくする
          // e.cell.style.fontSize = '12px';
          // e.cell.style.justifyContent = 'center';
        }
      } else {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = '';
          e.cell.style.borderBottom = '';

          if (e.col == flexGrid.columns.length - 1) {
            e.cell.style.backgroundColor = bgClrInput;
          } else if (
            (e.col == 3 && !tmpitem.koufuymd) ||
            (e.col == 4 && !tmpitem.engo) ||
            (e.col == 5 && !tmpitem.jitibangou) ||
            (e.col == 6 && !tmpitem.jyukyukbn) ||
            (e.col == 7 && !tmpitem.jyukyuname) ||
            (e.col == 8 && !tmpitem.syougaisyu) ||
            (e.col == 9 && !tmpitem.syougaisienkbn) ||
            (e.col == 10 && !tmpitem.futanjyougen) ||
            (e.col == 11 && !tmpitem.jyougenkanri) ||
            (e.col == 12 && !tmpitem.syokujiteikyo) ||
            (e.col == 13 && !tmpitem.tokubetukyufu)
          ) {
            e.cell.style.backgroundColor = bgClrError;
          }

          // 仮想マージ
          // 上の行と同じ利用者の場合は空で表示する
          if (e.row >= 3 && 0 < e.col && e.col <= 2) {
            let tmpPreitem = e.panel.rows[e.row - 1].dataItem;
            if (tmpPreitem != null && tmpitem.id == tmpPreitem.id) {
              e.panel.setCellData(e.row, e.col, '');
            } else {
              if (e.col == 1) {
                e.panel.setCellData(e.row, e.col, tmpitem.nobk, true);
              } else if (e.col == 2) {
                e.panel.setCellData(e.row, e.col, tmpitem.name);
              }
            }
          }
          // 下の行と同じ利用者の場合は下線を非表示化
          if (
            e.row > 2 &&
            e.row < flexGrid.rows.length - 2 &&
            0 < e.col &&
            e.col <= 2
          ) {
            let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
            if (tmpNextitem != null && tmpitem.id == tmpNextitem.id) {
              e.cell.style.borderBottom = 0;
            }
          }
          flexGrid.endUpdate();
        }
      }
    },
    loadData: function () {
      let tmpviewdata = [];
      let userCount = 100;
      // ★Date型はmonthが0-11で表現されることに注意
      for (let i = 0; i < userCount; i++) {
        tmpviewdata.push({
          id: i,
          err: '',
          no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
            10,
            '0'
          ),
          nobk: 0,
          name: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          koufuymd: new Date('2015', Number('04') - 1, '26'),
          engo: '第一東経市',
          jitibangou: String('9000' + Math.floor(Math.random() * 10) + 1),
          jyukyukbn: '1',
          jyukyuname: '受給者名太郎 ' + Math.floor(Math.random() * 10) + 1,
          syougaisyu: '2',
          syougaisienkbn: '3',
          futanjyougen: Number(Math.floor(Math.random() * 100) + '000') + 100,
          jyougenkanri:
            '上限管理事業所　 ' + Math.floor(Math.random() * 10) + 1,
          syokujiteikyo: '4',
          tokubetukyufu: Number(Math.floor(Math.random() * 10) + '000') + 100,
          syusei: '',
          nyushoymd: '',
          taisyoymd: '',
          isnyusho: false,
          istaisyo: false,
        });
        tmpviewdata[i].nobk = tmpviewdata[i].no;
        if (i % 2 == 1) {
          tmpviewdata[i].err = '';
          tmpviewdata[i].syusei = '';
        } else {
          if (i == 4) {
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].no = tmpviewdata[i - 1].no;
            tmpviewdata[i].nobk = tmpviewdata[i - 1].no;
            tmpviewdata[i].name = tmpviewdata[i - 1].name;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
            tmpviewdata[i].koufuymd = new Date('2020', Number('04') - 1, '27');
          }
          if (i % 3 == 0) {
            tmpviewdata[i].err = require('@/assets/error_20px.png');
            tmpviewdata[i].koufuymd = '';
            tmpviewdata[i].engo = '';
            tmpviewdata[i].jitibangou = '';
            tmpviewdata[i].jyukyukbn = '';
            tmpviewdata[i].jyukyuname = '';
            tmpviewdata[i].syougaisyu = '';
            tmpviewdata[i].syougaisienkbn = '';
            tmpviewdata[i].futanjyougen = '';
            tmpviewdata[i].jyougenkanri = '';
            tmpviewdata[i].syokujiteikyo = '';
            tmpviewdata[i].tokubetukyufu = '';
            tmpviewdata[i].syusei = strMaru;
          } else {
            if (i == 10) {
              // 年月が一致しているデータのフラグを立てる
              // tmpviewdata = tmpviewdata.filter((x) =>
              //   x.nyushoymd.startsWith(
              //     currentDate.getFullYear() +
              //       ('00' + (currentDate.getMonth() + 1)).slice(-2)
              //   )
              // );
              tmpviewdata[i].isnyusho = 'true';
            }
            if (i == 14) {
              tmpviewdata[i].istaisyo = 'true';
            }
          }
        }
      }
      return tmpviewdata;
    },
    siborikomiUser: function (siborikomiType) {
      siborikomiSearch = siborikomiType;
      this.userFilter();
    },
    siborikomiUser2: function (siborikomiType) {
      siborikomiSearch2 = siborikomiType;
      this.userFilter();
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
      // 絞込１
      if (siborikomiSearch == 2) {
        // 今月入所
        tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      } else if (siborikomiSearch == 3) {
        // 今月退所
        tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      }
      // 絞込２
      if (siborikomiSearch2 == 2) {
        // !x.koufuymdで空orNullを判定する
        tmpviewdata = tmpviewdata.filter(
          (x) =>
            !x.koufuymd ||
            !x.engo ||
            !x.jitibangou ||
            !x.jyukyukbn ||
            !x.jyukyuname ||
            !x.syougaisyu ||
            !x.syougaisienkbn ||
            !x.futanjyougen ||
            !x.jyougenkanri ||
            !x.syokujiteikyo ||
            !x.tokubetukyufu
        );
      } else if (siborikomiSearch2 == 3) {
        tmpviewdata = tmpviewdata.concat();
      }

      //コード順でソート
      if (sortSearch == 1) {
        tmpviewdata.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          // 二次キーは交付日
          if (a.koufuymd !== b.koufuymd) {
            return a.koufuymd - b.koufuymd;
          }
        });
      }
      //利用者名でソート
      if (sortSearch == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          if (a.koufuymd !== b.koufuymd) {
            return a.koufuymd - b.koufuymd;
          }
        });
      }
      //受給者番号でソート
      if (sortSearch == 3) {
        tmpviewdata.sort((a, b) => {
          if (a.nobk < b.nobk) return -1;
          if (a.nobk > b.nobk) return 1;
          if (a.koufuymd !== b.koufuymd) {
            return a.koufuymd - b.koufuymd;
          }
        });
      }
      this.viewdata = tmpviewdata;
    },
  },
};
</script>

<style  lang="scss">
div#jyukyuicrn {
  color: #333333;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1366px;
  max-width: 1920px;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .user-info {
    padding: 5px;
    font-size: 14px;
    label {
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
  #jyukyuIcrnGrid {
    color: #333333;
    font-size: 14px;
    width: 100%;
    height: 65vh;
    // max-width: 100%;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: #333333;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    // .wj-cell-maker {
    //   width: 70%;
    //   height: 70%;
    // }
    .wj-cell:not(.wj-header) {
      background: #fffeed;
    }
    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
      transition: all 0s;
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
}
</style>
