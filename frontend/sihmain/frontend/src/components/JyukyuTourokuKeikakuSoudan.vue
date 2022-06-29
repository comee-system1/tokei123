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
            v-if="$_subGridSelected()"
            elevation="0"
            class="keikakuSoudan-header d-flex flex-row-reverse"
            flat
            tile
          >
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              修正</v-btn
            >
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
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
            :textChanged="onTextChanged"
            placeholder="事業所を選択"
            :readonly="true"
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
            :value="sienkubunymdStart"
            v-model="sienkubunymdStart"
            placeholder="開始日を選択"
          ></datepicker>
          &nbsp;～&nbsp;
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="sienkubunymdEnd"
            v-model="sienkubunymdEnd"
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
            ></wj-combo-box>
            <label style="padding-top: 2px">ヶ月</label>
            <v-card elevation="0" class="pl-1 d-flex flex-row">
              <v-btn
                class="monitoringkikan-setauto-button"
                @click="openDialog_Term('copy_last')"
              >
                自動設定</v-btn
              >
            </v-card>
          </v-card>
          <v-card elevation="0" flat tile>
            <wj-flex-grid
              id="gridMonitoringkikan"
              class="no-scrollbars"
              :initialized="onInitializedMonitoringkikan"
              :itemsSource="monitoringkikanData"
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
            >
            </wj-flex-grid>
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="keikakuSoudan-kasankoumoku-row">
        <v-card
          elevation="0"
          class="keikakuSoudan-title-length4 d-flex flex-row"
          style="height: 50px; padding-top: 15px"
          flat
          tile
        >
          加算項目
        </v-card>
        <v-card elevation="0" flat tile>
          <wj-flex-grid
            id="gridKasankoumoku"
            class="no-scrollbars"
            :initialized="onInitializedKasankoumoku"
            :itemsSource="kasankoumokuData"
            :headersVisibility="'None'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :isReadOnly="true"
            :alternatingRowStep="0"
            :selectionMode="'None'"
            style="
              width: 300px;
              height: 51px;
              border-bottom: none;
              border-right: none;
              font-size: 12px;
              margin-left: 4px;
              border-radius: 2px;
            "
          >
            <wj-flex-grid-column
              :binding="'value'"
              :allowMerging="true"
              width="*"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-card>
      </v-row>
      <v-row
        v-if="this.changeMode()"
        no-gutters
        class="keikakuSoudan-button-row"
      >
        <v-btn class="cancel-button" @click="openDialog_Term('regist')">
          キャンセル</v-btn
        >
        <v-card
          elevation="0"
          class="keikakuSoudan-bottom-regist d-flex flex-row-reverse"
          flat
          tile
        >
          <v-btn class="regist-button" @click="openDialog_Term('regist')">
            登 録</v-btn
          >
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
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      sienkubunymdStart: '',
      sienkubunymdEnd: '',
      monitoringkikan: -1,
      monitoringkikanData: this.getMonitoringkikan(),
      kasankoumokuData: this.getKasankoumoku(),
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
      return this.$_mode() === 'modKeikakuSoudan';
    },
    Resize() {
      let height = '';
      let num = 0;
      let add = 0;
      if (this.$_mode() !== 'modKeikakuSoudan') {
        num = 8.5;
      } else {
        num = 9.5;
        add = 4;
      }
      height = 'calc((29px * ' + num + ') + ' + add + 'px)';
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.$_setMode('modKeikakuSoudan');
      this.Resize();
    },
    getMonitoringkikan() {
      let result = [];
      result.push({
        kouban: '1',
        jigyonum: '1100112345',
        jigyoname: 'たんぽぽ就労事業所',
      });
      return result;
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
        col.wordWrap = true;
        if (colIndex >= 0 && colIndex <= 8) {
          col.binding = String(colIndex + 4);
          col.header = String(colIndex + 4);
        } else {
          col.binding = String(colIndex - 8);
          col.header = String(colIndex - 8);
        }
        col.width = 36;
        col.align = 'center';
        col.allowMerging = true;
        col.multiLine = true;

        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = '';
          if (rowindex == 0) {
            if (0 <= colIndex && colIndex <= 8) {
              title = '2022年';
            } else {
              title = '2023年';
            }
            flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
          }
        }
      }

      flexGrid.endUpdate();
    },
    getKasankoumoku() {
      let serviceSyubetu = [];
      serviceSyubetu.push({ value: '加算項目を選択' }, { value: '' });
      return serviceSyubetu;
    },
    onInitializedKasankoumoku(grd) {
      grd.beginUpdate();
      grd.cells.rows.defaultSize = 25;

      grd.endUpdate();
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
    height: 102px;
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
    height: 50px;
    margin: 4px 4px 0px 4px;
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