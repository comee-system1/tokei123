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
          :selectionMode="3"
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
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      serviceViewData: [],
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
      filterSelect: '全員', // 絞込SELECTBOX
      viewData: [], // 表示gridデータ
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
          width: 120,
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
          middle: '初回 訪問',
          bottom: '初回 訪問',
        },
        {
          top: '加算項目',
          middle: '退院 退所',
          bottom: '退院 退所',
        },
        {
          top: '加算項目',
          middle: '医療 保育',
          bottom: '医療 保育',
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
    /*********************
     * フィルターのクリア
     */
    filterClear() {
      alert('CLEAR');
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      alert('alphabet');
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
      this.createHeader(flexGrid);

      let viewData = [];
      viewData.push({
        expired: '1',
        userNumber: '11000000158',
        col_9: '〇',
      });
      this.viewData = viewData;

      flexGrid.frozenColumns = 9;
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

      flexGrid.columnHeaders.rows.defaultSize = 45;
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
    .wj-header {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
    }
  }
}
</style>
