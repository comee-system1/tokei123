<template>
  <div id="JyuryouTsuchisyo">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle" no-gutters>
        <v-col class="no-flex-grow">
          <div class="d-flex">
            <label>利用者</label>
            <wj-menu
              class="customCombobox"
              :itemsSource="riyosyaCombo"
              :itemClicked="onRiyosyaCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="全員"
              style="width: 200px"
            >
            </wj-menu>
          </div>
          <div class="d-flex mt-1">
            <label>市町村</label>
            <wj-menu
              class="customCombobox"
              :itemsSource="shityosonCombo"
              :itemClicked="onShityosonCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              style="width: 200px"
              selectedValuePath="'key'"
              header="指定なし"
            >
            </wj-menu>
          </div>
        </v-col>
        <v-col>
          <label class="ml-1 align-end">ソート</label>
          <!-- mandatoryは初期選択 -->
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: "
              @click="sort(1)"
            >
              カナ
            </v-btn>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="sort(2)"
            >
              コード
            </v-btn>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="sort(3)"
            >
              受給者番号
            </v-btn>
          </v-btn-toggle>
          <v-btn
            class="ml-1"
            small
            style="width: 60px; height: 25px;"
          >
            検索
          </v-btn>
        </v-col>
        <!-- no-flex-grow  -->
        <v-col class="d-flex justify-end">
          <div class="d-block">

            <div class="d-flex">
              <label>印刷種類</label>
              <!-- mandatoryは初期選択 -->
              <v-btn-toggle class="flex-wrap" mandatory>
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 90px"
                >
                  受領通知書
                </v-btn>
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 90px"
                >
                  一覧
                </v-btn>
              </v-btn-toggle>
            </div>
            <div class="d-flex mt-1">
              <div class="d-flex">
                <label>受領日</label>
                <v-btn
                  @click="inputCalendarClick('juryobi')"
                  tile
                  outlined
                  class="service"
                  height="25"
                  >{{ year }}年{{ month }}月{{ date }}日
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
                <v-btn
                  elevation="0"
                  color="white"
                  class="pa-0 ml-1"
                  x-small
                  @click="calendarClick(1)"
                  height="100%"
                  style="min-width: auto; height: 25px"
                  tile
                  ><v-icon>mdi-arrow-left-bold</v-icon></v-btn
                >
                <v-btn
                  x-small
                  elevation="0"
                  color="white"
                  class="pa-0 ml-1"
                  height="100%"
                  style="min-width: auto; height: 25px"
                  @click="calendarClick(2)"
                  tile
                  ><v-icon>mdi-arrow-right-bold</v-icon></v-btn
                >
              </div>
              <div class="mt-1 d-flex">
                <label>印刷日</label>
                <v-btn
                   class="service"
                  @click="inputCalendarClick('insatsubi')"
                  tile
                  outlined
                  height="25"
                  >{{ insatsubi_year }}年{{ insatsubi_month }}月{{ insatsubi_date }}日
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
                <v-btn
                  elevation="0"
                  color="white"
                  class="pa-0 ml-1"
                  x-small
                  @click="calendarClick(3)"
                  height="100%"
                  style="min-width: auto; height: 25px"
                  tile
                  ><v-icon>mdi-arrow-left-bold</v-icon></v-btn
                >
                <v-btn
                  x-small
                  elevation="0"
                  color="white"
                  class="pa-0 ml-1"
                  height="100%"
                  style="min-width: auto; height: 25px"
                  @click="calendarClick(4)"
                  tile
                  ><v-icon>mdi-arrow-right-bold</v-icon></v-btn
                >
              </div>
            </div>
            <v-dialog
              v-model="datepicker_dialog"
              width="290"
              class="datepicker_dialogs"
              >
              <v-date-picker
                id="jyuryoDatepicker"
                type="date"
                v-model="picker"
                locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()"
                @change="dateSelect"
              >
              </v-date-picker>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-sm-space-between align-end mt-1" no-gutters>
        <v-btn-toggle class="flex-wrap" mandatory>
          <v-btn
            small
            outlined
            v-for="(n, k) in alphabet"
            :key="n"
            :width="25"
            :height="25"
            :min-width="25"
            :max-width="25"
            @click="onAlphabet(k)"
          >
            {{ n }}
          </v-btn>
        </v-btn-toggle>
          <wj-menu
            :header="'全選択/全解除'"
            :itemClicked="onselectedIndexChanged"
            class="customCombobox customComboboxAuto"
          >
            <wj-menu-item>
              <b>選択/印刷を全選択</b>
            </wj-menu-item>
            <wj-menu-item>
              <b>選択/印刷を全解除</b>
            </wj-menu-item>
          </wj-menu>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="JyuryouTsuchisyoGrid"
          :headersVisibility="'Column'"
          :allowDelete="false"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :selectionMode="'Row'"
          :initialized="onInitialized"
          :itemsSource="JyuryouTsuchisyoData"
          :style="gridHeight"
        >
          <wj-flex-grid-column
            :binding="'jyukyuno'"
            :header="'受給者番号'"
            align="center"
            :width="100"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'rnames'"
            :header="'利用者名'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sityoryaku'"
            :header="'援護者'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'gsogaku'"
            :header="'サービスに要した費用の全体の額(A)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'gfutan'"
            :header="'利用者負担(B)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'honninbun'"
            :header="'(本人分)a'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keigentou'"
            :header="'(軽減等)b'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'gtokubetu'"
            :header="'特定障害者特別給付費(C)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dairi'"
            :header="'代理受領額(A)-(B)+(C)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :header="'受領日'"
            align="center"
            :width="160"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'print'"
            :header="'選択/印刷'"
            align="center"
            :width="20"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <v-row class="mt-2">
        <v-col class="pt-0 pb-0 mr-8 d-flex justify-end">
          <v-btn
            small
            style="width: 160px; height: 25px;"
            @click="registerJyuryoubi()"
          >
            受領日登録
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import { jyuryouTsuchisyo } from '@backend/api/JyuryouTsuchisyo';


const riyosyaCombo = [];
const shityosonCombo = [];
const alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];
export default {
  data() {
    return {
      insatsubi_year: moment().format('YYYY'),
      insatsubi_month: moment().format('MM'),
      insatsubi_date: moment().format('DD'),
      picker: '',
      datepicker_dialog: false,
      header_dialog: true,
      alphabet: alphabet,
      gridHeight: '', // グリッドの高さ
      riyosyaCombo: riyosyaCombo,
      shityosonCombo: shityosonCombo,
      JyuryouTsuchisyoData: [],
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      filterTextShityoson: { shityosonKey: 0, shityoson:'指定なし'}, // 検索項目
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      date: moment().format('DD'),
      alphaSelect: 0,
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
    }
  },
  components: {
    HeaderServices,
  },
  mounted() {
    this.handleResize();
  },
  created() {
    // グリッドリサイズ
    window.addEventListener('resize', this.handleResize);
    // 利用者コンボボックス
    this.riyosyaCombo = [];
    this.riyosyaCombo.push(
      {
        key: 0,
        text: '全員',
      },
      {
        key: 1,
        text: '今月入居者',
      },
      {
        key: 2,
        text: '今月退去者',
      }
    );
    // 市町村コンボボックス
    this.shityosonCombo = [];
    this.shityosonCombo.push(
        { 
          key: 0,
          text: '指定なし' 
        },
        {
          key: 1,
          text: '東経市' 
        },
        {
          key: 2,
          text: '西経市'
        },
        {
          key: 3,
          text: '南経市' 
        },
        {
          key: 4,
          text: '北経市' 
        },
    );
  },
  methods: {
    /**********
     * カレンダーdialogの表示
     */
    inputCalendarClick: function (dialog_type) {
      this.dialog_type = dialog_type;
      //受領日
      let picker = '';
      if (dialog_type == 'juryobi') picker = this.year + '-' + this.month + '-' + this.date;
      if (dialog_type == 'insatsubi')
        picker = this.insatsubi_year + '-' + this.insatsubi_month +'-' + this.insatsubi_date;

      this.picker = picker;
      this.datepicker_dialog = true;
    },
    inputCalendarYearClick: function () {
      //受領日
      this.datepickerYear_dialog = true;
    },
    kanryoToggleSwitch: function () {
      this.isActive = !this.isActive;
    },
    /**************
     * 月の選択 ダイアログの日付を押下
     */
    dateSelect: function () {
      let split = this.picker.split('-');
      if (this.dialog_type == 'juryobi') {
        this.year = split[0];
        this.month = split[1];
        this.date = split[2];
      }
      if (this.dialog_type == 'insatsubi') {
        this.insatsubi_year = split[0];
        this.insatsubi_month = split[1];
        this.insatsubi_date = split[2];
      }
      // this.$emit('parent-calendar', split);

      this.datepicker_dialog = false;
    },
    //カレンダーボタンの日付遷移
    // 提供月 1:前月 2:翌月
    // 請求月 3:前月 4:翌月
    calendarClick(type) {
      let changeDate = this.year + this.month + this.date;
      let changeInsatsubiDate = this.insatsubi_year + this.insatsubi_month + this.insatsubi_date;
      if (type == 1) {
        // 受領日←選択時
        this.month = moment(changeDate).subtract(1, 'days').format('MM');
        this.date = moment(changeDate).subtract(1, 'days').format('DD');
      } else if (type == 2) {
        // 受領日→選択時
        this.month = moment(changeDate).add(1, 'days').format('MM');
        this.date = moment(changeDate).add(1, 'days').format('DD');
      } else if (type == 3) {
        // 印刷日←選択時
        this.insatsubi_month = moment(changeInsatsubiDate).subtract(1, 'days').format('MM');
        this.insatsubi_date = moment(changeInsatsubiDate).subtract(1, 'days').format('DD');
      } else if (type == 4) {
        // 印刷日→選択時
        this.insatsubi_month = moment(changeInsatsubiDate).add(1, 'days').format('MM');
        this.insatsubi_date = moment(changeInsatsubiDate).add(1, 'days').format('DD');
      }
    },
    /*********************
     * 利用者変更
     */
    onRiyosyaCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.onRiyosya(e.text, e.selectedIndex);
        e.text,
        e.selectedIndex
      }
      let f = document.activeElement;
      f.blur();
    },
    /*********************
     * 市町村変更
     */
    onShityosonCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.onShityoson(e.text, e.selectedIndex);
        e.text,
        e.selectedIndex
      }
      let f = document.activeElement;
      f.blur();
    },
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 62;
      if (height > 800) {
        ht = 65;
      }
      this.gridHeight = 'height:' + 'calc(' + ht + 'vh - 12px);';
    },
    getData(result) {
      this.JyuryouTsuchisyoData = result.icrn_inf;
      this.allData = this.JyuryouTsuchisyoData;
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      let _self = this;
      jyuryouTsuchisyo().then((result) => {
        // データ取得
        this.getData(result);
      });
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);

      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);

      // セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      // グリッドのデザイン修正
      this.gridDesignModify(flexGrid);

      flexGrid.itemsSource = this.JyuryouTsuchisyoData;
    },
    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        // let jyuryoubiYmd = _self.year + '年' + _self.month + '月' + _self.date + '日'
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 印刷カラムを押下
          if (hPage.col == 10) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 10) === '〇') {
              // 既に〇がついていた場合値をクリア
              mark = ' ';
              flexGrid.setCellData(hPage.row, 9, ' ');
            }
            flexGrid.setCellData(hPage.row, 10, mark);
          }
        }
      });
    },
    /************
     * 受領日の書き込み
     */
    registerJyuryoubi() {
      let jyuryoubiYmd = this.year + '年' + this.month + '月' + this.date + '日'
      for (let i = 0; i < this.JyuryouTsuchisyoData.length; i++) {
        if ((this.mainFlexGrid.getCellData(i, 10) === '〇') &&
        ((this.mainFlexGrid.getCellData(i, 9) === null) ||
        ((this.mainFlexGrid.getCellData(i, 9) === ' ')))) {
          // 受領日を表示
          this.mainFlexGrid.setCellData(i, 9 ,jyuryoubiYmd);
        }
        // 選択されている受領日を取得
        let yuryoubiView = "";
        let formatYear  = ""
        let formatMonth = ""
        let formatDate  = ""

        if (this.mainFlexGrid.getCellData(i, 9) !== null) {

          yuryoubiView = this.mainFlexGrid.getCellData(i, 9);
          // 登録する値をフォーマット
          formatYear = yuryoubiView.substr(0, 4);
          formatMonth = yuryoubiView.substr(5, 2);
          formatDate = yuryoubiView.substr(8, 2);
        } else {
            yuryoubiView = "";
        }

        // 選択されている受領日を登録
        this.JyuryouTsuchisyoData[i]['jyuymd'] = formatYear + formatMonth + formatDate;
      }
    },
    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      // ヘッダーに空行を追加
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.rows.defaultSize = 20;
      flexGrid.columnHeaders.rows[2].height = 60;
      // ヘッダーに文字列をセット
      panel.setCellData(0, 0, '受給番号');
      panel.setCellData(0, 1, '利用者名');
      panel.setCellData(1, 2, '援護者');
      // 2行以上で表示する行は"gridDesignModify"で文字列を設定
      // panel.setCellData(1, 3, 'サービスに要した費用の全体の額(A)');
      // panel.setCellData(1, 7, '特定障害者特別給付費(C)');
      // panel.setCellData(1, 8, '代理受領額(A)-(B)+(C)');
      panel.setCellData(0, 9, '受領日');
      panel.setCellData(0, 10, '選択／印刷');
      panel.setCellData(0, 2, '市町村代理受領額');
      panel.setCellData(1, 4, '利用者負担額');
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 2, 0), // 受給番号
        new wjGrid.CellRange(0, 1, 2, 1), // 利用者名
        new wjGrid.CellRange(1, 2, 2, 2), // 援護者
        new wjGrid.CellRange(1, 3, 2, 3), // サービスに要した費用の全体の額
        new wjGrid.CellRange(1, 7, 2, 7), // 特定障害者特別給付費
        new wjGrid.CellRange(1, 8, 2, 8), // 代理受領額
        new wjGrid.CellRange(0, 9, 2, 9), // 受領日
        new wjGrid.CellRange(0, 10, 2, 10), // 印刷
        new wjGrid.CellRange(0, 2, 0, 8), // 市町村代理受領額
        new wjGrid.CellRange(1, 4, 1, 6), // 利用者負担額
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
    /*****************
     * グリッドのデザイン修正
     */
    gridDesignModify(flexGrid) {
 
    flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.color = sysConst.COLOR.fontColor;
        s.fontWeight = 'normal';
        s.fontSize = '12px'
        // s.border = 'solid 1px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダー上下中央寄せ
          if((r == 0) || (r == 1) || (r == 2)){
            s.display = 'flex';
            s.alignItems ='center'
            s.justifyContent ='center'
          }
          // 印刷セル縦書き
          if((r == 0) && (c == 10)){
            s.writingMode = 'vertical-rl';
            s.borderRight= 'none';
          }
          // 2行以上で表示する行に文字列を挿入
          if ((r == 1) && (c == 3)) {
            cell.innerHTML = 'サービスに要した<br/>費用の全体の額<br/>(A)';
          }
          if ((r == 2) && (c == 4)) {
            cell.innerHTML = '利用者負担<br/>(B)<br/>a+b';
          }
          if ((r == 2) && (c == 5)) {
            cell.innerHTML = '(本人分)<br/>a';
          }
          if ((r == 2) && (c == 6)) {
            cell.innerHTML = '(軽減等)<br/>b';
          }
          if ((r == 1) && (c == 7)) {
            cell.innerHTML = '特定障害者<br/>特別給付費<br/>(C)';
          }
          if ((r == 1) && (c == 8)) {
            cell.innerHTML = '代理受領額<br/>(A)-(B)+(C)';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if (c == 9) {
            s.backgroundColor = sysConst.COLOR.white;
          }
          if (c == 10) {
            s.backgroundColor = sysConst.COLOR.white;
            s.borderRight= 'none';
          }
          // 文字の位置変更
          if ((c == 1) || (c == 2)) {
            s.textAlign = 'left';
            s.paddingLeft = '4px'
          }
          for (let h = 3; h <= 8; h++) {
            // 3列目～8列目を右寄せ
            if (c == h) {
              s.textAlign = 'right';
              s.paddingRight = '4px'
            }
          }
        }
      }
    },
    /**************
     * 並び順変更
     */
    sort(type) {
      this.sortFlag.kanaFlag = false;
      this.sortFlag.codeFlag = false;
      this.sortFlag.bangoFlag = false;
      if (type == 1) {
        this.sortFlag.kanaFlag = true;
      }
      if (type == 2) {
        this.sortFlag.codeFlag = true;
      }
      if (type == 3) {
        this.sortFlag.bangoFlag = true;
      }

      this.onSort(type)
    },
    /******************
     * ソートの実行
     */
    onSort(type) {
      let array = this.JyuryouTsuchisyoData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.rnames !== "" && b.rnames !== "") {
            if (a.rnames < b.rnames) {
              return -1;
            }
            if (a.rnames > b.rnames) {
              return 1;
            }
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.riyocode !== "" && b.riyocode !== "") {
            if (a.riyocode < b.riyocode) {
              return -1;
            }
            if (a.riyocode > b.riyocode) {
              return 1;
            }
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyuno !== "" && b.jyukyuno !== "") {
            if (a.jyukyuno < b.jyukyuno) {
              return -1;
            }
            if (a.jyukyuno > b.jyukyuno) {
              return 1;
            }
          }
          return 0;
        });
      }

      this.JyuryouTsuchisyoData = array;
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.refresh();
    },
    /*********************
     * 全選択
     */
    onselectedIndexChanged(s) {
      // 印刷用
      console.log(s.selectedIndex)
      if (s.selectedIndex == 0 || s.selectedIndex == 1) {
        this.selectAll(s.selectedIndex);
      }
    },
    /**********************
     * 全選択/全解除
     */
    selectAll(type) {
      let mark = ' ';
      if (type == 0) {
        mark = '〇';
        for (let i = 0; i < this.allData.length; i++) {
          this.mainFlexGrid.setCellData(i, 10, mark);
        }
      }
      else {
        for (let i = 0; i < this.allData.length; i++) {
          this.mainFlexGrid.setCellData(i, 10, ' ');
          this.mainFlexGrid.setCellData(i, 9, ' ');
        }
      }
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      this.alphaSelect = key;
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.filtered();
      // this.griddata = this.filtered();
    },
    /*************
     * 利用者のフィルタリング
     */
   onRiyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.filtered();
      // this.griddata = this.filtered();
    },
    /*************
     * 市町村のフィルタリング
     */
    onShityoson(text, key) {
      // フィルタリングの実施
      this.filterTextShityoson = { shityosonKey: key, shityoson: text };
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.filtered();
      // this.griddata = this.filtered();
    },
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        // 検索条件がないとき
        if (this.filterTextRiyosya.riyosyaKey == 0 &&
            this.filterTextShityoson.shityosonKey == 0){
          array.push(this.allData[i]);
        } else {
          if (
            // 利用者コンボボックス
            ((this.filterTextRiyosya.riyosyaKey == 0) ||
            (this.filterTextRiyosya.riyosyaKey == 1 && this.allData[i]['nyukyo'] == 1) ||
            (this.filterTextRiyosya.riyosyaKey == 2 && this.allData[i]['taikyo'] == 1)) &&
            // 市町村コンボボックス
            ((this.allData[i]['sityoryaku'].indexOf(
              this.filterTextShityoson.shityoson
            ) != -1 ) ||
            (this.filterTextShityoson.shityosonKey == 0))
          ) {
            array.push(this.allData[i]);
          }
        }
      }
      let select = this.alphaSelect;
      let get = [];
      array.forEach(function (value) {
        switch (select) {
          case 0:
            get.push(value);
            break;
          case 1:
            if (value.rkana.match(/^[ア-オ]/)) {
              get.push(value);
            }
            break;
          case 2:
            if (value.rkana.match(/^[カ-コ]/)) {
              get.push(value);
            }
            break;
          case 3:
            if (value.rkana.match(/^[サ-ソ]/)) {
              get.push(value);
            }
            break;
          case 4:
            if (value.rkana.match(/^[タ-ト]/)) {
              get.push(value);
            }
            break;
          case 5:
            if (value.rkana.match(/^[ナ-ノ]/)) {
              get.push(value);
            }
            break;
          case 6:
            if (value.rkana.match(/^[ハ-ホ]/)) {
              get.push(value);
            }
            break;
          case 7:
            if (value.rkana.match(/^[マ-モ]/)) {
              get.push(value);
            }
            break;
          case 8:
            if (value.rkana.match(/^[ヤ-ヨ]/)) {
              get.push(value);
            }
            break;
          case 9:
            if (value.rkana.match(/^[ラ-ロ]/)) {
              get.push(value);
            }
            break;
          case 10:
            if (value.rkana.match(/^[ワ-ン]/)) {
              get.push(value);
            }
            break;
        }
      });
      return get;
    }
  }
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#JyuryouTsuchisyo {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .user-info {
    label {
      margin-right: 4px!important;
    }
  }
  .no-flex-grow {
    flex-grow: 0;
  }
  .customCombobox .wj-form-control {
    padding: 5px 6px;
  }
  .combo:hover {
    background-color: #e1e1e1;
  }

  .combo:focus {
    background-color: #fff;
  }
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }
  #JyuryouTsuchisyoGrid {
    .wj-cell {
      padding: 1px 0;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: $light-gray;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: $brawn;
      border-radius: 0px;
    }
  }
  .v-btn-toggle > .v-btn {
    width: 100px;
    height: 25px;
  }
}
#jyuryoDatepicker {
  position: absolute;
  top: 200px;
  left: 55%;
  width: auto;
}
</style>
