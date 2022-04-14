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

    <v-col cols="8">
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
            ></wj-combo-box>
          </v-col>
          <v-col cols="4">
            <label>絞込</label>
            <v-btn-toggle class="mt-0 flex-wrap">
              <v-btn small color="secondary" dark outlined>全員</v-btn>
              <v-btn small color="secondary" dark outlined>未入力</v-btn>
              <v-btn small color="secondary" dark outlined>期限切れ</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="4">
            <label>ソート</label>
            <v-btn-toggle class="mt-0 flex-wrap">
              <v-btn small color="secondary" dark outlined>コード順</v-btn>
              <v-btn small color="secondary" dark outlined>カナ順</v-btn>
              <v-btn small color="secondary" dark outlined>受給者番号順</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <div class="mt-4">
          <v-btn-toggle class="flex-wrap">
            <v-btn
              x-small
              outlined
              v-for="(n, k) in alphabet"
              :key="n"
              :width="5"
              p-0
              style="min-width: auto"
              @click="onAlphabet(k)"
              >{{ n }}</v-btn
            >
          </v-btn-toggle>
        </div>
        <wj-flex-grid
          id="detailGrid"
          class="mt-1"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'All'"
          :allowResizing="false"
          :allowSorting="false"
          :selectionMode="'Row'"
          :initialized="onInitializeDetailGrid"
        >
          <wj-flex-grid-column
            v-for="column in headerList"
            :key="column.item"
          />
          <!-- <wj-flex-grid-column binding="no" header="受給者証番号" />
            <wj-flex-grid-column binding="name" header="氏名" />
            <wj-flex-grid-column binding="koufuymd" header="交付日" />
            <wj-flex-grid-column binding="engo" header="援護者" />
            <wj-flex-grid-column binding="jitibangou" header="助成自治体番号" />
            <wj-flex-grid-column binding="jyukyukbn" header="受給者区分" />
            <wj-flex-grid-column binding="jyukyuname" header="受給者氏名" />
            <wj-flex-grid-column binding="syougaisyu" header="障害種別" />
            <wj-flex-grid-column
              binding="syougaisienkbn"
              header="障害支援区分"
            />
            <wj-flex-grid-column
              binding="futanjyougen"
              header="利用者負担上限月額"
            />
            <wj-flex-grid-column
              binding="jyougenkanri"
              header="上限額管理事業所"
            />
            <wj-flex-grid-column
              binding="syokujiteikyo"
              header="食事提供体制"
            />
            <wj-flex-grid-column binding="tokubetukyufu" header="特別給付費" />
            <wj-flex-grid-column binding="syusei" header="修正" /> -->
        </wj-flex-grid>
      </v-container>
    </v-col>

    <v-container fluid>
      <v-layout>
        <v-flex md7>
          <!-- <div class="user-info">
            <label for="userCombo">利用者</label>
            <wj-combo-box
              id="userFilterComboString"
              :itemsSource="userFilterStrings"
              :displayMemberPath="'title'"
              :selectedValuePath="'id'"
              :initialized="initUserFilterComboString"
            ></wj-combo-box>

            <label>絞込</label>
            <div class="siborikomi-info">
              <div class="wj-labeled-input">
                <input id="btnAll" type="radio" name="siborikomi" checked />
                <label for="btnAll">全員</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnMi" type="radio" name="siborikomi" />
                <label for="btnMi">未入力</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnGire" type="radio" name="siborikomi" />
                <label for="btnGire">期限切れ</label>
              </div>
            </div>
          </div>
          <div class="user-info">
            <label>ソート</label>
            <div class="sort-info">
              <div class="wj-labeled-input">
                <input id="btnKana" type="radio" name="sort" checked />
                <label for="btnKana">カナ</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnCode" type="radio" name="sort" />
                <label for="btnCode">コード</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnJyukyu" type="radio" name="sort" />
                <label for="btnJyukyu">受給者証番号</label>
              </div>
            </div>
          </div> -->
          <!-- <wj-flex-grid
            id="detailGrid"
            class="mt-1"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowMerging="'All'"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'Row'"
            :initialized="onInitializeDetailGrid"
          >
            <wj-flex-grid-column
              v-for="column in headerList"
              :key="column.item"
            /> -->
          <!-- <wj-flex-grid-column binding="no" header="受給者証番号" />
            <wj-flex-grid-column binding="name" header="氏名" />
            <wj-flex-grid-column binding="koufuymd" header="交付日" />
            <wj-flex-grid-column binding="engo" header="援護者" />
            <wj-flex-grid-column binding="jitibangou" header="助成自治体番号" />
            <wj-flex-grid-column binding="jyukyukbn" header="受給者区分" />
            <wj-flex-grid-column binding="jyukyuname" header="受給者氏名" />
            <wj-flex-grid-column binding="syougaisyu" header="障害種別" />
            <wj-flex-grid-column
              binding="syougaisienkbn"
              header="障害支援区分"
            />
            <wj-flex-grid-column
              binding="futanjyougen"
              header="利用者負担上限月額"
            />
            <wj-flex-grid-column
              binding="jyougenkanri"
              header="上限額管理事業所"
            />
            <wj-flex-grid-column
              binding="syokujiteikyo"
              header="食事提供体制"
            />
            <wj-flex-grid-column binding="tokubetukyufu" header="特別給付費" />
            <wj-flex-grid-column binding="syusei" header="修正" /> -->
          <!-- </wj-flex-grid> -->
        </v-flex>
      </v-layout>
    </v-container>
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
      headerList: [
        { dataname: 'error', title: 'エラー', width: '*' },
        { dataname: 'no', title: '受給者証番号', width: '5*' },
        { dataname: 'name', title: '氏名', width: '10*' },
        { dataname: 'koufuymd', title: '交付日', width: '5*' },
        { dataname: 'engo', title: '援護者', width: '5*' },
        { dataname: 'jitibangou', title: '助成自治体番号', width: '5*' },
        { dataname: 'jyukyukbn', title: '受給者区分', width: '*' },
        { dataname: 'jyukyuname', title: '受給者氏名', width: '10*' },
        { dataname: 'syougaisyu', title: '障害種別', width: '*' },
        { dataname: 'syougaisienkbn', title: '障害支援区分', width: '*' },
        {
          dataname: 'futanjyougen',
          title: '利用者負担上限月額',
          width: '5*',
        },
        { dataname: 'jyougenkanri', title: '上限額管理事業所', width: '10*' },
        { dataname: 'syokujiteikyo', title: '食事提供体制', width: '*' },
        { dataname: 'tokubetukyufu', title: '特別給付費', width: '5*' },
        { dataname: 'syusei', title: '修正', width: '*' },
      ],
    };
  },
  methods: {
    initUserFilterComboString: function (combo) {
      this.userFilterComboString = combo;
      this.userFilterComboString.selectedValue = 1;
    },
    onInitializeDetailGrid: function (flexGrid) {
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      for (let colIndex = 0; colIndex < 15; colIndex++) {
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
      }

      // var footer0 = new wjGrid.GroupRow();
      // var footerPanel = grid.columnFooters;
      // footerPanel.rows.splice(0, 0, footer0);
      // // フッターの内容を設定する
      // for (let colIndex = 0; colIndex <= 2; colIndex++) {
      //   footerPanel.setCellData(0, colIndex, '合計');
      // }
    },
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
#detailGrid {
  font-size: 12px;
  width: auto;
  height: 735px;
}
</style>
