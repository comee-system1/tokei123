<template>
  <div id="jyukyuicrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
    ></header-services>

    <v-container class="pa-1" fluid>
      <v-row class="rowStyle" no-gutters>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          利用者
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in userSelList"
            :key="'rbjyukyuicrnuserSel-' + item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbjyukyuicrnuserSel-' + item.val"
              v-model="selUser"
              :value="item.val"
              @change="riyousyaclick()"
            />
            <label
              :for="'rbjyukyuicrnuserSel-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入退所者
        </v-card>

        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in siborikomiSelList"
            :key="'rbjyukyuicrnsiborikomi-' + item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbjyukyuicrnsiborikomi-' + item.val"
              v-model="selSiborikomi"
              :value="item.val"
              @change="riyousyaclick()"
            />
            <label
              :for="'rbjyukyuicrnsiborikomi-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          ソート
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in sortSelList"
            :key="'rbjyukyuicrn-' + item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbjyukyuicrn-' + item.val"
              v-model="sortSearch"
              :value="item.val"
              @change="sortUser(item.val)"
            />
            <label :for="'rbjyukyuicrn-' + item.val" class="customRadio mr-2">
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-spacer></v-spacer>
        <v-btn elevation="2" class="commonBtn" height="19">
          受給者証修正
        </v-btn>
      </v-row>

      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-spacer></v-spacer>
        <v-card class="errorInf pa-0" outlined tile>
          <span style="color: #c93328; font-weight: bold">エラー</span>
          {{ errCnt }} 人 / {{ viewdata.length }} 人中
        </v-card>
      </v-row>

      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="jyukyuIcrnGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="true"
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import HeaderServices from '@/components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import { getConnect } from '../../connect/getConnect';

const STR_MARU = '○';
const TITLE_CHU = '利用者負担';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid';
let SIBORIKOMI_SEARCH2 = 0;

export default {
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      errorcnt: '',
      sortSearch: 0,
      headerList: [
        { dataname: 'err', title: 'エ\nラ\n|', width: 30, align: 'center' },
        {
          dataname: 'codeD',
          title: 'コード',
          width: 70,
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '氏名',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'jyukyunoD',
          title: '受給者証\n番号',
          width: 100,
          align: 'center',
        },
        {
          dataname: 'kofuymdD',
          title: '交付日',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        { dataname: 'engoname', title: '援護者', width: 80, align: 'left' },

        {
          dataname: 'jyukbn',
          title: '受\n給\n者\n区\n分',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jname',
          title: '受給者氏名',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'ssyu',
          title: '障\n害\n種\n別',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'syogaikbn',
          title: '障\n害\n支\n援\n区\n分',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'fjyogen',
          title: '利用者負担\n上限月額',
          width: 70,
          align: 'right',
        },
        {
          dataname: 'jgenkbn',
          title: '上\n限\n管\n理',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jgenknrikbn',
          title: '上限額\n管理事業所',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'jgenryaku',
          title: '上限額\n管理事業所',
          width: 130,
          align: 'left',
        },
        {
          dataname: 'syokujiteikyo',
          title: '食事提供\n体制',
          width: 60,
          align: 'center',
        },
        {
          dataname: 'tokubetukyufu',
          title: '特別\n給付費',
          width: 70,
          align: 'right',
        },
        {
          dataname: 'syokujiteikyo',
          title: '自\n治\n体\n助\n成',
          width: 30,
          align: 'center',
        },
        { dataname: 'syusei', title: '修正', width: 50, align: 'center' },
      ],
      selUser: 0,
      userSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月入所者' },
        { val: 2, name: '今月退所者' },
      ],
      selSiborikomi: 0,
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
      kanaList: [
        { val: 0, name: '全て表示' },
        { val: 1, name: 'ア行' },
        { val: 2, name: 'カ行' },
        { val: 3, name: 'サ行' },
        { val: 4, name: 'タ行' },
        { val: 5, name: 'ナ行' },
        { val: 6, name: 'ハ行' },
        { val: 7, name: 'マ行' },
        { val: 8, name: 'ヤ行' },
        { val: 9, name: 'ラ行' },
        { val: 10, name: 'ワ行' },
      ],
      viewdataAll: [],
      viewdata: [],
      serviceArgument: '', // ヘッダメニューのサービス選択
      initflg: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(ls.KEY.Sort));
    });
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    errCnt() {
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
    calculateWindowHeight() {
      if (document.getElementById('jyukyuIcrnGrid') != null) {
        document.getElementById('jyukyuIcrnGrid').style.height =
          window.innerHeight - 170 + 'px';
      }
    },
    riyousyaclick() {
      this.userFilter();
    },
    onInitializejyukyuIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (
          ht.panel == flexGrid.cells &&
          ht.col == flexGrid.columns.length - 1
        ) {
          if (ht.panel.getCellData(ht.row, ht.col) == STR_MARU) {
            ht.panel.setCellData(ht.row, ht.col, '');
          } else {
            ht.panel.setCellData(ht.row, ht.col, STR_MARU);
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = 70;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 2 || colIndex == 7 || colIndex == 13) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }

        if (colIndex == 0) {
          col.cssClass = STYLE_DEFAULT;
          col.cellTemplate = CellMaker.makeImage();
        }

        if (colIndex == 10 || colIndex == 14) {
          col.format = sysConst.FORMAT.Num;
          // } else if (colIndex == 3) {
          //   col.format = sysConst.FORMAT.Ymd;
        } else {
          col.format = STYLE_DEFAULT;
        }

        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = '';
          if (10 <= colIndex && colIndex <= 15 && rowindex == 0) {
            title = TITLE_CHU;
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
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 10) ||
        e.col == 0 ||
        e.col == 8 ||
        e.col == 9 ||
        e.col == 15
      ) {
        e.cell.style.borderRight = STYLE_BORDER_SOLID;
      }

      if (e.panel == flexGrid.columnHeaders) {
        if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
          // css に scopedをつけると以下のように個別に設定が必要
          // e.cell.style.textAlign = 'center';
          // ヘッダのみ小さくする
          // e.cell.style.fontSize = '12px';
          // e.cell.style.justifyContent = 'center';
          if (e.col == 0) {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundRed;
          } else {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundBlue;
          }
        }
      } else {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = STYLE_DEFAULT;
          e.cell.style.borderBottom = STYLE_DEFAULT;
          if (e.col == flexGrid.columns.length - 1) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          } else if (e.col == 6 || e.col == 7) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          } else if (
            // (e.col == 1 && tmpitem.err) ||
            // (e.col == 2 && tmpitem.err) ||
            // (e.col == 3 && !tmpitem.jyukyuno) ||
            // (e.col == 4 && !tmpitem.kofuymd) ||
            // (e.col == 5 && tmpitem.err && !tmpitem.engoname) ||
            // (e.col == 6 && !tmpitem.jyukbn) ||
            // (e.col == 7 && !tmpitem.jname) ||
            // (e.col == 8 && !tmpitem.ssyu) ||
            // (e.col == 9 && !tmpitem.syogaikbn) ||
            // (e.col == 10 && !tmpitem.fjyogen) ||
            // // (e.col == 11 && !tmpitem.jyougenkanri) ||
            // ((e.col == 12 || e.col == 13) &&
            //   tmpitem.jyougenumuval &&
            //   !tmpitem.jgenkbn) ||
            // (e.col == 14 && tmpitem.jyougenumuval && !tmpitem.syokujiteikyo) ||
            // (e.col == 15 && tmpitem.jyougenumuval && !tmpitem.tokubetukyufu) ||
            // (e.col == 16 && tmpitem.jyougenumuval && !tmpitem.syokujiteikyo)
            tmpitem.err
          ) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
          }

          // 仮想マージ
          // 上の行と同じ利用者の場合は空で表示する
          if (e.row >= 3 && 0 < e.col && e.col <= 2) {
            let tmpPreitem = e.panel.rows[e.row - 1].dataItem;
            if (tmpPreitem != null && tmpitem.intcode == tmpPreitem.intcode) {
              e.cell.innerHTML = '';
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
            if (tmpNextitem != null && tmpitem.intcode == tmpNextitem.intcode) {
              e.cell.style.borderBottom = 0;
            }
          }
        }
      }
    },
    searchClicked() {
      this.viewdataAll = [];
      this.viewdata = [];

      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        tym:
          this.serviceArgument.teikyo_year + this.serviceArgument.teikyo_month,
        // entpriid:'',
        hokbn: 0,
        svcsyucode: 52,
        shibori: 0,
      };
      getConnect('/jyukyu', params, 'DAITYO').then((result) => {
        console.log(12345);
        console.log(result);

        if (result != undefined) {
          this.viewdataAll = result;
          for (let i = 0; i < this.viewdataAll.length; i++) {
            let tmpitem = this.viewdataAll[i];
            if (tmpitem.errkbn == 1) {
              tmpitem.err = require('@/assets/error_20px.png');
            } else {
              tmpitem.err = null;
            }
          }
          this.userFilter();
          // this.screenFlag = true;
        } else {
          alert('検索処理で、エラーが発生しました。');
          // this.screenFlag = false;
        }
      });
    },
    sortUser(sortType) {
      ls.setlocalStorageEncript(ls.KEY.Sort, sortType);
      this.sortSearch = sortType;
      this.userFilter();
    },
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'rkana');

      // 絞込１
      if (this.selUser == 1) {
        // 今月入所
        tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      } else if (this.selUser == 2) {
        // 今月退所
        tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      }
      // 絞込２
      if (SIBORIKOMI_SEARCH2 == 1) {
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
      } else if (SIBORIKOMI_SEARCH2 == 2) {
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
    //ヘッダメニューのサービス初回選択 検索ボタン
    parentServiceSelect(serviceArgument) {
      this.serviceArgument = serviceArgument;
      this.searchClicked();
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
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

  .errorlabel {
    background: transparent;
    color: red;
  }

  div.border-bottom {
    border-bottom: 1px solid red;
    width: 250px;
    label {
      font-size: 0.85em;
    }
  }

  #jyukyuIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    height: 70vh;
    background: $grid_background;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
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
    width: 100px;
    height: 25px;
  }
  div.customCombobox {
    position: relative;
    width: 270px !important;
    height: 25px !important;
    &.customCombobox {
      width: 160px !important;
      div {
        text-align: left;
      }
    }
    .wj-btn.wj-btn-default {
      border-left: none !important;
    }
    &:hover {
      background-color: #e1e1e1;
    }
    &:focus {
      background-color: #fff;
    }
    div * {
      height: 21px !important;
      padding: 0;
      span {
        height: 21px !important;
        margin-top: 8px;
      }
      &.wj-form-control {
        position: absolute;
        top: -3px;
        width: 100%;
        padding-top: 4px;
        padding-left: 2px;
      }
    }
    input {
      height: 25px !important;
    }
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 20px;
  }

  .errorInf {
    text-align: center;
    height: 22px;
    width: 200px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-color: #c93328;
  }
}
.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 20px;
  margin-top: 5px;
}
</style>
