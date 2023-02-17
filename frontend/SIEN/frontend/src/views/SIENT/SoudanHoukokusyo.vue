<template>
  <div id="soudanHoukokusyo">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          帳票種類
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selCyouhyou"
          style="width: 400px"
        >
          <option
            v-for="val in cyouhyouList"
            :key="val.ptnid"
            :value="val.ptnid"
          >
            {{ val.name }}
          </option>
        </select>
      </v-row>
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入力区分
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selInputKbn"
          style="width: 150px"
        >
          <option v-for="val in viewKbnList" :key="val.id" :value="val.id">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          集計日
        </v-card>
        <v-card
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(0)"
            elevation="2"
            tile
            outlined
            width="150px"
            height="19"
            class="btnymd pa-0 mr-1"
            >{{ getSyukeiYmd }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          期間指定
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div v-for="item in kikanList" :key="item.val" class="radioInline">
            <input
              type="radio"
              :id="'SoudanHoukokusyo-' + item.val"
              v-model="selKikanIndex"
              :value="item.val"
            />
            <label
              :for="'SoudanHoukokusyo-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-layout v-show="selKikanIndex == 0">
          <v-card elevation="2" tile outlined height="19" class="d-flex mr-1">
            <datepickerYear
              :value="kikanYPicker"
              v-model="kikanYPicker"
              minimum-view="year"
              format="yyyy年度"
              class="nendo"
              ref="kikanYPickerRef"
            />
            <v-icon small @click="kikanYPickerclicked"
              >mdi-calendar-month</v-icon
            >
          </v-card>
          <v-btn
            elevation="2"
            class="btnymd pa-0 ma-0 mr-1"
            height="19"
            tile
            @click="nendo(-1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
            前年
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 ma-0 mr-1"
            height="19"
            tile
            @click="nendo(1)"
          >
            翌年
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>

          <v-btn class="mr-1" height="19" @click="searchClicked()">
            <v-icon dense>mdi-magnify</v-icon>
            検索
          </v-btn>
        </v-layout>
        <v-layout v-show="selKikanIndex == 1">
          <v-btn
            @click="inputCalendarClick(1)"
            elevation="2"
            tile
            outlined
            width="125px"
            height="19"
            class="btnymd pa-0 ma-0 mr-1"
            >{{ getkikanSYm }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <label class="mr-1">～</label>
          <v-btn
            @click="inputCalendarClick(2)"
            elevation="2"
            tile
            outlined
            width="125px"
            height="19"
            class="btnymd pa-0 ma-0 mr-1"
            >{{ getkikanEYm }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn class="mr-1" height="19" @click="searchClicked()">
            <v-icon dense>mdi-magnify</v-icon>
            検索
          </v-btn>
        </v-layout>
      </v-row>
      <div no-gutters class="ma-0" id="soudanHoukokusyoScrollbody"></div>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_syukei"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="soudanHoukokusyodatepicker1"
        type="date"
        v-model="syukeiPicker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_kikanSYm"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="soudanHoukokusyodatepicker1"
        type="month"
        v-model="kikanSYmPicker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(1)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_kikanEYm"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="soudanHoukokusyodatepicker1"
        type="month"
        v-model="kikanEYmPicker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(2)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import datepickerYear from 'vuejs-datepicker';
import printUtil from '@/utiles/printUtil';
import messageConst from '@/utiles/MessageConst';
import { getConnect } from '../../connect/getConnect';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    datepickerYear,
  },
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      selCyouhyou: 0,
      cyouhyouList: [],
      selInputKbn: 0,
      selKikanIndex: 0,
      kikanList: [
        { val: 0, name: '年度指定' },
        { val: 1, name: '月日指定' },
      ],
      datepicker_dialog_syukei: false,
      syukeiYmd: '',
      syukeiPicker: '',
      datepicker_dialog_kikanY: false,
      kikanY: '',
      kikanYPicker: dayjs().format('YYYY'),
      datepicker_dialog_kikanSYm: false,
      kikanSYm: '',
      kikanSYmPicker: '',
      datepicker_dialog_kikanEYm: false,
      kikanEYm: '',
      kikanEYmPicker: '',
      viewKbnList: [],
      viewDataAll: [],
      viewData: [],
      mainGrid: [],
      thickList: [2, 9],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.setPrintEvent();

    let params = {
      uniqid: 3,
      traceid: 123,
      pJigyoid: 62,
    };
    getConnect('/MstChohyo', params, 'SIENT')
      .then((result) => {
        this.cyouhyouList = result;
        if (this.cyouhyouList.length > 0) {
          this.selCyouhyou = this.cyouhyouList[0].ptnid;
        }
      })
      .catch(function (error) {
        alert(
          messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
        );
      });
    getConnect('/MstSyukeikbn', params, 'SIENT')
      .then((result) => {
        if (result !== undefined) {
          console.log(result);
          this.viewKbnList = result;
          this.viewKbnList.unshift({ id: 0, name: '（指定なし）' });
          this.selInputKbn = 0;
        }
      })
      .catch(function (error) {
        alert(
          messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
        );
      });
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  computed: {
    getSyukeiYmd() {
      if (!this.syukeiYmd) {
        this.initYmd();
      }
      return this.syukeiYmd.format('YYYY年MM月DD日');
    },
    getkikanSYm() {
      if (!this.kikanSYm) {
        this.initYmd();
      }
      return this.kikanSYm.format('YYYY年MM月');
    },
    getkikanEYm() {
      if (!this.kikanEYm) {
        this.initYmd();
      }
      return this.kikanEYm.format('YYYY年MM月');
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('soudanHoukokusyoScrollbody') != null) {
        document.getElementById('soudanHoukokusyoScrollbody').style.height =
          window.innerHeight - 110 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    initYmd() {
      this.syukeiYmd = dayjs();
      this.kikanSYm = dayjs();
      this.kikanEYm = dayjs();
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData();
    },
    setViewData() {
      this.createHtml();
      let symd = '';
      let eymd = '';
      if (this.selKikanIndex == 0) {
        let y = String(dayjs(this.kikanYPicker).format('YYYY'));
        let yplus = String(Number(dayjs(this.kikanYPicker).format('YYYY')) + 1);
        symd = this.kikanSYm.format(y + '0401');
        eymd = this.kikanEYm.format(yplus + '0331');
      } else {
        symd = this.kikanSYm.format('YYYYMM01');
        eymd = this.kikanEYm.format('YYYYMM31');
      }
      let params = {
        uniqid: 3,
        traceid: 123,
        pHostname: 'cl002',
        pJigyoid: 62,
        pRptid: this.selCyouhyou,
        pSymd: symd,
        pEymd: eymd,
        pSyuYmd: this.syukeiYmd.format('YYYYMMDD'),
        pResflg: 1,
        pSykkbn: this.selInputKbn,
        pNyusgid: 0,
        pTidayid: 0,
      };
      getConnect('/Houkokusyo', params, 'SIENT')
        .then((result) => {
          console.log(result);
          this.viewDataAll = result;
          this.createHtml();
          this.screenFlag = false;
        })
        .catch(function (error) {
          alert(
            messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
          );
        });
    },
    createHtml() {
      let rootEl = document.getElementById('soudanHoukokusyoScrollbody');
      rootEl.innerHTML = '';
      if (this.selKikanIndex == 0) {
        this.createInnerHtml(
          rootEl,
          null,
          0,
          '集計期間：' + this.kikanYPicker + '年度'
        );
      } else {
        this.createInnerHtml(
          rootEl,
          null,
          0,
          '集計期間：' + this.getkikanSYm + '～' + this.getkikanEYm
        );
      }

      for (let i = 0; i < this.viewDataAll.length; i++) {
        for (let j = 0; j < this.viewDataAll[i].buhin.length; j++) {
          this.createInnerHtml(
            rootEl,
            this.viewDataAll[i].buhin[j],
            String(i) + '-' + String(j)
          );
        }
      }
      this.screenFlag = false;
    },
    createInnerHtml(rootEl, buhin, index, text) {
      const start = ' <div class="rowdiv mb-1"><v-card class="';
      const vcardstart2 = ' pa-0 mr-1" outlined tile>';
      const end = '</v-card></div>';
      let el;
      if (buhin == null) {
        el = start + 'titleleft' + vcardstart2 + text + end;
        rootEl.insertAdjacentHTML('beforeend', el);
      } else if (buhin.datakbn == 1) {
        el = start + 'titlecenter' + vcardstart2 + buhin.title + end;
        rootEl.insertAdjacentHTML('beforeend', el);
      } else if (buhin.datakbn == 2) {
        el = start + 'titleleft' + vcardstart2 + buhin.title + end;
        rootEl.insertAdjacentHTML('beforeend', el);
      } else if (buhin.datakbn == 3) {
        el = start + 'midasi' + vcardstart2 + buhin.title + end;
        rootEl.insertAdjacentHTML('beforeend', el);
      } else if (buhin.datakbn == 4) {
        if (buhin.title.length > 0) {
          el =
            start + 'midasichu' + vcardstart2 + '<' + buhin.title + '>' + end;
          rootEl.insertAdjacentHTML('beforeend', el);
        }
        let gridid = 'grid' + index;
        el = ' <div id="' + gridid + '" class="grid"></div>';
        rootEl.insertAdjacentHTML('beforeend', el);

        // グリッドを作成してデータを表示します。
        let id = '#' + gridid;
        let grid = new wjGrid.FlexGrid(id, {
          allowAddNew: false,
          allowDelete: false,
          allowPinning: false,
          allowMerging: 'AllHeaders',
          allowResizing: true,
          allowSorting: false,
          allowDragging: false,
          selectionMode: 'None',
          isReadOnly: true,
          autoGenerateColumns: false,
          headersVisibility: 'All',
        });

        let colIndex = 0;
        Object.keys(buhin.naiyo_list.syukeidata[0]).forEach(function (key) {
          grid.columns.insert(colIndex, new wjGrid.Column());
          let col = grid.columns[colIndex];
          col.allowMerging = true;
          col.binding = key;
          col.header = '';
          colIndex++;
        });

        for (
          let colhead = 0;
          colhead < buhin.naiyo_list.title_listx.length;
          colhead++
        ) {
          if (colhead > 0) {
            grid.columnHeaders.rows.insert(colhead, new wjGrid.Row());
          }
          grid.columnHeaders.rows[colhead].allowMerging = true;
          let colIndex = 0;
          Object.keys(buhin.naiyo_list.title_listx[colhead]).forEach(function (
            key
          ) {
            grid.columnHeaders.setCellData(
              colhead,
              colIndex,
              buhin.naiyo_list.title_listx[colhead][key]
            );
            colIndex++;
          });
        }

        for (
          let rowheadCol = 0;
          rowheadCol < buhin.naiyo_list.title_listy.length;
          rowheadCol++
        ) {
          if (rowheadCol > 0) {
            grid.rowHeaders.columns.insert(rowheadCol, new wjGrid.Column());
          }
          grid.rowHeaders.columns[rowheadCol].allowMerging = true;
        }

        grid.itemsSourceChanged.addHandler(function (flexgrid) {
          //処理を記述
          for (let row = 0; row < flexgrid.rowHeaders.rows.length; row++) {
            grid.rowHeaders.rows[row].allowMerging = true;
          }
          for (
            let index = 0;
            index < flexgrid.rowHeaders.columns.length;
            index++
          ) {
            for (
              let row = 0;
              row < buhin.naiyo_list.title_listy[index].length;
              row++
            ) {
              flexgrid.rowHeaders.setCellData(
                row,
                index,
                buhin.naiyo_list.title_listy[index][row]
              );
            }
          }
          flexgrid.autoSizeColumns();
          flexgrid.autoSizeColumns(
            0,
            flexgrid.columnHeaders.columns.length,
            true
          );
          flexgrid.autoSizeRows();
        });
        // イベント設定後にitemsSourceを設定すること
        grid.itemsSource = buhin.naiyo_list.syukeidata; // autoGenerateColumnsの後にitemsSourceを設定すると反映されない
      }
    },

    inputCalendarClick(kbn) {
      if (kbn == 0) {
        this.syukeiPicker = this.syukeiYmd.format('YYYY-MM-DD');
        this.datepicker_dialog_syukei = true;
      } else if (kbn == 1) {
        this.kikanSYmPicker = this.kikanSYm.format('YYYY-MM-DD');
        this.datepicker_dialog_kikanSYm = true;
      } else if (kbn == 2) {
        this.kikanEYmPicker = this.kikanEYm.format('YYYY-MM-DD');
        this.datepicker_dialog_kikanEYm = true;
      }
    },
    kikanYPickerclicked() {
      this.$refs.kikanYPickerRef.showCalendar();
    },
    nendo(val) {
      this.kikanYPicker = String(
        Number(dayjs(this.kikanYPicker).format('YYYY')) + val
      );
    },
    calenderSelect(kbn) {
      if (kbn == 0) {
        this.syukeiYmd = dayjs(this.syukeiPicker);
        this.datepicker_dialog_syukei = false;
      } else if (kbn == 1) {
        this.kikanSYm = dayjs(this.kikanSYmPicker);
        this.datepicker_dialog_kikanSYm = false;
      } else if (kbn == 2) {
        this.kikanEYm = dayjs(this.kikanEYmPicker);
        this.datepicker_dialog_kikanEYm = false;
      }
    },

    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示期間：'; //+ this.getYm(0) + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.setPageSize(printUtil.SIZE.A3);
      printUtil.printExec('担当者別実施一覧', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#soudanHoukokusyo {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;
  #soudanHoukokusyoScrollbody {
    padding: 3px;
    border: 1px solid;
    border-color: $light-gray;
    min-height: 400px;
    height: 500px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  .grid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: auto;
    // width: 100%;
    // min-width: 1050px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    // min-height: 500px;
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
      background: $view_Title_background_Orange;
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
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: $light-gray;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: $brawn;
      border-radius: 0px;
    }
  }
  .rowdiv {
    height: 20px;
    display: flex;
    > .midasi {
      text-align: left;
      width: 100%;
      background: $view_Title_background_Green;
    }
    > .midasichu {
      text-align: left;
      width: 100%;
      background: $white;
    }
    > .titleleft {
      height: 20px;
      text-align: left;
      width: 100%;
    }
    > .titlecenter {
      height: 20px;
      text-align: center;
      width: 100%;
    }
  }
}

#soudanHoukokusyodatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 100px;
  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}
.nendo {
  div > input {
    width: 75px;
    border: none !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    height: 19px;
  }
}
</style>
