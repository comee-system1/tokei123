<template>
  <div class="mt-1">
    <!-- <v-row  no-gutters>
      <v-col>
        <wj-flex-grid
          id="servicessyubetuGrid"
          :itemsSource="servicesyubetuGridData"
          :headersVisibility="'None'"
          :autoGenerateColumns="false"
          :initialized="onInitializedServicessyubetuGrid"
          :allowAddNew="false"
          :allowDelete="false"
          :allowDragging="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
        >
          <div class="servicessyubetu-title">
            サービス種別
          </div>
          <wj-flex-grid-column :width="150" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="serviceNo" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="kaisiYmd" :width="'2*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="syuryoYmd" :width="'2*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="riyouNissuu" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="nyuinNissuu" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row> -->
    <v-row no-gutters>
      <v-col>
      <wj-flex-grid
        id="kyuhu-meisairan"
        :initialized="onInitialized"
        :headersVisibility="'All'"
        :isReadOnly="true"
        :deferResizing="false"
        :allowAddNew="false"
        :allowDelete="false"
        :allowDragging="false"
        :allowPinning="false"
        :allowResizing="false"
        :allowSorting="false"
        ><div class="kyuhu-meisairan-title">
        給付明細欄
        </div>
        <wj-flex-grid-column
          :binding="'service'"
          :header="'サービス内容'"
          width="3.5*"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode1'"
          :header="'サービスコード'"
          :width="20"
          allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode2'"
          :width="20"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode3'"
          :width="20"
          allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode4'"
          :width="20"
          allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode5'"
          :width="20"
          allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode6'"
          :width="20"
          allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tanisuu'"
          :header="'単位数'"
          width="1.5*"
          :format="'n0'"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kaisuu'"
          :header="'回数'"
          width="1*"
          :format="'n0'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicetanisuu'"
          :header="'サービス単位数'"
          align="center"
          width="2*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tekiyou'"
          :header="'摘要'"
          width="3*"
        ></wj-flex-grid-column>
      </wj-flex-grid>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      gridList: [],
      tplImage: CellMaker.makeImage({}),
    };
  },
  methods: {
    getMeisairanDataData: function () {
      let meisairanData = [];
      if (this.$parent.$data.gridReloadFlag == false) {
      // 初回空データ表示
        // 表示数12未満だった場合、空の行を追加
        for (let f = 0; meisairanData.length < 12; f++) {
          meisairanData.push({
            service: '',
            servicecode1: '',
            servicecode2: '',
            servicecode3: '',
            servicecode4: '',
            servicecode5: '',
            servicecode6: '',
            tanisuu: '',
            kaisuu: '',
            servicetanisuu: '',
            tekiyou: '',
          });
        }
      } else {
        meisairanData = getMeisairanData();
      }
      return meisairanData;
    },
    onInitialized: function (grid) {
      // 給付明細欄の配列数を算出
      let griddataCount = this.getMeisairanDataData().length;
      this.gridList = grid
      // グリッドの選択を無効にする
      grid.selectionMode = wjGrid.SelectionMode.None;

      // 給付明細欄の配列の数を算出
      
      // セルの結合/////////////////////////////////////////////////////////////////
      let headerColumnRanges = [
        new wjGrid.CellRange(0,1,0,6),
      ];
      
      let headerRowRanges = [
        new wjGrid.CellRange(0,0,griddataCount-1,0),
      ];
      let mm = new wjGrid.MergeManager();

      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerColumnRanges.length; h++) {
            if (headerColumnRanges[h].contains(r, c)) {
              return headerColumnRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let f = 0; f < headerRowRanges.length; f++) {
            if (headerRowRanges[f].contains(r, c)) {
              return headerRowRanges[f];
            }
          }
        }
      };
      grid.mergeManager = mm;

      // グリッドのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        s.textAlign = 'center';
        s.color= sysConst.COLOR.fontColor;
        s.backgroundColor = sysConst.COLOR.selectedColor;
        s.lineHeight= '19px';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
        // ヘッダー行のスタイルをカスタマイズ
          if (r === 0) {
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if(c == 10) {
            s.borderRight = 'none'
          }
        }
        if (panel.cellType == wjGrid.CellType.RowHeader) {
        // ヘッダー列のスタイルをカスタマイズ
          if (c === 0) {
            s.borderBottom = "none";
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
        // セルのスタイルをカスタマイズ
          s.backgroundColor= sysConst.COLOR.gridBackground;
          if (c == 0) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
          }
          if ((c == 7) || (c == 9)) {
            s.textAlign = 'right';
            s.paddingRight = '4px';
          }
          // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
          // if(r == griddataCount-1) {
          //   s.borderBottom = 'none'
          // }
          if(c == 10) {
            s.borderRight = 'none'
          }
        }
      }
      // 取得した給付明細欄の配列情報をセルに書き出し
      grid.itemsSource = this.getMeisairanDataData();
    },
    // ユーザークリック時データを再読み込み
    reloadMeisairanMethod:function() {
      // 給付明細欄グリッド
      this.gridList.itemsSource  = this.getMeisairanDataData();
    }
  },
};

/**************
 * 
 *給付明細欄データを設定
 */
function getMeisairanData() {
  let meisairanTmpData = [];
  let meisairanData = [];
  meisairanTmpData.push(
    {
      code:'222131',
      name:'生活介護１４',
      tmptanisuu: '669',
      tmpkaisuu: 31,
      tmpservicetanisuu: 20739,
    },
    {
      code:'226005',
      name:'生介常勤看護職員等配置加算１１',
      tmptanisuu: '84',
      tmpkaisuu: 31,
      tmpservicetanisuu: 2604,
    },
    {
      code:'226037',
      name:'生介福祉専門職員配置等加算Ⅰ',
      tmptanisuu: '15',
      tmpkaisuu: 31,
      tmpservicetanisuu: 465,
    },
    {
      code:'227062',
      name:'生介人員配置体制加算１１',
      tmptanisuu: '265',
      tmpkaisuu: 31,
      tmpservicetanisuu: 8215,
    },
    {
      code:'226716',
      name:'生介障害者支援施設処遇改善加算Ⅰ',
      tmptanisuu: '1409',
      tmpkaisuu: 1,
      tmpservicetanisuu: 1409,
    },
    {
      code:'322231',
      name:'施設入所３４',
      tmptanisuu: '201',
      tmpkaisuu: 31,
      tmpservicetanisuu: 6231,
    },
    {
      code:'325690',
      name:'施入重度障害者支援加算Ⅰ１',
      tmptanisuu: '28',
      tmpkaisuu: 31,
      tmpservicetanisuu: 868,
    },
    {
      code:'326070',
      name:'施入地域生活移行個別支援特別加算Ⅰ',
      tmptanisuu: '12',
      tmpkaisuu: 31,
      tmpservicetanisuu: 372,
    },
    {
      code:'326085',
      name:'施入夜間看護体制加算',
      tmptanisuu: '60',
      tmpkaisuu: 31,
      tmpservicetanisuu: 1860,
    },
    {
      code:'327025',
      name:'施入口腔衛生管理体制加算',
      tmptanisuu: '30',
      tmpkaisuu: 1,
      tmpservicetanisuu: 30,
    },
    {
      code:'327074',
      name:'施入夜勤職員配置体制加算５',
      tmptanisuu: '39',
      tmpkaisuu: 31,
      tmpservicetanisuu: 1209,
    },
    {
      code:'32Z001',
      name:'施入身体拘束廃止未実施減算',
      tmptanisuu: '-5',
      tmpkaisuu:22,
      tmpservicetanisuu: -110,
    },
    {
      code:'326715',
      name:'施入処遇改善加算Ⅰ',
      tmptanisuu: '900',
      tmpkaisuu: 1,
      tmpservicetanisuu: 900,
    }
  );
  for(let i = 0 ; i < meisairanTmpData.length; i++){
    let arrayCode = meisairanTmpData[i].code.split('');
    meisairanData.push({
      service: meisairanTmpData[i].name,
      servicecode1: arrayCode[0],
      servicecode2: arrayCode[1],
      servicecode3: arrayCode[2],
      servicecode4: arrayCode[3],
      servicecode5: arrayCode[4],
      servicecode6: arrayCode[5],
      tanisuu: meisairanTmpData[i].tmptanisuu,
      kaisuu: meisairanTmpData[i].tmpkaisuu,
      servicetanisuu: meisairanTmpData[i].tmpservicetanisuu,
      tekiyou: '',
    });
  }
  // 空行を追加
  meisairanData.push({
    code:'',
    name:'',
    service: '',
    servicecode1: '',
    servicecode2: '',
    servicecode3: '',
    servicecode4: '',
    servicecode5: '',
    servicecode6: '',
    tanisuu: '',
    kaisuu: '',
    servicetanisuu: '',
    tekiyou: '',
  });
  // 表示数12未満だった場合、空の行を追加
  if (meisairanData.length < 12) {
    for (let f = 0; meisairanData.length < 12; f++) {
      meisairanData.push({
        service: '',
        servicecode1: '',
        servicecode2: '',
        servicecode3: '',
        servicecode4: '',
        servicecode5: '',
        servicecode6: '',
        tanisuu: '',
        kaisuu: '',
        servicetanisuu: '',
        tekiyou: '',
      });
    }
  }
  return meisairanData;
}

</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
// 利用者負担グリッドの修正
#riyousyahutanGrid {
  &.wj-content {
    border: none;
  }
}
// サービス種別グリッドの修正
#servicessyubetuGrid {
  .wj-cell {
    color: #333;
  }
  .servicessyubetu-title {
    position: absolute;
    top: 20px;
    left: 40px;
    z-index: 2;
    color: #333;
  }
  &.wj-flexgrid {
    max-height: 58px;
    position: relative;
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
// 給付明細欄グリッドの修正
#kyuhu-meisairan {
  .wj-cell  {
      color: #333;
    }
  position: relative;
  .kyuhu-meisairan-title {
    position: absolute;
    writing-mode: vertical-rl;
    top: 90px;
    left: 2px;
    z-index: 2;
    color: #333;

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
@media screen and (max-width: 1366px){
  #kyuhu-meisairan {
    max-height: 247px;
  }
}

</style>