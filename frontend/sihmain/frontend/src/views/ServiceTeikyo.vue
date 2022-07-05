<template>
  <div id="serviceTeikyo" class="mt-n1">
    <v-container fluid class="container mt-0">
      <v-row no-gutters>
        <v-col style="max-width: 200px">
          <v-tabs height="30">
            <v-tab class="text-caption">基本情報</v-tab>
            <v-tab class="text-caption">施設体制</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-col style="max-width: 220px">
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
              新規登録
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
          width="2*"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'ryakusyo'"
          align="center"
          valign="middle"
          width="1*"
          format="g"
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
          width="1*"
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
          width="2*"
          format="g"
          :multiLine="true"
          :wordWrap="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tel'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'fax'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'mail'"
          align="center"
          valign="middle"
          :width="100"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'reseDisp'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          multiLine="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
    <dialog-service-teikyo ref="dialogTeikyo"></dialog-service-teikyo>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import DialogServiceTeikyo from '../components/DialogServiceTeikyo.vue';
import sysConst from '@/utiles/const';

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
      reseType: ['', '〇'],
    };
  },
  components: {
    DialogServiceTeikyo,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    this.getData();

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

    /*****************
     * ダイアログ表示
     */
    dialog(type) {
      this.select_mandatory = true;
      if (type == 'add') {
        this.selected = 0;
        this.$refs.dialogTeikyo.openDialog(type, '');
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
      for (let i = 0; i < this.allData.length; i++) {
        if (
          (this.toggle_enable === 0 && this.allData[i].enabled === true) ||
          (this.toggle_enable === 1 && this.allData[i].enabled === false)
        ) {
          array.push(this.allData[i]);
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
      if (this.toggle_sort === 0) {
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
      if (this.toggle_sort === 1) {
        // コード順に並び替え
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
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);
      // フォーマット
      this.methodCellFormatSetting(flexGrid);
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 修正登録の時のみモーダル画面の表示
          if (_self.selected === 1) {
            _self.$refs.dialogTeikyo.openDialog(
              'edit',
              _self.serviceData[ht.row]
            );
          }
        }
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },

    /*****************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      let self = this;

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel != flexGrid.columnHeaders) {
          if (e.col == 1 || e.col == 2 || e.col == 4 || e.col == 6) {
            e.cell.style.textAlign = 'left';
          }
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
      });
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
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

      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 4),
        new wjGrid.CellRange(0, 5, 1, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 0, 9),
        new wjGrid.CellRange(0, 10, 1, 10),
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
    getData() {
      let serviceData = [];
      serviceData.push(
        {
          code: '1001',
          serviceJigyosyoMei: '障害者支援施設 ひまわり園',
          ryakusyo: '生活ひまわり園',
          serviceMeisyoCode: '22',
          serviceMeisyo: '生活介護',
          jigyosyoBango: '1121000011',
          post1: '001',
          post2: '0012',
          jyusyo: '●●市××町1-1-1',
          tel: '',
          tel1: '03',
          tel2: '1111',
          tel3: '2222',
          fax: '',
          fax1: '03',
          fax2: '1111',
          fax3: '2222',
          mail: '',
          rese: 1,
          enabled: true,
        },
        {
          code: '1002',
          serviceJigyosyoMei: '短期入所施設 ひまわり園',
          ryakusyo: '短期ひまわり園',
          serviceMeisyoCode: '24',
          serviceMeisyo: '短期入所',
          jigyosyoBango: '1121000011',
          post1: '001',
          post2: '0012',
          jyusyo: '●●市××町1-1-1',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1003',
          serviceJigyosyoMei: '障害者支援施設 ひまわり園',
          ryakusyo: '入所ひまわり園',
          serviceMeisyoCode: '32',
          serviceMeisyo: '施設入所支援',
          jigyosyoBango: '1121000011',
          post1: '001',
          post2: '0012',
          jyusyo: '●●市××町1-1-1',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1004',
          serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
          ryakusyo: '生活たんぽぽ園',
          serviceMeisyoCode: '22',
          serviceMeisyo: '生活介護',
          jigyosyoBango: '1121000012',
          post1: '',
          post2: '',
          jyusyo: '',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1005',
          serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
          ryakusyo: '入所ひまわり園',
          serviceMeisyoCode: '32',
          serviceMeisyo: '施設入所支援',
          jigyosyoBango: '1121000012',
          post1: '',
          post2: '',
          jyusyo: '',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1006',
          serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
          ryakusyo: '自立訓練たんぽぽ園',
          serviceMeisyoCode: '41',
          serviceMeisyo: '自立訓練(機能訓練)',
          jigyosyoBango: '1121000019',
          post1: '',
          post2: '',
          jyusyo: '',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1007',
          serviceJigyosyoMei: '就労支援センター たんぽぽ園',
          ryakusyo: '就労支援たんぽぽ園',
          serviceMeisyoCode: '43',
          serviceMeisyo: '就労移行支援',
          jigyosyoBango: '1121000022',
          post1: '',
          post2: '',
          jyusyo: '',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: true,
        },
        {
          code: '1008',
          serviceJigyosyoMei: '就労支援センター たんぽぽ園',
          ryakusyo: '就労支援たんぽぽ園',
          serviceMeisyoCode: '46',
          serviceMeisyo: '就労継続支援B型',
          jigyosyoBango: '1121000023',
          post1: '',
          post2: '',
          jyusyo: '',
          tel: '',
          tel1: '',
          tel2: '',
          tel3: '',
          fax: '',
          fax1: '',
          fax2: '',
          fax3: '',
          mail: '',
          rese: 0,
          enabled: false,
        }
      );
      // 住所を接続する
      for (let i = 0; i < serviceData.length; i++) {
        if (serviceData[i].jyusyo) {
          serviceData[i]['jyusyoText'] =
            '〒' +
            serviceData[i].post1 +
            '-' +
            serviceData[i].post2 +
            '\n' +
            serviceData[i].jyusyo;
        } else {
          serviceData[i]['jyusyojyusyoText'] = '';
        }

        if (serviceData[i].tel1 && serviceData[i].tel2 && serviceData[i].tel3) {
          serviceData[i]['tel'] =
            serviceData[i].tel1 +
            '-' +
            serviceData[i].tel2 +
            '-' +
            serviceData[i].tel3;
        } else {
          serviceData[i]['tel'] = '';
        }

        if (serviceData[i].fax1 && serviceData[i].fax2 && serviceData[i].fax3) {
          serviceData[i]['fax'] =
            serviceData[i].fax1 +
            '-' +
            serviceData[i].fax2 +
            '-' +
            serviceData[i].fax3;
        } else {
          serviceData[i]['fax'] = '';
        }

        serviceData[i]['reseDisp'] = this.reseType[serviceData[i].rese];
      }

      this.serviceData = serviceData;
      this.allData = serviceData;
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

div#serviceTeikyo {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1266px;

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
  }

  .wj-cell {
    &.wj-state-selected {
      color: $font_color;
      background-color: $grid_hover_background;
    }
    &.wj-state-multi-selected {
      color: $font_color;
      background-color: $grid_hover_background;
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