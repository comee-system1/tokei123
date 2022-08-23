<template>
  <div id="monitoringHoukokusho">
    <v-container class="ml-1 pa-0" fluid>
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
          <v-row
            no-gutters
            class="mt-1 pa-1"
            style="height: 28px; background: #d7eeff"
          >
            <v-row no-gutters class="rowStyle">
              <v-card class="koumokuTitle pa-1" outlined tile>
                利用者名
              </v-card>
              <v-card class="koumokuData ml-1" tile outlined>
                {{ userData.riyocodeD }} {{ userData.names }}
              </v-card>
              <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
                計画作成日
              </v-card>
              <v-card
                class="koumokuData ml-1"
                style="width: 125px; text-align: center"
                tile
                outlined
              >
                {{ keikakuYmd }}
              </v-card>
              <v-layout class="right">
                <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
                  同意署名欄
                </v-card>
                <v-card
                  class="koumokuData pa-1 ml-1"
                  style="width: 25px"
                  outlined
                  tile
                >
                </v-card>
                <v-card
                  class="koumokuData pa-1 ml-1"
                  style="width: 125px"
                  outlined
                  tile
                >
                </v-card>
              </v-layout>
            </v-row>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 入力 </v-card>
            <v-btn-toggle class="flex-wrap mr-1" mandatory>
              <v-btn
                v-for="n in inputList"
                :key="n.val"
                small
                color="secondary"
                dark
                outlined
                @click="inputClicked(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
              実施日
            </v-card>
            <v-card
              class="mr-1"
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
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getYmd() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 mr-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(1)"
              >
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(2)"
              >
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
              担当者
            </v-card>
            <v-card class="koumokuData" tile style="width: 125px" outlined>
              担当者名
            </v-card>
            <v-layout class="right">
              <v-btn
                class="itemBtn mr-1"
                :loading="loading"
                @click="searchClicked()"
              >
                前回コピー
              </v-btn>
              <v-btn
                class="itemBtn"
                :loading="loading"
                @click="searchClicked()"
              >
                履歴参照
              </v-btn>
            </v-layout>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div style="width: 50%; height: 100px">
              <v-card class="koumokuTitle_c pa-1" outlined tile>
                総合的な援助の方針
              </v-card>
              <v-card class="koumokuData2 pa-1" outlined tile>
                総合的な援助の方針
              </v-card>
            </div>
            <div style="width: 50%; height: 100px">
              <v-card class="koumokuTitle_c pa-1" outlined tile>
                全体の状況
              </v-card>
              <v-card class="koumokuData2 pa-1" outlined tile>
                総合的な援助の方針
              </v-card>
            </div>
          </v-row>

          <v-row class="ma-0 mt-1" no-gutters>
            <wj-flex-grid
              id="icrnGrid"
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
              :initialized="onInitializeIcrnGrid"
              :formatItem="onFormatItemyaIcrn"
              :itemsSourceChanging="onItemsSourceChanging"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewdata"
            >
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-spacer></v-spacer>
            <v-card class="koumokuTitleShort pa-1 mr-1" outlined tile>
              結果
            </v-card>
            <v-btn-toggle class="flex-wrap mr-1" v-model="kekkaIndex" mandatory>
              <v-btn
                v-for="n in kekkaList"
                :key="n.val"
                small
                color="secondary"
                dark
                outlined
                @click="kekkaClicked(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-layout class="rowStyle" v-if="kekkaIndex == 3">
              <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
                ｻｰﾋﾞｽ終了日
              </v-card>
              <v-btn
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getYmd() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-layout>
            <v-layout class="rowStyle" v-else>
              <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
                次回案作成月
              </v-card>
              <v-btn
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getYmd() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-layout>
            <v-layout class="right">
              <v-card class="koumokuTitleShort pa-1 ml-1" outlined tile>
                完了
              </v-card>
              <v-card
                class="koumokuData pa-1 ml-1"
                style="width: 25px"
                outlined
                tile
              >
              </v-card>
              <v-card
                class="koumokuData pa-1 ml-1"
                style="width: 100px"
                outlined
                tile
              >
              </v-card>
              <v-btn
                class="itemBtn mr-1"
                :loading="loading"
                @click="searchClicked()"
              >
                登録
              </v-btn>
            </v-layout>
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
        type="date"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect"
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
import * as wjGrid from '@grapecity/wijmo.grid';
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
      userData: {},
      keikakuYmd: '',
      headerList: [
        {
          dataname: 'jissi',
          title: '実施',
          kbntitle: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'mokuhyo',
          title: '支援目標',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'jiki',
          title: '達成時期',
          kbntitle: '',
          width: '4*',
          align: 'left',
        },
        {
          dataname: 'jyoukyou',
          title: 'サービス提供状況\n(事業所からの聞取り)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'manzokudo',
          title: '本人の感想・満足度',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tasseikan',
          title: '支援目標の達成感\n(ニーズの充足度)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'kaiketuhouhou',
          title: '今後の課題・解決方法',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'kind1',
          kbntitle: '計画変更の必要性',
          title: '種類',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'kind2',
          kbntitle: '計画変更の必要性',
          title: '種類',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'ryou1',
          kbntitle: '計画変更の必要性',
          title: '量',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'ryou2',
          kbntitle: '計画変更の必要性',
          title: '量',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'syukan1',
          kbntitle: '計画変更の必要性',
          title: '週間',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'syukan2',
          kbntitle: '計画変更の必要性',
          title: '週間',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'その他',
          title: 'その他の留意事項',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
      ],
      viewdataAll: [],
      viewdata: [],
      kikanYmd: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      filteryoteisyaIcrn: {},
      targetYmd: '',
      selTantousya: 0,
      inputList: [
        { val: 0, name: '新規' },
        { val: 1, name: '修正' },
      ],
      kekkaIndex: 0,
      kekkaList: [
        { val: 0, name: '継続' },
        { val: 1, name: '中途月変更' },
        { val: 2, name: '終期月更新' },
        { val: 3, name: 'サービス終了' },
      ],
      loading: false,
      marginDefault: true,
      moveRight: false,
      moveLeft: false,
      mltype: '',
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
    onInitializeIcrnGrid(flexGrid) {
      // flexGrid.beginUpdate();
      // クリックイベント
      // flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
      //   let ht = flexGrid.hitTest(e);
      //   if (ht.panel == flexGrid.cells) {
      //     // let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
      //     // this.setDispdata(tmpitem);
      //     // this.tourokuScreenFlag = true;
      //   }
      // });
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row + 5;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.name = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.allowResizing = true;
        // if (colIndex == 3 || colIndex == 11 || colIndex == 19) {
        //   col.format = sysConst.FORMAT.Ymd;
        // } else if (colIndex == 17) {
        //   col.format = sysConst.FORMAT.Ym;
        // }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.headerList[colIndex].kbntitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.headerList[colIndex].title
        );
      }
      // flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },

    onItemsSourceChanged(flexGrid) {
      this.screenFlag = false;
      this.loading = false;
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },

    onFormatItem(flexGrid, e) {
      console.log(flexGrid);
      console.log(e);
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
    getYmd() {
      if (!this.kikanYmd) {
        this.kikanYmd = moment();
        this.picker =
          this.kikanYmd.year() +
          '-' +
          this.kikanYmd.format('MM') +
          '-' +
          this.kikanYmd.format('DD');
      }
      return (
        this.kikanYmd.format('YYYY') +
        '年' +
        this.kikanYmd.format('MM') +
        '月' +
        this.kikanYmd.format('DD') +
        '日'
      );
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.kikanYmd = this.kikanYmd.subtract(1, 'days');
      } else if (kbn == 2) {
        this.kikanYmd = this.kikanYmd.add(1, 'days');
      }
      this.picker =
        this.kikanYmd.format('YYYY') +
        '-' +
        this.kikanYmd.format('MM') +
        '-' +
        this.kikanYmd.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.viewdatayoteisya = [];
      }
    },
    daySelect() {
      let split = this.picker.split('-');
      this.kikanYmd = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: Number(split[2]),
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
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      console.log(row);
      this.userData = row;
      this.keikakuYmd = '2022年12月12日';
      // this.userInfo = row;
      // if (this.userInfo.riid == 0) {
      //   this.dispUserName = '';
      // } else {
      //   this.dispUserName =
      //     String(this.userInfo.riyocode).padStart(7, '0') +
      //     ' ' +
      //     this.userInfo.names +
      //     ' (' +
      //     this.userInfo.age +
      //     '歳）';
      // }
      // this.rirekiSearchClicked(
      //   this.kikanSymd.format('YYYYMMDD'),
      //   this.kikanEymd.format('YYYYMMDD'),
      //   this.userInfo.riid
      // );
    },
    getSelectUserChildComponent(data) {
      console.log(data);
    },
    inputClicked(kbn) {
      console.log(kbn);
    },
    kekkaClicked(index) {
      this.kekkaIndex = index;
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
    min-width: 275px;
    max-width: 275px;
    // height: 87vh;
  }
  .rightArea {
    min-width: 1050px;
    max-width: 1050px;
    // width: 1020px;
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
  .koumokuTitleShort {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    min-width: 50px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    width: 200px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuTitle_c {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 300px;
    height: 20px;
    text-align: center;
    background: $view_Title_background;
  }
  .koumokuData2 {
    color: $font_color;
    width: 100%;
    height: 80px;
    text-align: left;
    background: $white;
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
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

  #icrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: auto;
    // min-width: 1250px;
    height: 55vh;
    // min-height: 300px;
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
      transform: translateX(-270px);
    }
  }
  @keyframes slideRightArea {
    from {
      transform: translateX(-270px);
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
  top: 120px;
  left: 500px;
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
