<template>
  <div id="keiyakuHokoku" :style="styles">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters class="rowStyle mb-1 mt-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
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
          <v-btn small v-for="val in service" :key="val.id" height="20">{{
            val.name
          }}</v-btn>
        </v-btn-toggle>
        <v-card class="koumokuTitle titleMain pa-1 mr-1 ml-1" outlined tile>
          対象者
        </v-card>
        <v-btn-toggle dense mandatory v-model="onTarget">
          <v-btn small v-for="val in target" :key="val.id" height="20">{{
            val.name
          }}</v-btn>
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
          @click="contactDialog = false"
          class="mt-2 dialog_close"
          ><v-icon dark small> mdi-close </v-icon>
        </v-btn>
      </v-card>
      <v-card class="pa-2" tile flat>
        <div class="history_menu pa-2" v-bind:class="{ 'is-active': open }">
          <wj-flex-grid
            id="serviceHistoryGrid"
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
        <v-card class="d-flex justify-start common_dialog" flat tile>
          <v-card outlined tile dark class="dialog_label"> 利用者名 </v-card>
          <v-card
            width="650"
            class="text-caption lightYellow"
            elevation="0"
            outlined
            tile
            >{{ userName }}
          </v-card>
        </v-card>
        <v-card class="d-flex justify-start mt-1 common_dialog" flat tile>
          <v-card outlined tile class="dialog_label"> 相談事業者 </v-card>
          <v-card
            width="140"
            class="text-caption lightYellow text-center"
            elevation="0"
            outlined
            tile
            >{{ jyukyusyaCode }}
          </v-card>
          <v-card
            width="510"
            class="text-caption lightYellow"
            elevation="0"
            outlined
            tile
            >{{ jyukyusyaJigyosyo }}
          </v-card>
        </v-card>
        <v-card class="d-flex justify-start mt-1 common_dialog" flat tile>
          <v-card outlined tile class="dialog_label"> サービス内容 </v-card>
          <v-card
            width="40"
            class="text-caption lightYellow text-center"
            elevation="0"
            outlined
            tile
            >{{ serviceNumber }}
          </v-card>
          <v-card
            width="610"
            class="text-caption lightYellow"
            elevation="0"
            outlined
            tile
            >{{ serviceDetail }}
          </v-card>
        </v-card>
        <div class="pa-4 bgColor mt-1">
          <v-card
            class="d-flex justify-start mt-1"
            flat
            tile
            color="transparent"
          >
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
              color="transparent"
              dark
            >
              受給者番号
            </v-card>
            <v-card
              width="140"
              class="text-caption lightYellow text-center"
              elevation="0"
              outlined
              tile
              >{{ jyukyusyaBango }}
            </v-card>
          </v-card>
          <v-card
            class="d-flex justify-start mt-1"
            flat
            tile
            color="transparent"
          >
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
              color="transparent"
              dark
            >
              支給決定障害者<br />(保護者)
            </v-card>
            <v-card
              width="300"
              height="24"
              class="text-caption lightYellow"
              elevation="0"
              outlined
              tile
              >{{ jyukyusyaBango }}
            </v-card>
          </v-card>
          <v-card
            class="d-flex justify-start mt-1"
            flat
            tile
            color="transparent"
          >
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
              color="transparent"
              dark
            >
              児童氏名
            </v-card>
            <v-card
              width="300"
              height="24"
              class="text-caption lightYellow"
              elevation="0"
              outlined
              tile
              >{{ jidosimei }}
            </v-card>
          </v-card>
        </div>
        <div class="pa-4 bgBorder mt-1 common_dialog">
          <v-card class="d-flex justify-start mt-1" flat tile>
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
            >
              契約締結
            </v-card>
            <v-card
              width="140"
              class="text-caption text-center"
              elevation="0"
              outlined
              tile
              color="primary"
              dark
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
            <v-card elevation="0" tile class="label text-caption ml-auto">
              <v-btn class="func_btn" small v-on:click="open = !open"
                >履歴参照</v-btn
              >
            </v-card>
          </v-card>
          <v-card class="d-flex justify-start mt-1" flat tile>
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
            >
              契約終了
            </v-card>
            <v-card
              width="140"
              class="text-caption text-center"
              elevation="0"
              outlined
              tile
              color="primary"
              dark
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
          </v-card>
          <v-card class="d-flex justify-start mt-1" flat tile>
            <v-card
              elevation="0"
              width="120"
              class="text-center label text-caption"
            >
              &nbsp;
            </v-card>
            <v-card
              width="140"
              class="text-caption text-center pt-6"
              elevation="0"
              outlined
              tile
              color="primary"
              dark
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
          </v-card>
          <v-row>
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
        name: '熊本 忠雄',
        kana: 'ｸﾏﾓﾄﾀﾀﾞｵ',
        jyukyusyaBango: '1102580123',
        jyukyusyaJigyosyo: '相談支援事業所 ひなぎく',
        hogosya: '長崎 和夫',
        keiyakukaisi: '',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
        serviceNumber: 52,
        serviceDetail: '計画相談支援',
        jidosimei: '',
      });
      viewData.push({
        city: '東経市',
        code: '1000063',
        name: '宮崎 太一',
        kana: 'ﾐﾔｻﾞｷ',
        jyukyusyaCode: '1100000123',
        jyukyusyaBango: '1102698712',
        jyukyusyaJigyosyo: '相談支援事業所 ひなぎく',
        hogosya: '',
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
.bgColor {
  background-color: $grid_selected_background;
}
.bgBorder {
  border: 2px solid $grid_selected_background;
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
