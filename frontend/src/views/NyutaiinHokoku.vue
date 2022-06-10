<template>
  <div id="JyuryouTsuchisyo">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle mt-1 d-flex justify-space-between" no-gutters>
        <div>
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
        <div>
        <v-btn
          class="ml-2"
          style="width: 60px; height: 30px; margin-top: -4px"
          >
          検索
        </v-btn>
        <label class="ml-2">印刷種類</label>
          <!-- mandatoryは初期選択 -->
          <v-btn-toggle class="flex-wrap ml-1" mandatory>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="sort(1)"
            >
              受領通知書
            </v-btn>
            <v-btn
              small
              color="secondary"
              dark
              outlined
              style="width: 90px"
              @click="sort(2)"
            >
              一覧
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-col class="d-flex">
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
        </v-col>
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
          id="JyuryouTsuchisyoGrid"
          :headersVisibility="'Column'"
          :allowDelete="false"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :selectionMode="'Row'"
          :initialized="onInitialized"
          :itemsSourceChanged="onitemsSourceChanged"
          :itemsSource="JyuryouTsuchisyoData"
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
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'engosya'"
            :header="'援護者'"
            align="center"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'juryoubui'"
            :header="'入退院・外泊開始年月日'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'juryoubui'"
            :header="'外泊終了年月日'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'juryoubui'"
            :header="'入院先医療機関名/外泊先'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'insatsu'"
            :header="'備考'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'print'"
            :header="'印刷'"
            align="center"
            :width="30"
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
import CustomMergeManager from '@/utiles/customMerge.js';
import sysConst from '@/utiles/const';

const riyosyaCombo = [];
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
      insatsubi_year: moment().add('days', 2).startOf('days').format('YYYY'),
      insatsubi_month: moment().add('days', 2).startOf('days').format('MM'),
      insatsubi_date: moment().add('days', 2).startOf('days').format('DD'),
      picker: '',
      datepicker_dialog: false,
      header_dialog: true,
      alphabet: alphabet,
      riyosyaCombo: riyosyaCombo,
      JyuryouTsuchisyoData: [],
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      filterTextShityoson: { shityosonKey: 0, shityoson:'指定なし'}, // 検索項目
      year: moment().year(),
      month: moment().format('MM'),
      date: moment().format('DD'),
      alphaSelect: 0,
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
    }
  },
  components: {
    HeaderServices,
  },
  created() {
    // 利用者コンボボックス
    this.riyosyaCombo.push(
      {
        key: 0,
        text: '全員',
      },
      {
        key: 1,
        text: '入退院',
      },
      {
        key: 2,
        text: '外泊者',
      }
    );
  },
  methods: {
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
    getData() {
      let JyuryouTsuchisyoData = [];
      for (let i = 0; i < 2; i++) {
        // 東経市 + 今月入居
        JyuryouTsuchisyoData.push({
          jyukyusyaBango: '1100012340',
          code: '5',
          jigyosyobango: '4',
          shimei: '1入居太郎code5受証４',
          kana: 'ニュウキョタロウ',
          engosya: '東経市',
          zentaigaku: '125,840',
          riyousyahutan: '12,584',
          honninbun: '12,584',
          keigentou: '5,000',
          tokubetukyuhuhi: '0',
          dairijyuryougaku: '113,256',
          juryoubui: '2022年09月20',
          insatsu: '2022年09月20',
          print: '',
          nyukyo: 1, // 今月入居
          taikyo: 0 // 今月退去
        });
          // 西経市 + 今月入居
          JyuryouTsuchisyoData.push({
          jyukyusyaBango: '1100012341',
          code: '8',
          jigyosyobango: '3',
          shimei: '2入居太郎code8受証３',
          kana: 'ニュウキョタロウ',
          engosya: '西経市',
          zentaigaku: '125,840',
          riyousyahutan: '12,584',
          honninbun: '12,584',
          keigentou: '5,000',
          tokubetukyuhuhi: '0',
          dairijyuryougaku: '113,256',
          juryoubui: '2022年09月20',
          insatsu: '2022年09月20',
          print: '',
          nyukyo: 1, // 今月入居
          taikyo: 0 // 今月退去
        });
          // 北経市 + 今月退去
          JyuryouTsuchisyoData.push({
          jyukyusyaBango: '1100012342',
          code: '6',
          jigyosyobango: '2',
          shimei: '3退去太郎code6受証２',
          kana: 'タイキョタロウ',
          engosya: '北経市',
          zentaigaku: '125,840',
          riyousyahutan: '12,584',
          honninbun: '12,584',
          keigentou: '5,000',
          tokubetukyuhuhi: '0',
          dairijyuryougaku: '113,256',
          juryoubui: '2022年09月20',
          insatsu: '2022年09月20',
          print: '',
          nyukyo: 0, // 今月入居
          taikyo: 1 // 今月退去
        });
          // 南経市 + 今月退去
          JyuryouTsuchisyoData.push({
          jyukyusyaBango: '1100012343',
          code: '9',
          jigyosyobango: '1',
          shimei: '4退去太郎code9受証１',
          kana: 'タイキョタロウ',
          engosya: '南経市',
          zentaigaku: '125,840',
          riyousyahutan: '12,584',
          honninbun: '12,584',
          keigentou: '5,000',
          tokubetukyuhuhi: '0',
          dairijyuryougaku: '113,256',
          juryoubui: '2022年09月20',
          insatsu: '2022年09月20',
          print: '',
          nyukyo: 0, // 今月入居
          taikyo: 1 // 今月退去
        });
        
      }
      
      // 配列の要素の数を比較用に変数化
      // let compareArr = JyuryouTsuchisyoData.length;
      // if (JyuryouTsuchisyoData.length < 15) {
      //   // 配列の要素の数が15個以下の場合、空セルを入れる
      //   for (let i = 0; i < (15 - compareArr); i++) {
      //     JyuryouTsuchisyoData.push({
      //       jyukyusyaBango:   '',
      //       shimei:      '',
      //       engosya:          '',
      //       zentaigaku:       '',
      //       riyousyahutan:    '',
      //       honninbun:        '',
      //       keigentou:        '',
      //       tokubetukyuhuhi:  '',
      //       dairijyuryougaku: '',
      //       juryoubui:        '',
      //       insatsu:          '',
      //       print:            '',
      //     });
      //   }
      // }
      this.allData = JyuryouTsuchisyoData;
      this.JyuryouTsuchisyoData = JyuryouTsuchisyoData;
      return JyuryouTsuchisyoData;
    },
    onInitialized(flexGrid) {
      let griddata = this.getData();
      this.mainFlexGrid = flexGrid;
      let _self = this;
      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);

      // セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      // グリッドのデザイン修正
      this.gridDesignModify(flexGrid);

      // カナソートを実行
      this.sort(1); 

      // // セルの値を編集
      // this.edittingCell(flexGrid, _self);
      console.log(444)
      flexGrid.itemsSource = griddata;
    },
    onitemsSourceChanged(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.merge = this.createMergeArray(this.JyuryouTsuchisyoData);
      console.log(555)
      // データセルのマージ
      this.createCellMerge(flexGrid);
    },
    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray(JyuryouTsuchisyoData) {
      let array = [];
      for (let i = 0; i < JyuryouTsuchisyoData.length; i++) {
        array.push({
          row: i,
          jyukyusyaBango: JyuryouTsuchisyoData[i]['jyukyusyaBango'],
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
      console.log("start");
      let headerRanges = [
      ];
      // データセル用のマージ配列の作成
      let ranges = [];
      let merge = this.createMergeArray(this.JyuryouTsuchisyoData);
      for (let i = 0; i < merge.length; i++) {
        for (let j = 0; j <= 1; j++) {
          console.log(merge[i].first);
          console.log(merge[i].last - 1);
          console.log("");
          ranges.push(
            new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
          );
        }
        let j = 7;
        ranges.push(
          new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
        );
      }
      
      console.log("end");
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
            _self.JyuryouTsuchisyoData[hPage.row]['print'] = mark;
          }
        }
      });
    },
    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      // ヘッダーに空行を追加
      flexGrid.mergeManager = new CustomMergeManager(flexGrid);
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
 
    flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.color = sysConst.COLOR.fontColor;
        s.fontWeight = 'normal';
        s.fontSize = '12px'
        // s.border = 'solid 1px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          if ((r == 0) && (c == 2)) {
            cell.innerHTML = '入退院<br/>外泊<br/>の別';
          }
          if ((r == 0) && (c == 3)) {
            cell.innerHTML = '入退院・外泊開始年月日<br/>(外泊終了年月日)';
          }
          if ((r == 0) && (c == 4)) {
            cell.innerHTML = '入院先医療機関名/<br/>外泊先';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if (c == 11) {
            s.backgroundColor = sysConst.COLOR.white;
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
     * 親コンポーネントのソート
     */
    onSort(type) {
      let array = this.JyuryouTsuchisyoData;
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
          if (a.jigyosyobango < b.jigyosyobango) {
            return -1;
          }
          if (a.jigyosyobango > b.jigyosyobango) {
            return 1;
          }
          return 0;
        });
      }

      this.JyuryouTsuchisyoData = array;
      this.mainFlexGrid.itemsSource = [];
      // this.mainFlexGrid.refresh();
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
        this.JyuryouTsuchisyoData[i]['print'] = mark;
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
     * 利用者のフィルタリンク
     */
   onRiyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.filtered();
      // this.griddata = this.filtered();
    },
    /*************
     * 市町村のフィルタリンク
     */
    onsShityoson(text, key) {
      // フィルタリングの実施
      this.filterTextShityoson = { shityosonKey: key, shityoson: text };
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.filtered();
      // this.griddata = this.filtered();
    },
    filtered() {
      let array = [];
      // let get = [];
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
            ((this.allData[i]['engosya'].indexOf(
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
div#JyuryouTsuchisyo {
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
    .wj-input-group {
      .wj-form-control {
        vertical-align: middle;
      }
    } 
  }
  #JyuryouTsuchisyoGrid {
    // max-height: 420px;
    max-height: calc(62vh + 1px);
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
