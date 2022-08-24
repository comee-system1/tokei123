<template>
  <div class="mt-2">
    <wj-flex-grid
      id="kadaiGrid"
      :headersVisibility="'Column'"
      :initialized="onInitialized"
      :itemsSource="viewData"
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
                <wj-flex-grid
                  id="serviceGrid"
                  :headersVisibility="'Column'"
                  :autoRowHeights="true"
                  :itemsSource="serviceData"
                  :initialized="onInitializedService"
                >
                  <wj-flex-grid-column
                    binding="no"
                    :width="40"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    binding="service"
                    width="2*"
                    :isReadOnly="true"
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
                    :width="24"
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
      if (document.getElementById('kadaiGrid') != null) {
        document.getElementById('kadaiGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*******************************
     * 福祉サービス等のダイアログ
     */
    onInitializedService(flexGrid) {
      this.createHeaderService(flexGrid);

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

      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 0, 6),
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
        // 並び替え
        if (ht.col == 0 && e.target.value) {
          flexGrid.beginUpdate();
          let index = e.target.value.split('-')[1];
          let mode = e.target.value.split('-')[0];

          let array = _self.viewData;
          if (mode === 'ue') {
            array.splice(index - 2, 2, array[index - 1], array[index - 2]);
          } else {
            array.splice(index - 1, 2, array[index], array[index - 1]);
          }

          _self.viewData = [];
          _self.viewData = array;
          flexGrid.itemsSource = [];
          flexGrid.itemsSource = array;
          flexGrid.endUpdate();
        }
      });
    },
    /******************
     * 入力フォームダイアログ表示
     */
    openDialog(row) {
      this.editTextDialog = true;
      console.log(this.viewData[row]);
      this.serviceData.push({
        no: 1,
        service: '就労継続支援A型',
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
        total_week: 1,
        total_month: 1,
        jigyosyo: 'はなまる就労支援センター\n03-1234-1234',
        tanto: '',
        edit: false,
      });
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
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        if (e.panel.cellType == wjGrid.CellType.Cell) {
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
            if (e.row == _self.viewDataLength - 1) {
              sita = '<button class="arrow" disabled >▼</button>';
            } else {
              sita =
                '<button class="arrow" value="sita-' +
                parseInt(e.row + 1) +
                '">▼</button>';
            }
            e.cell.innerHTML = text + ue + sita;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#serviceGrid,
#kadaiGrid {
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
button.arrow {
  border: 1px solid $light-gray;
  margin: 0px 1px;
  border-radius: 3px;
  &:hover {
    background-color: $light-gray;
    color: $black;
  }
  &:disabled {
    background-color: $light-white;
    color: $light-white;
    opacity: 0.2;
  }
}
</style>
