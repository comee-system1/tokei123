<template>
  <div id="nyuTaiin">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <div class="sort_menu">
        <v-row class="d-flex justify-space-between" no-gutters>
          <div class="d-flex">
            <label>利用者</label>
            <wj-menu
              class="customCombobox"
              :itemsSource="riyosyaCombo"
              :itemClicked="onRiyosyaCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="入退院/外泊者"
              style="width: 200px"
            >
            </wj-menu>
            <v-btn class="ml-1" small style="width: 60px; height: 25px">
              検索
            </v-btn>
          </div>
          <div class="d-flex">
            <label>印刷種類</label>
            <!-- mandatoryは初期選択 -->
            <v-btn-toggle class="flex-wrap" mandatory>
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
        <v-row class="mt-1" no-gutters>
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
        </v-row>
        <v-row class="mt-1 justify-sm-space-between align-end" no-gutters>
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
            :allowResizing="true"
            :deferResizing="false"
            :allowSorting="false"
            :selectionMode="'Row'"
            :initialized="onInitialized"
            :itemsSourceChanged="onitemsSourceChanged"
            :itemsSource="nyuTaiinData"
            :style="gridHeight"
          >
            <wj-flex-grid-column
              :binding="'jyukyuno'"
              :header="'受給者番号'"
              align="center"
              :width="80"
              :isReadOnly="true"
              :allowResizing="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'names'"
              :header="'氏名'"
              align="center"
              :width="130"
              :isReadOnly="true"
              :multiLine="true"
              :wordWrap="true"
              :allowResizing="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'nyuutaigai'"
              :header="'入退院外泊の別'"
              align="center"
              :width="65"
              :isReadOnly="true"
              :allowResizing="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'symddsp'"
              :header="'入退院・外泊開始年月日'"
              align="center"
              :width="150"
              :isReadOnly="true"
              :allowResizing="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'eymddsp'"
              :header="'外泊終了年月日'"
              align="center"
              :width="150"
              :isReadOnly="true"
              :allowResizing="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'ngname'"
              :header="'入院先医療機関名/外泊先'"
              align="center"
              :width="200"
              :isReadOnly="true"
              :allowResizing="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'bikoudsp'"
              :header="'備考'"
              :width="250"
              :isReadOnly="false"
              :allowResizing="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'print'"
              :header="'印刷'"
              align="center"
              :width="20"
              :isReadOnly="true"
              :allowResizing="false"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import { nyutaiinHokoku } from '@backend/api/NyutaiinHokoku';

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
      riyosyaCombo: riyosyaCombo,
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      alphabet: alphabet,
      nyuTaiinData: [],
      alphaSelect: 0,
      gridHeight: '', // グリッドの高さ
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
      insatsuFlag: { houkokusyoFlag: true, disabledFlag: false },
      selGaihaku: false,
      selNyutaiin: false,
      selNyutaiinDisabledu: false,
      selGaihakuDisabledu: false,
    };
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
        text: '入退院/外泊者',
      },
      {
        key: 1,
        text: '入退院者',
      },
      {
        key: 2,
        text: '入院者',
      },
      {
        key: 3,
        text: '全員',
      },
      {
        key: 4,
        text: '外泊者',
      },
      {
        key: 5,
        text: '退院者',
      }
    );
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 62;
      if (height > 800) {
        ht = 65;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
    /*********************
     * 利用者変更
     */
    onRiyosyaCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.onRiyosya(e.text, e.selectedIndex);
        e.text, e.selectedIndex;
      }
      let f = document.activeElement;
      f.blur();
    },
    /*************
     * 利用者のフィルタリンク
     */
    onRiyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.nyuTaiinData = this.filtered();
      // this.griddata = this.filtered();
    },
    getData(result) {
      this.nyuTaiinData = result.riyo_inf;
      this.allData = this.nyuTaiinData;
    },
    onInitialized(flexGrid) {
      // let griddata = this.getData();
      this.mainFlexGrid = flexGrid;
      let _self = this;
      nyutaiinHokoku().then((result) => {
        // データ取得
        this.getData(result);
      });
      // グリッドの選択を無効にする
      // flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);

      // セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      // セルの値を編集
      this.edittingCell(flexGrid);

      // グリッドのデザイン修正
      this.gridDesignModify(flexGrid);

      // カナソートを実行
      this.sort(1);

      flexGrid.itemsSource = this.nyuTaiinData;
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
          jyukyuno: nyuTaiinData[i]['jyukyuno'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'jyukyuno');
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
      let headerRanges = [];
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

            //クリックした際の受給者番号取得
            let jB = _self.getClickjyukyuno(hPage.row);

            //受給者番号が持つ行数の取得
            let jBrow = _self.getJyukyunoRow(jB);

            for (let h = jBrow.first; h < jBrow.last; h++) {
              // 〇が入っていた場合、〇を消す
              if (flexGrid.getCellData(h, 7) === '〇') mark = ' ';
              flexGrid.setCellData(h, 7, mark);
            }
          }
        }
      });
    },
    /********
     * セルを編集
     */
    edittingCell(flexGrid) {
      flexGrid.cellEditEnding.addHandler((s, e) => {
        // 編集されたセルを取得
        let changedBikou = flexGrid.getCellData(e.row, 6);
        // 入力された値を保持
        this.nyuTaiinData[e.row]['bikoudsp'] = changedBikou;
      });
    },
    /*************
     * クリックした際の受給者番号取得
     */
    getClickjyukyuno(row) {
      return this.nyuTaiinData[row].jyukyuno;
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyunoRow(jb) {
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
        Data.push(this.nyuTaiinData[i]['jyukyuno']);
      }
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
      flexGrid.columnHeaders.rows[0].height = 60;
    },
    /*****************
     * グリッドのデザイン修正
     */
    gridDesignModify(flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
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
          s.alignItems = 'center';
          s.justifyContent = 'center';
          // 印刷セル縦書き
          if (c == 7) {
            s.writingMode = 'vertical-rl';
            s.borderRight = 'none';
          }
          // 2行以上で表示する行に文字列を挿入
          if (r == 0 && c == 2) {
            cell.innerHTML = '入退院<br/>外泊の別';
          }
          if (r == 0 && c == 5) {
            cell.innerHTML = '入院先医療機関名/<br/>外泊先';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.paddingTop = '4px';
          s.textAlign = 'center';
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if (c == 6 || c == 7) {
            s.backgroundColor = sysConst.COLOR.white;
          }
          // 文字の位置変更
          if (c == 1 || c == 5) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
          }
          // 文字の位置変更
          if (c == 6) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
          }
          // 文字の位置変更
          if (c == 7) {
            s.display = 'flex';
            s.alignItems = 'center';
            s.justifyContent = 'center';
            s.borderRight = 'none';
          }
        }
      };
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
      this.onSort(type);
    },
    /******************
     * ソート
     */
    onSort(type) {
      let array = this.nyuTaiinData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.riyousyamei !== '' && b.riyousyamei !== '') {
            if (a.riyousyamei < b.riyousyamei) {
              return -1;
            }
            if (a.riyousyamei > b.riyousyamei) {
              return 1;
            }
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.riyocode !== '' && b.riyocode !== '') {
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
          if (a.jyukyuno !== '' && b.jyukyuno !== '') {
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

      this.nyuTaiinData = array;
      this.mainFlexGrid.itemsSource = [];
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
      for (let i = 0; i < this.allData.length; i++) {
        // 入退院/外泊者または全員が選択されている時
        if (
          this.filterTextRiyosya.riyosyaKey == 0 ||
          this.filterTextRiyosya.riyosyaKey == 3
        ) {
          array.push(this.allData[i]);
        } else {
          if (
            // 入退院者を選択
            (this.filterTextRiyosya.riyosyaKey === 1 &&
              this.allData[i]['kbn'] === 1) ||
            // 入院者を選択
            (this.filterTextRiyosya.riyosyaKey === 2 &&
              this.allData[i]['nyutaikbn'] === 1) ||
            // 外泊者を選択
            (this.filterTextRiyosya.riyosyaKey === 4 &&
              this.allData[i]['kbn'] === 2) ||
            // 退院者を選択
            (this.filterTextRiyosya.riyosyaKey === 5 &&
              this.allData[i]['nyutaikbn'] === 2)
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
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#nyuTaiin {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: none;
  max-width: none;
  width: auto;
  .sort_menu {
    width: 1047px;
  }
  .wj-flexgrid {
    width: auto;
  }
  .wj-control {
    .wj-template {
      height: 23px !important;
    }
  }
  .user-info {
    label {
      margin-right: 4px !important;
    }
  }
  .no-flex-grow {
    flex-grow: 0;
  }
  .customCombobox .wj-form-control {
    padding: 5px 6px;
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
    .v-label {
      font-size: 12px;
      color: #333;
      background: $white;
      width: 51px;
    }
  }
  .v-input--is-disabled {
    .v-input__control {
      background-color: #eee;
    }
    .v-label {
      background-color: #eee;
    }
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
  #nyuTaiinGrid {
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
</style>
