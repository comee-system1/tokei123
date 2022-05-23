<template>
  <div id="jyukyuicrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="mt-0" no-gutters>
        <v-col cols="6" xl="5">
          <v-row class="mt-0" no-gutters>
            <v-col cols="6">
              <label>利用者</label>
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  v-for="n in userSelList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  outlined
                  @click="siborikomiUser(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6">
              <label>絞込</label>
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  v-for="n in siborikomiSelList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  outlined
                  @click="siborikomiUser2(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-row class="mt-0" no-gutters>
            <v-col cols="7">
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
            </v-col>
          </v-row>

          <v-row class="mt-1" no-gutters>
            <v-col cols="*">
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
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" style="display: flex; align-items: center">
          <v-row no-gutters>
            <v-btn style="width: 80px; height: 80px" @click="searchClicked">
              検索
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="*">
          <v-row>
            <v-col cols="*" class="mt-3 mr-10">
              <v-row justify="end">
                <v-btn style="width: 100px; height: 28px">受給者証修正 </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-spacer style="height: 50px"></v-spacer>
          <v-row no-gutters justify="end">
            <v-col cols="4" xl="3" class="mr-1">
              <v-row class="border-bottom">
                <v-col class="pa-2" cols="4">
                  <label class="errorlabel">
                    <b>エラー</b>
                  </label>
                </v-col>
                <v-col class="pa-2" cols="*">
                  <span>{{ errCnt }} 人 / {{ viewdata.length }} 人中</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mt-1" no-gutters>
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
import ls from '@/utiles/localStorage';

const keySort = 'keyval00003';
const keyAlp = 'keyval00006';
const strMaru = '○';
const bgClrInput = 'white';
const bgClrError = 'mistyrose';
const fmtYen = 'n0';
const fmtYmd = 'yyyy/MM/dd'; //'gyy/MM/dd';
const daiTitle = '受給者証情報';
const chuTitle = '利用者負担';
const rowHeaderheight = 20;
const rowheight = 25;
const styleDefault = '';
const boderSolid = '1px solid';
let siborikomiSearch = 0;
let siborikomiSearch2 = 0;
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
      sortSearch: 0,
      alphaSearch: 0,
      headerList: [
        { dataname: 'err', title: 'エ\nラ\n|', width: 30, align: 'center' },
        {
          dataname: 'no',
          title: '受給者証\n番号',
          width: 100,
          align: 'center',
        },
        { dataname: 'name', title: '氏名', width: '7*', align: 'left' },
        {
          dataname: 'koufuymd',
          title: '交付日',
          width: 90,
          align: 'center',
        },
        { dataname: 'engo', title: '援護者', width: 100, align: 'left' },
        {
          dataname: 'jitibangou',
          title: '助成自治\n体番号',
          width: 70,
          align: 'center',
        },
        {
          dataname: 'jyukyukbn',
          title: '受給者\n区分',
          width: 50,
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
          title: '障害\n種別',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'syougaisienkbn',
          title: '障害\n支援\n区分',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'futanjyougen',
          title: '利用者負担\n上限月額',
          width: 80,
          align: 'right',
        },
        {
          dataname: 'jyougenumu',
          title: '上限\n管理',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'jyougenkanri',
          title: '上限額\n管理事業所',
          width: '7*',
          align: 'left',
        },
        {
          dataname: 'syokujiteikyo',
          title: '食事提供\n体制',
          width: 70,
          align: 'center',
        },
        {
          dataname: 'tokubetukyufu',
          title: '特別\n給付費',
          width: 70,
          align: 'right',
        },
        { dataname: 'syusei', title: '修正', width: 50, align: 'center' },
      ],
      userSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月入所者' },
        { val: 2, name: '今月退所者' },
      ],
      siborikomiSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '未入力' },
        { val: 2, name: '期限切れ' },
      ],
      sortSelList: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
        { val: 2, name: '受給者番号' },
      ],
      viewdataAll: [],
      viewdata: [],
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(keySort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(keyAlp));
    });
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
      flexGrid.columnHeaders.rows[0].height = rowHeaderheight;
      flexGrid.columnHeaders.rows[1].height = rowHeaderheight;
      flexGrid.columnHeaders.rows[2].height = 40;
      flexGrid.cells.rows.defaultSize = rowheight;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < 16; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex == 0) {
          col.cssClass = styleDefault;
          col.cellTemplate = CellMaker.makeImage();
        }

        if (colIndex == 10 || colIndex == 14) {
          col.format = fmtYen;
        } else if (colIndex == 3) {
          col.format = fmtYmd;
        } else {
          col.format = styleDefault;
        }

        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = '';
          if (1 <= colIndex && colIndex <= 14 && rowindex == 0) {
            title = daiTitle;
          } else if (10 <= colIndex && colIndex <= 14 && rowindex == 1) {
            title = chuTitle;
          } else {
            title = this.headerList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onFormatItem(flexGrid, e) {
      if (
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 1) ||
        (e.panel == flexGrid.columnHeaders && e.row == 1 && e.col == 10) ||
        e.col == 0 ||
        e.col == 9 ||
        e.col == 14
      ) {
        e.cell.style.borderRight = boderSolid;
      }

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
          e.cell.style.backgroundColor = styleDefault;
          e.cell.style.borderBottom = styleDefault;

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
            // (e.col == 11 && !tmpitem.jyougenkanri) ||
            (e.col == 12 && tmpitem.jyougenumuval && !tmpitem.jyougenkanri) ||
            (e.col == 13 && tmpitem.jyougenumuval && !tmpitem.syokujiteikyo) ||
            (e.col == 14 && tmpitem.jyougenumuval && !tmpitem.tokubetukyufu)
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
    searchClicked: function () {
      // 初期データ読込
      this.viewdataAll = this.loadData();
      this.userFilter();
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
          jyougenumu: '有',
          jyougenumuval: true,
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
            if (i == 12) {
              tmpviewdata[i].jyougenumu = '';
              tmpviewdata[i].jyougenumuval = false;
            }
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
              tmpviewdata[i].isnyusho = true;
            }
            if (i == 14) {
              tmpviewdata[i].istaisyo = true;
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
      ls.setlocalStorageEncript(keySort, sortType);
      this.sortSearch = sortType;
      this.userFilter();
    },
    onAlphabet: function (key) {
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
      if (siborikomiSearch == 1) {
        // 今月入所
        tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      } else if (siborikomiSearch == 2) {
        // 今月退所
        tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      }
      // 絞込２
      if (siborikomiSearch2 == 1) {
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
      } else if (siborikomiSearch2 == 2) {
        tmpviewdata = tmpviewdata.concat();
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
          // 二次キーは交付日
          if (a.koufuymd !== b.koufuymd) {
            return a.koufuymd - b.koufuymd;
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
          if (a.koufuymd !== b.koufuymd) {
            return a.koufuymd - b.koufuymd;
          }
        });
      }
      //受給者番号でソート
      if (this.sortSearch == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.nobk < b.nobk) {
            return -1;
          }
          if (a.nobk > b.nobk) {
            return 1;
          }
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
@import '@/assets/scss/common.scss';
div#jyukyuicrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .user-info {
    width: auto;
    padding: 4px;
    label:not(.errorlabel) {
      display: inline-block;
      margin-top: 2px;
      margin-right: 2px;
      padding-top: 2px;
      font-weight: bold;
      background: #f0ffff;
      border: 1px solid #7db8ff;
      height: 27px;
      width: 60px;
      text-align: center;
    }
  }
  .errorlabel {
    color: red;
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
    color: $font_color;
    font-size: $cell_fontsize;
    width: 98vw;
    min-width: 1300px;
    height: 65vh;
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
