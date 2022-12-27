<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters>
      <label class="labeled">所属事業所</label>
      <select v-model="syozokuGroup" class="selectBox ml-1">
        <option v-for="val in groupArray" :key="val.id">{{ val.value }}</option>
      </select>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">職員</label>
      <div class="ml-1 boardArea d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, syokuinKey) in syokuinArray"
          :key="`syokuin-${syokuinKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'syokuin_' + item.id"
            :value="item.value"
            name="syokuin"
            v-model="selSyokuin"
          />
          <label :for="'syokuin_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>
      <label class="labeled ml-1">絞込</label>
      <div class="ml-1 boardArea d-flex wMdle">
        <v-card
          class="ml-1 d-flex"
          v-for="(filters, filterIndex) in filterArray"
          :key="`filter-${filterIndex}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'filter_' + filters.id"
            :value="filters.value"
            name="filter"
            v-model="selFilter"
          />
          <label :for="'filter_' + filters.id" class="mt-1 ml-1 mr-2">{{
            filters.value
          }}</label>
        </v-card>
      </div>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="7">
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
      <v-col class="text-end d-flex">
        <label class="labeled pinked min ml-1">権限入力</label>
        <v-btn-toggle v-model="authSelected" mandatory class="ml-1">
          <v-btn
            class="authSelected"
            v-for="val in authItem"
            :key="val.id"
            small
            >{{ val.text }}
          </v-btn>
        </v-btn-toggle>
        <label class="labeled pinked min ml-1">その他</label>
        <v-btn small class="ml-1">権限コピー</v-btn>
        <v-btn small class="ml-1">
          <v-icon small color=""> mdi-message-text </v-icon>
          記号説明
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="true"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="true"
        :formatItem="onFormatItem"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-filter
          :initialized="filterInitialized"
          :showFilterIcons="false"
        ></wj-flex-grid-filter>
        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :binding="columnsAuth.binding"
          :width="48"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid.filter';
export default {
  props: ['keycloak'],
  components: { AlphabetButton },
  mounted() {},
  data() {
    return {
      selSyokuin: '',
      syozokuGroup: '',
      selFilter: '',
      selected: 0,
      syokuinViewData: [],
      authSelected: '',
      groupArray: [
        {
          id: 0,
          value: '',
        },
        {
          id: 1,
          value: '障害者支援施設',
        },
      ],
      syokuinArray: [
        {
          id: 1,
          value: '在職者',
        },
        {
          id: 2,
          value: '登録者',
        },
        {
          id: 3,
          value: '勤務修了者',
        },
        {
          id: 4,
          value: '全員',
        },
      ],
      filterArray: [
        {
          id: 1,
          value: '全員',
        },
        {
          id: 2,
          value: 'アカウント未発行',
        },
        {
          id: 3,
          value: '使用中',
        },
        {
          id: 4,
          value: '停止中',
        },
        {
          id: 5,
          value: 'メール有',
        },
      ],
      columnArray: [
        {
          id: 1,
          header: 'コード',
          binding: 'syokuinCode',
          width: 80,
        },
        {
          id: 2,
          header: '職員名',
          binding: 'syokuinName',
          width: 160,
        },
        {
          id: 3,
          header: '職種',
          binding: 'syokusyu',
          width: 160,
        },
        {
          id: 4,
          header: '所属事業所',
          binding: 'syozokuJigyosyo',
          width: 200,
        },
        {
          id: 5,
          header: '開始日',
          binding: 'startDate',
          width: 100,
        },
        {
          id: 6,
          header: '終了日',
          binding: 'endDate',
          width: 100,
        },
        {
          id: 7,
          header: '退職',
          binding: 'taisyoku',
          width: 40,
        },
        {
          id: 8,
          header: 'メール有',
          binding: 'mailFlag',
          width: 40,
        },
        {
          id: 9,
          header: 'ID',
          binding: 'accountID',
          width: 140,
        },
        {
          id: 10,
          header: '状態',
          binding: 'accountStatus',
          width: 60,
        },
        {
          id: 11,
          header: '選択',
          binding: 'accountSelected',
          width: 40,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '事業者情報',
          binding: 'column_1',
        },
        {
          id: 2,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '利用者台帳',
          binding: 'column_2',
        },
        {
          id: 3,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '職員情報',
          binding: 'column_3',
        },
        {
          id: 4,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '電文作成',
          binding: 'column_4',
        },
        {
          id: 5,
          top: 'メニュー権限',
          middle: 'いるか園',
          bottom: '生活支援',
          binding: 'column_5',
        },
        {
          id: 6,
          top: 'メニュー権限',
          middle: 'いるか園',
          bottom: '施設請求',
          binding: 'column_6',
        },
        {
          id: 7,
          top: 'メニュー権限',
          middle: 'GHいるか',
          bottom: '生活支援',
          binding: 'column_7',
        },
        {
          id: 8,
          top: 'メニュー権限',
          middle: 'GHいるか',
          bottom: 'GH請求',
          binding: 'column_8',
        },
      ],
      authItem: [
        { id: 1, text: '一般権限' },
        { id: 2, text: '管理権限' },
        { id: 0, text: 'クリア' },
      ],
      filtered: [], // フィルターデータ
    };
  },
  methods: {
    onAlphabetical() {
      //this.userFilter();
    },
    onInitialized(flexGrid) {
      this.createHeader(flexGrid);

      // itemscourceデータ
      this.syokuinViewData = [];
      let syokuinViewData = [];
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: 'サービス管理責任者',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '〇',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        accountSelected: '',
      });
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: '指導員',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '〇',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        accountSelected: '',
      });
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: '指導員',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '〇',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        accountSelected: '',
      });
      syokuinViewData.push({
        syokuinCode: '100002',
        syokuinName: '平安静香',
        syokusyu: '事務',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '〇',
        accountID: 'tokei1000013312345',
        accountStatus: '停止中',
        accountSelected: '',
      });
      this.syokuinViewData = syokuinViewData;

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
    },
    /*******************************
     * ヘッダ作成
     *******************************/
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.rows.insert(2, new wjGrid.Row());

      for (let i = 0; i < this.columnArray.length; i++) {
        panel.setCellData(0, i, this.columnArray[i].header);
        panel.setCellData(1, i, this.columnArray[i].header);
        panel.setCellData(2, i, this.columnArray[i].header);

        flexGrid.columnHeaders.columns[i].allowMerging = true;
      }
      let col = '';
      let c = this.columnArray.length;
      for (let i = 0; i < this.columnAuthArray.length; i++) {
        panel.setCellData(0, c, this.columnAuthArray[i].top);
        panel.setCellData(1, c, this.columnAuthArray[i].middle);
        panel.setCellData(2, c, this.columnAuthArray[i].bottom);

        col = flexGrid.columnHeaders.columns[c];
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;

        c++;
      }

      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      let str = '';
      for (let i = 3; i <= this.columnArray.length - 1; i++) {
        str = i >= 7 ? 'アカウント管理' : '勤務情報';
        panel.setCellData(0, i, str);
      }
      flexGrid.columnHeaders.rows[2].height = 60;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if ((e.col == 6 || e.col == 7 || e.col == 10) && e.row == 1) {
          wijmo.addClass(e.cell, 'vertical-write');
        }
        if (e.col >= 7 && e.col <= 10) {
          wijmo.addClass(e.cell, 'headerorange');
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
        }

        // フィルターカラムの非表示設定
        if (e.col >= this.columnArray.length - 5) {
          var Nonefilter = this.filtered.getColumnFilter(e.col);
          Nonefilter.filterType = 'None';
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1 || e.col == 2 || e.col == 3 || e.col == 8) {
          e.cell.style.textAlign = 'left';
        }

        // 上下のセルを比べて同じ場合に下のセルを消す
        let tmpitem = [];
        if (e.panel.rows[e.row]) {
          tmpitem = e.panel.rows[e.row].dataItem;
        }
        let tmpitemBefore = [];
        if (e.panel.rows[e.row - 1]) {
          tmpitemBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemBefore != null &&
          tmpitem.syokuinCode == tmpitemBefore.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            e.cell.innerHTML = '';
          }
        }

        // 上下のセルを比べて同じ場合に上のセルの下線を消す
        let tmpitemAfter = [];
        if (e.panel.rows[e.row + 1]) {
          tmpitemAfter = e.panel.rows[e.row + 1].dataItem;
        }
        if (
          tmpitemAfter != null &&
          tmpitem.syokuinCode == tmpitemAfter.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            wijmo.addClass(e.cell, 'borderBottomNone');
          }
        }
        if (e.col == 9 && tmpitem.accountStatus == '停止中') {
          e.cell.style.color = 'red';
        }
        if (e.col < this.columnArray.length - 4) {
          wijmo.addClass(e.cell, 'backgroundYellow');
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#accountsData {
  font-size: 12px;
  #syokuinListGrid {
    .wj-cell {
      &.borderBottomNone {
        border-bottom: 0px;
      }
      &.backgroundYellow {
        background-color: $light-yellow;
      }
    }
    .wj-header {
      &.wj-cell {
        display: flex;
        justify-content: center;
        align-items: center;

        &.vertical-write {
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
        }
        &.headerpink {
          background-color: $pink;
        }
        &.headerorange {
          background-color: $grid_Total_Header_Background;
        }
      }
    }
  }
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: 28px;
    &.pinked {
      background-color: $pink;
    }
    &.min {
      width: 80px;
    }
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      width: 300px;
      &.short {
        width: 140px;
      }
    }
  }
  .boardArea {
    border: 1px solid $light-gray;
    width: 300px;
    &.wMdle {
      width: 450px;
    }
  }
}
</style>
