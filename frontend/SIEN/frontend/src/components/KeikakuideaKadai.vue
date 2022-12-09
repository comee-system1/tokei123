<template>
  <div>
    <wj-flex-grid
      id="kadaiGrid"
      :headersVisibility="'Column'"
      :initialized="onInitialized"
      :itemsSource="viewData"
      :allowAddNew="false"
      :allowDelete="false"
      :allowPinning="false"
      :allowMerging="'None'"
      :allowResizing="false"
      :allowSorting="false"
      :allowDragging="false"
      :alternatingRowStep="0"
      :formatItem="onFormatItem"
      :imeEnabled="true"
      :selectionMode="'Cell'"
      :showMarquee="true"
      :autoRowHeights="true"
      :itemsSourceChanged="onItemsSourceChanged"
    >
      <wj-flex-grid-column
        header="順位"
        binding="sort"
        :width="40"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'解決すべき課題\n(本人のニーズ)'"
        binding="resolve"
        width="*"
        :allowResizing="true"
        :wordWrap="true"
        :multiLine="true"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="支援目標"
        binding="sien"
        width="*"
        :word-wrap="true"
        :multiLine="true"
        :allowResizing="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="達成時期"
        binding="tassei"
        :width="100"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>

      <wj-flex-grid-column
        :header="'福祉サービス等\n種類-内容-量(頻度-期間)'"
        binding="service"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'課題のための本人\nの役割'"
        binding="task"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        :allowResizing="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'評価\n時期'"
        :multiLine="true"
        binding="hyoka"
        :width="60"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="その他留意事項"
        binding="other"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
        align="left"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="削除"
        binding="edit"
        :width="40"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>

    <v-dialog
      v-model="editTextDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="editTextDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >福祉サービス等 種類・内容・量(頻度・期間) 入力</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="editTextSave"> 仮設定 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-row>
                  <v-col>
                    <v-card class="d-flex justify-end" flat tile>
                      <div>
                        <v-btn small @click="rowSort('service')">順変更</v-btn>
                        <v-btn small @click="rowAdd('service')">行追加</v-btn>
                        <v-btn small @click="rowDelete('service')" class="ml-2"
                          >行削除</v-btn
                        >
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <wj-flex-grid
                  id="serviceGrid"
                  :autoRowHeights="true"
                  :headersVisibility="'Column'"
                  :itemsSource="serviceData"
                  :initialized="onInitializedService"
                  :allowDragging="'Both'"
                  class="mt-1"
                >
                  <wj-flex-grid-column
                    binding="no"
                    :width="40"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="service"
                    :width="200"
                    :dataMap="servicesMap"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="detail"
                    width="1*"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="kubun"
                    :width="80"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="開始"
                    binding="start"
                    :width="50"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="終了"
                    binding="end"
                    :width="50"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="1回当"
                    binding="one"
                    :width="50"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="月"
                    binding="mon"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="火"
                    binding="tue"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="水"
                    binding="wed"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="木"
                    binding="thr"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="金"
                    binding="fri"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="土"
                    binding="sat"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="日"
                    binding="sun"
                    :width="24"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="週"
                    binding="count_week"
                    :width="30"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="月"
                    binding="count_month"
                    :width="30"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="週"
                    binding="total_week"
                    :width="30"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="月"
                    binding="total_month"
                    :width="30"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="jigyosyo"
                    width="1*"
                    :wordWrap="true"
                    :multiLine="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="tanto"
                    width="1*"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="edit"
                    :width="30"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

export default {
  props: {},
  components: {},
  data() {
    return {
      viewData: [],
      onflexGrid: [],
      editTextDialog: false,
      serviceData: [],
      serviceDataLength: 0,
      servicesMap: [
        '経済的生活介護',
        '経済的施設入所支援',
        '居宅介護 身体介護',
        '居宅介護 家事援助',
        '居宅介護 通院等乗降介助',
        '居宅介護 通院介助(身体介護を伴わない)',
        '居宅介護 通院介助(身体介護を伴う)',
        '重度訪問介護',
        '行動援護',
        '重度障害者等包括支援',
      ],
      sortEditFlag: false,
      userdrawer: true,
      mainGrid: {},
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    /****************************
     * 登録ボタンを押下
     */
    registButton() {
      alert('課題登録ボタン');
    },
    setViewData(viewData) {
      console.log(viewData);

      let array = [];
      if (viewData.keikakudetail != undefined) {
        for (let i = 0; i < viewData.keikakudetail.length; i++) {
          array.push({
            sort: viewData.keikakudetail[i].koban,
            resolve: viewData.keikakudetail[i].kadai,
            sien: viewData.keikakudetail[i].shienmokuhyo,
            tassei: viewData.keikakudetail[i].tasseijiki,
            service: viewData.keikakudetail[i].fukushiservice,
            task: viewData.keikakudetail[i].yakuwari,
            hyoka: viewData.keikakudetail[i].hyokajiki,
            other: viewData.keikakudetail[i].ryuijiko,
            edit: '',
          });
        }
      }
      this.viewData = array;
    },
    /************************
     * 順変更
     */
    rowSort(type) {
      // 福祉サービスダイアログの配列に追加
      if (type == 'service') {
        this.createServiceData(this.serviceData.length + 1);
      }
      // 課題支援配列に追加
      if (type == 'view') {
        // 並び順を変更するフラグ
        this.sortEditFlag = true;
        for (let i = 0; i < this.viewData.length; i++) {
          this.viewData[i].sort = '';
        }
        this.onflexGrid.refresh();
      }
    },
    /************************
     * 行追加
     */
    rowAdd(type) {
      // 福祉サービスダイアログの配列に追加
      if (type == 'service') {
        this.createServiceData(this.serviceData.length + 1);
      }
      // 課題支援配列に追加
      if (type == 'view') {
        let ar = this.viewData.concat();
        ar.push({});
        this.viewData = ar;
      }
    },
    /************************
     * 行削除
     */
    rowDelete(type) {
      if (type == 'service') {
        this.serviceData = this.delcheck(this.serviceData).filter(Boolean);
      }
      if (type == 'view') {
        this.viewData = this.delcheck(this.viewData).filter(Boolean);
      }
    },
    delcheck(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].edit == '○') {
          delete array[i];
        }
      }
      return array;
    },
    grdRefresh(userDispflg) {
      this.userdrawer = userDispflg;
      this.mainGrid.refresh();
      this.mainGrid.autoSizeRows();
    },
    /*******************************
     * 福祉サービス等のダイアログ
     */
    onInitializedService(flexGrid) {
      this.createHeaderService(flexGrid);
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);

        // 週間予定を押下
        if (ht.col >= 7 && ht.col <= 13) {
          // weeklyKey
          let weeklyKey = [];
          weeklyKey.push(
            { key: 7, type: 'mon' },
            { key: 8, type: 'tue' },
            { key: 9, type: 'wed' },
            { key: 10, type: 'thr' },
            { key: 11, type: 'fri' },
            { key: 12, type: 'sat' },
            { key: 13, type: 'sun' }
          );

          var idx = weeklyKey.findIndex(({ key }) => key === ht.col);
          let type = weeklyKey[idx].type;
          let icon = '';
          if (_self.serviceData[ht.row][type] === '○') {
            icon = '';
          } else {
            icon = '○';
          }
          flexGrid.setCellData(ht.row, ht.col, icon);
          _self.serviceData[ht.row][type] = icon;

          // 回数の計算
          let count_week = 0;
          for (let i = 0; i < weeklyKey.length; i++) {
            let w = weeklyKey[i].type;
            if (_self.serviceData[ht.row][w] == '○') {
              count_week++;
            }
          }
          // 週の回数
          _self.serviceData[ht.row].count_week = count_week;
          // 月の回数
          _self.serviceData[ht.row].count_month = count_week * 4;
          // 合計
          let one = _self.serviceData[ht.row].one;
          _self.serviceData[ht.row].total_week = count_week * one;
          _self.serviceData[ht.row].total_month = count_week * one * 4;
        }
        // 区分を押下
        if (ht.col == 3 && e.target.value) {
          flexGrid.beginUpdate();

          let index = e.target.value.split('-')[1];
          let mode = e.target.value.split('-')[0];
          let array = _self.serviceData;

          if (array[index].kubun == 1) {
            // 週のみ選択状態
            // mode:weekの時0 / monthの時3 に変更
            array[index].kubun = mode === 'week' ? 0 : mode === 'month' ? 3 : 0;
          } else if (array[index].kubun == 2) {
            // 月のみ選択状態
            // mode:weekの時3 / monthの時0 に変更
            array[index].kubun = mode === 'week' ? 3 : mode === 'month' ? 0 : 0;
          } else if (array[index].kubun == 3) {
            // 週月選択状態
            // mode:weekの時2 / monthの時1 に変更
            array[index].kubun = mode === 'week' ? 2 : mode === 'month' ? 1 : 0;
          } else if (array[index].kubun == 0) {
            // 未状態
            // mode:weekの時1 / monthの時2 に変更
            array[index].kubun = mode === 'week' ? 1 : mode === 'month' ? 2 : 0;
          }
          _self.serviceData = [];
          _self.serviceData = array;
          flexGrid.itemsSource = [];
          flexGrid.itemsSource = array;

          flexGrid.endUpdate();
        }
      });

      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';

        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 1 || e.col == 2 || e.col == 18) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }

          // 回数の設定
          if (e.col == 14) {
            if (tmpitem.kubun == 1 || tmpitem.kubun == 3) {
              e.cell.style.backgroundColor = sysConst.COLOR.white;
              e.cell.style.color = sysConst.COLOR.fontColor;
            } else {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
              e.cell.style.color = sysConst.COLOR.lightGray;
            }
          }

          if (e.col == 15) {
            if (tmpitem.kubun == 2 || tmpitem.kubun == 3) {
              e.cell.style.backgroundColor = sysConst.COLOR.white;
              e.cell.style.color = sysConst.COLOR.fontColor;
            } else {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
              e.cell.style.color = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 16 || e.col == 17) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }

          // 区分の設定
          if (e.col == 3) {
            let text = e.cell.innerText;
            let weekbtn = '';
            let monthbtn = '';
            let act1 = '';
            let act2 = '';
            if (text == 1) {
              act1 = 'act';
            }
            if (text == 2) {
              act2 = 'act';
            }
            if (text == 3) {
              act1 = 'act';
              act2 = 'act';
            }
            weekbtn =
              "<button class='arrow " +
              act1 +
              "' value='week-" +
              e.row +
              "'>週</button>";
            monthbtn =
              "<button class='arrow " +
              act2 +
              "' value='month-" +
              e.row +
              "'>月</button>";
            e.cell.innerHTML = weekbtn + monthbtn;
          }
        }
      });
    },
    createHeaderService(flexGrid) {
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      let headerpanel = flexGrid.columnHeaders;
      headerpanel.setCellData(0, 0, 'No');
      headerpanel.setCellData(0, 1, 'サービス種類');
      headerpanel.setCellData(0, 2, 'サービス詳細');
      headerpanel.setCellData(0, 3, '区分');
      headerpanel.setCellData(0, 4, '時間');
      headerpanel.setCellData(0, 7, '週間予定');
      headerpanel.setCellData(0, 14, '回数');
      headerpanel.setCellData(0, 16, '計');
      headerpanel.setCellData(0, 18, '事業所');
      headerpanel.setCellData(0, 19, '担当者');
      headerpanel.setCellData(0, 20, '削除');

      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 0, 6),
        new wjGrid.CellRange(0, 7, 0, 13),
        new wjGrid.CellRange(0, 14, 0, 15),
        new wjGrid.CellRange(0, 16, 0, 17),
        new wjGrid.CellRange(0, 18, 1, 18),
        new wjGrid.CellRange(0, 19, 1, 19),
        new wjGrid.CellRange(0, 20, 1, 20),
      ];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    getGrid() {
      return this.mainGrid;
    },
    /*******************************
     * 一覧
     */
    onInitialized(flexGrid) {
      this.mainGrid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 8) {
            if (ht.panel.getCellData(ht.row, ht.col) == '○') {
              ht.panel.setCellData(ht.row, ht.col, ' ');
            } else {
              ht.panel.setCellData(ht.row, ht.col, '○');
            }
          } else {
            // 完全編集モードへ移行
            flexGrid.startEditing(true);
          }
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });

      this.onflexGrid = flexGrid;
      this.createHeader(flexGrid);
      this.createFormat(flexGrid);

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);

        // ダイアログ表示
        if (ht.col == 4) {
          _self.openDialog(ht.row);
          _self.createServiceData();
        }
        // 並び順変更
        if (ht.cellType == wjGrid.CellType.Cell) {
          if (_self.sortEditFlag == true) {
            if (ht.col == 0) {
              let sorts = _self.viewData.map(function (value) {
                return value.sort;
              });
              let max = sorts.reduce(function (a, b) {
                return Math.max(a, b);
              });
              _self.viewData[ht.row].sort = max + 1;
              _self.onflexGrid.refresh();
            }
          }
        }
      });
    },
    onFormatItem(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        if (this.userdrawer) {
          e.cell.style.fontSize = '12px';
        } else {
          e.cell.style.fontSize = '16.5px';
        }
      }
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },

    createServiceData(cnt = 3) {
      this.serviceData = [];
      for (let i = 0; i < cnt; i++) {
        this.serviceData.push({
          no: i + 1,
          service: '就労継続支援A型',
          detail: '',
          kubun: i + 1,
          start: '10:00',
          end: '15:00',
          one: 5,
          mon: '',
          tue: '',
          wed: '○',
          thr: '',
          fri: '',
          sat: '',
          sun: '',
          count_week: 1,
          count_month: 1,
          total_week: 5,
          total_month: 20,
          jigyosyo: 'はなまる就労支援センター\n03-1234-1234',
          tanto: '',
          edit: false,
        });
      }
      this.serviceDataLength = this.serviceData.length;
    },
    /******************
     * 入力フォームダイアログ表示
     */
    openDialog(row) {
      this.editTextDialog = true;
      console.log(this.viewData[row]);
    },
    /******************************
     *  ダイアログの編集内容取得
     */
    editTextSave() {
      this.editTextDialog = false;
    },

    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows[0].height = 50;
    },
    createFormat(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.cells) {
          if (e.col == 0 || e.col == 3 || e.col == 6 || e.col == 8) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = '';
          } else {
            e.cell.style.textAlign = '';
            e.cell.style.justifyContent = '';
            e.cell.style.alignItems = '';
          }
        } else {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#kadaiGrid {
  height: 100%;
  max-height: 100%;
}
#serviceGrid,
#kadaiGrid {
  font-size: 12px;
  background: $grid_background;
  border: 1px solid $grid_Border_Color;
  &.wj-flexgrid [wj-part='root'] {
    overflow-y: scroll !important;
  }
  .wj-header {
    font-weight: normal;
    background: $view_Title_background_Blue;
    color: $view_Title_font_color_Blue;
    &:last-child {
      background: $light-white;
      color: $grid_selected_color;
    }
  }

  .wj-cell {
    padding: 2px;
    display: flex;

    &:first-child.wj-state-selected {
      background: transparent;
      color: initial;
    }

    // text-align: left !important;
  }
}
.v-dialog--fullscreen {
  .wj-listbox {
    width: 300px;
    font-size: 12px;
  }
}
#serviceGrid {
  .wj-cell {
    &:nth-child(2) {
      &:not(.wj-header) {
        display: block;
      }
    }

    &:nth-child(4).wj-state-selected {
      background: transparent;
      color: initial;
    }
  }
}
button.arrow {
  border: 1px solid $light-gray;
  margin: 0px 1px;
  border-radius: 3px;
  width: 20px;
  &:hover {
    background-color: $light-gray;
    color: $black;
  }
  &:disabled {
    background-color: $light-white;
    color: $light-white;
    opacity: 0.2;
  }
  &.act {
    background-color: $light-gray;
  }
}
</style>
