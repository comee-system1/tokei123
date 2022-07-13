<template>
  <div>
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
        header="サービス提供の状況"
        binding="jyokyo"
        :width="'9*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="開始時間"
        binding="jstime"
        :width="'6*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="終了時間"
        binding="jetime"
        :width="'6*'"
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
        header="時間数"
        binding="kasanh_mn"
        :width="'9*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="食事提供加算"
        binding="kasans"
        :width="'6*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="医療連携体制加算"
        binding="kasani"
        :width="'7*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="通勤訓練加算"
        binding="kasantu"
        :width="'6*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="体験利用支援加算"
        binding="kasantkn"
        :width="'7*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="支援計画会議実施加算"
        binding="kasankai"
        :width="'9*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="移行準備支援体制加算"
        binding="kasang"
        :width="'9*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="備考"
        binding="biko"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-flex-grid
      id="subGrid"
      :itemsSource="subGridData"
      :headersVisibility="'None'"
      :autoGenerateColumns="false"
      :initialized="onInitializeSubGrid"
      :allowResizing="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowSorting="false"
    >
      <wj-flex-grid-column
        binding="Column0"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column1"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column2"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column3"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column4"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column5"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column6"
        :width="'20*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuTsushoData.js';
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
      this.sikyuryoData = apiResult['riyo_inf'][0]['sikyuryo'];
      this.sougeiTotal = getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.jikansuTotal = getJikansuTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.iryoRenkeiTotal = getIryoRenkeiTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.taikenRiyoTotal = getTaikenRiyoTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.ikojunbiKasanTotal = getIkojunbiKasanTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.ruikei = apiResult['riyo_inf'][0]['ksnruikei'];
      this.detailGridData = this.getGridData(apiResult);
      this.subGridData = this.getSubGridData(apiResult);
      this.gridchangeFlag = true;
    },
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      sikyuryoData: '',
      sougeiTotal: 0,
      jikansuTotal: 0,
      iryoRenkeiTotal: 0,
      taikenRiyoTotal: 0,
      ikojunbiKasanTotal: 0,
      ruikei: 0,
      subGridData: this.getSubGridData(),
      gridchangeFlag: false,
    };
  },
  methods: {
    onInitializeDetailGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(2, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 2, 0),
        new wjGrid.CellRange(0, 1, 2, 1),
        new wjGrid.CellRange(0, 2, 0, 14),
        new wjGrid.CellRange(1, 2, 2, 2),
        new wjGrid.CellRange(1, 3, 2, 3),
        new wjGrid.CellRange(1, 4, 2, 4),
        new wjGrid.CellRange(1, 5, 1, 6),
        new wjGrid.CellRange(1, 8, 2, 8),
        new wjGrid.CellRange(1, 9, 2, 9),
        new wjGrid.CellRange(1, 10, 2, 10),
        new wjGrid.CellRange(1, 11, 2, 11),
        new wjGrid.CellRange(1, 12, 2, 12),
        new wjGrid.CellRange(1, 13, 2, 13),
        new wjGrid.CellRange(1, 14, 2, 14),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0, 0, 2, 4),
        new wjGrid.CellRange(0, 5, 2, 6),
        new wjGrid.CellRange(0, 7, 2, 7),
        new wjGrid.CellRange(0, 8, 2, 8),
        new wjGrid.CellRange(0, 9, 2, 9),
        new wjGrid.CellRange(0, 10, 2, 10),
        new wjGrid.CellRange(0, 11, 2, 11),
        new wjGrid.CellRange(0, 12, 2, 12),
        new wjGrid.CellRange(0, 13, 0, 14),
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
      headerpanel.setCellData(0, 2, 'サービス提供実績');
      // ヘッダー1行目
      headerpanel.setCellData(1, 3, '開始時間');
      headerpanel.setCellData(1, 4, '終了時間');
      headerpanel.setCellData(1, 5, '送迎加算');
      headerpanel.setCellData(1, 7, '訪問支援加算');
      headerpanel.setCellData(1, 14, '備考');
      // フッター0行目
      footerPanel.setCellData(0, 0, '合計');
      footerPanel.setCellData(0, 5, this.sougeiTotal);
      footerPanel.setCellData(0, 7, this.jikansuTotal);
      footerPanel.setCellData(0, 9, this.iryoRenkeiTotal);
      footerPanel.setCellData(0, 11, this.taikenRiyoTotal);
      footerPanel.setCellData(0, 13, '移行準備支援体制加算');
      // フッター1行目
      footerPanel.setCellData(1, 13, '当月');
      footerPanel.setCellData(1, 14, this.ikojunbiKasanTotal);
      // フッター2行目
      footerPanel.setCellData(2, 13, '累計');
      footerPanel.setCellData(2, 14, this.ruikei + ' / 180');

      // ヘッダーとフッターの高さを調整
      // flexGrid.columnHeaders.rows[1].height = 25;
      // flexGrid.columnFooters.rows[0].height = 20;
      // flexGrid.columnFooters.rows[1].height = 20;
      // flexGrid.columnFooters.rows[2].height = 20;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnFooters.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnFooters.rows[2].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

      let startingOnSunday = this.startingOnSunday;

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          if (r == 0 && c == 0) {
            cell.innerHTML = '日<br/>付';
          } else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          } else if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          } else if (r == 1 && c == 8) {
            cell.innerHTML = '食事提供<br/>加算';
          } else if (r == 1 && c == 9) {
            cell.innerHTML = '医療連携<br/>体制加算';
          } else if (r == 1 && c == 10) {
            cell.innerHTML = '通勤訓練<br/>加算';
          } else if (r == 1 && c == 11) {
            cell.innerHTML = '体験利用<br/>支援加算';
          } else if (r == 1 && c == 12) {
            cell.innerHTML = '支援計画会議<br/>実施加算';
          } else if (r == 1 && c == 13) {
            cell.innerHTML = '移行準備支援<br/>体制加算';
          }

          // if (r == 0 || (r == 1 && !(c == 5 || c == 6 || c == 7)) || r == 2) {
          //   s.borderBottom = darkLine;
          // }

          if (c == 1 || (r == 1 && c == 2) || c == 4 || c == 13) {
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

          if (c == 1 || c == 2 || c == 4 || c == 13) {
            s.borderRight = darkLine;
          }

          //備考欄を左寄せにする
          if (c == 14) {
            s.textAlign = 'left';
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = darkLine;
          }

          if (c == 0) {
            s.borderRight = darkLine;
          }

          if ((c >= 5 && c <= 12) || c == 14) {
            // セルを薄黄色にする
            s.backgroundColor = sysConst.COLOR.gridBackground;
          }
        }
      };
    },
    onInitializeDetailGridChanged(flexGrid) {
      if (this.gridchangeFlag) {
        let footerPanel = flexGrid.columnFooters;
        footerPanel.setCellData(0, 5, this.sougeiTotal);
        footerPanel.setCellData(0, 7, this.jikansuTotal);
        footerPanel.setCellData(0, 9, this.iryoRenkeiTotal);
        footerPanel.setCellData(0, 11, this.taikenRiyoTotal);
        footerPanel.setCellData(1, 14, this.ikojunbiKasanTotal);
        footerPanel.setCellData(2, 14, this.ruikei + ' / 180');
        this.gridchangeFlag = false;
      }
    },
    onInitializeSubGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        let s = cell.style;
        s.textAlign = 'center';
        if (c == 0 || c == 1 || c == 3 || c == 5) {
          // セルをヘッダーの色にする
          s.backgroundColor = '#eeeeee';
          // s.fontWeight = 'bold';
        }
      };
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
            jyokyo: rowData['jyokyo'],
            jstime: rowData['jstime'] == '00:00' ? '' : rowData['jstime'],
            jetime: rowData['jetime'] == '00:00' ? '' : rowData['jetime'],
            gei: rowData['gei'] == 0 ? '' : rowData['gei'],
            sou: rowData['sou'] == 0 ? '' : rowData['sou'],
            kasanh_mn: rowData['kasanh_mn'] == 0 ? '' : rowData['kasanh_mn'],
            kasans: rowData['kasans'] == 0 ? '' : rowData['kasans'],
            kasani: rowData['kasani'] == 0 ? '' : rowData['kasani'],
            kasantu: rowData['kasantu'] == 0 ? '' : rowData['kasantu'],
            kasantkn: rowData['kasantkn'] == 0 ? '' : rowData['kasantkn'],
            kasankai: rowData['kasankai'] == 0 ? '' : rowData['kasankai'],
            kasang: rowData['kasang'] == 0 ? '' : rowData['kasang'],
            biko: rowData['biko'],
          });
        });
      } else {
        gridData.push({
          rymd: '',
          youbi: '',
          jyokyo: '',
          jstime: '',
          jetime: '',
          gei: '',
          sou: '',
          kasanh_mn: '',
          kasans: '',
          kasani: '',
          kasantu: '',
          kasantkn: '',
          kasankai: '',
          kasang: '',
          biko: '',
        });
      }
      return gridData;
    },
    getSubGridData(data) {
      // サブグリッド表示用データの作成
      let subGridData = [];
      if (data != null) {
        let riyouKaishibi = data['riyo_inf'][0]['staymd'];
        let tougetsuSantei = data['riyo_inf'][0]['ms2_kaisu'];
        subGridData.push({
          Column0: '初期加算',
          Column1: '利用開始日',
          Column2: dateFilter(riyouKaishibi),
          Column3: '30日目',
          Column4: thirtythDayFilter(riyouKaishibi),
          Column5: '当月算定日数',
          Column6: tougetsuSantei + '日',
        });
      } else {
        subGridData.push({
          Column0: '初期加算',
          Column1: '利用開始日',
          Column2: '',
          Column3: '30日目',
          Column4: '',
          Column5: '当月算定日数',
          Column6: '',
        });
      }
      return subGridData;
    },
  },
};

// 西暦＋年月日フィルター
function dateFilter(date) {
  let datearr =
    date.substr(0, 4) +
    '年' +
    date.substr(4, 2) +
    '月' +
    date.substr(6, 2) +
    '日';
  return datearr;
}

// 30日目変換用
function thirtythDayFilter(riyouKaishibi) {
  let datearr = (
    riyouKaishibi.substr(0, 4) +
    '/' +
    riyouKaishibi.substr(4, 2) +
    '/' +
    riyouKaishibi.substr(6, 2)
  ).split('/');
  let thirtythDay = new Date(datearr[0], datearr[1] - 1, datearr[2]);
  thirtythDay.setDate(thirtythDay.getDate() + 29);
  thirtythDay =
    thirtythDay.getFullYear() +
    '年' +
    ('00' + (thirtythDay.getMonth() + 1)).slice(-2) +
    '月' +
    ('00' + thirtythDay.getDate()).slice(-2) +
    '日';
  return thirtythDay;
}

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

// 訪問支援加算時間数の合計の算出
function getJikansuTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['kasanh_mn'] != '0') {
      totalCount++;
    }
  });
  return totalCount;
}

// 医療連携体制加算の合計の算出
function getIryoRenkeiTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['kasani'] > 0) {
      totalCount++;
    }
  });
  return totalCount;
}

// 体験利用支援加算の合計の算出
function getTaikenRiyoTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['kasantkn'] > 0) {
      totalCount++;
    }
  });
  return totalCount;
}

// 移行準備支援体制加算の月の合計を算出
function getIkojunbiKasanTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['kasang']) {
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
    height: 70vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 75vh;
  }
}
</style>