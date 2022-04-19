<template>
  <div id="jijyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
    ></header-services>
    <v-container fluid>
      <v-row>
        <v-col class="pa-2" elevation="0">指定なし</v-col>
        <v-col>
          <v-card class="pa-2" elevation="0">
            <wj-combo-box :items-source="jimusyoSearch"></wj-combo-box>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <wj-flex-grid
        :itemsSource="data"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :autoGenerateColumns="false"
        :initialized="onInitialized"
        :isReadOnly="true"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
      >
        <wj-flex-grid-column
          :binding="'space'"
          :header="' '"
          :width="30"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jyougenkanri'"
          :header="'上限額\n管理事務所'"
          :wordwrap="true"
          :multiLine="true"
          width="3*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'city'"
          :header="'市町村名'"
          width="2*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jyukyuBango'"
          :header="'受給者番号'"
          width="3*"
          :allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyou'"
          :header="'利用者名'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyousyafutan'"
          :header="'利用者負担上限月額'"
          :width="60"
          :format="'n0'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'rese'"
          :header="'レセ確定'"
          :width="30"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kouban'"
          :header="'項番'"
          :width="30"
          :format="'n0'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyosyoBango'"
          :header="'事業所番号'"
          width="3*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyosyoMei'"
          :header="'事業所名'"
          width="4*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'teikyoService'"
          :header="'提供\nサービス'"
          width="3*"
          :wordwrap="true"
          :multiLine="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'souhiyogaku'"
          :header="'総費用額'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyoufutan'"
          :header="'利用者\n負担額'"
          :wordwrap="true"
          :multiLine="true"
          width="2*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'nyuryoku'"
          :header="'入力・計算'"
          :width="30"
          :allowMerging="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kanrikekkaPrice'"
          :header="'管理結果後\n利用者負担額'"
          :wordwrap="true"
          :multiLine="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kanrikekka'"
          :header="'管理結果'"
          :width="30"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'print'"
          :header="'印刷'"
          :width="30"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      data: [],
      jimusyoSearch: ['指定なし', 'ひまわり園'],
      dateArgument: '',
      searchArgument: '',
    };
  },
  components: {
    HeaderServices,
  },
  methods: {
    getData: function () {
      let data = [];
      for (let i = 0; i <= 10; i++) {
        data.push({
          space: '自',
          jyougenkanri: 'ひまわり園',
          city: '東経市',
          jyukyuBango: '110001' + i,
          riyou: '東経太郎',
          riyousyafutan: 9300,
          rese: '',
          kouban: i,
          jigyosyoBango: '1121000011',
          jigyosyoMei: 'すみれ介護センター',
          teikyoService: '11:居宅介護',
          souhiyogaku: 98500,
          riyoufutan: 9300,
        });
      }
      let i = 10;
      data.push({
        space: '自',
        jyougenkanri: 'ひまわり園',
        city: '東経市',
        jyukyuBango: '110001' + i,
        riyou: '東経太郎',
        riyousyafutan: 9300,
        rese: '',
        kouban: i,
        jigyosyoBango: '1121000011',
        jigyosyoMei: 'すみれ介護センター',
        teikyoService: '11:居宅介護',
        souhiyogaku: 98500,
        riyoufutan: 9300,
      });

      i = 11;
      data.push({
        space: '自',
        jyougenkanri: 'ひまわり園',
        city: '東経市',
        jyukyuBango: '110001' + i,
        riyou: '東経太郎',
        riyousyafutan: 6300,
        rese: '',
        kouban: i,
        jigyosyoBango: '1121000011',
        jigyosyoMei: 'すみれ介護センター',
        teikyoService: '11:居宅介護',
        souhiyogaku: 98500,
        riyoufutan: 8300,
      });
      return data;
    },
    onInitialized: function (grid) {
      let griddata = this.getData();
      // while (grid.columns.length < 7) {
      //   grid.columns.push(new wjGrid.Column());
      // }
      while (grid.rows.length < griddata.length) {
        grid.rows.push(new wjGrid.Row());
      }

      var extraRow = new wjGrid.Row();
      grid.columnHeaders.rows[0].height = 120;
      extraRow.allowMerging = true;
      var panel = grid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);

      ['rese', 'nyuryoku', 'print'].forEach(function (binding) {
        let col = grid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(0, col.index, col.header);
      });
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 14, '上限管理後');

      grid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.columnHeaders) {
          let html = e.cell.innerHTML;
          let text = e.cell.innerText;
          let classname = '';
          if (text == '利用者負担上限月額') {
            classname = 'vertical';
            html = convertText(text, 5);
          }
          if (
            text == '項番' ||
            text == 'レセ確定' ||
            text == '入力・計算' ||
            text == '管理結果' ||
            text == '印刷'
          ) {
            classname = 'vertical';
          }

          e.cell.innerHTML =
            '<div class="text-center w-100 ' +
            classname +
            '">' +
            html +
            '</div>';
        }
      });

      let range = [];
      for (let i = 0; i < griddata.length; i++) {
        let j = 0;

        grid.setCellData(i, j++, griddata[i]['space']);
        grid.setCellData(i, j++, griddata[i]['jyougenkanri']);
        grid.setCellData(i, j++, griddata[i]['city']);
        grid.setCellData(i, j++, griddata[i]['jyukyuBango']);
        grid.setCellData(i, j++, griddata[i]['riyou']);
        grid.setCellData(i, j++, griddata[i]['riyousyafutan']);
        grid.setCellData(i, j++, griddata[i]['rese']);
        //}
        grid.setCellData(i, j++, griddata[i]['kouban']);
        grid.setCellData(i, j++, griddata[i]['jigyosyoBango']);
        grid.setCellData(i, j++, griddata[i]['jigyosyoMei']);
        grid.setCellData(i, j++, griddata[i]['teikyoService']);
        grid.setCellData(i, j++, griddata[i]['souhiyogaku']);
        grid.setCellData(i, j++, griddata[i]['riyoufutan']);
        //前データと同じjyukyuBangoがあった際はマージさせる配列を準備
        if (
          griddata[i - 1] &&
          griddata[i]['jyukyuBango'] == griddata[i - 1]['jyukyuBango']
        ) {
          range = [
            new wjGrid.CellRange(i - 1, 0, i, 0),
            new wjGrid.CellRange(i - 1, 1, i, 1),
            new wjGrid.CellRange(i - 1, 2, i, 2),
            new wjGrid.CellRange(i - 1, 3, i, 3),
            new wjGrid.CellRange(i - 1, 4, i, 4),
            new wjGrid.CellRange(i - 1, 5, i, 5),
          ];
        }
      }

      let mm = new wjGrid.MergeManager(grid);
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 0, 12),
        new wjGrid.CellRange(0, 13, 1, 13),
        new wjGrid.CellRange(0, 14, 0, 15),
        new wjGrid.CellRange(0, 16, 1, 16),
      ];

      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else {
          for (let h = 0; h < range.length; h++) {
            if (range[h].contains(r, c)) {
              return range[h];
            }
          }
        }
      };

      grid.mergeManager = mm;
    },

    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      //  this.getdateData();
    },
    parentSearch(searchArgument) {
      console.log('searchArgument');
      console.log(searchArgument);
    },
  },
};
function convertText(text, slice) {
  let html = text.slice(0, slice);
  html += '<br />';
  html += text.slice(slice);
  return html;
}
</script>
<style lang="scss" scope>
#jijyougen {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 1366px !important;
  .w-100 {
    width: 100%;
  }
  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
  }
}
</style>