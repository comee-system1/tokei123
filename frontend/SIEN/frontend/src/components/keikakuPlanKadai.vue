<template>
  <div class="mt-2">
    <wj-flex-grid
      id="planKadaiGrid"
      :initialized="onInitialized"
      :itemsSource="viewData"
      :allowDragging="'Both'"
      :draggingRow="handleDraggingRow"
      :draggedRow="handleDraggedRow"
      :autoRowHeights="true"
      :style="styles"
    >
      <wj-flex-grid-column
        header="順位"
        binding="sort"
        :width="80"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'解決すべき課題\n(本人のニーズ)'"
        binding="resolve"
        width="*"
        :allowResizing="true"
        :wordWrap="true"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="支援目標"
        binding="sien"
        width="*"
        :word-wrap="true"
        :multiLine="true"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="達成時期"
        binding="tassei"
        :width="100"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>

      <wj-flex-grid-column
        :header="'福祉サービス等\n種類-内容-量(頻度-期間)'"
        binding="service"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'課題のための本人\nの役割'"
        binding="task"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'評価\n時期'"
        :multiLine="true"
        binding="hyoka"
        :width="60"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="その他留意事項"
        binding="other"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="削除"
        binding="edit"
        :width="40"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
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
            <v-btn dark text @click="editTextSave"> 保存 </v-btn>
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
                        <v-btn-toggle class="mt-1">
                          <v-btn small>行追加</v-btn>
                          <v-btn small>行削除</v-btn>
                        </v-btn-toggle>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <wj-flex-grid
                  id="serviceGrid"
                  :headersVisibility="'Column'"
                  :autoRowHeights="true"
                  :itemsSource="serviceData"
                  :initialized="onInitializedService"
                  class="mt-1"
                >
                  <wj-flex-grid-column
                    binding="no"
                    :width="40"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="service"
                    width="2*"
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
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="火"
                    binding="tue"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="水"
                    binding="wed"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="木"
                    binding="thr"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="金"
                    binding="fri"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="土"
                    binding="sat"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="日"
                    binding="sun"
                    :width="24"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="週"
                    binding="count_week"
                    :width="30"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="月"
                    binding="count_month"
                    :width="30"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="週"
                    binding="total_week"
                    :width="30"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="月"
                    binding="total_month"
                    :width="30"
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

export default {
  props: {},
  components: {},
  data() {
    return {
      viewData: [],
      viewDataLength: 0,
      headerheight: 240,
      editTextDialog: false,
      serviceData: [],
      serviceDataLength: 0,
    };
  },
  created() {},
  mounted() {
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
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('planKadaiGrid') != null) {
        document.getElementById('planKadaiGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*******************************
     * 福祉サービス等のダイアログ
     */
    onInitializedService(flexGrid) {
      this.createHeaderService(flexGrid);
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        // 区分を押下
        if (ht.col == 3 && e.target.value) {
          flexGrid.beginUpdate();
          let index = e.target.value.split('-')[1];
          let mode = e.target.value.split('-')[0];
          let array = _self.serviceData;
          array[index].kubun = mode === 'week' ? 1 : 2;

          _self.serviceData = [];
          _self.serviceData = array;
          flexGrid.itemsSource = [];
          flexGrid.itemsSource = array;

          flexGrid.endUpdate();
        }
        // 並び替え
        if (ht.col == 0 && e.target.value) {
          flexGrid.beginUpdate();
          let index = e.target.value.split('-')[1];
          let mode = e.target.value.split('-')[0];

          let array = _self.serviceData;
          if (mode === 'ue') {
            array.splice(index - 2, 2, array[index - 1], array[index - 2]);
          } else {
            array.splice(index - 1, 2, array[index], array[index - 1]);
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

        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 1 || e.col == 2 || e.col == 18) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }

          if (e.col == 0) {
            let text = e.cell.innerText;
            let ue = '';
            if (e.row) {
              ue =
                '<button class="arrow" value="ue-' +
                parseInt(e.row + 1) +
                '">▲</button>';
            } else {
              ue = '<button class="arrow" disabled >▲</button>';
            }
            let sita = '';
            if (e.row == _self.serviceDataLength - 1) {
              sita = '<button class="arrow" disabled >▼</button>';
            } else {
              sita =
                '<button class="arrow" value="sita-' +
                parseInt(e.row + 1) +
                '">▼</button>';
            }
            e.cell.innerHTML = text + ue + sita;
          } else if (e.col == 3) {
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
    /*********************
     * ドラッグで並び替え
     */
    handleDraggingRow(s, e) {
      // ドラッグでセルが移動開始時に動作
      this.dragIndex = e.row;
      s.collectionView.moveCurrentToPosition(this.dragIndex);
    },
    handleDraggedRow(s, e) {
      // ドラッグでセルが移動後動作
      let dropIndex = e.row,
        arr = s.collectionView.sourceCollection;
      s.collectionView.deferUpdate(() => {
        let item = arr[this.dragIndex];
        arr.splice(this.dragIndex, 1);
        arr.splice(dropIndex, 0, item);
        s.collectionView.moveCurrentToPosition(dropIndex);
        console.log(this.viewData);
      });
    },
    /*******************************
     * 一覧
     */
    onInitialized(flexGrid) {
      this.createData();
      this.createHeader(flexGrid);
      this.createFormat(flexGrid);

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);

        // ダイアログ表示
        if (ht.col == 4) {
          _self.openDialog(ht.row);
        }
      });
    },
    /******************
     * 入力フォームダイアログ表示
     */
    openDialog(row) {
      this.editTextDialog = true;
      console.log(this.viewData[row]);
      this.serviceData = [];
      for (let i = 0; i < 3; i++) {
        this.serviceData.push({
          no: i + 1,
          service: i + '就労継続支援A型',
          detail: '',
          kubun: 1,
          start: '10:00',
          end: '15:00',
          one: '5.0',
          mon: '',
          tue: '',
          wed: '〇',
          thr: '',
          fri: '',
          sat: '',
          count_week: 1,
          count_month: 1,
          total_week: '5.0',
          total_month: '22.5',
          jigyosyo: 'はなまる就労支援センター\n03-1234-1234',
          tanto: '',
          edit: false,
        });
      }
      this.serviceDataLength = this.serviceData.length;
    },
    /******************************
     *  ダイアログの編集内容取得
     */
    editTextSave() {},
    createData() {
      let array = [];
      for (let i = 0; i < 30; i++) {
        array.push({
          sort: i + 1,
          resolve: i + '現在の生活を考え直し特に母親との関係をよくしたい',
          sien: i + '現自分の生活について両親と話し合えるようになる',
          tassei: '6ヶ月',
          service: '現在の生活について一緒に考え、家族との仲介役を果たす',
          task: '無理がない生活を考え直しそのために両親に理解してもらえる',
          hyoka: '6ヶ月',
          other: '自立の考え方が焦点となる本人の意思を大切にしていく',
          edit: false,
        });
      }
      this.viewData = array;
      this.viewDataLength = array.length;
    },
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows[0].height = 50;
    },
    createFormat(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#serviceGrid,
#planKadaiGrid {
  font-size: 12px;
  height: var(--height);
  .wj-cell {
    display: flex;
    &.wj-header {
      align-items: center;
    }
    &:first-child.wj-state-selected {
      background: transparent;
      color: initial;
    }
    text-align: left !important;
  }
}
#serviceGrid {
  .wj-cell {
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
