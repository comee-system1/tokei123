<template>
  <div id="JissekiKiroku">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :seikyuflag="true"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters>
        <v-col class="leftArea pb-1">
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
        <v-col>
          <div class="filterArea mt-1">
            <v-row no-gutters class="d-flex ml-1 mb-1 mt-1">
              <label class="koumokuTitle titleBlueDark" width="80" height="20"
                >利用者</label
              >
              <v-card outlined tile class="text ml-1">{{ username }}</v-card>
              <label
                class="koumokuTitle titleBlueDark ml-1"
                width="80"
                height="20"
                >受給者番号</label
              >
              <v-card outlined tile class="text ml-1">{{ jyukyuno }}</v-card>
            </v-row>
          </div>
          <v-row no-gutters class="mt-1">
            <wj-flex-grid
              id="grid"
              :initialized="onInitialized"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewData"
              :alternatingRowStep="0"
              :autoGenerateColumns="false"
              :headersVisibility="'Column'"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :showMarquee="false"
              :formatItem="onFormatItem"
              :selectionMode="0"
              :style="styles"
            >
            </wj-flex-grid>
            <wj-flex-grid
              v-if="ikosien == teikyoCode"
              id="gridDate"
              class="mt-1"
              :headersVisibility="'Column'"
              :initialized="onInitializedDate"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :showMarquee="false"
              :selectionMode="0"
              :formatItem="onFormatItemDate"
            >
            </wj-flex-grid>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeaderServices from '../../components/HeaderServices.vue';
import '@grapecity/wijmo.vue2.grid.filter';
import dayjs from 'dayjs';
import UserList from '../../components/UserListKyufu.vue';
import * as wjGrid from '@grapecity/wijmo.grid';

import sysConst from '@/utiles/const';

const IKOSIEN = 53;
const TEITYAKUSIEN = 54;
export default {
  props: {},
  components: {
    HeaderServices,
    UserList,
  },
  data() {
    return {
      flexGrid: [],
      serviceArgument: [],
      teikyoCode: 0,
      teityakusien: TEITYAKUSIEN,
      ikosien: IKOSIEN,
      year: '',
      month: '',
      lastdate: '',
      userInfo: '',
      username: '',
      jyukyuno: '',
      userListComponentDatas: [],
      viewData: [],
      headers: [],
      headerheight: 180,
    };
  },
  computed: {
    styles() {
      return { '--height': window.innerHeight - this.headerheight + 'px' };
    },
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('grid') != null) {
        document.getElementById('grid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*******************************
     * サービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument.teikyo_year;
      this.month = serviceArgument.teikyo_month;
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();
      // if (this.flexGrid.itemsSource) {
      //   this.headers = this.getHeaderLists();

      //   console.log(this.headers);
      //   this.createHeaderFooter(this.flexGrid);
      // }
      if (this.flexGrid.itemsSource) {
        //  this.flexGrid.itemsSource = [];
        this.headers = this.getHeaderLists();
        this.flexGrid.columns.clear();
        this.createHeaderFooter(this.flexGrid);
      }
    },
    parentServiceChange() {
      this.notIncluededFlag = false;
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userInfo = row;
      this.username = row.riyocode + ' ' + row.names;
      this.jyukyuno = row.jyukyuno;
      //this.setViewData(true);
    },
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      // ヘッダデータの作成
      this.headers = this.getHeaderLists();

      let tmp = [];
      for (let i = 0; i <= 13; i++) {
        let f = '';
        let d = '';
        if (i == Math.floor(Math.random() * 2)) {
          f = '1';
        }
        if (i == Math.floor(Math.random() * 4)) {
          d = '1';
        }
        tmp.push({
          date: i + 1,
          week: '木',
          calcdate: d,
          serviceStatus: '体験宿泊Ⅱ',
          firstAdd: f,
          areaAdd: f,
          lifeAdd: 2,
          other: '訪問相談',
        });
      }
      this.viewData = tmp;
      this.createHeaderFooter(flexGrid);
    },
    /************************
     * ヘッダデータの取得
     */
    getHeaderLists() {
      let header = [];

      if (this.teikyoCode == 53) {
        header = [
          {
            name: '日付',
            binding: 'date',
            merge: true,
            width: 50,
          },
          {
            name: '曜日',
            binding: 'week',
            merge: true,
            width: 50,
          },
          {
            name: '算定日数',
            binding: 'calcdate',
            merge: false,
            width: 100,
          },
          {
            name: 'サービス提供の状況',
            binding: 'serviceStatus',
            merge: false,
            width: 160,
          },
          {
            name: '初回加算',
            binding: 'firstAdd',
            merge: false,
            width: 50,
          },
          {
            name: '地域住居支援体制強化推進加算',
            binding: 'areaAdd',
            merge: false,
            width: 100,
          },

          {
            name: '備考',
            binding: 'other',
            merge: true,
            width: 300,
          },
        ];
      } else {
        header = [
          {
            name: '日付',
            binding: 'date',
            merge: true,
            width: 50,
          },
          {
            name: '曜日',
            binding: 'week',
            merge: true,
            width: 50,
          },

          {
            name: 'サービス提供の状況',
            binding: 'serviceStatus',
            merge: false,
            width: 160,
          },

          {
            name: '地域住居支援体制強化推進加算',
            binding: 'areaAdd',
            merge: false,
            width: 100,
          },
          {
            name: '日常生活支援情報提供加算',
            binding: 'lifeAdd',
            merge: false,
            width: 100,
          },
          {
            name: '備考',
            binding: 'other',
            merge: true,
            width: 300,
          },
        ];
      }
      return header;
    },
    createHeaderFooter(flexGrid) {
      let headerRanges = [];
      let firstMerge = 0;
      let lastMerge = 0;
      let headers = [...this.headers];
      let reverse = [...this.headers].reverse();
      if (flexGrid.columnHeaders.rows.length <= 1) {
        flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      }
      headers.map(function (value, colIndex) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.binding = value.binding;
        col.width = value.width;
        col.multiLine = true;
        col.wordWrap = true;
        if (value.merge) {
          headerRanges.push(new wjGrid.CellRange(0, colIndex, 1, colIndex));
          flexGrid.columnHeaders.setCellData(0, colIndex, value.name);
        } else {
          flexGrid.columnHeaders.setCellData(1, colIndex, value.name);
        }
        // 最初にmerge=falseになった時
        if (!value.merge && firstMerge == 0) {
          firstMerge = colIndex;
        }
      });
      // 配列の逆順を利用
      reverse.map(function (value, colIndex) {
        // 最初にmerge=falseになった時
        if (!value.merge && lastMerge == 0) {
          lastMerge = colIndex;
        }
      });
      lastMerge = this.headers.length - lastMerge;
      headerRanges.push(new wjGrid.CellRange(0, firstMerge, 0, lastMerge - 1));
      flexGrid.columnHeaders.setCellData(0, firstMerge, '支援実績');

      flexGrid.columnHeaders.rows[1].height = 100;
      if (flexGrid.columnFooters.rows.length <= 0) {
        flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      }
      // 各合計地の計算
      let dayCount = 0;
      let firstCount = 0;
      let areaCount = 0;
      let lifeCount = 0;
      this.viewData.map(function (value) {
        dayCount = dayCount + Number(value.calcdate);
        if (value.lifeAdd) {
          lifeCount++;
        }
        if (value.firstAdd) {
          areaCount++;
        }
        if (value.areaAdd) {
          firstCount++;
        }
      });

      flexGrid.columnFooters.setCellData(0, 0, '合計');
      if (this.teikyoCode == IKOSIEN) {
        flexGrid.columnFooters.setCellData(0, 2, dayCount + '日');
        flexGrid.columnFooters.setCellData(0, 4, firstCount + '回');
        flexGrid.columnFooters.setCellData(0, 5, areaCount + '回');
      }
      if (this.teikyoCode == TEITYAKUSIEN) {
        flexGrid.columnFooters.setCellData(0, 2, '');
        flexGrid.columnFooters.setCellData(0, 3, areaCount + '回');
        flexGrid.columnFooters.setCellData(0, 4, lifeCount + '回');
      }

      let footerRanges = [];
      footerRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      flexGrid.mergeManager = null;
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      let lastCellCount = this.headers.length - 1;
      // サービス提供の状況位置
      let sv = 0;
      this.headers.find((value, k) => {
        if (value.binding == 'serviceStatus') {
          sv = k;
        }
      });

      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.textAlign = 'center';
        // セルの最後の列数を取得
        if (e.col == lastCellCount) {
          e.cell.style.textAlign = 'left';
        }
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        // セルの最後の列数を取得
        if (e.col == lastCellCount || e.col <= 1) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrangeDark;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      } else if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        // セルの最後の列数を取得
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        e.cell.style.textAlign = 'right';
        if (e.col <= 1) {
          e.cell.style.textAlign = 'center';
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrangeDark;
        } else if (e.col == sv) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundGray;
        } else if (e.col == lastCellCount) {
          e.cell.style.display = 'none';
        }
        e.cell.style.borderTop = '1px solid #ccc';
      }
    },
    onInitializedDate(dateGrid) {
      let w = [200, 160, 150, 150, 150];
      for (let i = 0; i <= 4; i++) {
        dateGrid.columns.insert(i, new wjGrid.Column());
        let col = dateGrid.columns[i];
        col.width = w[i];
      }

      dateGrid.columnHeaders.setCellData(0, 0, '退院・退所月加算');
      dateGrid.columnHeaders.setCellData(0, 1, '入院開始日');
      dateGrid.columnHeaders.setCellData(0, 3, '退院・対処日');
    },
    onFormatItemDate(dateGrid, e) {
      e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      if (e.col == 0 || e.col == 1 || e.col == 3) {
        e.cell.style.backgroundColor =
          sysConst.COLOR.viewTitleBackgroundOrangeDark;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
$width: 284px;
div#JissekiKiroku {
  font-size: 12px;
  .leftArea {
    min-width: $width;
    max-width: $width;
    width: $width;
    height: 100%;
  }
  .filterArea {
    background-color: $grid_Header_background_Blue;
    padding: 1px;
  }
  .v-card {
    &.text {
      width: 260px;
      background-color: $light_yellow;
    }
  }
  #grid {
    height: var(--height);

    .wj-header {
      font-weight: normal;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      //align-items: center;
    }

    .wj-cell {
      &.wj-header {
        &.textRight {
          flex-direction: column;
          justify-content: right;
          align-items: right;
        }
      }
    }
  }
  #gridDate {
    .wj-header {
      font-weight: normal;
      text-align: center;
    }
  }
}
</style>
