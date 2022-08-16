<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <v-card elevation="2" class="pa-5">
        <v-toolbar-title class="text-subtitle-1"
          >サービス履歴　追加登録</v-toolbar-title
        >
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close()"
          class="closeButton"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters id="serviceArea" class="mt-5 user-info">
          <v-col cols="3"><label>利用者名</label></v-col>
          <v-col cols="*">
            <wj-combo-box
              class="input w100"
              readonly
              :text="selectData.code"
            ></wj-combo-box>
            <wj-combo-box
              class="input w200"
              readonly
              :text="selectData.riyosyamei"
            ></wj-combo-box>

            <v-btn
              elevation="0"
              class="pa-0 ml-1"
              x-small
              height="85%"
              style="min-width: auto; border-radius: 3px"
              tile
              @click="riyosyaClick('back')"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              class="pa-0 ml-1"
              x-small
              height="85%"
              style="min-width: auto; border-radius: 3px"
              tile
              @click="riyosyaClick('next')"
            >
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-3">
          <v-col cols="12">
            <div height="30" id="serviceDialog">
              <v-btn-toggle v-model="toggle_tabs">
                <v-btn small elevation="0">追加</v-btn>
                <v-btn small elevation="0">修正</v-btn>
              </v-btn-toggle>

              <v-card elevation="0" class="pt-4">
                <v-row no-gutters justify="space-between">
                  <v-col cols="6">
                    <v-row no-gutters class="user-info">
                      <v-col cols="3"><label>サービス事業所</label></v-col>
                      <v-col cols="*">
                        <wj-combo-box
                          class="input w60"
                          :text="selectData.serviceTeikyoJigyosyoCode"
                          v-model="selectData.serviceTeikyoJigyosyoCode"
                          readonly
                        ></wj-combo-box>
                        <wj-combo-box
                          class="input w300"
                          :text="selectData.serviceTeikyoJigyosyo"
                          readonly
                        ></wj-combo-box>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="user-info">
                      <v-col cols="3"><label>サービス名称</label></v-col>
                      <v-col cols="*">
                        <wj-combo-box
                          class="input w40"
                          :text="selectData.serviceCode"
                          readonly
                        ></wj-combo-box>
                        <wj-combo-box
                          class="input w220"
                          :text="selectData.serviceMeisyo"
                          readonly
                        ></wj-combo-box>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="user-info">
                      <v-col cols="3"><label>開始日</label></v-col>
                      <v-col cols="*">
                        <v-text-field
                          dense
                          outlined
                          tile
                          flat
                          :value="selectData.startDate"
                          @click="start_datepicker_dialog = true"
                          class="pa-0 ma-0 text-input"
                          hide-details="false"
                          append-icon="mdi-calendar-month"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="user-info">
                      <v-col cols="3"><label>終了日</label></v-col>
                      <v-col cols="*">
                        <v-text-field
                          dense
                          outlined
                          tile
                          flat
                          :value="selectData.endDate"
                          @click="end_datepicker_dialog = true"
                          class="pa-0 ma-0 text-input"
                          hide-details="false"
                          append-icon="mdi-calendar-month"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters v-if="toggle_tabs == 1">
                      <v-col class="mw100">利用種類</v-col>
                      <v-col>
                        <v-btn-toggle v-model="toggle_spice">
                          <v-btn small elevation="0">通常</v-btn>
                          <v-btn small elevation="0">体験</v-btn>
                        </v-btn-toggle>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-5 mb-5">
                      <v-col cols="2">
                        <v-btn
                          v-if="toggle_tabs == 0"
                          tile
                          small
                          elevation="1"
                          @click="gamenClear"
                          >画面クリア</v-btn
                        >
                        <v-btn v-if="toggle_tabs == 1" tile small elevation="1"
                          >削除</v-btn
                        >
                      </v-col>
                      <v-col align="left" cols="*" class="pt-1">
                        <v-card elevation="0" class="last_registrant">
                          <v-card-text
                            >最終登録者：2020/08/04 10:38
                            明治　正雄</v-card-text
                          >
                        </v-card>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          v-if="toggle_tabs == 0"
                          tile
                          small
                          elevation="1"
                          @click="addRegist"
                          >追加登録</v-btn
                        >
                        <v-btn
                          v-if="toggle_tabs == 1"
                          tile
                          small
                          elevation="1"
                          @click="editRegist"
                          >修正登録</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="5" style="margin-top: -100px">
                    <v-card class="pa-3" outlined>
                      <p class="text-caption">サービス事業所一覧 選択</p>
                      <v-btn-toggle
                        v-model="display_service"
                        @change="onDisplay_service"
                        class="mt-n5"
                      >
                        <v-btn small> 全部 </v-btn>
                        <v-btn small> 選択済 </v-btn>
                        <v-btn small> 未選択 </v-btn>
                      </v-btn-toggle>

                      <v-row no-gutters class="mt-1">
                        <v-col cols="12">
                          <alphabet-button
                            ref="alphabetButton"
                            @onAlphabetical="onAlphabetical"
                          ></alphabet-button>
                        </v-col>
                      </v-row>
                      <wj-flex-grid
                        :selectionMode="3"
                        id="svListInitialize"
                        :initialized="svListInitialize"
                        :allowMerging="6"
                        :headersVisibility="'Column'"
                        :alternatingRowStep="0"
                        :allowDragging="false"
                        :allowResizing="false"
                        :deferResizing="false"
                        :allowSorting="false"
                        :autoGenerateColumns="false"
                        :itemsSource="serviceList"
                        :itemsSourceChanged="onItemsSourceServiceList"
                        class="mt-1 ht200"
                      >
                        <wj-flex-grid-column
                          :header="'コード'"
                          :binding="'listCode'"
                          align="center"
                          valign="middle"
                          :width="80"
                          :isReadOnly="true"
                        ></wj-flex-grid-column>
                        <wj-flex-grid-column
                          :header="'サービス事業所名'"
                          :binding="'listJigyosyo'"
                          align="left"
                          valign="middle"
                          width="2*"
                          :isReadOnly="true"
                        ></wj-flex-grid-column>
                        <wj-flex-grid-column
                          :header="'サービス名称'"
                          :binding="'listKey'"
                          align="center"
                          valign="middle"
                          :width="30"
                          :isReadOnly="true"
                        ></wj-flex-grid-column>
                        <wj-flex-grid-column
                          :binding="'listMeisyo'"
                          align="left"
                          valign="middle"
                          width="2*"
                          :isReadOnly="true"
                        ></wj-flex-grid-column>
                      </wj-flex-grid>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <label class="text-caption mr-3">表示</label>
            <v-btn-toggle
              v-model="display_history"
              @change="onDisplay_history"
              mandatory
            >
              <v-btn small> 最新履歴 </v-btn>
              <v-btn small> 全履歴 </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" class="mt-2">
            <wj-flex-grid
              :selectionMode="3"
              id="svEditInitialize"
              :initialized="svEditInitialize"
              :allowMerging="6"
              :headersVisibility="'Column'"
              :alternatingRowStep="0"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
              :autoGenerateColumns="false"
              :itemsSource="serviceHistoryEdit"
              :itemsSourceChanged="onItemsSourceServiceEdit"
              :selectionChanged="onSelectionChangedEdit"
            >
              <wj-flex-grid-column
                :header="'コード'"
                :binding="'serviceTeikyoJigyosyoCode'"
                align="center"
                valign="middle"
                :width="80"
                format="f0"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス事業所名'"
                :binding="'serviceTeikyoJigyosyo'"
                align="left"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス種別'"
                :binding="'serviceCode'"
                align="center"
                valign="middle"
                :width="30"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :binding="'serviceMeisyo'"
                align="left"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'開始日'"
                :binding="'startDate'"
                align="center"
                valign="middle"
                :width="120"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'終了日'"
                :binding="'endDate'"
                align="center"
                valign="middle"
                :width="120"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'種類'"
                :binding="'spice'"
                align="center"
                valign="middle"
                :width="40"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="start_datepicker_dialog" width="290">
      <v-date-picker
        type="date"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect('start')"
        v-model="start_picker"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="end_datepicker_dialog" width="290">
      <v-date-picker
        type="date"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect('end')"
        v-model="end_picker"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import alphabetFilter from '@/utiles/alphabetFilter';

export default {
  props: ['historyData'],
  data() {
    return {
      dialog: false,
      start_datepicker_dialog: false,
      end_datepicker_dialog: false,
      serviceList: [], // サービス事業所一覧データ
      serviceListAll: [], // サービス事業所一覧データ
      serviceHistoryEdit: [], // 編集用履歴データ
      start_picker: '',
      end_picker: '',
      toggle_tabs: 0, // 追加修正切り替え
      display_service: 0, // サービス事業所
      display_history: 0, // 編集時のみ履歴表示
      selectData: {}, // 選択したデータ
      selectKey: '', // 親からの選択キー
      toggle_spice: '',
      editFlexGrid: null,
      selectEditRow: '', // 選択済みサービス一覧
    };
  },
  components: {
    AlphabetButton,
  },
  created() {},
  methods: {
    header_dialog_close: function () {
      this.dialog = false;
    },
    /************************
     *  利用者名矢印選択
     */
    riyosyaClick(type) {
      let selectKey = this.selectKey;
      let defaultKey = this.selectKey;
      if (type == 'next') {
        this.selectKey = parseInt(selectKey) + 1;
      }
      if (type == 'back') {
        this.selectKey = parseInt(selectKey) - 1;
      }
      // コードがない場合はnext:+1 back:-1
      if (
        this.historyData[this.selectKey] &&
        isNaN(this.historyData[this.selectKey].code)
      ) {
        if (type == 'next') {
          this.selectKey = parseInt(this.selectKey) + 1;
        }
        if (type == 'back') {
          this.selectKey = parseInt(this.selectKey) - 1;
        }
      }

      if (
        this.historyData[this.selectKey] &&
        !isNaN(this.historyData[this.selectKey].code)
      ) {
        let selectData = this.historyData[this.selectKey];
        if (this.historyData[this.selectKey]) {
          this.historyData[this.selectKey] = selectData;
          this.settingData();
        }
      } else {
        this.selectKey = defaultKey;
      }
      this.settingHistoryData();
    },
    /***************************
     * 画面クリア
     */
    gamenClear() {
      this.selectData.serviceTeikyoJigyosyoCode = '';
      this.selectData.serviceTeikyoJigyosyo = '';
      this.selectData.serviceCode = '';
      this.selectData.serviceMeisyo = '';
      this.selectData.startDate = '';
      this.selectData.endDate = '';
    },
    /************************
     * 追加登録ボタン
     */
    addRegist() {
      // APIにデータを渡す
      console.log(this.historyData[this.selectKey]);

      // 最新履歴の更新を行うgrid
      //this.editFlexGrid.refresh();
      //this.dialog = false;
    },
    /************************
     * 修正登録ボタン
     */
    editRegist() {
      // 選択している登録済み一覧を確認
      if (this.selectEditRow == -1) {
        alert('登録済み一覧より修正内容を選択してください。');
        return false;
      }
      // 選択済み登録一覧
      console.log(this.serviceHistoryEdit[this.selectEditRow]);
      // APIにデータを渡す
      console.log(this.historyData[this.selectKey]);

      // 最新履歴の更新を行うgrid
      this.editFlexGrid.refresh();
      //this.dialog = false;
    },
    openDialog(selectKey) {
      this.dialog = true;
      this.selectKey = selectKey;
      this.settingData();
      this.settingHistoryData();
    },
    /****************************
     * 選択したユーザー情報を各テキストエリアに記載
     */
    settingData() {
      let selectkey = this.selectKey; // 選択したデータ後程propsから取得する

      this.selectData = this.historyData[selectkey];
      if (this.selectData.startDate) {
        this.start_picker = moment(this.selectData.startDate).format(
          'YYYY-MM-DD'
        );
      }
      if (this.selectData.endDate) {
        this.end_picker = moment(this.selectData.endDate).format('YYYY-MM-DD');
      }
    },
    /****************************
     *  カレンダーから日付を選択
     */
    dateSelect(type) {
      if (type == 'start') {
        this.start_datepicker_dialog = false;
        this.selectData.startDate = moment(this.start_picker).format(
          'YYYY/MM/DD'
        );
      }
      if (type == 'end') {
        this.end_datepicker_dialog = false;
        this.selectData.endDate = moment(this.end_picker).format('YYYY/MM/DD');
      }
    },

    /********************
     * サービス事業所一覧
     */
    svListInitialize(listFlexGrid) {
      listFlexGrid.select(-1, -1);

      this.listFlexGrid = listFlexGrid;

      this.createListHeaderMerge(listFlexGrid);
      this.serviceList = this.getServiceData();
      this.serviceListAll = this.serviceList;

      // アイテムフォーマット
      listFlexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == listFlexGrid.columnHeaders) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
      });

      // クリックイベント
      let _self = this;
      listFlexGrid.hostElement.addEventListener('click', function (e) {
        //  var ht = listFlexGrid.hitTest(e);
        let hPage = listFlexGrid.hitTest(e.pageX, e.pageY);
        let selectRow = _self.serviceList[hPage.row];
        _self.selectData.serviceTeikyoJigyosyoCode = selectRow.listCode;
        _self.selectData.serviceTeikyoJigyosyo = selectRow.listJigyosyo;
        _self.selectData.listKey = selectRow.listKey;
        _self.selectData.serviceCode = selectRow.listKey;
        _self.selectData.serviceMeisyo = selectRow.listMeisyo;
      });

      this.onAlphabetical('');
    },
    onItemsSourceServiceList(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    /*******************
     * 編集用履歴
     */
    svEditInitialize(editFlexGrid) {
      this.editFlexGrid = editFlexGrid;
      //this.editFlexGrid.onSelectionChanged(null);
      this.createHistoryHeaderMerge(editFlexGrid);

      // アイテムフォーマット
      editFlexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == editFlexGrid.columnHeaders) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
      });
    },
    settingHistoryData() {
      // 表示用履歴の取得
      // 選択したデータと同じコードのデータを取得
      // 表示が最新履歴の時は終了日が空欄のデータのみ対象
      let serviceHistoryEdit = [];
      for (let i = 0; i < this.historyData.length; i++) {
        // if (this.historyData[i].code == this.historyData[this.selectKey].code) {
        //   if (
        //     (this.display_history === 0 &&
        //       this.historyData[i].endDate.length == 0) ||
        //     this.display_history === 1
        //   ) {
        serviceHistoryEdit.push(this.historyData[i]);
        //}
        //}
      }

      this.serviceHistoryEdit = serviceHistoryEdit;
    },
    onItemsSourceServiceEdit(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onSelectionChangedEdit(s, e) {
      this.selectEditRow = e.row;
    },
    /*******************
     *  履歴表示切替
     */
    onDisplay_history() {
      this.settingHistoryData();
    },

    /***************
     * サービス事業所一覧用データ
     */
    getServiceData() {
      let array = [];
      array.push(
        {
          listCode: '100101',
          listJigyosyo: '支援施設ひまわり園',
          kana: 'シセツシエンヒマワリエン',
          listKey: '22',
          listMeisyo: '生活介護',
        },
        {
          listCode: '100102',
          listJigyosyo: '短期入所ひまわり園',
          kana: 'タンキニュウショヒマワリエン',
          listKey: '24',
          listMeisyo: '短期入所',
        },
        {
          listCode: '100103',
          listJigyosyo: '施設支援ひまわり園',
          kana: 'シセツシエンヒマワリエン',
          listKey: '32',
          listMeisyo: '施設入所支援',
        },
        {
          listCode: '100202',
          listJigyosyo: '施設支援たんぽぽ園',
          kana: 'シセツシエンタンポポエン',
          listKey: '22',
          listMeisyo: '生活介護',
        },
        {
          listCode: '100202',
          listJigyosyo: '施設支援たんぽぽ園',
          kana: 'シセツシエンタンポポエン',
          listKey: '32',
          listMeisyo: '施設入所支援',
        },
        {
          listCode: '100203',
          listJigyosyo: '自立訓練たんぽぽ園',
          kana: 'ジリツクンレンタンポポエン',
          listKey: '41',
          listMeisyo: '自立訓練(機能訓練)',
        },
        {
          listCode: '100204',
          listJigyosyo: '就労支援たんぽぽ園',
          kana: 'シュウロウシエンタンポポエン',
          listKey: '43',
          listMeisyo: '就労移行支援',
        },
        {
          listCode: '100205',
          listJigyosyo: '就労支援たんぽぽ園',
          kana: 'シュウロウシエンタンポポエン',
          listKey: '46',
          listMeisyo: '就労継続支援B型',
        },
        {
          listCode: '100301',
          listJigyosyo: 'グループひまわり1号館',
          kana: 'グループヒマワリ',
          listKey: '33',
          listMeisyo: '共同生活援助',
        },
        {
          listCode: '100302',
          listJigyosyo: 'グループひまわり2号館',
          kana: 'グループヒマワリ',
          listKey: '33',
          listMeisyo: '共同生活援助',
        },
        {
          listCode: '100303',
          listJigyosyo: 'グループひまわり3号館',
          kana: 'グループヒマワリ',
          listKey: '33',
          listMeisyo: '共同生活援助',
        },
        {
          listCode: '100601',
          listJigyosyo: '相談支援ひなぎく',
          kana: 'ソウダンシエンヒナギク',
          listKey: '52',
          listMeisyo: '計画相談支援',
        }
      );

      return array;
    },
    /************************
     * サービス履歴マージ
     */
    createHistoryHeaderMerge(flexGrid) {
      let headerRanges = [new wjGrid.CellRange(0, 2, 0, 3)];
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
    /************************
     * サービス事業所一覧 選択マージ
     */
    createListHeaderMerge(flexGrid) {
      let headerRanges = [new wjGrid.CellRange(0, 2, 0, 3)];
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
     * サービス事業所一覧絞り込み
     */
    onDisplay_service() {
      this.onAlphabetical('');
    },
    /***************************
     * 50オン選択
     */
    onAlphabetical(key) {
      let data = alphabetFilter.alphabetFilter(
        this.serviceListAll,
        key,
        'kana'
      );
      this.serviceList = [];
      this.serviceList = data;

      // サービス事業所一覧の絞り込み
      if (this.display_service > 0) {
        data = [];
        for (let i = 0; i < this.serviceList.length; i++) {
          if (
            (this.display_service == 1 &&
              this.serviceHistoryEdit.findIndex(
                (hist) => hist.serviceCode == this.serviceList[i].listKey
              ) != -1 &&
              this.serviceHistoryEdit.findIndex(
                (hist) =>
                  hist.serviceTeikyoJigyosyoCode == this.serviceList[i].listCode
              ) != -1) ||
            (this.display_service == 2 &&
              this.serviceHistoryEdit.findIndex(
                (hist) => hist.serviceCode == this.serviceList[i].listKey
              ) == -1 &&
              this.serviceHistoryEdit.findIndex(
                (hist) =>
                  hist.serviceTeikyoJigyosyoCode == this.serviceList[i].listCode
              ) == -1)
          ) {
            data.push(this.serviceList[i]);
          }
        }
        this.serviceList = [];
        this.serviceList = data;
      }
    },
  },
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';

div#serviceArea {
  width: 500px;
}
div#serviceArea,
div#serviceDialog {
  font-size: 12px;
  min-width: 550px;
  .mw100 {
    max-width: 100px !important;
  }
  .text-input {
    font-size: 12px;
    width: 120px;
    .v-input__append-inner {
      position: absolute;

      right: 14px;
      top: 0;
      width: 12px;
      .v-input__icon {
        height: 12px;
        width: 12px;
        i {
          font-size: 12px;
        }
      }
    }
    .v-input__slot {
      min-height: 24px;
      padding: 0;
      .v-text-field__slot {
        width: 100%;
        height: 24px;
        position: absolute;
      }
      input {
        padding-left: 4px;
        display: block;
        width: 100%;
        height: 24px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
    }
    fieldset {
      border: 1px solid $border_color;
    }
    div {
      border-radius: 0;
    }
    input {
      padding: 2px 0px;
      max-height: 24px;
    }
  }
  .input {
    width: 100px;
    height: 20px;
    border-radius: 0px;
    &.w40 {
      width: 40px;
    }
    &.w60 {
      width: 60px;
    }
    &.w100 {
      width: 100px;
    }
    &.w200 {
      width: 200px;
    }
    &.w220 {
      width: 220px;
    }
    &.w300 {
      width: 300px;
    }
    &.w500 {
      width: 500px;
    }
  }

  .user-info,
  &.user-info {
    label {
      width: 90%;
    }
  }
}
.last_registrant {
  display: flex;
  align-items: flex-end;
  width: 90%;
  margin-left: 5%;
  .v-card__text {
    font-size: 12px;
    color: #fff !important;
    background-color: #ce3e47;
    animation-name: fadeInAnime;
    animation-fill-mode: forwards;
    opacity: 0;
    padding: 0;
    text-align: center;
    border-radius: initial;
  }
}
div#svListInitialize,
div#svEditInitialize {
  font-size: 12px;
  font-family: 'メイリオ';
  &.ht200 {
    height: 200px;
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
}
</style>
