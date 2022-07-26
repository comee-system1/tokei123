<template>
  <div id="kyuhumeisai">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
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
            @child-selectedrow="getSelectedRow"
          >
          </UserList>
        </v-col>
        <v-col class="rightArea kyuhumeisai">
          <v-row no-gutters>
            <v-col>
              <v-row no-gutters class="mb-1">
                <kyuhu-meisai-jyukyusya
                  ref="jyukyusyaData"
                >
                </kyuhu-meisai-jyukyusya>
              </v-row>
              <v-row no-gutters class="mb-1">
                <kyuhu-meisai-jigyosyo
                  ref="jigyosyoData"
                >
                </kyuhu-meisai-jigyosyo>
              </v-row>
            </v-col>
            <v-col class="no-flex-grow">
              <v-row no-gutters class="mb-1 no-flex-grow justify-end">
                <div class="confirmTitle mb-1 white--text">
                  確定済:2021.08.08 14:19 (担当者:大正 雅夫)
                </div>
                  <kyuhu-meisai-shityoson
                  ref="shityosonData"
                  >
                  </kyuhu-meisai-shityoson>
              </v-row>
              <v-row no-gutters class="mb-1 no-flex-grow justify-end">
                <kyuhu-meisai-kubun
                ref="kubunData"
                >
                </kyuhu-meisai-kubun>
              </v-row>
            </v-col>
          </v-row>
          <common-tab-menu
            @parent_common_tab_menu="parent_common_tab_menu"
            :tabmenu="tabmenus"
          ></common-tab-menu>
          <v-row no-gutters>
            <v-col>
              <div v-if="ServiceMeisaiFlag">
                <kyuhu-meisairan ref="reloadMeisairan"></kyuhu-meisairan>
              </div>
              <div v-if="SeikyugakuSyukeiFlag">
                <kyuhu-seikyugaku ref="reloadSeikyugaku"></kyuhu-seikyugaku>
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
import KyuhuMeisaiJyukyusya from '../components/KyuhuMeisaiJyukyusya.vue';
import KyuhuMeisaiShityoson from '../components/KyuhuMeisaiShityoson.vue';
import KyuhuMeisaiJigyosyo from '../components/KyuhuMeisaiJigyosyo.vue';
import KyuhuMeisaiKubun from '../components/KyuhuMeisaiKubun.vue';
import KyuhuMeisairan from '../components/KyuhuMeisairan.vue';
import KyuhuSeikyugaku from '../components/KyuhuSeikyugaku.vue';
import sysConst from '@/utiles/const';

export default {
  components: {
    HeaderServices,
    CommonTabMenu,
    UserList,
    KyuhuMeisaiJyukyusya,
    KyuhuMeisaiShityoson,
    KyuhuMeisaiJigyosyo,
    KyuhuMeisaiKubun,
    KyuhuMeisairan,
    KyuhuSeikyugaku,
  },
  data() {
    return {
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      serviceArgument: '', // ヘッダメニューのサービス選択
      selectedJigyosyo: [{ serviceJigyo: '', jimusyoBango: '', teikyoCode: '' }], // 選択された事業所
      gridReloadFlag: false,
      dateArgument: '',
      searchArgument: '',
      chiikikubunGridData: this.getChiikikubunGridData(),
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
    onInitializedChiikikubunGrid: function (flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [new wjGrid.CellRange(1, 0, 1, 1)];
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

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.backgroundColor = sysConst.COLOR.selectedColor;
        if ((r == 0 && c == 2) || (r == 1 && c == 2)) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (r == 0 && c == 0) {
          cell.style.display = 'none';
        }
        if ((r == 0 && c == 1) || (r == 1 && c == 0)) {
          s.borderTop = '1px solid rgba(0,0,0,.2)';
          s.borderLeft = '1px solid rgba(0,0,0,.2)';
        }
        if (r == 0 && c == 1) {
          s.borderBottom = 'none';
        }
        if (r == 0 && c == 1) {
          s.borderRadius = '4px 0 0 0';
        }
        if (r == 0 && c == 2) {
          s.borderTop = '1px solid rgba(0,0,0,.2)';
        }
        if (r == 1 && c == 0) {
          s.borderRadius = '4px 0 0 4px';
        }
        if (r == 0 && c == 2) {
          s.borderBottom = 'none';
          s.borderRadius = '0 4px 0 0';
        }
        if (r == 1 && c == 2) {
          s.borderTop = '1px solid rgba(0,0,0,.2)';
          s.borderRadius = '0 0 4px 0';
        }
      };
    },
    getChiikikubunGridData: function () {
      let chiikikubunGridData = [];
      if (this.gridReloadFlag != true) {
        chiikikubunGridData.push(
          {
            Column1: '地域区分',
            Column2: '',
          },
          {
            Column0: '就労継続支援Ａ型事業者負担減免措置実施',
            Column2: '',
          }
        );
      } else {
        let chiikikubun = '１級地';
        chiikikubunGridData.push(
          {
            Column1: '地域区分',
            Column2: chiikikubun,
          },
          {
            Column0: '就労継続支援Ａ型事業者負担減免措置実施',
            Column2: '１：無',
          }
        );
      }
      return chiikikubunGridData;
    },
    // 左メニューで作成されたユーザ一覧の取得
    getUserListData(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    getSelectedRow(row) {
      // 各子コンポーネントに選択したユーザーデータを送る
      // 受給者Grid
      this.$refs.jyukyusyaData.setJyukyusyaData(this.userListComponentDatas[row]);
      // 市町村Grid
      this.$refs.shityosonData.setShityosonData(this.userListComponentDatas[row]);
      // 事業所Grid (ヘッダー選択情報から取得)
      this.$refs.jigyosyoData.setJigyosyoData(this.selectedJigyosyo);
      // 区分Grid (仮データ)
      let kubun = {tiikikubun:'1 級地',kinroukeizokushien:'1 :無'};
      this.$refs.kubunData.setKubunData(kubun);
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
    /***************
     * ヘッダメニューのサービスを選択時
     */
    parentServiceSelect(serviceArgument) {
      console.log(serviceArgument)
      // ヘッダメニューの選択情報を取得
      this.selectedJigyosyo['serviceJigyo'] = serviceArgument['serviceJigyo'];
      this.selectedJigyosyo['jimusyoBango'] = serviceArgument['jimusyoBango'];
      this.selectedJigyosyo['teikyoCode'] = serviceArgument['teikyoCode'];
    },
    reloadMeisaiMethod: function () {
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
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#kyuhumeisai {
  font-family: 'メイリオ';
  min-width: 1266px !important;
  font-size: 14px;
  .wj-cell {
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
    margin-left: 4px;
    font-size: 12px;
    .no-flex-grow {
      // フレックス伸長係数を0に設定
      flex-grow: 0;
    }
    .wj-cell {
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
    width: 360px;
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
#chiikikubunGrid {
  &.wj-content {
    border: none;
  }
}
</style>
