<template>
  <div id="keikakuWeek">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }" class="pr-1">
          <v-row no-gutters class="mt-1">
            <v-card class="d-flex justify-start" flat tile>
              <v-card
                outlined
                tile
                width="60"
                class="text-center label text-caption"
              >
                利用者名
              </v-card>
              <v-card
                width="200"
                class="ml-1 text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                aaa
              </v-card>
              <v-card
                outlined
                tile
                width="60"
                class="ml-1 text-center label text-caption"
              >
                作成日
              </v-card>
              <v-card
                width="100"
                class="ml-1 text-center text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                2022年4月22日
              </v-card>

              <v-card
                outlined
                tile
                width="120"
                class="ml-1 text-center label text-caption"
              >
                週間計画開始年月
              </v-card>
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="140px"
                height="24px"
                class="text-caption ml-1"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-tabs height="25" v-model="inputTypemodel" class="mt-2">
                <v-tab
                  class="text-caption"
                  v-for="value in inputType"
                  :key="value.key"
                  style="height: 25px"
                  :href="'#inputs-' + value.key"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-col cols="6" class="text-end pr-1">
              <v-btn-toggle tile>
                <v-btn small>前回コピー</v-btn>
                <v-btn small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="9">
              <wj-flex-grid
                id="keikakuWeekGrid"
                :selectionMode="'1'"
                :headersVisibility="1"
                :alternatingRowStep="0"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :showBandedRows="false"
                :initialized="onInitialize"
                :itemsSource="viewdata"
              >
                <wj-flex-grid-column
                  :header="' '"
                  binding="times"
                  align="center"
                  valign="middle"
                  width="1.3*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  v-for="val in weekarray"
                  :key="val.header"
                  :header="val.header"
                  :binding="val.binding"
                  align="center"
                  valign="middle"
                  format="g"
                  width="2*"
                  :wordWrap="true"
                  :isReadOnly="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="3" class="pl-1">
              <wj-flex-grid
                id="keikakuItemGrid"
                :selectionMode="'1'"
                :headersVisibility="1"
                :alternatingRowStep="0"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :showBandedRows="false"
                :initialized="onInitializeItem"
                :itemsSource="itemdata"
              >
                <wj-flex-grid-column
                  :header="'日常生活'"
                  binding="every"
                  align="center"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuWeekDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelectWeek"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import UserList from './UserList.vue';

export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
  },
  data() {
    return {
      onflexGrid: '',
      rowCount: 0,
      leftWidth: '280px',
      rightWidth: '80%',
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        moment().format('YYYY') +
        '年' +
        moment().format('MM') +
        '月' +
        moment().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      inputType: [
        {
          key: 1,
          value: '週間予定',
        },
        {
          key: 2,
          value: '主な日常生活等',
        },
      ],
      inputTypemodel: 0,
      keikakuKubunModel: '',
      viewdata: [],

      weekcount: 7,
      weekarray: [
        {
          key: 1,
          header: '月',
          binding: 'monday',
        },
        {
          key: 2,
          header: '火',
          binding: 'thuseday',
        },
        {
          key: 3,
          header: '水',
          binding: 'wednesday',
        },
        {
          key: 4,
          header: '木',
          binding: 'thursday',
        },
        {
          key: 5,
          header: '金',
          binding: 'friday',
        },
        {
          key: 6,
          header: '土',
          binding: 'saturday',
        },
        {
          key: 7,
          header: '日・祝',
          binding: 'sunday',
        },
      ],
      itemdata: [],
      ranges: [],
    };
  },
  created() {},
  mounted() {
    this._makeDragSource(this.onflexGrid);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    _makeDragSource(s) {
      console.log('drag');
      s.addEventListener(
        s.hostElement,
        'mousedown',
        (e) => {
          console.log('mousedown');
          console.log(e);
          //   if (s.hitTest(e).cellType == wjcGrid.CellType.RowHeader) {

          //   }
        },
        true
      );
      s.addEventListener(
        s.hostElement,
        'mouseup',
        (e) => {
          console.log('mouseup');
          console.log(e);
          //this.weekcount = 6;
          this.createRanges();
          // マージする配列の追加
          //console.log(this.ranges);
          //   if (s.hitTest(e).cellType == wjcGrid.CellType.RowHeader) {

          //   }
        },
        true
      );
    },

    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      console.log(row);
      alert('test');
    },
    createData() {
      let setting = [];
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '起床',
        thuseday: '起床',
        wednesday: '起床',
        thursday: '起床',
        friday: '起床',
        saturday: '起床',
        sunday: '起床',
      });
      setting.push({
        monday: 'TVドラマ・朝食',
        thuseday: 'TVドラマ・朝食',
        wednesday: 'TVドラマ・朝食',
        thursday: 'TVドラマ・朝食',
        friday: 'TVドラマ・朝食',
        saturday: 'TVドラマ・朝食',
        sunday: '朝食',
      });
      setting.push({
        monday: 'ゴミ収集',
        thuseday: '',
        wednesday: '',
        thursday: '外出(買い物・銀行・クリーニング等)',
        friday: '',
        saturday: '',
        sunday: '外出(買い物・銀行・クリーニング等)',
      });
      setting.push({
        monday: '',
        thuseday: 'ヘルパー(家事)',
        wednesday: '',
        thursday: '外出(買い物・銀行・クリーニング等)',
        friday: '',
        saturday: '',
        sunday: '外出(買い物・銀行・クリーニング等)',
      });
      setting.push({
        monday: '',
        thuseday: 'ヘルパー(家事)',
        wednesday: '',
        thursday: '外出(買い物・銀行・クリーニング等)',
        friday: '',
        saturday: '',
        sunday: '外出(買い物・銀行・クリーニング等)',
      });
      setting.push({
        monday: 'TVドラマ・昼食',
        thuseday: 'TVドラマ・昼食',
        wednesday: 'TVドラマ・昼食',
        thursday: 'TVドラマ・昼食',
        friday: 'TVドラマ・昼食',
        saturday: 'TVドラマ・昼食',
        sunday: '昼食',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '通院同行\n(内科・歯科)',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });

      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '通院同行\n(内科・歯科)',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '夕食',
        thuseday: '夕食',
        wednesday: '夕食',
        thursday: '夕食',
        friday: '夕食',
        saturday: '夕食',
        sunday: '夕食',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      setting.push({
        monday: '',
        thuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      });
      this.viewdata = setting;

      let item = [];
      item.push(
        {
          id: 1,
          every: '起床',
        },
        {
          id: 2,
          every: '就寝',
        },
        {
          id: 3,
          every: '洗顔・歯磨き',
        },
        {
          id: 4,
          every: '朝食',
        },
        {
          id: 5,
          every: '昼食',
        },
        {
          id: 6,
          every: '夕食',
        },
        {
          id: 7,
          every: 'おやつ',
        },
        {
          id: 8,
          every: '入浴',
        },
        {
          id: 9,
          every: 'テレビを観る',
        }
      );

      this.itemdata = item;
    },
    onInitializeItem(flexGrid) {
      console.log(flexGrid);
    },
    onInitialize(flexGrid) {
      this.onflexGrid = flexGrid;
      flexGrid.frozenColumns = 1;
      this.createData();
      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        flexGrid.cells.rows.defaultSize = 22;
      });
      this.createRanges();
      this.createMerge(flexGrid);
    },
    groupBy(xs, key) {
      let row = 0;
      let i2 = 0;
      let start = [];
      let last = [];
      let text = [];
      for (let i = 0; i < xs.length; i++) {
        i2 = i - 1;
        if (row == 0) {
          if (i - 1 < 0) {
            i = 0;
          } else {
            i = i - 1;
          }
          start.push(i);
          text.push(xs[i][key]);
        } else if (xs[i][key] != xs[i2][key]) {
          last.push(i - 1);
          row = 0;
          continue;
        }
        row++;
      }
      let returns = {
        start: start,
        last: last,
        text: text,
      };
      return returns;
    },
    createRanges() {
      let ranges = [new wjGrid.CellRange(0, 0, this.viewdata.length - 1, 0)];
      let mergeGroup = [];
      let start = [];
      let last = [];
      let text = [];

      for (let wk = 0; wk < this.weekarray.length; wk++) {
        mergeGroup = this.groupBy(this.viewdata, this.weekarray[wk].binding);
        start = mergeGroup.start;
        last = mergeGroup.last;
        text = mergeGroup.text;
        for (let i = 0; i < start.length; i++) {
          if (text[i]) {
            ranges.push(
              new wjGrid.CellRange(
                start[i],
                this.weekarray[wk].key,
                last[i],
                this.weekarray[wk].key
              )
            );
          }
        }
      }

      this.ranges = ranges;
    },
    createMerge(flexGrid) {
      let ranges = this.ranges;
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
    },
    inputCalendarClick() {
      this.picker =
        moment().format('YYYY') +
        '-' +
        moment().format('MM') +
        '-' +
        moment().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelectWeek() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuWeek {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;

  div.label {
    background-color: $light-gray;
  }

  .borderBottom {
    border-bottom: 1px solid $deepgreen;
  }
  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw200 {
    max-width: 200px;
  }
  .wj-frozen {
    background-color: $selected_color;
  }
}

#keikakuWeekDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 280px;
  width: 300px;
  max-width: 300px;
}
</style>
