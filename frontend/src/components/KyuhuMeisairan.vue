<template>
  <div class="mt-1">
    <v-row no-gutters>
      <v-col>
        <wj-flex-grid
          id="riyousyahutanGrid"
          :itemsSource="riyousyahutanGridData"
          :headersVisibility="'None'"
          :autoGenerateColumns="false"
          :initialized="onInitializedRiyousyahutanGrid"
          :allowAddNew="false"
          :allowDelete="false"
          :allowDragging="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
        >
          <wj-flex-grid-column binding="Column0" :width="250" ></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column1" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column2" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column3" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column4" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column5" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column6" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column7" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column8" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column9" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column10" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column11" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column12" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column13" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column14" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column15" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column16" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column17" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column18" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column19" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column20" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column21" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column22" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column23" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column24" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column25" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column26" :width="'1*'"></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column27" :width="'1*'"></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>
    <v-row  no-gutters>
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
    </v-row>
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
      riyousyahutanGridData:this.getRiyousyahutanGridData(),
      servicesyubetuGridData:this.getServiceSyubetuGridData(),
      gridList: [],
      tplImage: CellMaker.makeImage({}),
    };
  },
  methods: {
    onInitializedRiyousyahutanGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,8,0,17),
        new wjGrid.CellRange(0,18,0,19),
        new wjGrid.CellRange(0,20,0,27),
        new wjGrid.CellRange(1,1,1,7),
        new wjGrid.CellRange(1,18,1,20),
        new wjGrid.CellRange(1,22,1,24),
        new wjGrid.CellRange(1,25,1,27),
        new wjGrid.CellRange(1,0,2,0),
        new wjGrid.CellRange(2,1,2,7),
        new wjGrid.CellRange(2,8,2,27),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.backgroundColor= sysConst.COLOR.gridBackground;
        if(c == 0 || (r != 0 && c == 1) || (r == 0 && c == 8) || (r == 1 && c == 18) || (r == 1 && c == 22)){
          s.backgroundColor = sysConst.COLOR.selectedColor;
        }
        // グリッド非表示スタイル
        if(r == 0) {
          s.borderTop = '1px solid rgba(0,0,0,.2)'
        }
        if(r == 0 && c == 0) {
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.borderLeft = '1px solid rgba(0,0,0,.2)'
          s.borderRadius = '4px 0 0 0'
        }
        if(r == 1 && c == 0) {
          s.borderLeft = '1px solid rgba(0,0,0,.2)'
          s.borderRadius = '0 0 0 4px'
        }
        if(r == 0 && c == 18 || r == 2 && c == 25) {
          s.borderBottom = '1px solid rgba(0,0,0,.2)'
          s.borderRight = '1px solid rgba(0,0,0,.2)'
          s.borderRadius = '0 4px 0 0'
        }
        if(r == 1 && c == 18|| c ==21 || c ==22 || c == 25) {
        // 管理結果、管理結果額のセル幅を調整
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.top = '18px'
          s.height = '20px'
        }
        if(r == 1 && c == 25) {
          s.borderRadius = '0 4px 0 0'
        }
        if(r == 0 && c == 20) {
          cell.style.display = 'none'
        }
        if(r == 2 && c == 8) {
          s.borderRadius = '0 0 4px 0'
        }
        // ヘッダー扱いのセルに文字列を挿入
        if ((r == 0) && (c == 0)) {
          cell.innerHTML = '利用者負担上限月額①';
        }
        if ((r == 0) && (c == 8)) {
          cell.innerHTML = '就労継続支援Ａ型事業者負担減免対象者';
        }
        if(r == 1 && c == 0) {
          cell.innerHTML = '利用者負担上限額<br/>管理事業所';
        }
        
        if(r == 1 && c == 1) {
          cell.innerHTML = '指定事業所番号';
        }
        if(r == 1 && c == 18) {
          cell.innerHTML = '管理結果';
        }
        if(r == 1 && c == 22) {
          cell.innerHTML = '管理結果額';
        }
        if(r == 2 && c == 1) {
          cell.innerHTML = '事業所名';
        }
      }
    },
    getRiyousyahutanGridData:function(){
      let riyousyahutanGridData = [];
      if (this.$parent.$data.gridReloadFlag == false) {
        // 初回空データ表示
         riyousyahutanGridData.push(
          {
          // 利用者負担上限月額①
          Column1: "",
          Column2: "",
          Column3: "",
          Column4: "",
          Column5: "",
          Column6: "",
          Column7: "",
          // 就労継続支援Ａ型事業者負担減免対象者
          Column18:"",
          },
          {
          // 指定事業所番号
          Column8:  "",
          Column9:  "",
          Column10: "",
          Column11: "",
          Column12: "",
          Column13: "",
          Column14: "",
          Column15: "",
          Column16: "",
          Column17: "",
          // 管理結果
          Column21: "",
          // 管理結果額
          Column25: "",
          },
          {
          // 事業所名
          Column8: "",
          }
        )
      } else {
      //データ表示
        riyousyahutanGridData.push(
          {
            // 利用者負担上限月額①
            Column1: "1",
            Column2: "1",
            Column3: "0",
            Column4: "0",
            Column5: "0",
            Column6: "1",
            Column7: "2",
            // 就労継続支援Ａ型事業者負担減免対象者
            Column18:"１：無",
          },
          {
            // 指定事業所番号
            Column8:  "1",
            Column9:  "1",
            Column10: "2",
            Column11: "1",
            Column12: "0",
            Column13: "0",
            Column14: "0",
            Column15: "0",
            Column16: "1",
            Column17: "1",
            // 管理結果
            Column21: "",
            // 管理結果額
            Column25: "",
          },
          {
            // 事業所名
            Column8: "",
          }
        )
      }
      return riyousyahutanGridData;
    },
    onInitializedServicessyubetuGrid:function(flexGrid){
      // サービス種別の配列数を算出
      let syubetuCount;
      syubetuCount = getSyubetuData().length;
      
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,0,syubetuCount - 1,0),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        s.fontWeight = "normal";
        s.backgroundColor = sysConst.COLOR.selectedColor;
        if(c == 1 || c == 3 || c == 5 ||  c == 7 ||  c == 9){
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if(c == 2){
          cell.innerHTML = '開始年月日';
        }
        if(c == 4){
          cell.innerHTML = '終了年月日';
        }
        if(c == 6){
          cell.innerHTML = '利用日数';
        }
        if(c == 8){
          cell.innerHTML = '入院人数';
        }
        // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
        if(c == 9){
           s.borderRight = 'none'
        }
      }
    },
    getServiceSyubetuGridData:function(){
      let servicesyubetuGridData = [];
      if (this.$parent.$data.gridReloadFlag == false) {
        // 初回空データ表示
        for (let f = 0; f < 3; f++) {
          servicesyubetuGridData.push({
            serviceNo:         "",
            kaisiYmd:          "",
            syuryoYmd:         "",
            riyouNissuu:       "",
            nyuinNissuu:       ""
          });
        }
      } else {
        // 挿入したサービス種別データをservicesyubetuGridDataに代入
        servicesyubetuGridData = getSyubetuData()
      }
      return servicesyubetuGridData;
    },
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
      // 利用者負担上限額グリッド
      this.riyousyahutanGridData = this.getRiyousyahutanGridData();
      // サービス種別グリッド
      this.servicesyubetuGridData = this.getServiceSyubetuGridData();
      // 給付明細欄グリッド
      this.gridList.itemsSource  = this.getMeisairanDataData();
    }
  },
};

/**************
 * 
 *サービス種別データを設定
 */

function getSyubetuData() {
  
  let syubetuData = [];
  syubetuData.push(
    {
      uid: 1,
      serviceNo:        "22",
      kaisiYmd:         "2022年3月23日",
      syuryoYmd:         "",
      riyouNissuu:       "31",
      nyuinNissuu:       "",
    },
    {
      uid: 2,
      serviceNo:        "32",
      kaisiYmd:         "2022年3月23日",
      syuryoYmd:         "",
      riyouNissuu:       "31",
      nyuinNissuu:       "",
    }
  )
  // データが３未満だった場合空の行を追加
  if (syubetuData.length < 3) {
    for (let f = 0; syubetuData.length < 3; f++) {
      syubetuData.push({
        serviceNo:        "",
        kaisiYmd:         "",
        syuryoYmd:         "",
        riyouNissuu:       "",
        nyuinNissuu:       ""
      });
    }
  }
  return syubetuData;
}

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