<template>
  <div id="jyuryoTsuchisyoList" :style="styles">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :searchButtonFlag="true"
      :seikyuflag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters flat tile class="d-flex ml-1 mb-1 mt-1">
        <!-- 利用者選択 -->
        <label class="koumokuTitle titleBlueDark mr-1" width="80" height="20"
          >利用者</label
        >
        <select
          v-model="selectCities"
          @change="changeCity"
          class="selectCities"
          height="20"
        >
          <option
            v-for="user in selectUsersList"
            :key="user.id"
            :value="user.id"
          >
            {{ user.name }}
          </option>
        </select>
        <!-- ソート機能 -->
        <label class="koumokuTitle titleBlueDark ml-1" width="80">ソート</label>
        <v-card elevation="0" tile outlined class="pl-1 ml-1" height="20">
          <div v-for="list in sortTypeList" :key="list.id" class="radioInline">
            <input
              v-model="sortType"
              @change="sortUserList(list.id)"
              type="radio"
              :id="'sort-' + list.id"
              :value="list.id"
              name="srv"
            />
            <label :for="'sort-' + list.id" class="customRadio mr-2">
              {{ list.name }}
            </label>
          </div>
        </v-card>
        <v-card class="ml-1 mr-1">
          <v-btn small height="20">検索</v-btn>
        </v-card>
        <div class="d-flex ml-auto">
          <label class="koumokuTitle titleOrange" width="80">印刷種類</label>
          <v-card elevation="0" tile outlined class="pl-1 ml-1" height="20">
            <div v-for="val in printTypeList" :key="val.id" class="radioInline">
              <input
                v-model="printType"
                type="radio"
                :id="'service-' + val.id"
                :value="val.id"
                name="print"
              />
              <label :for="'service-' + val.id" class="customRadio mr-2">
                {{ val.name }}
              </label>
            </div>
          </v-card>
        </div>
      </v-row>
      <v-row no-gutters flat tile class="d-flex ml-1 mt-1">
        <label class="koumokuTitle titleBlueDark mr-1" width="80" height="20"
          >市区町村</label
        >
        <select
          v-model="selectCities"
          @change="changeCity"
          class="selectCities"
          height="20"
        >
          <option
            v-for="list in selectCitiesLists"
            :key="list.id"
            :value="list.id"
          >
            {{ list.name }}
          </option>
        </select>
        <div class="d-flex ml-auto">
          <!-- カレンダー1 -->
          <label
            class="koumokuTitle titleOrange ml-1 mr-1"
            width="80"
            height="20"
            >受領日</label
          >
          <v-btn
            elevation="2"
            class="pa-1 service"
            :width="160"
            @click="inputCalendar('juryo')"
            tile
            outlined
            height="20"
            >{{ year }}年{{ month }}月{{ day }}日
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <!-- 左右矢印 -->
          <v-card
            color="transparent"
            height="100%"
            style="border: none"
            outlined
            tile
          >
            <v-btn
              elevation="2"
              class="ml-1 btnymd"
              @click="changeMonth(1)"
              height="100%"
              style="min-width: auto; height: 20px; text-align: center"
              outlined
              tile
              ><v-icon>mdi-arrow-left-bold</v-icon>前日</v-btn
            >
            <v-btn
              elevation="2"
              class="ml-1 btnymd"
              height="100%"
              style="min-width: auto; height: 20px; text-align: center"
              @click="changeMonth(2)"
              tile
              outlined
              >翌日<v-icon>mdi-arrow-right-bold</v-icon></v-btn
            >
          </v-card>
          <!-- カレンダー2 -->
          <label
            class="koumokuTitle titleOrange ml-1 mr-1"
            width="80"
            height="20"
            >印刷日</label
          >
          <v-btn
            elevation="2"
            class="pa-1 service"
            :width="160"
            @click="inputCalendar('print')"
            tile
            outlined
            height="20"
            >{{ print_year }}年{{ print_month }}月{{ print_day }}日
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-card
            class="ml-1"
            color="transparent"
            height="100%"
            style="border: none"
            outlined
            tile
          >
            <v-btn
              elevation="2"
              class="ml-1 btnymd"
              @click="changeMonth(3)"
              height="100%"
              style="min-width: auto; height: 20px; text-align: center"
              tile
              ><v-icon>mdi-arrow-left-bold</v-icon>前日</v-btn
            >
            <v-btn
              elevation="2"
              class="ml-1 btnymd"
              height="100%"
              style="min-width: auto; height: 20px; text-align: center"
              @click="changeMonth(4)"
              tile
              >翌日<v-icon>mdi-arrow-right-bold</v-icon></v-btn
            >
          </v-card>
        </div>
      </v-row>
      <v-row no-gutters class="ml-1 mt-1">
        <v-col>
          <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
          </alphabet-button>
        </v-col>
        <!-- ボタン仮置き -->

        <v-col style="text-align: right">
          <select
            class="selectCities min"
            @change="onselectedIndexChanged()"
            v-model="selectedAll"
          >
            <option :value="val.id" v-for="(val, k) in selectPrint" :key="k">
              {{ val.name }}
            </option>
          </select>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1 ml-1">
        <wj-flex-grid
          id="jyuryoTsuchisyoGrid"
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
        >
          <wj-flex-grid-column
            v-for="val in gridHeaderData"
            v-show="sortType == 1"
            :key="val.id"
            :header="val.header"
            :binding="val.binding"
            :width="val.width"
            :word-wrap="true"
            :multi-line="true"
            :allowResizing="true"
            :isReadOnly="true"
            :allowMerging="'AllHeaders'"
            align="right"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <v-col class="mb-1" style="text-align: right">
        <v-btn small height="20">受領日登録</v-btn>
      </v-col>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog v-model="datepickerJuryo" width="300">
      <v-date-picker
        id="datepickerJuryo"
        type="date"
        v-model="picker_juryo"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="selectDate"
      >
      </v-date-picker>
    </v-dialog>
    <!-- 対象外アラート/出力時は実装 -->
    <!-- <v-row id="screen_dialog" v-show="notIncluededFlag">
      <v-col class="text-h2">
        <p>こちらのサービスは対象外です。</p>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import dayjs from 'dayjs';

export default {
  props: {
    selectedUserObj: Object,
  },
  data() {
    return {
      serviceArgument: '', // ヘッダメニューのサービス選択
      alertMessageFlag: false, // 変更時のアラートメッセージ
      headerheight: 240,

      // カレンダー
      picker_juryo: '',
      dialog_type: '',
      datepickerYear_dialog: false,
      datepickerJuryo: false,
      year: dayjs().format('YYYY'),
      month: dayjs().format('MM'),
      day: dayjs().format('DD'),
      print_year: dayjs().format('YYYY'),
      print_month: dayjs().format('MM'),
      print_day: dayjs().format('DD'),

      // 利用者選択
      selectUsers: 0,
      selectUserId: '',
      selectUsersList: [{ id: 0, name: '全員' }],
      // 都市選択
      selectCities: 0,
      selectCitiesLists: [
        { id: 0, name: '指定なし' },
        { id: 1, name: '東経市' },
        { id: 2, name: '西経市' },
        { id: 3, name: '北経市' },
        { id: 4, name: '南経市' },
      ],
      // ソート
      sortType: 1,
      sortTypeList: [
        { id: 1, name: 'コード' },
        { id: 2, name: 'カナ' },
        { id: 3, name: '受給者番号' },
      ],
      // 印刷種類
      printType: 0,
      printTypeList: [
        { id: 0, name: '受領通知' },
        { id: 1, name: '一覧' },
      ],
      selectPrint: [
        { id: 0, name: '全選択/全解除' },
        { id: 1, name: '全選択' },
        { id: 2, name: '全解除' },
      ],
      selectedAll: 0,
      // Grid
      viewData: [], // itemsSource
      viewDataAll: [],
      flexGrid: [],

      // ヘッダーデータ
      gridHeaderData: [
        // grid header
        {
          id: 1,
          width: '*',
          header: 'コード',
          binding: 'userCode',
        },
        {
          id: 2,
          width: '*',
          header: '受給番号',
          binding: 'jukyuNo',
        },
        {
          id: 3,
          width: '*',
          header: '利用者名',
          binding: 'userName',
        },
        {
          id: 4,
          width: '*',
          header: '援護者',
          binding: 'engoName',
        },
        {
          id: 5,
          width: '*',
          header: 'サービスに要した費用の全体の額(A)',
          binding: 'serviceAllAmount',
        },
        {
          id: 6,
          width: '*',
          header: '利用者負担(B)\n a + b',
          binding: 'userPayment',
        },
        {
          id: 7,
          width: '*',
          header: '(本人分)\na',
          binding: 'userSelf',
        },
        {
          id: 8,
          width: '*',
          header: '(軽減等)\nb',
          binding: 'keigen',
        },
        {
          id: 9,
          width: '*',
          header: '特定障害者特別給付費(C)',
          binding: 'tokubetsuKyufu',
        },
        {
          id: 10,
          width: '*',
          header: '代理受領額\n(A)-(B)+(C)',
          binding: 'dairiJuryo',
        },
        {
          id: 11,
          width: 100,
          header: '受領日',
          binding: 'juryoDate',
        },
        {
          id: 12,
          width: 30,
          header: '選択/印刷',
          binding: 'print',
        },
      ],
      // 対象外アラート
      notIncluededFlag: false,
    };
  },
  components: {
    HeaderServices,
    AlphabetButton,
  },
  computed: {
    // window height
    styles() {
      return { '--height': window.innerHeight - this.headerheight + 'px' };
    },
  },
  /*******************************
   * ページウィンドウサイズ
   */
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('jyuryoTsuchisyoGrid') != null) {
        document.getElementById('jyuryoTsuchisyoGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setUserdata(item) {
      if (item != null) {
        this.dispUserObj = Object.assign({}, item);
        this.userName = this.dispUserObj.names;
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

      // 検索ボタン使用時はここで実装
      // if (serviceArgument.search_button) {
      // }
    },
    parentServiceChange() {
      this.notIncluededFlag = false;
    },
    /*********************
     * カレンダー機能
     ******/
    //---ダイアログ---//
    selectDate() {
      let split = this.picker_juryo.split('-');
      if (this.dialog_type == 'juryo') {
        this.year = split[0];
        this.month = split[1];
        this.day = split[2];
      }
      if (this.dialog_type == 'print') {
        this.print_year = split[0];
        this.print_month = split[1];
        this.print_day = split[2];
      }
      this.datepickerJuryo = false;
    },
    //---日付を選択したままにする---//
    inputCalendar(dialog_type) {
      this.dialog_type = dialog_type;
      let picker = '';
      if (dialog_type == 'juryo') {
        picker = this.year + '-' + this.month + '-' + this.day;
      }

      if (dialog_type == 'print') {
        picker =
          this.print_year + '-' + this.print_month + '-' + this.print_day;
      }
      this.picker_juryo = picker;
      this.datepickerJuryo = true;
    },
    //---月の前後選択---//
    changeMonth(type) {
      // 受領日
      let date = this.year + this.month + this.day;
      // 印刷日
      let print_date = this.print_year + this.print_month + this.print_day;

      // 前日(⇐)へ変更
      if (type == 1) {
        this.year = dayjs(date).subtract(1, 'day').format('YYYY');
        this.month = dayjs(date).subtract(1, 'day').format('MM');
        this.day = dayjs(date).subtract(1, 'day').format('DD');
        date = this.year + '-' + this.month + '-' + this.day;
      }
      if (type == 3) {
        this.print_year = dayjs(print_date).subtract(1, 'day').format('YYYY');
        this.print_month = dayjs(print_date).subtract(1, 'day').format('MM');
        this.print_day = dayjs(print_date).subtract(1, 'day').format('DD');
        print_date = this.year + '-' + this.month + '-' + this.day;
      }
      // 翌日(⇒)へ変更
      if (type == 2) {
        this.year = dayjs(date).add(1, 'day').format('YYYY');
        this.month = dayjs(date).add(1, 'day').format('MM');
        this.day = dayjs(date).add(1, 'day').format('DD');
        date = this.year + '-' + this.month + '-' + this.day;
      }
      if (type == 4) {
        this.print_year = dayjs(print_date).add(1, 'day').format('YYYY');
        this.print_month = dayjs(print_date).add(1, 'day').format('MM');
        this.print_day = dayjs(print_date).add(1, 'day').format('DD');
        print_date = this.year + '-' + this.month + '-' + this.day;
      }
    },
    /*******************
     * 請求書 計画相談グリッド
     */
    /**** 初期 */
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      // デフォルトデータ (API想定)
      let viewData = [];
      viewData.push({
        jukyuNo: '1000123598',
        userCode: 100,
        userName: '東経 三郎',
        kana: 'ﾄｳｹｲ ｻﾌﾞﾛｳ',
        cityNo: 3,
        engoName: '北経市',
        serviceAllAmount: 1258400000,
        userPayment: 12584000,
        userSelf: '',
        keigen: '',
        tokubetsuKyufu: 12584000,
        dairiJuryo: 12584000,
        juryoDate: '',
        print: '',
      });
      viewData.push({
        jukyuNo: '1000123597',
        userCode: 101,
        userName: '西経 さおり',
        kana: 'ｻｵﾘ ﾆｼｹｲ',
        cityNo: 4,
        engoName: '南経市',
        serviceAllAmount: 1258400000,
        userPayment: 12584000,
        userSelf: '',
        keigen: '',
        tokubetsuKyufu: 12584000,
        dairiJuryo: 12584000,
        juryoDate: '',
        print: '',
      });
      viewData.push({
        jukyuNo: '1000123599',
        userCode: 102,
        userName: '東経 次郎',
        kana: 'ﾄｳｹｲ ｼﾞﾛｳ',
        cityNo: 2,
        engoName: '西経市',
        serviceAllAmount: 1258400000,
        userPayment: 12584000,
        userSelf: '',
        keigen: '',
        tokubetsuKyufu: 12584000,
        dairiJuryo: 12584000,
        juryoDate: '',
        print: '',
      });

      viewData.push({
        jukyuNo: '1000123597',
        userCode: 103,
        userName: '東経 愛子',
        kana: 'ﾄｳｹｲ ｱｲｺ',
        cityNo: 1,
        engoName: '東経市',
        serviceAllAmount: 1258400000,
        userPayment: 12584000,
        userSelf: '',
        keigen: '',
        tokubetsuKyufu: 12584000,
        dairiJuryo: 12584000,
        juryoDate: '',
        print: '',
      });

      this.viewData = viewData;
      this.viewDataAll = viewData;
      this.createHeader(flexGrid);
      // 改行用height
      flexGrid.columnHeaders.rows[1].height = 30;
      flexGrid.columnHeaders.rows[2].height = 60;

      // 印刷〇
      let _self = this;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let tmp = _self.viewData;
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 11) {
            if (flexGrid.cells.getCellData(ht.row, ht.col) == '〇') {
              tmp.print = '';
              flexGrid.cells.setCellData(ht.row, ht.col, ' ');
            } else {
              tmp.print = '〇';
              flexGrid.cells.setCellData(ht.row, ht.col, '〇');
            }
          }
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });
      // セルの非活性化
      flexGrid.beginningEdit.addHandler(function (sender, args) {
        if (args.row <= 0) {
          args.cancel = true;
        }
      });
      flexGrid.startEditing(true);
      flexGrid.imeEnabled = true;
    },
    /**** changeメソッド */
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    /**** gridデザイン */
    onFormatItem(flexGrid, e) {
      //---ヘッダデザイン---//
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        e.cell.style.display = 'flex';
        e.cell.style.height = 'flex';
        e.cell.style.color = sysConst.COLOR.fontColor;
      }
      //---ボディデザイン---//
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.textAlign = 'right';
        // 背景色
        if (e.col <= 9) {
          wijmo.addClass(e.cell, 'addBodyBackYellow');
        }
        // フォント位置
        if (e.col == 0 || e.col == 11) {
          e.cell.style.textAlign = 'center';
        }
        if (e.col == 1 || e.col == 2) {
          e.cell.style.textAlign = 'left';
        }
      }
    },
    /******************
     * ヘッダ情報
     *****************/
    createHeader(flexGrid) {
      // header----
      var panel = flexGrid.columnHeaders;
      // 列追加
      let headerRanges = [];
      if (panel._rows.length == 1) {
        panel.rows.insert(1, new wjGrid.Row());
        panel.rows.insert(2, new wjGrid.Row());
        // ヘッダ名入力
        panel.setCellData(0, 0, 'コード');
        panel.setCellData(0, 1, '受給番号');
        panel.setCellData(0, 2, '利用者名');
        panel.setCellData(0, 3, '市町村代理受領額');
        panel.setCellData(1, 3, '援護者');
        panel.setCellData(1, 4, 'サービスに要した費用全体の額\n(A)');
        panel.setCellData(1, 5, '利用者負担額');
        panel.setCellData(1, 8, '特別障害者\n特別給付費\n(C)');
        panel.setCellData(1, 9, '代理受領額\n(A)-(B)+(C)');
        panel.setCellData(0, 10, '受領日');
        panel.setCellData(0, 11, '選\n択\n/\n印\n刷');
      }
      // 上部ヘッダの結合
      headerRanges.push(new wjGrid.CellRange(0, 3, 0, 9)); //市町村代理
      headerRanges.push(new wjGrid.CellRange(0, 0, 2, 0)); //コード
      headerRanges.push(new wjGrid.CellRange(0, 1, 2, 1)); //受給番号
      headerRanges.push(new wjGrid.CellRange(0, 2, 2, 2)); //利用者
      headerRanges.push(new wjGrid.CellRange(1, 3, 2, 3)); //援護者
      headerRanges.push(new wjGrid.CellRange(1, 4, 2, 4)); //(A)
      headerRanges.push(new wjGrid.CellRange(1, 5, 1, 7)); //利用者負担額
      headerRanges.push(new wjGrid.CellRange(1, 8, 2, 8)); //(C)
      headerRanges.push(new wjGrid.CellRange(1, 9, 2, 9)); //代理受領額
      headerRanges.push(new wjGrid.CellRange(0, 10, 2, 10)); // 受領日
      headerRanges.push(new wjGrid.CellRange(0, 11, 2, 11)); //印刷

      // セルの結合
      let footerRanges = [];
      footerRanges.push(new wjGrid.CellRange(0, 0, 0, 5));

      // マージ----
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
    /**************************
     * 都市選択
     */
    changeCity() {
      let key = this.selectCities;
      this.selectCities = this.selectCitiesLists[key].id;
      console.log(this.selectCities);
      this.userFilter();
    },
    /**************************
     * ソート
     */
    sortUserList(key) {
      // ソート
      let sort = this.viewDataAll;
      // コード（利用者コード）
      if (key == 1) {
        sort.sort((a, b) => {
          if (a.userCode < b.userCode) return -1;
          if (a.userCode > b.userCode) return 1;
        });
      }
      // カナ
      if (key == 2) {
        sort.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
        });
      }
      // 受給番号
      if (key == 3) {
        this.sortType == 3;
        sort.sort((a, b) => {
          if (a.jukyuNo < b.jukyuNo) return -1;
          if (a.jukyuNo > b.jukyuNo) return 1;
        });
      }
      this.viewData = sort.slice();
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      this.userFilter();
    },
    /**************************
     * 検索機能
     */
    userFilter() {
      //--- 計画相談---//
      let temp = [];
      temp = this.viewDataAll;

      // アルファベット検索
      temp = this.$refs.alp.alphabetFilter(temp, 'kana');
      this.viewData = temp;

      // 都市検索
      let filteredCity = [];
      if (this.selectCities != 0) {
        filteredCity = temp.filter((temp) => temp.cityNo == this.selectCities);
      } else {
        filteredCity = temp;
      }
      this.viewData = filteredCity;
      this.createHeader(this.flexGrid);
    },
    /**************************
     * 全選択/全解除
     */
    onselectedIndexChanged() {
      if (this.selectedAll > 0) {
        let tmp = this.viewData;
        for (let i = 0; i < tmp.length; i++) {
          tmp[i].print = this.selectedAll == 1 ? '〇' : '';
        }
        this.viewData = tmp;
        this.flexGrid.refresh();
      }

      this.selectedAll = 0;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#jyuryoTsuchisyoList {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: auto !important;
  max-width: auto;
  width: 100%;
  position: relative;

  .container {
    min-width: 1266px;
    max-width: 1266px;
    width: auto;
    margin: 0;

    select {
      outline: none;
      &.selectCities {
        border: 1px solid $light-gray;
        width: 180px;
        height: 21px;
        -webkit-appearance: auto;
        font-size: 0.85rem;
        &.min {
          width: 120px;
        }
      }
    }
    .btn {
      height: 20px;
      position: absolute;
      top: 106px;
      right: 143px;
      left: auto;
    }
    .customCombobox .wj-form-control {
      padding: 0px 4px;
    }
    // .wj-form-control {
    //   text-align: center;
    // }
    // grid style
    #jyuryoTsuchisyoGrid {
      font-size: 12px;
      border: 1px solid $grid_Border_Color;

      background-color: $light_yellow;
      height: var(--height);

      &.wj-flexgrid [wj-part='root'] {
        overflow-y: scroll !important;
        overflow-x: hidden !important;
      }
      .wj-header {
        font-weight: normal;
        background: $view_Title_background_Blue;
        color: $font_color;
      }
      .addBodyBackYellow {
        background: $view_Data_Read_background;
      }
      .addHeaderPrint {
        background: $view_Data_Input_background;
      }
    }
    .v-dialog__content {
      left: -151px;
      top: -51px;
    }
    // アラート実装時CSS
    // #screen_dialog {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   opacity: 0.46;
    //   background-color: rgb(33, 33, 33, 1);
    //   border-color: rgb(33, 33, 33);
    //   width: 100%;
    //   height: 100%;
    //   z-index: 4;
    //   padding: 0;
    //   margin: 0;
    // }
  }
}
</style>
