<template>
  <div id="kaigokyufumeisai">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
      :seikyuflag="true"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters>
        <v-col class="leftArea pb-1">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispHideBar="false"
            :headerheight="60"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col class="ml-1 pa-1 pt-0" style="min-width: 700px">
          <v-row>
            <v-col>
              <table class="jyukyusyaTable mt-1">
                <tr>
                  <th>受給者番号</th>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>0</td>
                </tr>
              </table>
              <table class="jyukyusyaTable wlong">
                <tr>
                  <th>支給決定障害者等氏名</th>
                  <td>愛知 二郎太</td>
                </tr>
              </table>
            </v-col>
            <v-col>
              <v-flex class="d-flex justify-end complete mt-1">
                <label>確定済</label>
                <v-card class="ml-1">確定日:R03.08.09 14:19 明治 雅夫</v-card>
              </v-flex>
              <v-flex class="d-flex justify-end complete mt-1">
                <table class="jyukyusyaTable mt-4 wshort">
                  <tr>
                    <th>市町村番号</th>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                  </tr>
                </table>
              </v-flex>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <table class="jyukyusyaTable wlonger">
                <tr>
                  <th class="orenge">指定事業所番号</th>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>0</td>
                </tr>
              </table>
              <table class="jyukyusyaTable wlonger">
                <tr>
                  <th class="orenge">指定事業所番号</th>
                  <td class="textAlignLeft">相談支援センターたんぽぽ</td>
                </tr>
              </table>
            </v-col>
            <v-col>
              <v-flex class="d-flex justify-end complete">
                <table class="jyukyusyaTable mt-1 wmin">
                  <tr>
                    <th class="orenge">地区区域</th>
                    <td>1級地</td>
                  </tr>
                </table>
              </v-flex>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <wj-flex-grid
              id="serviceListGrid"
              :headersVisibility="'All'"
              :selectionMode="3"
              :initialized="onInitializedService"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="serviceViewData"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :allowMerging="true"
              :showMarquee="true"
              :formatItem="onFormatItem"
            >
              <wj-flex-grid-column
                binding="service"
                width="2*"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service1"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service2"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service3"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service4"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service5"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="service6"
                :width="20"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="unit"
                :width="100"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="counter"
                :width="60"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="serviceCount"
                :width="100"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="other"
                width="2*"
                :word-wrap="true"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import UserList from '../../components/UserListKyufu.vue';
import HeaderServices from '../../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
export default {
  props: {},
  components: {
    UserList,
    HeaderServices,
  },
  data() {
    return {
      serviceViewData: [],
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
    };
  },
  mounted() {},

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

    /*****************************
     * ユーザリスト
     ****************************/
    //利用者名 出力
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    onInitializedService(flexGrid) {
      let serviceViewData = [];
      serviceViewData.push({
        service: '利用支援Ⅱ',
        servicecode: '521151',
        unit: 731,
        counter: 1,
        serviceCount: 731,
      });
      serviceViewData.push({
        service: '計画相談特定事業所加算Ⅰ',
        servicecode: '526010',
        unit: 500,
        counter: 1,
        serviceCount: 500,
      });
      for (let i = 0; i < serviceViewData.length; i++) {
        let code = serviceViewData[i].servicecode.split('');
        for (let s = 0; s < code.length; s++) {
          let key = 'service' + parseInt(s + 1);
          serviceViewData[i][key] = code[s];
        }
      }
      for (let i = 0; i < 10; i++) {
        serviceViewData.push({
          service: '',
          servicecode: '',
          unit: '',
          counter: '',
          serviceCount: '',
        });
      }

      this.serviceViewData = serviceViewData;
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.columnHeaders && e.row == 0) {
          e.cell.style.textAlign = 'center';
        }
      });
      flexGrid.columnHeaders.rows[0].height = 0;
      flexGrid.rowHeaders.columns[0].width = 26;
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'サービス内容');
      panel.setCellData(0, 1, 'サービスコード');
      panel.setCellData(0, 7, '単位数');
      panel.setCellData(0, 8, '回数');
      panel.setCellData(0, 9, 'サービス単位数');
      panel.setCellData(0, 10, '摘要');

      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 0));
      headerRanges.push(new wjGrid.CellRange(0, 1, 1, 6));
      headerRanges.push(new wjGrid.CellRange(0, 7, 1, 7));
      headerRanges.push(new wjGrid.CellRange(0, 8, 1, 8));
      headerRanges.push(new wjGrid.CellRange(0, 9, 1, 9));
      headerRanges.push(new wjGrid.CellRange(0, 10, 1, 10));

      let rowHeaderRanges = [];
      rowHeaderRanges.push(new wjGrid.CellRange(0, 0, 11, 0));

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let h = 0; h < rowHeaderRanges.length; h++) {
            if (rowHeaderRanges[h].contains(r, c)) {
              return rowHeaderRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      var rowPanel = flexGrid.rowHeaders;
      rowPanel.setCellData(0, 0, '給付絵明細欄');
      console.log(rowPanel);
    },
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        if (e.col == 0 || e.col == 10) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col == 7 || e.col == 8 || e.col == 9) {
          e.cell.style.textAlign = 'right';
        }
      }
      if (e.panel.cellType == wjGrid.CellType.RowHeader) {
        wijmo.addClass(e.cell, 'vertical-write');
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#kaigokyufumeisai {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;

  .service-selection {
    label {
      width: 80px !important;
      display: inline-block;
      margin-right: 0px !important;
      background-color: $deepgreen;
      color: $white;
      text-align: center;
    }
  }

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    height: 100%;
  }
  .jyukyusyaTable {
    border-top: 1px solid $gray;
    border-left: 1px solid $gray;
    border-spacing: 0;
    width: 70%;

    th {
      border-right: 1px solid $gray;
      border-bottom: 1px solid $gray;
      padding: 10px;
      width: 200px;
      background-color: $light-gray;
      color: $view_Title_background_Main;
      font-weight: normal;
      &.orenge {
        background-color: $view_Title_background_Orange;
        color: $view_Title_font_color_Orange;
        padding: 3px;
      }
    }
    td {
      border-right: 1px solid $gray;
      border-bottom: 1px solid $gray;
      text-align: center;
      background-color: $light_yellow;
      &.textAlignLeft {
        text-align: left;
      }
    }

    &.wlonger {
      width: 100%;
    }
    &.wlong {
      width: 90%;
      td {
        text-align: left;
      }
    }
    &.wshort {
      width: 40%;
      th {
        width: 100px;
      }
    }
    &.wmin {
      width: 30%;
      th {
        width: 100px;
      }
    }
  }
  .complete {
    label {
      color: $white;
      background-color: $red;
      padding: 3px;
      width: 80px;
      text-align: center;
    }
    .v-card {
      box-shadow: none;
      padding: 3px;
      background-color: $pink;
      border-radius: 0px;
      width: 60%;
      padding-left: 10px;
    }
  }
  #serviceListGrid {
    .wj-header {
      background-color: $view_Title_background_Green_Dark;
      color: $green;
    }
    .wj-state-multi-selected {
      color: $font_color;
    }
    .vertical-write {
      -ms-writing-mode: tb-rl;
      writing-mode: vertical-rl;
      text-align: center;
    }
  }
}
</style>
