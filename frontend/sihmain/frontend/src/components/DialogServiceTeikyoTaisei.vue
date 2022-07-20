<template>
  <div class="text-center" id="dialogServiceTeikyo">
    <v-dialog v-model="dialog" width="1020">
      <v-card elevation="2" class="pa-5" id="taiseiDialog">
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close()"
          class="closeButton ml-2"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >

        <v-row no-gutters>
          <v-col class="mw105 middle"><label>サービス事業所名</label></v-col>
          <v-col class="mw260 pa-0">
            <v-text-field
              outlined
              class="input pa-0 w260"
              v-model="input.serviceJigyosyoMei"
              readonly
            ></v-text-field>
          </v-col>
          <v-col class="pa-0 mw120">
            <v-text-field
              outlined
              class="input w120 pa-0"
              v-model="input.jigyosyoBango"
              readonly
            ></v-text-field>
          </v-col>
          <v-col class="mw105 middle ml-1"><label>サービス名称</label></v-col>
          <v-col class="mw60 pa-0">
            <v-text-field
              outlined
              class="input pa-0"
              v-model="input.serviceMeisyoCode"
              readonly
            ></v-text-field>
          </v-col>
          <v-col class="mw260 pa-0">
            <v-text-field
              outlined
              class="input pa-0 w260"
              v-model="input.serviceMeisyo"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-2" no-gutters>
          <v-col class="mw105 middle"><label>適用開始月</label></v-col>
          <v-col class="pa-0 mw120" style="position: relative">
            <v-text-field
              outlined
              class="input w120 pa-0"
              v-model="disabledDate"
            ></v-text-field>
            <v-icon
              small
              @click="datepicker_dialog = true"
              class="calender_icon"
              >mdi-calendar-month</v-icon
            >
          </v-col>
          <v-col class="mw20 text-center mt-1">～</v-col>
          <v-col class="pa-0 ml-3">
            <v-btn outlined small>前回履歴よりコピー</v-btn>
            <v-btn outlined small v-if="type == 'historyEdit'">履歴参照</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col cols="5">
            <v-toolbar-title class="text-caption text-center"
              >施設種類・定員等
            </v-toolbar-title>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"><label>級地区分</label></v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="kyutiCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="kyutiCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"
                ><label>多機能型事業</label></v-col
              >
              <v-col class="mw260 pa-0">
                <v-checkbox
                  v-model="gaitou"
                  class="text-caption pa-0 mt-0"
                  label="該当"
                  hide-details="false"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"><label>定員区分</label></v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="kubunCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="kubunCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 mw105 middle"
                ><label class="ht2"
                  ><p>障害区分別<br />定員</p></label
                ></v-col
              >
              <v-col class="mw260 pa-0">
                <v-row no-gutters class="mt-1">
                  <v-col cols="4" class="mt-1"> 知的障害児 </v-col>
                  <v-col cols="8">
                    <wj-combo-box
                      class="input w140"
                      :itemsSource="kubunCombo"
                      :selectedValuePath="'key'"
                      :displayMemberPath="'value'"
                    ></wj-combo-box>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-1">
                  <v-col cols="4" class="mt-1"> 自閉症児 </v-col>
                  <v-col cols="8">
                    <wj-combo-box
                      class="input w140"
                      :itemsSource="[]"
                      :selectedValuePath="'key'"
                      :displayMemberPath="'value'"
                    ></wj-combo-box>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-1">
                  <v-col cols="4" class="mt-1"> 育児 </v-col>
                  <v-col cols="8">
                    <wj-combo-box
                      class="input w140"
                      :itemsSource="[]"
                      :selectedValuePath="'key'"
                      :displayMemberPath="'value'"
                    ></wj-combo-box>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-1">
                  <v-col cols="4" class="mt-1"> ろうあ児 </v-col>
                  <v-col cols="8">
                    <wj-combo-box
                      class="input w140"
                      :itemsSource="[]"
                      :selectedValuePath="'key'"
                      :displayMemberPath="'value'"
                    ></wj-combo-box>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-1">
                  <v-col cols="4" class="mt-1"> 肢体不自由 </v-col>
                  <v-col cols="8">
                    <wj-combo-box
                      class="input w140"
                      :itemsSource="[]"
                      :selectedValuePath="'key'"
                      :displayMemberPath="'value'"
                    ></wj-combo-box>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105">
                <label class="ht2"
                  ><p>多機能型事業<br />定員区分</p>
                  <p></p></label
              ></v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="taKubunCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="taKubunCombo"
                ></wj-combo-box>
                <p>(各サービス種類の単位毎の利用定員)</p>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"
                ><label>人員配置区分</label></v-col
              >
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="jininKubunCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="jininKubunCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"><label>事業所区分</label></v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="jigyosyoCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="jigyosyoCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"><label>施設区分</label></v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="sisetsuCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="sisetsuCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"
                ><label>事業実施区分</label></v-col
              >
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="jigyojissiCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="jigyojissiCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"
                ><label>就労A型減免</label>
              </v-col>
              <v-col class="mw260 pa-0">
                <v-checkbox
                  v-model="syuroA"
                  class="text-caption pa-0 mt-0"
                  label="該当"
                  hide-details="false"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-1">
              <v-col class="pa-0 middle mw105"><label>負担減免額</label></v-col>
              <v-col class="mw260 pa-0 position-relative">
                <v-text-field outlined class="input pa-0"></v-text-field>
                <div class="unit">円</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="7" class="pl-2">
            <v-btn
              small
              outlined
              class="float-right"
              @click="taiseiKasanList_dialog = true"
              >体制加算一覧参照</v-btn
            >
            <v-toolbar-title class="text-caption text-center"
              >体制加算等
            </v-toolbar-title>

            <v-row no-gutters mt-2>
              <v-col>
                <wj-flex-grid
                  :initialized="onInitialized"
                  :selectionMode="3"
                  :allowMerging="6"
                  :headersVisibility="'Column'"
                  :allowDragging="false"
                  :allowResizing="false"
                  :deferResizing="false"
                  :allowSorting="false"
                  :autoRowHeights="true"
                  :itemsSource="taiseiKasan"
                  :isReadOnly="true"
                  class="mt-1"
                >
                  <wj-flex-grid-column
                    :binding="'name'"
                    :header="'選択済 基本・減算・加算名称'"
                    align="center"
                    valign="middle"
                    width="*"
                    format="g"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    :binding="'ritu'"
                    :header="'率'"
                    align="center"
                    valign="middle"
                    :width="30"
                    format="g"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    :binding="'teiin'"
                    :header="'加算用定員等'"
                    align="center"
                    valign="middle"
                    :width="180"
                    format="g"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-15">
          <v-col>
            <v-btn small v-if="type == 'historyAdd'">画面クリア</v-btn>
            <v-btn small v-else>削除</v-btn>
          </v-col>
          <v-col class="text-center mt-2"
            >最終登録者: R03/04/01 10:30 (明治 雅)</v-col
          >
          <v-col class="text-end">
            <v-btn small v-if="type == 'historyAdd'">履歴登録</v-btn>
            <v-btn small v-else>修正登録</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="datepicker_dialog" width="290">
      <v-date-picker
        type="date"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>

    <v-dialog v-model="taiseiKasanList_dialog" width="540" class="red">
      <v-card class="pa-3">
        <v-btn-toggle
          class="flex-wrap"
          v-model="selected"
          mandatory
          @change="onChangeSelected"
        >
          <v-btn small v-for="(btn, k) in botton_toggle" :key="k">{{
            btn
          }}</v-btn>
        </v-btn-toggle>

        <wj-flex-grid
          id="taiseilistGrid"
          :itemsSource="taiseiKasanList"
          :itemsSourceChanged="onTaiseilistChanged"
          :initialized="onTaiseiListInitialized"
          :selectionMode="3"
          :allowMerging="6"
          :headersVisibility="'Column'"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :autoRowHeights="true"
          :isReadOnly="true"
          class="mt-1"
        >
          <wj-flex-grid-column
            :header="'基本・減算・加算一覧'"
            :binding="'modeText'"
            :isDisabled="true"
            align="center"
            valign="middle"
            :width="34"
            format="g"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'text'"
            align="center"
            valign="middle"
            width="*"
            format="g"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :header="'選択'"
            :binding="'select'"
            align="center"
            valign="middle"
            :width="34"
            format="g"
            class="pa-0"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
export default {
  props: [],
  data() {
    return {
      type: '', // ダイアログを表示した際のボタン識別
      dialog: false,
      kyutiComboIndex: '',
      datepicker_dialog: false,
      taiseiKasanList_dialog: false,
      disabledDate: moment().format('YYYY/MM/DD'),
      picker: '',
      selected: '',
      syuroA: '',
      taiseiKasan: [],
      taiseilist: [],
      botton_toggle: ['全部', '選択済', '未'],
      kyutiCombo: [
        {
          key: 1,
          value: '1級地',
        },
        {
          key: 2,
          value: '2級地',
        },
        {
          key: 3,
          value: '3級地',
        },
      ],
      kubunCombo: [
        {
          key: 1,
          value: '21人～40人以下',
        },
        {
          key: 2,
          value: '41人～60人以下',
        },
      ],
      taKubunCombo: [
        {
          key: 1,
          value: '',
        },
        {
          key: 2,
          value: '',
        },
      ],
      jininKubunCombo: [
        {
          key: 1,
          value: 'Ⅰ型(7.5:1)',
        },
        {
          key: 2,
          value: 'Ⅱ型(7.5)',
        },
      ],
      jigyosyoCombo: [
        {
          key: 1,
          value: '指定',
        },
      ],
      sisetsuCombo: [
        {
          key: 1,
          value: '公立',
        },
      ],
      jigyojissiCombo: [
        {
          key: 1,
          value: '単独',
        },
      ],
      taiseiKasanList: this.getTaiseiKasanList(),
      input: {},
      gaitou: '',
    };
  },
  components: {},
  mounted() {},
  methods: {
    openDialog(type, data) {
      this.dialog = true;
      this.type = type;
      this.input.serviceJigyosyoMei = data.serviceJigyosyoMei;
      this.input.jigyosyoBango = data.jigyosyoBango;
      this.input.serviceMeisyoCode = data.serviceMeisyoCode;
      this.input.serviceMeisyo = data.serviceMeisyo;
      this.getTaiseiKasan();
    },

    /**************
     * 日付選択
     */
    dateSelect() {
      this.disabledDate = moment(this.picker).format('YYYY/MM/DD');
      this.datepicker_dialog = false;
    },

    header_dialog_close: function () {
      this.dialog = false;
    },

    /******************
     * 体制加算等
     */
    onInitialized(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.cells) {
          if (e.col == 0 || e.col == 2) {
            e.cell.style.textAlign = 'left';
          }
        }
      });
    },
    getTaiseiKasan() {
      this.taiseiKasan = [];
      this.taiseiKasan.push(
        {
          name: '就労移行支援体制加算Ⅰ',
          ritu: '',
          teiin: '継続就労者数[ ]人',
        },
        {
          name: '福祉専門職員配置等加算Ⅰ',
          ritu: '',
          teiin: '',
        },
        {
          name: '評価点区分 105点以上130点未満',
          ritu: '',
          teiin: '',
        }
      );
    },
    /**********************
     * 体制加算一覧データ
     */
    getTaiseiKasanList() {
      let array = [
        {
          mode: '1',
          modeText: '減算',
          text: '定員超過',
          select: '',
          lot: '',
          other: '継続就労者数[]人',
        },
        {
          mode: '1',
          modeText: '減算',
          text: '生活支援欠如',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '1',
          modeText: '減算',
          text: 'サービス管理責任者欠如',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '1',
          modeText: '減算',
          text: '自己評価未公表減算',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '2',
          modeText: '加算',
          text: '評価点区分 170点以上の場合',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '2',
          modeText: '加算',
          text: '評価点区分 150点以上170点未満の場合',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '2',
          modeText: '加算',
          text: '評価点区分 130点以上150点未満の場合',
          select: '',
          lot: '',
          other: '',
        },
        {
          mode: '2',
          modeText: '加算',
          text: '評価点区分 105点以上130点未満の場合',
          select: '',
          lot: '',
          other: '',
        },
      ];

      this.taiseiKasanList = array;
      return array;
    },
    /*****************
     * 体制一覧絞り込み
     */
    onChangeSelected() {
      if (this.selected === 1 || this.selected === 2) {
        let array = [];
        this.taiseiKasanList = [];

        //選択済み
        for (let i = 0; i < this.taiseiKasanListAll.length; i++) {
          if (
            (this.selected === 1 &&
              this.taiseiKasanListAll[i] &&
              this.taiseiKasanListAll[i].select) ||
            (this.selected === 2 &&
              this.taiseiKasanListAll[i] &&
              !this.taiseiKasanListAll[i].select)
          ) {
            array.push(this.taiseiKasanListAll[i]);
            //this.taiseiKasanList.concat(array);
          }
        }
        // console.log(array);

        this.taiseiKasanList = array;
      } else {
        this.taiseiKasanList = this.taiseiKasanListAll;
      }
      this.mergeTaiseiList(this.taiseiKasanGrid);
    },

    /****************
     * 体制加算一覧
     */
    onTaiseiListInitialized(flexGrid) {
      // 体制加算一覧全データを保持
      this.taiseiKasanListAll = this.taiseiKasanList;
      this.taiseiKasanGrid = flexGrid;
      // マージ
      this.mergeTaiseiList(flexGrid);
      // クリックイベント
      this.onSelectedTaiseiList(flexGrid);
      // フォーマット
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          e.cell.style.textAlign = '';
          e.cell.style.justifyContent = '';
          e.cell.style.alignItems = '';
          if (e.col == 1) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
        }
      });
    },
    onTaiseilistChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    /***********************
     * 体制加算一覧クリックイベント
     */
    onSelectedTaiseiList(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        if (ht.cellType == wjGrid.CellType.Cell) {
          if (!_self.taiseiKasanList[hPage.row].select) {
            _self.taiseiKasanList[hPage.row].select = 1;
            _self.taiseiKasanListAll[hPage.row].select = 1;
            flexGrid.setCellData(hPage.row, 2, '〇');
          } else {
            _self.taiseiKasanList[hPage.row].select = '';
            _self.taiseiKasanListAll[hPage.row].select = '';
            flexGrid.setCellData(hPage.row, 2, '');
          }
        }
      });
    },
    /***************************
     * 体制加算一覧マージ
     */
    mergeTaiseiList(flexGrid) {
      if (flexGrid.cells.rows.length == 0) {
        return false;
      }

      let group = [];
      group = this.createMergeArray(this.taiseiKasanList);

      let ranges = [];
      for (let i = 0; i < group.length; i++) {
        ranges.push(
          new wjGrid.CellRange(group[i].first, 0, group[i].last - 1, 0)
        );
      }
      let headerRanges = [];
      headerRanges = [new wjGrid.CellRange(0, 0, 0, 1)];

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
    createMergeArray(data) {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        array.push({
          row: i,
          mode: data[i]['mode'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'mode');
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
  },
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#taiseiDialog,
#taiseilistGrid,
div#dialogTeikyoTaisei {
  font-size: 12px;
  font-family: 'メイリオ';
  width: 100%;
  text-overflow: clip;

  .v-toolbar__title {
    background-color: $grid_hover_background;
    height: 30px;
    line-height: 30px;
  }
  label {
    font-size: 12px;
  }
  div.middle {
    label {
      display: inline-block;
      width: 100px;
      height: 26px;
      line-height: 26px;
      padding-left: 4px;
      background-color: $view_Title_background;

      &.ht2 {
        position: relative;
        height: 100%;
        line-height: normal;
        p {
          position: absolute;
          height: 35px;
          top: 0;
          left: 4px;
          bottom: 0;
          margin: auto;
        }
      }
    }
  }

  .position-relative {
    position: relative;
  }
  .unit {
    position: absolute;
    top: 6px;
    left: auto;
    right: 26px;
  }
  .calender_icon {
    position: absolute;
    top: 6px;
    left: auto;
    right: 10px;
  }

  .mw14 {
    max-width: 14px;
  }
  .mw20 {
    max-width: 20px;
  }
  .mw40 {
    max-width: 40px;
  }
  .mw60 {
    max-width: 60px;
  }
  .mw80 {
    max-width: 80px;
  }
  .mw105 {
    max-width: 105px;
  }
  .mw120 {
    max-width: 120px;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw260 {
    max-width: 260px;
  }
  .wj-cell {
    text-overflow: clip !important;
  }
  .middle {
    display: flex;
    align-items: center;
  }
  .input {
    width: 200px;
    height: 20px;
    border-radius: 0px;
    padding: 0;
    div {
      min-height: 20px !important;
    }
    &.w40 {
      width: 40px;
    }
    &.w60 {
      width: 60px;
    }
    &.w80 {
      width: 80px;
    }
    &.w100 {
      width: 100px;
    }
    &.w140 {
      width: 140px;
    }
    &.w160 {
      width: 160px;
    }
    &.w200 {
      width: 200px;
    }
    &.w260 {
      width: 260px;
    }
    &.w300 {
      width: 300px;
    }
    &.w400 {
      width: 400px;
    }
    &.w500 {
      width: 500px;
    }
  }
  .v-text-field {
    input {
      padding: 4px;
      font-size: 12px;
    }
    fieldset {
      border-radius: 0;
      border: 1px solid #ccc;
    }
    textarea {
      margin-top: 0 !important;
      padding-left: 4px;
    }
  }
}
</style>