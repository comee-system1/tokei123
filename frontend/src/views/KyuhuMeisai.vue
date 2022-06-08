<template>
  <div id="kyuhumeisai">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :searchButtonFlag="true"
      :registButtonFlag="false"
      :confirmRegistButtonFlag="true"
    ></header-services>
    <v-container fluid class="container">
      <v-row no-gutters>
        <v-col class="leftArea">
          <UserList
            @child-userslist="getUserListData"
            @child-selectedrow="getSelectedRow">
          </UserList>
        </v-col>
        <v-col class="rightArea kyuhumeisai">
          <v-row no-gutters justify="space-between">
            <v-col cols="6">
              <wj-flex-grid
                id="kyuhujukyuyaGrid"
                :itemsSource="kyuhujukyuyaGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializedKyuhujukyuyaGrid"
                :allowAddNew="false"
                :allowDelete="false"
                :allowDragging="false"
                :allowPinning="false"
                :allowResizing="false"
                :allowSorting="false"
                >
                <wj-flex-grid-column binding="Column0"  :width="250" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="4">
              <div class="confirmTitle pl-2 mb-1 white--text">
                確定済:2021.08.08 14:19 (担当者:大正 雅夫)
              </div>
              <v-row no-gutters justify="end">
                <v-col cols="11">
                  <wj-flex-grid
                    id="styousonGrid"
                    :itemsSource="styousonGridData"
                    :headersVisibility="'None'"
                    :autoGenerateColumns="false"
                    :initialized="onInitializedStyousonGrid"
                    :allowResizing="false"
                    :allowDragging="false"
                    >
                    <wj-flex-grid-column binding="Column0" :width="200" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column3" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column5" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col cols="6">
              <wj-flex-grid
                id="jigyousyaGrid"
                :itemsSource="jigyousyaGridData"
                :headersVisibility="'None'"
                :initialized="onInitializedJigyousyaGrid"
                :allowAddNew="false"
                :allowDelete="false"
                :allowDragging="false"
                :allowPinning="false"
                :allowResizing="false"
                :allowSorting="false"
                >
                <wj-flex-grid-column binding="Column0"  :width="250" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9"  :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <v-row no-gutters justify="end">
                <v-col cols="12">
                  <wj-flex-grid
                    id="chiikikubunGrid"
                    :itemsSource="chiikikubunGridData"
                    :headersVisibility="'None'"
                    :autoGenerateColumns="false"
                    :initialized="onInitializedChiikikubunGrid"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowDragging="false"
                    :allowPinning="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    >
                    <wj-flex-grid-column binding="Column0" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <common-tab-menu
            @parent_common_tab_menu="parent_common_tab_menu"
            :tabmenu="tabmenus"
            ></common-tab-menu>
          <v-row  no-gutters>
            <v-col>
              <div v-if="ServiceMeisaiFlag">
                <kyuhu-meisairan
                ref="reloadMeisairan"></kyuhu-meisairan>
              </div>
              <div v-if="SeikyugakuSyukeiFlag">
                <kyuhu-seikyugaku
                ref="reloadSeikyugaku"></kyuhu-seikyugaku>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeaderServices from '../components/HeaderServices.vue';
import UserList from '../components/UserList';
import * as wjGrid from '@grapecity/wijmo.grid';
import CommonTabMenu from '../components/CommonTabMenu.vue';
import KyuhuMeisairan from '../components/KyuhuMeisairan.vue';
import KyuhuSeikyugaku from '../components/KyuhuSeikyugaku.vue';
import sysConst from '@/utiles/const';


export default {
  components: {
    HeaderServices,
    CommonTabMenu,
    UserList,
    KyuhuMeisairan,
    KyuhuSeikyugaku,
  },
  data() {
    return {
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      gridReloadFlag: false,
      dateArgument: '',
      searchArgument: '',
      kyuhujukyuyaGridData:this.getKyuhujukyuyaGridData(),
      styousonGridData:this.getStyousonGridData(),
      jigyousyaGridData:this.getJigyousyaGridData(), 
      chiikikubunGridData:this.getChiikikubunGridData(),
      // タブの制御Flag
      ServiceMeisaiFlag: true, // ServiceMeisaiFlagの初期表示状態
      SeikyugakuSyukeiFlag: false, // seikyugakuSyukeiFlagの初期表示状態
      tabmenus: [
        { href: '#ServiceMeisai', text: 'サービス明細欄' },
        { href: '#SeikyugakuSyukei', text: '請求額集計欄' },
      ],
    };
  },
  methods: {
    onInitializedKyuhujukyuyaGrid:function(flexGrid){
      this.getKyuhujukyuyaGridData();
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,1,1,10),
        new wjGrid.CellRange(2,1,2,10),
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
        s.fontWeight = "normal";
        s.textAlign = 'center';
        s.color = sysConst.COLOR.fontColor;
        s.backgroundColor = sysConst.COLOR.gridBackground;
        if(c == 0){
          s.backgroundColor = sysConst.COLOR.selectedColor;
        }
        if(r == 1 && c == 1 || r == 2 && c == 2){
          s.textAlign = 'left';
          s.paddingLeft = '4px';
        }
        // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
        if(r == 2){
           s.borderBottom = 'none'
        }
        if((c == 10) || (r > 0 && c == 1)){
           s.borderRight = 'none'
        }
      }
    },
    getKyuhujukyuyaGridData:function(){
      let kyuhujukyuyaGridData = [];
      kyuhujukyuyaGridData.push(
        {
          Column0: "受給者証番号",
          Column1: "",
          Column2: "",
          Column3: "",
          Column4: "",
          Column5: "",
          Column6: "",
          Column7: "",
          Column8: "",
          Column9: "",
          Column10:"",
        },
        {
          Column0: "支給決定障害者等氏名",
          Column1: "",
        },
        {
          Column0: "支給決定に係る障害児氏名",
          Column1: "",
        }
      )
      this.kyuhujukyuyaGridData = kyuhujukyuyaGridData;
    },
    onInitializedStyousonGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        s.fontWeight = "normal";
        s.backgroundColor = sysConst.COLOR.gridBackground;
        if(c == 0){
          s.backgroundColor= sysConst.COLOR.selectedColor;
        }
        // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
        if(r == 1){
           s.borderBottom = 'none'
        }
        if(c == 6){
           s.borderRight = 'none'
        }
        // ヘッダー扱いのセルに文字列を挿入
        if ((r == 0) && (c == 0)) {
          cell.innerHTML = '市町村番号';
        }
        if ((r == 1) && (c == 0)) {
          cell.innerHTML = '助成自治体番号';
        }
      }
    },
    getStyousonGridData:function(){
      let styousonGridData = [];
      if (this.gridReloadFlag != true) {
        // 初回空データ表示
        styousonGridData.push(
          {
            // 市町村番号
            Column1: "",
            Column2: "",
            Column3: "",
            Column4: "",
            Column5: "",
            Column6: ""
          },
          {
            // 助成自治体番号
            Column1: "",
            Column2: "",
            Column3: "",
            Column4: "",
            Column5: "",
            Column6: "",
          }
        )
      } else {
        styousonGridData.push (
          {
            // 市町村番号
            Column1: "1",
            Column2: "1",
            Column3: "0",
            Column4: "0",
            Column5: "0",
            Column6: "1",
          },
          {
            // 助成自治体番号
            Column1: "",
            Column2: "",
            Column3: "",
            Column4: "",
            Column5: "",
            Column6: "",
          }
        )
      }
      return styousonGridData;
    },
    onInitializedJigyousyaGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,1,1,10),
        new wjGrid.CellRange(2,1,2,10),
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
        s.fontWeight = "normal";
        s.textAlign = 'center'
        s.color = sysConst.COLOR.fontColor;
        s.backgroundColor = sysConst.COLOR.gridBackground;
        if(c == 0){
          s.backgroundColor = sysConst.COLOR.selectedColor;
        }
        if(r == 1 && c == 1){
          s.textAlign = 'left';
          s.paddingLeft = '4px';
        }
        // セルと大枠の罫線が重複してしまうのでセルの罫線を消す
        if(r == 1){
           s.borderBottom = 'none'
        }
        if((c == 10) || (r > 0 && c == 1)){
           s.borderRight = 'none'
        }
      }
    },
    getJigyousyaGridData:function(){
      let jigyousyaGridData = [];
      if (this.gridReloadFlag != true) {
        jigyousyaGridData.push(
          {
            Column0: "指定事業所番号",
            Column1:  "",
            Column2:  "",
            Column3:  "",
            Column4:  "",
            Column5:  "",
            Column6:  "",
            Column7:  "",
            Column8:  "",
            Column9:  "",
            Column10: ""
          },
          {
            Column0: "事業者名",
            Column1: "",
          }
        )
      } else {
        jigyousyaGridData.push(
          {
            Column0: "指定事業所番号",
            Column1:  "1",
            Column2:  "1",
            Column3:  "0",
            Column4:  "0",
            Column5:  "0",
            Column6:  "1",
            Column7:  "2",
            Column8:  "3",
            Column9:  "4",
            Column10: "0"
          },
          {
            Column0: "事業者名",
            Column1: "障害者支援施設 ひまわり園",
          }
        )
      }
      return jigyousyaGridData;
    },
    onInitializedChiikikubunGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,0,1,1),
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
        s.fontWeight = "normal";
        s.textAlign = 'center'
        s.backgroundColor= sysConst.COLOR.selectedColor;
        if((r == 0 && c == 2) || (r == 1 && c == 2)){
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if(r == 0 && c == 0){
          cell.style.display = 'none'
        }
        if((r == 0 && c == 1)|| (r == 1 && c == 0)){
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.borderLeft = '1px solid rgba(0,0,0,.2)'
        }
        if(r == 0 && c == 1){
          s.borderBottom = 'none'
        }
        if(r == 0 && c == 1){
          s.borderRadius = '4px 0 0 0'
        }
        if(r == 0 && c == 2) {
          s.borderTop = '1px solid rgba(0,0,0,.2)'
        }
        if(r == 1 && c == 0){
          s.borderRadius = '4px 0 0 4px'
        }
        if(r == 0 && c == 2){
          s.borderBottom = 'none'
          s.borderRadius = '0 4px 0 0'
        }
        if(r == 1 && c == 2){
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.borderRadius = '0 0 4px 0'
        }
      }
    },
    getChiikikubunGridData:function(){
      let chiikikubunGridData = [];
      if (this.gridReloadFlag != true) {
        chiikikubunGridData.push(
          {
            Column1: "地域区分",
            Column2: '',
          },
          {
            Column0: "就労継続支援Ａ型事業者負担減免措置実施",
            Column2: "",
          }
        )
      } else {
        let chiikikubun = "１級地";
        chiikikubunGridData.push(
          {
            Column1: "地域区分",
            Column2: chiikikubun,
          },
          {
            Column0: "就労継続支援Ａ型事業者負担減免措置実施",
            Column2: "１：無",
          }
        )
      }
      return chiikikubunGridData;
    },
    // 左メニューで作成されたユーザ一覧の取得
    getUserListData(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    getSelectedRow(row) {
      this.getKyuhujukyuyaGridData();

      // 受給者番号を分割
      let jyukyunoSplit = [];
      jyukyunoSplit = this.userListComponentDatas[row]['jyukyuno'].split('');

      // 受給者番号の表示
      this.kyuhujukyuyaGridData[0]['Column1']  =jyukyunoSplit[0];
      this.kyuhujukyuyaGridData[0]['Column2']  =jyukyunoSplit[1];
      this.kyuhujukyuyaGridData[0]['Column3']  =jyukyunoSplit[2];
      this.kyuhujukyuyaGridData[0]['Column4']  =jyukyunoSplit[3];
      this.kyuhujukyuyaGridData[0]['Column5']  =jyukyunoSplit[4];
      this.kyuhujukyuyaGridData[0]['Column6']  =jyukyunoSplit[5];
      this.kyuhujukyuyaGridData[0]['Column7']  =jyukyunoSplit[6];
      this.kyuhujukyuyaGridData[0]['Column8']  =jyukyunoSplit[7];
      this.kyuhujukyuyaGridData[0]['Column9']  =jyukyunoSplit[8];
      this.kyuhujukyuyaGridData[0]['Column10'] =jyukyunoSplit[9];
      // 支給決定障害者等氏名の表示
      this.kyuhujukyuyaGridData[1]['Column1'] = this.userListComponentDatas[row]['names'];

      // ユーザー選択時、他のグリッドを再読み込み
      this.gridReloadFlag = true;
      this.reloadMeisaiMethod();
      if (this.ServiceMeisaiFlag == true) {
        this.$refs.reloadMeisairan.reloadMeisairanMethod();
      }
      if (this.SeikyugakuSyukeiFlag == true) {
        this.$refs.reloadSeikyugaku.reloadSeikyugakuMethod();
      }
    },
    reloadMeisaiMethod:function() {
      // 市町村番号グリッド
      this.styousonGridData = this.getStyousonGridData();
      // 指定事業所番号グリッド
      this.jigyousyaGridData = this.getJigyousyaGridData();
      // 地域区分グリッド
      this.chiikikubunGridData = this.getChiikikubunGridData();
    },
    /**************
     * 子コンポーネントCommonTabMenuで選択した値を取得
     */
    parent_common_tab_menu: function (args) {
      this.ServiceMeisaiFlag = false;
      this.SeikyugakuSyukeiFlag = false;
      // タブを切り替えた際の表示切替制御
      if (args.selectTab == 'ServiceMeisai') this.ServiceMeisaiFlag = true;
      if (args.selectTab == 'SeikyugakuSyukei')
        this.SeikyugakuSyukeiFlag = true;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#kyuhumeisai {
  font-family: 'メイリオ';
  min-width: 1266px !important;
  font-size: 14px;
    .wj-cell  {
      color: #333;
    }
  .container {
    padding: 4px;
  }

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  .rightArea {
    min-width: 50%;
    max-width: none;
    width: 1020px;
    margin-left:4px;
    font-size: 12px;
    .wj-cell  {
      padding: 0;
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
  }
  .confirmTitle {
    font-size: $cell_fontsize;
    background-color: #ce3e47;
    color: $white;
    animation-name: fadeInAnime;
    text-align: center;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
  }
  &.wj-content {
    border: none;
  }
}
#chiikikubunGrid{
  &.wj-content {
    border: none;
  }
}
</style>
