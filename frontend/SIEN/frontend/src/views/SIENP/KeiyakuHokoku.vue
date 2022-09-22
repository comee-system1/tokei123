<template>
  <div id="keiyakuHokoku">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <div class="mt-1">
        <v-card class="d-flex flex-row" flat>
          <v-card
            :color="'grey lighten-4 pt-1'"
            elevation="0"
            tile
            small
            width="100"
            height="28"
            class="text-center"
          >
            サービス
          </v-card>
          <v-btn-toggle class="ml-1" dense mandatory v-model="onService">
            <v-btn small v-for="val in service" :key="val.id">{{
              val.name
            }}</v-btn>
          </v-btn-toggle>
          <v-card
            :color="'grey lighten-4 pt-1'"
            elevation="0"
            tile
            small
            width="100"
            height="28"
            class="text-center ml-1"
          >
            対象者
          </v-card>
          <v-btn-toggle class="ml-1" dense mandatory v-model="onTarget">
            <v-btn small v-for="val in target" :key="val.id">{{
              val.name
            }}</v-btn>
          </v-btn-toggle>
          <v-btn small class="ml-3" @click="onSearch">検索開始</v-btn>
        </v-card>
        <v-card class="d-flex flex-row mt-1" flat>
          <v-card
            :color="'grey lighten-4 pt-1'"
            elevation="0"
            tile
            small
            width="100"
            height="28"
            class="text-center"
          >
            市区町村
          </v-card>
          <wj-menu
            :itemClicked="selectedCityChanged"
            selectedValuePath="id"
            displayMemberPath="name"
            class="customCombobox ml-1"
            :isRequired="true"
          >
            <wj-menu-item v-for="val in cities" :key="val.id">{{
              val.name
            }}</wj-menu-item>
          </wj-menu>
        </v-card>
        <v-card class="d-flex flex-row mt-1" flat>
          <v-card>
            <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
            </alphabet-button>
          </v-card>
          <v-card class="ml-auto d-flex flex-row" elevation="0">
            <v-card
              :color="'lime lighten-4 pt-1'"
              elevation="0"
              tile
              small
              width="100"
              height="24"
              class="text-center"
            >
              契約済人数
            </v-card>
            <v-card elevation="0" class="ml-3 pt-1"> 999名 </v-card>
          </v-card>
        </v-card>
      </div>
      <div class="mt-1">
        <wj-flex-grid
          id="keiyakuGrid"
          :itemsSource="viewData"
          :autoClipboard="false"
          :selectionMode="'1'"
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
          <wj-flex-grid-filter :initialized="initialized"></wj-flex-grid-filter>
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
  </div>
</template>

<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    AlphabetButton,
  },
  mounted() {},
  data: function () {
    return {
      filter: '',
      onService: '',
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
    };
  },

  methods: {
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
    onInitialized(flexGrid) {
      let viewData = [];
      viewData.push({
        city: '東経市',
        code: '1000061',
        name: '熊本 忠雄',
        kana: 'ｸﾏﾓﾄﾀﾀﾞｵ',
        jyukyusyaBango: '1102580123',
        hogosya: '長崎 和夫',
        keiyakukaisi: '',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
      });
      viewData.push({
        city: '東経市',
        code: '1000063',
        name: '宮崎 太一',
        kana: 'ﾐﾔｻﾞｷ',
        jyukyusyaBango: '1102698712',
        hogosya: '',
        keiyakukaisi: '',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
      });
      viewData.push({
        city: '西経市',
        code: '1000118',
        name: '佐賀 正雄',
        kana: 'ｻｶﾞ',
        jyukyusyaBango: '1102698712',
        hogosya: '長崎和夫',
        keiyakukaisi: '2022/04/25',
        keiyakusyuryo: '',
        syuryoriyu: '',
        print: '',
      });
      this.viewDataDefault = viewData;
      this.userFilter();

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          if (e.col == 0 || e.col == 2 || e.col == 4) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
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

div#keiyakuHokoku {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;
}
</style>
