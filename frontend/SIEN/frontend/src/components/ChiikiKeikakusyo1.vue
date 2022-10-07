<template>
  <div id="chiikiKeikakusyo1" :style="styles">
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
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="rowStyle_Dark mb-1 mt-1">
            <v-col cols="12" class="d-flex pa-1">
              <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1 lightYellow"
                width="300"
                height="20"
              >
                {{ userName }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-card elevation="0" class="pl-1">
              <v-btn-toggle>
                <v-btn small height="20">新規</v-btn>
                <v-btn small height="20">修正</v-btn>
              </v-btn-toggle>
            </v-card>
            <v-card class="koumokuTitle titleMain mr-1 ml-1 wMin" outlined tile>
              作成日
            </v-card>

            <v-card
              class="ml-1"
              width="140"
              height="20"
              outlined
              tile
              @click="inputCalendarClick(0)"
            >
              {{ getYm }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-card class="koumokuTitle titleOrange ml-1 wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow pl-1 ml-1"
              width="140"
              elevation="0"
              tile
            >
              大正雅夫
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <!-- <v-btn small height="20">利用者基本情報より</v-btn> -->
              <v-btn small height="20">前回コピー</v-btn>
              <v-btn small class="ml-1" height="20">履歴参照</v-btn>
            </v-card>
          </v-row>

          <v-row no-gutters class="mt-1">
            <v-app-bar flat height="24" class="titleBlueDark">
              <v-app-bar-title class="text-caption"
                >利用者の状況</v-app-bar-title
              >
            </v-app-bar>
            <wj-flex-grid
              id="grdRiyosyaJyokyo"
              :alternatingRowStep="0"
              :headersVisibility="'None'"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'None'"
              :isReadOnly="true"
              :initialized="onInitializeGrdRiyosyaJyokyo"
              :itemsSource="viewdataRiyosyaJyokyo"
              class="mt-1 mb-0"
            >
              <wj-flex-grid-column
                binding="title1"
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value1"
                width="4*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="title2"
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value2"
                width="4*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="title3"
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value3"
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="title4"
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value4"
                width="2*"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-app-bar flat height="24" class="titleBlueDark">
              <v-app-bar-title class="text-caption"
                >施設・病院情報</v-app-bar-title
              >
            </v-app-bar>
            <wj-flex-grid
              id="grdSisetuByoinInfo"
              :alternatingRowStep="0"
              :headersVisibility="'None'"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :allowDragging="false"
              :isReadOnly="false"
              :initialized="onInitializeGrdSisetuByoinInfo"
              :itemsSource="viewdataSisetuByoinInfo"
              class="mt-1 mb-0"
            >
              <wj-flex-grid-column
                binding="title1"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value1"
                width="10*"
                :wordWrap="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="title2"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="value2"
                width="6*"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-row>
          <div class="mt-1">
            <v-app-bar flat height="24" class="titleBlueDark">
              <v-app-bar-title class="text-caption"
                >アセスメント</v-app-bar-title
              >
            </v-app-bar>
            <v-row no-gutters class="mt-1">
              <wj-flex-grid
                id="grdAssesJyokyo"
                :alternatingRowStep="0"
                :headersVisibility="'Column'"
                :allowAddNew="false"
                :allowDelete="false"
                :allowPinning="false"
                :allowResizing="false"
                :allowSorting="false"
                :allowDragging="false"
                :isReadOnly="false"
                :autoRowHeights="true"
                :initialized="onInitializeGrdAssesJyokyo"
                :itemsSource="viewdataAssesJyokyo"
                class="mb-0"
              >
                <wj-flex-grid-column
                  binding="value"
                  width="*"
                  :wordWrap="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-row>
            <v-app-bar flat height="24" class="titleBlue mt-1">
              <v-app-bar-title class="caption"
                >2.利用者の置かれている環境</v-app-bar-title
              >
            </v-app-bar>
            <v-textarea
              class="mt-1"
              rows="2"
              no-resize
              outlined
              hide-details="false"
            ></v-textarea>
          </div>
          <v-row dense class="ma-2" justify="space-between">
            <v-col cols="4">
              <v-btn small>削除</v-btn>
            </v-col>
            <v-col cols="7">
              <v-card class="d-flex justify-end" flat tile>
                <v-card
                  class="koumokuTitle titleOrange mt-1 wMin"
                  outlined
                  tile
                >
                  完了
                </v-card>
                <v-card elevation="0" width="30" class="text-center mt-1">
                  <input type="checkbox" />
                </v-card>
                <v-card
                  class="lightYellow pl-1 pt-1 ml-1"
                  width="140"
                  outlined
                  tile
                >
                </v-card>
                <v-btn small class="ml-3">登録</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="chiikiKeikakusyo1Datepicker"
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
import UserList from './UserList.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  components: {
    UserList,
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
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      picker: '',
      datepicker_dialog: false,
      getYm:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      headerheight: 100,
      viewdataRiyosyaJyokyo: [
        {
          title1: '氏　名',
          value1: '1',
          title2: '生年月日',
          value2: '2',
          title3: '年　齢',
          value3: '3',
          title4: '性　別',
          value4: '4',
        },
        {
          title1: '住　所',
          value1: '5',
          title3: '電話番号①',
          value3: '6',
        },
        {
          title3: '電話番号②',
          value3: '7',
        },
        {
          title1: 'メールアドレス',
          value1: '8',
          title3: '携帯番号',
          value3: '9',
        },
        {
          title1: '携帯メール',
          value1: '10',
          title3: 'ＦＡＸ番号',
          value3: '11',
        },
      ],
      viewdataSisetuByoinInfo: [
        {
          title1: '施設・病院名',
          value1: '1',
          title2: '担当者名',
          value2: '2',
        },
        {
          title1: '住　所',
          value1:
            '999-9999\n宮城県あああああああああああああああああ\nいいいいいいいいいいいい',
          title2: '電話番号',
          value2: '4',
        },
        {
          title2: 'ＦＡＸ番号',
          value2: '5',
        },
      ],
      viewdataAssesJyokyo: [
        {
          value: 'aaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('chiikiKeikakusyo1') != null) {
        document.getElementById('chiikiKeikakusyo1').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    inputCalendarClick() {
      this.picker =
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = dayjs(this.picker).format('YYYY年MM月DD日');
      this.datepicker_dialog = false;
    },
    onInitializeGrdRiyosyaJyokyo(flexGrid) {
      this.createMergeGrdRiyosyaJyokyo(flexGrid);

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0 || c == 2 || c == 4 || c == 6) {
            cell.style.textAlign = 'center';
            cell.innerHTML =
              '<div class="v-center">' + cell.innerHTML + '</div>';
            cell.style.backgroundColor =
              sysConst.COLOR.gridHeaderBlueBackground;
          } else {
            cell.style.textAlign = 'left';
            cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
        }
      };
    },
    createMergeGrdRiyosyaJyokyo(flexGrid) {
      let mergeRanges = [];

      mergeRanges.push(new wjGrid.CellRange(1, 0, 2, 0));
      mergeRanges.push(new wjGrid.CellRange(1, 1, 2, 3));
      mergeRanges.push(new wjGrid.CellRange(1, 5, 1, 7));
      mergeRanges.push(new wjGrid.CellRange(2, 5, 2, 7));
      mergeRanges.push(new wjGrid.CellRange(3, 1, 3, 3));
      mergeRanges.push(new wjGrid.CellRange(3, 5, 3, 7));
      mergeRanges.push(new wjGrid.CellRange(4, 1, 4, 3));
      mergeRanges.push(new wjGrid.CellRange(4, 5, 4, 7));

      flexGrid.mergeManager = this.createMerge(mergeRanges);
    },
    onInitializeGrdSisetuByoinInfo(flexGrid) {
      this.createMergeGrdSisetuByoinInfo(flexGrid);

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0 || c == 2) {
            cell.style.textAlign = 'center';
            cell.innerHTML =
              '<div class="v-center">' + cell.innerHTML + '</div>';
            cell.style.backgroundColor =
              sysConst.COLOR.gridHeaderBlueBackground;
            cell.style.color = sysConst.COLOR.fontColor;
          } else {
            cell.style.textAlign = 'left';
          }
        }
      };
    },
    createMergeGrdSisetuByoinInfo(flexGrid) {
      let mergeRanges = [];

      mergeRanges.push(new wjGrid.CellRange(1, 0, 2, 0));
      mergeRanges.push(new wjGrid.CellRange(1, 1, 2, 1));

      flexGrid.mergeManager = this.createMerge(mergeRanges);
    },
    onInitializeGrdAssesJyokyo(flexGrid) {
      let headerpanel = flexGrid.columnHeaders;
      headerpanel.setCellData(0, 0, '1.利用者の心身の状況');

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          cell.style.textAlign = 'left';
          cell.style.color = sysConst.COLOR.viewTitleFontColorBlue;
          cell.style.backgroundColor = sysConst.COLOR.gridHeaderBlueBackground;
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          cell.style.textAlign = 'left';
          cell.innerHTML = '<div class="v-center">' + cell.innerHTML + '</div>';
        }
      };
    },
    createMerge(mergeRanges) {
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < mergeRanges.length; h++) {
            if (mergeRanges[h].contains(r, c)) {
              return mergeRanges[h];
            }
          }
        }
      };
      return mm;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#chiikiKeikakusyo1 {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: 100% !important;

  .wj-cell .v-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    white-space: pre-wrap;
  }

  .v-app-bar-title__content {
    width: 100%;
  }
  .lightYellow {
    background-color: $light_yellow;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    font-size: 12px;
    th {
      background-color: $view_Title_background_Blue;
      text-align: center;
      padding: 4px;
      font-weight: normal;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 80px;
    }
    td {
      background-color: $grid_background;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      width: 160px;
      &.wide {
        width: 400px;
      }
      &.editable {
        background-color: $white;
      }
    }
  }
}
.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense)
  textarea {
  margin-top: 4px;
}

#chiikiKeikakusyo1Datepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
