<template>
  <div id="keiyakuHokoku" :style="styles">
    <v-container class="pa-1" fluid>
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          表示日
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
            elevation="2"
            tile
            outlined
            width="150px"
            height="100%"
            class="btnymd"
            @click="onDatepicker(1)"
            >{{ getYmDisplay }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <v-btn class="mr-1" height="19" @click="onSearch()">
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          サービス
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1" height="20">
          <div v-for="val in serviceList" :key="val.id" class="radioInline">
            <input
              type="radio"
              :id="'service-' + val.id"
              v-model="selService"
              :value="val.id"
              @change="serviceClicked"
              name="srv"
            />
            <label :for="'service-' + val.id" class="customRadio mr-2">
              <span>{{ val.name }}</span>
            </label>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1 ml-1" outlined tile>
          対象者
        </v-card>

        <v-card elevation="0" tile outlined class="pl-1" height="20">
          <div v-for="val in targetList" :key="val.id" class="radioInline">
            <input
              type="radio"
              :id="'target_' + val.id"
              v-model="selTarget"
              :value="val.id"
              @change="targetClicked"
              name="rdo"
            />
            <label :for="'target_' + val.id" class="customRadio mr-2">
              {{ val.name }}
            </label>
          </div>
        </v-card>
      </v-row>
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          市区町村
        </v-card>
        <select
          class="customSelectBox"
          v-model="selShichoson"
          @change="selectedCityChanged"
        >
          <option v-for="val in shichosonList" :key="val.id" :value="val.id">
            {{ val.name }}
          </option>
        </select>
      </v-row>
      <v-row no-gutters class="rowStyle mb-1 mt-1">
        <alphabet-button
          class="mt-1"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
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
      <div>
        <wj-flex-grid
          id="keiyakuGrid"
          :initialized="onInitialized"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewData"
          :autoClipboard="false"
          :selectionMode="'Row'"
          :headersVisibility="'Column'"
          :alternatingRowStep="0"
          :allowAddNew="false"
          :allowDelete="false"
          :allowDragging="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
        >
          <wj-flex-grid-filter
            :initialized="initialized"
            :showFilterIcons="false"
          ></wj-flex-grid-filter>
          <wj-flex-grid-column
            header="市区町村"
            binding="shichosonName"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="コード"
            binding="riCode"
            align="center"
            valign="middle"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者名"
            binding="riName"
            align="center"
            valign="middle"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="受給者証番号"
            binding="jukyuNo"
            align="center"
            valign="middle"
            :isReadOnly="true"
            width="1.2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="保護者"
            binding="hogoshaName"
            align="center"
            valign="middle"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="契約開始日"
            binding="symd"
            align="center"
            valign="middle"
            width="1.2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="契約終了日"
            binding="eymd"
            align="center"
            valign="middle"
            width="1.2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="終了理由"
            binding="endReason"
            align="center"
            valign="middle"
            width="3*"
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

    <!-- 契約報告書ダイアログ -->
    <v-dialog
      v-model="contactDialog"
      no-click-animation
      persistent
      :width="520"
    >
      <!-- タイトル -->
      <v-card class="common_dialog">
        <v-card-title class="dialog_title"> 契約報告書 作成 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="contactCloseBtn()"
          class="mt-1 dialog_close"
          ><v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-card>
      <v-card class="common_dialog pa-1" tile flat>
        <!-- 履歴参照 -->
        <div
          class="history_menu pa-2"
          :class="{ 'is-active': open }"
          v-on:click="open = !open"
        >
          <div class="history_title">
            <label>履歴参照</label>
            <v-btn elevation="2" icon x-small class="history_close"
              ><v-icon dark x-small> mdi-close </v-icon>
            </v-btn>
          </div>
          <!-- 履歴参照ダイアログ -->
          <wj-flex-grid
            id="serviceHistoryGrid"
            class="mt-1"
            :initialized="onInitializeService"
            :itemsSourceChanged="onInitializeServiceChanged"
            :itemsSource="viewDataHistory"
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
          >
            <wj-flex-grid-column
              :header="'開始日'"
              binding="symd"
              align="center"
              valign="middle"
              width="1*"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'終了日'"
              binding="eymd"
              align="center"
              valign="middle"
              width="1*"
              :isReadOnly="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <!-- 契約報告書-->
        <v-row no-gutters class="rowStyle_Dark tall">
          <v-card
            class="koumokuTitle titleBlueDark ml-1 mt-1"
            outlined
            tile
            height="25"
          >
            利用者名
          </v-card>
          <v-card
            class="titleYellow dialog_border_blue rowStyle_Input mt-1 ml-1 pl-1"
            elevation="0"
            outlined
            tile
            width="270"
            v-model="riName"
          >
            {{ riCode }}
            {{ riName }}
          </v-card>
        </v-row>
        <div class="ml-1 mb-2 mt-1">
          <v-row class="rowStyle_input mb-1 mt-1" dense>
            <v-card outlined tile class="koumokuTitle titleOrange ml-1">
              相談事業者
            </v-card>
            <v-card
              class="text-center dialog_border titleYellow ml-1"
              outlined
              tile
              width="95"
              elevation="0"
              v-model="jigyoCd"
              >{{ jigyoCd }}
            </v-card>
            <v-card
              outlined
              tile
              class="dialog_border titleYellow pl-1"
              width="300"
              elevation="0"
              v-model="jigyoName"
              >{{ jigyoName }}
            </v-card>
          </v-row>
          <v-row class="rowStyle_input mb-1" dense>
            <v-card outlined tile class="koumokuTitle titleOrange ml-1">
              サービス内容
            </v-card>
            <v-card
              class="text-center dialog_border titleYellow ml-1"
              outlined
              tile
              width="40"
              elevation="0"
              v-model="svcCode"
              >{{ svcCode }}
            </v-card>
            <v-card
              class="dialog_border titleYellow pl-1"
              outlined
              tile
              width="355"
              elevation="0"
              v-model="svcName"
              >{{ svcName }}
            </v-card>
          </v-row>
        </div>
        <div class="common_dialog titleBlue pa-4 mb-1">
          <v-row class="mt-1" no-gutters>
            <v-card
              elevation="0"
              tile
              class="koumokuTitle pa-3 titleBlue wdShort"
            >
              受給者番号
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              width="100"
              height="28"
              class="titleYellow ml-1 text-center mt-2 mb-2 pa-1"
              v-model="jukyuNo"
              >{{ jukyuNo }}
            </v-card>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <v-card elevation="0" tile class="titleBlue wdShort mr-1">
              支給決定障害者<br />(保護者)
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              height="28"
              class="titleYellow wdMdl text-left mt-2 mb-2 pa-1"
              >{{ jukyuName }}
            </v-card>
          </v-row>
          <v-row class="mt-1 mb-1" no-gutters>
            <v-card
              elevation="0"
              tile
              class="koumokuTitle pa-3 titleBlue wdShort mr-1"
            >
              児童氏名
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              height="28"
              class="rowStyle_Input wdMdl text-left mt-2 mb-2 pa-1"
              :class="{ gray: jidoName == '', titleYellow: jidoName }"
              >{{ jidoName }}
            </v-card>
          </v-row>
        </div>
        <div class="common_dialog dialog_border_blue pa-1 pt-1 pb-1">
          <v-row class="mt-1" no-gutters>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain rowStyle_Input"
              >契約期間開始期
            </v-card>
            <v-card
              elevation="0"
              tile
              outlined
              width="160"
              height="24"
              class="text-center label ml-1"
              v-model="symd"
              @click="onDatepicker(3)"
            >
              {{ symd }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-row class="pa-3">
              <v-spacer></v-spacer>
              <v-btn class="button" small v-on:click="open = !open"
                >履歴参照</v-btn
              >
            </v-row>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <v-card
              elevation="0"
              outlined
              tile
              class="koumokuTitle titleMain rowStyle_Input"
              >契約期間終了期
            </v-card>
            <v-card
              elevation="0"
              width="160"
              outlined
              tile
              height="24"
              class="text-center label ml-1"
              v-model="eymd"
              @click="onDatepicker(4)"
            >
              {{ eymd }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <v-card tile class="koumokuTitle titleMain pa-1" height="130"
              >終了理由
            </v-card>
            <textarea
              class="syuryoriyuArea"
              @change="syuryoriyuData()"
              v-model="endReason"
            ></textarea>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-btn class="botton" small @click="deleteBtn()">削除</v-btn
            ><v-spacer></v-spacer>
            <v-btn class="button" small @click="registBtn()">登録</v-btn>
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
import { getConnect } from '../../connect/getConnect';
import { deleteConnect } from '@/connect/deleteConnect';
import { postConnect } from '@/connect/postConnect';
import { putConnect } from '@/connect/putConnect';
import printUtil from '@/utiles/printUtil';

export default {
  components: {
    AlphabetButton,
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
      picker: '',
      contactDialog: false,
      historyDialog: false,
      datepicker_dialog: false,
      closeCheckConfirmFlg: false,

      // 絞込：サービス
      onServiceVal: '',
      selService: 0,
      serviceList: [
        {
          id: 0,
          name: '両方',
        },
        {
          id: 1,
          name: '障害者',
        },
        {
          id: 2,
          name: '障害児',
        },
      ],
      // 絞込：対象
      onTarget: '',
      selTarget: 0,
      targetList: [
        {
          id: 0,
          name: '全員',
        },
        {
          id: 1,
          name: '未入力',
        },
        {
          id: 2,
          name: '入力済み',
        },
      ],
      // 絞込：市区町村
      selShichoson: 0,
      selshichosonval: '',
      shichosonList: [
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
        {
          id: 3,
          name: '南経市',
        },
        {
          id: 4,
          name: '北経市',
        },
      ],
      viewData: [], // 契約報告一覧
      viewDataHistory: [], // 履歴参照
      // API
      intcode: '', // 利用者内部ID
      hoKbn: '', // 法区分
      riName: '', // 利用者名
      jigyoCd: '', // 事業者表示コード
      jigyoName: '', // 事業者名
      svcCode: '', //サービスコード
      svcKbn: 0, // サービス区分
      svcName: '', //サービス内容名称
      jukyuNo: '', // 受給者証番号
      riCode: '', // 利用者コード
      jukyuName: '', // 支給決定障害者名（保護者）
      jidoName: '', // 児童氏名
      symd: '', // 契約期間開始
      oldsymd: '', // 契約期間開始(変更前)
      eymd: '', // 契約期間終了
      endReason: '', // 終了理由
      noDataFlg: 1, // 契約報告書の履歴有無
      minyuFlg: 0, // 未入力フラグ

      open: false,
      // 表示日
      getYmDisplay:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      // 提出日
      getYmSend:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      daySelectType: '',
      displayDate: '', // 表示日
      headerheight: 130,
      viewDataDefault: [],
      mainGrid: [],
      thickList: [2, 9],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.setPrintEvent();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  methods: {
    /**********************
     * 契約報告書
     * #keiyakuGrid
     **********************/
    calculateWindowHeight() {
      if (document.getElementById('keiyakuGrid') != null) {
        document.getElementById('keiyakuGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    /**********************
     * カレンダー機能
     **********************/
    onDatepicker(daySelectType) {
      this.daySelectType = daySelectType;
      this.datepicker_dialog = true;
      var elem = document.getElementById('datepickerDialog');
      // 表示日
      if (daySelectType == 1) {
        this.picker = this.dateFormatChange(this.getYmDisplay);
        elem.style.top = '58px';
        elem.style.left = '35px';
      }
      // 提出日
      if (daySelectType == 2) {
        this.picker = this.dateFormatChange(this.getYmSend);
        elem.style.top = '105px';
        elem.style.left = 'auto';
        elem.style.right = '1px';
      }
      // (dialog) 契約期間開始期
      if (daySelectType == 3) {
        this.picker = this.dateFormatChange(this.symd);
        elem.style.top = '160px';
        elem.style.left = 'auto';
        elem.style.right = 'auto';
      }
      // (dialog) 契約期間終了期
      if (daySelectType == 4) {
        this.picker = this.dateFormatChange(this.eymd);
        elem.style.top = '160px';
        elem.style.left = 'auto';
        elem.style.right = 'auto';
      }
      this.closeCheckConfirmFlg = true;
    },
    monthSelect(kbn) {
      let ex = kbn.split('-');
      if (this.daySelectType == 1) {
        this.getYmDisplay = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
        // 日付選択後 gridを空に
        this.viewData = [];
      }
      if (this.daySelectType == 2) {
        this.getYmSend = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      if (this.daySelectType == 3) {
        this.symd = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      if (this.daySelectType == 4) {
        this.eymd = ex[0] + '年' + ex[1] + '月' + ex[2] + '日';
      }
      this.datepicker_dialog = false;
    },
    dateFormatChange(dateString) {
      let year = dateString.slice(0, 4);
      let month = dateString.slice(5, 7);
      let day = dateString.slice(8, 10);
      let date = year + '-' + month + '-' + day;
      return date;
    },

    initialized: function (filter) {
      this.filter = filter;
      this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
      this.filter.showSortButtons = true;
    },
    /**********************
     * 検索機能
     **********************/
    onAlphabetical() {
      this.userFilter();
    },
    selectedCityChanged() {
      let key = this.selShichoson;
      this.selShichoson = this.shichosonList[key].id;
      this.selshichosonval = this.shichosonList[key].name;
      this.userFilter();
    },
    serviceClicked() {
      let key = this.selService;
      this.selService = this.serviceList[key].id;
      this.onServiceVal = this.serviceList[key].name;
      this.userFilter();
    },
    targetClicked() {
      let key = this.selTarget;
      this.selTarget = this.targetList[key].id;
      this.onTarget = this.targetList[key].name;
      this.userFilter();
    },
    /**********************
     * 履歴参照
     * #serviceHistoryGrid
     **********************/
    onInitializeService(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          let tmp = flexGrid.cells.rows[ht.row].dataItem;
          // 契約報告書へ反映
          _self.symd = tmp.symd;
          _self.eymd = tmp.eymd;
          _self.open = false;
          _self.closeCheckConfirmFlg = true;
        }
      });
    },
    onInitializeServiceChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    /************************
     * 契約報告書ダイアログ
     * contactDialog
     ********************/
    syuryoriyuData() {
      this.closeCheckConfirmFlg = true;
    },
    contactCloseBtn() {
      if (this.noDataFlg == 1) {
        confirm('未登録です。閉じてもよろしいですか？');
      }
      if (this.closeCheckConfirmFlg) {
        this.closeCheckConfirmFlg = false;
        if (!confirm('変更があります。取り消ししてもよろしいですか？')) {
          return false;
        }
      }
      // 閉じる:ダイアログ
      this.contactDialog = false;
      // 閉じる:履歴
      this.open = false;
    },

    /**********************
     * #keiyakuGrid
     **********************/
    onInitialized(flexGrid) {
      this.mainGrid = flexGrid;
      // API接続（契約報告書一覧）
      this.keiyakuHoukokuView();

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });
      this.userFilter();

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          if (e.col == 0 || e.col == 2 || e.col == 4 || e.col == 7) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
          if (e.col <= 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.color = sysConst.COLOR.fontColor;
          }
        }
        e.cell.style.borderRight = '';
        if (e.col == 4 || e.col == 7) {
          e.cell.style.borderRight =
            '1px solid' + sysConst.COLOR.gridBorderColor;
        }
      });
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          // API接続
          _self.keiyakuHoukoku(tmpitem);
          _self.contactDialog = true;
        }
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
      this.noneFilters('print');
      this.noneFilters('syuryoriyu');
    },
    /****************
     * API取得
     ****************/
    // 一覧
    keiyakuHoukokuView() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pSrcYmd: 20211101,
      };
      getConnect('/KeiyakuHoukokuView', params, 'SIENP').then((result) => {
        for (let i = 0; i < result.length; i++) {
          let sDateView = dayjs(result[i].symd).format('YYYY/MM/DD');
          let eDateView = dayjs(result[i].eymd).format('YYYY/MM/DD');
          result[i].symd = dayjs(sDateView, 'YYYY/MM/DD').isValid()
            ? sDateView
            : '';
          result[i].eymd = dayjs(eDateView, 'YYYY/MM/DD').isValid()
            ? eDateView
            : '';
          result[i].riCode = String(result[i].riCode);
        }
        this.viewData = result;
        this.viewDataDefault = result;
      });
    },
    // 契約報告書
    keiyakuHoukoku(tmpitem) {
      let tmp = tmpitem.symd;
      // 10桁 例:2022/11/01
      if (tmpitem.symd.length == 10) {
        tmp = tmp.replaceAll('/', '');
      } else {
        tmp = dayjs().format('YYYYMMDD');
      }
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pIntcode: tmpitem.intcode,
        pHoKbn: tmpitem.hoKbn,
        pSvcCode: tmpitem.svcCode,
        pSymd: tmp,
      };
      getConnect('/KeiyakuHoukoku', params, 'SIENP').then((result) => {
        this.riCode = result.riCode;
        this.intcode = result.intcode;
        this.hoKbn = tmpitem.hoKbn;
        this.riName = result.riName;
        this.jigyoCd = result.jigyoCd.toString().padStart('10', 0);
        this.jigyoName = result.jigyoName;
        this.svcCode = result.svcCode;
        this.svcName = result.svcName;
        this.jukyuNo = result.jukyuNo;
        this.jukyuName = result.jukyuName;
        this.jidoName = result.jidoName;
        this.endReason = result.endReason;
        this.noDataFlg = result.noDataFlg;

        this.symd = '';
        this.oldsymd = '';
        this.eymd = '';
        // 空のまま登録可へ
        if (result.length != 0 && dayjs(result.symd, 'YYYY/MM/DD').isValid()) {
          this.symd = dayjs(result.symd).format('YYYY年MM月DD日');
          this.oldsymd = result.symd;
        }
        if (result.length != 0 && dayjs(result.eymd, 'YYYY/MM/DD').isValid()) {
          this.eymd = dayjs(result.eymd).format('YYYY年MM月DD日');
        }
        // 履歴参照
        this.keiyakuHoukokuReki();
      });
    },
    // 契約報告書履歴
    keiyakuHoukokuReki() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pIntcode: this.intcode,
        pHoKbn: this.hoKbn,
        pSvcCode: this.svcCode,
      };
      getConnect('/KeiyakuHoukokuReki', params, 'SIENP').then((result) => {
        for (let i = 0; i < result.length; i++) {
          if (
            result[i].length != 0 &&
            dayjs(result[i].symd, 'YYYY/MM/DD').isValid()
          ) {
            result[i].symd = dayjs(result[i].symd).format('YYYY/MM/DD');
          }
          if (
            result[i].length != 0 &&
            dayjs(result[i].eymd, 'YYYY/MM/DD').isValid()
          ) {
            result[i].eymd = dayjs(result[i].eymd).format('YYYY/MM/DD');
          }
        }
        this.viewDataHistory = result;
      });
    },
    /**********************
     * 絞込み
     **********************/
    userFilter() {
      let tmpviewdata = this.viewDataDefault;

      // 市区町村
      if (this.selShichoson > 0) {
        tmpviewdata = tmpviewdata.filter(
          (value) => value.shichosonName == this.selshichosonval
        );
      }

      // サービス
      if (this.selService > 0) {
        tmpviewdata = tmpviewdata.filter(
          (value) => value.svcKbn == this.selService
        );
      }

      // 対象者
      if (this.selTarget == 1) {
        tmpviewdata = tmpviewdata.filter((value) => value.minyuFlg == 1);
      } else if (this.selTarget == 2) {
        tmpviewdata = tmpviewdata.filter((value) => value.minyuFlg == 0);
      }

      // アルファベット
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'riKana');

      this.viewData = tmpviewdata;
    },

    noneFilters(name) {
      var Nonefilter = '';
      Nonefilter = this.filter.getColumnFilter(name);
      if (Nonefilter != null) {
        Nonefilter.filterType = 'None';
      }
    },
    /**********************
     * ボタン
     **********************/
    // 検索ボタン
    onSearch() {
      // this.keiyakuHoukokuView();
      this.userFilter();
    },
    // 登録ボタン
    registBtn() {
      if (confirm('登録をします。よろしいですか？')) {
        let params = {
          uniqid: 3,
          traceid: 123,
        };
        // symd/eymdを文字列へ変換
        let symd = this.symd.replaceAll(/年|月|日/g, '');
        let eymd = this.eymd.replaceAll(/年|月|日/g, '');

        let inputParams = {
          jigyoid: 62,
          intcode: this.intcode,
          hoKbn: this.hoKbn,
          svcCode: this.svcCode,
          symd: symd,
          eymd: eymd,
          endReason: this.endReason,
        };
        // 履歴がない場合
        if (this.noDataFlg == 1) {
          postConnect('/KeiyakuHoukoku', params, 'SIENP', inputParams).then(
            (result) => {
              if (result.okflg == true) {
                // gridへ反映
                this.viewData = [];
                this.keiyakuHoukokuView();
                this.contactDialog = false;
              } else {
                alert(result.msg);
              }
            }
          );
          // 履歴がある場合
        } else {
          let params = {
            uniqid: 3,
            traceid: 123,
          };
          // symd/eymdを文字列へ変換
          let symd = this.symd.replaceAll(/年|月|日/g, '');
          let eymd = this.eymd.replaceAll(/年|月|日/g, '');

          let inputParams = {
            jigyoid: 62,
            intcode: this.intcode,
            hoKbn: this.hoKbn,
            svcCode: this.svcCode,
            oldSymd: this.oldsymd,
            symd: symd,
            eymd: eymd,
            endReason: this.endReason,
          };
          putConnect('/KeiyakuHoukoku', params, 'SIENP', inputParams).then(
            (result) => {
              if (result.okflg == true) {
                this.viewData = [];
                this.keiyakuHoukokuView();
                this.contactDialog = false;
              } else {
                alert(result.msg);
              }
            }
          );
        }
      }
    },
    // 削除ボタン
    deleteBtn() {
      if (confirm('削除します。よろしいですか？')) {
        let symd = this.symd.replaceAll(/年|月|日/g, '');
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pIntcode: this.intcode,
          pHoKbn: this.hoKbn,
          pSvcCode: this.svcCode,
          pSymd: symd,
        };
        deleteConnect('/KeiyakuHoukoku', params, 'SIENP').then((result) => {
          if (result.okflg == true) {
            // gridへ反映
            this.viewData = [];
            this.keiyakuHoukokuView();
            // ダイアログ閉じる
            this.contactDialog = false;
          } else {
            alert(result.msg);
          }
        });
      }
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示日：' + this.getYmDisplay + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.printExec('契約報告一覧', printUtil.DIRECTION.landscape);
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
  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: $font_color_saturday;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: $font_color_sunday;
  }
}

div#keiyakuHokoku {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1300px !important;
  width: 100%;

  .wj-state-selected,
  .wj-state-multi-selected {
    background-color: $grid_selected_background;
    color: $white !important;
  }
}
div#keiyakuGrid {
  font-size: 12px;
  border: 1px solid $grid_Border_Color;
  background: $grid_background;
  min-height: 500px;
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
  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }
}
div#serviceHistoryGrid {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: var(--height);
  .wj-header {
    font-weight: normal;
  }
}

/*----------------------------
* ダイアログ内メニュー本体
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
* メニュー タイトル・ボタン
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
* ダイアログ
*----------------------------*/
.syuryoriyuArea {
  resize: none;
  overflow-y: scroll;
  width: 380px;
  border: solid thin rgba(0, 0, 0, 0.12);
  outline: none;
  margin-left: 4px;
  padding: 4px;
}

.v-application {
  &.history {
    position: relative;
  }
}

.v-col {
  &.regiter {
    position: relative;
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
