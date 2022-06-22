<template>
  <div>
    <v-row>
      <v-col cols="5" class="user-info">
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
          <div class="hosokuumu-block">
            <label>補足給付摘要の有無</label>
            <wj-combo-box
              :isReadOnly="true"
              v-bind:text="tkkfhiumuData"
              class="hosokuumu-box"
            ></wj-combo-box>
          </div>
          <div class="hosokugaku-block">
            <label>補足給付額(日額)</label>
            <wj-combo-box
              :isReadOnly="true"
              v-bind:text="tkkfhiData"
              class="hosokugaku-box"
            ></wj-combo-box>
          </div>
          <v-btn-toggle mandatory class="denbun-toggle">
            <v-btn small color="secondary" dark outlined>電文作成有</v-btn>
            <v-btn small color="secondary" dark outlined>電文作成無</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
      <v-col cols="5" class="jippisanteigaku">
        <wj-flex-grid
          id="jippisanteigakuGrid"
          :itemsSource="jippisanteigakuGridData"
          :headersVisibility="'None'"
          :autoGenerateColumns="false"
          :initialized="onInitializeJippisanteigakuGrid"
          :itemsSourceChanged="onInitializeJippisanteigakuGridChanged"
          :allowResizing="false"
          :allowDragging="false"
          :allowPinning="false"
          :allowSorting="false"
        >
          <wj-flex-grid-column
            binding="Column0"
            :width="'7*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column1"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column2"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column3"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column4"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column5"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="Column6"
            :width="'10*'"
            :wordWrap="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>

    <wj-flex-grid
      id="detailGrid"
      :itemsSource="detailGridData"
      :headersVisibility="'Column'"
      :autoGenerateColumns="false"
      :initialized="onInitializeDetailGrid"
      :itemsSourceChanged="onInitializeDetailGridChanged"
      :allowResizing="false"
      :allowDragging="false"
      :autoRowHeights="true"
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
        header="入院・外泊時加算"
        binding="kasan1"
        :width="'9*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="入院時支援特別加算"
        binding="kasan2"
        :width="'9*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="地域移行加算"
        binding="kasanti"
        :width="'9*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="体験宿泊支援加算"
        binding="kasantkn"
        :width="'9*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="重度障害者支援加算"
        binding="kasanj"
        :width="'9*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="朝食"
        binding="sasa"
        :width="'5*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="昼食"
        binding="shiru"
        :width="'5*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="夕食"
        binding="syuu"
        :width="'5*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="光熱水費"
        binding="konetu"
        :width="'5*'"
        :wordWrap="true"
        aggregate="Sum"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="備考"
        binding="biko"
        :width="'20*'"
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
        :width="'16*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column1"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column2"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column3"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column4"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column5"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="Column6"
        :width="'14*'"
        :wordWrap="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuNyushoData.js';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import '@/assets/scss/common.scss';
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
      this.gridchangeFlag = true;
      this.tkkfhiumuData = apiResult['riyo_inf'][0]['tkkfhiumu'];
      this.tkkfhiData = apiResult['riyo_inf'][0]['tkkfhi'] + ' 円';
      this.nyuinGaihakuTotal = getNyuinGaihakuTotal(
        apiResult['riyo_inf'][0]['kiroku_mei']
      );
      this.detailGridData = this.getGridData(apiResult);
      this.subGridData = this.getSubGridData(apiResult);
      this.jippisanteigakuGridData = this.getjippisanteigakuGridData(apiResult);
    },
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      nyuinGaihakuTotal: 0,
      tkkfhiumuData: '',
      tkkfhiData: '',
      subGridData: this.getSubGridData(),
      jippisanteigakuGridData: this.getjippisanteigakuGridData(),
      gridchangeFlag: false,
    };
  },
  methods: {
    onInitializeJippisanteigakuGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0, 0, 2, 0),
        new wjGrid.CellRange(0, 1, 0, 4),
        new wjGrid.CellRange(0, 5, 0, 6),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;

      // ヘッダーとフッターの高さを調整
      flexGrid.cells.rows[0].height = 20;
      flexGrid.cells.rows[1].height = 20;

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (r == 0 || r == 1) {
          s.backgroundColor = '#eee';
          s.padding = '1px';
          s.fontWeight = 'bold';
        } else {
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }

        if ((r == 0 || r == 1 || r == 1) && c == 0) {
          cell.innerHTML = '実費<br/>算定額';
        }

        if (c == 0) {
          s.padding = '15px 0px';
        }
      };
    },
    onInitializeJippisanteigakuGridChanged(flexGrid) {
      if (this.gridchangeFlag) {
        flexGrid.cells.rows[0].height = 20;
        flexGrid.cells.rows[1].height = 20;
      }
    },
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
        new wjGrid.CellRange(0, 2, 0, 7),
        new wjGrid.CellRange(0, 8, 0, 11),
        new wjGrid.CellRange(0, 12, 1, 12),
      ];
      let footerRanges = [new wjGrid.CellRange(0, 0, 0, 2)];
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
      headerpanel.setCellData(0, 2, '支援実績');
      headerpanel.setCellData(0, 8, '食費・光熱水費実績');
      headerpanel.setCellData(0, 12, '備考');
      // フッター0行目
      footerPanel.setCellData(0, 0, '合計');
      footerPanel.setCellData(0, 3, this.nyuinGaihakuTotal);

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 45;

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
          } else if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          } else if (r == 1 && c == 3) {
            cell.innerHTML = '入院・外泊時<br/>加算';
          } else if (r == 1 && c == 4) {
            cell.innerHTML = '入院時支援<br/>特別加算';
          } else if (r == 1 && c == 5) {
            cell.innerHTML = '地域移行<br/>加算';
          } else if (r == 1 && c == 6) {
            cell.innerHTML = '体験宿泊<br/>支援加算';
          } else if (r == 1 && c == 7) {
            cell.innerHTML = '重度障害者<br/>支援加算';
          }

          if (r == 0 || r == 1) {
            s.borderBottom = darkLine;
          }

          if (c == 1 || c == 2 || c == 7 || (r == 0 && c == 8) || c == 11) {
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

          if (c == 1 || c == 2 || c == 7 || c == 11) {
            s.borderRight = darkLine;
          }

          //備考欄を左寄せにする
          if (c == 12) {
            s.textAlign = 'left';
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = darkLine;
          }

          if (c == 0 || c == 2 || c == 7 || c == 11) {
            s.borderRight = darkLine;
          }

          if (c >= 1 && c <= 11) {
            // セルを薄黄色にする
            s.backgroundColor = sysConst.COLOR.gridBackground;
          } else if (c == 12) {
            // 空欄セルをグレーにする
            s.backgroundColor = '#cccccc';
          }
        }
      };
    },
    onInitializeDetailGridChanged(flexGrid) {
      if (this.gridchangeFlag) {
        let footerPanel = flexGrid.columnFooters;
        footerPanel.setCellData(0, 3, this.nyuinGaihakuTotal);
        this.gridchangeFlag = false;
      }
    },
    onInitializeSubGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        let s = cell.style;
        s.textAlign = 'center';
        if (c == 0 || c == 1 || c == 3 || c == 5) {
          // セルをヘッダーの色にする
          s.backgroundColor = '#eeeeee';
          s.fontWeight = 'bold';
        }

        if (r == 1 && (c == 5 || c == 6)) {
          // 空欄セルをグレーにする
          s.backgroundColor = '#cccccc';
        }
      };
    },
    getjippisanteigakuGridData(data) {
      let jippisanteigakuGridData = [];
      if (data != null) {
        let sTankaAsa = data['riyo_inf'][0]['tnka_syk_a'];
        let sTankaHiru = data['riyo_inf'][0]['tnka_syk_h'];
        let sTankaYoru = data['riyo_inf'][0]['tnka_syk_y'];
        let sTankaDay = data['riyo_inf'][0]['tnka_syk_d'];
        let kTankaDay = data['riyo_inf'][0]['tnka_kns_d'];
        let kTankaMonth = data['riyo_inf'][0]['tnka_kns_m'];
        jippisanteigakuGridData.push(
          {
            Column0: '実費算定額',
            Column1: '食費の単価(円/日)',
            Column2: '食費の単価',
            Column3: '食費の単価',
            Column4: '食費の単価',
            Column5: '光熱水費の単価(円/日)',
            Column6: '光熱水費の単価',
          },
          {
            Column0: '実費算定額',
            Column1: '朝食',
            Column2: '昼食',
            Column3: '夕食',
            Column4: '一日',
            Column5: '一日',
            Column6: '一月',
          },
          {
            Column0: '実費算定額',
            Column1: sTankaAsa,
            Column2: sTankaHiru,
            Column3: sTankaYoru,
            Column4: sTankaDay,
            Column5: kTankaDay,
            Column6: kTankaMonth,
          }
        );
      } else {
        jippisanteigakuGridData.push(
          {
            Column0: '実費算定額',
            Column1: '食費の単価(円/日)',
            Column2: '食費の単価',
            Column3: '食費の単価',
            Column4: '食費の単価',
            Column5: '光熱水費の単価(円/日)',
            Column6: '光熱水費の単価',
          },
          {
            Column0: '実費算定額',
            Column1: '朝食',
            Column2: '昼食',
            Column3: '夕食',
            Column4: '一日',
            Column5: '一日',
            Column6: '一月',
          },
          {
            Column0: '実費算定額',
            Column1: '',
            Column2: '',
            Column3: '',
            Column4: '',
            Column5: '',
            Column6: '',
          }
        );
      }
      return jippisanteigakuGridData;
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
            kasan1: rowData['kasan1'] == 0 ? '' : rowData['kasan1'],
            kasan2: rowData['kasan2'] == 0 ? '' : rowData['kasan2'],
            kasanti: rowData['kasanti'] == 0 ? '' : rowData['kasanti'],
            kasantkn: rowData['kasantkn'] == 0 ? '' : rowData['kasantkn'],
            kasanj: rowData['kasanj'] == 0 ? '' : rowData['kasanj'],
            sasa: rowData['sasa'],
            shiru: rowData['shiru'],
            syuu: rowData['syuu'],
            konetu: rowData['konetu'] == 0 ? '' : rowData['konetu'],
            biko: rowData['biko'],
          });
        });
      } else {
        gridData.push({
          rymd: '',
          youbi: '',
          jyokyo: '',
          kasan1: '',
          kasan2: '',
          kasanti: '',
          kasantkn: '',
          kasanj: '',
          sasa: '',
          shiru: '',
          syuu: '',
          konetu: '',
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
        let taishoDate = data['riyo_inf'][0]['taiymd'];
        let taishogoSanteibi = data['riyo_inf'][0]['ttymd'];
        subGridData.push(
          {
            Column0: '入所時特別支援加算',
            Column1: '利用開始日',
            Column2: dateFilter(riyouKaishibi),
            Column3: '30日目',
            Column4: thirtythDayFilter(riyouKaishibi),
            Column5: '当月算定日数',
            Column6: tougetsuSantei + '日',
          },
          {
            Column0: '地域移行支援',
            Column1: '退所日',
            Column2: dateFilter(taishoDate),
            Column3: '退所後算定日',
            Column4: dateFilter(taishogoSanteibi),
            Column5: '',
            Column6: '',
          }
        );
      } else {
        subGridData.push(
          {
            Column0: '入所時特別支援加算',
            Column1: '利用開始日',
            Column2: '',
            Column3: '30日目',
            Column4: '',
            Column5: '当月算定日数',
            Column6: '',
          },
          {
            Column0: '地域移行支援',
            Column1: '退所日',
            Column2: '',
            Column3: '退所後算定日',
            Column4: '',
            Column5: '',
            Column6: '',
          }
        );
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

// 入院・外泊時加算の合計の算出
function getNyuinGaihakuTotal(data) {
  let totalCount = 0;
  data.forEach((rowData) => {
    if (rowData['kasan1'] > 0) {
      totalCount++;
    }
  });
  return totalCount;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
/* 利用者情報エリアのスタイル */
* {
  padding: 0;
  margin: 0;
}

.hosokuumu-block,
.hosokugaku-block {
  float: left;
}

.hosokuumu-block {
  width: 190px;
}

.hosokuumu-block label {
  width: 150px !important;
  text-align: center;
}

.hosokugaku-block {
  width: 220px;
  margin-left: 10px;
}

.hosokugaku-block label {
  width: 130px !important;
  text-align: center;
}

.hosokuumu-box {
  width: 30px;
  background-color: $light_yellow;
  border: thin solid rgba(0, 0, 0, 0.12) !important;
  border-radius: 0 !important;
  border: none;
}

.hosokugaku-box {
  width: 75px;
  background-color: $light_yellow;
  border: thin solid rgba(0, 0, 0, 0.12) !important;
  border-radius: 0 !important;
  border: none;
}

.denbun-toggle {
  margin-left: 5px !important;
  width: 80px;
}

#jippisanteigakuGrid {
  font-size: 12px;
  color: #333333;
}

#detailGrid {
  margin-top: -2px !important;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 58vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 72vh;
  }
}
</style>