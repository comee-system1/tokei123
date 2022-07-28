<template>
  <div id="JyukyuTourokuKeikakuSoudan" :style="mainHeight">
    <v-container fluid class="keikakuSoudan-container">
      <v-row no-gutters class="keikakuSoudan-header-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-header d-flex flex-row"
          flat
          tile
        >
          <label class="keikakuSoudan-header-title"
            >{{ this.titleNum }}計画相談支援</label
          >
          <v-card
            v-if="subGridSelected"
            elevation="0"
            class="keikakuSoudan-header d-flex flex-row-reverse"
            flat
            tile
          >
            <v-btn
              id="modifyButtonKeikakuSoudan"
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              修正</v-btn
            >
            <v-btn
              id="addButtonKeikakuSoudan"
              class="modify-button"
              style="height: 21px"
              @click="setTrunAdd"
            >
              追加</v-btn
            >
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="keikakuSoudan-sienjigyosyo-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-title-length5 d-flex flex-row"
          flat
          tile
        >
          支援事業所
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="keikakuSoudan-sienjigyosyo-input d-flex flex-row"
        >
          <wj-combo-box
            class="keikakuSoudan-sienjigyosyo-input2"
            :gotFocus="selectSienjigyosyo"
            placeholder="事業所を選択"
            :readonly="true"
            :text="jigyosyoidname"
          ></wj-combo-box>
        </v-card>
      </v-row>
      <v-row no-gutters class="keikakuSoudan-sikyukikan-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-title-length4 d-flex flex-row"
          flat
          tile
        >
          支給期間
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="keikakuSoudan-sikyukikan-picker d-flex flex-row"
        >
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="rksymd"
            v-model="rksymd"
            placeholder="開始日を選択"
          ></datepicker>
          &nbsp;～&nbsp;
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="rkeymd"
            v-model="rkeymd"
            placeholder="終了日を選択"
          ></datepicker>
        </v-card>
      </v-row>
      <v-row no-gutters class="keikakuSoudan-monitoringkikan-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-title-length6 d-flex flex-row"
          style="padding-top: 30px"
          flat
          tile
        >
          モニタリング<br />期間
        </v-card>
        <v-card
          elevation="0"
          class="keikakuSoudan-monitoringkikan-section"
          flat
          tile
        >
          <v-card
            elevation="0"
            class="d-flex flex-row"
            style="height: 25px; margin-bottom: 4px"
          >
            <label class="keikakuSoudan-monitoringkikan-yoteituki"
              >予定月</label
            >
            <wj-combo-box
              class="keikakuSoudan-monitoringkikan-input"
              :textChanged="onTextChanged"
              v-model="monijiki"
              :text="monijiki"
            ></wj-combo-box>
            <label style="padding-top: 2px">ヶ月</label>
            <v-card elevation="0" class="pl-1 d-flex flex-row">
              <v-btn
                class="monitoringkikan-setauto-button"
                @click="setMonitoring()"
              >
                自動設定</v-btn
              >
            </v-card>
          </v-card>
          <v-card elevation="0" flat tile style="height: 300px">
            <wj-flex-grid
              v-for="item of monitoring"
              :id="'gridMonitoringkikan' + item.id"
              :key="item.id"
              class="no-scrollbars"
              :initialized="onInitializedMonitoringkikan"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowDragging="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :allowMerging="'AllHeaders'"
              :isReadOnly="true"
              :alternatingRowStep="0"
              :selectionMode="'None'"
              style="
                width: 433px;
                height: 73px;
                border-bottom: none;
                border-right: none;
                font-size: 12px;
                margin-left: 4px;
                border-radius: 2px;
              "
            >
            </wj-flex-grid>
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="keikakuSoudan-kasankoumoku-row d-flex flex-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-title-length4 d-flex flex-row"
          flat
          tile
        >
          加算項目
        </v-card>
        <v-card
          elevation="0"
          class="keikakuSoudan-kasankoumoku-selection d-flex flex-row"
          flat
          tile
        >
          <v-checkbox class="item-button" label="特別地区加算" v-model="tokuti">
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row v-if="changeMode()" no-gutters class="keikakuSoudan-button-row">
        <v-btn class="cancel-button" @click="cancel"> キャンセル</v-btn>
        <v-card
          elevation="0"
          class="keikakuSoudan-bottom-regist d-flex flex-row-reverse"
          flat
          tile
        >
          <v-btn class="regist-button"> 登 録</v-btn>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import '@grapecity/wijmo.vue2.input';
export default {
  data() {
    return {
      ja: ja,
      mode: '',
      subGridSelected: false,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),

      months: [
        { id: 'jan', value: '1' },
        { id: 'feb', value: '2' },
        { id: 'mar', value: '3' },
        { id: 'apr', value: '4' },
        { id: 'may', value: '5' },
        { id: 'jun', value: '6' },
        { id: 'jul', value: '7' },
        { id: 'aug', value: '8' },
        { id: 'sep', value: '9' },
        { id: 'oct', value: '10' },
        { id: 'nov', value: '11' },
        { id: 'dec', value: '12' },
      ],

      monitoring: [
        {
          id: 1,
          jan: '',
          feb: '',
          mar: '',
          apr: '',
          may: '',
          jun: '',
          jul: '',
          aug: '',
          sep: '',
          oct: '',
          nov: '',
          dec: '',
        },
        {
          id: 2,
          jan: '',
          feb: '',
          mar: '',
          apr: '',
          may: '',
          jun: '',
          jul: '',
          aug: '',
          sep: '',
          oct: '',
          nov: '',
          dec: '',
        },
        {
          id: 3,
          jan: '',
          feb: '',
          mar: '',
          apr: '',
          may: '',
          jun: '',
          jul: '',
          aug: '',
          sep: '',
          oct: '',
          nov: '',
          dec: '',
        },
      ],
      putmarkMonth: [],

      gridId: 0,

      isModify: false,
      jigyosyoid: 0,
      jigyosyoidname: '',
      rksymd: null,
      rkeymd: null,
      monijiki: 0,
      tokuti: 0,
    };
  },
  props: ['titleNum'],
  components: {
    Datepicker,
  },
  mounted() {
    this.Resize();
  },
  methods: {
    changeMode() {
      this.Resize();
      return this.mode === 'modKeikakuSoudan';
    },
    Resize() {
      let height = '';
      let num = 0;
      let add = 0;
      if (this.mode !== 'modKeikakuSoudan') {
        num = 13.1;
      } else {
        num = 14.1;
        add = 4;
      }
      height = 'calc((29px * ' + num + ') + ' + add + 'px)';
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.setButtonColor('modifyButtonKeikakuSoudan', true);
      this.setButtonColor('addButtonKeikakuSoudan', false);
      this.$emit('setMode', 'modKeikakuSoudan');
      this.Resize();
    },
    setTrunAdd() {
      this.setButtonColor('modifyButtonKeikakuSoudan', false);
      this.setButtonColor('addButtonKeikakuSoudan', true);
      this.$emit('setMode', 'modKeikakuSoudan');
      this.Resize();
    },
    cancel() {
      this.setButtonColor('modifyButtonKeikakuSoudan', false);
      this.setButtonColor('addButtonKeikakuSoudan', false);
      this.$emit('setMode', 'new');
      this.changeMode();
    },
    setButtonColor(id, on) {
      var targetbtn = document.getElementById(id);
      targetbtn.style.color = on ? '#fff' : 'black';
      targetbtn.style.backgroundColor = on ? '#444' : '#f5f5f5';
    },
    setData(selectedData) {
      this.clearData();
      if (selectedData.length > 0) {
        this.setdata(selectedData[0]);
      }
      this.$emit('setMode', 'new');
      this.Resize();
    },
    setdata(data) {
      if (data.rksymd.length > 0) {
        this.setJigyosyo(data.sjgyo, data.sjigyoname);
        this.rksymd = moment(data.rksymd).format('YYYY-M-D');
        if (data.rkeymd != '99991231') {
          this.rkeymd = moment(data.rkeymd).format('YYYY-M-D');
        }
        this.monijiki = data.monijiki;
        this.tokuti = data.tokuti;
        this.isModify = true;

        this.clearmMonitoringAll();
        this.setMonitoring();
      }
    },
    setJigyosyo(code, name) {
      this.jigyosyoid = code;
      this.jigyosyoidname = name;
    },
    clearData() {
      this.isModify = false;
      this.jigyosyoid = 0;
      this.jigyosyoidname = '';
      this.rksymd = null;
      this.rkeymd = null;
      this.monijiki = 0;
      this.tokuti = 0;
      this.clearmMonitoringAll();
    },
    clearmMonitoringAll() {
      this.putmarkMonth = [];
      for (let i = 0; i < this.monitoring.length; i++) {
        this.monitoring[i].jan = '';
        this.monitoring[i].feb = '';
        this.monitoring[i].mar = '';
        this.monitoring[i].apr = '';
        this.monitoring[i].may = '';
        this.monitoring[i].jun = '';
        this.monitoring[i].jul = '';
        this.monitoring[i].aug = '';
        this.monitoring[i].sep = '';
        this.monitoring[i].oct = '';
        this.monitoring[i].nov = '';
        this.monitoring[i].dec = '';

        let flexGrid = wijmo.Control.getControl(
          '#gridMonitoringkikan' + String(i + 1)
        );
        flexGrid.refresh();
      }
    },
    clearmMonitoring(i) {
      this.monitoring[i].jan =
        this.monitoring[i].jan === '-' || this.monitoring[i].jan === '●'
          ? ''
          : this.monitoring[i].jan;
      this.monitoring[i].feb =
        this.monitoring[i].feb === '-' || this.monitoring[i].feb === '●'
          ? ''
          : this.monitoring[i].feb;
      this.monitoring[i].mar =
        this.monitoring[i].mar === '-' || this.monitoring[i].mar === '●'
          ? ''
          : this.monitoring[i].mar;
      this.monitoring[i].apr =
        this.monitoring[i].apr === '-' || this.monitoring[i].apr === '●'
          ? ''
          : this.monitoring[i].apr;
      this.monitoring[i].may =
        this.monitoring[i].may === '-' || this.monitoring[i].may === '●'
          ? ''
          : this.monitoring[i].may;
      this.monitoring[i].jun =
        this.monitoring[i].jun === '-' || this.monitoring[i].jun === '●'
          ? ''
          : this.monitoring[i].jun;
      this.monitoring[i].jul =
        this.monitoring[i].jul === '-' || this.monitoring[i].jul === '●'
          ? ''
          : this.monitoring[i].jul;
      this.monitoring[i].aug =
        this.monitoring[i].aug === '-' || this.monitoring[i].aug === '●'
          ? ''
          : this.monitoring[i].aug;
      this.monitoring[i].sep =
        this.monitoring[i].sep === '-' || this.monitoring[i].sep === '●'
          ? ''
          : this.monitoring[i].sep;
      this.monitoring[i].oct =
        this.monitoring[i].oct === '-' || this.monitoring[i].oct === '●'
          ? ''
          : this.monitoring[i].oct;
      this.monitoring[i].nov =
        this.monitoring[i].nov === '-' || this.monitoring[i].nov === '●'
          ? ''
          : this.monitoring[i].nov;
      this.monitoring[i].dec =
        this.monitoring[i].dec === '-' || this.monitoring[i].dec === '●'
          ? ''
          : this.monitoring[i].dec;
    },
    onInitializedMonitoringkikan(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.cells.rows.defaultSize = 24;
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = flexGrid.cells.rows.defaultSize;
      flexGrid.columnHeaders.rows[1].height = flexGrid.cells.rows.defaultSize;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < 12; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = false;
        col.width = 36;
        col.align = 'center';
        col.allowMerging = true;
        col.multiLine = true;
      }

      this.setGrid(flexGrid, this.gridId, null, null, 0);
      this.gridId++;

      this.clickEventCell(flexGrid);

      let _self = this;
      let _grid = flexGrid;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell && r == 0) {
          // グリッド内共通スタイル
          let s = cell.style;
          if (cell.innerText === '-') {
            s.backgroundColor = '#ccc';
          } else {
            if (_self.putmarkMonth.length > 0) {
              let header = _grid.columnHeaders;
              let y = header.getCellData(0, c, true);
              let m = header.getCellData(1, c, true);
              let ym = '';
              if (y.indexOf('年') > -1) {
                y = y.replace('年', '');
              }
              if (m.indexOf('月') > -1) {
                m = m.replace('月', '');
              }
              ym = y + m.padStart(2, '0');
              let yellow = _self.putmarkMonth.indexOf(ym) > -1;
              if (yellow) {
                s.backgroundColor = 'ivory';
              } else {
                s.backgroundColor = '#fff';
              }
            }
          }
        }
      };

      flexGrid.endUpdate();
    },
    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell && ht.row == 0) {
          let data = flexGrid.rows[ht.row].dataItem;
          let header = flexGrid.columnHeaders;
          let m = header.getCellData(1, ht.col, true);
          m = m.replace('月', '');
          if (flexGrid.getCellData(ht.row, ht.col) === '●') {
            alert('終期月は変更できません。');
          } else if (flexGrid.getCellData(ht.row, ht.col) !== '-') {
            switch (Number(m) - 1) {
              case 0:
                data.jan = data.jan.length > 0 ? '' : '○';
                break;
              case 1:
                data.feb = data.feb.length > 0 ? '' : '○';
                break;
              case 2:
                data.mar = data.mar.length > 0 ? '' : '○';
                break;
              case 3:
                data.apr = data.apr.length > 0 ? '' : '○';
                break;
              case 4:
                data.may = data.may.length > 0 ? '' : '○';
                break;
              case 5:
                data.jun = data.jun.length > 0 ? '' : '○';
                break;
              case 6:
                data.jul = data.jul.length > 0 ? '' : '○';
                break;
              case 7:
                data.aug = data.aug.length > 0 ? '' : '○';
                break;
              case 8:
                data.sep = data.sep.length > 0 ? '' : '○';
                break;
              case 9:
                data.oct = data.oct.length > 0 ? '' : '○';
                break;
              case 10:
                data.nov = data.nov.length > 0 ? '' : '○';
                break;
              case 11:
                data.dec = data.dec.length > 0 ? '' : '○';
                break;
            }
            flexGrid.refresh();
          }
        }
      });
    },
    setGrid(flexGrid, index, symd, eymd, momikikan) {
      let sy = symd == null ? 0 : moment(symd).year();
      let sm = symd == null ? 0 : moment(symd).month() + 1;
      let mindex = sm == 0 ? 0 : sm - 1;

      let s = moment(symd);
      let e = moment(eymd);
      let cnt = 0;
      while (s <= e) {
        if (cnt % momikikan == 0) {
          this.putmarkMonth.push(s.format('YYYYMM'));
        }
        s = s.add(1, 'months');
        cnt++;
      }

      this.clearmMonitoring(index);

      for (let colIndex = 0; colIndex < 12; colIndex++) {
        let col = flexGrid.columns[colIndex];

        col.header = this.months[mindex].value + '月';
        col.binding = this.months[mindex].id;

        let _sy = sy + index;
        let title = '';
        if (sy > 0) {
          if (sm > 1) {
            if (Number(this.months[mindex].value) < sm) {
              _sy++;
            }
          }
          title = _sy + '年';
        }
        flexGrid.columnHeaders.setCellData(0, colIndex, title);

        if (sy > 0) {
          let _ymd = moment(_sy + '-' + this.months[mindex].value + '-1');
          if (_ymd.isAfter(e)) {
            switch (mindex) {
              case 0:
                this.monitoring[index].jan = '-';
                break;
              case 1:
                this.monitoring[index].feb = '-';
                break;
              case 2:
                this.monitoring[index].mar = '-';
                break;
              case 3:
                this.monitoring[index].apr = '-';
                break;
              case 4:
                this.monitoring[index].may = '-';
                break;
              case 5:
                this.monitoring[index].jun = '-';
                break;
              case 6:
                this.monitoring[index].jul = '-';
                break;
              case 7:
                this.monitoring[index].aug = '-';
                break;
              case 8:
                this.monitoring[index].sep = '-';
                break;
              case 9:
                this.monitoring[index].oct = '-';
                break;
              case 10:
                this.monitoring[index].nov = '-';
                break;
              case 11:
                this.monitoring[index].dec = '-';
                break;
            }
          } else if (_ymd.format('YYYYMM') === e.format('YYYYMM')) {
            switch (mindex) {
              case 0:
                this.monitoring[index].jan = '●';
                break;
              case 1:
                this.monitoring[index].feb = '●';
                break;
              case 2:
                this.monitoring[index].mar = '●';
                break;
              case 3:
                this.monitoring[index].apr = '●';
                break;
              case 4:
                this.monitoring[index].may = '●';
                break;
              case 5:
                this.monitoring[index].jun = '●';
                break;
              case 6:
                this.monitoring[index].jul = '●';
                break;
              case 7:
                this.monitoring[index].aug = '●';
                break;
              case 8:
                this.monitoring[index].sep = '●';
                break;
              case 9:
                this.monitoring[index].oct = '●';
                break;
              case 10:
                this.monitoring[index].nov = '●';
                break;
              case 11:
                this.monitoring[index].dec = '●';
                break;
            }
          } else {
            let putmark = -1;
            if (this.putmarkMonth.indexOf(_ymd.format('YYYYMM')) > -1) {
              putmark = mindex;
            }
            switch (putmark) {
              case 0:
                this.monitoring[index].jan = '○';
                break;
              case 1:
                this.monitoring[index].feb = '○';
                break;
              case 2:
                this.monitoring[index].mar = '○';
                break;
              case 3:
                this.monitoring[index].apr = '○';
                break;
              case 4:
                this.monitoring[index].may = '○';
                break;
              case 5:
                this.monitoring[index].jun = '○';
                break;
              case 6:
                this.monitoring[index].jul = '○';
                break;
              case 7:
                this.monitoring[index].aug = '○';
                break;
              case 8:
                this.monitoring[index].sep = '○';
                break;
              case 9:
                this.monitoring[index].oct = '○';
                break;
              case 10:
                this.monitoring[index].nov = '○';
                break;
              case 11:
                this.monitoring[index].dec = '○';
                break;
            }
          }
        }
        if (mindex == 11) {
          mindex = 0;
        } else {
          mindex++;
        }
      }
      let items = [];
      items.push(this.monitoring[index]);
      flexGrid.itemsSource = items;
    },
    setMonitoring() {
      if (this.rksymd != null && this.rkeymd != null && this.monijiki > 0) {
        for (let i = 0; i < this.monitoring.length; i++) {
          let flexGrid = wijmo.Control.getControl(
            '#gridMonitoringkikan' + String(i + 1)
          );
          this.setGrid(flexGrid, i, this.rksymd, this.rkeymd, this.monijiki);
          flexGrid.refresh();
        }
      }
    },
    onTextChanged(txb) {
      this.monijiki = Number(txb.text);
    },
    selectSienjigyosyo() {
      this.$emit('setHojoMode', 'jigyosyo');
    },
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      if (this.mode !== 'new' && this.mode !== 'modKeikakuSoudan') {
        this.setButtonColor('modifyButtonKeikakuSoudan', false);
        this.setButtonColor('addButtonKeikakuSoudan', false);
      }
    },
    /****************
     * グリッド選択情報
     */
    setSubGridSelected(seleced) {
      this.$emit('setSubGridSelected', seleced);
    },
    setSubGridSelectedFromParent(seleced) {
      this.subGridSelected = seleced;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#JyukyuTourokuKeikakuSoudan {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  height: calc(29px * 9.5);
  .keikakuSoudan-container {
    padding: 0px !important;
  }
  .keikakuSoudan-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .keikakuSoudan-header {
      width: 100%;
      height: 100%;
      background-color: #c6c6c6;
    }
    .keikakuSoudan-header-title {
      width: 200px;
      height: 25px;
      padding: 2px 0px 0px 8px;
      color: black;
    }
  }

  .keikakuSoudan-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .keikakuSoudan-title-length5 {
    width: 100px;
    padding: 2px 0px 0px 14px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .keikakuSoudan-title-length6 {
    width: 100px;
    padding: 2px 0px 0px 8px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .keikakuSoudan-sienjigyosyo-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .keikakuSoudan-sienjigyosyo-input {
      height: 100%;
    }
    .keikakuSoudan-sienjigyosyo-input2 {
      width: 300px;
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
  }

  .keikakuSoudan-sikyukikan-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .keikakuSoudan-sikyukikan-picker {
      padding: 0px 0px 0px 4px;
    }
  }

  .keikakuSoudan-monitoringkikan-row {
    width: 600px;
    height: 260px;
    margin: 4px 4px 0px 4px;
    .keikakuSoudan-monitoringkikan-section {
      width: 450px;
      height: 100%;
      margin-left: 4px;
      .keikakuSoudan-monitoringkikan-yoteituki {
        width: 60px;
        background-color: lightyellow;
        text-align: center;
        padding-top: 2px;
        border-radius: 4px;
      }
      .keikakuSoudan-monitoringkikan-input {
        width: 40px;
        height: 25px;
        font-size: 12px;
      }
      .keikakuSoudan-monitoringkikan-input.wj-control .wj-input {
        width: 30px;
      }
      // 自動設定ボタン
      .monitoringkikan-setauto-button {
        height: 25px;
        width: 100px;
        padding: 2px 0px 0px 15px;
        border: 1px solid $light-gray;
        background-image: url('../assets/copy_gray_15px.png');
        background-position: top 4px left 1px;
      }
    }
  }

  #gridMonitoringkikan {
    width: 433px;
    height: 73px;
    border-bottom: none;
    border-right: none;
    font-size: 12px;
    border-radius: 2px;
  }

  .no-scrollbars.wj-flexgrid [wj-part='root'] {
    overflow: hidden !important;
  }

  .keikakuSoudan-kasankoumoku-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .keikakuSoudan-kasankoumoku-selection {
      height: 100%;
      width: 300px;
      margin-left: 4px;
      padding-left: 0px;
      .item-button {
        width: 200px;
        margin-top: -3px;
        margin-left: -27px;
        transform: scale(0.75);
      }
    }
  }

  .keikakuSoudan-button-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .cancel-button {
      height: 25px;
      width: 100px;
      text-align: center;
      margin-top: 2px;
      border-radius: 3px;
      border: 1px solid $light-gray;
    }
    .keikakuSoudan-bottom-regist {
      width: calc(100% - 100px);
      float: right;
      .regist-button {
        height: 25px;
        width: 100px;
        color: $white;
        background-color: #027eb0;
        text-align: center;
        margin-top: 2px;
        border-radius: 3px;
        &:hover {
          background-color: #005f85;
        }
      }
    }
  }
}
</style>