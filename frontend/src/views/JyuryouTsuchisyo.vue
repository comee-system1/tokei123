<template>
  <div id="JyuryouTsuchisyo">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle mt-1" no-gutters>
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
              style="width: 200px"
            >
            </wj-menu>
          </div>
          <div class="d-flex mt-1">
              <label>市町村</label>
              <wj-menu
                class="customCombobox"
                :itemsSource="shityouson"
                :itemClicked="onShityousonCombo"
                :initialized="initComboFilters"
                :isRequired="true"
                style="width: 200px"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              >
              </wj-menu>
          </div>
        </v-col>
        <label class="ml-2 align-end">ソート</label>
        <!-- mandatoryは初期選択 -->
        <v-btn-toggle class="flex-wrap ml-1" mandatory>
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
          class="ml-2"
          style="width: 60px; height: 30px; margin-top: -4px"
          @click="searchClicked"
        >
          検索
        </v-btn>
        <v-col class="no-flex-grow ml-2">
          <div class="d-flex">
            <label>受領日</label>
            <v-btn
              @click="inputCalendarClick('teikyo')"
              tile
              outlined
              class="service"
              height="25"
              >{{ year }}年{{ month }}月
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>

          </div>
          <div class="mt-1">
            <label>請求月</label>
            <v-btn
               class="service"
              @click="inputCalendarClick('seikyu')"
              tile
              outlined
              height="25"
              >{{ seikyu_year }}年{{ seikyu_month }}月
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
          </div>
        </v-col>
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
      </v-row>
      <v-row class="mt-1 justify-sm-space-between" no-gutters>
        <v-btn-toggle class="flex-wrap" v-model="alphaSearch" mandatory>
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
          :itemsSource="JyuryouTsuchisyoData"
        >
          <wj-flex-grid-column
            :binding="'jyukyusyaBango'"
            :header="'受給者番号'"
            align="center"
            :width="100"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'riyousyamei'"
            :header="'利用者名'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'engosya'"
            :header="'援護者'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'zentaigaku'"
            :header="'サービスに要した費用の全体の額(A)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'riyousyahutan'"
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
            :binding="'tokubetukyuhuhi'"
            :header="'特定障害者特別給付費(C)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'dairijyuryougaku'"
            :header="'代理受領額(A)-(B)+(C)'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'juryoubui'"
            :header="'受領日'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'insatsu'"
            :header="'印刷日'"
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
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

const riyosyaCombo = [];
const shityousonCombo = [];
const taServiceCombo = [];

export default {
  data() {
    return {
      riyosyaCombo: riyosyaCombo,
      shityousonCombo: shityousonCombo,
      taServiceCombo: taServiceCombo,
      JyuryouTsuchisyoData: [],
    }
  },
  components: {
    HeaderServices,
  },
  created() {
    // 利用者コンボボックス
    this.riyosyaCombo.push(
      {
        key: 1,
        text: '全員',
      },
      {
        key: 2,
        text: '今月入居者',
      },
      {
        key: 3,
        text: '今月退去者',
      }
    );
    // 市町村コンボボックス
    this.shityousonCombo.push(
      {
        key: 0,
        text: '指定なし',
      },
      {
        key: 1,
        text: '東経市',
      },
      {
        key: 2,
        text: '西経市',
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
      }
      let f = document.activeElement;
      f.blur();
    },
    onShityousonCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        // if (this.JijyougenkanriJimsyoFlag) {
        //   this.$refs.jijyougenChild.child_Jyougenkanriji(
        //     e.text,
        //     e.selectedIndex
        //   );
        // } else {
        //   // 他上限管理事業所の関数を実行
        //   this.$refs.tajougenChild.child_Jyougenkanriji(
        //     e.text,
        //     e.selectedIndex
        //   );
        // }
      }
      let f = document.activeElement;
      f.blur();
    },
    getData() {
      let JyuryouTsuchisyoData = [];
      for (let i = 0; i < 18; i++) {
        JyuryouTsuchisyoData.push({
          jyukyusyaBango: '1100012340',
          riyousyamei: Math.floor(Math.random() * 10) + '東経太郎',
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
        });
      }
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

      // セルの値を編集
      this.edittingCell(flexGrid, _self);

      flexGrid.itemsSource = griddata;
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
          if (hPage.col == 11) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 11) == '〇') mark = '';
            flexGrid.setCellData(hPage.row, 11, mark);
            _self.receptData[hPage.row]['print'] = mark;
          }
        }
      });
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
      flexGrid.rows.defaultSize = 25;
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
      panel.setCellData(0, 10, '印刷日');
      panel.setCellData(0, 11, '印刷');
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
        new wjGrid.CellRange(0, 10, 2, 10), // 印刷日
        new wjGrid.CellRange(0, 11, 2, 11), // 印刷
        new wjGrid.CellRange(0, 2, 0, 8), // 市町村代理受領額
        new wjGrid.CellRange(1, 4, 1, 6), // 利用者負担額
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
          if((r == 0) && (c == 11)){
            s.writingMode = 'vertical-rl';
          }
          // 2行以上で表示する行に文字列を挿入
          if ((r == 1) && (c == 3)) {
            cell.innerHTML = 'サービスに要<br/>した費用の全<br/>の額<br/>(A)';
            
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
            cell.innerHTML = '特定障害<br/>者特別給<br/>付費<br/>(C)';
          }
          if ((r == 1) && (c == 8)) {
            cell.innerHTML = '代理受領額<br/>(A)-(B)+(C)';
          }
        }
      }
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
    max-height: 420px;
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
  .siborikomi-info,
  .sort-info {
    position: relative;
    display: inline-block;
    border: 1px solid lightgray;
    width: 350px;
    border-radius: 10px;

    .wj-labeled-input {
      font-size: 14px;
      position: relative;
      display: inline-block;
      width: 120px;
      height: auto;
      max-width: 100%;
      margin: 0 15px 0 0px;
      padding: 5px 0;

      input[type='radio'] + label {
        color: black;
      }
      input[type='radio']:checked + label {
        color: blue;
        font-weight: bold;
      }
    }
  }

  .v-btn-toggle > .v-btn {
    width: 100px;
    height: 25px;
  }
}
</style>
