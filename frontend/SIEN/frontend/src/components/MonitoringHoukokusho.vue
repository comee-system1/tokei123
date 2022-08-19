<template>
  <div id="monitoringHoukokusho">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters>
        <v-col class="leftArea">
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            :dispHideBar="true"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
            @childLeftArea="changeLeftArea"
          >
          </user-list>
        </v-col>
        <v-col
          :class="{
            rightArea: marginDefault == true,
            'ml-1': mltype == true,
            moveLeft: moveLeft == true,
            moveRight: moveRight == true,
          }"
          class="ml-1 pa-0"
        >
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 利用者名 </v-card>
            <v-card class="koumokuData ml-1 pa-1" tile outlined>
              {{ tantouData.code }} {{ tantouData.name }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 表示月 </v-card>
            <v-card
              class="ml-1"
              color="transparent"
              height="100%"
              style="border: none"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="125px"
                height="100%"
                >{{ getYm() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 ml-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(1)"
              >
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 ml-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(2)"
              >
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card>
            <v-btn
              class="itemBtn ml-1"
              :loading="loading"
              @click="searchClicked()"
            >
              検索
            </v-btn>
            <v-btn
              class="itemBtn ml-1"
              style="width: 125px"
              @click="filterClrclick()"
            >
              フィルタクリア
            </v-btn>
          </v-row>
          <v-row class="rowStyle mt-1" no-gutters> </v-row>
          <v-row class="ma-0 mt-1" no-gutters>
            <!-- <wj-flex-grid
          id="yoteisyaIcrnGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializeyoteisyaIcrnGrid"
          :formatItem="onFormatItemyoteisyaIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatayoteisya"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedyoteisyaIcrn"
            :filterApplied="filterApplied"
          />
        </wj-flex-grid> -->
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepicker"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-overlay class="text-center" id="load_dialog" v-show="screenFlag">
      <v-progress-circular
        v-show="screenFlag"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import moment from 'moment';
// import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
// import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
// import MdSelect from '../components/MdSelect.vue';
// const STYLE_BG_PREBIRTH = '#ffcccc';
import UserList from '../components/UserList.vue';
export default {
  components: { UserList },
  data() {
    return {
      yoteisyaIcrnHeaderList: [
        {
          dataname: 'code',
          title: 'コード',
          kbntitle: '基本情報',
          chutitl: '',
          width: 70,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          kbntitle: '基本情報',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          kbntitle: '基本情報',
          chutitl: '',
          width: 70,
          align: 'left',
        },
        {
          dataname: 'sakuseiymd',
          title: '作成日',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'yousiki',
          title: '様\n式',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: 35,
          align: 'center',
        },
        {
          dataname: 'yoteiMonth',
          title: '予定\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'endMonth',
          title: '終\n期\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: 25,
          align: 'center',
        },

        // {
        //   dataname: 'yoteigai',
        //   title: '予\n外',
        //   kbntitle: 'モニタリング報告書',
        //   chutitl: '区分',
        //   width: 40,
        //   align: 'center',
        // },
        {
          dataname: 'chusi',
          title: '中\n止',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'enki',
          title: '延\n期',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'riyu',
          title: '理由',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 100,
          align: 'left',
        },
        {
          dataname: 'jikaiMonth',
          title: '次回\n予定月',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 60,
          align: 'center',
        },

        {
          dataname: 'jissiYmd',
          title: '実施日',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '実\n施',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'syukankeikaku',
          title: '週\n間\n計\n画',
          kbntitle: '',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'doui',
          title: '同\n意',
          kbntitle: '',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'henkou',
          title: '変\n更',
          kbntitle: '計画案',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'kousin',
          title: '更\n新',
          kbntitle: '計画案',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'nextMonth',
          title: '次回\n作成月',
          kbntitle: '計画案',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'serviceend',
          title: 'サ\n|\nビ\nス終\n了',
          kbntitle: '',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'kaigiYmd',
          title: '実施日',
          kbntitle: '担当者会議',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'kasan',
          title: '加\n算',
          kbntitle: '担当者会議',
          chutitl: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'tantousya',
          title: '担当者',
          kbntitle: '',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
          align: 'left',
        },
      ],
      viewdatayoteisyaAll: [],
      viewdatayoteisya: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      filteryoteisyaIcrn: {},
      targetYmd: '',
      selTantousya: 0,
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      siborikomiIndex: 0,
      siborikomiList: [
        { val: 0, name: '予定月' },
        { val: 1, name: '実施月' },
      ],
      yousikiIndex: 0,
      yousikiList: [
        { val: 0, name: '全部' },
        { val: 1, name: '障害者' },
        { val: 2, name: '障害児' },
      ],
      loading: false,
      marginDefault: true,
      moveRight: false,
      moveLeft: false,
    };
  },
  mounted() {},
  methods: {
    /*******************************
     * ユーザー一覧コンポーネントの開閉ボタンを押下
     */
    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveRight = true;
        this.moveLeft = false;
        this.headerWidth = { 2: 40, 3: 90, 4: 34 };
      } else {
        this.moveLeft = true;
        this.moveRight = false;
        this.headerWidth = { 2: 140, 3: 190, 4: 64 };
      }

      // if (this.riid) {
      //   this.createHeader(this.mainGrid);
      // }
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        // uketukeIcrn(this.targetYmd).then((result) => {
        //   this.viewdataAll = result;
        //   this.userFilter();
        //   this.screenFlag = false;
        // });
        this.createdemodata();
        this.userFilter();
      } else {
        this.userFilter();
      }
    },
    createdemodata() {
      let result = [];
      let ymd;
      for (let i = 1; i <= 100; i++) {
        let d = new Date('2022', Number('12') - 1, '01');
        if (i < 20 && i < 30) {
          d = new Date('2022', Number('12') - 1, '11');
        } else if (i < 30 && i < 40) {
          d = new Date('2022', Number('12') - 1, '21');
        } else {
          d = new Date('2022', Number('12') - 1, '31');
        }
        ymd = d;

        result.push({
          codebk: String(1000000 + i),
          code: String(1000000 + i),
          name: '東経 ' + i + '太郎',
          sichoson: '新東経西市',
          sakuseiymd: ymd,
          yousiki: '者',
          yoteiMonth: 'xx月',
          endMonth: '○',
          chusi: '',
          enki: '',
          riyu: '',
          jikaiMonth: '',
          jissiYmd: ymd,
          jissi: '●',
          syukankeikaku: '●',
          doui: '●',
          henkou: '●',
          kousin: '●',
          nextMonth: ymd,
          serviceend: '○',
          kaigiYmd: ymd,
          kasan: '○',
          tantousya: '五文字太郎',
          age: 100,
        });

        if (i == 1) {
          result[i - 1].enki = '○';
          result[i - 1].riyu = '自己都合';
          result[i - 1].jikaiMonth = 'xx月';
          result[i - 1].jissiYmd = '';
          result[i - 1].jissi = '';
          result[i - 1].syukankeikaku = '';
          result[i - 1].doui = '';
          result[i - 1].henkou = '';
          result[i - 1].kousin = '';
          result[i - 1].nextMonth = '';
          result[i - 1].serviceend = '';
          result[i - 1].kaigiYmd = '';
          result[i - 1].kasan = '';
        }
        if (i == 2) {
          result[i - 1].chusi = '○';
          result[i - 1].riyu = '自己都合';
          result[i - 1].jikaiMonth = '-';
          result[i - 1].jissiYmd = '';
          result[i - 1].jissi = '';
          result[i - 1].syukankeikaku = '';
          result[i - 1].doui = '';
          result[i - 1].henkou = '';
          result[i - 1].kousin = '';
          result[i - 1].nextMonth = '';
          result[i - 1].serviceend = '';
          result[i - 1].kaigiYmd = '';
          result[i - 1].kasan = '';
        }
        if (i == 3) {
          result[i - 1].yousiki = '児';
          result[i - 1].age = 17;
        }
      }
      this.viewdatayoteisyaAll = result;
    },

    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdatayoteisyaAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      if (this.yousikiIndex == 1) {
        tmpviewdata = tmpviewdata.filter((x) => x.yousiki == '者');
      } else if (this.yousikiIndex == 2) {
        tmpviewdata = tmpviewdata.filter((x) => x.yousiki == '児');
      }
      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.id < b.id) {
      //       return -1;
      //     }
      //     if (a.id > b.id) {
      //       return 1;
      //     }
      //     // 二次キーは交付日
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //利用者名でソート
      // if (this.sortSearch == 1) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.kana < b.kana) {
      //       return -1;
      //     }
      //     if (a.kana > b.kana) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //受給者番号でソート
      // if (this.sortSearch == 2) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.nobk < b.nobk) {
      //       return -1;
      //     }
      //     if (a.nobk > b.nobk) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      this.viewdatayoteisya = tmpviewdata;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = moment().startOf('months');
        this.picker = this.kikanYm.year() + '-' + this.kikanYm.format('MM');
      }
      return (
        this.kikanYm.format('YYYY') + '年' + this.kikanYm.format('MM') + '月'
      );
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.kikanYm = this.kikanYm.subtract(1, 'months');
      } else if (kbn == 2) {
        this.kikanYm = this.kikanYm.add(1, 'months');
      }
      this.picker =
        this.kikanYm.format('YYYY') +
        '-' +
        this.kikanYm.format('MM') +
        '-' +
        this.kikanYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.viewdatayoteisya = [];
      }
    },
    monthSelect() {
      let split = this.picker.split('-');
      this.kikanYm = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.viewdatayoteisya = [];
      this.datepicker_dialog = false;
    },
    filterClrclick() {
      this.filteryoteisyaIcrn.clear();
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#monitoringHoukokusho {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

  .leftArea {
    min-width: 285px;
    max-width: 285px;
    // height: 87vh;
  }
  .rightArea {
    min-width: 1020px;
    max-width: 1020px;
    .rowStyle {
      height: 20px;
    }
  }

  #load_dialog {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
    width: 100%;
    height: 100%;
    z-index: 4;
    padding: 0;
    margin: 0;
  }

  .ymd,
  .v-btn:not(.addbtn, .itemBtn) {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .hosokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    > .premonth {
      background: #ffcccc;
    }
  }

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
    width: 75px;
  }

  #yoteisyaIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
    }
    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    .wj-cell {
      padding: 2px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
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
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }

  #yoteisyaIcrnGrid {
    width: auto;
    // min-width: 1250px;
    height: 70vh;
    min-height: 500px;
  }
  .v-btn-toggle > .v-btn {
    // width: 150px;
    height: 20px;
  }
  div.customCombobox {
    position: relative;
    width: 125px !important;
    height: 20px !important;
    &.customCombobox {
      width: 160px !important;
      div {
        text-align: left;
      }
    }
    &#comboFiltersKasan {
      width: 250px !important;
    }
    .wj-btn.wj-btn-default {
      border-left: none !important;
    }
    &:hover {
      background-color: #e1e1e1;
    }
    &:focus {
      background-color: #fff;
    }
    div * {
      height: 21px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 8px;
      }
      &.wj-form-control {
        position: absolute;
        top: -3px;
        width: 100%;
      }
    }
    input {
      height: 20px !important;
    }
  }
  .v-input--selection-controls .v-input__slot > .v-label {
    font-size: 14px;
  }
  .moveLeft {
    animation: slideLeftArea $seconds forwards;
  }
  .moveRight {
    animation: slideRightArea $seconds forwards;
  }
  @keyframes slideLeftArea {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-275px);
    }
  }
  @keyframes slideRightArea {
    from {
      transform: translateX(-275px);
    }
    to {
      transform: translateX(0);
    }
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#monitoringHoukokushoDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 70px;
  width: 300px;
  max-width: 300px;

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: blue;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: red;
  }
}
</style>
