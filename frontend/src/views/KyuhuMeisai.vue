<template>
  <div id="kyuhumeisai">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
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
                <kyuhu-meisai-jyukyusya v-if="reload[0].jyukyusya">
                </kyuhu-meisai-jyukyusya>
              </v-row>
              <v-row no-gutters>
                <kyuhu-meisai-jigyosyo v-if="reload[0].Jigyosyo">
                </kyuhu-meisai-jigyosyo>
              </v-row>
            </v-col>
            <v-col class="no-flex-grow">
              <v-row no-gutters class="mb-1 no-flex-grow justify-end">
                <div class="confirmTitle mb-1 white--text">
                  確定済:2021.08.08 14:19 (担当者:大正 雅夫)
                </div>
                <kyuhu-meisai-shityoson v-if="reload[0].shityoson">
                </kyuhu-meisai-shityoson>
              </v-row>
              <v-row no-gutters class="no-flex-grow justify-end">
                <kyuhu-meisai-kubun v-if="reload[0].kubun">
                </kyuhu-meisai-kubun>
              </v-row>
            </v-col>
          </v-row>
          <common-tab-menu
            v-if="displaySetting[0].seikyugakuTabFlag"
            @parent_common_tab_menu="parent_common_tab_menu"
            :tabmenu="tabmenus"
          ></common-tab-menu>
          <v-row no-gutters v-if="serviceMeisaiFlag">
            <v-col>
              <kyuhu-meisai-riyouhutan
                ref="riyousyaHutanData"
                class="mt-1"
                v-if="displaySetting[0].riyousyaHutanGridFlag"
              >
              </kyuhu-meisai-riyouhutan>
              <kyuhu-meisai-service
                ref="serviceData"
                class="mt-1"
                v-if="displaySetting[0].serviceGridFlag"
              >
              </kyuhu-meisai-service>
              <kyuhu-meisai-list
                ref="meisaiListData"
                class="mt-1"
                v-if="reload[0].meisaiList"
              >
              </kyuhu-meisai-list>
              <!-- <kyuhu-meisairan ref="reloadMeisairan"></kyuhu-meisairan> -->
            </v-col>
          </v-row>
          <v-row no-gutters v-if="seikyugakuSyukeiFlag">
            <v-col>
              <kyuhu-meisai-Nittyu
                class="mt-1"
                ref="NittyuData"
                v-if="displaySetting[0].nittyuGridFlag"
              >
              </kyuhu-meisai-Nittyu>
              <!-- <kyuhu-seikyugaku ref="reloadSeikyugaku"></kyuhu-seikyugaku> -->
              <kyuhu-meisai-seikyugaku class="mt-1" ref="seikyugakuData">
              </kyuhu-meisai-seikyugaku>
              <kyuhu-meisai-tokuteiSyogai
                class="mt-1"
                ref="tokuteiSyogaiData"
                v-if="displaySetting[0].tokuteiSyogaiGridFlag"
              >
              </kyuhu-meisai-tokuteiSyogai>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeaderServices from '../components/HeaderServices.vue';
import ls from '@/utiles/localStorage';
import UserList from '../components/UserList';
import CommonTabMenu from '../components/CommonTabMenu.vue';
import KyuhuMeisaiJyukyusya from '../components/KyuhuMeisaiJyukyusya.vue';
import KyuhuMeisaiShityoson from '../components/KyuhuMeisaiShityoson.vue';
import KyuhuMeisaiJigyosyo from '../components/KyuhuMeisaiJigyosyo.vue';
import KyuhuMeisaiKubun from '../components/KyuhuMeisaiKubun.vue';
import KyuhuMeisaiRiyouhutan from '../components/KyuhuMeisaiRiyouhutan.vue';
import KyuhuMeisaiService from '../components/KyuhuMeisaiService.vue';
import KyuhuMeisaiList from '../components/KyuhuMeisaiList.vue';
import KyuhuMeisaiNittyu from '../components/KyuhuMeisaiNittyu.vue';
import KyuhuMeisaiSeikyugaku from '../components/KyuhuMeisaiSeikyugaku.vue';
import KyuhuMeisaiTokuteiSyogai from '../components/KyuhuMeisaiTokuteiSyogai.vue';
import DispPtn from '../data/kyuhuMeisaiDisplayPattern.js';
import kmdApi from '../data/kyuhuMeisaiData.js';

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
    KyuhuMeisaiTokuteiSyogai,
    KyuhuMeisaiNittyu,
  },
  data() {
    return {
      kyuhumeisaiData: {
        jyukyusya: {
          jyukyuno: '',
          jyukyusyaName: '',
          syogaijiName: '',
        },
        jigyosyo: {
          jimusyoBango: '',
          serviceJigyo: '',
        },
      },
      kyuhumeisaiApiData: [],
      serviceData: [],
      meisaiListData: [],
      dataSetFlag: false,
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      serviceArgument: '', // ヘッダメニューのサービス選択
      selectedJigyosyo: { serviceJigyo: '', jimusyoBango: '', teikyoCode: '' }, // 選択された事業所
      dateArgument: '',
      searchArgument: '',
      // タブの制御Flag
      serviceMeisaiFlag: true, // serviceMeisaiFlagの初期表示状態
      seikyugakuSyukeiFlag: false, // seikyugakuSyukeiFlagの初期表示状態
      tabmenus: [
        { href: '#ServiceMeisai', text: 'サービス明細欄' },
        { href: '#SeikyugakuSyukei', text: '請求額集計欄' },
      ],
      // リロード用
      reload: [
        {
          jyukyusya: true,
          Jigyosyo: true,
          shityoson: true,
          kubun: true,
          meisaiList: true,
          seikyugaku: true,
        },
      ],
      // 表示設定用
      displaySetting: [
        {
          // Gridの表示Flag ※リロードでも使用
          riyousyaHutanGridFlag: true, // 利用者負担Grid表示Flag
          serviceGridFlag: true, // サービス種別Grid表示Flag
          seikyugakuTabFlag: true, // タブ表示フラグ
          nittyuGridFlag: true, // 日中Grid表示Flag
          tokuteiSyogaiGridFlag: true, // 特定障害者Grid表示Flag
        },
        {
          // Grid内の表示Flag
          // 受給者Grid
          ketteiName: '支給決定障害者等氏名', // 支給決定障害者等氏名 or 給付決定保護者氏名 or 通所給付決定保護者氏名
          syougaijiFlag: false, // 支給決定に係る障害児氏名表示Flag
          shogaijiName: '支給決定に係る障害児氏名', // 支給決定に係る障害児氏名
          // 事業所Grid
          tourokuJigyosyoFlag: false, // 指定事業所番号 or 登録事業所番号
          // 市町村Grid
          todofukenFlag: false, // 市町村番号 or 都道府県等番号
          jyoseijichitaiFlag: false, // 助成自治体番号表示Flag
          // 区分Grid
          genmensotiFlag: false, // 就労継続支援A型事業者負担減免措置実施表示Flag
          // 利用者負担Grid
          genmenTaisyosyaFlag: false, // 就労継続支援A型減免対象者Flag
          syogaiShienFlag: false, // 障害支援区分Flag
          // 給付費明細請求額Grid
          seikyugakuType: 0, // 請求額Gridの表示タイプ
          // 特定障害Grid
          tokuteiNissuFlag: false, // 算定日数、日数の表示Flag
        },
      ],
    };
  },
  created: function () {
    let storage = {};
    storage = {
      jimusyoBango: ls.getlocalStorageEncript('jimusyoBango'),
      serviceJigyo: ls.getlocalStorageEncript('serviceJigyo'),
      selectJigyoCode: ls.getlocalStorageEncript('selectJigyoCode'),
    };
    //strageにデータが登録してある時
    if (storage.selectJigyoCode) {
      // ヘッダーで選択された事業所情報を取得
      this.selectedJigyosyo.serviceJigyo = storage.serviceJigyo;
      this.selectedJigyosyo.jimusyoBango = storage.jimusyoBango;
      this.selectedJigyosyo.teikyoCode = Number(storage.selectJigyoCode);
      // Gridの表示変更
      this.displayChange();
    }
  },
  methods: {
    // 左メニューで作成されたユーザ一覧の取得
    getUserListData(data) {
      this.userListComponentDatas = data;
    },
    getSelectedRow(row) {
      // ユーザーを選択時データをセットするFlagを切り替える
      this.dataSetFlag = true;
      // Apiデータを取得
      this.getApiData2(row);
      this.childGridReload();

      //////////////////////////////////////////////
      // 各子コンポーネントに選択したユーザーデータを送る
      // （選択したユーザーデータから取得、ヘッダーから取得、別途APIで取得）
      //////////////////////////////////////////////

      // APIからデータを取得
      this.getApiData();
    },
    /**************
     * APIからデータを取得して共通変数に登録
     */
    getApiData2(row) {
      // Apiから取得したデータを共通変数に入れる
      this.kyuhumeisaiApiData = kmdApi.kyufuhimeisai;

      // 共通変数に値を入れる ※※※ 後ほどAPIデータに合わせて修正 ※※※
      let kmd = this.kyuhumeisaiData;
      // 受給者Grid ※※※ ユーザーリストから取得 ※※※
      kmd.jyukyusya.jyukyuno = this.userListComponentDatas[row].jyukyuno;
      kmd.jyukyusya.jyukyusyaName = this.userListComponentDatas[row].names;
      kmd.jyukyusya.syogaijiName = this.userListComponentDatas[row].kzkname;

      // 事業所Grid ※※※ ヘッダーから取得 ※※※
      kmd.jigyosyo.jimusyoBango = this.selectedJigyosyo.jimusyoBango;
      kmd.jigyosyo.serviceJigyo = this.selectedJigyosyo.serviceJigyo;

      // データ配列で受け取るデータは配列を作成
      // サービスGrid
      let kmadms1 = this.kyuhumeisaiApiData.kyufuhi_ms1;
      // 取得したサービス種別APIデータを共通配列に入れる
      this.serviceData = [];
      for (let i = 0; i < kmadms1.length; i++) {
        this.serviceData.push({
          serviceNo: kmadms1[i].ms1_svcsyucode,
          sYmdTtl: '開始年月日',
          sYmd: kmadms1[i].ms1_symd,
          eYmdTtl: '終了年月日',
          eYmd: kmadms1[i].ms1_eymd,
          riyouNissuuTtl: '利用日数',
          riyouNissuu: kmadms1[i].ms1_nissu,
          nyuinNissuuTtl: '入院日数',
          nyuinNissuu: kmadms1[i].ms1_nyuin,
        });
      }
      // 給付明細ListGrid
      let kmadms2 = this.kyuhumeisaiApiData.kyufuhi_ms2;
      this.meisaiListData = [];
      // 取得したサービス種別APIデータを共通配列に入れる
      for (let i = 0; i < kmadms2.length; i++) {
        let splitCode = kmadms2[i].ms2_svcsyucode.split('');
        this.meisaiListData.push({
          service: kmadms2[i].ms2_svcname,
          servicecode1: splitCode[0],
          servicecode2: splitCode[1],
          servicecode3: splitCode[2],
          servicecode4: splitCode[3],
          servicecode5: splitCode[4],
          servicecode6: splitCode[5],
          tanisuu: kmadms2[i].ms2_tanio,
          kaisuu: kmadms2[i].ms2_kaisu,
          servicetanisuu: kmadms2[i].ms2_tani_santei,
          tekiyou: kmadms2[i].ms2_tekiyo,
        });
      }
    },
    /**************
     * APIからデータを取得して子各コンポーネントに渡す
     */
    getApiData() {
      if (this.seikyugakuSyukeiFlag === true) {
        let seikyugakuApiData = [
          {
            teikyoService: '施設入所支援',
            servicecode: '32',
            serviceriyounissu: 20,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku: 9300,
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
            teikyoService: '生活介護',
            servicecode: '22',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku: 9300,
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
            teikyoService: '就労移行支援',
            servicecode: '44',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku: 9300,
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
            teikyoService: '療養介護',
            servicecode: '21',
            serviceriyounissu: 31,
            kyuhutanisu: 11360,
            tanisutanka: 11.32,
            souhiyougaku: 128595,
            itiwarisoutougaku: 12859,
            riyousyahutan2: 12859,
            jyougengetugaku: 9300,
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
        // 特定障害Grid
        if (this.displaySetting[0].tokuteiSyogaiGridFlag) {
          let riyousyaHutan = {
            santeiNichigaku: '1234', // 算定日額
            nissu: '12', // 日数
            kyuhuhiseikyu: '12345', // 給付費請求額
            jippisanteigaku: '12345', // 実費算定額
          };
          this.$refs.tokuteiSyogaiData.setTokuteiSyogaiData(riyousyaHutan);
        }
      }
    },
    /***************
     * ヘッダメニューのサービスを変更したとき
     */
    parentServiceChange(serviceArgument) {
      // ヘッダーで選択された事業所情報を取得
      this.selectedJigyosyo.serviceJigyo = serviceArgument.serviceJigyo;
      this.selectedJigyosyo.jimusyoBango = serviceArgument.jimusyoBango;
      this.selectedJigyosyo.teikyoCode = serviceArgument.teikyoCode;
      // 表示Flagを変更
      this.displayChange();
      (this.dataSetFlag = false),
        // 子コンポーネントの再読み込み
        this.childGridReload();
    },
    /***************
     * 子コンポーネントの再読み込み
     */
    childGridReload() {
      // 各グリッドをリロード
      // 非表示無しGrid
      for (let i in this.reload[0]) {
        this.reload[0][i] = false;
        this.$nextTick(() => (this.reload[0][i] = true));
      }
      // 非表示ありGrid
      for (let i in this.displaySetting[0]) {
        if (this.displaySetting[0][i] === true && i !== 'seikyugakuTabFlag') {
          // 表示Fragがtrueでタブの表示フラグ以外のGridを再読み込み
          this.displaySetting[0][i] = false;
          this.$nextTick(() => (this.displaySetting[0][i] = true));
        }
      }
    },
    /***************
     * 表示項目条件の変更
     */
    displayChange() {
      // タブをサービス明細欄に切り替え
      this.serviceMeisaiFlag = true;
      this.seikyugakuSyukeiFlag = false;
      let ptn = '';
      let getCode = this.selectedJigyosyo.teikyoCode;
      ///////  条件は仮  ///////
      if (getCode === 1) {
        // A 介護給付費、訓練等給付費等明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][0];
      } else if (getCode === 2) {
        /// A-2 特例介護給付費、特例訓練等給付費等明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][1];
      } else if (getCode === 3) {
        // B 特例訓練等給付費等明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][2];
      } else if (getCode === 4) {
        // C 計画相談支援給付費明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][3];
      } else if (getCode === 5) {
        // C-2 特例計画相談支援給付費明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][4];
      } else if (getCode === 6) {
        // D 地域相談支援給付費明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][5];
      } else if (getCode === 7) {
        // E 障害児通所給付費・入所給付費等明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][6];
      } else if (getCode === 8) {
        // E-2 障害児通所給付費等明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][7];
      } else if (getCode === 9) {
        // F 障害児相談支援給付費明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][8];
      } else if (getCode === 10) {
        // F-2 特例障害児相談支援給付費明細書
        ptn = DispPtn.kyuhumeisaiPtn[0][9];
      } else {
        // else 用Data
        ptn = DispPtn.kyuhumeisaiPtn[0][10];
      }
      let ds0 = this.displaySetting[0];
      let ds1 = this.displaySetting[1];
      let l = 0;
      // パターンごとの値を取得して、this.displaySettingに挿入
      for (let i in ptn) {
        // 各項目の表示切り替え
        if (l < 5) {
          ds0[i] = ptn[i];
        } else if (4 < l) {
          ds1[i] = ptn[i];
        }
        l++;
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
