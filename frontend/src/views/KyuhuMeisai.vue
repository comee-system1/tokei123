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
          <v-row no-gutters class="mb-1">
            <v-col>
              <v-row no-gutters class="mb-1">
                <kyuhu-meisai-jyukyusya
                  ref="jyukyusyaData"
                >
                </kyuhu-meisai-jyukyusya>
              </v-row>
              <v-row no-gutters>
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
              <v-row no-gutters class="no-flex-grow justify-end">
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
          <v-row no-gutters v-if="ServiceMeisaiFlag">
            <v-col>
              <kyuhu-meisai-riyouhutan
              ref="riyousyaHutanData"
              class="mt-1"
              >
              </kyuhu-meisai-riyouhutan>
              <kyuhu-meisai-service
              ref="serviceData"
              class="mt-1"
              >
              </kyuhu-meisai-service>
              <kyuhu-meisairan ref="reloadMeisairan"></kyuhu-meisairan>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="SeikyugakuSyukeiFlag">
            <v-col>
              <kyuhu-seikyugaku ref="reloadSeikyugaku"></kyuhu-seikyugaku>
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
// import * as wjGrid from '@grapecity/wijmo.grid';
import CommonTabMenu from '../components/CommonTabMenu.vue';
import KyuhuMeisaiJyukyusya from '../components/KyuhuMeisaiJyukyusya.vue';
import KyuhuMeisaiShityoson from '../components/KyuhuMeisaiShityoson.vue';
import KyuhuMeisaiJigyosyo from '../components/KyuhuMeisaiJigyosyo.vue';
import KyuhuMeisaiKubun from '../components/KyuhuMeisaiKubun.vue';
import KyuhuMeisaiRiyouhutan from '../components/KyuhuMeisaiRiyouhutan.vue';
import KyuhuMeisaiService from '../components/KyuhuMeisaiService.vue';
import KyuhuMeisairan from '../components/KyuhuMeisairan.vue';
import KyuhuSeikyugaku from '../components/KyuhuSeikyugaku.vue';
// import sysConst from '@/utiles/const';

export default {
  components: {
    HeaderServices,
    CommonTabMenu,
    UserList,
    KyuhuMeisaiJyukyusya,
    KyuhuMeisaiShityoson,
    KyuhuMeisaiJigyosyo,
    KyuhuMeisaiKubun,
    KyuhuMeisaiRiyouhutan,
    KyuhuMeisaiService,
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
    // 左メニューで作成されたユーザ一覧の取得
    getUserListData(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    getSelectedRow(row) {
      // 各子コンポーネントに選択したユーザーデータを送る
      // （選択したユーザーデータから取得、ヘッダーから取得、別途APIで取得）
      // 受給者Grid
      this.$refs.jyukyusyaData.setJyukyusyaData(this.userListComponentDatas[row]);

      // 市町村Grid
      this.$refs.shityosonData.setShityosonData(this.userListComponentDatas[row]);

      // 事業所Grid (ヘッダー選択情報から取得)
      this.$refs.jigyosyoData.setJigyosyoData(this.selectedJigyosyo);

      this.getApiData();

      // ユーザー選択時、他のグリッドを再読み込み
      this.gridReloadFlag = true;
      if (this.ServiceMeisaiFlag == true) {
        this.$refs.reloadMeisairan.reloadMeisairanMethod();
      }
      if (this.SeikyugakuSyukeiFlag == true) {
        this.$refs.reloadSeikyugaku.reloadSeikyugakuMethod();
      }
    },
    /**************
     * APIからデータを取得して子各コンポーネントに渡す
     */
    getApiData() {
      // 区分Grid (仮データ)
      let kubun = {tiikikubun:'1 級地',kinroukeizokushien:'1 :無'};
      this.$refs.kubunData.setKubunData(kubun);

      // 利用者負担Grid (仮データ)
      let riyousyaHutan =
      {
        jyogengaku1:        '9300',           // 利用者負担上限月額①
        kinroukeizokushien: '1 :無',          // 就労継続支援Ａ型事業者負担減免対象者
        syogaishien:        '1 :無',          // 障害支援区分
        jigyosyobango:      '1234567890',     // 指定事業所番号
        kanrikekka:         '',               // 管理結果
        kanrikekkagaku:     '',               // 管理結果額
        jigyosyoname:       '',               // 事業所名
      };
      this.$refs.riyousyaHutanData.setRiyousyaHutanData(riyousyaHutan);

      // サービス種別 (仮データ)
      let serviceData = [];
      serviceData.push(
        {
          uid: 1,
          serviceNo:         "22",
          sYmd:              "2022/04/01",
          eYmd:              "2022/08/01",
          riyouNissuu:       "31",
          nyuinNissuu:       "",
        },
        {
          uid: 2,
          serviceNo:        "32",
          sYmd:             "2022/04/01",
          eYmd:             "2022/08/01",
          riyouNissuu:      "31",
          nyuinNissuu:      "",
        },
        {
          uid: 3,
          serviceNo:        "32",
          sYmd:             "2022/04/01",
          eYmd:             "2022/08/03",
          riyouNissuu:      "31",
          nyuinNissuu:      "",
        },
        {
          uid: 4,
          serviceNo:        "32",
          sYmd:             "2022/04/01",
          eYmd:             "2022/08/03",
          riyouNissuu:      "31",
          nyuinNissuu:      "",
        }
      )
      this.$refs.serviceData.setServiceData(serviceData);
    },
    /***************
     * ヘッダメニューのサービスを選択時
     */
    parentServiceSelect(serviceArgument) {
      // ヘッダメニューの選択情報を取得
      this.selectedJigyosyo['serviceJigyo'] = serviceArgument['serviceJigyo'];
      this.selectedJigyosyo['jimusyoBango'] = serviceArgument['jimusyoBango'];
      this.selectedJigyosyo['teikyoCode'] = serviceArgument['teikyoCode'];
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
