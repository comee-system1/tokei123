<template>
  <div id="assessmentInput">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters>
        <v-col class="leftArea mr-2" style="height: 100%" v-show="userdrawer">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            :headerheight="60"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list>
        </v-col>
        <v-col class="rightArea pa-0">
          <!-- 中央エリア -->
          <v-row no-gutters class="rowStyle_Dark pa-1 pl-0 mb-1">
            <v-row no-gutters class="rowStyle" style="position: relative">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="2"
                    class="mr-1 ml-1"
                    height="19"
                    @click="userdrawerCliked"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon v-if="userdrawer" dense
                      >mdi-account-arrow-left-outline</v-icon
                    >
                    <v-icon v-else dense
                      >mdi-account-arrow-right-outline</v-icon
                    >
                    選択
                  </v-btn>
                </template>
                <span>利用者選択の表示を切替えます</span>
              </v-tooltip>
              <v-card
                class="koumokuTitle titleBlueDark pa-1 mr-1 ml-1"
                outlined
                tile
              >
                利用者名
              </v-card>
              <v-card
                class="koumokuData border mr-1 pb-1 pl-1 pt-0"
                tile
                outlined
                width="200"
              >
                {{ userInfo.riyocode }} {{ userInfo.names }}
              </v-card>
            </v-row>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card elevation="3" height="19" class="mr-1">
              <a class="addBtn" @click="addClick">新規作成</a>
            </v-card>
            <v-card
              class="koumokuTitle titleMain pa-1 mr-1"
              width="50"
              outlined
              tile
            >
              種類
            </v-card>
            <select
              class="customSelectBox wShort mr-1"
              v-model="selKind"
              @change="onKindClicked"
            >
              <option v-for="val in kindList" :key="val.val" :value="val.val">
                {{ val.name }}
              </option>
            </select>
            <v-card
              class="koumokuTitle titleMain pa-1 mr-1"
              width="75"
              outlined
              tile
            >
              作成日
            </v-card>
            <v-card
              class="mr-1"
              color="transparent"
              height="100%"
              style="border: none"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(0)"
                elevation="2"
                tile
                outlined
                width="160px"
                height="100%"
                class="btnymd m-2"
                >{{ getYmd(0) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
            <v-card
              class="koumokuTitle titleMain pa-1 mr-1"
              width="75"
              outlined
              tile
            >
              作成者
            </v-card>
            <v-card class="koumokuData pa-1" width="150" tile outlined>
            </v-card>
            <v-spacer></v-spacer>
            <v-btn
              class="mr-1"
              elevation="2"
              height="100%"
              @click="copyClicked()"
            >
              前回ｺﾋﾟｰ
            </v-btn>
            <v-btn
              height="100%"
              elevation="2"
              v-on:click.stop="drawer = !drawer"
            >
              履歴参照
            </v-btn>
            <v-navigation-drawer
              v-model="drawer"
              fixed
              temporary
              right
              hide-overlay
              :width="200"
              :min-width="200"
              style="font-size: 14px"
            >
              <v-list class="pa-0 ma-0" dense>
                <v-card class="drawerTitle pa-1" outlined tile :height="30">
                  履歴参照
                  <v-btn
                    elevation="2"
                    icon
                    absolute
                    top
                    right
                    height="20"
                    width="20"
                    v-on:click.stop="drawer = !drawer"
                    class="mt-1"
                    color="secondary"
                    ><v-icon dark small> mdi-close </v-icon></v-btn
                  >
                </v-card>
                <template v-for="item in rirekiList">
                  <v-list-item
                    class="pa-0 ma-0"
                    dense
                    :key="`first-${item.index}`"
                    @click="rirekiClicked(item)"
                  >
                    <v-list-item-content class="pa-0 pl-2 ma-0">
                      <table>
                        <tr>
                          <td width="10%" align="center">{{ item.no }}</td>
                          <td width="40%" align="center">{{ item.day }}</td>
                          <td width="10%" align="left">{{ item.kanryou }}</td>
                          <td width="40%" align="left">{{ item.tantou }}</td>
                        </tr>
                      </table>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider :key="`second-${item.index}`" />
                </template>
              </v-list>
            </v-navigation-drawer>
          </v-row>

          <v-row no-gutters>
            <wj-flex-grid
              id="assessmentInputIcrnGrid"
              :headersVisibility="'None'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'None'"
              :allowResizing="false"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Cell'"
              :showMarquee="true"
              :imeEnabled="true"
              :initialized="onInitializeIcrnGrid"
              :formatItem="onFormatItemIcrn"
              :itemsSourceChanging="onItemsSourceChanging"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewData"
            >
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-btn
              class="mr-1"
              elevation="2"
              height="20"
              @click="copyClicked()"
            >
              クリア
            </v-btn>
            <v-btn
              class="mr-1"
              elevation="2"
              height="20"
              @click="copyClicked()"
            >
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn height="20" elevation="2" @click="copyClicked()">
              登録
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <dialog id="modeless_dialog">
      <v-card class="common_modeless_dialog pb-1">
        <v-card-title class="dialog_title mb-1">
          アセスメント未作成
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="modeless_dialogClose"
          class="dialog_close mt-1"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="pl-1">
          アセスメント未作成です。<br />新規作成ボタンから作成してください。
        </v-row>
      </v-card>
    </dialog>
    <v-dialog v-model="createflg" width="350" persistent>
      <v-card class="common_dialog pb-1">
        <v-card-title class="dialog_title mb-1">
          アセスメント 新規作成
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="createflg = false"
          class="dialog_close mt-2"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlueDark pa-1 ml-1 mr-1"
            outlined
            tile
            width="100"
          >
            利用者名
          </v-card>
          <v-card class="koumokuData pl-1" tile outlined width="200">
            {{ userInfo.riyocode }} {{ userInfo.names }}
          </v-card>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1 pl-1">
          <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
            種類
          </v-card>
          <select
            class="customSelectBox wShort hHigh mr-1"
            v-model="selKind"
            @change="onKindClicked"
          >
            <option v-for="val in kindList" :key="val.val" :value="val.val">
              {{ val.name }}
            </option>
          </select>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            作成日
          </v-card>
          <v-card
            class="mr-1"
            color="transparent"
            height="100%"
            style="border: none"
            outlined
            tile
          >
            <v-btn
              @click="inputCalendarClick(0)"
              tile
              outlined
              elevation="2"
              width="150px"
              height="24"
              class="btnymd pa-0"
              style="top: 1px"
              >{{ getYmd() }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
          </v-card>
        </v-row>

        <v-row no-gutters class="rowStyle_Input">
          <v-spacer></v-spacer>
          <v-btn class="mr-1" height="25" @click="copyClicked()">
            新規作成
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="assessmentInputdatepicker"
        v-model="pickersymd"
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
import UserList from '../../components/UserList.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { getConnect } from '../../connect/getConnect';
// const STR_MARU = '○';
// const STYLE_DEFAULT = '';
// const STYLE_BORDER_SOLID = '1px solid black';
// const GRD_FROZEN_ROW = 1;
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UserList,
  },
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      headerList: [],
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      startymd: '',
      pickersymd: '',
      datepicker_dialog: false,
      selInput: 0,
      inputList: [
        { val: 0, name: '新規' },
        { val: 1, name: '修正' },
      ],
      selKind: 0,
      kindList: [
        { val: 0, name: '障害者' },
        { val: 1, name: '障害児' },
        { val: 2, name: 'バーセルインデックス' },
      ],
      rirekiList: [
        {
          index: 0,
          no: 3,
          day: '2020/01/01',
          kanryou: '☐',
          tantou: '担当小',
        },
        {
          index: 1,
          no: 2,
          day: '2019/01/01',
          kanryou: '☑',
          tantou: '担当次',
        },
        {
          index: 2,
          no: 1,
          day: '2018/01/01',
          kanryou: '☑',
          tantou: '担当三',
        },
      ],
      viewDataAll: [],
      viewData: [],
      drawer: false,
      maingrid: {},
      userdrawer: true,
      createflg: false,
    };
  },
  methods: {
    onInitializeIcrnGrid(flexGrid) {
      this.maingrid = flexGrid;
      flexGrid.beginningEdit.addHandler((s, e) => {
        let tmpitem = flexGrid.cells.rows[e.row].dataItem;
        if (
          tmpitem.datakbn == 1 ||
          tmpitem.datakbn == 3 ||
          (tmpitem.datakbn == 4 && e.col == 0)
        ) {
          e.cancel = true;
          return;
        }
      });
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          if (tmpitem.datakbn == 4 && e.target.tagName == 'BUTTON') {
            tmpitem.selSentaku = e.target.value;
            flexGrid.refreshRange(
              new wjGrid.CellRange(ht.row, ht.col, ht.row, ht.col)
            );
          }
        }
      });
      flexGrid.beginUpdate();
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      let tmpitem = e.panel.rows[e.row].dataItem;
      e.cell.style.backgroundColor = '';
      e.cell.style.textAlign = '';
      if (tmpitem.datakbn == 1) {
        e.cell.style.backgroundColor = sysConst.COLOR.gridMiniTotalBackground;
      }
      if (tmpitem.datakbn == 2) {
        e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
      }
      if (tmpitem.datakbn == 3) {
        e.cell.style.textAlign = 'center';
        e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
      }
      if (tmpitem.datakbn == 4) {
        if (e.col > 0) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
        }
        if (e.col == 3) {
          if (tmpitem.selSentaku == 0) {
            e.cell.innerHTML =
              "<button class='grdbtn' value='2' >無</button><br><button class='grdbtn' value='1'>有</button>";
          } else if (tmpitem.selSentaku == 1) {
            e.cell.innerHTML =
              "<button class='grdbtn' value='2' >無</button><br><button class='grdbtn' value='1' style='border-color:red'>有</button>";
          } else {
            e.cell.innerHTML =
              "<button class='grdbtn' value='2' style='border-color:red'>無</button><br><button class='grdbtn' value='1'>有</button>";
          }
        }
      }
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      let ranges = [];
      let tmpitem;
      if (!flexGrid.itemsSource) {
        return;
      }
      for (let i = 0; i < flexGrid.itemsSource.length; i++) {
        tmpitem = flexGrid.itemsSource[i];
        if (tmpitem.datakbn == 1 || tmpitem.datakbn == 2) {
          ranges.push(
            new wjGrid.CellRange(i, 0, i, flexGrid.columns.length - 1)
          );
        }
      }
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
      this.grdAutoSizeRow(flexGrid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    inputChangeclick(kbn) {
      console.log(kbn);
      this.setViewData(false);
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userInfo = row;
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pIntcode: this.userInfo.riid,
          pSrhym: this.startymd.format('YYYYMMDD'),
        };
        getConnect('/AssessmentInput', params, 'SIENT').then((result) => {
          console.log(12345);
          console.log(result);
          // this.viewDataAll = result;
          // this.viewData = this.viewDataAll.concat();
          // this.screenFlag = false;
        });
        this.headerList = [];
        this.headerList.push({
          title: '項目',
          align: 'left',
          width: '*',
          dataname: 'title1',
        });
        this.headerList.push({
          title: '数値',
          align: 'right',
          width: 50,
          dataname: 'title2',
        });
        this.headerList.push({
          title: '点数',
          align: 'right',
          width: 50,
          dataname: 'title3',
        });
        this.headerList.push({
          title: '援助等の有無',
          align: 'left',
          width: '*',
          dataname: 'title4',
        });
        this.headerList.push({
          title: '実態',
          align: 'left',
          width: '*',
          dataname: 'title5',
        });
        this.createGrdHeader();
        this.viewData = this.createData();
      }
    },
    createGrdHeader() {
      this.maingrid.columns.clear();
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        this.maingrid.columns.insert(colIndex, new wjGrid.Column());
        let col = this.maingrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.multiLine = true;
      }
    },
    createData() {
      let result = [];

      result.push({ datakbn: 1, title1: '本人の要望・希望する暮らし' });
      result.push({
        datakbn: 2,
        title1:
          'お母さんが病気になって入院したので、早く良くなってもらって、また一緒に暮らしたい。そして、○○就労移行支援事業所で知り合い仲良しだった友達の△△さんが家を出て一人生活を始めているので、自分も一人楽しく生活をしてみたい。仕事は、どんなことが自分に向いているかわからない。でも、仕事はしてみたい。',
        tokki: true,
      });
      result.push({ datakbn: 1, title1: '1.生活に関する領域' });
      result.push({
        datakbn: 3,
        title1: this.headerList[0].title,
        title2: this.headerList[1].title,
        title3: this.headerList[2].title,
        title4: this.headerList[3].title,
        title5: this.headerList[4].title,
      });
      result.push({
        datakbn: 4,
        title1: '生活費',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        sentakusi: [
          { name: '有', val: 1 },
          { name: '無', val: 2 },
        ],
        selSentaku: 0,
      });
      result.push({
        datakbn: 4,
        title1: '住まい',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        sentakusi: [
          { name: '有', val: 1 },
          { name: '無', val: 2 },
        ],
        selSentaku: 0,
      });
      result.push({
        datakbn: 4,
        title1: '家財道具等',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        sentakusi: [
          { name: '有', val: 1 },
          { name: '無', val: 2 },
        ],
        selSentaku: 0,
      });

      return result;
    },
    getYmd() {
      if (!this.startymd) {
        this.startymd = dayjs();
      }
      return (
        this.startymd.format('YYYY') +
        '年' +
        this.startymd.format('MM') +
        '月' +
        this.startymd.format('DD') +
        '日'
      );
    },
    inputCalendarClick() {
      this.pickersymd =
        this.startymd.format('YYYY') +
        '-' +
        this.startymd.format('MM') +
        '-' +
        this.startymd.format('DD');
      this.datepicker_dialog = true;
    },
    calenderSelect() {
      this.startymd = dayjs(this.pickersymd);
      this.datepicker_dialog = false;
    },

    filterClrclick() {
      this.filter.clear();
    },
    copyClicked(kbn) {
      console.log(kbn);
    },
    onKindClicked() {
      this.selKind = this.kindList[this.selKind].val;
    },
    userdrawerCliked() {
      this.userdrawer = !this.userdrawer;
      let doc = document.getElementsByClassName('rightArea')[0];
      if (this.userdrawer) {
        doc.style.minWidth = '700px';
        doc.style.width = '700px';
      } else {
        doc.style.minWidth = '95%';
        doc.style.width = '95%';
      }
    },
    modeless_dialogOpen() {
      let popup = document.getElementById('modeless_dialog');
      popup.show();
    },
    modeless_dialogClose() {
      let popup = document.getElementById('modeless_dialog');
      popup.close();
    },
    addClick() {
      this.createflg = true;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#assessmentInput {
  color: $font_color;
  font-size: 14px;
  // min-width: 1050px !important;
  // max-width: 1920px;
  min-width: 1330px !important;
  // width: auto;
  .leftArea {
    min-width: 275px;
    max-width: 275px;
    min-height: 450px;
    width: 275px;
  }
  .rightArea {
    width: 1030px;
    min-width: 1030px;
    max-width: 1030px;
  }

  #assessmentInputIcrnGrid {
    min-height: 520px;
    height: 80vh;
    width: 100%;
    min-width: 1000px;
    color: $font_color;
    font-size: $cell_fontsize;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
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
    // .wj-cells
    //   .wj-row:hover
    //   .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    //   transition: all 0s;
    //   background: $grid_hover_background;
    // }

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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }

  .v-application--is-ltr .v-list-item__action:first-child,
  .v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 4px;
  }
  button.grdbtn {
    border: 1px solid $light-gray;
    margin: 0px 1px;
    border-radius: 50%;
    border-color: transparent;
    width: 20px;
    color: $black !important;
    &:hover {
      background-color: $light-gray;
    }
    &:disabled {
      background-color: $light-white;
      color: $light-white;
      opacity: 0.2;
    }

    &.act {
      background-color: $light-gray;
    }
  }
}

#assessmentInputdatepicker {
  position: absolute;
  margin-top: 40px;
  position: fixed !important;
  top: 70px;
  left: 400px;

  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}
</style>
