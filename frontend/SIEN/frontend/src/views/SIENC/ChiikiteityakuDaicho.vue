<template>
  <div id="ChiikiteityakuDaicho" class="ma-1" :style="styles">
    <v-row no-gutters class="rowStyle body-2">
      <v-card class="koumokuTitle titleBlueDark wMin" outlined tile>
        入力
      </v-card>
      <v-btn small height="20" class="ml-1">新規</v-btn>
      <v-btn small height="20" class="ml-1">修正</v-btn>

      <v-card class="koumokuTitle titleBlue ml-3 wMin" outlined tile>
        種類
      </v-card>
      <input type="text" class="ml-1" placeholder="地域定着台帳" />
      <v-card class="koumokuTitle titleBlue ml-3" outlined tile>
        適用年月
      </v-card>
      <v-card width="180" height="20" outlined tile @click="inputCalendarClick">
        {{ Ymd }}
        <div class="float-right">
          <v-icon small>mdi-calendar-month</v-icon>
        </div>
      </v-card>
      <v-btn small height="20" class="ml-5">前回コピー</v-btn>
      <v-btn small height="20" class="ml-1">履歴参照</v-btn>
      <v-card class="ml-auto koumokuTitle titleBlue ml-6" outlined tile>
        印刷帳票
      </v-card>
      <v-btn-toggle class="ml-1" mandatory>
        <v-btn small height="20" class="body-2">定着台帳</v-btn>
        <v-btn small height="20" class="body-2">選択項目一覧</v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="3">
        <wj-flex-grid
          id="komokuGrid"
          :itemsSource="komokuView"
          :autoClipboard="false"
          :selectionMode="'1'"
          :headersVisibility="'Column'"
          :autoRowHeights="true"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :initialized="onInitializedKomoku"
        >
          <wj-flex-grid-column
            header="順"
            binding="sort"
            align="center"
            valign="middle"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="項目名"
            binding="item"
            align="center"
            valign="middle"
            width="*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
        <v-row no-gutters>
          <v-btn small height="20">表示順変更</v-btn>
          <v-btn small height="20" class="ml-auto">登録</v-btn>
        </v-row>
      </v-col>
      <v-col cols="4" class="pl-2">
        <wj-flex-grid
          id="basicGrid"
          :itemsSource="basicView"
          :autoClipboard="false"
          :selectionMode="'0'"
          :headersVisibility="'Column'"
          :allowMerging="'All'"
          :initialized="onInitializedBasic"
          :alternatingRowStep="0"
        >
          <wj-flex-grid-column
            header="利用者基本情報"
            binding="no"
            :allowMerging="true"
            align="center"
            valign="middle"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者基本情報"
            binding="status"
            :allowMerging="true"
            align="left"
            valign="middle"
            width="*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者基本情報"
            binding="sort"
            :allowMerging="true"
            valign="middle"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者基本情報"
            binding="name"
            :allowMerging="true"
            align="left"
            valign="middle"
            width="*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="選択"
            binding="select"
            align="center"
            valign="middle"
            :width="50"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
      <v-col cols="5" class="pl-2">
        <wj-flex-grid
          id="assesmentGrid"
          :itemsSource="assesmentView"
          :autoClipboard="false"
          :alternatingRowStep="0"
          :selectionMode="'0'"
          :headersVisibility="'Column'"
          :allowMerging="'All'"
          :autoRowHeights="true"
          :autoGenerateColumns="false"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :initialized="onInitializedAssesment"
        >
          <wj-flex-grid-column
            header="アセスメント"
            binding="no"
            :allowMerging="true"
            align="center"
            valign="middle"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="アセスメント"
            binding="status"
            :allowMerging="true"
            align="left"
            valign="middle"
            width="*"
            :isReadOnly="true"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="アセスメント"
            binding="no2"
            :allowMerging="true"
            valign="middle"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="アセスメント"
            binding="status2"
            :allowMerging="true"
            align="left"
            valign="middle"
            width="*"
            :isReadOnly="true"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="アセスメント"
            binding="no3"
            :allowMerging="true"
            align="right"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="アセスメント"
            binding="status3"
            :allowMerging="true"
            align="left"
            valign="middle"
            width="*"
            :isReadOnly="true"
            :wordWrap="true"
          ></wj-flex-grid-column>

          <wj-flex-grid-column
            header="選択"
            binding="select"
            align="center"
            valign="middle"
            :width="50"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>

    <v-dialog
      v-model="datepicker_dialog"
      width="300"
      content-class="datepicker_dialog_area"
    >
      <v-date-picker
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {},
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  mounted() {
    let komokuView = [];
    // komokuView.push({
    //   sort: 1,
    //   item: '基本情報',
    // });

    this.komokuView = komokuView;

    let basicView = [];
    basicView.push({
      no: 1,
      status: '本人の状態',
      sort: 1,
      name: '基本情報',
      select: '',
    });
    basicView.push({
      no: 1,
      status: '本人の状態',
      sort: 2,
      name: '生活歴',
      select: '',
    });
    basicView.push({
      no: 1,
      status: '本人の状態',
      sort: 3,
      name: '病歴・障害歴',
      select: '',
    });
    basicView.push({
      no: 1,
      status: '本人の状態',
      sort: 4,
      name: '現在受信状況',
      select: '',
    });
    basicView.push({
      no: 1,
      status: '本人の状態',
      sort: 5,
      name: '生活状況',
      select: '',
    });
    basicView.push({
      no: 2,
      status: '家族の状態',
      sort: 1,
      name: '家族情報',
      select: '',
    });
    basicView.push({
      no: 2,
      status: '家族の状態',
      sort: 2,
      name: '介護者情報',
      select: '',
    });
    basicView.push({
      no: 2,
      status: '家族の状態',
      sort: 3,
      name: '住環境',
      select: '',
    });

    this.basicView = basicView;

    let assesmentView = [];
    assesmentView.push({
      no: 1,
      status: '利用者の心身の状況',
      no2: 1,
      status2: '利用者の心身の状況',
      no3: '',
      status3: '',
    });
    assesmentView.push({
      no: 1,
      status: '利用者の心身の状況',
      no2: 1,
      status2: '利用者の心身の状況',
      no3: 1,
      status3: '介護の必要度',
    });
    assesmentView.push({
      no: 1,
      status: '利用者の心身の状況',
      no2: 1,
      status2: '利用者の心身の状況',
      no3: 2,
      status3: '自立の状況',
    });
    assesmentView.push({
      no: 2,
      status: '利用者の置かれている環境',
      no2: ' 1',
      status2: '利用者の置かれている環境',
      no3: '',
      status3: '',
    });
    assesmentView.push({
      no: 3,
      status: '緊急時に必要な連絡先',
      no2: ' 1',
      status2: '緊急時に必要な連絡先',
      no3: '',
      status3: '',
    });

    this.assesmentView = assesmentView;
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  data: function () {
    return {
      datepicker_dialog: false,
      picker: '',
      komokuView: [], // 項目名
      basicView: [], // 基本情報
      assesmentView: [], // アセスメント情報
      itemFlexGrid: [],
      Ymd: dayjs().format('YYYY') + '年' + dayjs().format('MM') + '月',

      headerheight: 120,
    };
  },
  methods: {
    calculateWindowHeight() {
      document.getElementById('komokuGrid').style.height =
        window.innerHeight - this.headerheight + 'px';
      document.getElementById('basicGrid').style.height =
        window.innerHeight - this.headerheight + 'px';
      document.getElementById('assesmentGrid').style.height =
        window.innerHeight - this.headerheight + 'px';
    },
    inputCalendarClick() {
      this.datepicker_dialog = true;
    },
    monthSelect() {
      let split = this.picker.split('-');
      let Ymd = split[0] + '年' + split[1] + '月';
      this.Ymd = Ymd;
      this.datepicker_dialog = false;
    },
    /************************
     * 項目grid
     *************************/
    onInitializedKomoku(flexGrid) {
      //this.komokuView = [];
      this.itemFlexGrid = flexGrid;
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 0) {
            e.cell.style.textAlign = 'right';
          }
          if (e.col == 1) {
            e.cell.style.textAlign = 'left';
          }
        }
      });
    },
    /************************
     * 基本情報grid
     *************************/
    onInitializedBasic(flexGrid) {
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      let _self = this;
      let komokuView = [];
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 4) {
          _self.basicView[ht.row]['select'] =
            _self.basicView[ht.row]['select'] == '〇' ? '' : '〇';
          komokuView = _self.komokuView;
          let sort = komokuView.length + 1;
          komokuView.push({
            sort: sort,
            item: _self.basicView[ht.row]['name'],
          });
          _self.komokuView = komokuView;
          console.log(_self.komokuView);
          _self.itemFlexGrid.itemsSource = [];
          _self.itemFlexGrid.itemsSource = _self.komokuView;
          flexGrid.refresh();
          _self.itemFlexGrid.refresh();
        }
      });

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          }
        }
      });
    },
    /************************
     * アセスメントgrid
     *************************/
    onInitializedAssesment(flexGrid) {
      flexGrid.columnHeaders.rows[0].allowMerging = true;

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 6) {
          _self.assesmentView[ht.row]['select'] =
            _self.assesmentView[ht.row]['select'] == '〇' ? '' : '〇';
          flexGrid.refresh();
        }
      });

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 6) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#ChiikiteityakuDaicho {
  div#assesmentGrid,
  div#basicGrid,
  div#komokuGrid {
    font-size: 12px;
    height: var(--height);
    .wj-cell {
      font-weight: normal;
      background-color: $view_Data_Read_background;
      color: $black;
      &.wj-header {
        background-color: $view_Title_background_Main;
        color: $white;
      }
    }
  }

  div#basicGrid {
    .wj-cell {
      &.wj-header {
        background-color: $view_Title_background_Green;
        color: $black;
        &:nth-child(2) {
          background-color: $light-gray;
        }
      }
    }
  }
  div#assesmentGrid {
    .wj-cell {
      &.wj-header {
        background-color: $light-gray;
        color: $black;
        &:nth-child(1) {
          background-color: $grid_Header_background_Blue;
        }
      }
    }
  }
}
div.datepicker_dialog_area {
  position: absolute;
  top: 50px;
}
</style>
