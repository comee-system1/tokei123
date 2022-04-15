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

    <v-col cols="10">
      <v-container class="user-info" fluid>
        <v-row>
          <v-col cols="3">
            <label>利用者</label>
            <wj-combo-box
              id="userFilterComboString"
              :itemsSource="userFilterStrings"
              :displayMemberPath="'title'"
              :selectedValuePath="'id'"
              :initialized="initUserFilterComboString"
              class="mt-0 flex-wrap"
            >
            </wj-combo-box>
          </v-col>
          <v-col cols="4">
            <label>絞込</label>
            <v-btn-toggle class="mt-0 flex-wrap" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                @click="siborikomiUser(1)"
              >
                全員
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                @click="siborikomiUser(2)"
              >
                未入力
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                @click="siborikomiUser(3)"
              >
                期限切れ
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="*" class="mt-2">
            <v-row justify="end">
              <v-btn>受給者証修正</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="4">
            <label>ソート</label>
            <!-- mandatoryは初期選択 -->
            <v-btn-toggle class="mt-0 flex-wrap" mandatory>
              <v-btn small color="secondary" dark outlined @click="sortUser(1)">
                コード順
              </v-btn>
              <v-btn small color="secondary" dark outlined @click="sortUser(2)">
                カナ順
              </v-btn>
              <v-btn small color="secondary" dark outlined @click="sortUser(3)">
                受給者番号順
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="*">
            <v-btn-toggle class="flex-wrap" mandatory>
              <v-btn
                small
                outlined
                v-for="(n, k) in alphabet"
                :key="n"
                :width="30"
                p-0
                style="min-width: auto"
                @click="onAlphabet(k)"
              >
                {{ n }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="2">
            <v-row class="border-bottom" justify="end">
              <v-col class="pa-2" cols="4"
                ><label>
                  <font color="red"><b>エラー</b></font>
                </label>
              </v-col>
              <v-col class="pa-2" cols="*">
                <span>{{ errorcnt }} 人</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="*">
            <wj-flex-grid
              id="detailGrid"
              class="mt-1"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'AllHeaders'"
              :allowResizing="false"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Row'"
              :isReadOnly="true"
              :initialized="onInitializeDetailGrid"
              :itemsSource="viewdata"
            >
              <wj-flex-grid-column
                v-for="column in headerList"
                :key="column.item"
              />
            </wj-flex-grid>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';

// let sortSearch = '';
// let alphaSearch = '';
let alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];

export default {
  data() {
    return {
      userFilterStrings: [
        { title: '全員', id: 1 },
        { title: '表示②', id: 2 },
        { title: '表示③', id: 3 },
      ],

      userFilterComboString: '',
      alphabet: alphabet,
      myradio01: '1',
      errorcnt: '999',
      headerList: [
        { dataname: 'img', title: 'エラー', width: '10*' },
        { dataname: 'no', title: '受給者証番号', width: '5*' },
        { dataname: 'name', title: '氏名', width: '10*' },
        { dataname: 'koufuymd', title: '交付日', width: '5*' },
        { dataname: 'engo', title: '援護者', width: '5*' },
        { dataname: 'jitibangou', title: '助成自治\n体番号', width: '5*' },
        { dataname: 'jyukyukbn', title: '受給者区分', width: '*' },
        { dataname: 'jyukyuname', title: '受給者氏名', width: '10*' },
        { dataname: 'syougaisyu', title: '障害種別', width: '*' },
        { dataname: 'syougaisienkbn', title: '障害支援区分', width: '*' },
        {
          dataname: 'futanjyougen',
          title: '利用者負担上限\n月額',
          width: '5*',
        },
        { dataname: 'jyougenkanri', title: '上限額\n管理事業所', width: '10*' },
        { dataname: 'syokujiteikyo', title: '食事提供体制', width: '*' },
        { dataname: 'tokubetukyufu', title: '特別\n給付費', width: '5*' },
        { dataname: 'syusei', title: '修正', width: '*' },
      ],
      viewdataAll: [],
      viewdata: this.loadData(),
      tplImage: CellMaker.makeImage(),
    };
  },
  methods: {
    initUserFilterComboString: function (combo) {
      this.userFilterComboString = combo;
      this.userFilterComboString.selectedValue = 1;
    },
    onInitializeDetailGrid: function (flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].height = 120;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < 15; colIndex++) {
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 0) {
          col.cssClass = 'cell-img';
          col.cellTemplate = 'tplImage';
        }
        for (let rowindex = 0; rowindex < 3; rowindex++) {
          let title = '';
          if (1 <= colIndex && colIndex <= 13 && rowindex == 0) {
            title = '受給者情報';
          } else if (10 <= colIndex && colIndex <= 13 && rowindex == 1) {
            title = '利用者負担';
          } else {
            title = this.headerList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }
    },
    loadData: function () {
      let tmpviewdata = [];
      let userCount = 100;
      for (let i = 0; i < userCount; i++) {
        tmpviewdata.push({
          id: i,
          img: 'https://cdn.grapecity.com/wijmo/images/2.png',
          no: '100' + i,
          examNumber: '000' + Math.floor(Math.random() * 10) + 1,
          name: '東経太郎 ' + Math.floor(Math.random() * 10) + 1,
          kana: 'トウケイタロウ' + Math.floor(Math.random() * 10) + 1,
          koufuymd: '20220101',
          engo: '第一東経市',
          jitibangou: '9000' + Math.floor(Math.random() * 10) + 1,
          jyukyukbn: '0',
          jyukyuname: '受給者名太郎 ' + Math.floor(Math.random() * 10) + 1,
          syougaisyu: '2',
          syougaisienkbn: '3',
          futanjyougen: Math.floor(Math.random() * 100) + '000',
          jyougenkanri:
            '上限管理事業所　 ' + Math.floor(Math.random() * 10) + 1,
          syokujiteikyo: '4',
          tokubetukyufu: Math.floor(Math.random() * 10) + '000',
          syusei: '○',
        });
      }
      this.viewdataAll = tmpviewdata;
      // this.userFilter();
      this.viewdata = this.viewdataAll;
      return this.viewdata;
    },
    // sortUser: function (sortType) {
    //   sortSearch = sortType;
    //   // this.userFilter();
    // },
    // onAlphabet: function (key) {
    //   alphaSearch = key;
    //   // this.userFilter();
    // },
  },
};
</script>

<style scoped lang="scss">
.basic-info {
  background-color: #333;
  height: 70px;
  padding: 10px;

  label {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }

  input,
  select {
    background: white;
    font-size: 14px;
    margin-left: 10px;
  }
}

.user-info {
  padding: 0;
  margin-bottom: 20px;
  font-size: 14px;
  label {
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    font-weight: bold;
  }
}
.siborikomi-info,
.sort-info {
  position: relative;
  display: inline-block;
  border: 1px solid lightgray;
  width: 350px;
  border-radius: 10px;

  .wj-labeled-input {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 90px;
    height: auto;
    max-width: 100%;
    margin: 0 15px 0 0px;
    padding: 5px 0;

    input[type='radio'] + label {
      color: black;
    }
    input[type='radio']:checked + label {
      color: blue;
      font-weight: bold;
    }
  }
}
div.border-bottom {
  border-bottom: 1px solid red;
  label {
    font-size: 0.85em;
  }
}
#detailGrid {
  font-size: 12px;
  width: auto;
  height: 70vh;
  .cell-img {
    padding: 0;
    text-align: center;
  }
}
</style>
