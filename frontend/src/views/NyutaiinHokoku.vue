<template>
  <div id="nyuTaiin">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle mt-1 d-flex justify-space-between" no-gutters>
        <div>
          <label>ソート</label>
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
        </div>
        <div>
        <v-btn
          class="ml-2"
          style="width: 60px; height: 30px; margin-top: -4px"
          >
          検索
        </v-btn>
        <label class="ml-2">印刷種類</label>
          <!-- mandatoryは初期選択 -->
          <v-btn-toggle class="flex-wrap ml-1" mandatory
           >
            <!-- 印刷種類「一覧」選択時「入退院・外泊」は選択不可 -->
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="disabledSwitch(1)"
            >
              報告書
            </v-btn>
            <v-checkbox
              v-if="this.insatsuFlag.houkokusyoFlag"
              v-model="selNyutaiin"
              label="入退院"
              class="nyutaiinCheckbox"
              color="primary"
            ></v-checkbox>
            <v-checkbox
              v-if="this.insatsuFlag.houkokusyoFlag"
              v-model="selGaihaku"
              label="外泊"
              class="nyutaiinCheckbox"
              color="primary"
            ></v-checkbox>
            <v-checkbox
              v-if="this.insatsuFlag.disabledFlag"
              v-model="selNyutaiinDisabled"
              label="入退院"
              class="nyutaiinCheckbox"
              color="primary"
              disabled
            ></v-checkbox>
            <v-checkbox
              v-if="this.insatsuFlag.disabledFlag"
              v-model="selGaihakuDisabled"
              label="外泊"
              class="nyutaiinCheckbox"
              color="primary"
              disabled
            ></v-checkbox>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="disabledSwitch(2)"
            >
              一覧
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-row>
      <v-row class="mt-1 justify-sm-space-between" no-gutters>
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
            style="width: auto"
          >
            <wj-menu-item>
              <b>印刷を全選択</b>
            </wj-menu-item>
            <wj-menu-item>
              <b>印刷を全解除</b>
            </wj-menu-item>
          </wj-menu>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="nyuTaiinGrid"
          :headersVisibility="'Column'"
          :allowDelete="false"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :selectionMode="'Row'"
          :initialized="onInitialized"
          :itemsSourceChanged="onitemsSourceChanged"
          :itemsSource="nyuTaiinData"
        >
          <wj-flex-grid-column
            :binding="'jyukyusyaBango'"
            :header="'受給者番号'"
            align="center"
            :width="150"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'shimei'"
            :header="'氏名'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'nyutaiinGaihakuKubun'"
            :header="'入退院外泊の別'"
            align="center"
            width="0.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kaishinegappi'"
            :header="'入退院・外泊開始年月日(外泊終了年月日)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'syuryonengappi'"
            :header="'入退院・外泊開始年月日(外泊終了年月日)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'iryokikanmei'"
            :header="'入院先医療機関名/外泊先'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'bikou'"
            :header="'備考'"
            align="center"
            width="2.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'print'"
            :header="'印刷'"
            align="center"
            :width="24"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

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
      iryokikanmeibi_year: moment().add('days', 2).startOf('days').format('YYYY'),
      iryokikanmeibi_month: moment().add('days', 2).startOf('days').format('MM'),
      iryokikanmeibi_date: moment().add('days', 2).startOf('days').format('DD'),
      picker: '',
      datepicker_dialog: false,
      header_dialog: true,
      alphabet: alphabet,
      nyuTaiinData: [],
      year: moment().year(),
      month: moment().format('MM'),
      date: moment().format('DD'),
      alphaSelect: 0,
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
      insatsuFlag: { houkokusyoFlag: true, disabledFlag: false},
      selGaihaku: false,
      selNyutaiin: false,
      selNyutaiinDisabledu: false,
      selGaihakuDisabledu: false,
    }
  },
  components: {
    HeaderServices,
  },
  methods: {
    getData() {
      let nyuTaiinData = [];
      for (let i = 0; i < 1; i++) {
        nyuTaiinData.push({
          jyukyusyaBango: '1100012340',
          code: '10000000',
          shimei: '東経太郎',
          kana: 'トウケイタロウ',
          nyutaiinGaihakuKubun: '入院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '東経市民病院',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012340',
          code: '10000000',
          shimei: '東経太郎',
          kana: 'トウケイタロウ',
          nyutaiinGaihakuKubun: '退院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012342',
          code: '10000001',
          shimei: '南経太郎',
          kana: 'ナンケイタロウ',
          nyutaiinGaihakuKubun: '外泊',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '自宅',
          bikou: '',
          print: '',
        });
          // 南経市 + 今月退去
          nyuTaiinData.push({
          jyukyusyaBango: '1100012342',
          code: '10000001',
          shimei: '南経太郎',
          kana: 'ナンケイタロウ',
          nyutaiinGaihakuKubun: '外泊',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '自宅',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012342',
          code: '10000001',
          shimei: '南経太郎',
          kana: 'ナンケイタロウ',
          nyutaiinGaihakuKubun: '入院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012342',
          code: '10000001',
          shimei: '南経太郎',
          kana: 'ナンケイタロウ',
          nyutaiinGaihakuKubun: '退院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '',
          bikou: '',
          print: '',
        });
        
          nyuTaiinData.push({
          jyukyusyaBango: '1100012348',
          code: '10000001',
          shimei: '日経太郎',
          kana: 'ニッケイケイタロウ',
          nyutaiinGaihakuKubun: '入院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '',
          bikou: '',
          print: '',
        });
        nyuTaiinData.push({
          jyukyusyaBango: '1100012348',
          code: '10000001',
          shimei: '日経太郎',
          kana: 'ニッケイケイタロウ',
          nyutaiinGaihakuKubun: '退院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012343',
          code: '10000002',
          shimei: '西経太郎',
          kana: 'セイケイタロウ',
          nyutaiinGaihakuKubun: '入院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '東経市民病院',
          bikou: '',
          print: '',
        });
          nyuTaiinData.push({
          jyukyusyaBango: '1100012343',
          code: '10000002',
          shimei: '西経太郎',
          kana: 'セイケイタロウ',
          nyutaiinGaihakuKubun: '退院',
          kaishinegappi: '2022年07月10日',
          syuryonengappi: '2022年07月10日',
          iryokikanmei: '東経市民病院',
          bikou: '',
          print: '',
        });
      }
      this.allData = nyuTaiinData;
      this.nyuTaiinData = nyuTaiinData;
      return nyuTaiinData;
    },
    onInitialized(flexGrid) {
      let griddata = this.getData();
      this.mainFlexGrid = flexGrid;
      let _self = this;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);

      // セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      // グリッドのデザイン修正
      this.gridDesignModify(flexGrid);

      // カナソートを実行
      this.sort(1); 

      flexGrid.itemsSource = griddata;
    },
    onitemsSourceChanged(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.merge = this.createMergeArray(this.nyuTaiinData);
      // データセルのマージ
      this.createCellMerge(flexGrid);
    },
    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray(nyuTaiinData) {
      let array = [];
      for (let i = 0; i < nyuTaiinData.length; i++) {
        array.push({
          row: i,
          jyukyusyaBango: nyuTaiinData[i]['jyukyusyaBango'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'jyukyusyaBango');
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
    /**************
     * 全体セルのマージ
     */
    createCellMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 3, 0, 4)
      ];
      // データセル用のマージ配列の作成
      let ranges = [];
      let merge = this.createMergeArray(this.nyuTaiinData);
      for (let i = 0; i < merge.length; i++) {
        for (let j = 0; j <= 1; j++) {
          ranges.push(
            new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
          );
        }
        let j = 7;
        ranges.push(
          new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
        );
      }
      let mm = new wjGrid.MergeManager(flexGrid);

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
    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid, _self) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 印刷カラムを押下
          if (hPage.col == 7) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 7) == '〇') mark = '';
            flexGrid.setCellData(hPage.row, 7, mark);
            _self.nyuTaiinData[hPage.row]['print'] = mark;

            //クリックした際の受給者番号取得
            let jB = _self.getClickJyukyusyaBango(hPage.row);
            //受給者番号が持つ行数の取得
            let jBrow = _self.getJyukyusyaBangoRow(jB);
            flexGrid.setCellData(jBrow.first, 7, mark);
            _self.nyuTaiinData[jBrow.first]['print'] = mark;
          }
        }
      });
    },
    /*************
     * クリックした際の受給者番号取得
     */
    getClickJyukyusyaBango(row) {
      return this.nyuTaiinData[row].jyukyusyaBango;
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyusyaBangoRow(jb) {
      let data = [];
      let merge = this.createMergeArray(this.nyuTaiinData);
      for (let i = 0; i < merge.length; i++) {
        let key = merge[i].k;
        if (key == jb) {
          data.push(merge[i]);
        }
      }
      return data[0];
    },
    /*************
     * マージされたセルの行数を取得
     */
    getMergedCellRow() {
      let Data = [];
      // 受給者番号の配列を作成
      for (let i = 0; i < this.nyuTaiinData.length; i++) {
        Data.push (this.nyuTaiinData[i]['jyukyusyaBango']);
      }
      console.log(Data);
      // 重複した値を削除
      let set = new Set(Data);
      let mergedData = [...set];

      //  重複した値を削除した配列の数を返す
      return mergedData.length;
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows[0].height = 80;
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 3, 0, 4)
      ];
      let mm = new wjGrid.MergeManager(flexGrid);
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
      // let mergedCellLength = this.getMergedCellRow()
      let arrayLength = this.nyuTaiinData.length
      console.log(arrayLength)
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.color = sysConst.COLOR.fontColor;
        s.fontWeight = 'normal';
        s.fontSize = '12px';

        // s.border = 'solid 1px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // 上下中央寄せ
          s.display = 'flex';
          s.alignItems ='center'
          s.justifyContent ='center'
          // 印刷セル縦書き
          if (c == 7) {
            s.writingMode = 'vertical-rl';
          }
          // 2行以上で表示する行に文字列を挿入
          if ((r == 0) && (c == 2)) {
            cell.innerHTML = '入退院<br/>外泊<br/>の別';
          }
          if ((r == 0) && (c == 3)) {
            cell.innerHTML = '入退院・外泊開始年月日<br/>(外泊終了年月日)';
          }
          if ((r == 0) && (c == 5)) {
            cell.innerHTML = '入院先医療機関名/<br/>外泊先';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.paddingTop = '4px';
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((c == 6) || (c == 7)) {
            s.backgroundColor = sysConst.COLOR.white;
          }
          // 文字の位置変更
          if ((c == 1) || (c == 5)) {
            s.textAlign = 'left';
            s.paddingLeft = '4px'
          }
          // 文字の位置変更
          if (c == 7) {
            s.display = 'flex';
            s.alignItems ='center'
            s.justifyContent ='center'
          }
          // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
          // if(r == arrayLength-1){
          //   s.borderBottom = 'none'
          // }
          // if (((c == 0) && (r == mergedCellLength)) || 
          //    ((c == 1) && (r == mergedCellLength)) || 
          //    ((c == 6) && (r == mergedCellLength))) {
          //   s.borderBottom = 'none'
          // }
          // if(c == 7){
          //   s.borderRight = 'none'
          // }
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
     * ソート
     */
    onSort(type) {
      let array = this.nyuTaiinData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.shimei < b.shimei) {
            return -1;
          }
          if (a.shimei > b.shimei) {
            return 1;
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyusyaBango < b.jyukyusyaBango) {
            return -1;
          }
          if (a.jyukyusyaBango > b.jyukyusyaBango) {
            return 1;
          }
          return 0;
        });
      }

      this.nyuTaiinData = array;
      this.mainFlexGrid.itemsSource = [];
      // this.mainFlexGrid.refresh();
    },
    /**************
     * 印刷種類入力無効化切り替え
     */
    disabledSwitch(type) {
      this.insatsuFlag.houkokusyoFlag = false;
      this.insatsuFlag.disabledFlag = false;
      if (type == 1) {
        this.insatsuFlag.houkokusyoFlag = true; 
      }
      if (type == 2) {
        this.insatsuFlag.disabledFlag = true;
        this.selNyutaiinDisabled = this.selNyutaiin;
        this.selGaihakuDisabled = this.selGaihaku;

      }
    },
    /*********************
     * 全選択
     */
    onselectedIndexChanged(s) {
      // 印刷用
      if (s.selectedIndex == 0 || s.selectedIndex == 1) {
        this.selectAll(s.selectedIndex);
      }
    },
    /**********************
     * 全選択/全解除
     */
    selectAll(type) {
      let mark = '';
      if (type == 0) {
        mark = '〇';
      }
      for (let i = 0; i < this.allData.length; i++) {
        this.mainFlexGrid.setCellData(i, 7, mark);
        this.nyuTaiinData[i]['print'] = mark;
      }
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(alphaSearch) {
      this.alphaSelect = alphaSearch;
      this.nyuTaiinData = this.filtered();
      
    },
    filtered() {
      let array = [];
      let select = this.alphaSelect;
      let get = [];
       for (let i = 0; i < this.allData.length; i++) {
        array.push(this.allData[i]);
      }
      array.forEach(function (value) {
        switch (select) {
          case 0:
            get.push(value);
            break;
          case 1:
            if (value.kana.match(/^[ア-オ]/)) {
              get.push(value);
            }
            break;
          case 2:
            if (value.kana.match(/^[カ-コ]/)) {
              get.push(value);
            }
            break;
          case 3:
            if (value.kana.match(/^[サ-ソ]/)) {
              get.push(value);
            }
            break;
          case 4:
            if (value.kana.match(/^[タ-ト]/)) {
              get.push(value);
            }
            break;
          case 5:
            if (value.kana.match(/^[ナ-ノ]/)) {
              get.push(value);
            }
            break;
          case 6:
            if (value.kana.match(/^[ハ-ホ]/)) {
              get.push(value);
            }
            break;
          case 7:
            if (value.kana.match(/^[マ-モ]/)) {
              get.push(value);
            }
            break;
          case 8:
            if (value.kana.match(/^[ヤ-ヨ]/)) {
              get.push(value);
            }
            break;
          case 9:
            if (value.kana.match(/^[ラ-ロ]/)) {
              get.push(value);
            }
            break;
          case 10:
            if (value.kana.match(/^[ワ-ン]/)) {
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
div#nyuTaiin {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .no-flex-grow {
    flex-grow: 0;
  }
  .nyutaiinCheckbox {
    padding: 0;
    margin: 0;
    .v-messages {
      display: none;
    }
    .v-input__slot {
      margin: 0 auto;
      border-top: solid 1px rgba(0, 0, 0, 0.12);
      border-bottom: solid 1px rgba(0, 0, 0, 0.12);
      border-right: solid 1px rgba(0, 0, 0, 0.12);
      height: 25px;
      padding-left: 12px;
        .v-input--selection-controls__ripple {
        z-index: 10;
        height: 28px;
        width: 28px;
        left: -9px;
        top: calc(50% - 22px);
      }
    }
    .v-input--selection-controls__input {
      margin-right: 0;
    }
    .v-icon {
      font-size: 18px;
    }
    .v-label{
      font-size: 12px;
      color: #333;
      background: $white;
      width: 51px;
    }
  }
  div#comboFilters1,
  div#comboFilters2 {
    margin-top: -3px;
    .wj-btn.wj-btn-default {
      border-left: none;
    }
  }
  .combo:hover {
    background-color: #e1e1e1;
  }
  .combo:focus {
    background-color: #fff;
  }
  #comboFilters1_dropdown,
  #comboFilters2_dropdown {
    .wj-listbox-item {
      background-color: $white !important;
      padding: 30px;
    }
  }
  .wj-control {
    .wj-template,
    .wj-input {
      height: 25px;
    }
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
  #nyuTaiinGrid {
    // max-height: 420px;
    max-height: calc(62vh + 1px);
    border-right: none;
    border-bottom: none;
    width: calc(100% - 1px);
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
