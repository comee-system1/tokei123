<template>
  <div id="KyuhuMeisaiIcrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="mt-0">
        <v-col cols="9" class="pt-1">
          <v-row class="mt-0">
            <v-col cols="3" class="pt-0">
              <label>内容</label>
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  v-for="n in pageSelList"
                  :key="n"
                  small
                  color="secondary"
                  dark
                  outlined
                  :width="btnwidth"
                  @click="pageChange(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6" class="pt-0">
              <label class="mr-6">市町村</label>
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  v-for="n in sichosonSelList"
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
          </v-row>
          <v-row class="mt-0 pt-0">
            <v-col cols="3" class="mt-1 pt-0">
              <label>表示</label>
              <!-- mandatoryは初期選択 -->
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  v-for="n in dispSelList"
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
            <v-col cols="4" class="mt-1 pt-0">
              <label>サービス</label>
              <wj-combo-box
                :items-source="search"
                :textChanged="searchChange"
              ></wj-combo-box>
            </v-col>
            <v-col cols="5" class="mt-1 pt-0">
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
          <v-row class="mt-0"
            ><v-col cols="*" class="pt-3 pb-1">
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
          </v-row>
        </v-col>
        <v-col cols="*" style="display: flex; align-items: center">
          <v-row justify="end">
            <v-btn class="mr-3" style="width: 100px; height: 100px">
              検索
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <wj-flex-grid
            id="seikyuGrid"
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
            :initialized="onInitializeSeikyuGrid"
            :formatItem="onFormatItem"
            :itemsSourceChanged="itemsSourceChanged"
            :itemsSource="viewdata"
          >
            <wj-flex-grid-column
              v-for="column in headerList"
              :key="column.item"
              cssClass="cell-img"
              :cellTemplate="tplImage"
            />
          </wj-flex-grid>
          <wj-flex-grid
            id="kyufuGrid"
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
            :initialized="onInitializeKyufuGrid"
            :formatItem="onFormatItem"
            :itemsSource="viewkyufudata"
          >
            <wj-flex-grid-column
              v-for="column in kyufuHeaderList"
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

const colCntSeikyu = 22;
const colCntKyufu = 13;
const strMaru = '○';
// const bgClrInput = 'white';
// const bgClrError = 'mistyrose';
const fmtYen = 'n0';
const titleNisu = '日数';
const titleSeikyugakuSyukei = '請求額集計欄';
const titleTokubetukyufu = '特別給付費';
const titleSvc = 'サービス';
const titleAGata = 'A型減免';
const titleSeikyugaku = '請求額';
const titleSvcKind = 'サービス種別';
const titleKyufuhiMeisai = '給付費明細欄';

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
      btnwidth: 90,
      headerList: [
        {
          dataname: 'kakutei',
          title: 'レ\nセ\n確\n定',
          width: '1*',
          align: 'center',
        },
        { dataname: 'name', title: '氏名', width: '4*', align: 'left' },
        {
          dataname: 'futan',
          title: '利用者\n負担上\n限月額\n①',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'riyoucnt',
          title: '利用\n日数',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'nyuincnt',
          title: '入院\n日数',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'svccode',
          title: '種別',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'svcname',
          title: '名称',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'riyounissu',
          title: '利用\n日数',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'kyufutani',
          title: '給付\n単位数',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'souhiyougaku',
          title: '総\n費用額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'itiwarisoutougaku',
          title: '１割\n相当額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'riyousyafutan',
          title: '利用者\n負担額\n②',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'jyougengakuchousei',
          title: '上限月\n額調整\n①②少な\nい数',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'jigyousyagenmen',
          title: '事業者\n減免額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'genmenriyousya',
          title: '減免後\n利用者',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'chouseiriyousya',
          title: '調整後\n利用者\n負担額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'jyougenkanrifutangaku',
          title: '上限額\n管理後\n利用者\n負担額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'ketteiriyoufutangaku',
          title: '決定利\n用者負\n担額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'kyufuhi',
          title: '給付費',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'jititaijyosei',
          title: '自治体\n助成分\n請求額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'kyufuhiseikyugaku',
          title: '給付費\n請求額',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'jippisaneigaku',
          title: '実費\n算定額',
          width: '2*',
          align: 'right',
        },
      ],
      kyufuHeaderList: [
        {
          dataname: 'kakutei',
          title: 'レ\nセ\n確\n定',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'name',
          title: '氏名',
          width: '10*',
          align: 'center',
        },
        {
          dataname: 'code',
          title: 'コ\n｜\nド',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'symd',
          title: '開始日',
          width: '6*',
          align: 'center',
        },
        {
          dataname: 'eymd',
          title: '終了日',
          width: '6*',
          align: 'center',
        },
        {
          dataname: 'riyounissuu',
          title: '利用\n日数',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'nyuinnissu',
          title: '入院\n日数',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'svcnaiyou',
          title: 'サービス内容',
          width: '10*',
          align: 'center',
        },
        {
          dataname: 'svccode',
          title: 'サービス\nコード',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'tani',
          title: '単位数',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'kaisu',
          title: '回数',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'svctani',
          title: 'サービス\n単位数',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'tekiyou',
          title: '摘要',
          width: '*',
          align: 'center',
        },
      ],
      pageSelList: [
        { val: 1, name: '請求額集計欄' },
        { val: 2, name: '給付費明細' },
      ],
      sichosonSelList: [
        { val: 1, name: '全員' },
        { val: 2, name: '未入力' },
        { val: 3, name: '期限切れ' },
      ],
      dispSelList: [
        { val: 1, name: 'サービス有' },
        { val: 2, name: '計のみ' },
      ],
      sortSelList: [
        { val: 1, name: 'コード' },
        { val: 2, name: 'カナ' },
        { val: 3, name: '受給者番号' },
      ],
      tplImage: CellMaker.makeImage(),
      viewdataAll: [],
      viewdata: [],
      viewkyufudataAll: [],
      viewkyufudata: [],
    };
  },
  computed: {},
  methods: {
    onInitializeSeikyuGrid: function (flexGrid) {
      flexGrid.beginUpdate();

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.columnHeaders.rows[2].height = 60;

      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < colCntSeikyu; colIndex++) {
        let col = flexGrid.columns[colIndex];

        col.binding = this.headerList[colIndex].dataname;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;

        if (colIndex > 0) {
          col.cssClass = '';
          col.cellTemplate = '';
        }

        if (colIndex == 2 || colIndex >= 8) {
          col.format = fmtYen;
        } else {
          col.format = '';
        }

        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = this.headerList[colIndex].title;
          if (rowindex == 0) {
            if (3 <= colIndex && colIndex <= 4) {
              title = titleNisu;
            } else if (5 <= colIndex && colIndex <= 19) {
              title = titleSeikyugakuSyukei;
            } else if (20 <= colIndex && colIndex <= 21) {
              title = titleTokubetukyufu;
            }
          } else if (rowindex == 1) {
            if (5 <= colIndex && colIndex <= 6) {
              title = titleSvc;
            } else if (13 <= colIndex && colIndex <= 14) {
              title = titleAGata;
            } else if (18 == colIndex) {
              title = titleSeikyugaku;
            }
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }

      // 初期データ読込
      this.viewdataAll = this.loadData(true);
      this.viewdata = this.viewdataAll;

      flexGrid.endUpdate();
    },
    onInitializeKyufuGrid: function (flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[1].height = 60;

      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < colCntKyufu; colIndex++) {
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.kyufuHeaderList[colIndex].dataname;
        col.width = this.kyufuHeaderList[colIndex].width;
        col.align = this.kyufuHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex > 0) {
          col.cssClass = '';
          col.cellTemplate = '';
        }

        if (colIndex == 2 || colIndex >= 8) {
          col.format = fmtYen;
        } else {
          col.format = '';
        }

        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = this.kyufuHeaderList[colIndex].title;
          if (rowindex == 0) {
            if (2 <= colIndex && colIndex <= 4) {
              title = titleSvcKind;
            } else if (5 <= colIndex && colIndex <= 6) {
              title = titleNisu;
            } else if (7 <= colIndex && colIndex <= 12) {
              title = titleKyufuhiMeisai;
            }
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }

      // 初期データ読込
      this.viewkyufudataAll = this.loadData(false);
      this.viewkyufudata = this.viewkyufudataAll;

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
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.fontWeight = 'normal';
        e.cell.style.backgroundColor = '#CEFCFC';
        e.cell.style.borderTop = '1px solid';
        if (e.col < 6) {
          e.cell.style.borderRight = 0;
        } else if (e.col == 6) {
          e.cell.style.textAlign = 'right';
          e.cell.style.fontWeight = 'bold';
        }
      } else {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = '';
          e.cell.style.borderBottom = '';
          e.cell.style.borderRight = '';
          e.cell.style.textAlign = '';
          e.cell.style.fontWeight = '';

          if (flexGrid.hostElement.id == 'seikyuGrid') {
            // 下の行と同じ利用者の場合は下線を非表示化
            if (e.col <= 4 && !tmpitem.istotalrow) {
              e.cell.style.borderBottom = 0;
            } else if (tmpitem.istotalrow) {
              e.cell.style.borderBottom = '1px solid ';
              if (e.col == 5) {
                e.cell.style.borderRight = 0;
              } else if (e.col == 6) {
                e.cell.style.textAlign = 'right';
                e.cell.style.fontWeight = 'bold';
              }
              if (e.col >= 5) {
                e.cell.style.backgroundColor = '#FFFFCC';
              }
            }
            // if (e.row > 2 && e.row < flexGrid.rows.length - 2 && e.col <= 4) {
            //   let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
            //   if (tmpNextitem != null && !tmpNextitem.istotalrow) {
            //     e.cell.style.borderBottom = 0;
            //   }
            // }
          } else if (flexGrid.hostElement.id == 'kyufuGrid') {
            // b
          }

          // if (e.col == flexGrid.columns.length - 1) {
          //   e.cell.style.backgroundColor = bgClrInput;
          // } else if (
          //   (e.col == 3 && !tmpitem.koufuymd) ||
          //   (e.col == 4 && !tmpitem.engo) ||
          //   (e.col == 5 && !tmpitem.jitibangou) ||
          //   (e.col == 6 && !tmpitem.jyukyukbn) ||
          //   (e.col == 7 && !tmpitem.jyukyuname) ||
          //   (e.col == 8 && !tmpitem.syougaisyu) ||
          //   (e.col == 9 && !tmpitem.syougaisienkbn) ||
          //   (e.col == 10 && !tmpitem.futanjyougen) ||
          //   (e.col == 11 && !tmpitem.jyougenkanri) ||
          //   (e.col == 12 && !tmpitem.syokujiteikyo) ||
          //   (e.col == 13 && !tmpitem.tokubetukyufu)
          // ) {
          //   e.cell.style.backgroundColor = bgClrError;
          // }

          // // 仮想マージ

          // // 上の行と同じ利用者の場合は空で表示する
          // if (e.row >= 3 && 0 < e.col && e.col <= 2) {
          //   let tmpPreitem = e.panel.rows[e.row - 1].dataItem;
          //   if (tmpPreitem != null && tmpitem.id == tmpPreitem.id) {
          //     e.panel.setCellData(e.row, e.col, '');
          //   } else {
          //     if (e.col == 1) {
          //       e.panel.setCellData(e.row, e.col, tmpitem.nobk, true);
          //     } else if (e.col == 2) {
          //       e.panel.setCellData(e.row, e.col, tmpitem.name);
          //     }
          //   }
          // }

          flexGrid.endUpdate();
        }
      }
    },
    itemsSourceChanged: function (flexGrid) {
      let total = 0;
      if (flexGrid.hostElement.id == 'seikyuGrid') {
        for (let colIndex = 6; colIndex < colCntSeikyu; colIndex++) {
          if (colIndex == 6) {
            flexGrid.columnFooters.setCellData(0, colIndex, '合計');
            continue;
          } else if (colIndex == 7) {
            continue;
          } else if (colIndex == 8) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.kyufutani);
            }, 0);
          } else if (colIndex == 9) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.souhiyougaku);
            }, 0);
          } else if (colIndex == 10) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.itiwarisoutougaku);
            }, 0);
          } else if (colIndex == 11) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.riyousyafutan);
            }, 0);
          } else if (colIndex == 12) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.jyougengakuchousei);
            }, 0);
          } else if (colIndex == 13) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.jigyousyagenmen);
            }, 0);
          } else if (colIndex == 14) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.genmenriyousya);
            }, 0);
          } else if (colIndex == 15) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.chouseiriyousya);
            }, 0);
          } else if (colIndex == 16) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.jyougenkanrifutangaku);
            }, 0);
          } else if (colIndex == 17) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.ketteiriyoufutangaku);
            }, 0);
          } else if (colIndex == 18) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.kyufuhi);
            }, 0);
          } else if (colIndex == 19) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.jititaijyosei);
            }, 0);
          } else if (colIndex == 20) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.kyufuhiseikyugaku);
            }, 0);
          } else if (colIndex == 21) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item.jippisaneigaku);
            }, 0);
          }
          flexGrid.columnFooters.setCellData(0, colIndex, total);
        }
      }
    },
    loadData: function (isSeikyu) {
      let tmpviewdata = [];
      let userCount = 102;
      if (isSeikyu) {
        let cnt = 0;
        for (let i = 0; i < userCount; i++) {
          let codeval = String(
            Math.floor(Math.random() * 10000000000) + 1
          ).padStart(10, '0');
          tmpviewdata.push({
            id: i,
            kakutei: '',
            kana: 'トウケイタロウ' + i,
            code: codeval,
            name: '東経太郎' + i,
            futan: Number(Math.floor(Math.random() * 100) + '0000') + 100,
            riyoucnt: '00',
            nyuincnt: '00',
            svccode: '32',
            svcname: '施設入所支援',
            riyounissu: '00',
            kyufutani: Number(Math.floor(Math.random() * 20000)),
            souhiyougaku: Number(Math.floor(Math.random() * 200000)),
            itiwarisoutougaku: Number(Math.floor(Math.random() * 20000)),
            riyousyafutan: Number(Math.floor(Math.random() * 20000)),
            jyougengakuchousei: Number(Math.floor(Math.random() * 20000)),
            jigyousyagenmen: Number(Math.floor(Math.random() * 20000)),
            genmenriyousya: Number(Math.floor(Math.random() * 20000)),
            chouseiriyousya: Number(Math.floor(Math.random() * 20000)),
            jyougenkanrifutangaku: Number(Math.floor(Math.random() * 20000)),
            ketteiriyoufutangaku: Number(Math.floor(Math.random() * 20000)),
            kyufuhi: Number(Math.floor(Math.random() * 20000)),
            jititaijyosei: Number(Math.floor(Math.random() * 20000)),
            kyufuhiseikyugaku: Number(Math.floor(Math.random() * 200000)),
            jippisaneigaku: Number(Math.floor(Math.random() * 20000)),
            usersortorder: cnt,
            istotalrow: false,
          });
          cnt = cnt + 1;
          if (cnt == 3) {
            cnt = 0;
          }

          if (tmpviewdata[i].usersortorder == 0) {
            tmpviewdata[i].kakutei = require('@/assets/kaku_15px.png');
          } else if (tmpviewdata[i].usersortorder == 2) {
            tmpviewdata[i].name = '';
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
            tmpviewdata[i].code = tmpviewdata[i - 1].code;
            tmpviewdata[i].futan = '';
            tmpviewdata[i].riyoucnt = '';
            tmpviewdata[i].nyuincnt = '';

            tmpviewdata[i].svccode = '';
            tmpviewdata[i].svcname = '計';
            tmpviewdata[i].istotalrow = true;
            tmpviewdata[i].kyufutani =
              tmpviewdata[i - 2].kyufutani + tmpviewdata[i - 1].kyufutani;
            tmpviewdata[i].souhiyougaku =
              tmpviewdata[i - 2].souhiyougaku + tmpviewdata[i - 1].souhiyougaku;
            tmpviewdata[i].itiwarisoutougaku =
              tmpviewdata[i - 2].itiwarisoutougaku +
              tmpviewdata[i - 1].itiwarisoutougaku;
            tmpviewdata[i].riyousyafutan =
              tmpviewdata[i - 2].riyousyafutan +
              tmpviewdata[i - 1].riyousyafutan;
            tmpviewdata[i].jyougengakuchousei =
              tmpviewdata[i - 2].jyougengakuchousei +
              tmpviewdata[i - 1].jyougengakuchousei;
            tmpviewdata[i].jyougengakuchousei =
              tmpviewdata[i - 2].jyougengakuchousei +
              tmpviewdata[i - 1].jyougengakuchousei;
            tmpviewdata[i].jigyousyagenmen =
              tmpviewdata[i - 2].jigyousyagenmen +
              tmpviewdata[i - 1].jigyousyagenmen;
            tmpviewdata[i].genmenriyousya =
              tmpviewdata[i - 2].genmenriyousya +
              tmpviewdata[i - 1].genmenriyousya;
            tmpviewdata[i].chouseiriyousya =
              tmpviewdata[i - 2].chouseiriyousya +
              tmpviewdata[i - 1].chouseiriyousya;
            tmpviewdata[i].jyougenkanrifutangaku =
              tmpviewdata[i - 2].jyougenkanrifutangaku +
              tmpviewdata[i - 1].jyougenkanrifutangaku;
            tmpviewdata[i].ketteiriyoufutangaku =
              tmpviewdata[i - 2].ketteiriyoufutangaku +
              tmpviewdata[i - 1].ketteiriyoufutangaku;
            tmpviewdata[i].kyufuhi =
              tmpviewdata[i - 2].kyufuhi + tmpviewdata[i - 1].kyufuhi;
            tmpviewdata[i].jititaijyosei =
              tmpviewdata[i - 2].jititaijyosei +
              tmpviewdata[i - 1].jititaijyosei;
            tmpviewdata[i].kyufuhiseikyugaku =
              tmpviewdata[i - 2].kyufuhiseikyugaku +
              tmpviewdata[i - 1].kyufuhiseikyugaku;
            tmpviewdata[i].jippisaneigaku =
              tmpviewdata[i - 2].jippisaneigaku +
              tmpviewdata[i - 1].jippisaneigaku;
            tmpviewdata[i].usersortorder = 2;
          } else if (tmpviewdata[i].usersortorder == 1) {
            tmpviewdata[i].name = '(' + tmpviewdata[i - 1].code + ')';
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
            tmpviewdata[i].code = tmpviewdata[i - 1].code;
            tmpviewdata[i].futan = '';
            tmpviewdata[i].riyoucnt = '';
            tmpviewdata[i].nyuincnt = '';
            tmpviewdata[i].svccode = '22';
            tmpviewdata[i].svcname = '生活介護';
            tmpviewdata[i].usersortorder = 1;
          }
        }
      } else {
        for (let i = 0; i < userCount; i++) {
          tmpviewdata.push({
            id: i,
            kakutei: '',
            name: '東経太郎' + i,
            kana: 'トウケイタロウ' + i,
            code: String(Math.floor(Math.random() * 10000000) + 1).padStart(
              7,
              '0'
            ),
            symd: new Date('2015', Number('04') - 1, '26'),
            eymd: new Date('2020', Number('04') - 1, '26'),
            riyounissuu: '00',
            nyuinnissu: '00',
            svcnaiyou: 'サービス内容' + Math.floor(Math.random() * 10) + 1,

            err: '',
            no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
              10,
              '0'
            ),
            nobk: 0,

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
              tmpviewdata[i].koufuymd = new Date(
                '2020',
                Number('04') - 1,
                '27'
              );
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
                tmpviewdata[i].isnyusho = 'true';
              }
              if (i == 14) {
                tmpviewdata[i].istaisyo = 'true';
              }
            }
          }
        }
      }
      // ★Date型はmonthが0-11で表現されることに注意

      return tmpviewdata;
    },
    pageChange: function (pageType) {
      this.pageType = pageType;
      if (pageType == '1') {
        document.getElementById('seikyuGrid').style.display = 'block';
        document.getElementById('kyufuGrid').style.display = 'none';
      } else {
        document.getElementById('seikyuGrid').style.display = 'none';
        document.getElementById('kyufuGrid').style.display = 'block';
      }
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
div#KyuhuMeisaiIcrn {
  color: #333333;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  width: 1366px !important;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .user-info {
    padding: 4px;
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
    label {
      font-size: 0.85em;
    }
  }

  #seikyuGrid,
  #kyufuGrid {
    color: #333333;
    font-size: 12px;
    width: auto;
    height: 70vh;
    max-width: 100%;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: #333333;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .wj-colfooter {
      // ヘッダのみ縦横中央寄せ
      color: #333333;
      font-size: 12px;
      background: #fffeed;
      text-align: right;
    }
    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
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
  #kyufuGrid {
    width: auto;
    background: lightyellow;
    display: none; // 初期は非表示
  }
}
</style>
