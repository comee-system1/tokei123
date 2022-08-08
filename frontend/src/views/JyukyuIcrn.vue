<template>
  <div id="jyukyuicrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle mt-0" no-gutters>
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1">
              <v-icon left dark> mdi-filter-menu-outline </v-icon>
              {{ riyousya }}
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, index) in userSelList" :key="index">
                <v-list-item-title @click="riyousyaclick(item)">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1">
              <v-icon left dark> mdi-filter-menu-outline </v-icon>
              入退所者
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, index) in siborikomiSelList"
                :key="index"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-btn
          class="mr-1"
          style="width: 100px; height: 20px"
          @click="searchClicked"
        >
          <v-icon left dark> mdi-magnify </v-icon>
          検索
        </v-btn>

        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark v-bind="attrs" v-on="on" class="mr-1">
              <v-icon left dark> mdi-sort-alphabetical-ascending </v-icon>
              ソート
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, index) in sortSelList" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1">
              <v-icon left dark> mdi-filter-menu-outline </v-icon>
              カナ絞込
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, index) in kanaList" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-card class="errorInf pa-0" outlined tile>
          <span style="color: red; font-weight: bold">エラー</span>
          {{ errCnt }} 人 / {{ viewdata.length }} 人中
        </v-card>
        <v-btn
          id="btnJyukyu"
          style="width: 100px; height: 20px; position: absolute; left: 1030px"
          >受給者証修正
        </v-btn>

        <!-- <label>利用者</label>
        <wj-menu
          id="comboFilters"
          class="customCombobox"
          :itemsSource="userSelList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selUser"
          :itemClicked="onUserClicked"
        >
        </wj-menu>
        <label class="ml-1">絞込</label>
        <v-btn-toggle class="flex-wrap pa-0" mandatory>
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
        <v-btn
          class="ml-1"
          style="width: 75px; height: 25px"
          @click="searchClicked"
        >
          検索
        </v-btn> -->
      </v-row>

      <!-- <v-row class="rowStyle mt-1" no-gutters>
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
        </v-row> -->
      <v-row class="rowStyle mt-1" no-gutters v-if="false">
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <!-- <div class="border-bottom ma-0 ml-10" style="text-align: center">
          <label class="errorlabel mr-2">
            <b>エラー</b>
          </label>
          <span>{{ errCnt }} 人 / {{ viewdata.length }} 人中</span>
        </div> -->
        <!-- <v-btn
          id="btnJyukyu"
          class="ma-0 ml-10"
          style="width: 100px; height: 25px; position: absolute; left: 990px"
          >受給者証修正
        </v-btn> -->
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
import HeaderServices from '../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import { jyukyuIcrn } from '@backend/api/JyukyuIcrn';

const STR_MARU = '○';
const TITLE_CHU = '利用者負担';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid';
const CMB_ID = 'comboFilters';
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
          dataname: 'no',
          title: '受給者証\n番号',
          width: 100,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '氏名',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'koufuymd',
          title: '交付日',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        { dataname: 'engo', title: '援護者', width: 80, align: 'left' },
        {
          dataname: 'jitibangou',
          title: '助成自治\n体番号',
          width: 60,
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
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'syougaisyu',
          title: '障害\n種別',
          width: 0,
          align: 'center',
        },
        {
          dataname: 'syougaisienkbn',
          title: '障害\n支援\n区分',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'futanjyougen',
          title: '利用者負担\n上限月額',
          width: 70,
          align: 'right',
        },
        {
          dataname: 'jyougenumu',
          title: '上限\n管理',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'jyougenkanrikbn',
          title: '上限額\n管理事業所',
          width: 20,
          align: 'left',
        },
        {
          dataname: 'jyougenkanri',
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
        { dataname: 'syusei', title: '修正', width: 50, align: 'center' },
      ],
      selUser: 0,
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
      riyousya: '利用者',
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(ls.KEY.Sort));
    });
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
    riyousyaclick(item) {
      this.riyousya = '利用者：' + item.name;
    },
    initComboFilters(combo) {
      if (combo.hostElement.id == CMB_ID) {
        combo.header = combo.selectedItem.name;
      }
    },
    onUserClicked(s) {
      s.header = this.userSelList[s.selectedIndex].name;
      this.selUser = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
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
      flexGrid.columnHeaders.rows[1].height = 40;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < 17; colIndex++) {
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
        } else if (colIndex == 3) {
          col.format = sysConst.FORMAT.Ymd;
        } else {
          col.format = STYLE_DEFAULT;
        }

        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = '';
          if (10 <= colIndex && colIndex <= 14 && rowindex == 0) {
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
        e.col == 14
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
        }
      } else {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          // いったんクリアしないと色が残る
          e.cell.style.backgroundColor = STYLE_DEFAULT;
          e.cell.style.borderBottom = STYLE_DEFAULT;

          if (e.col == flexGrid.columns.length - 1) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          } else if (e.col == 6 || e.col == 7) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          } else if (
            (e.col == 1 && tmpitem.err.length > 0) ||
            (e.col == 2 && tmpitem.err.length > 0) ||
            (e.col == 3 && !tmpitem.koufuymd) ||
            (e.col == 4 && !tmpitem.engo) ||
            (e.col == 5 && tmpitem.err.length > 0 && !tmpitem.jitibangou) ||
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
            e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
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
    searchClicked() {
      // 初期データ読込
      jyukyuIcrn().then((result) => {
        // データ取得
        this.viewdataAll = result;
        this.userFilter();
      });
    },
    siborikomiUser2(siborikomiType) {
      SIBORIKOMI_SEARCH2 = siborikomiType;
      this.userFilter();
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
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

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
      console.log(serviceArgument);
      this.viewdataAll = [];
      this.viewdata = [];
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#jyukyuicrn {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .rowStyle {
    height: 20px;
  }
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  .errorlabel {
    background: transparent;
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
    width: 250px;
    label {
      font-size: 0.85em;
    }
  }

  #jyukyuIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: auto;
    // min-width: 1300px;
    height: 77vh;
    // max-width: 100%;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
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
    border-color: red;
    position: absolute;
    left: 800px;
  }
}
.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 20px;
  margin-top: 5px;
}
</style>
