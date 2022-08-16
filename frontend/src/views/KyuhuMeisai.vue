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
                  v-if="reload[0].jyukyusya"
                >
                </kyuhu-meisai-jyukyusya>
              </v-row>
              <v-row no-gutters>
                <kyuhu-meisai-jigyosyo
                  ref="jigyosyoData"
                  v-if="reload[0].Jigyosyo"
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
                v-if="reload[0].shityoson"
                >
                </kyuhu-meisai-shityoson>
              </v-row>
              <v-row no-gutters class="no-flex-grow justify-end">
                <kyuhu-meisai-kubun
                ref="kubunData"
                v-if="reload[0].kubun"
                >
                </kyuhu-meisai-kubun>
              </v-row>
            </v-col>
          </v-row>
          <common-tab-menu
            v-if="displayFlagSetting[0].seikyugakuTabFlag"
            @parent_common_tab_menu="parent_common_tab_menu"
            :tabmenu="tabmenus"
          ></common-tab-menu>
          <v-row no-gutters v-if="serviceMeisaiFlag">
            <v-col>
              <kyuhu-meisai-riyouhutan
              ref="riyousyaHutanData"
              class="mt-1"
              v-if="displayFlagSetting[0].riyousyaHutanGridFlag"
              >
              </kyuhu-meisai-riyouhutan>
              <kyuhu-meisai-service
              ref="serviceData"
              class="mt-1"
              v-if="displayFlagSetting[0].serviceGridFlag"
              >
              </kyuhu-meisai-service>
              <kyuhu-meisai-list
              ref="meisaiListData"
              class="mt-1"
              >
              </kyuhu-meisai-list>
              <!-- <kyuhu-meisairan ref="reloadMeisairan"></kyuhu-meisairan> -->
            </v-col>
          </v-row>
          <v-row no-gutters v-if="seikyugakuSyukeiFlag">
            <v-col>
              <!-- <kyuhu-seikyugaku ref="reloadSeikyugaku"></kyuhu-seikyugaku> -->
              <kyuhu-meisai-seikyugaku
              class="mt-1"
              ref="seikyugakuData"
              >
              </kyuhu-meisai-seikyugaku>
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
import KyuhuMeisaiList from '../components/KyuhuMeisaiList.vue';
// import KyuhuSeikyugaku from '../components/KyuhuSeikyugaku.vue';
import KyuhuMeisaiSeikyugaku from '../components/KyuhuMeisaiSeikyugaku.vue';
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
    KyuhuMeisaiList,
    KyuhuMeisaiSeikyugaku,
    // KyuhuSeikyugaku,
  },
  data() {
    return {
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      serviceArgument: '', // ヘッダメニューのサービス選択
      selectedJigyosyo: [{ serviceJigyo: '', jimusyoBango: '', teikyoCode: '' }], // 選択された事業所
      dateArgument: '',
      searchArgument: '',
      // タブの制御Flag
      serviceMeisaiFlag: true, // serviceMeisaiFlagの初期表示状態
      seikyugakuSyukeiFlag: false, // seikyugakuSyukeiFlagの初期表示状態
      tabmenus: [
        { href: '#ServiceMeisai', text: 'サービス明細欄' },
        { href: '#SeikyugakuSyukei', text: '請求額集計欄' },
      ],
      // リロードのための変数
      reload:[
        {
          jyukyusya: true,
          Jigyosyo:  true,
          shityoson: true,
          kubun:     true,
        }
      ],
      // 表示条件Flag
      displayFlagSetting:[
        {
          // Gridの表示Flag
          riyousyaHutanGridFlag:true,     // 利用者負担Grid表示Flag
          serviceGridFlag:true,           // サービス種別Grid表示Flag
          seikyugakuTabFlag:true,         // タブ表示フラグ
          tokuteiSyogaiGrid:true,         // 特定障害者Grid表示Flag
          // 受給者Grid
          ketteiName:'支給決定障害者等氏名',
          syougaijiFlag: false,           // 支給決定障害者等氏名表示Flag
          syougaijiName:'',               // 支給決定障害者等氏名
          // 事業所Grid
          jigyosyoBango:'指定事業所番号',  // 事業所番号
          // 市町村Grid
          shityosonBango: '市町村番号',    // 市町村番号 or 都道府県等番号
          jyoseijichitaiFlag:false,       // 助成自治体番号表示Flag
          // 区分Grid
          genmensotiFlag:false,           // 就労継続支援A型事業者負担減免措置実施表示Flag
          // 利用者負担Grid
          genmenTaisyosyaFlag:false,      // 就労継続支援A型減免対象者 or 障害支援区分表示Flag
          genmenTaisyosya: '',             // 就労継続支援A型減免対象者 or 障害支援区分
          // 給付費明細リストGrid
          // meisaiListLargeFlag:false    // 給付費明細リストの表示数増加Flag
          // 給付費明細請求額Grid
          seikyugakuType:0,           // 請求額Gridの表示タイプ
        }
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

      // APIからデータを取得
      this.getApiData();

    },
    /**************
     * APIからデータを取得して子各コンポーネントに渡す
     */
    getApiData() {
      // 区分Grid (仮データ)
      let kubun = {tiikikubun:'1 級地',kinroukeizokushien:'1 :無'};
      this.$refs.kubunData.setKubunData(kubun);

      if (this.serviceMeisaiFlag == true) {
        // サービス明細欄タブアクティブの場合
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
        if (this.displayFlagSetting[0].riyousyaHutanGridFlag) {
          this.$refs.riyousyaHutanData.setRiyousyaHutanData(riyousyaHutan);
        }
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
        
        if (this.displayFlagSetting[0].serviceGridFlag) {
          this.$refs.serviceData.setServiceData(serviceData);
        }
        // 明細リストGrid
        this.$refs.meisaiListData.getMeisaiListData();
      }
      if (this.seikyugakuSyukeiFlag == true) {
        let seikyugakuApiData = [
          {
            teikyoService:  '施設入所支援',
            servicecode: '32',
            serviceriyounissu: 20,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku:9300,
            jigyousyagenmengaku: '345',
            genmenriyousyahutan: '567',
            tyouseigohutan: 9300,
            jyougenriyousyahutangaku: '456',
            ketteiriyousyahutangaku: 9300,
            kyuhuhi: 119295,
            tokubetutaisakuhi: '456',
            jititaijyoseibun: '2333',
          },
          {
            teikyoService:  '生活介護',
            servicecode: '22',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku:9300,
            jigyousyagenmengaku: '',
            genmenriyousyahutan: '',
            tyouseigohutan: 9300,
            jyougenriyousyahutangaku: '',
            ketteiriyousyahutangaku: 9300,
            kyuhuhi: 119295,
            tokubetutaisakuhi: '',
            jititaijyoseibun: '',
          },
          {
            teikyoService:  '就労移行支援',
            servicecode: '44',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku:9300,
            jigyousyagenmengaku: '',
            genmenriyousyahutan: '',
            tyouseigohutan: 9300,
            jyougenriyousyahutangaku: '',
            ketteiriyousyahutangaku: 9300,
            kyuhuhi: 119295,
            tokubetutaisakuhi: '',
            jititaijyoseibun: '',
          },
          {
            teikyoService:  '療養介護',
            servicecode: '21',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku:9300,
            jigyousyagenmengaku: '',
            genmenriyousyahutan: '',
            tyouseigohutan: 9300,
            jyougenriyousyahutangaku: '',
            ketteiriyousyahutangaku: 9300,
            kyuhuhi: 119295,
            tokubetutaisakuhi: '',
            jititaijyoseibun: '',
          },
          // {
          //   teikyoService:  '短期入所',
          //   servicecode: '24',
          //   serviceriyounissu: 31,
          //   kyuhutanisu: 11360,
          //   tanisutanka: 11.32,
          //   souhiyougaku: 128595,
          //   itiwarisoutougaku: 12859,
          //   riyousyahutan2: 12859,
          //   jyougengetugaku:9300,
          //   jigyousyagenmengaku: '',
          //   genmenriyousyahutan: '',
          //   tyouseigohutan: 9300,
          //   jyougenriyousyahutangaku: '',
          //   ketteiriyousyahutangaku: 9300,
          //   kyuhuhi: 119295,
          //   tokubetutaisakuhi: '',
          //   jititaijyoseibun: '',
          // },
          // {
          //   teikyoService:  '生活介護',
          //   servicecode: '22',
          //   serviceriyounissu: 31,
          //   kyuhutanisu: 11360,
          //   tanisutanka: 11.32,
          //   souhiyougaku: 128595,
          //   itiwarisoutougaku: 12859,
          //   riyousyahutan2: 12859,
          //   jyougengetugaku:9300,
          //   jigyousyagenmengaku: '',
          //   genmenriyousyahutan: '',
          //   tyouseigohutan: 9300,
          //   jyougenriyousyahutangaku: '',
          //   ketteiriyousyahutangaku: 9300,
          //   kyuhuhi: 119295,
          //   tokubetutaisakuhi: '',
          //   jititaijyoseibun: '',
          // },
          // {
          //   teikyoService:  '生活介護',
          //   servicecode: '22',
          //   serviceriyounissu: 31,
          //   kyuhutanisu: 11360,
          //   tanisutanka: 11.32,
          //   souhiyougaku: 128595,
          //   itiwarisoutougaku: 12859,
          //   riyousyahutan2: 12859,
          //   jyougengetugaku:9300,
          //   jigyousyagenmengaku: '',
          //   genmenriyousyahutan: '',
          //   tyouseigohutan: 9300,
          //   jyougenriyousyahutangaku: '',
          //   ketteiriyousyahutangaku: 9300,
          //   kyuhuhi: 119295,
          //   tokubetutaisakuhi: '',
          //   jititaijyoseibun: '',
          // },
        ];
        // 請求額集計欄リストGrid
        this.$refs.seikyugakuData.getSeikyugakuData(seikyugakuApiData);
      }
    },
    /***************
     * ヘッダメニューのサービスを選択時
     */
    parentServiceSelect(serviceArgument) {
      console.log(serviceArgument['jimusyoBango']);
      console.log(this.selectedJigyosyo['jimusyoBango'])
      // ヘッダメニューの選択情報を取得
      // 初回か更新かを確認
      if((!this.selectedJigyosyo['jimusyoBango']) ||
        this.selectedJigyosyo['jimusyoBango'] === serviceArgument['jimusyoBango']) {
        // 初回選択または選択項目の変更がない場合
        this.selectedJigyosyo['serviceJigyo'] = serviceArgument['serviceJigyo'];
        this.selectedJigyosyo['jimusyoBango'] = serviceArgument['jimusyoBango'];
        this.selectedJigyosyo['teikyoCode'] = serviceArgument['teikyoCode'];
        console.log(1)
        this.displayChange();
      } else {
        console.log(2)
        this.selectedJigyosyo['serviceJigyo'] = serviceArgument['serviceJigyo'];
        this.selectedJigyosyo['jimusyoBango'] = serviceArgument['jimusyoBango'];
        this.selectedJigyosyo['teikyoCode'] = serviceArgument['teikyoCode'];
        this.displayChange();
        // 選択項目が変更されて更新した場合は各グリッドのリロードを行う
        let re = this.reload[0];
        re.jyukyusya = false;
        this.$nextTick(() => (re.jyukyusya = true));
        re.Jigyosyo = false;
        this.$nextTick(() => (re.Jigyosyo = true));
        re.shityoson = false;
        this.$nextTick(() => (re.shityoson = true));
        re.kubun = false;
        this.$nextTick(() => (re.kubun = true));
      }
    },
    
    /***************
     * 表示項目条件の変更
     */
    displayChange() {
      // タブをサービス明細欄に切り替え
      this.serviceMeisaiFlag =  true;
      this.seikyugakuSyukeiFlag = false;
      // 各項目の表示切り替え
      let dfs = this.displayFlagSetting[0];
      if (this.selectedJigyosyo['teikyoCode'] === 52) {
        // パターンC
        dfs.riyousyaHutanGridFlag = false;
        dfs.serviceGridFlag = false;
        dfs.seikyugakuTabFlag = false;
        dfs.syougaijiFlag = false;
        dfs.jyoseijichitaiFlag = false;
        dfs.genmensotiFlag = false;
      } else if (this.selectedJigyosyo['teikyoCode'] === 51) {
        // パターンC-2 ※※※ 条件は暫定 ※※※
        dfs.riyousyaHutanGridFlag = false;
        dfs.serviceGridFlag = false;
        dfs.seikyugakuTabFlag = false;
        dfs.syougaijiFlag = false;
        dfs.jigyosyoBango = '登録事業所番号';
        dfs.jyoseijichitaiFlag = false;
        dfs.genmensotiFlag = false;

      }  else if (this.selectedJigyosyo['teikyoCode'] === 53 ||
                  this.selectedJigyosyo['teikyoCode'] === 54) 
      {
        // パターンD
        dfs.riyousyaHutanGridFlag = false;
        dfs.syougaijiFlag = true;
        dfs.serviceGridFlag = true;
        dfs.seikyugakuTabFlag = true;
        dfs.syougaijiFlag = false;
        dfs.jyoseijichitaiFlag = false;
        dfs.genmensotiFlag = false;
        dfs.seikyugakuType = 4;
      } else {
        // 全表示 ※ （仮）
        dfs.riyousyaHutanGridFlag = true;
        dfs.serviceGridFlag = true;
        dfs.seikyugakuTabFlag = true;
        dfs.tokuteiSyogaiGrid = true;

        dfs.ketteiName = '支給決定障害者等氏名';
        dfs.syougaijiFlag = true;
        dfs.syougaijiName = '支給決定に係る障害児氏名';
        dfs.jigyosyoBango = '指定事業所番号';
        dfs.shityosonBango = '市町村番号';
        dfs.jyoseijichitaiFlag = true;
        dfs.genmensotiFlag = true;
        dfs.seikyugakuType = 0;

      }
    },
    /**************
     * 子コンポーネントCommonTabMenuで選択した値を取得
     */
    parent_common_tab_menu: function (args) {
      this.serviceMeisaiFlag = false;
      this.seikyugakuSyukeiFlag = false;
      // タブを切り替えた際の表示切替制御
      if (args.selectTab == 'ServiceMeisai') this.serviceMeisaiFlag = true;
      if (args.selectTab == 'SeikyugakuSyukei')
        this.seikyugakuSyukeiFlag = true;
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
