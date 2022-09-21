<template>
  <div id="tantousyaBetuJisseki">
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-row no-gutters>
        <v-container no-gutters fluid class="container pa-0">
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 表示期間 </v-card>
            <v-card
              class="ml-1"
              color="transparent"
              height="100%"
              style="border: none; margin-top: -1px"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="125px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getYm(0) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 mr-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(1)"
              >
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 mr-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(2)"
              >
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card>
            <v-btn class="itemBtn mr-1" @click="searchClicked()"> 検索 </v-btn>
            <v-btn
              class="itemBtn mr-1"
              style="width: 25px"
              @click="filterClrclick()"
            >
              <v-icon small>mdi-filter-off</v-icon>
            </v-btn>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 様式 </v-card>
            <v-btn-toggle class="flex-wrap mr-1" v-model="selYousiki">
              <v-btn
                v-for="n in yousikiList"
                :key="n.val"
                small
                outlined
                @click="grdDispChangeclick(1)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
              担当者
            </v-card>
            <wj-menu
              id="comboFiltersInput"
              class="customCombobox mr-1"
              :itemsSource="tantouist"
              :initialized="initComboFilters"
              :isRequired="true"
              selectedValuePath="val"
              displayMemberPath="name"
              v-model="selTantouId"
            >
              <!-- :itemClicked="onInputClicked" -->
            </wj-menu>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
              表示内容
            </v-card>
            <v-btn-toggle class="flex-wrap mr-1" v-model="selDispNaiyouIndex">
              <v-btn v-for="n in dispNaiyouList" :key="n.val" small outlined>
                <!-- @click="grdDispChangeclick(1)" -->
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row class="ma-0 mt-1" no-gutters>
            <wj-flex-grid
              id="tantousyaBetuJissekiicrnGrid"
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
              :initialized="onInitializeIcrnGrid"
              :formatItem="onFormatItemIcrn"
              :itemsSourceChanging="onItemsSourceChanging"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewData"
            >
              <wj-flex-grid-filter
                :initialized="filterInitialized"
                :filterApplied="filterApplied"
              />
            </wj-flex-grid>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="tantousyaBetuJissekidatepicker1"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { getConnect } from '../../../../connect/getConnect';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {},
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      headerList: [
        {
          dataname: 'tantou',
          title: '担当者',
          chutitle: '',
          kbntitle: '',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'code',
          title: 'コード',
          chutitle: '',
          kbntitle: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          chutitle: '',
          kbntitle: '',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'keiyakuteiketu',
          title: '契約\n締結',
          chutitle: '',
          kbntitle: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'ansakuseiymd',
          title: '作成日',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'yousiki',
          title: '様',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'doui',
          title: '同',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'teisyutu',
          title: '提',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'tantousyakaigi',
          title: '担当者\n会議',
          chutitle: '',
          kbntitle: '計画作成',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'keikakusakuseiymd',
          title: '作成日',
          chutitle: '計画',
          kbntitle: '計画作成',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'keikakudoui',
          title: '同',
          chutitle: '計画',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jissiymd',
          title: '実施日',
          chutitle: '報告書',
          kbntitle: 'モニタリング',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'monitoringdoui',
          title: '同',
          chutitle: '報告書',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'syuukituki',
          title: '終\n期\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'keizoku',
          title: '継',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'henkou',
          title: '変',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'kousin',
          title: '更',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'monitoringtantousyakaigi',
          title: '担当者\n会議',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '2*',
          align: 'center',
        },
      ],
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      targetYm: '',
      picker: '',
      datepicker_dialog_sym: false,
      selYousiki: 0,
      yousikiList: [
        { val: 0, name: '全部' },
        { val: 1, name: '障害者' },
        { val: 2, name: '障害児' },
      ],
      selTantouId: 0,
      tantouist: [{ val: 0, name: '全部' }],
      selDispNaiyouIndex: 0,
      dispNaiyouList: [
        { val: 0, name: '全部' },
        { val: 1, name: '計画作成' },
        { val: 2, name: 'モニタリング' },
        { val: 3, name: '支援内容' },
      ],
      viewDataAll: [],
      viewData: [],
      filter: {},
    };
  },
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    onInitializeIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
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
        if (colIndex == 4 || colIndex == 7) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }
        if (colIndex == 0) {
          col.format = sysConst.FORMAT.Ymd;
        }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.headerList[colIndex].kbntitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.headerList[colIndex].chutitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].chutitle
        );
        flexGrid.columnHeaders.setCellData(
          2,
          colIndex,
          this.headerList[colIndex].title
        );
      }
      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (e.row < flexGrid.rows.length - 1) {
          let tmpitempre = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.ymd.substring(0, 6) != tmpitempre.ymd.substring(0, 6)) {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
        if (
          e.col == 0 ||
          e.col == 1 ||
          e.col == 2 ||
          e.col == 3 ||
          e.col == 10
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
      } else {
        if (
          (e.row == 0 && e.col == 0) ||
          (e.row == 0 && e.col == 1) ||
          (e.row == 0 && e.col == 2) ||
          (e.row == 0 && e.col == 3) ||
          (e.row == 0 && e.col == 4) ||
          (e.row == 1 && e.col == 9) ||
          (e.row == 2 && e.col == 10)
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
        // if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // } else if (e.row == 0 && (e.col == 2 || e.col == 6)) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // }
      }
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    filterApplied(e) {
      this.grdAutoSizeRow(e.grid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    grdDispChangeclick(kbn) {
      console.log(kbn);
      this.setViewData(false);
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pIntcode: this.userInfo.riid,
          pSymd: this.targetYm.format('YYYYMMDD'),
          pEymd: this.targetYm.format('YYYYMMDD'),
          Dspkbn: 0,
        };
        console.log(params);
        getConnect('/Uktk', params, 'SIENT').then((result) => {
          console.log(12345);
          console.log(result);
          this.viewDataAll = result;
          this.userFilter();
          this.screenFlag = false;
        });
      } else {
        this.userFilter();
      }
    },
    userFilter() {
      let tmpviewdata = this.viewDataAll.concat();
      // // 絞込１
      // if (this.selUser == 1) {
      //   // 今月入所
      //   tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      // } else if (this.selUser == 2) {
      //   // 今月退所
      //   tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      // }
      // // 絞込２
      // if (siborikomiSearch2 == 1) {
      //   // !x.koufuymdで空orNullを判定する
      //   tmpviewdata = tmpviewdata.filter(
      //     (x) =>
      //       !x.koufuymd ||
      //       !x.engo ||
      //       !x.jitibangou ||
      //       !x.jyukyukbn ||
      //       !x.jyukyuname ||
      //       !x.syougaisyu ||
      //       !x.syougaisienkbn ||
      //       !x.futanjyougen ||
      //       !x.jyougenkanri ||
      //       !x.syokujiteikyo ||
      //       !x.tokubetukyufu
      //   );
      // } else if (siborikomiSearch2 == 2) {
      //   tmpviewdata = tmpviewdata.concat();
      // }

      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.id < b.id) {
      //       return -1;
      //     }
      //     if (a.id > b.id) {
      //       return 1;
      //     }
      //     // 二次キーは交付日
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //利用者名でソート
      // if (this.sortSearch == 1) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.kana < b.kana) {
      //       return -1;
      //     }
      //     if (a.kana > b.kana) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //受給者番号でソート
      // if (this.sortSearch == 2) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.nobk < b.nobk) {
      //       return -1;
      //     }
      //     if (a.nobk > b.nobk) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      this.viewData = tmpviewdata;
    },
    getYm(outputkbn) {
      if (outputkbn == 0) {
        if (!this.targetYm) {
          this.targetYm = dayjs();
        }
        return (
          this.targetYm.format('YYYY') +
          '年' +
          this.targetYm.format('MM') +
          '月'
        );
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.targetYm = this.targetYm.subtract(1, 'months');
      } else if (kbn == 2) {
        this.targetYm = this.targetYm.add(1, 'months');
      }
      this.picker =
        this.targetYm.format('YYYY') +
        '-' +
        this.targetYm.format('MM') +
        '-' +
        this.targetYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog_sym = true;
      }
    },
    calenderSelect(kbn) {
      if (kbn == 0) {
        this.targetYm = dayjs(this.picker);
        this.datepicker_dialog_sym = false;
      }
    },
    filterClrclick() {
      this.filter.clear();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#tantousyaBetuJisseki {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    display: flex;
    align-items: center;
    width: auto;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_read {
    color: $font_color;
    width: 150px;
    height: 100%;
    text-align: center;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_input {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Input_background;
    padding-top: 2px;
    padding-left: 2px;
  }

  .koumokuData_c {
    width: 280px;
    text-align: center;
    background: $view_Data_Read_background;
    border: none;
  }

  .rowStyle {
    height: 20px;
  }
  .rirekikoumokuTitleMini {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    text-align: center;
    background: $white;
    border: none;
  }
  .v-btn {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    min-height: 19px;
    height: 19px;
  }

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    min-height: 19px;
    height: 19px;
    width: 75px;
  }
  #tantousyaBetuJissekiicrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    height: 82vh;
    width: 98%;
    min-width: 1050px;
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
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }

  .customCombobox {
    position: relative;
    // width: 300px !important;
    height: 20px !important;
    &.customCombobox {
      // width: 160px !important;
      div {
        text-align: left;
      }
    }
    &#comboFiltersKasan {
      width: 250px !important;
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
      height: 18px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 5px;
      }
      &.wj-form-control {
        position: absolute;
        top: -6px;
        width: 100%;
      }
    }
    input {
      height: 20px !important;
    }
  }
}

#tantousyaBetuJissekidatepicker1 {
  position: absolute;
  margin-top: 40px;

  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}

#tantousyaBetuJissekidatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 400px;
}
</style>
