<template>
  <div id="serviceTeikyo" class="mt-n1">
    <v-container fluid class="container mt-0">
      <tab-menu-blue
        @parent_tab_menu="parent_tab_menu"
        :tabmenu="tabMenus"
      ></tab-menu-blue>

      <v-row no-gutters class="mt-1">
        <v-col style="max-width: 250px">
          <v-btn-toggle
            class="flex-wrap"
            v-model="selected"
            :mandatory="select_mandatory"
          >
            <v-btn
              small
              color="teal"
              dark
              outlined
              class="togglebtn"
              @click="dialog('add')"
            >
              <span v-if="tab == 'basic'">新規登録</span>
              <span v-else-if="tab == 'sisetu'">履歴追加</span>
            </v-btn>
            <v-btn
              small
              color="teal"
              dark
              outlined
              class="togglebtn"
              @click="dialog('edit')"
            >
              修正登録
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle
            class="flex-wrap mt-1"
            mandatory
            v-model="toggle_display"
            v-if="tab == 'sisetu'"
            @change="onToggleDisplay"
          >
            <v-btn small color="blue" dark outlined class="togglebtn auto"
              >施設種類・定員等
            </v-btn>
            <v-btn small color="blue" dark outlined class="togglebtn auto"
              >体制加算等
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col style="max-width: 240px">
          <label>ソート</label>
          <v-btn-toggle
            class="flex-wrap"
            mandatory
            v-model="toggle_sort"
            @change="toggleChangeSort"
          >
            <v-btn small color="secondary" dark outlined class="togglebtn"
              >コード
            </v-btn>
            <v-btn small color="secondary" dark outlined class="togglebtn"
              >事業所番号
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col style="max-width: 240px">
          <label>表示</label>
          <v-btn-toggle
            class="flex-wrap"
            mandatory
            v-model="toggle_enable"
            @change="onToggleEnable"
          >
            <v-btn small color="secondary" dark outlined class="togglebtn"
              >有効のみ
            </v-btn>
            <v-btn small color="secondary" dark outlined class="togglebtn"
              >無効のみ
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <wj-flex-grid
        id="serviceTeikyoGrid"
        :initialized="onInitialized"
        :selectionMode="3"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :autoRowHeights="true"
        :itemsSource="serviceData"
        :itemsSourceChanged="onItemsSourceChanged"
        :isReadOnly="true"
        class="mt-1"
        :style="gridHeight"
        :frozen-columns="5"
      >
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="50"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceJigyosyoMei'"
          align="center"
          valign="middle"
          :width="240"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'ryakusyo'"
          align="center"
          valign="middle"
          :width="180"
          format="g"
          :visible="isVisible12"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceMeisyoCode'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceMeisyo'"
          align="center"
          valign="middle"
          :width="160"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyosyoBango'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jyusyoText'"
          align="center"
          valign="middle"
          :width="200"
          format="g"
          :multiLine="true"
          :wordWrap="true"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tel'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'fax'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'mail'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'reseDisp'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'seikyuDaihyoDisp'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
          :visible="isVisible23"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tekiouStartDate'"
          align="center"
          valign="middle"
          :width="60"
          format="g"
          multiLine="true"
          :visible="isVisible23"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kyutikubun'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'takinouJigyo'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'sisetsusyurui'"
          align="center"
          valign="middle"
          width="1*"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'teiin'"
          :header="'定員'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'takinougataNado'"
          :header="'多機能型等'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jinin'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyosyoku'"
          align="center"
          valign="middle"
          :width="40"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tujyo'"
          :header="'通常'"
          align="center"
          valign="middle"
          :width="40"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kasan'"
          :header="'加算'"
          align="center"
          valign="middle"
          :width="40"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyojissi'"
          align="center"
          valign="middle"
          :width="40"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'taisyo'"
          align="center"
          valign="middle"
          :width="60"
          format="g"
          multiLine="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'taiseiKasan'"
          align="center"
          valign="middle"
          :width="40"
          format="g"
          multiLine="true"
          :visible="isVisible3"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'taiseiText'"
          align="center"
          valign="middle"
          :width="280"
          format="g"
          multiLine="true"
          :visible="isVisible3"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'taiseiPoint'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
          :visible="isVisible3"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'taiseiOther'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
          multiLine="true"
          :visible="isVisible3"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
    <dialog-service-teikyo ref="dialogTeikyo"></dialog-service-teikyo>
    <dialog-service-teikyo-taisei
      ref="dialogTeikyoTaisei"
    ></dialog-service-teikyo-taisei>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import DialogServiceTeikyo from '../components/DialogServiceTeikyo.vue';
import DialogServiceTeikyoTaisei from '../components/DialogServiceTeikyoTaisei.vue';

import sysConst from '@/utiles/const';
import TabMenuBlue from '@/components/TabMenuBlue.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';

import { ServiceTeikyo } from '@backend/api/ServiceTeikyo';

export default {
  data() {
    return {
      year: moment().year(),
      serviceData: [],
      toggle_sort: '', // ソート
      toggle_enable: '', // 表示
      gridHeight: '', // グリッドの高さ
      flexGrid: '',
      selected: '',
      select_mandatory: false,
      tabMenus: [
        { href: '#basic', text: '基本情報' },
        { href: '#sisetu', text: '施設体制' },
      ],
      tab: 'basic',
      toggle_display: '',
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible12: false,
      isVisible23: false,
    };
  },
  components: {
    DialogServiceTeikyo,
    DialogServiceTeikyoTaisei,
    TabMenuBlue,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    // this.getData();
    this.getDataTeisai();

    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      let height = window.innerHeight;
      let ht = 74;
      if (height > 800) {
        ht = 84;
      }
      this.gridHeight = 'height:' + ht + 'vh; width:100%;';
    },

    /*********************
     * 表示切替
     */
    onToggleDisplay() {
      if (this.tab != 'sisetu') {
        return false;
      }
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isVisible3 = false;
      this.isVisible12 = false;
      this.isVisible23 = false;

      // 一旦データの保持
      if (this.toggle_display == 0) {
        if (this.serviceDataMain.length < 1) {
          return false;
        }
        // 施設種類・定員
        this.isVisible2 = true;
        this.isVisible23 = true;
        this.isVisible12 = true;
        // 施設種類定員などを押下時にserviceDataを入れ替える
        this.serviceData = [];
        this.allData = [];
        this.serviceData = this.serviceDataMain;
        this.allData = this.serviceDataMain;
      } else {
        if (this.serviceDataTeisai.length < 1) {
          return false;
        }
        // 体制加算
        this.isVisible3 = true;
        this.isVisible23 = true;
        // 体制加算等を押下時にserviceDataを入れ替える
        this.serviceData = [];
        this.allData = [];
        this.serviceData = this.serviceDataTeisai;
        this.allData = this.serviceDataTeisai;
      }
      this.flexGrid.itemsSource = [];
      this.flexGrid.itemsSource = this.serviceData;
    },
    /**************
     * 子コンポーネントtabmenublueで選択した値を取得
     */
    parent_tab_menu(args) {
      if (this.serviceDataMain && this.serviceDataMain.length < 1) {
        return false;
      }

      if (args) {
        this.tab = args.selectTab;
      }
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isVisible3 = false;
      this.isVisible12 = false;
      this.isVisible23 = false;
      if (this.tab == 'basic') {
        this.isVisible1 = true;
        this.isVisible12 = true;
        this.toggle_display = 0;
      }
      if (this.tab == 'sisetu') {
        this.isVisible2 = true;
        this.isVisible12 = true;
        this.isVisible23 = true;
      }

      this.serviceData = this.serviceDataMain;
      this.allData = this.serviceDataMain;

      this.flexGrid.itemsSource = [];
      this.flexGrid.itemsSource = this.serviceData;
    },
    /*****************
     * ダイアログ表示
     */
    dialog(type) {
      this.select_mandatory = true;
      if (type == 'add') {
        if (this.tab == 'sisetu') {
          //　履歴追加
          this.selected = 2;
        } else {
          // 新規追加
          this.selected = 0;
          this.$refs.dialogTeikyo.openDialog(type, '');
        }
      }
      if (type == 'edit') {
        this.selected = 1;
      }
    },
    /***********************
     * 表示変更
     */
    onToggleEnable() {
      let array = [];
      if (this.allData && this.allData.length > 0) {
        for (let i = 0; i < this.allData.length; i++) {
          if (
            (this.toggle_enable === 0 && this.allData[i].enabled === true) ||
            (this.toggle_enable === 1 && this.allData[i].enabled === false)
          ) {
            array.push(this.allData[i]);
          }
        }
      }

      this.serviceData = [];
      this.serviceData = array;
      this.flexGrid.itemsSource = [];
      this.flexGrid.itemsSource = array;
    },
    /*******************
     * 並び替え
     */
    toggleChangeSort() {
      let serviceData = this.serviceData;
      if (this.toggle_sort === 0 && serviceData) {
        // コード順に並び替え
        serviceData.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          return 0;
        });
      }
      if (this.toggle_sort === 1 && serviceData) {
        // 事業所番号順に並び替え
        serviceData.sort((a, b) => {
          if (a.jigyosyoBango < b.jigyosyoBango) {
            return -1;
          }
          if (a.jigyosyoBango > b.jigyosyoBango) {
            return 1;
          }
          return 0;
        });
      }

      this.flexGrid.itemsSource = [];
      this.flexGrid.itemsSource = serviceData;
    },
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.getData().then((result) => {
        this.serviceDataMain = result;
        this.allDataMain = result;
        this.parent_tab_menu();
      });
      // ヘッダセル
      this.createHeader(flexGrid);
      // フォーマット
      this.methodCellFormatSetting(flexGrid);
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 修正登録の時のみモーダル画面の表示
          if (_self.tab == 'basic' && _self.selected === 1) {
            _self.$refs.dialogTeikyo.openDialog(
              'edit',
              _self.serviceData[ht.row]
            );
          }
          // 施設体制+履歴追加押下の時のみ
          if (_self.tab == 'sisetu' && _self.selected === 0) {
            _self.$refs.dialogTeikyoTaisei.openDialog(
              'historyAdd',
              _self.serviceData[ht.row]
            );
          }
          // 施設体制+修正追加押下の時のみ
          if (_self.tab == 'sisetu' && _self.selected === 1) {
            _self.$refs.dialogTeikyoTaisei.openDialog(
              'historyEdit',
              _self.serviceData[ht.row]
            );
          }
        }
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);
    },

    /*****************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      let self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.cells) {
          e.cell.style.textAlign = 'left';
          if (e.col == 1 || e.col == 2 || e.col == 4 || e.col == 6) {
            e.cell.style.textAlign = 'left';
          }
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;

          // レセ請求代表
          if (e.col == 10) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }
          if (e.col == 14) {
            if (e.panel.rows[e.row].dataItem.takinouJigyo == 'gray') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
              e.cell.innerText = '';
            }
          }
          if (e.col == 15) {
            if (e.panel.rows[e.row].dataItem.sisetsusyurui == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
            e.cell.style.textAlign = 'left';
          }
          if (e.col == 16) {
            if (e.panel.rows[e.row].dataItem.teiin == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
            e.cell.style.textAlign = 'left';
          }
          if (e.col == 17) {
            if (e.panel.rows[e.row].dataItem.takinougataNado == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
            e.cell.style.textAlign = 'left';
          }
          if (e.col == 18) {
            if (e.panel.rows[e.row].dataItem.jinin == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
            e.cell.style.textAlign = 'left';
          }
          if (e.col == 19) {
            if (e.panel.rows[e.row].dataItem.jigyosyoku == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 20) {
            if (e.panel.rows[e.row].dataItem.tujyo == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 21) {
            if (e.panel.rows[e.row].dataItem.kasan == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 22) {
            if (e.panel.rows[e.row].dataItem.jigyojissi == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 23) {
            if (e.panel.rows[e.row].dataItem.taisyo == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
          if (e.col == 25 || e.col == 27) {
            e.cell.style.textAlign = 'left';
          }

          if (e.col == 5) {
            if (e.panel.rows[e.row].dataItem.jigyosyoBango == '') {
              e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
            }
          }
        }
      });
    },

    /***************
     * ヘッダセル
     */
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'コード');
      panel.setCellData(0, 1, 'サービス事業所');
      panel.setCellData(0, 2, '略称');
      panel.setCellData(0, 3, 'サービス名称');
      panel.setCellData(0, 5, '事業所番号');
      panel.setCellData(0, 6, '住所');
      panel.setCellData(0, 7, '連絡先');
      panel.setCellData(1, 7, '電話番号');
      panel.setCellData(1, 8, 'FAX番号');
      panel.setCellData(1, 9, 'メールアドレス');
      panel.setCellData(0, 10, 'レセ\n請求\n代表');
      panel.setCellData(0, 11, '請求\n代表');
      panel.setCellData(0, 12, '適応\n開始月');
      panel.setCellData(0, 13, '級地\n区分');
      panel.setCellData(0, 14, '多機\n能型\n事業');
      panel.setCellData(0, 15, '施設種類');
      panel.setCellData(0, 16, '定員区分');
      panel.setCellData(0, 18, '人員配置\n区分');
      panel.setCellData(0, 19, '事業\n所区');
      panel.setCellData(0, 20, '施設区分');
      panel.setCellData(0, 22, '事業\n実施\n区分');
      panel.setCellData(0, 23, '主たる\n対象者');
      panel.setCellData(0, 24, '体制加算等');
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 4),
        new wjGrid.CellRange(0, 5, 1, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 0, 9),
        new wjGrid.CellRange(0, 10, 1, 10),
        new wjGrid.CellRange(0, 11, 1, 11),
        new wjGrid.CellRange(0, 12, 1, 12),
        new wjGrid.CellRange(0, 13, 1, 13),
        new wjGrid.CellRange(0, 14, 1, 14),
        new wjGrid.CellRange(0, 15, 1, 15),
        new wjGrid.CellRange(0, 16, 0, 17),
        new wjGrid.CellRange(0, 18, 1, 18),
        new wjGrid.CellRange(0, 19, 1, 19),
        new wjGrid.CellRange(0, 20, 0, 21),
        new wjGrid.CellRange(0, 22, 1, 22),
        new wjGrid.CellRange(0, 23, 1, 23),
        new wjGrid.CellRange(0, 24, 1, 27),
      ];

      let ranges = [];
      let merge = [];
      if (this.toggle_display == 1) {
        merge = this.createMergeArray(this.serviceData);
        ranges = [];
        for (let i = 0; i < merge.length; i++) {
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 0, merge[i].last - 1, 0)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 1, merge[i].last - 1, 1)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 3, merge[i].last - 1, 3)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 4, merge[i].last - 1, 4)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 5, merge[i].last - 1, 5)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 11, merge[i].last - 1, 11)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 12, merge[i].last - 1, 12)
          );
          ranges.push(
            new wjGrid.CellRange(merge[i].first, 24, merge[i].last - 1, 24)
          );
        }
      }

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
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

    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray(groupData) {
      let array = [];
      for (let i = 0; i < groupData.length; i++) {
        array.push({
          row: i,
          groupKey: groupData[i]['groupKey'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'groupKey');
      let merge = [];
      Object.keys(mergeGroup).map((key) => {
        let firsts = mergeGroup[key][0].row;
        let lasts = mergeGroup[key][mergeGroup[key].length - 1].row + 1;
        merge.push({
          k: key,
          first: firsts,
          last: lasts,
        });
      });
      return merge;
    },

    getDataTeisai() {
      let serviceData = [];
      let name = [
        '人員配置体制加算（Ⅰ）',
        '福祉専門員配置加算（Ⅰ）',
        '常勤看護職員配置加算（Ⅱ）',
        '重度障害者支援加算（Ⅰ）',
        '送迎加算（Ⅰ）',
        '食事提供体制加算',
        '就労移行支援体制加算（Ⅱ）',
        '福祉・介護職員処遇改善加算',
        '福祉・介護職員等処遇改善加算Ⅰ',
      ];
      let pt = ['', '', '', '', '', '', '', '5.7', '1.7'];
      let memo = [];
      for (let i = 0; i < 9; i++) {
        serviceData.push({
          groupKey: 1,
          code: 1001,
          serviceJigyosyoMei: '障害者支援施設 ひまわり園',
          ryakusyo: '生活ひまわり園',
          serviceMeisyoCode: '22',
          serviceMeisyo: '生活介護',
          jigyosyoBango: '1121000011',
          enabled: true,
          seikyuDaihyo: 0,
          seikyuDaihyoDisp: '〇',
          tekiouStartDate: '20220304',
          taiseiKasan: '加算',
          taiseiText: name[i],
          taiseiPoint: pt[i],
          taiseiOther: memo[i],
        });
      }

      name = [
        '福祉専門員配置加算（Ⅰ）',
        '常勤看護職員配置加算',
        '食事提供体制加算',
        '就労移行支援体制加算（Ⅱ）',
        '福祉・介護職員処遇改善加算',
        '福祉・介護職員等処遇改善加算Ⅰ',
      ];
      pt = ['', '', '', '', '6.3', '2.1'];
      memo = ['', '', '利用者2人', '', '', ''];

      for (let i = 0; i < 6; i++) {
        serviceData.push({
          groupKey: 2,
          code: 1002,
          serviceJigyosyoMei: '短期入所事業所 ひまわり園',
          ryakusyo: '生活ひまわり園',
          serviceMeisyoCode: '24',
          serviceMeisyo: '短期入所',
          jigyosyoBango: '1121000011',
          enabled: true,
          seikyuDaihyo: 0,
          seikyuDaihyoDisp: '〇',
          tekiouStartDate: '20220304',
          taiseiKasan: '加算',
          taiseiText: name[i],
          taiseiPoint: pt[i],
          taiseiOther: memo[i],
        });
      }
      name = [
        '夜勤職員配置体制加算',
        '夜間看護体制加算	',
        '重度障害者支援加算Ⅰ１',
        '重度障害者支援加算Ⅰ２',
        '口腔衛生管理体制加算',
        '福祉・介護職員処遇改善加算Ⅰ',
      ];
      pt = [];
      memo = [];

      for (let i = 0; i < 6; i++) {
        serviceData.push({
          groupKey: 3,
          code: 1003,
          serviceJigyosyoMei: '障害者支援施設 ひまわり園',
          ryakusyo: '生活ひまわり園',
          serviceMeisyoCode: '32',
          serviceMeisyo: '施設入所支援',
          jigyosyoBango: '1121000011',
          enabled: true,
          seikyuDaihyo: 0,
          seikyuDaihyoDisp: '〇',
          tekiouStartDate: '20220304',
          taiseiKasan: '加算',
          taiseiText: name[i],
          taiseiPoint: pt[i],
          taiseiOther: memo[i],
        });
      }

      // コード順にソート
      serviceData.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });

      for (let i = 0; i < serviceData.length; i++) {
        let y = moment(serviceData[i].tekiouStartDate).format('YYYY');
        let m = moment(serviceData[i].tekiouStartDate).format('M') - 1;
        let d = moment(serviceData[i].tekiouStartDate).format('D');
        serviceData[i]['tekiouStartDate'] = wijmo.Globalize.format(
          new Date(y, m, d),
          'gyy/MM'
        );
      }

      this.serviceDataTeisai = serviceData;
      this.allDataTeisai = serviceData;
    },
    async getData() {
      let serviceData = [];

      return ServiceTeikyo().then((result) => {
        serviceData = result.seikyu_inf;
        this.merge = [];

        return serviceData;
      });
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#serviceTeikyoGrid {
  width: auto !important;
  max-width: 100%;
}
div#serviceTeikyo {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: none;

  .wj-cell {
    &.wj-header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .togglebtn {
    width: 80px;
    height: 25px;
    &.auto {
      width: auto;
    }
  }

  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cell {
    &.wj-state-active.wj-state-selected {
      background: $grid_hover_background;
      color: $font_color;
    }
    &.wj-state-multi-selected {
      background: $grid_hover_background;
      color: $font_color;
    }
  }

  label {
    display: inline-block;
    margin-right: 2px;
    padding-top: 2px;
    background: #eee;
    border: none;
    height: 24px;
    width: 75px;
    text-align: center;
    line-height: 20px;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
}
</style>