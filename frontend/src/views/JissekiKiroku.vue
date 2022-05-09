<template>
  <div>
    <v-layout>
      <v-flex md12 class="basic-info">
        <div>
          <label>サービス</label>
          <input
            type="text"
            value="1121000011_障害者支援施設_ひまわり園"
            style="width: 280px"
          />
          <select name="example" style="width: 150px">
            <option value="選択肢1">32: 施設入所支援</option>
            <option value="選択肢2">33: 施設入所支援</option>
            <option value="選択肢3">34: 施設入所支援</option>
          </select>
        </div>
        <div>
          <label>請求月</label>
          <input type="date" />
          <label>提供月</label>
          <input type="date" />
        </div>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout>
        <UserList></UserList>
        <v-flex md7>
          <div class="user-info">
            <div>
              <label for="theCombo">利用者</label>
              <wj-combo-box
                :isReadOnly="true"
                text="1000007_東経太郎"
              ></wj-combo-box>
              <v-icon>mdi-arrow-left-bold-box-outline</v-icon>
              <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
              <label for="theCombo">受給者証番号</label>
              <wj-combo-box :isReadOnly="true" text="00000700"></wj-combo-box>
            </div>
            <div>
              <label for="theCombo">補足給付摘要の有無</label>
              <wj-combo-box
                :isReadOnly="true"
                v-bind:text="tkkfhiumuData"
                class="short-box"
              ></wj-combo-box>
              <label for="theCombo">補足給付額（日額）</label>
              <wj-combo-box
                :isReadOnly="true"
                v-bind:text="tkkfhiData"
                class="short-box"
              ></wj-combo-box>
              <v-radio-group row class="radio">
                <v-radio label="電文作成有" value="radio-1"></v-radio>
                <v-radio label="電文作成有" value="radio-2"></v-radio>
              </v-radio-group>
            </div>
          </div>

          <wj-flex-grid
            id="detailGrid"
            :itemsSource="detailGridData"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :initialized="onInitializeDetailGrid"
            :allowMerging="'ColumnHeaders'"
            :allowResizing="false"
            :allowDragging="false"
          >
            <wj-flex-grid-column
              header="日付"
              binding="rymd"
              :width="'7*'"
              :wordWrap="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="曜日"
              binding="youbi"
              :width="'7*'"
              :wordWrap="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="サービス提供の状況"
              binding="jyokyo"
              :width="'20*'"
              :wordWrap="true"
              allowMerging="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="入院・外泊時加算"
              binding="kasan1"
              :width="'15*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="入院時支援特別加算"
              binding="kasan2"
              :width="'15*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="地域移行加算"
              binding="tnymd"
              :width="'15*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="体験宿泊支援加算"
              binding="kasantkn"
              :width="'15*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="重度障害者支援加算"
              binding="kasanj"
              :width="'15*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="朝食"
              binding="sasa"
              :width="'12*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="昼食"
              binding="shiru"
              :width="'12*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="夕食"
              binding="syuu"
              :width="'12*'"
              :wordWrap="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="光熱水費"
              binding=""
              :width="'12*'"
              :wordWrap="true"
              allowMerging="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="光熱水費"
              binding="konetu"
              :width="'12*'"
              :wordWrap="true"
              allowMerging="true"
              aggregate="Sum"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="光熱水費"
              binding=""
              :width="'12*'"
              :wordWrap="true"
              allowMerging="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="備考"
              binding="biko"
              :width="'40*'"
              :wordWrap="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/gridData.js';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import UserList from '../components/UserList';

export default {
  components: {
    UserList,
  },
  data() {
    return {
      currentPageTitle: this.$route.name,
      detailGridData: getGridData(getOriginalDetailData()),
      tkkfhiumuData: JSON.parse(getOriginalDetailData())['riyo_inf'][0][
        'tkkfhiumu'
      ],
      tkkfhiData: JSON.parse(getOriginalDetailData())['riyo_inf'][0]['tkkfhi'],
    };
  },
  methods: {
    onInitializeDetailGrid: function (grid) {
      // グリッドの選択を無効にする
      grid.selectionMode = wjGrid.SelectionMode.None;
      // ヘッダー表示用データを取得
      let data = JSON.parse(getOriginalDetailData());
      let asaTanka = data['riyo_inf'][0]['tnka_syk_a'];
      let hiruTanka = data['riyo_inf'][0]['tnka_syk_h'];
      let yuuTanka = data['riyo_inf'][0]['tnka_syk_y'];
      let dayTanka = data['riyo_inf'][0]['tnka_syk_d'];
      let dayKnsTanka = data['riyo_inf'][0]['tnka_kns_d'];
      let monthKnsTanka = data['riyo_inf'][0]['tnka_kns_m'];

      // 追加するヘッダー0行目を作成する///////////////////////////////////////////////////////
      let row0 = new wjGrid.Row();
      row0.allowMerging = true;
      // 作成したヘッダー行を追加する
      let panel = grid.columnHeaders;
      panel.rows.splice(0, 0, row0);
      // ヘッダーの内容を設定する
      for (let colIndex = 2; colIndex <= 7; colIndex++) {
        panel.setCellData(0, colIndex, '支援実績');
      }
      for (let colIndex = 8; colIndex <= 13; colIndex++) {
        panel.setCellData(0, colIndex, '実費算定額');
      }

      // 追加するヘッダー1行目を作成する///////////////////////////////////////////////////////
      var row1 = new wjGrid.Row();
      row1.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(1, 0, row1);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(1, colIndex, '朝食');
      }
      for (let colIndex = 9; colIndex <= 10; colIndex++) {
        panel.setCellData(1, colIndex, `${asaTanka}円/日`);
      }
      for (let colIndex = 11; colIndex <= 13; colIndex++) {
        panel.setCellData(1, colIndex, '光熱水費の単価');
      }

      // 追加するヘッダー2行目を作成する///////////////////////////////////////////////////////
      var row2 = new wjGrid.Row();
      row2.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(2, 0, row2);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(2, colIndex, '昼食');
      }
      for (let colIndex = 9; colIndex <= 10; colIndex++) {
        panel.setCellData(2, colIndex, `${hiruTanka}円/日`);
      }
      for (let colIndex = 11; colIndex <= 13; colIndex++) {
        panel.setCellData(2, colIndex, '光熱水費の単価');
      }

      // 追加するヘッダー3行目を作成する///////////////////////////////////////////////////////
      var row3 = new wjGrid.Row();
      row3.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(3, 0, row3);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(3, colIndex, '夕食');
      }
      for (let colIndex = 9; colIndex <= 10; colIndex++) {
        panel.setCellData(3, colIndex, `${yuuTanka}円/日`);
      }
      for (let colIndex = 11; colIndex <= 11; colIndex++) {
        panel.setCellData(3, colIndex, '1日');
      }
      for (let colIndex = 12; colIndex <= 13; colIndex++) {
        panel.setCellData(3, colIndex, `${dayKnsTanka}円/日`);
      }

      // 追加するヘッダー4行目を作成する///////////////////////////////////////////////////////
      var row4 = new wjGrid.Row();
      row4.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(4, 0, row4);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(4, colIndex, '1日');
      }
      for (let colIndex = 9; colIndex <= 10; colIndex++) {
        panel.setCellData(4, colIndex, `${dayTanka}円/日`);
      }
      for (let colIndex = 11; colIndex <= 11; colIndex++) {
        panel.setCellData(4, colIndex, '1月');
      }
      for (let colIndex = 12; colIndex <= 13; colIndex++) {
        panel.setCellData(4, colIndex, `${monthKnsTanka}円/日`);
      }

      // 日付列・曜日列・備考列を縦方向に結合する////////////////////////////////////////////////
      ['rymd', 'youbi', 'biko'].forEach(function (binding) {
        let col = grid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(0, col.index, col.header);
        panel.setCellData(1, col.index, col.header);
        panel.setCellData(2, col.index, col.header);
        panel.setCellData(3, col.index, col.header);
        panel.setCellData(4, col.index, col.header);
      });

      // サービス提供の状況列～重度障碍者支援加算列を縦方向に結合する
      [
        'rymd',
        'jyokyo',
        'kasan1',
        'kasan2',
        'tnymd',
        'kasantkn',
        'kasanj',
        'biko',
      ].forEach(function (binding) {
        let col = grid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(1, col.index, col.header);
        panel.setCellData(2, col.index, col.header);
        panel.setCellData(3, col.index, col.header);
        panel.setCellData(4, col.index, col.header);
      });

      // フッターの追加
      var footer0 = new wjGrid.GroupRow();
      var footer1 = new wjGrid.GroupRow();
      var footer2 = new wjGrid.GroupRow();
      var footer3 = new wjGrid.Row();
      var footer4 = new wjGrid.Row();
      footer0.allowMerging = true;
      footer1.allowMerging = true;
      footer2.allowMerging = true;
      footer3.allowMerging = true;
      footer4.allowMerging = true;
      var footerPanel = grid.columnFooters;
      footerPanel.rows.splice(0, 0, footer0);
      footerPanel.rows.splice(1, 0, footer1);
      footerPanel.rows.splice(2, 0, footer2);
      footerPanel.rows.splice(3, 0, footer3);
      footerPanel.rows.splice(4, 0, footer4);

      for (let colIndex = 0; colIndex <= 2; colIndex++) {
        footerPanel.setCellData(0, colIndex, '合計');
        footerPanel.setCellData(1, colIndex, '合計');
        footerPanel.setCellData(2, colIndex, '合計');
        footerPanel.setCellData(3, colIndex, '入所時特別支援加算');
        footerPanel.setCellData(4, colIndex, '地域移行支援');
      }
      for (let colIndex = 3; colIndex <= 4; colIndex++) {
        footerPanel.setCellData(3, colIndex, '利用開始日');
        footerPanel.setCellData(4, colIndex, '退所日');
      }
      for (let colIndex = 7; colIndex <= 8; colIndex++) {
        footerPanel.setCellData(3, colIndex, '30日目');
        footerPanel.setCellData(4, colIndex, '退所後算定日');
      }
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        footerPanel.setCellData(1, colIndex, '各小計');
        footerPanel.setCellData(2, colIndex, '実費計');
      }
      for (let colIndex = 11; colIndex <= 13; colIndex++) {
        footerPanel.setCellData(3, colIndex, '当月算定日数');
      }
      // ヘッダーのスタイルをカスタマイズ
      grid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.backgroundColor = '#d4edf4';
          s.color = '#4d4d4d';
          s.fontWeight = 'normal';
          s.textAlign = 'center';
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          s.backgroundColor = '#d4edf4';
          s.color = '#4d4d4d';
          s.fontWeight = 'normal';
          s.textAlign = 'center';
        }
      };
    },
  },
};

// グリッド表示用データの作成
function getGridData(data) {
  let objData = JSON.parse(data);
  let kirokuMeiData = objData['riyo_inf'][0]['kiroku_mei'];
  let gridData = [];
  for (let i = 0; i < kirokuMeiData.length; i++) {
    // 曜日表示用に文字列の日付をDate型に変換
    let datearr = (
      kirokuMeiData[i]['rymd'].substr(0, 4) +
      '/' +
      kirokuMeiData[i]['rymd'].substr(4, 2) +
      '/' +
      kirokuMeiData[i]['rymd'].substr(6, 2)
    ).split('/');
    let date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
    gridData.push({
      id: kirokuMeiData[i]['id'],
      rymd: Number(kirokuMeiData[i]['rymd'].substr(6, 2)),
      youbi: WeekChars[date.getDay()],
      jyokyo: kirokuMeiData[i]['jyokyo'],
      kasan1: kirokuMeiData[i]['kasan1'] == 0 ? '' : kirokuMeiData[i]['kasan1'],
      kasan2: kirokuMeiData[i]['kasan2'] == 0 ? '' : kirokuMeiData[i]['kasan2'],
      tnymd: kirokuMeiData[i]['tnymd'],
      kasantkn:
        kirokuMeiData[i]['kasantkn'] == 0 ? '' : kirokuMeiData[i]['kasantkn'],
      kasanj: kirokuMeiData[i]['kasanj'] == 0 ? '' : kirokuMeiData[i]['kasanj'],
      sasa: kirokuMeiData[i]['sasa'],
      shiru: kirokuMeiData[i]['shiru'],
      syuu: kirokuMeiData[i]['syuu'],
      konetu: kirokuMeiData[i]['konetu'] == 0 ? '' : kirokuMeiData[i]['konetu'],
      biko: kirokuMeiData[i]['biko'],
    });
  }
  return gridData;
}

// 曜日変換用
const WeekChars = ['日', '月', '火', '水', '木', '金', '土'];

// 名称変換用
// let ServiceStatusNameObj = {
//   0:"利用日",
//   1:"入院中日",
//   2:"外泊中日",
//   3:"入院初日",
//   4:"外泊初日",
//   5:"入院終日",
//   6:"外泊終日",
//   7:"入院→施設に戻る→外泊",
//   8:"外泊→施設に戻る→入院",
//   9:"入院→入院",
//   10:"外泊→外泊",
//   13:"入院→外泊",
//   14:"外泊→入院"
// };
</script>

<style scoped>
.basic-info {
  background-color: #333;
  height: 70px;
  padding: 10px;
}

.basic-info label {
  color: white;
  font-size: 14px;
  margin-left: 30px;
}

.basic-info input,
select {
  background: white;
  font-size: 14px;
  margin-left: 10px;
}

.user-info {
  padding: 0;
  font-size: 12px;
}

.user-info label {
  font-size: 12px;
  margin-right: 10px;
}

.v-input--selection-controls {
  padding: 0;
  margin: 0;
}

.short-box {
  width: 60px;
  margin-right: 20px;
}

.radio {
  display: inline-block;
}

#detailGrid {
  font-size: 12px;
  height: 735px;
}

#totalGrid {
  font-size: 12px;
}
</style>