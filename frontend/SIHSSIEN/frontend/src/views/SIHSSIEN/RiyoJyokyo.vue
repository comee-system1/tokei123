<template>
  <div id="RiyoJyokyo">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters class="pa-1" justify="start">
        <v-card class="d-flex" flat tile>
          <label class="label"> 絞込 </label>
          <select v-model="filterSelect" class="filterSelect">
            <option
              v-for="val in filterSelectOption"
              :key="val.id"
              :value="val.value"
            >
              {{ val.value }}
            </option>
          </select>
          <label class="label ml-10"> ソート </label>
          <select v-model="sortSelect" class="filterSelect">
            <option
              v-for="val in sortSelectOption"
              :key="val.id"
              :value="val.value"
            >
              {{ val.value }}
            </option>
          </select>
          <v-btn class="ml-5 filterClear" @click="filterClear()">
            <v-icon dense>mdi-filter-off</v-icon>
          </v-btn>
        </v-card>
        <v-card class="d-flex ml-auto mr-2" flat tile>
          <v-btn small class="button" @click="basicCalc()"
            >基本報酬算定を反映</v-btn
          >
          <v-btn small class="ml-4 button" @click="planAdvice()"
            >計画相談支援より</v-btn
          >
        </v-card>
      </v-row>
      <v-row no-gutters class="ma-1">
        <alphabet-button
          class="mt-1"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-row>
      <v-row no-gutters>
        <wj-flex-grid
          id="flexViewGrid"
          :autoSearch="true"
          :headersVisibility="'Column'"
          :selectionMode="0"
          :initialized="onInitialized"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewData"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="false"
          :allowMerging="'AllHeaders'"
          :formatItem="onFormatItem"
        >
          <wj-flex-grid-filter
            :initialized="filterInitialized"
            :showFilterIcons="false"
          ></wj-flex-grid-filter>
          <wj-flex-grid-column
            v-for="val in gridClumns"
            :key="val.id"
            :binding="val.binding"
            :width="val.width"
            :word-wrap="true"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <v-row no-gutters class="mt-1 justify-end">
        <v-btn small>登録</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.vue2.grid.filter';

import sysConst from '@/utiles/const';
export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      flexGrid: [],
      filtered: [], // フィルターデータ
      serviceViewData: [],
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
      filterSelect: '全員', // 絞込SELECTBOX
      viewData: [], // 表示gridデータ
      viewDataAll: [], // 表示grid全データ
      filterSelectOption: [
        {
          id: 1,
          value: '全員',
        },
      ],
      sortSelect: '契約日順', // ソートSELECTBOX
      sortSelectOption: [
        {
          id: 1,
          value: '契約日順',
        },
      ],
      gridClumns: [
        // gridデータカラム
        {
          id: 1,
          width: 30,
          header: '受給者証切れ',
          binding: 'expired',
        },
        {
          id: 2,
          width: 100,
          header: '受給者番号',
          binding: 'userNumber',
        },
        {
          id: 3,
          width: 120,
          header: '利用者名',
          binding: 'userName',
        },
        {
          id: 4,
          width: 100,
          header: '契約日',
          binding: 'contactDate',
        },
        {
          id: 5,
          width: 40,
          header: '予定月',
          binding: 'planDate',
        },
        {
          id: 6,
          width: 40,
          header: '終期月',
          binding: 'finishDate',
        },
        {
          id: 7,
          width: 30,
          header: '様式',
          binding: 'type',
        },
        {
          id: 8,
          width: 90,
          header: '計画作成日',
          binding: 'makeDate',
        },
        {
          id: 9,
          width: 90,
          header: 'モニタリング実施日',
          binding: 'monitorDate',
        },
      ],
      girdClumnsEdit: [
        {
          top: '基本報酬',
          middle: '計画',
          bottom: 'Ⅰ',
        },
        {
          top: '基本報酬',
          middle: '計画',
          bottom: 'Ⅱ',
        },
        {
          top: '基本報酬',
          middle: 'ﾓﾆﾀﾘﾝｸﾞ',
          bottom: 'Ⅰ',
        },
        {
          top: '基本報酬',
          middle: 'ﾓﾆﾀﾘﾝｸﾞ',
          bottom: 'Ⅱ',
        },
        {
          top: '居宅重複減',
          middle: 'Ⅰ',
          bottom: 'Ⅰ',
        },
        {
          top: '居宅重複減',
          middle: 'Ⅱ',
          bottom: 'Ⅱ',
        },
        {
          top: '居宅重複減',
          middle: '予防',
          bottom: '予防',
        },
        {
          top: '加算項目',
          middle: '得地加算',
          bottom: '得地加算',
        },
        {
          top: '加算項目',
          middle: '初回加算',
          bottom: '初回加算',
        },
        {
          top: '加算項目',
          middle: '初回（訪問）',
          bottom: '初回（訪問）',
        },
        {
          top: '加算項目',
          middle: '退院・退所',
          bottom: '退院・退所',
        },
        {
          top: '加算項目',
          middle: '医療・保育',
          bottom: '医療・保育',
        },
        {
          top: '加算項目',
          middle: '担当者会議',
          bottom: '担当者会議',
        },
        {
          top: '加算項目',
          middle: '入院時情',
          bottom: 'Ⅰ',
        },
        {
          top: '加算項目',
          middle: '入院時情',
          bottom: 'Ⅱ',
        },
        {
          top: '加算項目',
          middle: '居宅介護',
          bottom: '訪会',
        },
        {
          top: '加算項目',
          middle: '居宅介護',
          bottom: '情報',
        },
        {
          top: '加算項目',
          middle: 'モニタリン',
          bottom: 'モニタリン',
        },
        {
          top: '加算項目',
          middle: '集中支援加',
          bottom: '訪問',
        },
        {
          top: '加算項目',
          middle: '集中支援加',
          bottom: '会議開',
        },
        {
          top: '加算項目',
          middle: '集中支援加',
          bottom: '会議参',
        },
        {
          top: '加算項目',
          middle: '地域生活支',
          bottom: '地域生活支',
        },
        {
          top: '加算項目',
          middle: '地域体制強',
          bottom: '地域体制強',
        },
      ],
    };
  },
  mounted() {},
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm(
  //     '編集中のものは保存されませんが、よろしいですか？'
  //   );
  //   if (answer) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
  watch: {},
  methods: {
    /*******************************
     * ヘッダメニューのサービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      if (serviceArgument['search_button']) {
        // ユーザ選択の無効化
        this.$refs.user_list_print.userCheckInvalide();
        this.userDataSelect[0]['riyosyo'] = '';
        this.riid = '';
        this.mainGrid.columns.clear();
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
    },
    /*********************
     * フィルターのクリア
     */
    filterClear() {
      this.filtered.clear();
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {
      let temp = [];
      temp = this.viewDataAll.concat();
      let viewData = this.$refs.alp.alphabetFilter(temp, 'kana');
      this.viewData = new wijmo.CollectionView(viewData);
      this.createFooterTotal(this.flexGrid);
    },
    /***********************:
     *  基本報酬算定を反映
     */
    basicCalc() {
      alert('基本報酬算定');
    },
    /***********************
     *  計画相談支援
     */
    planAdvice() {
      alert('計画相談支援');
    },
    /************************
     * データ表示
     */
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.createHeader(flexGrid);

      let viewData = [];
      viewData.push({
        expired: '',
        userNumber: '11000000158',
        userName: '東経四郎',
        kana: 'ｼﾛｳﾄｳｹｲ',
        contactDate: '2021/03/15',
        planDate: '',
        finishDate: '',
        type: '者',
        makeDate: '2021/07/16',
        monitorDate: '',
        col_9: '〇',
      });
      viewData.push({
        expired: '',
        userNumber: '11000000142',
        userName: '東経花子',
        kana: 'ﾊﾅｺﾄｳｹｲ',
        contactDate: '2021/12/06',
        planDate: '',
        finishDate: '〇',
        type: '者',
        makeDate: '2021/07/19',
        monitorDate: '',
        col_9: '〇',
      });
      viewData.push({
        expired: '',
        userNumber: '11000000542',
        userName: '東経雅子',
        kana: 'ﾏｻｺﾄｳｹｲ',
        contactDate: '2021/11/16',
        planDate: '',
        finishDate: '〇',
        type: '者',
        makeDate: '',
        monitorDate: '2021/07/19',
        col_11: '〇',
      });
      //this.viewData = viewData;
      this.viewDataAll = viewData;
      this.viewData = new wijmo.CollectionView(viewData);
      let _self = this;
      this.viewData.collectionChanged.addHandler(() => {
        _self.createFooterTotal(flexGrid);
      });
      flexGrid.frozenColumns = 9;

      this.createFooter(flexGrid);
      this.createFooterTotal(flexGrid);

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.rows.insert(2, new wjGrid.Row());
      // ヘッダカラム指定
      let i = 0;
      let col = '';
      this.gridClumns.forEach(function (value) {
        if (i == 4 || i == 5) {
          panel.setCellData(0, i, 'ﾓﾆﾀﾘﾝｸﾞ');
          panel.setCellData(1, i, value.header);
          panel.setCellData(2, i, value.header);
        } else {
          panel.setCellData(0, i, value.header);
          panel.setCellData(1, i, value.header);
          panel.setCellData(2, i, value.header);
        }
        col = flexGrid.columns[i];
        col.allowMerging = true;
        i++;
      });
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      let c = 9;
      this.girdClumnsEdit.forEach(function (value) {
        flexGrid.columns.insert(c, new wjGrid.Column());
        panel.setCellData(0, c, value.top);
        panel.setCellData(1, c, value.middle);
        panel.setCellData(2, c, value.bottom);

        col = flexGrid.columns[c];
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;
        col.width = 32;
        col.binding = 'col_' + c;
        c++;
      });
      flexGrid.columnHeaders.rows[0].height = 40;
      flexGrid.columnHeaders.rows[1].height = 20;
      flexGrid.columnHeaders.rows[2].height = 100;
    },
    /******************
     * フッタ情報の作成
     */
    createFooter(flexGrid) {
      var panel = flexGrid.columnFooters;
      panel.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 2, '合計件数');
    },
    createFooterTotal(flexGrid) {
      var panel = flexGrid.columnFooters;
      let makeDateTotal = 0;
      let monitorDateTotal = 0;
      let temp = this.viewData._view;
      for (let i = 0; i < temp.length; i++) {
        makeDateTotal += temp[i].makeDate ? 1 : 0;
        monitorDateTotal += temp[i].monitorDate ? 1 : 0;
      }

      let tempEdit = [];
      let c = 9;
      for (let j = 0; j < this.girdClumnsEdit.length; j++) {
        let cnt = 0;
        let column = 'col_' + c;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i][column]) {
            cnt++;
          }
        }
        tempEdit[column] = cnt ? cnt : '';
        c++;
      }
      panel.setCellData(0, 7, makeDateTotal);
      panel.setCellData(0, 8, monitorDateTotal);
      c = 9;
      for (let j = 0; j < this.girdClumnsEdit.length; j++) {
        let column = 'col_' + c;
        panel.setCellData(0, c, tempEdit[column]);
        c++;
      }
    },
    /************************
     * データ表示
     */
    onItemsSourceChanged() {},
    /************************
     * 表示フォーマット
     */
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.col == 0 || e.col == 6) {
          wijmo.addClass(e.cell, 'verticalCustom');
        }
        if (e.row == 1 && (e.col == 4 || e.col == 5)) {
          wijmo.addClass(e.cell, 'verticalCustom');
        }
        if (e.row == 1 && e.col >= 9) {
          let k = e.col - 8;
          let tmp = this.girdClumnsEdit[k];
          let middle = tmp ? tmp.middle : '';
          let bottom = tmp ? tmp.bottom : '';
          // 2行目と3行目が同じ場合に縦書きのclassを付与
          if (middle == bottom) {
            wijmo.addClass(e.cell, 'verticalCustom');
          }
        }
        // フィルターカラムの非表示設定
        if (e.col == 0 || e.col >= 7) {
          var Nonefilter = this.filtered.getColumnFilter(e.col);
          Nonefilter.filterType = 'None';
        }
        if (e.row == 0) {
          if (e.col == 6) {
            wijmo.addClass(e.cell, 'headBorderTopLeft');
          }
          if (e.col == 7) {
            wijmo.addClass(e.cell, 'headBorderTopMiddle');
          }
          if (e.col == 8) {
            wijmo.addClass(e.cell, 'headBorderTopRight');
          }
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 2) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col >= 9) {
          e.cell.style.textAlign = 'center';
        }
        if (e.col <= 5) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (e.col == 6) {
          wijmo.addClass(e.cell, 'BodyBorderLeft');
        }
        if (e.col == 7) {
          wijmo.addClass(e.cell, 'BodyBorderRight');
        }
        if (e.col == 8) {
          wijmo.addClass(e.cell, 'BodyBorderRight');
        }
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        if (e.col <= 4) {
          e.cell.style.borderRight = '0px';
        } else if (e.col <= 8) {
          e.cell.style.textAlign = 'right';
          e.cell.style.justifyContent = 'right';
          e.cell.style.alignItems = 'right';
        }
        wijmo.addClass(e.cell, 'topDoubleBorder');
        if (e.col == 6) {
          wijmo.addClass(e.cell, 'borderBottomLeft');
        }
        if (e.col == 7) {
          wijmo.addClass(e.cell, 'borderBottomMiddle');
        }
        if (e.col == 8) {
          wijmo.addClass(e.cell, 'borderBottomRight');
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#RiyoJyokyo {
  color: $font_color;
  font-size: 12px;
  min-width: 1300px !important;

  .label {
    background-color: $view_Title_background_Main;
    color: $white;
    width: 60px;
    text-align: center;
    height: 21px;
    line-height: 21px;
  }
  select {
    &.filterSelect {
      border: 1px solid $light-gray;
      width: 180px;
      -webkit-appearance: auto;
    }
  }

  .filterClear {
    height: 20px;
    min-width: 30px;
  }

  .v-btn {
    &.button {
      height: 21px;
    }
  }

  #flexViewGrid {
    width: 1266px;

    .verticalCustom {
      writing-mode: vertical-rl;
    }
    .topDoubleBorder {
      border-top: 3px double $grid_Border_Color;
    }
    .wj-header {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
    }
    .headBorderTopLeft {
      border-top: 2px solid $view_Title_background_Main;
      border-left: 2px solid $view_Title_background_Main;
    }
    .headBorderTopMiddle {
      border-top: 2px solid $view_Title_background_Main;
      border-right: 2px solid $view_Title_background_Main;
    }
    .headBorderTopRight {
      border-top: 2px solid $view_Title_background_Main;
      border-right: 2px solid $view_Title_background_Main;
    }
    .BodyBorderLeft {
      border-left: 2px solid $view_Title_background_Main;
    }
    .BodyBorderRight {
      border-right: 2px solid $view_Title_background_Main;
    }
    .borderBottomLeft {
      border-left: 2px solid $view_Title_background_Main;
      border-bottom: 2px solid $view_Title_background_Main;
    }
    .borderBottomMiddle {
      border-right: 2px solid $view_Title_background_Main;
      border-bottom: 2px solid $view_Title_background_Main;
    }
    .borderBottomRight {
      border-right: 2px solid $view_Title_background_Main;
      border-bottom: 2px solid $view_Title_background_Main;
    }
  }
}
</style>
