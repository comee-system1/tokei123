<template>
  <div>
    <!-- <v-row>
      <v-col cols="12" class="user-info">
        <v-row>
          <div class="riyousya-block">
            <label>利用者</label>
            <wj-combo-box
              :isReadOnly="true"
              class="user-box"
              v-bind:text="riyousya"
            ></wj-combo-box>
          </div>
          <div class="jukyusyasho-block">
            <label>受給者証番号</label>
            <wj-combo-box
              :isReadOnly="true"
              class="user-box zyukyusya-num"
              v-bind:text="zyukyusyaNum"
            ></wj-combo-box>
          </div>
        </v-row>
        <v-row class="row-2">
          <div class="keiyakuryo-block">
            <label>契約支給量</label>
            <wj-combo-box
              :isReadOnly="true"
              v-bind:text="sikyuryoData"
              class="keiyakusikyu-box user-box"
            ></wj-combo-box>
          </div>
          <v-btn-toggle mandatory class="denbun-toggle">
            <v-btn small color="secondary" dark outlined>電文作成有</v-btn>
            <v-btn small color="secondary" dark outlined>電文作成無</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
    </v-row> -->
    <v-container class="user-info" fluid>
      <v-row class="rowStyle">
        <label class="pa-1">利用者</label>
        <v-card
          class="koumokuData ml-1 pa-1"
          style="width: 200px"
          tile
          outlined
        >
          {{ riyousya }}
        </v-card>
        <label class="ml-1 pa-1" style="width: 100px">受給者証番号</label>
        <v-card
          class="koumokuData ml-1 pa-1"
          style="width: 100px"
          tile
          outlined
        >
          {{ zyukyusyaNum }}
        </v-card>
        <label class="ml-1 pa-1" style="width: 100px">契約支給量</label>
        <v-card
          class="koumokuData ml-1 pa-1"
          style="width: 100px"
          tile
          outlined
        >
          {{ sikyuryoData }}
        </v-card>
        <label class="ml-1 pa-1" style="width: 100px">電文作成</label>
        <v-btn-toggle mandatory class="denbun-toggle ml-1">
          <v-btn small color="secondary" dark outlined>有り</v-btn>
          <v-btn small color="secondary" dark outlined>無し</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-container>

    <wj-flex-grid
      id="detailGrid"
      :itemsSource="detailGridData"
      :headersVisibility="'Column'"
      :autoGenerateColumns="false"
      :initialized="onInitializeDetailGrid"
      :itemsSourceChanged="onInitializeDetailGridChanged"
      :allowResizing="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowSorting="false"
    >
      <wj-flex-grid-column
        header="日付"
        binding="rymd"
        :width="'3*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="曜日"
        binding="youbi"
        :width="'3*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="算定日数"
        binding="nissu"
        :width="'4*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="サービス提供の状況"
        binding="jyokyo"
        :width="'12*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="往"
        binding="gei"
        :width="'3*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="復"
        binding="sou"
        :width="'3*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="食事提供加算"
        binding="kasans"
        :width="'11*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="医療連携体制加算"
        binding="iryo"
        :width="'11*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="緊急短期入所受入加算"
        binding="kinkyu"
        :width="'11*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="重度障害者支援加算（研修修了者）"
        binding="jyudo"
        :width="'12*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="定員超過特例加算"
        binding="chokatk"
        :width="'11*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="備考"
        binding="biko"
        :width="'16*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuTankiData.js';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());
const darkLine = '1px solid #333';

export default {
  props: {
    userListData: String,
    riyousya: String,
    zyukyusyaNum: String,
    startingOnSunday: Boolean,
  },
  watch: {
    riyousya() {
      this.sikyuryoData = apiResult['riyo_inf'][0]['keiyakuryo'];
      this.sougeiTotal = getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.iryoRenkeiTotal = getIryoRenkeiTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.teiinChokaTotal = getTeiinChokaTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.detailGridData = this.getGridData(apiResult);
      this.gridchangeFlag = true;
    },
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      sikyuryoData: '',
      sougeiTotal: 0,
      iryoRenkeiTotal: 0,
      teiinChokaTotal: 0,
      gridchangeFlag: false,
    };
  },
  methods: {
    onInitializeDetailGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 0, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 1, 7),
        new wjGrid.CellRange(0, 8, 1, 8),
        new wjGrid.CellRange(0, 9, 1, 9),
        new wjGrid.CellRange(0, 10, 1, 10),
        new wjGrid.CellRange(0, 11, 1, 11),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0, 0, 0, 1),
        new wjGrid.CellRange(0, 4, 0, 5),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let f = 0; f < footerRanges.length; f++) {
            if (footerRanges[f].contains(r, c)) {
              return footerRanges[f];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;

      // 改行指定不要のヘッダー・フッターの内容を設定する
      // ヘッダー0行目
      headerpanel.setCellData(0, 4, '送迎加算');
      headerpanel.setCellData(0, 6, '食事提供加算');
      headerpanel.setCellData(0, 7, '医療連携体制加算');
      headerpanel.setCellData(0, 11, '備考');
      // フッター0行目
      footerPanel.setCellData(0, 0, '合計');
      footerPanel.setCellData(0, 4, this.sougeiTotal);
      footerPanel.setCellData(0, 7, this.iryoRenkeiTotal);
      footerPanel.setCellData(0, 10, this.teiinChokaTotal);

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

      let startingOnSunday = this.startingOnSunday;

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダーの改行位置の設定
          if (r == 0 && c == 0) {
            cell.innerHTML = '日<br/>付';
          } else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          } else if (r == 0 && c == 2) {
            cell.innerHTML = '算定<br/>日数';
          } else if (r == 0 && c == 3) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          } else if (r == 0 && c == 8) {
            cell.innerHTML = '緊急短期入所<br/>受入加算';
          } else if (r == 0 && c == 9) {
            cell.innerHTML = '重度障害者支援加算<br/>（研修修了者）';
          } else if (r == 0 && c == 10) {
            cell.innerHTML = '定員超過<br/>特例加算';
          }

          // if (
          //   (r == 0 && !(c == 4 || c == 5)) ||
          //   (r == 1 && (c == 4 || c == 5))
          // ) {
          //   s.borderBottom = darkLine;
          // }

          if (c == 1 || c == 3 || c == 10) {
            s.borderRight = darkLine;
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          s.borderBottom = '1px solid rgba(0,0,0,.2)';

          if (panel.rows[r].dataItem.youbi == '土') {
            if (c == 0 || c == 1) {
              cell.innerHTML =
                "<div class='blue--text'>" + cell.innerHTML + '</div>';
            }

            if (startingOnSunday) {
              s.borderBottom = darkLine;
            }
          } else if (panel.rows[r].dataItem.youbi == '日') {
            if (c == 0 || c == 1) {
              cell.innerHTML =
                "<div class='red--text'>" + cell.innerHTML + '</div>';
            }

            if (!startingOnSunday) {
              s.borderBottom = darkLine;
            }
          }

          if (c == 1 || c == 3 || c == 10) {
            s.borderRight = darkLine;
          }

          //備考欄を左寄せにする
          if (c == 11) {
            s.textAlign = 'left';
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = darkLine;
          }

          if (c == 0 || c == 1 || c == 3 || c == 10) {
            s.borderRight = darkLine;
          }

          if (c >= 2 && c <= 10) {
            // セルを薄黄色にする
            s.backgroundColor = sysConst.COLOR.gridBackground;
          } else if (c == 11) {
            // 空欄セルをグレーにする
            s.backgroundColor = '#cccccc';
          }
        }
      };
    },
    onInitializeDetailGridChanged(flexGrid) {
      if (this.gridchangeFlag) {
        let footerPanel = flexGrid.columnFooters;
        footerPanel.setCellData(0, 4, this.sougeiTotal);
        footerPanel.setCellData(0, 7, this.iryoRenkeiTotal);
        footerPanel.setCellData(0, 10, this.teiinChokaTotal);
        this.gridchangeFlag = false;
      }
    },
    getGridData(data) {
      // グリッド表示用データの作成
      let gridData = [];
      if (data != null) {
        let kirokuMeiData = data['riyo_inf'][0]['kiroku_mei'];
        kirokuMeiData.forEach((rowData) => {
          // 曜日表示用に文字列の日付をDate型に変換
          let datearr = (
            rowData['rymd'].substr(0, 4) +
            '/' +
            rowData['rymd'].substr(4, 2) +
            '/' +
            rowData['rymd'].substr(6, 2)
          ).split('/');
          let date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
          gridData.push({
            rymd: Number(rowData['rymd'].substr(6, 2)),
            youbi: WeekChars[date.getDay()],
            nissu: rowData['nissu'] == 0 ? '' : rowData['nissu'],
            jyokyo: rowData['jyokyo'],
            gei: rowData['gei'] == 0 ? '' : rowData['gei'],
            sou: rowData['sou'] == 0 ? '' : rowData['sou'],
            kasans: rowData['kasans'] == 0 ? '' : rowData['kasans'],
            iryo: rowData['iryo'] == 0 ? '' : rowData['iryo'],
            kinkyu: rowData['kinkyu'] == 0 ? '' : rowData['kinkyu'],
            jyudo: rowData['jyudo'] == 0 ? '' : rowData['jyudo'],
            chokatk: rowData['chokatk'] == 0 ? '' : rowData['chokatk'],
            biko: rowData['biko'],
          });
        });
      } else {
        gridData.push({
          rymd: '',
          youbi: '',
          nissu: '',
          jyokyo: '',
          gei: '',
          sou: '',
          kasans: '',
          iryo: '',
          kinkyu: '',
          jyudo: '',
          chokatk: '',
          biko: '',
        });
      }
      return gridData;
    },
  },
};

// 曜日変換用
const WeekChars = ['日', '月', '火', '水', '木', '金', '土'];

// 送迎の合計の算出
function getSougeiTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['sou']) {
      totalCount++;
    }
    if (rowData['gei']) {
      totalCount++;
    }
  });
  return totalCount;
}

// 医療連携体制加算の合計の算出
function getIryoRenkeiTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['iryo'] > 0) {
      totalCount++;
    }
  });
  return totalCount;
}

// 定員超過特例加算の合計の算出
function getTeiinChokaTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['chokatk'] > 0) {
      totalCount++;
    }
  });
  return totalCount;
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 75vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 80vh;
  }
}
</style>