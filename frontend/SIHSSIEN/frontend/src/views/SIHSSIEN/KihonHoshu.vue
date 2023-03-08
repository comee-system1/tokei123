<template>
  <div id="KihonHoshu">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-card flat tile class="mr-1 text">
        ◆障害児相談支援を一体的に運営している場合、障害児相談支援事業者を指定します
      </v-card>
      <v-card
        no-gutters
        flat
        tile
        class="d-flex ml-1 mb-1"
        height="25"
        width="980"
      >
        <label
          class="koumokuTitle titleBlueDark mr-1 size"
          width="80"
          height="25"
          disabled
          >障害児</label
        >
        <v-btn
          elevation="0"
          outlined
          tile
          disabled
          height="25"
          class="service"
          color="red"
          >{{ jigyosyoCode }}</v-btn
        >
        <v-btn @click="comboClick()" tile outlined height="25" class="service"
          >{{ selectButton }}
          <div class="float-right">▼</div></v-btn
        >
        <v-btn small height="25" class="btn">自動集計</v-btn>
      </v-card>
      <v-row
        no-gutters
        class="mt-1 ml-1"
        style="position: relative; width: 980px"
      >
        <wj-flex-grid
          id="numberingGrid"
          :initialized="onInitialized"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewData"
          :alternatingRowStep="0"
          :autoGenerateColumns="false"
          :headersVisibility="'Column'"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="true"
          :formatItem="onFormatItem"
        >
          <wj-flex-grid-column
            :binding="'itemKbn'"
            :header="' '"
            :allowMerging="true"
            :width="20"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'itemKbn2'"
            :header="' '"
            :allowMerging="true"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month1'"
            :header="' '"
            :allowMerging="true"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month2'"
            :header="' '"
            :allowMerging="true"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month3'"
            :header="' '"
            :allowMerging="true"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month4'"
            :header="' '"
            :allowMerging="true"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month5'"
            :header="' '"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'month6'"
            :header="' '"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'total'"
            :allowMerging="true"
            align="right"
          ></wj-flex-grid-column>
        </wj-flex-grid>
        <div class="mark one">(1)</div>
        <div class="mark two">(2)</div>
      </v-row>
      <v-card no-gutters flat class="d-flex ma-1" height="25" width="980">
        <v-btn small height="25" @click="allClear()">全クリア</v-btn>
        <v-btn small height="25" class="btn">登録</v-btn>
      </v-card>
      <div class="totallingArea ma-1 pa-1">
        <!-- API想定 -->
        <!-- 1 -->
        <v-row class="ma-1" no-gutters>
          <label class="shukeiTitle">①計画相談等支援件数(6ヶ月平均)</label>
          <div>(1)</div>
          <div class="d-flex">
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >328</v-card
            >
            <div class="spacing">／</div>
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >6</v-card
            >
            <div class="spacing">＝</div>
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >54.667</v-card
            >
            <div class="ml-1">A</div>
          </div>
        </v-row>
        <!-- 2 -->
        <v-row class="ma-1" no-gutters>
          <label class="shukeiTitle">②相談支援専門員数(6ヶ月平均)</label>
          <div>(2)</div>
          <div class="d-flex">
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >8</v-card
            >
            <div class="spacing">／</div>
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >6</v-card
            >
            <div class="spacing">＝</div>
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >1.333</v-card
            >
            <div class="ml-1">B</div>
          </div>
        </v-row>
        <!-- 3 -->
        <v-row class="ma-1" no-gutters>
          <label class="shukeiTitle">③標準担当件数</label>
          <div class="ml-3">A</div>
          <div class="d-flex">
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >54.667</v-card
            >
            <div class="spacing">／<span>B</span></div>

            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >1.333</v-card
            >
            <div class="spacing">＝</div>
            <v-card elevation="0" tile class="titleYellow numberBox pr-1"
              >41.000</v-card
            >
            <div class="ml-1">C</div>
          </div>
        </v-row>
        <v-row class="ma-3"></v-row>
        <!-- 4 -->
        <v-row class="ma-1" no-gutters>
          <label class="shukeiTitle fontBlue" height="24"
            >④支援費（Ⅱ）を算出する件数</label
          >
          <div class="text ml-1">
            <p class="ma-0">C≧40</p>
            <v-row no-gutters>
              <div class="d-flex">
                <span class="mr-1">(C</span>
                <v-card
                  elevation="0"
                  tile
                  class="titleYellow numberBox"
                  height="25"
                  >41.000</v-card
                >
                <div class="spacing">ー</div>

                <v-card
                  elevation="0"
                  tile
                  class="titleYellow numberBox"
                  height="25"
                  >39</v-card
                >
                <span class="ml-1">)</span>
                <div class="spacing w65">×<span>B</span></div>
                <v-card
                  elevation="0"
                  tile
                  class="titleYellow numberBox"
                  height="25"
                  >1.333</v-card
                >
                <div class="spacing">＝</div>
                <div>
                  <v-card elevation="0" tile class="titleYellow numberBox"
                    >2.667</v-card
                  >
                  <p class="ma-0">※小数点以下切り捨て</p>
                </div>
                <div class="spacing">⇒</div>
                <v-card
                  elevation="0"
                  tile
                  class="titleYellow border numberBox"
                  height="25"
                  >2</v-card
                >
                <div>件</div>
              </div>
            </v-row>
          </div>
        </v-row>
      </div>
    </v-container>
    <!-- ダイアログ -->
    <v-dialog
      v-model="header_dialog"
      width="600"
      content-class="header_dialogs"
      persistent
      no-click-animation
    >
      <v-card class="pa-2">
        <v-container>
          <v-btn
            elevation="2"
            icon
            small
            absolute
            top
            right
            @click="header_dialog_close()"
            class="closeButton"
            color="secondary"
            ><v-icon dark small> mdi-close </v-icon></v-btn
          >
          <wj-flex-grid
            :itemsSource="jimusyoData"
            :headersVisibility="'Column'"
            :initialized="onInitializedJimusyo"
            :autoClipboard="false"
            :selectionMode="3"
            :selecte="-1"
            :isReadOnly="true"
            :allowDragging="false"
            :allowResizing="false"
            :deferResizing="false"
            :allowSorting="false"
          >
            <wj-flex-grid-column
              header="事務所番号"
              binding="jimusyoBango"
              width="2*"
              format="N0"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="サービス事業所名"
              binding="serviceJigyo"
              width="4*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="提供サービス名"
              binding="teikyoService"
              width="3*"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import HeaderServices from '../../components/HeaderServices.vue';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      serviceArgument: '', // ヘッダメニューのサービス選択
      alertMessageFlag: false, // 変更時のアラートメッセージ
      resetDateFlg: false,
      defaultSetting: this.defaultSettings(),
      // 算定Grid
      viewData: [], // itemsSource
      hoshuGrid: {},
      year: dayjs().format('YYYY'),
      month: dayjs().format('MM'),

      // ヘッダタイトル
      leftHeaderKeikaku: [
        { id: 0, header: '計画相談' },
        { id: 1, header2: 'うち計画相談' },
        { id: 2, header2: 'うちモニタリング' },
      ],
      leftHeaderJidou: [
        { id: 0, header: '障害児相談' },
        { id: 1, header2: 'うち計画相談' },
        { id: 2, header2: 'うちモニタリング' },
      ],
      // サービス選択セレクト
      selectServiceKbn: '55: 障害児相談支援',
      serviceKbnLists: [
        { id: 0, value: '52:計画相談' },
        { id: 1, value: '53:地域移行' },
        { id: 3, value: '54:地域定着' },
        { id: 4, value: '55:障害児相談支援' },
      ],
      // サービス選択ダイアログ↓
      header_dialog: false, // 表示フラグ
      jimusyoData: [], // itemsSource
    };
  },
  components: {
    HeaderServices,
  },
  //   mounted() {},
  created: function () {},
  methods: {
    /*******************************
     * サービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument.teikyo_year;
      this.month = serviceArgument.teikyo_month;
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      if (serviceArgument.search_button) {
        this.resetDateFlg = true;
        this.createHeaders(this.hoshuGrid);
      }
    },
    /*******************
     * 提供サービス選択
     */
    comboClick: function () {
      this.header_dialog = true;
    },
    header_dialog_close: function () {
      this.header_dialog = false;
    },
    // 提供サービス デフォルトデータ
    createJimusyo: function () {
      let data = [];
      let uid = 1;
      let bango = 4;
      data.push({
        uid: uid++,
        jimusyoBango: '1100001230' + bango++,
        serviceJigyo: '相談支援センター たんぽぽ',
        teikyoCode: 55,
        teikyoService: '55:障害児相談支援',
      });
      data.push({
        uid: uid++,
        jimusyoBango: '1112340' + bango++,
        serviceJigyo: '生活介護支援事務所 ひまわり園',
        teikyoCode: 21,
        teikyoService: '21 療養介護',
      });
      data.push({
        uid: uid++,
        jimusyoBango: '1112340' + bango++,
        serviceJigyo: '生活介護支援事務所 ひまわり園',
        teikyoCode: 22,
        teikyoService: '22 生活介護',
      });
      //事業所番号が次のデータと同じ場合に非表示用のフラグを立てる
      let j = -1;
      for (let i = 0; i < data.length; i++) {
        if (data[j] && data[i].jimusyoBango == data[j].jimusyoBango) {
          data[i]['invisibleFlag'] = true;
        }
        j++;
      }
      this.jimusyoData = data;
    },
    onInitializedJimusyo: function (grid) {
      this.createJimusyo();
      //初期選択状態を解除
      grid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      let _self = this;
      grid.hostElement.addEventListener('click', function (e) {
        var ht = grid.hitTest(e);
        ht = grid.hitTest(e.pageX, e.pageY);
        //サービスの文字表示
        _self.jigyosyoCode = _self.jimusyoData[ht.row].jimusyoBango;
        _self.jigyosyoCode += ' ' + _self.jimusyoData[ht.row].serviceJigyo;
        _self.selectButton = _self.jimusyoData[ht.row].teikyoService;

        let returns = {};
        returns = {
          jimusyoBango: _self.jimusyoData[ht.row].jimusyoBango,
          serviceJigyo: _self.jimusyoData[ht.row].serviceJigyo,
          teikyoCode: _self.jimusyoData[ht.row].teikyoCode,
          teikyoService: _self.jimusyoData[ht.row].teikyoService,
        };
        returns['seikyu_year'] = _self.seikyu_year;
        returns['seikyu_month'] = _self.seikyu_month;
        returns['teikyo_year'] = _self.year;
        returns['teikyo_month'] = _self.month;
        returns['search_button'] = false;
        _self.returndata = returns;
        _self.header_dialog = false;
      });
      grid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (_self.jimusyoData[r].invisibleFlag && c == 0) {
            cell.style.color = 'transparent';
          }
        }
      };
    },
    defaultSettings: function () {
      this.jigyosyoCode = '事業者コード・提供サービスを選択してください。';
      this.selectButton = '';
    },
    /*******************
     * 報酬算定グリッド
     */
    onInitialized(flexGrid) {
      this.createHeaders(flexGrid);
      this.hoshuGrid = flexGrid;
      // 計画相談3行 (API想定)
      let viewData = [];
      let keikaku = this.leftHeaderKeikaku;
      for (let i = 0; i < keikaku.length; i++) {
        viewData.push({
          itemKbn: keikaku[i].header,
          itemKbn2: keikaku[i].header2,
          month1: 34,
          month2: 34,
          month3: 31,
          month4: 41,
          month5: 36,
          month6: 29,
          total: 203,
        });
      }
      // 障害児相談3行 (API想定)
      let jidou = this.leftHeaderJidou;
      for (let i = 0; i < jidou.length; i++) {
        viewData.push({
          itemKbn: jidou[i].header,
          itemKbn2: jidou[i].header2,
          month1: 32,
          month2: 34,
          month3: 31,
          month4: 41,
          month5: 36,
          month6: 29,
          total: 203,
        });
      }
      // 対応件数合計(API想定)
      viewData.push({
        itemKbn: '対応件数合計（件）',
        itemKbn2: '',
        month1: 51,
        month2: 53,
        month3: 45,
        month4: 69,
        month5: 60,
        month6: 50,
        total: 328,
      });
      // 相談支援専門員数(API想定)
      viewData.push({
        itemKbn: '相談支援専門員数（人）',
        itemKbn2: '',
        month1: 1,
        month2: 1,
        month3: 1,
        month4: 1,
        month5: 2,
        month6: 2,
        total: 8,
      });
      this.viewData = viewData;
      // セルの非活性化
      flexGrid.beginningEdit.addHandler(function (sender, args) {
        if (args.row == 0 || args.row == 3 || args.row == 6) {
          args.cancel = true;
        } else if (args.col <= 1 || args.col == 8) {
          args.cancel = true;
        } else {
          args.cancel = false;
        }
      });
      flexGrid.startEditing(true);
      flexGrid.imeEnabled = true;
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    /*******************
     * グリッドスタイル
     */
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col >= 2) {
          e.cell.style.textAlign = 'right';
          if (e.row == 0 || e.row == 3 || e.row == 6 || e.col == 8) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.color = sysConst.COLOR.fontColor;
          } else {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
            e.cell.style.color = sysConst.COLOR.fontColor;
          }
        }
        if (e.col <= 1) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
          e.cell.style.color = sysConst.COLOR.fontColor;
        }
        // 枠線の調整
        if ((e.col == 1 && e.row == 1) || (e.col == 1 && e.row == 4)) {
          e.cell.style.borderTop = '1px solid rgba(0,0,0,.2)';
        }
        if ((e.col == 0 && e.row == 1) || (e.col == 0 && e.row == 4)) {
          e.cell.style.borderTop = 'none';
        }
        if ((e.col == 0 && e.row == 0) || (e.col == 0 && e.row == 3)) {
          e.cell.style.borderBottom = 'none';
        }
        // 二重線
        if (e.row == 6 || e.row == 7) {
          wijmo.addClass(e.cell, 'addBorderBouble');
        }
      }
      // 計
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        e.cell.style.display = 'flex';
      }
    },
    /******************
     * ヘッダ情報の作成
     *****************/
    createHeaders(flexGrid) {
      let selectedDate = this.calcYearAndMonth();
      var panel = flexGrid.columnHeaders;
      // 月の上に1行追加
      if (this.resetDateFlg == false) {
        panel.rows.insert(1, new wjGrid.Row());
      }
      // ヘッダ名入力
      panel.setCellData(0, 8, '計');
      panel.setCellData(2, 0, '計画相談');

      // 上部ヘッダの結合
      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 1));
      headerRanges.push(new wjGrid.CellRange(0, 8, 1, 8));

      // 年月ヘッダの結合をここで実装
      let countedYear = selectedDate.count;
      let headerMonths = selectedDate.month;

      // セルの結合・提供年入力
      let start = 2;
      let end = 0;
      Object.keys(countedYear).forEach(function (value) {
        // value = 2022
        panel.setCellData(0, start, value + '年');
        end = start + parseInt(countedYear[value]) - 1;
        headerRanges.push(new wjGrid.CellRange(0, start, 0, end));
        start = start + parseInt(countedYear[value]);
      });

      // 提供月出力
      let start2 = 2;
      headerMonths.map(function (value) {
        panel.setCellData(1, start2, value + '月');
        start2++;
      });

      // 左側ヘッダの結合
      let bodyRanges = [];
      bodyRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      bodyRanges.push(new wjGrid.CellRange(1, 0, 2, 0));
      bodyRanges.push(new wjGrid.CellRange(4, 0, 5, 0));
      bodyRanges.push(new wjGrid.CellRange(3, 0, 3, 1));
      bodyRanges.push(new wjGrid.CellRange(6, 0, 6, 1));
      bodyRanges.push(new wjGrid.CellRange(7, 0, 7, 1));

      // セルをマージ
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /******************
     * 年月 計算
     *****************/
    calcYearAndMonth() {
      // 選択年月を形成
      let ym = dayjs(this.year + '-' + this.month).format('YYYY-MM');

      //6ヶ月前の年月
      let tmp = dayjs(ym).subtract(6, 'M').format('YYYY-MM');
      let year = [];
      let month = [];
      for (let i = 0; i < 6; i++) {
        let y = dayjs(tmp).add(i, 'M').format('YYYY').toString();
        let m = dayjs(tmp).add(i, 'M').format('MM').toString();
        year.push(y);
        month.push(m);
      }
      let count = {};
      for (let j = 0; j < year.length; j++) {
        let elem = year[j];
        count[elem] = (count[elem] || 0) + 1;
      }
      let result = {};
      result = {
        year: year,
        month: month,
        count: count,
      };
      return result;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#KihonHoshu {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  position: relative;
  .size {
    width: 80px;
    height: 25px;
  }
  .text {
    color: $view_Title_background_Blue_Dark;
  }
  .jigyosyo {
    background-color: $white;
    width: 300px;
  }
  select {
    outline: none;
    &.selectServiceKbn {
      border: 1px solid $light-gray;
      width: 180px;
      height: 25px;
      -webkit-appearance: auto;
    }
  }
  // grid style
  #numberingGrid {
    font-size: 12px;
    border: 1px solid $grid_Border_Color;
    max-width: 980px;
    width: 980px;
    position: relative;
    .wj-header {
      font-weight: normal;
      background: $view_Title_background_Blue;
      color: $view_Title_font_color_Blue;
    }
  }
  .addBorderBouble {
    border-top: 3px double $grid_Border_Color;
  }
  .wj-cells.wj-cell.wj-state-selected.wj-state-active {
    color: $font_color;
  }
  .wj-cells {
    input {
      &.wj-grid-editor {
        border: none !important;
      }
    }
  }
  .mark {
    position: absolute;

    left: auto;
    right: -25px;
    z-index: 100;
    &.one {
      bottom: 30px;
    }
    &.two {
      bottom: 5px;
    }
  }

  .btn {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
  }
  // 青枠集計
  .totallingArea {
    background-color: $view_Title_font_color; //white
    position: relative;
    font-size: $dialog_title_fontsize;
    border: 2px solid $view_Title_background_Main;
    width: 1100px;

    .shukeiTitle {
      color: $font_color;
      background: $view_Title_background_Blue !important;
      font-size: 14px;
      width: 220px;
      padding: 1px;
      text-align: left;
      height: 25px;
      &.fontBlue {
        color: $view_Title_font_color_Blue;
      }
    }
    .spacing {
      width: 75px;
      text-align: center;

      &.w65 {
        width: 63px;
      }
    }
    .border {
      border: 2px solid !important;
      border-color: $view_Border_Blue !important;
    }
    span {
      float: right;
    }
    .numberBox {
      border: solid 1px $view_Title_background_Gray;
      padding: 1px;
      width: 80px;
      text-align: right;
    }
  }
  .header_dialogs {
    position: fixed !important;
    top: 0;
    font-size: 14px;
    .wj-control {
      color: $font-color;
    }
    .wj-cell {
      &.wj-state-multi-selected {
        background: $selected_color;
        color: $red;
      }
      &.wj-state-selected {
        background: $selected_color;
        color: $red;
      }
    }

    .closeButton {
      z-index: 100;
      top: 5px;
      right: 5px;
      background-color: $white;
    }
  }
}
</style>