<template>
  <div id="KyuhuMeisaiIcrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="mt-0" no-gutters>
        <v-col cols="9" xl="7">
          <v-row class="mt-0" no-gutters>
            <v-col cols="3">
              <label>内容</label>
              <v-btn-toggle class="flex-wrap" v-model="dispPageType">
                <v-btn
                  v-for="n in pageSelList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  outlined
                  @click="pageChange(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6">
              <label>市町村</label>
              <wj-menu
                v-model="selSichoson"
                selectedValuePath="val"
                displayMemberPath="name"
                :itemsSource="sichosonList"
                :selectedIndexChanged="onSichosonIndexChanged"
                :header="
                  sichosonList.filter((x) => x.val == selSichoson)[0].name
                "
              >
              </wj-menu>
            </v-col>
          </v-row>
          <v-row class="mt-0" no-gutters>
            <v-col cols="3" xl="3" class="mt-1">
              <label>表示</label>
              <!-- mandatoryは初期選択 -->
              <v-btn-toggle class="flex-wrap" v-model="dispTotalOnly" mandatory>
                <v-btn
                  v-for="n in dispSelList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  outlined
                  :disabled="isBtnDisabled"
                  @click="dispTotal(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="4" xl="3" class="mt-1">
              <label>サービス</label>
              <wj-menu
                v-model="selSvc"
                selectedValuePath="val"
                displayMemberPath="name"
                :itemsSource="svcList"
                :selectedIndexChanged="onSvcIndexChanged"
                :header="svcList.filter((x) => x.val == selSvc)[0].name"
              >
              </wj-menu>
            </v-col>
            <v-col cols="5" class="mt-1">
              <label>ソート</label>
              <!-- mandatoryは初期選択 -->
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
        <v-col cols="*" style="display: flex; align-items: center">
          <v-row no-gutters>
            <v-btn style="width: 80px; height: 80px" @click="searchClicked">
              検索
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-1" no-gutters>
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
            :formatItem="onFormatItemSeikyu"
            :itemsSourceChanged="itemsSourceChangedSeikyu"
            :itemsSource="viewdata"
          >
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
            :formatItem="onFormatItemKyufu"
            :itemsSourceChanged="itemsSourceChangedKyufu"
            :itemsSource="viewkyufudata"
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
import sysConst from '@/utiles/const';

const keyPage = ls.KEY.KyufuMeisaiPage;
const keyTotal = ls.KEY.TotalOnlyDisp;
const keySort = ls.KEY.Sort;
const keySvc = ls.KEY.Service;
const keySichoson = ls.KEY.Sichoson;
const keyAlp = ls.KEY.Alphabet;
const colCntSeikyu = 22;
const colCntKyufu = 13;
const rowHeaderheight = sysConst.GRDROWHEIGHT.Header;
const rowheight = sysConst.GRDROWHEIGHT.Row;
const fmtYen = sysConst.FORMAT.Num;
const fmtYmd = sysConst.FORMAT.Ymd;
const titleNisu = '日数';
const titleSeikyugakuSyukei = '請求額集計欄';
const titleTokubetukyufu = '特別給付費';
const titleSvc = 'サービス';
const titleAGata = 'A型減免';
const titleSeikyugaku = '請求額';
const titleSvcKind = 'サービス種別';
const titleKyufuhiMeisai = '給付費明細欄';
const titleTotal = '合計';
const styleDefault = '';
const styleNormal = 'normal';
const styleBold = 'bold';
const boderSolid = '1px solid';
const alignRight = 'right';
const bgClrTotal = sysConst.COLOR.gridTotalBackground;
const bgClrMiniTotal = sysConst.COLOR.gridMiniTotalBackground;
const styleBlock = 'block';
const styleNone = 'none';
const grdNameSeikyu = 'seikyuGrid';
const grdNameKyufu = 'kyufuGrid';
const cellimag = 'cell-img';
let drawListTmpCnt = 0;
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
      dispPageType: 0,
      dispTotalOnly: 0,
      sortSearch: 0,
      selSvc: 0,
      selSichoson: 0,
      alphaSearch: 0,
      alphabet: alphabet,
      isBtnDisabled: false,
      sichosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
      ],
      svcList: [
        { val: 0, name: '指定なし' },
        { val: 32, name: '32:施設入所介護' },
        { val: 22, name: '22:生活介護' },
      ],
      headerList: [
        {
          dataname: 'kakutei',
          title: 'レ\nセ\n確\n定',
          width: 30,
          minWidth: 30,
          maxWidth: 30,
          align: 'center',
        },
        {
          dataname: 'dispname',
          title: '氏名',
          width: '2*',
          minWidth: 150,
          maxWidth: 400,
          align: 'left',
        },
        {
          dataname: 'futan',
          title: '利用者\n負担上\n限月額\n①',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'riyoucnt',
          title: '利用\n日数',
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          align: 'right',
        },
        {
          dataname: 'nyuincnt',
          title: '入院\n日数',
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          align: 'right',
        },
        {
          dataname: 'svccode',
          title: '種別',
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          align: 'center',
        },
        {
          dataname: 'svcname',
          title: '名称',
          width: '*',
          minWidth: 120,
          maxWidth: 150,
          align: 'left',
        },
        {
          dataname: 'riyounissu',
          title: '利用\n日数',
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          align: 'right',
        },
        {
          dataname: 'kyufutani',
          title: '給付\n単位数',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'souhiyougaku',
          title: '総\n費用額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'itiwarisoutougaku',
          title: '１割\n相当額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'riyousyafutan',
          title: '利用者\n負担額\n②',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'jyougengakuchousei',
          title: '上限月額\n調整①②\n少ない数',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'jigyousyagenmen',
          title: '事業者\n減免額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'genmenriyousya',
          title: '減免後\n利用者',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'chouseiriyousya',
          title: '調整後\n利用者\n負担額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'jyougenkanrifutangaku',
          title: '上限額\n管理後\n利用者\n負担額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'ketteiriyoufutangaku',
          title: '決定\n利用者\n負担額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'kyufuhi',
          title: '給付費',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'jititaijyosei',
          title: '自治体\n助成分\n請求額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'kyufuhiseikyugaku',
          title: '給付費\n請求額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
          align: 'right',
        },
        {
          dataname: 'jippisaneigaku',
          title: '実費\n算定額',
          width: '*',
          minWidth: 80,
          maxWidth: 100,
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
          width: '5*',
          align: 'left',
        },
        {
          dataname: 'dispsvc',
          title: 'コード',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'dsymd',
          title: '開始日',
          width: '3.5*',
          align: 'center',
        },
        {
          dataname: 'deymd',
          title: '終了日',
          width: '3.5*',
          align: 'center',
        },
        {
          dataname: 'riyounissuu',
          title: '利用\n日数',
          width: '1.5*',
          align: 'right',
        },
        {
          dataname: 'nyuinnissu',
          title: '入院\n日数',
          width: '1.5*',
          align: 'right',
        },
        {
          dataname: 'svcnaiyou',
          title: 'サービス内容',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'svccode',
          title: 'サービス\nコード',
          width: '2.5*',
          align: 'center',
        },
        {
          dataname: 'tani',
          title: '単位数',
          width: '2*',
          align: 'right',
        },
        {
          dataname: 'kaisu',
          title: '回数',
          width: '1.5*',
          align: 'right',
        },
        {
          dataname: 'svctani',
          title: 'サービス\n単位数',
          width: '3*',
          align: 'right',
        },
        {
          dataname: 'tekiyou',
          title: '摘要',
          width: '10*',
          align: 'left',
        },
      ],
      pageSelList: [
        { val: 0, name: '請求額集計欄' },
        { val: 1, name: '給付費明細' },
      ],
      sichosonSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '未入力' },
        { val: 2, name: '期限切れ' },
      ],
      dispSelList: [
        { val: 0, name: 'サービス有' },
        { val: 1, name: '計のみ' },
      ],
      sortSelList: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
        { val: 2, name: '受給者番号' },
      ],
      viewdataAll: [],
      viewdata: [],
      viewkyufudataAll: [],
      viewkyufudata: [],
      serviceArgument: '', // ヘッダメニューのサービス選択
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.dispPageType = Number(ls.getlocalStorageEncript(keyPage));
      this.dispTotalOnly = Number(ls.getlocalStorageEncript(keyTotal));
      this.sortSearch = Number(ls.getlocalStorageEncript(keySort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(keyAlp));
      this.selSvc = Number(ls.getlocalStorageEncript(keySvc));
      this.selSichoson = Number(ls.getlocalStorageEncript(keySichoson));
      this.pageChange(this.dispPageType);
    });
  },
  computed: {},
  methods: {
    onInitializeSeikyuGrid(flexGrid) {
      flexGrid.beginUpdate();

      // ヘッダの追加と設定
      flexGrid.frozenColumns = 7;
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = rowHeaderheight;
      flexGrid.columnHeaders.rows[1].height = rowHeaderheight;
      flexGrid.columnHeaders.rows[2].height = 50;
      flexGrid.alternatingRowStep = 0;
      flexGrid.cells.rows.defaultSize = rowheight;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < colCntSeikyu; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];

        col.binding = this.headerList[colIndex].dataname;
        col.width = this.headerList[colIndex].width;
        col.minWidth = this.headerList[colIndex].minWidth;
        col.maxWidth = this.headerList[colIndex].maxWidth;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;

        if (colIndex == 0) {
          col.cssClass = cellimag;
          col.cellTemplate = CellMaker.makeImage();
        } else {
          col.cssClass = styleDefault;
          col.cellTemplate = styleDefault;
        }

        if (colIndex == 2 || colIndex >= 8) {
          col.format = fmtYen;
        } else {
          col.format = styleDefault;
        }

        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = this.headerList[colIndex].title;
          if (rowindex == 0) {
            if (3 <= colIndex && colIndex <= 4) {
              title = titleNisu;
            } else if (5 <= colIndex && colIndex <= 6) {
              title = titleSvc;
            } else if (7 <= colIndex && colIndex <= 19) {
              title = titleSeikyugakuSyukei;
            } else if (20 <= colIndex && colIndex <= 21) {
              title = titleTokubetukyufu;
            }
          } else if (rowindex == 1) {
            if (13 <= colIndex && colIndex <= 14) {
              title = titleAGata;
            } else if (18 == colIndex) {
              title = titleSeikyugaku;
            }
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }

      flexGrid.endUpdate();
    },
    onInitializeKyufuGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = rowHeaderheight;
      flexGrid.columnHeaders.rows[1].height = 50;
      flexGrid.cells.rows.defaultSize = rowheight;

      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < colCntKyufu; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.kyufuHeaderList[colIndex].dataname;
        col.width = this.kyufuHeaderList[colIndex].width;
        col.align = this.kyufuHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex == 0) {
          col.cssClass = cellimag;
          col.cellTemplate = CellMaker.makeImage();
        } else {
          col.cssClass = styleDefault;
          col.cellTemplate = styleDefault;
        }

        if (colIndex == 2 || colIndex >= 8) {
          col.format = fmtYen;
        } else if (colIndex == 3 || colIndex == 4) {
          col.format = fmtYmd;
        } else {
          col.format = styleDefault;
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

      flexGrid.endUpdate();
    },
    setImage(e, isIns) {
      if (isIns) {
        e.panel.setCellData(e.row, e.col, require('@/assets/kaku_15px.png'));
      } else {
        e.panel.setCellData(e.row, e.col, '');
      }
    },
    setName(e, name, no, code) {
      if (!name) {
        if (this.sortSearch == 2) {
          e.panel.setCellData(e.row, e.col, '(' + no + ')');
        } else {
          e.panel.setCellData(e.row, e.col, '(' + code + ')');
        }
      } else {
        if (this.sortSearch == 2) {
          e.panel.setCellData(e.row, e.col, name + '\n' + '(' + no + ')');
        } else {
          e.panel.setCellData(e.row, e.col, name + '\n' + '(' + code + ')');
        }
      }
    },
    onFormatItemSeikyu(flexGrid, e) {
      e.cell.style.borderRight = styleDefault;
      if (
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col >= 3) ||
        (e.panel == flexGrid.columnHeaders && e.row == 1 && e.col == 13) ||
        e.col == 2 ||
        e.col == 4 ||
        e.col == 6 ||
        e.col == 12 ||
        e.col == 14 ||
        e.col == 17 ||
        e.col == 18 ||
        e.col == 19
      ) {
        e.cell.style.borderRight = boderSolid;
      }
      if (e.panel == flexGrid.columnFooters) {
        e.cell.style.textAlign = styleDefault;
        e.cell.style.fontWeight = styleNormal;
        e.cell.style.backgroundColor = bgClrTotal;
        e.cell.style.borderTop = boderSolid;
        if (e.col < 6) {
          e.cell.style.borderRight = 0;
        } else if (e.col == 6) {
          e.cell.style.fontWeight = styleBold;
        }
        e.cell.style.textAlign = alignRight;
        e.cell.style.justifyContent = alignRight;
        e.cell.style.alignItems = alignRight;
      } else {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = styleDefault;
          e.cell.style.borderBottom = styleDefault;

          e.cell.style.textAlign = styleDefault;
          e.cell.style.fontWeight = styleDefault;

          // 下の行と同じ利用者の場合は下線を非表示化
          if (this.selSvc == 0) {
            if (e.col <= 4 && !tmpitem.istotalrow) {
              e.cell.style.borderBottom = 0;
            } else if (tmpitem.istotalrow) {
              e.cell.style.borderBottom = boderSolid;
              if (e.col == 5) {
                e.cell.style.borderRight = 0;
              } else if (e.col == 6) {
                e.cell.style.textAlign = alignRight;
                e.cell.style.fontWeight = styleBold;
              }
              if (e.col >= 5) {
                e.cell.style.backgroundColor = bgClrMiniTotal;
              }
            }
          }
          if (e.panel == flexGrid.cells) {
            let pretmpitem = null;
            if (e.row > 0) {
              pretmpitem = e.panel.rows[e.row - 1].dataItem;
            }
            if (e.col == 0) {
              e.panel.setCellData(e.row, e.col, styleDefault);
              if (tmpitem.kakuteiflg) {
                if (this.dispTotalOnly == 0) {
                  if (
                    pretmpitem == null ||
                    (pretmpitem != null && pretmpitem.nobk != tmpitem.nobk)
                  ) {
                    this.setImage(e, true);
                  }
                } else {
                  if (tmpitem.istotalrow) {
                    this.setImage(e, true);
                  }
                }
              }
            } else if (e.col == 1) {
              if (this.dispTotalOnly == 0) {
                if (this.selSvc == 0) {
                  if (
                    pretmpitem == null ||
                    (pretmpitem != null && pretmpitem.nobk != tmpitem.nobk)
                  ) {
                    drawListTmpCnt = 1;
                    e.panel.setCellData(e.row, e.col, tmpitem.name);
                  } else {
                    drawListTmpCnt = drawListTmpCnt + 1;
                    if (drawListTmpCnt == 2) {
                      this.setName(e, '', tmpitem.no, tmpitem.code);
                    } else {
                      e.panel.setCellData(e.row, e.col, styleDefault);
                    }
                  }
                } else {
                  this.setName(e, tmpitem.name, tmpitem.no, tmpitem.code);
                  e.panel.rows[e.row].height = 40;
                }
              } else {
                this.setName(e, tmpitem.name, tmpitem.no, tmpitem.code);
                e.panel.rows[e.row].height = 40;
              }
            }
          }

          flexGrid.endUpdate();
        }
      }
    },
    onFormatItemKyufu(flexGrid, e) {
      e.cell.style.borderRight = styleDefault;

      if (
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 2) ||
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 5) ||
        e.col == 1 ||
        e.col == 4 ||
        e.col == 6
      ) {
        e.cell.style.borderRight = boderSolid;
      }

      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = styleDefault;
          e.cell.style.borderBottom = styleDefault;
          e.cell.style.textAlign = styleDefault;

          let tmpPreitem = null;
          if (e.col <= 6) {
            if (e.row > 0) {
              tmpPreitem = e.panel.rows[e.row - 1].dataItem;
            }
            if (
              e.col == 0 &&
              (tmpPreitem == null || tmpitem.no != tmpPreitem.no)
            ) {
              this.setImage(e, true);
            } else if (tmpPreitem != null && tmpitem.no == tmpPreitem.no) {
              if (e.col > 1) {
                if (tmpitem.svc == tmpPreitem.svc) {
                  e.panel.setCellData(e.row, e.col, '', false);
                }
              } else {
                e.panel.setCellData(e.row, e.col, '');
              }
            }
          }

          // 下の行と同じ利用者の場合は下線を非表示化
          let tmpNextitem = null;
          if (e.row < flexGrid.rows.length - 1) {
            tmpNextitem = e.panel.rows[e.row + 1].dataItem;
            if (tmpNextitem != null && tmpitem.no == tmpNextitem.no) {
              if (tmpitem.svc != tmpNextitem.svc) {
                e.cell.style.borderBottom = boderSolid;
              }
              if (e.col <= 6) {
                if (e.col > 1) {
                  if (tmpitem.svc == tmpNextitem.svc) {
                    e.cell.style.borderBottom = 0;
                  }
                } else {
                  e.cell.style.borderBottom = 0;
                }
              }
            } else if (tmpNextitem != null && tmpitem.no != tmpNextitem.no) {
              e.cell.style.borderBottom = boderSolid;
            }
          }
          if (e.col == 1) {
            let tmpPrePreitem = null;
            if (e.row > 1) {
              tmpPrePreitem = e.panel.rows[e.row - 2].dataItem;
            } else {
              tmpPrePreitem = { no: -1 };
            }
            if (tmpPreitem == null) {
              tmpPreitem = { no: 0 };
            }
            if (tmpNextitem == null) {
              tmpNextitem = { no: -2 };
            }
            if (tmpPreitem.no != tmpitem.no && tmpitem.no != tmpNextitem.no) {
              this.setName(e, tmpitem.name, tmpitem.no, tmpitem.code);
              e.panel.rows[e.row].height = 40;
            }
            if (
              tmpPrePreitem.no != tmpPreitem.no &&
              tmpPreitem.no == tmpitem.no
            ) {
              this.setName(e, '', tmpitem.no, tmpitem.code);
            }
            if (tmpPreitem.no != tmpitem.no && tmpitem.no == tmpNextitem.no) {
              e.panel.setCellData(e.row, e.col, tmpitem.name);
            }
          }
          flexGrid.endUpdate();
        }
      }
    },
    itemsSourceChangedSeikyu(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      let total = 0;
      if (flexGrid.hostElement.id == grdNameSeikyu) {
        let propkey = '';
        for (let colIndex = 6; colIndex < colCntSeikyu; colIndex++) {
          if (colIndex == 6) {
            flexGrid.columnFooters.setCellData(0, colIndex, titleTotal);
            continue;
          } else if (colIndex == 7) {
            continue;
          } else if (colIndex >= 8) {
            propkey = 'kyufutani';
          } else if (colIndex == 9) {
            propkey = 'souhiyougaku';
          } else if (colIndex == 10) {
            propkey = 'itiwarisoutougaku';
          } else if (colIndex == 11) {
            propkey = 'riyousyafutan';
          } else if (colIndex == 12) {
            propkey = 'jyougengakuchousei';
          } else if (colIndex == 13) {
            propkey = 'jigyousyagenmen';
          } else if (colIndex == 14) {
            propkey = 'genmenriyousya';
          } else if (colIndex == 15) {
            propkey = 'chouseiriyousya';
          } else if (colIndex == 16) {
            propkey = 'jyougenkanrifutangaku';
          } else if (colIndex == 17) {
            propkey = 'ketteiriyoufutangaku';
          } else if (colIndex == 18) {
            propkey = 'kyufuhi';
          } else if (colIndex == 19) {
            propkey = 'jititaijyosei';
          } else if (colIndex == 20) {
            propkey = 'kyufuhiseikyugaku';
          } else if (colIndex == 21) {
            propkey = 'jippisaneigaku';
          }
          if (this.dispTotalOnly == 0) {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? item[propkey] : 0);
            }, 0);
          } else {
            total = this.viewdata.reduce((prev, item) => {
              return prev + (!item.istotalrow ? 0 : item[propkey]);
            }, 0);
          }
          flexGrid.columnFooters.setCellData(0, colIndex, total);
        }
      }
    },
    itemsSourceChangedKyufu(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    searchClicked() {
      if (this.dispPageType == 0) {
        this.viewdataAll = this.loadData(true);
      } else {
        this.viewkyufudataAll = this.loadData(false);
      }
      this.userFilter();
    },
    loadData(isSeikyu) {
      let tmpviewdata = [];
      let userCount = 102;
      if (isSeikyu) {
        let cnt = 0;
        for (let i = 0; i < userCount; i++) {
          let codeval = String(i).padStart(7, '0');
          let noval = String(
            Math.floor(Math.random() * 10000000000) + 1
          ).padStart(10, '0');
          tmpviewdata.push({
            id: i,
            kakuteiflg: true,
            kakutei: '',
            no: noval,
            nobk: noval,
            kana: 'トウケイタロウ' + i,
            code: codeval,
            dispname: '東経太郎' + i,
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
            tmpviewdata[i].kakuteiflg = true;
          } else if (tmpviewdata[i].usersortorder == 2) {
            tmpviewdata[i].name = tmpviewdata[i - 1].name;
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
            tmpviewdata[i].code = tmpviewdata[i - 1].code;
            tmpviewdata[i].no = tmpviewdata[i - 1].no;
            tmpviewdata[i].nobk = tmpviewdata[i - 1].no;
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
            tmpviewdata[i].name = tmpviewdata[i - 1].name;
            tmpviewdata[i].id = tmpviewdata[i - 1].id;
            tmpviewdata[i].kana = tmpviewdata[i - 1].kana;
            tmpviewdata[i].code = tmpviewdata[i - 1].code;
            tmpviewdata[i].no = tmpviewdata[i - 1].no;
            tmpviewdata[i].nobk = tmpviewdata[i - 1].no;
            tmpviewdata[i].futan = '';
            tmpviewdata[i].riyoucnt = '';
            tmpviewdata[i].nyuincnt = '';
            tmpviewdata[i].svccode = '22';
            tmpviewdata[i].svcname = '生活介護';
            tmpviewdata[i].usersortorder = 1;
          }
        }
      } else {
        let n = '';
        let k = '';
        let s = '';
        let noval = 0;
        let codeval = 0;
        for (let i = 0; i < userCount; i++) {
          var result1 = Number(String(i).substr(-1));
          if (result1 == 0) {
            n = '東経太郎' + i;
            k = 'トウケイタロウ' + i;
            noval = String(
              Math.floor(Math.random() * 10000000000) + 1
            ).padStart(10, '0');
            codeval = String(i).padStart(7, '0');
          }
          if (result1 < 5) {
            s = '32';
          } else {
            s = '22';
          }

          tmpviewdata.push({
            id: i,
            kakuteiflg: true,
            kakutei: '',
            name: n,
            kana: k,
            code: codeval,
            dispsvc: s,
            svc: s,
            symd: new Date('2015', Number('04') - 1, '26'),
            eymd: new Date('2020', Number('04') - 1, '26'),
            dsymd: new Date('2015', Number('04') - 1, '26'),
            deymd: new Date('2020', Number('04') - 1, '26'),
            riyounissuu: '00',
            nyuinnissu: '00',
            svcnaiyou: 'サービス内容ああああああああああああああ' + i,
            no: noval,
            svccode: s + String(i).padStart(4, '0'),
            tani: Number(Math.floor(Math.random() * 10000)),
            kaisu: '00',
            svctani: Number(Math.floor(Math.random() * 20000)),
            tekiyou: '摘要内容○○○○○○○○○○○○○○○○',
          });
        }
      }
      // ★Date型はmonthが0-11で表現されることに注意

      return tmpviewdata;
    },
    pageChange(pageType) {
      ls.setlocalStorageEncript(keyPage, pageType);
      this.dispPageType = pageType;
      if (this.dispPageType == 0) {
        document.getElementById(grdNameSeikyu).style.display = styleBlock;
        document.getElementById(grdNameKyufu).style.display = styleNone;
        this.isBtnDisabled = false;
      } else {
        document.getElementById(grdNameKyufu).style.display = styleBlock;
        document.getElementById(grdNameSeikyu).style.display = styleNone;
        this.isBtnDisabled = true;
      }
    },
    dispTotal(dispType) {
      ls.setlocalStorageEncript(keyTotal, dispType);
      this.dispTotalOnly = dispType;
      if (this.dispTotalOnly == 1) {
        this.selSvc = 0;
        ls.setlocalStorageEncript(keySvc, this.selSvc);
      }
      this.userFilter();
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
    onSvcIndexChanged(s) {
      if (s.selectedIndex != -1) {
        ls.setlocalStorageEncript(keySvc, s.selectedValue);
        this.selSvc = s.selectedValue;
        this.userFilter();
      }
    },
    onSichosonIndexChanged(s) {
      if (s.selectedIndex != -1) {
        ls.setlocalStorageEncript(keySichoson, s.selectedValue);
        this.selSichoson = s.selectedValue;
        this.userFilter();
      }
    },
    userFilter() {
      if (this.dispPageType == 0) {
        this.userFilterSeikyu();
      } else {
        this.userFilterKyufu();
      }
    },
    userFilterSeikyu() {
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
      // 市町村
      if (this.selSichoson != '0') {
        //
      }
      // サービス絞込
      if (this.selSvc != 0) {
        tmpviewdata = tmpviewdata.filter((x) => x.svccode == this.selSvc);
      }

      // 請求額集計のみ
      if (this.dispPageType == 0) {
        if (this.dispTotalOnly == 1) {
          tmpviewdata = tmpviewdata.filter((x) => x.istotalrow);
        }
      }

      //コード順でソート
      if (this.sortSearch == 0) {
        tmpviewdata.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          // 二次キーは各利用者のソートコード
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
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
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
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
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
          }
        });
      }

      this.viewdata = tmpviewdata;
    },
    userFilterKyufu() {
      let tmpviewdata = [];
      let alpval = this.alphaSearch;
      if (alpval > 0) {
        this.viewkyufudataAll.forEach(function (value) {
          // ここでのthisはforeach内のthisに置き換わる
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
        tmpviewdata = this.viewkyufudataAll.concat();
      }
      // 市町村
      if (this.selSichoson != '0') {
        //
      }

      // サービス絞込
      if (this.selSvc != 0) {
        tmpviewdata = tmpviewdata.filter((x) => x.svc == this.selSvc);
      }

      //コード順でソート
      if (this.sortSearch == 0) {
        tmpviewdata.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          // 二次キーは各利用者のサービスコード
          if (a.svccode !== b.svccode) {
            return a.svccode - b.svccode;
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
          if (a.svccode !== b.svccode) {
            return a.svccode - b.svccode;
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
          if (a.svccode !== b.svccode) {
            return a.svccode - b.svccode;
          }
        });
      }
      this.viewkyufudata = tmpviewdata;
    },
    //ヘッダメニューのサービス初回選択 検索ボタン
    parentServiceSelect(serviceArgument) {
      console.log(serviceArgument);
      this.viewdataAll = [];
      this.viewdata = [];
      this.viewkyufudataAll = [];
      this.viewkyufudata = [];
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#KyuhuMeisaiIcrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  min-width: 1266px !important;
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
    label {
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
  .wj-menu {
    width: 200px;
  }
  #seikyuGrid,
  #kyufuGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 98vw;
    min-width: 1320px;
    height: 64vh;
    // max-height: 1080px;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      // 下の4つはセット
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
      height: 10px;
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
  .wj-combobox .wj-input-group input.wj-form-control {
    width: 150px;
    flex-grow: 1;
  }
  .wj-control
    .wj-input-group
    .wj-input-group-btn:last-child:not(:first-child)
    > .wj-btn,
  .wj-viewer
    .wj-control
    .wj-input-group
    .wj-input-group-btn:last-child:not(:first-child)
    > .wj-applybutton {
    border-left: none;
  }
  .wj-control.wj-menu:hover {
    background: #e1e1e1;
    transition: 1s;
  }
}
</style>
