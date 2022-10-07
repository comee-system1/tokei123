<template>
  <div id="keiyakuHokoku" :style="styles">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters class="rowStyle mb-1 mt-1">
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          表示日
        </v-card>
        <v-card
          class="pl-1"
          width="140"
          height="20"
          outlined
          tile
          @click="onDatepicker(1)"
          v-model="displayDate"
        >
          {{ getYmDisplay }}
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1 ml-1" outlined tile>
          サービス
        </v-card>
        <v-btn-toggle dense mandatory v-model="onService" height="20">
          <v-btn
            small
            v-for="val in service"
            :key="val.id"
            height="20"
            class="body-2"
            >{{ val.name }}</v-btn
          >
        </v-btn-toggle>
        <v-card class="koumokuTitle titleMain pa-1 mr-1 ml-1" outlined tile>
          対象者
        </v-card>
        <v-btn-toggle dense mandatory v-model="onTarget">
          <v-btn
            small
            v-for="val in target"
            :key="val.id"
            height="20"
            class="body-2"
            >{{ val.name }}</v-btn
          >
        </v-btn-toggle>
        <v-card class="koumokuTitle titleMain pa-1 mr-1 ml-1" outlined tile>
          市区町村
        </v-card>
        <wj-menu
          :itemClicked="selectedCityChanged"
          selectedValuePath="id"
          displayMemberPath="name"
          class="customCombobox"
          :isRequired="true"
        >
          <wj-menu-item v-for="val in cities" :key="val.id">{{
            val.name
          }}</wj-menu-item>
        </wj-menu>
      </v-row>
      <v-row no-gutters class="rowStyle mb-1 mt-1">
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>

        <v-card class="koumokuTitle titleBlue pa-1 mr-1 ml-auto" outlined tile>
          提出日
        </v-card>
        <v-card
          class="pl-1"
          width="140"
          height="20"
          outlined
          tile
          @click="onDatepicker(2)"
        >
          {{ getYmSend }}
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
      </v-row>

      <div class="mt-2">
        <wj-flex-grid
          id="keiyakuGrid"
          :itemsSource="viewData"
          :autoClipboard="false"
          :selectionMode="'Row'"
          :headersVisibility="'Column'"
          :allowAddNew="false"
          :allowDelete="false"
          :allowDragging="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
          :initialized="onInitialized"
          :itemsSourceChanged="onItemsSourceChanged"
        >
          <wj-flex-grid-filter
            :initialized="initialized"
            :showFilterIcons="false"
          ></wj-flex-grid-filter>
          <wj-flex-grid-column
            header="市区町村"
            binding="city"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="コード"
            binding="code"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者名"
            binding="name"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="受給者証番号"
            binding="jyukyusyaBango"
            align="center"
            valign="middle"
            :isReadOnly="true"
            width="1*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="保護者"
            binding="hogosya"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="契約開始日"
            binding="keiyakukaisi"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="契約終了日"
            binding="keiyakusyuryo"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="終了理由"
            binding="syuryoriyu"
            align="center"
            valign="middle"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="印刷"
            binding="print"
            align="center"
            valign="middle"
            :width="80"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </div>
    </v-container>

    <!--表示日ダイアログ-->
    <v-dialog v-model="datepicker_dialog" width="300" eager>
      <v-date-picker
        v-model="picker"
        id="datepickerDialog"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>

    <!-- 契約報告書 -->
    <v-dialog v-model="contactDialog" :width="800">
      <v-card class="common_dialog">
        <v-card-title class="dialog_title"> 契約報告書作成 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="
            contactDialog = false;
            open = false;
          "
          class="mt-1 dialog_close"
          ><v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-card>
      <v-card class="pa-2 common_dialog" tile flat>
        <!-- 履歴参照 -->
        <div class="history_menu pa-2" :class="{ 'is-active': open }">
          <div class="history_title">
            <label>サービス履歴参照</label>
            <v-btn
              elevation="2"
              icon
              x-small
              v-on:click="open = !open"
              @click="contactDialog = false"
              class="history_close"
              ><v-icon dark x-small> mdi-close </v-icon>
            </v-btn>
          </div>

          <wj-flex-grid
            id="serviceHistoryGrid"
            class="mt-1"
            :selectionMode="'Row'"
            :headersVisibility="'Column'"
            :alternatingRowStep="0"
            :autoGenerateColumns="false"
            :allowDragging="false"
            :allowResizing="false"
            :allowSorting="false"
            :allowMerging="'Cells'"
            :isReadOnly="true"
            :showBandedRows="false"
            :initialized="onInitializeService"
            :itemsSourceChanged="onInitializeServiceChanged"
            :itemsSource="viewDataHistory"
          >
            <wj-flex-grid-column
              :header="'開始日'"
              binding="startHistoryDate"
              align="center"
              valign="middle"
              width="1*"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'終了日'"
              binding="endHistoryDate"
              align="center"
              valign="middle"
              width="1*"
              :isReadOnly="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <v-row no-gutters class="rowStyle_Dark mb-3 mt-1 pa-1">
          <v-card class="koumokuTitle titleBlueDark" outlined tile>
            利用者名
          </v-card>
          <v-card elevation="0" outlined tile class="lightYellow" width="675">
            {{ userName }}
          </v-card>
        </v-row>
        <div class="ml-1 mb-2">
          <v-row class="rowStyle_input mb-1" dense>
            <v-card outlined tile class="koumokuTitle titleBlueDark">
              相談事業者
            </v-card>
            <v-card class="text-center" outlined tile width="100" elevation="0"
              >{{ jyukyusyaBango }}
            </v-card>
            <v-card outlined tile width="580" elevation="0"
              >{{ jyukyusyaJigyosyo }}
            </v-card>
          </v-row>
          <v-row class="rowStyle_input mb-1" dense>
            <v-card outlined tile class="koumokuTitle titleBlueDark">
              サービス内容
            </v-card>
            <v-card class="text-center" outlined tile width="50" elevation="0"
              >{{ serviceNumber }}
            </v-card>
            <v-card outlined tile width="630" elevation="0"
              >{{ serviceDetail }}
            </v-card>
          </v-row>
        </div>

        <div class="common_dialog dialog_back_blue pa-4">
          <v-row class="mt-1" no-gutters>
            <v-card elevation="0" outlined tile class="koumokuTitle titleMain">
              受給者番号
            </v-card>
            <v-card elevation="0" outlined tile class="wdShort ml-1"
              >{{ jyukyusyaBango }}
            </v-card>
          </v-row>

          <v-row class="mt-1" no-gutters>
            <v-card elevation="0" outlined tile class="koumokuTitle titleMain">
              支給決定障害者<br />(保護者)
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              class="wdLong pa-3 ml-1 text-left"
              >{{ hogosya }}
            </v-card>
          </v-row>

          <v-row class="mt-1 mb-1" no-gutters>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain pa-3"
            >
              児童氏名
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              class="rowStyle_input wdLong pa-3 ml-1 text-left"
              >{{ jidosimei }}
            </v-card>
          </v-row>
        </div>
        <div class="dialog_border common_dialog">
          <v-row class="mt-1 ml-1" no-gutters>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain mr-1"
            >
              契約締結
            </v-card>
            <v-card elevation="0" outlined tile class="koumokuTitle titleMain"
              >契約期間始期
            </v-card>
            <v-card
              elevation="0"
              width="160"
              outlined
              tile
              class="text-center label text-caption ml-1"
              @click="onDatepicker(3)"
            >
              {{ keiyakukaisi }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-row class="pa-3">
              <v-btn class="func_btn ml-auto" small v-on:click="open = !open"
                >履歴参照</v-btn
              >
            </v-row>
          </v-row>
          <v-row class="mt-1 ml-1" no-gutters>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain mr-1"
            >
              契約終了
            </v-card>
            <v-card elevation="0" outlined tile class="koumokuTitle titleMain"
              >契約期間終期
            </v-card>
            <v-card
              elevation="0"
              width="160"
              outlined
              tile
              class="text-center label text-caption ml-1"
              @click="onDatepicker(4)"
            >
              {{ keiyakusyuryo }}

              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
          </v-row>
          <v-row class="mt-1 ml-1 mr-1" no-gutters>
            <v-card elevation="0" height="80" width="104"> &nbsp; </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain pa-1"
              height="80"
              >終了理由
            </v-card>
            <v-textarea
              dense
              tile
              outlined
              elevation="0"
              class="ml-1"
              name="syuryoriyu"
              height="80"
            ></v-textarea>
          </v-row>
          <v-row class="pa-5">
            <v-col><v-btn class="func_btn" small>削除</v-btn></v-col>
            <v-col class="text-end"
              ><v-btn class="func_btn" small>登録</v-btn></v-col
            >
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    AlphabetButton,
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  data: function () {
    return {
      filter: '',
      onService: '',
      contactDialog: false,
      datepicker_dialog: false,
      picker: '',
      service: [
        {
          id: 1,
          name: '両方',
        },
        {
          id: 2,
          name: '障害者',
        },
        {
          id: 3,
          name: '障害児',
        },
      ],
      onTarget: '',
      target: [
        {
          id: 1,
          name: '全員',
        },
        {
          id: 2,
          name: '未入力',
        },
        {
          id: 3,
          name: '入力済',
        },
      ],
      onCity: 0,
      cities: [
        {
          id: 0,
          name: '指定なし',
        },
        {
          id: 1,
          name: '東経市',
        },
        {
          id: 2,
          name: '西経市',
        },
      ],
      viewData: [],
      viewDataDefault: [],
      userName: '',
      jyukyusyaCode: '',
      jyukyusyaBango: '',
      hogosya: '',
      jyukyusyaJigyosyo: '',
      serviceNumber: '',
      serviceDetail: '',
      jidosimei: '',
      keiyakukaisi: '',
      keiyakusyuryo: '',
      open: false,
      viewDataHistory: [],
      getYmDisplay:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      getYmSend:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      daySelectType: '',
      displayDate: '', // 表示日
      headerheight: 100,
    };
  },

  methods: {
    calculateWindowHeight() {
      if (document.getElementById('keiyakuGrid') != null) {
        document.getElementById('keiyakuGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },

    onDatepicker(daySelectType) {
      this.daySelectType = daySelectType;
      this.datepicker_dialog = true;
      var elem = document.getElementById('datepickerDialog');
      if (daySelectType == 1) {
        elem.style.top = '50px';
        elem.style.left = '50px';
      }
      if (daySelectType == 2) {
        elem.style.top = '80px';
        elem.style.left = 'auto';
        elem.style.right = '200px';
      }
      if (daySelectType == 3 || daySelectType == 4) {
        elem.style.top = '160px';
        elem.style.left = 'auto';
        elem.style.right = 'auto';
      }
    },
    monthSelect(kbn) {
      let ex = kbn.split('-');
      if (this.daySelectType == 1) {
        this.getYmDisplay = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      if (this.daySelectType == 2) {
        this.getYmSend = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      if (this.daySelectType == 3) {
        this.keiyakukaisi = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      if (this.daySelectType == 4) {
        this.keiyakusyuryo = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }

      this.datepicker_dialog = false;
    },
    initialized: function (filter) {
      this.filter = filter;
      this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
      this.filter.showSortButtons = true;
    },
    selectedCityChanged(s) {
      s.header = this.cities[s.selectedIndex].name;
      this.onCity = this.cities[s.selectedIndex].id;
    },
    onAlphabetical() {
      this.userFilter();
    },
    onInitializeService(flexGrid) {
      let viewDataHistory = [];
      viewDataHistory.push({
        startHistoryDate: '2022/04/27',
        endHistoryDate: '',
      });
      viewDataHistory.push({
        startHistoryDate: '2022/04/27',
        endHistoryDate: '2022/04/29',
      });

      this.viewDataHistory = viewDataHistory;
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          console.log(ht);
          _self.open = false;
        }
      });
    },
    onInitializeServiceChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    onInitialized(flexGrid) {
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });

      let viewData = [];
      viewData.push({
        city: '東経市',
        code: '1000061',
        name: '長崎 千秋',
        kana: 'ﾅｶﾞｻｷﾁｱｷ',
        jyukyusyaBango: '1102580123',
        jyukyusyaJigyosyo: '相談支援事業所 ひなぎく',
        hogosya: '長崎 和夫',
        keiyakukaisi: '',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
        serviceNumber: 52,
        serviceDetail: '計画相談支援',
        jidosimei: '長崎 千秋',
      });
      viewData.push({
        city: '東経市',
        code: '1000063',
        name: '宮崎 太一',
        kana: 'ﾐﾔｻﾞｷ',
        jyukyusyaCode: '1100000123',
        jyukyusyaBango: '1102698712',
        jyukyusyaJigyosyo: '相談支援事業所 ひなぎく',
        hogosya: '宮崎 太一',
        keiyakukaisi: '',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
        serviceNumber: 52,
        serviceDetail: '計画相談支援',
        jidosimei: '',
      });
      viewData.push({
        city: '西経市',
        code: '1000118',
        name: '佐賀 正雄',
        kana: 'ｻｶﾞ',
        jyukyusyaCode: '1100000123',
        jyukyusyaBango: '1102698712',
        jyukyusyaJigyosyo: '相談支援事業所 ひなぎく',
        hogosya: '長崎和夫',
        keiyakukaisi: '2022/04/25',
        keiyakusyuryo: '2022/04/30',
        syuryoriyu: '',
        print: '',
        serviceNumber: 52,
        serviceDetail: '計画相談支援',
        jidosimei: '',
      });
      this.viewDataDefault = viewData;
      this.userFilter();
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          if (e.col == 0 || e.col == 2 || e.col == 4) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
          if (e.col <= 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.color = sysConst.COLOR.fontColor;
          }
        }
      });
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          console.log(tmpitem);
          _self.userName = tmpitem.code + ' ' + tmpitem.name;
          _self.jyukyusyaCode = tmpitem.jyukyusyaCode;
          _self.jyukyusyaBango = tmpitem.jyukyusyaBango;
          _self.jyukyusyaJigyosyo = tmpitem.jyukyusyaJigyosyo;
          _self.hogosya = tmpitem.hogosya;
          _self.serviceNumber = tmpitem.serviceNumber;
          _self.serviceDetail = tmpitem.serviceDetail;
          _self.jidosimei = tmpitem.jidosimei;
          _self.keiyakukaisi = tmpitem.keiyakukaisi;
          _self.keiyakusyuryo = tmpitem.keiyakusyuryo;
          _self.contactDialog = true;
        }
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
      this.noneFilters('print');
      this.noneFilters('syuryoriyu');
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewDataDefault.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');
      if (this.onCity) {
        let cityname = this.cities[this.onCity].name;
        const cities = tmpviewdata.filter((value) => value.city === cityname);
        tmpviewdata = cities;
      }

      this.viewData = tmpviewdata;
    },
    noneFilters(name) {
      var Nonefilter = '';
      Nonefilter = this.filter.getColumnFilter(name);
      Nonefilter.filterType = 'None';
    },
    onSearch() {
      this.userFilter();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#datepickerDialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
}

div#keiyakuHokoku {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;

  .wj-state-selected,
  .wj-state-multi-selected {
    background-color: $grid_selected_background;
    color: $white !important;
  }
}
div#keiyakuGrid {
  font-size: 12px;
  .wj-header {
    font-weight: normal;

    &:nth-child(-n + 5) {
      background: $view_Title_background_Orange_Dark;
    }
    &:nth-child(n + 6) {
      background: $view_Title_background_Blue;
    }
    &:last-child {
      background: $light-white;
    }
  }
}
div#serviceHistoryGrid {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: var(--height);
}

/*----------------------------
* メニュー本体
*----------------------------*/
.history_menu {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background: $view_Title_background;
}

/*----------------------------
* メニュー内タイトル・ボタン
*----------------------------*/
.history_title {
  width: 280px;
  height: 30px;
  text-align: center;
  color: $view_Title_font_color_Main;
  background-color: $view_Title_background_Main;
  position: relative;

  label {
    line-height: 30px;
  }

  .v-btn {
    &.history_close {
      position: absolute;
      top: 5px;
      right: 10px;
      color: $grid_selected_color;
      background-color: $view_Title_font_color_Main;
    }
  }
}

/*----------------------------
* アニメーション部分
*----------------------------*/

/* アニメーション前のメニューの状態 */
.history_menu {
  transform: translateX(100vw);
  transition: all 0.3s linear;
}
/* アニメーション後のメニューの状態 */
.history_menu.is-active {
  transform: translateX(0);
}
</style>
