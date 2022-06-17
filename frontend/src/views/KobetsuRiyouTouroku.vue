<template>
  <div id="kobeturiyou">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container fluid class="container">
      <v-row no-gutters>
        <v-col class="leftArea">
          <user-list-print
            ref="user_list_print"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list-print>
        </v-col>
        <v-col class="rightArea ml-1">
          <v-row class="mt-0" no-gutters>
            <v-col>
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pr-2 text-center" elevation="0" :min-width="80">
                  <label class="greyLabel">利用者名</label>
                </v-card>
                <v-card class="light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
                <v-card
                  class="pr-2 ml-2 text-center"
                  elevation="0"
                  :min-width="80"
                >
                  <label class="greyLabel">受給者番号</label>
                </v-card>
                <v-card class="light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-end">
              生活支援変動情報:
              <v-btn x-small>
                <v-icon x-small class="white mr-3 rounded-circle">
                  mdi-download
                </v-icon>
                個別取込</v-btn
              >
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col md="4">
              <v-card elevation="0">
                <div class="clearfix">
                  <a class="addButton" @click="openDialog_Term('nyutaiin_add')"
                    >入退院追加</a
                  >
                  <a
                    class="ml-1 addButton"
                    @click="openDialog_Term('gaihaku_add')"
                    >外泊追加</a
                  >
                  <a class="ml-1 addButton" @click="openDialog_Add()"
                    >加算追加</a
                  >
                </div>
              </v-card>
            </v-col>
            <v-col md="6" class="ml-auto">
              <v-card elevation="0">
                <v-row no-gutters>
                  <v-col class="blue--text text-end"> 青文字 </v-col>
                  <v-col cols="2"> :編集可能 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_02.png" />
                  </v-col>
                  <v-col cols="*"> :入退院 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_03.png" />
                  </v-col>
                  <v-col cols="*"> :外泊 </v-col>
                  <v-col cols="1">
                    <div class="editMark"></div>
                  </v-col>
                  <v-col cols="*">:手修正済</v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <wj-flex-grid
            id="flexGrid"
            class="mt-1"
            :headersVisibility="'Column'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :itemsSourceChanged="onChangeInitialized"
            :autoGenerateColumns="false"
            :isReadOnly="true"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'None'"
            :style="gridHeight"
            :itemsSource="viewdata"
          ></wj-flex-grid>
        </v-col>
      </v-row>
      <dialog-kikantuika
        ref="dialog_kikantuika"
        @kikantuika_dialog_regist="kikantuika_dialog_regist"
        @kikantuika_dialog_delete="kikantuika_dialog_delete"
      >
      </dialog-kikantuika>
      <dialog-kasantuika
        ref="dialog_kasantuika"
        @kasantuika_dialog_regist="kasantuika_dialog_regist"
        @kasantuika_dialog_delete="kasantuika_dialog_delete"
      ></dialog-kasantuika>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import UserListPrint from '../components/UserListPrint.vue';
import DialogKikantuika from '../components/DialogKikantuika.vue';
import DialogKasantuika from '../components/DialogKasantuika.vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import { getHendoData } from '@/data/kobetsuRiyoHendo.js';
import { getRiyobi } from '@/data/kobetsuRiyobi.js';
import { getNyutaiin } from '@/data/kobetsuNyutaiin.js';
import { getGaihaku } from '@/data/kobetsuGaihaku.js';
import { getMeal } from '@/data/kobetsuMeal.js';
import { getKounetusuihi } from '@/data/kobetsuKounetusuihi.js';
//const startPoint = 4;
//const totalPoint = startPoint + 1;
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      plusOne: 1, // 該当日付を含める
      mainGrid: [], // 表示grid
      riyoubiData: [], // 利用日データ
      nyutaiinData: [], // 入退院データ
      gaihakuData: [], // 外泊データ
      mealsData: [], // 食事データ
      mealsDataMoney: [], // 食事データ金額
      shineData: [], // 光熱水費データ
      shineDataMoney: [], // 光熱水費データ金額
      gridItemName: [], // 変動情報の表示内容
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      dialog: false, // 期間追加用のダイアログ
      alertMessageFlag: false, // 変更時のアラートメッセージ
      editGridFlag: false, // grid編集状態フラグ
      kasanRow: 0, // 加算情報の行数
      gridHeight: '', // グリッドの高さ
      rowCounts: {}, // 各行数
      viewdata: [],
      hendoRow: 0, // 変動情報の行数
      num: 0,
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
    DialogKikantuika,
    DialogKasantuika,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    onInitialized(flexGrid) {
      // 初回の提供サービスコードを渡す
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.rowHendoData = getHendoData();
      this.riyoubiData = getRiyobi();
      this.nyutaiinData = getNyutaiin();
      this.gaihakuData = getGaihaku();
      this.mealsData = getMeal();
      this.shineData = getKounetusuihi();
      this.mainGrid = flexGrid;
      this.methodCellFormatSetting(flexGrid);
      // セルのクリックイベント
      this.methodCellClickEvent(flexGrid);
    },
    onChangeInitialized(flexGrid) {
      flexGrid.frozenColumns = 4;
      if (flexGrid.rows.length > 0) {
        flexGrid.rows[1].height = 30;
        flexGrid.rows[2].height = 30;
      }
    },
    /**************
     * セルのクリックイベント
     */
    methodCellClickEvent(flexGrid) {
      let _self = this;

      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.userDataSelect[0]['jyukyusyabango']) {
          let ht = flexGrid.hitTest(e);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);
          //  let html = ht.target.innerHTML;
          let text = ht.target.innerText;
          var parent = e.target.parentNode;
          // クリックした箇所が日付期間のセルの際にはダイアログを表示する
          if (text.match(/^[0-9]{1,2}\/[0-9]{1,2}/)) {
            // 親要素のIDを取得
            let ground = parent.querySelector('div').parentNode;
            let parentKey = ground.id.split('-')[1];
            let passData = [];
            let passType = '';
            if (hPage.row == 1) {
              passData = _self.nyutaiinData.date[parentKey];
              passType = 'nyutaiin_add';
            }
            if (hPage.row == 2) {
              passData = _self.gaihakuData.date[parentKey];
              passType = 'gaihaku_add';
            }
            let params = {
              selectKey: parentKey,
              byouinName: passData.byouinName,
              nyuuinbi: passData.nyuuinbi,
              taiinbi: passData.taiinbi,
              nyuuinbiShiseturiyo: passData.nyuuinbiShiseturiyo,
              nyuuinbiBreakfast: passData.nyuuinbiBreakfast,
              nyuuinbiLunch: passData.nyuuinbiLunch,
              nyuuinbiDinner: passData.nyuuinbiDinner,
              taiinbiShiseturiyo: passData.taiinbiShiseturiyo,
              taiinbiBreakfast: passData.taiinbiBreakfast,
              taiinbiLunch: passData.taiinbiLunch,
              taiinbiDinner: passData.taiinbiDinner,
              taiinbiAida: passData.taiinbiAida,
            };
            _self.$refs.dialog_kikantuika.parentFromOpenDialog(
              params,
              passType
            );
          }
          // 食事を押下
          if (
            _self.viewdata[hPage.row].type === 'meal' ||
            _self.viewdata[hPage.row].type === 'shine'
          ) {
            _self.edittingPoint(
              _self,
              flexGrid,
              hPage,
              _self.viewdata[hPage.row].type
            );
          }
        } else {
          alert('利用者を選択してください。');
        }
      });
    },
    /*************************
     * 〇の変更
     * 1:〇←利用しない
     * 2:青〇
     * 0:空欄
     * 3:空欄
     * '':空欄
     */
    edittingPoint(_self, flexGrid, hPage, type) {
      let day = 'day' + parseInt(hPage.col - 3);
      let point = _self.viewdata[hPage.row][day];
      let pt = '';
      if (point == 0) {
        pt = '3';
        _self.viewdata[hPage.row][day] = '3';
      } else if (point == 2) {
        pt = '0';
        _self.viewdata[hPage.row][day] = '0';
      } else if ((!point && point != 0) || point == 3) {
        pt = '2';
        _self.viewdata[hPage.row][day] = '2';
      }
      flexGrid.setCellData(hPage.row, hPage.col, pt);
      // 合計の計算
      let gokei = 0;
      for (let i = 1; i < _self.lastdate; i++) {
        let d = 'day' + i;
        if (_self.viewdata[hPage.row][d] == 2) {
          gokei++;
        }
      }
      _self.viewdata[hPage.row]['gokei'] = gokei;
      if (type == 'meal') {
        _self.viewdata[hPage.row]['kingaku'] =
          gokei * _self.mealsDataMoney[hPage.row - _self.mealPos];
      } else {
        _self.viewdata[hPage.row]['kingaku'] =
          gokei * _self.shineDataMoney[hPage.row - _self.shinePos];
      }
    },
    /*******************************
     * ヘッダメニューのサービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = moment(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();
      if (serviceArgument['search_button']) {
        // ユーザ選択の無効化
        this.$refs.user_list_print.userCheckInvalide();
        this.userDataSelect[0]['riyosyo'] = '';
        this.userDataSelect[0]['jyukyusyabango'] = '';
        this.$refs.user_list_print.setChildTeikyocode(
          this.teikyoCode,
          serviceArgument['search_button']
        );
        this.mainGrid.columns.clear();
        this.viewdata = [];
        this.createHeader(this.mainGrid);
        this.createMerge(this.mainGrid);
      }
    },
    /**********************
     * 左メニューで作成されたユーザ一覧の取得を行う
     */
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    /*****
     * 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
     */
    setUserSelectPoint(row) {
      this.userDataSelect[0]['riyosyo'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;

      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;

      this.mainGrid.columns.clear();
      this.viewdata = [];
      this.createHeader(this.mainGrid);
      this.createRowHeader(this.mainGrid);
      this.createMerge(this.mainGrid);
      this.settingPoint();

      // 値の設定
      this.selectType = '';
      this.editGridFlag = '';
    },

    /***************
     * ヘッダメニューのサービスを変更したとき
     */
    parentServiceChange(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.userDataSelect[0]['riyosyo'] = '';
      this.userDataSelect[0]['jyukyusyabango'] = '';
    },

    /**************************
     * 値の登録
     */
    settingPoint() {
      let riyoGoukei = 0;
      let m = 0; // 食事のキー
      for (let i = 0; i < this.viewdata.length; i++) {
        if (this.viewdata[i].type == 'riyo') {
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            // 利用日
            if (this.riyoubiData[d]) {
              let days = this.riyoubiData[d];
              this.viewdata[i][d] = days;
              riyoGoukei++;
            }
          }
        }
        // 入退院
        if (
          this.viewdata[i].type == 'nyutai' ||
          this.viewdata[i].type == 'gaihaku'
        ) {
          // 日付の調整
          if (this.viewdata[i].type == 'gaihaku') {
            this.settingArrowView(this.gaihakuData, i);
          } else {
            this.settingArrowView(this.nyutaiinData, i);
          }
        }

        // 利用日合計
        if (this.viewdata[i].type == 'riyo') {
          this.viewdata[i]['gokei'] = riyoGoukei;
          this.viewdata[i]['kingaku'] = this.riyoubiData['money'];
        }

        // 食事
        if (this.viewdata[i].type == 'meal') {
          let moneys = this.viewdata[i].data[m].money;
          this.mealsDataMoney.push(moneys);
          let cnt = 0;
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            if (this.mealsData[m][d]) {
              let days = this.mealsData[m][d];
              this.viewdata[i][d] = days;
              if (days == 2) {
                cnt++;
              }
              this.viewdata[i]['gokei'] = cnt;
              this.viewdata[i]['kingaku'] = cnt * moneys;
            }
          }
          m++;
        }

        // 光熱水費
        if (this.viewdata[i].type == 'shine') {
          let moneys = this.viewdata[i].data[0].money;
          this.shineDataMoney.push(moneys);
          let cnt = 0;
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            if (this.shineData[d]) {
              let days = this.shineData[d];
              this.viewdata[i][d] = days;
              if (days == 2) {
                cnt++;
              }
              this.viewdata[i]['gokei'] = cnt;
              this.viewdata[i]['kingaku'] = cnt * moneys;
            }
          }
        }
      }
    },

    /*********************
     * 矢印を登録する
     */
    settingArrowView(data, i) {
      this.viewdata[i]['key'] = [];
      this.viewdata[i]['st'] = [];
      this.viewdata[i]['ed'] = [];
      this.viewdata[i]['diff'] = [];
      let gokei = 0;
      // 月末の取得
      let date = this.year + '-' + this.month + '-01';
      let matu = moment(date).endOf('month');
      let si = moment(date).startOf('month');
      let useDay = [];
      for (let n = 0; n < data.date.length; n++) {
        let end = '';
        if (data.date[n].taiinbi) {
          end = moment(data.date[n].taiinbi);
        }
        let nextMonthFlag = false;
        // 前月以前の場合は月初を指定する
        let start = moment(data.date[n].nyuuinbi);
        let beforeMonthFlag = false;
        // 変更前のデータ(表示用)
        let beforeStart = start;
        let beforeEnd = end;
        // 翌月以降の場合は月末を指定する
        if (end > matu || !end) {
          end = matu;
          nextMonthFlag = true;
        }

        if (start < si) {
          start = si;
          beforeMonthFlag = true;
        }

        let diff = end.diff(start, 'days');
        gokei += diff;
        this.viewdata[i]['key'].push(n);
        this.viewdata[i]['st'].push(beforeStart.format('M/D'));
        if (beforeEnd) {
          this.viewdata[i]['ed'].push(beforeEnd.format('M/D'));
        } else {
          this.viewdata[i]['ed'].push('未設定');
        }
        this.viewdata[i]['diff'].push(diff);

        for (let day = 0; day <= diff; day++) {
          let dayAdd = moment(start).add(day, 'd').format('D');
          let d = 'day' + dayAdd;

          if (day === 0) {
            // 既存データのtaiinbiの日付が重複しているとき
            if (useDay.indexOf(d) != -1) {
              this.viewdata[i][d] = 'center';
            } else if (!beforeMonthFlag) {
              this.viewdata[i][d] = 'start';
            } else {
              this.viewdata[i][d] = 'start-m';
            }
          } else if (day == diff) {
            if (!nextMonthFlag) {
              // 使った日付を保持
              useDay.push(d);
              this.viewdata[i][d] = 'end';
            } else {
              this.viewdata[i][d] = 'middle';
            }
          } else {
            this.viewdata[i][d] = 'middle';
          }
        }

        this.viewdata[i]['gokei'] = gokei + data.date.length;
        this.viewdata[i]['kingaku'] = 'none';
      }
    },
    /************************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      let _self = this;

      flexGrid.formatItem.addHandler(function (s, e) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        let classname = '';
        if (e.panel != flexGrid.columnHeaders) {
          // 変動情報を縦に変更
          // 体制＋個別を縦
          if (
            (e.row == 0 && e.col == 0) ||
            (e.row == _self.hendoRow && e.col == 0) ||
            (e.row == _self.hendoRow && e.col == 1) ||
            (e.row == _self.hendoRow + _self.rowHendoData.taisei.data.length &&
              e.col == 1)
          ) {
            classname = 'vertical';
          }

          // グリッドの値を変更
          // 入退院 / 外泊
          if (
            e.col > 3 &&
            e.col <= _self.lastdate + 3 &&
            (e.row == 1 || e.row == 2)
          ) {
            let color = 'color_red';
            if (tmpitem.type == 'gaihaku') {
              color = 'color_green';
            }
            if (text === 'start' || text === 'start-m' || text === 'center') {
              if (text === 'start') {
                html = "<div class='arrow-box " + color + "'></div>";
                html += "<div class='arrow-start " + color + "'></div>";
              } else if (text === 'center') {
                html = "<div class='arrow-box " + color + "'></div>";
                html +=
                  "<div class='arrow-center '><div class='" +
                  color +
                  "'></div><div class='" +
                  color +
                  "'></div></div>";
              } else {
                html = "<div class='arrow-box " + color + "'></div>";
              }
              html +=
                "<div class='datearea' id='key-" +
                tmpitem.key[_self.num] +
                "'><div>" +
                tmpitem.st[_self.num] +
                '～' +
                tmpitem.ed[_self.num] +
                '[' +
                parseInt(tmpitem.diff[_self.num] + 1) +
                ']</div></div>';
              _self.num++;
              if (_self.num >= tmpitem.st.length) {
                _self.num = 0;
              }
            }
            if (text === 'middle') {
              html = "<div class='arrow-box " + color + "'></div>";
            }
            if (text === 'end') {
              html = "<div class='arrow-box " + color + "'></div>";
              html += "<div class='arrow-end " + color + "'></div>";
            }
          } else if (e.col >= 4 && e.col <= _self.lastdate + 3) {
            positionCenter(e);
            e.cell.style.color = sysConst.COLOR.fontColor;
            if (text === '1') {
              html = '〇';
            }
            if (text === '2') {
              e.cell.style.color = sysConst.COLOR.blueTextColor;
              html = '〇';
            }
            if (text === '0') {
              e.cell.style.color = sysConst.COLOR.blueTextColor;
              html = '×';
            }
            if (text === '3' || text == '') {
              html = '';
            }
          }

          if (e.col == _self.lastdate + 4) {
            classname = 'pr-1';
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          }
          if (e.col == _self.lastdate + 5) {
            classname = 'pr-1';
            if (text === 'none') {
              html = '';
              e.cell.style.backgroundColor = sysConst.COLOR.selectedColor;
            }
            if (e.row >= _self.hendoRow) {
              e.cell.style.backgroundColor = sysConst.COLOR.selectedColor;
            }
            positionRight(e);
          }
          if (e.col == 3) {
            positionRight(e);
          }
        }

        if (e.panel == flexGrid.columnHeaders) {
          // 日付表示
          if (isDate.isDate(text)) {
            html = dateFormatString.dateFormatString(text);
            positionCenter(e);
          }

          if (e.row == 0 && (e.col == 0 || e.col >= _self.lastdate + 4)) {
            positionCenter(e);
          }
        }

        e.cell.innerHTML = '<div class="' + classname + '">' + html + '</div>';
        if (e.panel != flexGrid.columnHeaders) {
          if (
            e.col >= 4 &&
            e.col <= _self.lastdate + 3 &&
            (e.row == 1 || e.row == 2)
          ) {
            wjCore.setCss(e.cell, {
              display: 'table',
              tableLayout: 'absolute',
            });
            wjCore.setCss(e.cell.children[0], {
              display: 'table-cell',
              verticalAlign: 'middle',
            });
          }
          if (e.row === 0 && e.col > 3 && e.col <= _self.lastdate + 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
          if (e.col === _self.lastdate + 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
        }
        function positionCenter(e) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
        function positionRight(e) {
          e.cell.style.textAlign = 'right';
          e.cell.style.justifyContent = 'right';
          e.cell.style.alignItems = 'right';
        }
      });
    },
    /*****************
     * マージ
     */
    createMerge(flexGrid) {
      let headerRanges = [];
      let cellRanges = [];
      headerRanges = [new wjGrid.CellRange(0, 0, 1, 3)]; // 項目
      // 日付マージ
      for (let day = 4; day < this.lastdate + 4; day++) {
        headerRanges.push(new wjGrid.CellRange(0, day, 1, day));
      }
      // 合計マージ
      headerRanges.push(
        new wjGrid.CellRange(0, this.lastdate + 4, 1, this.lastdate + 4)
      );
      // 金額
      headerRanges.push(
        new wjGrid.CellRange(0, this.lastdate + 5, 1, this.lastdate + 5)
      );
      // 変動情報
      cellRanges = [new wjGrid.CellRange(0, 0, this.hendoRow - 1, 0)];

      // 食事用マージ
      this.mealMarges(cellRanges);

      // 変動情報項目一覧マージ
      for (let i = 0; i < this.hendoRow; i++) {
        if (this.viewdata[i]) {
          cellRanges.push(
            new wjGrid.CellRange(i, 1, i, this.viewdata[i].merge)
          );
        }
      }

      // 加算情報
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow,
          0,
          this.hendoRow +
            this.rowHendoData.taisei.data.length +
            this.rowHendoData.kobetu.data.length -
            1,
          0
        )
      );

      // 体制+個別
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow,
          1,
          this.hendoRow + this.rowHendoData.taisei.data.length - 1,
          1
        )
      );
      // 個別
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow + this.rowHendoData.taisei.data.length,
          1,
          this.hendoRow +
            this.rowHendoData.taisei.data.length +
            this.rowHendoData.kobetu.data.length -
            1,
          1
        )
      );

      // 加算情報項目一覧 体制＋個別マージ
      for (
        let i = this.hendoRow;
        i < this.hendoRow + this.rowHendoData.taisei.data.length;
        i++
      ) {
        cellRanges.push(new wjGrid.CellRange(i, 2, i, 3));
      }
      // 加算情報項目一覧 個別マージ
      for (
        let i = this.hendoRow + this.rowHendoData.taisei.data.length;
        i <
        this.hendoRow +
          this.rowHendoData.taisei.data.length +
          this.rowHendoData.kobetu.data.length;
        i++
      ) {
        cellRanges.push(new wjGrid.CellRange(i, 2, i, 3));
      }

      let mm = new wjGrid.MergeManager(flexGrid);
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    mealMarges(cellRanges) {
      let stMeal = 0;
      let edMeal = 0;
      for (let i = 0; i < this.rowHendoData.hendo.length; i++) {
        if (this.rowHendoData.hendo[i].type == 'meal') {
          edMeal = stMeal;
          for (let m = 0; m < this.rowHendoData.hendo[i].data.length; m++) {
            edMeal++;
          }
          break;
        }
        stMeal++;
      }
      if (edMeal > 0) {
        cellRanges.push(new wjGrid.CellRange(stMeal, 1, edMeal - 1, 2));
      }
    },
    /*******************
     * 列ヘッダ
     */
    createRowHeader() {
      let hendo = this.rowHendoData.hendo;
      let hendoRow = 0;
      let views = [];
      for (let i = 0; i < hendo.length; i++) {
        // 光熱水費がある時
        // 食事がある時、食事の分カラムを追加
        // mergeにカラム数を入れる
        if (hendo[i].type == 'meal' || hendo[i].type == 'shine') {
          if (hendo[i].type == 'meal') {
            // 食事のrow位置を取得
            this.mealPos = hendoRow;
          }
          if (hendo[i].type == 'shine') {
            // 光熱水費のrow位置を取得
            this.shinePos = hendoRow;
          }
          for (let m = 0; m < hendo[i].data.length; m++) {
            views.push({
              komoku0: this.rowHendoData.rowColumn.column1,
              komoku1: hendo[i].text,
              komoku3:
                hendo[i].data[m].text + '  @' + hendo[i].data[m].money + '/回',
              merge: hendo[i].merge,
              type: hendo[i].type,
              data: hendo[i].data,
              money: hendo[i].money,
            });
            hendoRow++;
          }
        } else {
          views.push({
            komoku0: this.rowHendoData.rowColumn.column1,
            komoku1: hendo[i].text,
            merge: hendo[i].merge,
            type: hendo[i].type,
          });
          hendoRow++;
        }
      }
      // 体制＋個別
      let j = 0;
      for (
        let i = hendoRow;
        i < hendoRow + this.rowHendoData.taisei.data.length;
        i++
      ) {
        views[i] = [];
        views[i]['komoku0'] = this.rowHendoData.rowColumn.column2;
        views[i]['komoku1'] = this.rowHendoData.taisei.text;
        views[i]['komoku2'] = this.rowHendoData.taisei.data[j].text;
        // 値の登録
        let gokei = '';
        for (let d = 1; d <= this.lastdate; d++) {
          let day = 'day' + d;
          if (this.rowHendoData.taisei.data[j][day] == 2) {
            gokei++;
          }
          views[i][day] = this.rowHendoData.taisei.data[j][day];
        }
        views[i]['gokei'] = gokei;
        j++;
      }
      j = 0;
      // 個別
      for (
        let i = hendoRow + this.rowHendoData.taisei.data.length;
        i <
        hendoRow +
          this.rowHendoData.taisei.data.length +
          this.rowHendoData.kobetu.data.length;
        i++
      ) {
        views[i] = [];
        views[i]['komoku0'] = this.rowHendoData.rowColumn.column2;
        views[i]['komoku1'] = this.rowHendoData.kobetu.text;
        views[i]['komoku2'] = this.rowHendoData.kobetu.data[j].text;
        let gokei = '';
        for (let d = 1; d <= this.lastdate; d++) {
          let day = 'day' + d;
          if (this.rowHendoData.kobetu.data[j][day] == 2) {
            gokei++;
          }
          views[i][day] = this.rowHendoData.kobetu.data[j][day];
        }
        views[i]['gokei'] = gokei;
        j++;
      }
      this.viewdata = views;
      this.hendoRow = hendoRow;
    },

    /**************************
     * ヘッダ作成
     */
    createHeader(flexGrid) {
      if (flexGrid.columnHeaders.rows.length != 1) {
        flexGrid.columnHeaders.rows.removeAt(0, new wjGrid.Row());
      }
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());

      flexGrid.columns.insert(0, new wjGrid.Column());
      flexGrid.columns.insert(1, new wjGrid.Column());
      flexGrid.columns.insert(2, new wjGrid.Column());
      flexGrid.columns.insert(3, new wjGrid.Column());
      let column = 0;
      flexGrid.columns[column++].binding = 'komoku0';
      flexGrid.columns[column++].binding = 'komoku1';
      flexGrid.columns[column++].binding = 'komoku2';
      flexGrid.columns[column++].binding = 'komoku3';
      let c = column++;
      for (let day = 1; day <= this.lastdate; day++) {
        flexGrid.columns.insert(c, new wjGrid.Column());
        flexGrid.columns[c].binding = 'day' + day;
        c = column++;
      }
      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns[c].binding = 'gokei';
      flexGrid.columns[c + 1].binding = 'kingaku';
      flexGrid.columnHeaders.setCellData(0, 0, '項目');
      for (let day = 1; day <= this.lastdate; day++) {
        let date = this.year + '/' + this.month + '/' + day;
        flexGrid.columnHeaders.setCellData(0, day + 3, date);
      }
      flexGrid.columnHeaders.setCellData(0, c, '計');
      flexGrid.columnHeaders.setCellData(0, c + 1, '金額');

      flexGrid.rows.defaultSize = 20;
      flexGrid.columns[0].width = 20;
      flexGrid.columns[1].width = 20;
      flexGrid.columns[2].width = '8*';
      flexGrid.columns[3].width = '8*';

      for (let i = 4; i <= this.lastdate + 3; i++) {
        flexGrid.columns[i].width = '2.2*';
        flexGrid.columns[i].minWidth = 24;
      }
      flexGrid.columnHeaders.columns[this.lastdate + 4].width = 34;
    },
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 64;
      if (height > 800) {
        ht = 75;
      } else if (height > 700) {
        ht = 70;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },

    /*************************
     * ダイアログの表示
     */
    // 入退院ダイアログの登録ボタン押下
    kikantuika_dialog_regist() {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      let selectData = this.$refs.dialog_kikantuika.registData;

      if (selectKey.length == 0) {
        // 空欄のときは新規追加
        this.editGridFlag = false;
        if (this.selectType === 'gaihaku_add') {
          this.gaihakuData['date'].push(selectData);

          this.gaihakuData['date'].sort(function (a, b) {
            if (
              moment(a.nyuuinbi).format('YYYYMMDD') <
              moment(b.nyuuinbi).format('YYYYMMDD')
            )
              return -1;
            if (
              moment(a.nyuuinbi).format('YYYYMMDD') >
              moment(b.nyuuinbi).format('YYYYMMDD')
            )
              return 1;
            return 0;
          });
        } else {
          this.nyutaiinData['date'].push(selectData);
          this.nyutaiinData['date'].sort(function (a, b) {
            if (
              moment(a.nyuuinbi).format('YYYYMMDD') <
              moment(b.nyuuinbi).format('YYYYMMDD')
            )
              return -1;
            if (
              moment(a.nyuuinbi).format('YYYYMMDD') >
              moment(b.nyuuinbi).format('YYYYMMDD')
            )
              return 1;
            return 0;
          });
        }
      } else {
        this.editGridFlag = true;
        if (this.selectType === 'gaihaku_add') {
          this.gaihakuData['date'][selectKey] = selectData;
        } else {
          this.nyutaiinData['date'][selectKey] = selectData;
        }
      }

      for (let i = 1; i <= this.lastdate; i++) {
        let d = 'day' + i;
        if (this.selectType === 'gaihaku_add') {
          this.viewdata[2][d] = '';
        } else {
          this.viewdata[1][d] = '';
        }
      }
      this.settingPoint();
      this.num = 0;
      this.deleteGridFlag = false;
      this.mainGrid.itemsSource = [];
      this.mainGrid.itemsSource = this.viewdata;
    },

    // 加算追加ダイアログの登録ボタン押下
    kasantuika_dialog_regist() {
      let selectKasanName = this.$refs.dialog_kasantuika.registData.selectName;
      let addType = this.$refs.dialog_kasantuika.registData.addType;
      this.kasanRow = this.kasanRow + 1;
      if (addType == 1) {
        this.gridItemName[0].taisei_kobetu.push({ name: selectKasanName });
      } else {
        this.gridItemName[0].kobetu.push({ name: selectKasanName });
      }
      this.alertMessageFlag = true;
      this.deleteGridFlag = false;
      this.mainGrid.itemsSource = [];
    },

    // 入退院ダイアログの削除ボタン押下
    kikantuika_dialog_delete() {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      // 削除する配列のキー
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      this.deleteGridFlag = true;
      let deletes = [];
      if (this.selectType === 'gaihaku_add') {
        for (let i = 0; i < this.gaihakuData['date'].length; i++) {
          if (selectKey != i) {
            deletes.push(this.gaihakuData.date[i]);
          }
        }
        this.gaihakuData.date = [];
        this.gaihakuData.date = deletes;
      } else {
        for (let i = 0; i < this.nyutaiinData['date'].length; i++) {
          if (selectKey != i) {
            deletes.push(this.nyutaiinData.date[i]);
          }
        }
        this.nyutaiinData.date = [];
        this.nyutaiinData.date = deletes;
      }

      for (let i = 1; i <= this.lastdate; i++) {
        let d = 'day' + i;
        if (this.selectType === 'gaihaku_add') {
          this.viewdata[2][d] = '';
        } else {
          this.viewdata[1][d] = '';
        }
      }
      this.settingPoint();

      this.mainGrid.itemsSource = [];
      this.mainGrid.itemsSource = this.viewdata;
    },
    // 加算追加ダイアログの削除ボタン押下
    kasantuika_dialog_delete() {
      let kasanid = this.$refs.dialog_kasantuika.kasanid;
      let type = this.$refs.dialog_kasantuika.type;
      if (type == 'taisei_kobetu') {
        this.gridItemName[0].taisei_kobetu.splice(kasanid, 1);
      }
      if (type == 'kobetu') {
        this.gridItemName[0].kobetu.splice(kasanid, 1);
      }
      this.kasanRow = this.kasanRow - 1;
      this.mainGrid.itemsSource = [];
    },

    // 変動情報ダイアログの表示
    openDialog_Term(type) {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kikantuika.parentFromOpenDialog('', type);
      } else {
        alert('利用者を選択してください。');
      }
    },
    // 加算追加ダイアログの表示
    openDialog_Add() {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kasantuika.parentFromOpenDialog('0', 'add');
      } else {
        alert('利用者を選択してください。');
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#kobeturiyou {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;

  .wj-cell {
    padding: 0 !important;
    &.wj-frozen-row {
      text-align: center;
      z-index: 2 !important;
    }
  }
  .wj-frozen {
    background-color: $selected_color;
    z-index: 2 !important;
  }

  .container {
    padding: 4px;
  }
  .wj-cells {
    font-size: $cell_fontsize;
  }
  .wj-cells .wj-cell.wj-state-selected {
    background-color: $light-white !important;
    color: $font_color !important;
  }
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 140px;
    height: 100%;
  }
  // 受給者証状況用のエリアボックス
  .jyukyusyaBox {
    height: 60px;
    overflow-y: auto;
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
  }

  .gridBackground {
    background-color: $grid_background;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.backGray {
      background-color: $selected_color;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      font-size: 16px;
    }
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  }
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    font-size: 16px;
  }

  // 期間追加・加算追加ボタン
  a {
    &.addButton {
      height: 20px;
      width: 100px;
      background-color: $white;
      border: 1px solid $font_color;
      display: block;
      float: left;
      color: $font_color !important;
      text-align: right;
      border-radius: 3px;
      padding: 0px 10px 0px 0px;
      cursor: pointer;
      background-image: url('../assets/plus_15px.png');
      background-position: top 1px left 1px;
      &:hover {
        background-color: $selected_color;
      }
    }
  }
  #flexGrid {
    width: 100%;
    max-width: none;
    min-width: 1300px-275;
    .wj-cell {
      padding: 0 !important;
      &.wj-frozen-row {
        text-align: center;
        z-index: 2 !important;
      }
    }
    .wj-frozen {
      background-color: $selected_color;
    }
  }

  // 手修正済み
  div.editMark {
    width: 30px;
    height: 14px;
    margin-top: 3px;
    background-color: $pink;
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  // ヘッド
  .head {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  // 縦書き
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }

  div.arrow-box {
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    &.color_red {
      border-top: 1px solid $red;
    }
    &.color_green {
      border-top: 1px solid $green;
    }
  }
  .arrow-start {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-right: 3px solid $red;
    }
    &.color_green {
      border-right: 3px solid $green;
    }
  }
  .arrow-center {
    div {
      width: 5px;
      height: 5px;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      position: absolute;
      left: 10px;
      top: 1px;
      text-indent: -9999px;
      &:first-child {
        &.color_red {
          border-right: 3px solid $red;
        }
        &.color_green {
          border-right: 3px solid $green;
        }
      }
      &:last-child {
        &.color_red {
          border-left: 3px solid $red;
        }
        &.color_green {
          border-left: 3px solid $green;
        }
      }
    }
  }
  .arrow-end {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: auto;
    right: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-left: 3px solid $red;
    }
    &.color_green {
      border-left: 3px solid $green;
    }
  }

  div.datearea {
    width: 140px;
    height: 26px;
    text-align: left;
    div {
      color: $deepgreen;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
      top: 6px;
      left: 2%;
    }
  }

  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }
}
</style>