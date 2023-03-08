<template>
  <div id="seikyushoLists" :style="styles">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :seikyuflag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row
        no-gutters
        flat
        tile
        class="d-flex ml-1 mb-1 mt-1"
        :class="{ w1200: changeService == 52, w1300: changeService == 53 }"
      >
        <label class="koumokuTitle titleBlueDark mr-1" width="80" height="20"
          >市区町村</label
        >
        <select
          v-model="selectCities"
          @change="changeCity"
          class="selectCities"
          height="20"
        >
          <option
            v-for="list in selectCitiesLists"
            :key="list.id"
            :value="list.id"
          >
            {{ list.name }}
          </option>
        </select>
        <v-spacer></v-spacer>
        <label class="koumokuTitle titleOrange" width="80">印刷種類</label>
        <v-card elevation="0" tile outlined class="pl-1 ml-1" height="20">
          <div v-for="val in printTypeList" :key="val.id" class="radioInline">
            <input
              type="radio"
              :id="'service-' + val.id"
              v-model="printType"
              :value="val.id"
              name="srv"
            />
            <label :for="'service-' + val.id" class="customRadio mr-2">
              <span>{{ val.name }}</span>
            </label>
          </div>
        </v-card>
      </v-row>
      <v-row
        no-gutters
        class="mt-1 ml-1"
        v-show="changeService == 52 || changeService == 53"
      >
        <v-col v-show="changeService == 52">
          <alphabet-button
            class="mt-1"
            ref="alp"
            @onAlphabetical="onAlphabetical"
          >
          </alphabet-button>
        </v-col>
        <!-- ボタン仮置き -->
        <v-col style="text-align: right">
          <select
            class="selectCities min"
            @change="onselectedIndexChanged()"
            v-model="selectedAll"
          >
            <option :value="val.id" v-for="(val, k) in selectPrint" :key="k">
              {{ val.name }}
            </option>
          </select>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-1 ml-1">
        <!-- 計画相談グリッド -->
        <wj-flex-grid
          id="seikyusyoKeikaku"
          v-show="changeService == 52"
          :initialized="onInitializedKeikaku"
          :itemsSourceChanged="onItemsSourceChangedKeikaku"
          :itemsSource="viewData"
          :alternatingRowStep="0"
          :autoGenerateColumns="false"
          :headersVisibility="'Column'"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="false"
          :formatItem="onFormatItem"
        >
          <wj-flex-grid-column
            v-for="val in gridHeaderKeikaku"
            :key="val.id"
            :header="val.header"
            :binding="val.binding"
            :width="val.width"
            :word-wrap="true"
            :allowResizing="true"
            :isReadOnly="true"
            :multi-line="true"
            align="left"
          ></wj-flex-grid-column>
        </wj-flex-grid>
        <!-- 地域移行グリッド -->
        <wj-flex-grid
          id="seikyusyoChiikiGrid"
          v-show="changeService == 53"
          :initialized="onInitializedChiiki"
          :itemsSourceChanged="onItemsSourceChangedChiiki"
          :itemsSource="viewDataChiiki"
          :alternatingRowStep="0"
          :autoGenerateColumns="false"
          :headersVisibility="'Column'"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="false"
          :formatItem="onFormatItemChiiki"
        >
          <wj-flex-grid-column
            v-for="val in gridHeaderChiiki"
            :key="val.id"
            :header="val.header"
            :binding="val.binding"
            :width="val.width"
            :word-wrap="true"
            :multi-line="true"
            :allowResizing="true"
            :isReadOnly="true"
            :allowMerging="'AllHeaders'"
            align="right"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
    <!-- 対象外アラート -->
    <v-row id="screen_dialog" v-show="notIncluededFlag">
      <v-col class="text-h2">
        <p>こちらのサービスは対象外です。</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import dayjs from 'dayjs';
const KenSu = '件';
const GouKei = ' 計';
// const KEIKAKU = 52;
// const CHIIKI = 53;

export default {
  props: {
    selectedUserObj: Object,
  },
  data() {
    return {
      changeService: 52, // 初期:計画相談
      serviceArgument: '', // ヘッダメニューのサービス選択
      teikyoCode: 0,
      year: dayjs().format('YYYY'),
      month: dayjs().format('MM'),
      alertMessageFlag: false, // 変更時のアラートメッセージ
      headerheight: 180,
      // 都市選択
      selectCities: 0,
      selectCityId: '',
      selectCitiesLists: [
        { id: 0, name: '指定なし' },
        { id: 1, name: '東経市' },
        { id: 2, name: '西経市' },
      ],
      selectedCityName: '',
      printType: 0,
      printTypeList: [
        { id: 0, name: '請求書' },
        { id: 1, name: '一覧' },
      ],
      // 計画相談Grid
      viewData: [], // itemsSource
      viewDataAll: [],
      flexGrid: [],
      createdDate: dayjs().format('YYYY/MM/DD'),
      selectPrint: [
        { id: 0, name: '全選択/全解除' },
        { id: 1, name: '全選択' },
        { id: 2, name: '全解除' },
      ],
      selectedAll: 0,
      // ヘッダーデータ
      gridHeaderKeikaku: [
        // grid header
        {
          id: 1,
          width: '*',
          header: '市区町村名',
          binding: 'cityName',
        },
        {
          id: 2,
          width: 30,
          header: '項番',
          binding: 'number',
        },
        {
          id: 3,
          width: 100,
          header: '受給者番号',
          binding: 'jukyuNo',
        },
        {
          id: 4,
          width: '*',
          header: '氏名',
          binding: 'name',
        },
        {
          id: 5,
          width: '*',
          header: 'フリガナ',
          binding: 'kana',
        },
        {
          id: 6,
          width: 100,
          header: '計画作成日/\nモニタリング日',
          binding: 'createdDate',
        },
        {
          id: 7,
          width: '*',
          header: '単位数',
          binding: 'credits',
        },
        {
          id: 8,
          width: '*',
          header: '請求額',
          binding: 'billing',
        },
        {
          id: 9,
          width: 30,
          header: '印刷',
          binding: 'print',
        },
      ],

      // 地域移行Grid
      viewDataChiiki: [], // itemsSource
      viewDataChiikiAll: [],
      flexGridChiiki: [],

      // ヘッダーデータ
      gridHeaderChiiki: [
        // grid header
        {
          id: 1,
          width: '*',
          header: '市区町村名',
          binding: 'cityName',
        },
        {
          id: 2,
          width: '*',
          header: '区分',
          binding: 'kbn',
        },
        {
          id: 3,
          width: 40,
          header: '件数',
          binding: 'kenSuA',
        },
        {
          id: 4,
          width: '*',
          header: '単位数',
          binding: 'taniSu',
        },
        {
          id: 5,
          width: '*',
          header: '費用合計',
          binding: 'hiyoGokeiA',
        },
        {
          id: 6,
          width: '*',
          header: 'A 給付費\n請求額',
          binding: 'kyufuA',
        },
        {
          id: 7,
          width: '*',
          header: '特別対策費\n請求書',
          binding: 'tokubetsu',
        },
        {
          id: 8,
          width: '*',
          header: '利用者\n負担額',
          binding: 'riyosyaFutan',
        },
        {
          id: 9,
          width: '*',
          header: '自治体\n助成額',
          binding: 'joseiKin',
        },
        {
          id: 10,
          width: '*',
          header: '件数',
          binding: 'kenSuB',
        },
        {
          id: 11,
          width: '*',
          header: '費用合計',
          binding: 'hiyoGokeiB',
        },
        {
          id: 12,
          width: '*',
          header: 'B 給付費\n請求額',
          binding: 'kyufuB',
        },
        {
          id: 13,
          width: '*',
          header: 'A + B\n請求金額',
          binding: 'AplusB',
        },
        {
          id: 14,
          width: 30,
          header: '印刷',
          binding: 'printChiiki',
        },
      ],

      // 対象外アラート
      notIncluededFlag: false,
    };
  },
  components: {
    HeaderServices,
    AlphabetButton,
  },
  computed: {
    styles() {
      return { '--height': window.innerHeight - this.headerheight + 'px' };
    },
  },
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },

  methods: {
    calculateWindowHeight() {
      if (document.getElementById('seikyusyoKeikaku') != null) {
        document.getElementById('seikyusyoKeikaku').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
      if (document.getElementById('seikyusyoChiikiGrid') != null) {
        document.getElementById('seikyusyoChiikiGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setUserdata(item) {
      if (item != null) {
        this.dispUserObj = Object.assign({}, item);
        this.userName = this.dispUserObj.names;
      }
    },
    /*******************************
     * サービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument.teikyo_year;
      this.month = serviceArgument.teikyo_month;
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      //if (serviceArgument.search_button) {
      // 対象外サービス選択時
      if (
        serviceArgument.teikyoCode == 52 ||
        serviceArgument.teikyoCode == 53
      ) {
        this.notIncluededFlag = false;
        this.$refs.alertMessageFlag = true;
        this.changeService = serviceArgument.teikyoCode;
      } else {
        this.notIncluededFlag = true;
        this.$refs.alertMessageFlag = false;
      }
      //}
    },
    parentServiceChange() {
      this.notIncluededFlag = false;
    },

    /*******************
     * 請求書 計画相談グリッド
     */
    /**** 初期 */
    onInitializedKeikaku(flexGrid) {
      this.flexGrid = flexGrid;
      // デフォルトデータ (API想定)
      let viewData = [];
      viewData.push({
        number: 1,
        cityNo: 1,
        cityName: '東経市',
        jukyuNo: '1100101012',
        name: '東経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
        print: '',
      });
      viewData.push({
        number: 2,
        cityNo: 1,
        cityName: '東経市',
        jukyuNo: '1100101014',
        name: '東経 次郎',
        kana: 'ﾄｳｹｲ ｼﾞﾛｳ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 3,
        cityNo: 1,
        cityName: '東経市',
        jukyuNo: '1100101012',
        name: '東経 和子',
        kana: 'ﾄｳｹｲ ｶｽﾞｺ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 4,
        cityNo: 1,
        cityName: '東経市',
        jukyuNo: '1100101012',
        name: '東経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        createdDate: '2023/07/01',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 5,
        cityNo: 1,
        cityName: '東経市',
        jukyuNo: '1100101012',
        name: '東経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 1,
        cityNo: 2,
        cityName: '西経市',
        jukyuNo: '1100101012',
        name: '西経 花子',
        kana: 'ﾆｼｹｲ ﾊﾅｺ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 2,
        cityNo: 2,
        cityName: '西経市',
        jukyuNo: '1100101012',
        name: '西経 太郎',
        kana: 'ﾆｼｹｲ ﾀﾛｳ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      viewData.push({
        number: 3,
        cityNo: 2,
        cityName: '西経市',
        jukyuNo: '1100101012',
        name: '西経 次郎',
        kana: 'ﾆｼｹｲ ｼﾞﾛｳ',
        createdDate: '2023/07/10',
        credits: '1.711',
        billing: '18.725',
      });
      this.viewData = viewData;
      this.viewDataAll = viewData;

      this.groupByData();
      this.createHeaderAndFooter(flexGrid);
      // 改行用height
      flexGrid.columnHeaders.rows[1].height = 60;

      // 印刷〇
      let _self = this;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        let tmp = _self.viewData;
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 8) {
            // cityNoがある時データ
            // cityNoKeyがある時合計
            let cityno = tmp[ht.row].cityNo;
            let cityNoKey = tmp[ht.row].cityNoKey;
            let print = tmp[ht.row].print;
            for (let i = 0; i < tmp.length; i++) {
              // 選択したcityNoでチェック
              if (cityno && tmp[i].cityNo == cityno) {
                tmp[i].print = !print ? '〇' : '';
              }
              if (cityNoKey && tmp[i].cityNoKey == cityNoKey) {
                tmp[i].print = !print ? '〇' : '';
              }
            }
            console.log(tmp);
            _self.viewData = tmp;
            flexGrid.refresh();
          }
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });
      // セルの非活性化
      flexGrid.beginningEdit.addHandler(function (sender, args) {
        if (args.row >= 0) {
          args.cancel = true;
        }
      });
      flexGrid.startEditing(true);
      flexGrid.imeEnabled = true;
    },
    /**** changeメソッド */
    onItemsSourceChangedKeikaku(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    /**** gridデザイン */
    onFormatItem(flexGrid, e) {
      //---ヘッダデザイン---//
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        e.cell.style.display = 'flex';
        e.cell.style.height = 'flex';
        e.cell.style.color = sysConst.COLOR.fontColor;
        // ヘッダ背景色
        if (e.col == 6 || e.col == 7) {
          wijmo.addClass(e.cell, 'addHeaderKeisan');
        }
        if (e.col == 8) {
          wijmo.addClass(e.cell, 'addHeaderPrint');
        }
        // 縦二重線
        if (e.col == 6 || e.col == 8) {
          wijmo.addClass(e.cell, 'addBorderLeftBouble');
        }
        // 縦書き
        if (e.col == 1 || e.col == 8) {
          wijmo.addClass(e.cell, 'verticalCustom');
        }
      }
      //---ボディデザイン---//
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.textAlign = 'left';
        e.cell.style.color = sysConst.COLOR.fontColor;
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        if (e.col == 8) {
          e.cell.style.backgroundColor = sysConst.COLOR.white;
        }
        // 縦二重線
        if (e.col == 6 || e.col == 8) {
          wijmo.addClass(e.cell, 'addBorderLeftBouble');
        }
        // フォント位置
        if (e.col == 1 || e.col == 6 || e.col == 7) {
          e.cell.style.textAlign = 'right';
        }
        if (e.col == 2 || e.col == 5) {
          e.cell.style.textAlign = 'center';
        }

        // 可変行スタイル
        let tmpItem = e.panel.rows[e.row].dataItem;
        let tmpItemM = '';
        if (e.row >= 1) {
          tmpItemM = e.panel.rows[e.row - 1].dataItem;
        }
        // 各市の合計行スタイル
        if (tmpItem.cityNoKey) {
          e.cell.style.textAlign = 'right';
          e.cell.style.backgroundColor = sysConst.COLOR.viewHosokuBackground;
          wijmo.addClass(e.cell, 'addBorderTopBouble');
          wijmo.addClass(e.cell, 'addBorderBottomBouble');
          if (e.col == 8) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          }
          if (e.col == 6 || e.col == 7) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.textAlign = 'right';
          }
          if (e.col <= 5) {
            e.cell.style.textAlign = 'center';
          }
        }
        // 印刷行スタイル
        if (
          e.col == 8 &&
          (tmpItem.cityNo == tmpItemM.cityNo ||
            e.row == 0 ||
            (tmpItemM.cityNoKey && tmpItem.cityNo != tmpItemM.cityNo))
        ) {
          e.cell.style.borderBottom = 'none';
        }
        // 印刷行スタイル
        if (e.col == 8 && tmpItem.cityNo == tmpItemM.cityNo) {
          e.cell.style.textIndent = '-9999px';
        }
      }
      //---フッターデザイン---//
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.color = sysConst.COLOR.fontColor;
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';

        if (e.col >= 6) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          e.cell.style.textAlign = 'right';
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewHosokuBackground;
        }
        if (e.col == 8) {
          e.cell.style.backgroundColor = '#e4e4e4';
          e.cell.style.width = '30px';
        }
        // 縦二重線
        if (e.col == 6 || e.col == 8) {
          wijmo.addClass(e.cell, 'addBorderLeftBouble');
        }
      }
    },
    /***********************
     * データのグループ化
     * (API接続時は要調整)
     ***********************/
    groupByData(data) {
      let viewData = [];
      if (data) {
        viewData = data;
      } else {
        viewData = this.viewDataAll;
      }
      // cityNoをkeyにグループ化
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      let groupByCity = groupBy(viewData, 'cityNo');

      // 最小・最大値を取得
      const firstElement = Object.keys(groupByCity).find(
        (element) => element != undefined
      );
      const lastElement = Object.keys(groupByCity).slice(-1)[0];

      // 初期値
      let tmp = [];
      let cityNoKey = 0;
      let cityName = '';
      let bill = 0;
      let creditTotal = 0;
      let billingTotal = 0;

      //データ全体数ループ
      for (let i = firstElement; i <= lastElement; i++) {
        // データ数に合わせて毎回初期化
        let n = 0;
        bill = 0;
        // 市区町村数に合わせてループ
        for (let j = 0; j < groupByCity[i].length; j++) {
          tmp.push(groupByCity[i][n]);
          cityNoKey = groupByCity[i][n].cityNo;
          cityName = groupByCity[i][n].cityName;
          bill += Number(groupByCity[i][n].billing);
          billingTotal += Number(groupByCity[i][n].billing);
          creditTotal += parseInt(groupByCity[i][n].credits);
          n++;
        }

        // bindに対してpush
        tmp.push({
          cityNoKey: cityNoKey,
          cityName: cityName + GouKei,
          billing: bill,
          billingTotal: billingTotal,
          credits: groupByCity[i].length + KenSu,
          creditTotal: creditTotal + KenSu,
          length: groupByCity[i].length,
          totalFlg: true,
        });
      }
      this.viewData = tmp;
    },
    /******************
     * 52 計画相談 ヘッダ情報
     *****************/
    createHeaderAndFooter(flexGrid) {
      // Gridデータ取得
      let data = this.viewData;

      // header----
      var panel = flexGrid.columnHeaders;
      // 列追加
      let headerRanges = [];
      if (panel._rows.length == 1) {
        panel.rows.insert(1, new wjGrid.Row());
        // ヘッダ名入力
        panel.setCellData(0, 0, '市区町村');
        panel.setCellData(0, 1, '項番');
        panel.setCellData(0, 2, '支給決定障害者等');
        panel.setCellData(0, 6, '請求額計算欄');
        panel.setCellData(0, 8, '印刷');
      }
      // 上部ヘッダの結合
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 0));
      headerRanges.push(new wjGrid.CellRange(0, 1, 1, 1));
      headerRanges.push(new wjGrid.CellRange(0, 2, 0, 5));
      headerRanges.push(new wjGrid.CellRange(0, 6, 0, 7));
      headerRanges.push(new wjGrid.CellRange(0, 8, 1, 8));
      // body----
      let bodyRanges = [];
      // 各市の合計欄のセルを結合;
      for (let i = 0; i < data.length; i++) {
        if (data[i].totalFlg == true) {
          bodyRanges.push(new wjGrid.CellRange(i, 0, i, 5));
        }
      }
      // 市区町村のセルの結合
      for (let k = 0; k < data.length; k++) {
        if (data[k].totalFlg == true) {
          bodyRanges.push(
            new wjGrid.CellRange(k - data[k].length, 0, k - 1, 0)
          );
        }
      }

      // footer----
      var foot = flexGrid.columnFooters;
      if (foot._rows.length == 0) {
        foot.rows.insert(1, new wjGrid.Row());

        foot.setCellData(0, 0, '合計');
      }

      let b = 0;
      let c = 0;
      data.map(function (key) {
        b = key.billingTotal;
        c = key.creditTotal;
      });
      // 合計値出力
      foot.setCellData(0, 6, c);
      foot.setCellData(0, 7, b);

      // セルの結合
      let footerRanges = [];
      footerRanges.push(new wjGrid.CellRange(0, 0, 0, 5));

      // マージ----
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /***********************
     * 請求額 地域移行グリッド
     ***********************/
    onInitializedChiiki(flexGrid) {
      this.flexGridChiiki = flexGrid;
      // デフォルトデータ（API想定）
      let viewDataChiiki = [];
      viewDataChiiki.push({
        id: 1,
        cityNo: 1,
        cityName: '東経市',
        kbn: '地域移行支援',
        kenSuA: '7',
        taniSu: '65421',
        hiyoGokeiA: '113403',
        kyufuA: '113403',
        tokubetsu: '',
        riyosyaFutan: '',
        joseiKin: '0',
        kenSuB: '0',
        hiyoGokeiB: '0',
        kyufuB: '0',
        AplusB: '113403',
        print: '',
      });
      viewDataChiiki.push({
        id: 2,
        cityNo: 1,
        cityName: '東経市',
        kbn: '地域定着支援',
        kenSuA: '2',
        taniSu: '6508',
        hiyoGokeiA: '71327',
        kyufuA: '71327',
        tokubetsu: '',
        riyosyaFutan: '',
        joseiKin: '0',
        kenSuB: '0',
        hiyoGokeiB: '0',
        kyufuB: '0',
        AplusB: '71327',
        print: '',
      });
      viewDataChiiki.push({
        id: 3,
        cityNo: 1,
        cityName: '東経市',
        kbn: '地域定着支援',
        kenSuA: '2',
        taniSu: '6508',
        hiyoGokeiA: '71327',
        kyufuA: '71327',
        tokubetsu: '',
        riyosyaFutan: '',
        joseiKin: '0',
        kenSuB: '0',
        hiyoGokeiB: '0',
        kyufuB: '0',
        AplusB: '71327',
        print: '',
      });
      viewDataChiiki.push({
        id: 1,
        cityNo: 2,
        cityName: '西経市',
        kbn: '地域移行支援',
        kenSuA: '1',
        taniSu: '4321',
        hiyoGokeiA: '47358',
        kyufuA: '47358',
        tokubetsu: '',
        riyosyaFutan: '',
        joseiKin: '0',
        kenSuB: '9',
        hiyoGokeiB: '0',
        kyufuB: '0',
        AplusB: '47358',
        printChiiki: '',
      });
      viewDataChiiki.push({
        id: 2,
        cityNo: 2,
        cityName: '西経市',
        kbn: '地域移行支援',
        kenSuA: '1',
        taniSu: '4321',
        hiyoGokeiA: '47358',
        kyufuA: '47358',
        tokubetsu: '',
        riyosyaFutan: '',
        joseiKin: '0',
        kenSuB: '9',
        hiyoGokeiB: '0',
        kyufuB: '0',
        AplusB: '47358',
        printChiiki: '',
      });
      this.viewDataChiiki = viewDataChiiki;
      this.viewDataChiikiAll = viewDataChiiki;
      this.createHeaderAndFooterChiiki(flexGrid);
      // height
      flexGrid.columnHeaders.rows[0].height = 30;
      flexGrid.columnHeaders.rows[1].height = 60;

      // 印刷〇
      let _self = this;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        let tmp = _self.viewDataChiiki;
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 13 && tmp[ht.row].cityNo) {
            for (let p = 0; p < tmp.length; p++) {
              if (
                (tmp[p].id == 1 && tmp[p].cityNo == tmp[ht.row].cityNo) ||
                (tmp[p].cityNo == tmp[ht.row].cityNo && !tmp[p].cityNo)
              ) {
                if (flexGrid.cells.getCellData(p, ht.col) == '〇') {
                  tmp[p].printChiiki = '';
                  flexGrid.cells.setCellData(p, ht.col, ' ');
                } else {
                  tmp[p].printChiiki = '〇';
                  flexGrid.cells.setCellData(p, ht.col, '〇');
                }
              }
            }
          }
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });
      // セルの非活性化
      flexGrid.beginningEdit.addHandler(function (sender, args) {
        if (args.row >= 0) {
          args.cancel = true;
        }
      });
      flexGrid.startEditing(true);
      flexGrid.imeEnabled = true;
    },
    /**** changeメソッド */
    onItemsSourceChangedChiiki(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    /**** gridデザイン */
    onFormatItemChiiki(flexGrid, e) {
      //---ヘッダデザイン---//
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        e.cell.style.display = 'flex';
        e.cell.style.height = 'flex';
        e.cell.style.color = sysConst.COLOR.fontColor;
        // ヘッダ背景色
        if (e.col <= 11) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
        if (e.col == 12) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
        if (e.col == 13) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreenDark;
        }
        // 縦書き
        if (e.col == 13) {
          wijmo.addClass(e.cell, 'verticalCustom');
        }
        // ボーター
        if (e.col == 5 || e.col == 11) {
          wijmo.addClass(e.cell, 'addBorderHeader');
        }
      }
      //---ボディデザイン---//
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.textAlign = 'right';
        e.cell.style.color = sysConst.COLOR.fontColor;
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;

        // フォント位置
        if (e.col <= 1) {
          e.cell.style.textAlign = 'left';
        }
        // グレースケール
        //(グレーになる条件未定のため一旦固定でグレーアウト)
        if (e.col == 6 || e.col == 7) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
        }
        // ボーター
        if (e.col == 5 || e.col == 11) {
          wijmo.addClass(e.cell, 'addBorderBody');
        }

        // gridデータ取得
        let tmpItem = e.panel.rows[e.row].dataItem;
        let tmpItemP = '';
        if (e.panel.rows[e.row + 1]) {
          tmpItemP = e.panel.rows[e.row + 1].dataItem;
        }
        let tmpItemM = '';
        if (e.panel.rows[e.row - 1]) {
          tmpItemM = e.panel.rows[e.row - 1].dataItem;
        }
        // 可変行スタイル
        for (let l = 0; l < tmpItem.length; l++) {
          if (tmpItem[l].cityNo + 1) {
            e.cell.style.borderTop = 'solid 1px rgba(0,0,0,.2)';
          }
        }
        // 印刷行スタイル
        if (e.col == 13) {
          e.cell.style.backgroundColor = sysConst.COLOR.white;
          e.cell.style.textAlign = 'center';
          if (tmpItemP && tmpItem.cityNo == tmpItemP.cityNo) {
            e.cell.style.borderBottom = 'none';
          } else {
            e.cell.style.borderBottom = '';
          }

          if (tmpItemM && tmpItem.cityNo == tmpItemM.cityNo) {
            e.cell.style.textIndent = '-9999px';
          }
        }
        // 市区町村行スタイル
        if (e.col == 0) {
          if (tmpItemP && tmpItem.cityNo == tmpItemP.cityNo) {
            e.cell.style.borderBottom = 'none';
          } else {
            e.cell.style.borderBottom = '';
          }
          if (tmpItemM && tmpItem.cityNo == tmpItemM.cityNo) {
            e.cell.style.textIndent = '-999px';
          }
        }
      }
      //---フッターデザイン---//
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.color = sysConst.COLOR.fontColor;
        e.cell.style.textAlign = 'right';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;

        // 二重線
        if (e.row == 0) {
          e.cell.style.borderTop = 'double 3px #646d79';
        }
        // 合計位置
        if (e.col <= 1) {
          e.cell.style.textAlign = 'center';
        }
        // ボーター
        if (e.col == 5 || e.col == 11) {
          wijmo.addClass(e.cell, 'addBorderFooter');
        }
        if (e.col == 13) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightGray;
        }
      }
    },
    /******************
     * 53 地域移行 ヘッダ情報
     *****************/
    createHeaderAndFooterChiiki(flexGrid) {
      // Gridデータ取得
      let data = this.viewDataChiiki;

      // header----
      var panel = flexGrid.columnHeaders;
      // 列追加
      let headerRanges = [];
      if (panel._rows.length == 1) {
        panel.rows.insert(1, new wjGrid.Row());
        // ヘッダ名入力
        panel.setCellData(0, 0, '市区町村名');
        panel.setCellData(0, 1, '区分');
        panel.setCellData(0, 2, '介護給付費・訓練等給付費');
        panel.setCellData(0, 9, '特別給付費');
        panel.setCellData(0, 12, 'A + B\n請求金額');
        panel.setCellData(0, 13, '印刷');
      }
      // ヘッダの結合
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 0));
      headerRanges.push(new wjGrid.CellRange(0, 1, 1, 1));
      headerRanges.push(new wjGrid.CellRange(0, 2, 0, 8));
      headerRanges.push(new wjGrid.CellRange(0, 9, 0, 11));
      headerRanges.push(new wjGrid.CellRange(0, 12, 1, 12));
      headerRanges.push(new wjGrid.CellRange(0, 13, 1, 13));

      // footer----
      var foot = flexGrid.columnFooters;
      let footerRanges = [];
      if (foot._rows.length == 0) {
        // 列追加
        foot.rows.insert(1, new wjGrid.Row());
        // フッター名入力
        foot.setCellData(0, 0, '合計');
      }
      // セル結合
      footerRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      // 初期値
      let kenSuA = 0;
      let taniSu = 0;
      let hiyoGokeiA = 0;
      let kyufuA = 0;
      let tokubetsu = 0;
      let riyosyaFutan = 0;
      let joseiKin = 0;
      let kenSuB = 0;
      let hiyoGokeiB = 0;
      let kyufuB = 0;
      let AplusB = 0;

      for (let j = 0; j < data.length; j++) {
        kenSuA += Number(data[j].kenSuA);
        taniSu += Number(data[j].taniSu);
        hiyoGokeiA += Number(data[j].hiyoGokeiA);
        kyufuA += Number(data[j].kyufuA);
        tokubetsu += Number(data[j].tokubetsu);
        riyosyaFutan += Number(data[j].riyosyaFutan);
        joseiKin += Number(data[j].joseiKin);
        kenSuB += Number(data[j].kenSuB);
        hiyoGokeiB += Number(data[j].hiyoGokeiB);
        kyufuB += Number(data[j].kyufuB);
        AplusB += Number(data[j].AplusB);
      }
      // 合計値入力
      foot.setCellData(0, 2, kenSuA);
      foot.setCellData(0, 3, taniSu);
      foot.setCellData(0, 4, hiyoGokeiA);
      foot.setCellData(0, 5, kyufuA);
      foot.setCellData(0, 6, tokubetsu);
      foot.setCellData(0, 7, riyosyaFutan);
      foot.setCellData(0, 8, joseiKin);
      foot.setCellData(0, 9, kenSuB);
      foot.setCellData(0, 10, hiyoGokeiB);
      foot.setCellData(0, 11, kyufuB);
      foot.setCellData(0, 12, AplusB);

      //----マージ----//
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /**************************
     * 都市選択
     */
    changeCity() {
      let key = this.selectCities;
      this.selectCities = this.selectCitiesLists[key].id;
      this.userFilter();
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {
      //--- 計画相談---//
      let temp = [];
      temp = this.viewDataAll;

      // アルファベット検索
      temp = this.$refs.alp.alphabetFilter(temp, 'kana');
      this.viewData = temp;

      // 都市検索
      let filteredCity = [];
      if (this.selectCities != 0) {
        filteredCity = temp.filter((temp) => temp.cityNo == this.selectCities);
      } else {
        filteredCity = temp;
      }
      let view = filteredCity;
      this.groupByData(view);
      this.createHeaderAndFooter(this.flexGrid);

      //--- 地域移行---//
      // 地域移行データ取得
      let chiiki = [];
      chiiki = this.viewDataChiikiAll;

      let filteredCityChiiki = [];
      if (this.selectCities != 0) {
        filteredCityChiiki = chiiki.filter(
          (chiiki) => chiiki.cityNo == this.selectCities
        );
      } else {
        filteredCityChiiki = chiiki;
      }
      this.viewDataChiiki = filteredCityChiiki;
      this.createHeaderAndFooterChiiki(this.flexGridChiiki);
    },
    /**************************
     * 全選択/全解除
     */
    onselectedIndexChanged() {
      if (this.selectedAll > 0) {
        let tmp = [];
        if (this.changeService == 52) {
          tmp = this.viewData;
          for (let i = 0; i < tmp.length; i++) {
            tmp[i].print = this.selectedAll == 1 ? '〇' : '';
          }
          this.viewData = tmp;
          this.flexGrid.refresh();
        }
        if (this.changeService == 53) {
          tmp = this.viewDataChiiki;
          for (let i = 0; i < tmp.length; i++) {
            tmp[i].printChiiki = this.selectedAll == 1 ? '〇' : '';
          }
          this.viewDataChiiki = tmp;
          this.flexGridChiiki.refresh();
        }

        this.selectedAll = 0;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#seikyushoLists {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: auto !important;
  max-width: auto;
  width: 100%;
  position: relative;
  // .w1200 {
  //   width: 1200px;
  // }
  // .w1300 {
  //   width: 1300px;
  // }
  .container {
    min-width: 1266px !important;
    max-width: 1360px;
    width: auto;
    margin: 0;

    select {
      outline: none;
      &.selectCities {
        border: 1px solid $light-gray;
        width: 180px;
        height: 21px;
        -webkit-appearance: auto;
        font-size: 0.85rem;
        &.min {
          width: 120px;
        }
      }
    }
    .btn {
      height: 20px;
      position: absolute;
      top: 106px;
      right: 143px;
      left: auto;
    }
    // 計画相談grid style
    #seikyusyoKeikaku {
      font-size: 12px;
      border: 1px solid $grid_Border_Color;
      background-color: $light_yellow;
      height: var(--height);
      &.wj-flexgrid [wj-part='root'] {
        overflow-y: scroll !important;
        overflow-x: hidden !important;
      }
      .wj-header {
        font-weight: normal;
        background: $view_Title_background_Orange_Dark;
        color: $font_color;
      }
      .addHeaderKeisan {
        background: $view_Title_background_Green_Dark;
      }
      .addHeaderPrint {
        background: $view_Data_Input_background;
      }
      .addBorderTopBouble {
        padding-top: 1px;
        border-top: double 3px $grid_Border_Color;
      }
      .addBorderBottomBouble {
        border-bottom: double 3px $grid_Border_Color;
      }
      .addBorderLeftBouble {
        border-left: double 3px $grid_Border_Color;
      }
      .verticalCustom {
        writing-mode: vertical-rl;
      }
    }
    #screen_dialog {
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.46;
      background-color: rgb(33, 33, 33, 1);
      border-color: rgb(33, 33, 33);
      width: 100%;
      height: 100%;
      z-index: 4;
      padding: 0;
      margin: 0;
    }
    // 地域移行
    #seikyusyoChiikiGrid {
      font-size: 12px;
      border: 1px solid $grid_Border_Color;
      width: 100%;

      background-color: $light_yellow;
      height: var(--height);
      &.wj-flexgrid [wj-part='root'] {
        overflow-y: scroll !important;
        overflow-x: hidden !important;
      }
      .verticalCustom {
        writing-mode: vertical-rl;
      }

      .wj-header {
        font-weight: normal;
        color: $font_color;
      }
      .addBorderHeader {
        border-top: double 2px #ff6600;
        border-left: double 2px #ff6600;
        border-right: double 2px #ff6600;
      }
      .addBorderBody {
        border-left: double 2px #ff6600;
        border-right: double 2px #ff6600;
      }
      .addBorderFooter {
        border-left: double 2px #ff6600;
        border-right: double 2px #ff6600;
        border-bottom: double 2px #ff6600;
      }
    }
  }
}
</style>
