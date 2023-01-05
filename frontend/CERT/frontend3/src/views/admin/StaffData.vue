<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters>
      <v-col>
        <label class="labeled">所属事業所</label>
        <select v-model="syozokuGroup" class="selectBox ml-1">
          <option v-for="val in groupArray" :key="val.id">
            {{ val.value }}
          </option>
        </select>
      </v-col>
      <v-col class="text-end">
        <v-btn height="24">全事業所一覧参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">アカウントID</label>
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

    <v-row no-gutters class="mt-1 filterHeight">
      <v-col>
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
      <v-col class="justify-end d-flex">
        <label class="labeled pinked min ml-1">権限入力</label>
        <v-btn
          v-for="val in authItem"
          :key="val.id"
          height="24"
          class="ml-1"
          elevation="1"
          >{{ val.text }}</v-btn
        >
        <label class="labeled pinked min ml-1">その他</label>
        <v-btn small class="ml-1" height="24">権限コピー</v-btn>
        <v-btn small class="ml-1" height="24">
          <v-icon small color=""> mdi-message-text </v-icon>
          記号説明
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="true"
        :allowSorting="true"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :binding="columnsAuth.binding"
          :width="48"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-filter
          :initialized="filterInitialized"
          :showFilterIcons="false"
          :filter-columns="this.filterAbled"
        ></wj-flex-grid-filter>
      </wj-flex-grid>
    </v-row>
    <v-row class="mt-1">
      <v-col class="text-end">
        <label class="message"
          >変更内容を保存する場合は登録を行ってください</label
        >
        <v-btn class="ml-2" height="24" elavation="1">キャンセル</v-btn>
        <v-btn class="ml-16" color="blue" height="24">権限登録</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid.filter';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
export default {
  props: [],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    AlphabetButton,
  },
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  data() {
    return {
      selSyokuin: '',
      syozokuGroup: '',
      selFilter: '',
      selected: 0,
      syokuinViewData: [],
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
          value: 'メール',
        },
      ],
      filterAbled: [],
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
          header: 'メール',
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
          header: '利用状況',
          binding: 'accountStatus',
          width: 100,
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
      filtered: {}, // フィルターデータ
      headerheight: 200,
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('syokuinListGrid') != null) {
        document.getElementById('syokuinListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },

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
        mailFlag: '有',
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
        mailFlag: '有',
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
        mailFlag: '有',
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
        mailFlag: '有',
        accountID: 'tokei1000013312345',
        accountStatus: '停止中',
        accountSelected: '',
      });
      syokuinViewData.push({
        syokuinCode: '100003',
        syokuinName: '鎌倉政子',
        syokusyu: '生活指導',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '有',
        accountID: 'tokei1000013312345',
        accountStatus: '仮登録',
        accountSelected: '',
      });
      this.syokuinViewData = syokuinViewData;
      flexGrid.frozenColumns = this.columnArray.length;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
      /*
      flexGrid.addEventListener(flexGrid.hostElement, "click", (e) => {
        // gridをクリックしたイベント
        let ht = flexGrid.hitTest(e);
        let tmp = flexGrid.itemsSource[ht.row];
        console.log(tmp);
      });
      */
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
        if ((e.col == 6 || e.col == 7) && e.row == 1) {
          wijmo.addClass(e.cell, 'vertical-write');
        }
        if (e.col >= 0 && e.col <= 6) {
          wijmo.addClass(e.cell, 'headeraqua');
        }
        if (e.col >= 7 && e.col <= 9) {
          wijmo.addClass(e.cell, 'headerorange');
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
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
        let tmpBefore = [];
        if (e.panel.rows[e.row + 1]) {
          tmpitemAfter = e.panel.rows[e.row + 1].dataItem;
        }
        if (e.panel.rows[e.row - 1]) {
          tmpBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemAfter != null &&
          tmpitem.syokuinCode == tmpitemAfter.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            wijmo.addClass(e.cell, 'borderBottomNone');
          }
        }

        if (
          e.col == 9 &&
          tmpitem.accountStatus == '使用中' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          wijmo.addClass(e.cell, 'setCheckIcon');
        }
        if (
          e.col == 9 &&
          tmpitem.accountStatus == '停止中' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          e.cell.innerHTML = '';
        }

        if (
          e.col == 9 &&
          tmpitem.accountStatus == '仮登録' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          wijmo.addClass(e.cell, 'setCheckIconNone');
        }

        if (e.col < this.columnArray.length - 3) {
          wijmo.addClass(e.cell, 'backgroundYellow');
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
      for (let i = 0; i < this.columnArray.length; i++) {
        if (i <= 6) {
          this.filterAbled.push(this.columnArray[i].binding);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 24px;

div#accountsData {
  font-size: 12px;
  label {
    &.message {
      background-color: $red !important;
      color: $white;
      padding: 5px;
    }
  }

  #alpCommon {
    height: $height;
  }
  #syokuinListGrid {
    .wj-cell {
      &.borderBottomNone {
        border-bottom: 0px;
      }
      &.backgroundYellow {
        background-color: $light-yellow;
      }
      &.setCheckIcon {
        &:before {
          content: url('../../assets/checkIcon.png');
          padding-right: 3px;
          padding-top: 3px;
        }
      }
      &.setCheckIconNone {
        &:before {
          content: url('../../assets/checkIconNone.png');
          padding-right: 3px;
          padding-top: 3px;
        }
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
        &.headeraqua {
          background-color: $light-blue;
        }
      }
    }
  }
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: $height;
    display: inline-block;
    &.pinked {
      background-color: $pink;
      line-height: $height;
      height: $height;
    }
    &.min {
      width: 80px;
    }
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      height: $height;
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

  .filterHeight {
    height: $height;
  }
}
</style>
