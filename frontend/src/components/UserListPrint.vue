<template>
  <v-col cols="2">
    <v-row>
      <v-col col="6"
        ><wj-combo-box :items-source="member"></wj-combo-box
      ></v-col>
      <v-col col="6">
        <wj-combo-box
          :textChanged="onTextChangedUser"
          placeholder="カナ検索"
        ></wj-combo-box>
      </v-col>
    </v-row>
    <v-row p-0>
      <v-col col="12">
        <v-btn-toggle class="mt-2 flex-wrap">
          <v-btn small color="secondary" dark outlined @click="sortUser(1)"
            >コード順</v-btn
          >
          <v-btn small color="secondary" dark outlined @click="sortUser(2)"
            >カナ順</v-btn
          >
          <v-btn small color="secondary" dark outlined @click="sortUser(3)"
            >受給者番号順</v-btn
          >
        </v-btn-toggle>
      </v-col>
    </v-row>
    <div class="mt-1">
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
      class="mt-1"
      :autoSearch="true"
      :headersVisibility="'Column'"
      :selectionMode="3"
      style="height: 100vh"
      :initialized="onInitializedUser"
      :itemsSource="usersData"
      :allowDragging="false"
      :allowResizing="false"
      :allowSorting="false"
    >
      <wj-flex-grid-column
        header="コード"
        binding="code"
        width="2*"
        :wordWrap="true"
        :allowResizing="false"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="利用者名"
        binding="name"
        width="3*"
        :wordWrap="true"
        :allowResizing="false"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="印刷"
        binding="active"
        width="1*"
        :wordWrap="true"
        :allowResizing="false"
      ></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-combo-box
      :itemsSource="selects"
      :isDroppedDown="isDroppedDown"
      :isRequired="false"
      :selectedIndex="-1"
      :selectedIndexChanged="onselectedIndexChanged"
    ></wj-combo-box>
  </v-col>
</template>
<script>
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import customMergeUser from '@/utiles/customMergeUser';

let userDataAll = [];
let userDataSelect = [];
let checkAll = '';
let userCount = 0;
let textSearch = '';
let sortSearch = '';
let alphaSearch = '';

export default {
  data() {
    return {
      member: ['全員'],
      usersData: this.createUser(),
    };
  },
  methods: {
    createUser: function () {
      let usersData = [];
      userCount = 100;
      for (let i = 0; i < userCount; i++) {
        usersData.push({
          id: i,
          code: '100' + i,
          examNumber: '000' + Math.floor(Math.random() * 10) + 1,
          name: '東経太郎 ' + Math.floor(Math.random() * 10) + 1,
          kana: 'トウジョウタロウ' + Math.floor(Math.random() * 10) + 1,
          active: false,
        });
      }

      //初回はデータの最初を選択
      this.selectUserData = usersData[0];
      userDataAll = usersData;
      this.userFilter();
      userDataSelect = userDataAll;
      return this.usersData;
    },

    userFilter() {
      let data = [];
      userDataAll.forEach(function (value) {
        if (checkAll == '0') value.active = true;
        if (checkAll == '1') value.active = false;
        if (value.name.indexOf(textSearch) != -1) {
          data.push({
            id: value.id,
            code: value.code,
            examNumber: value.examNumber,
            name: value.name,
            kana: value.kana,
            active: value.active,
          });
        }
      });
      if (alphaSearch > 0) {
        let get = [];
        data.forEach(function (value) {
          switch (alphaSearch) {
            case 1:
              if (value.kana.match(/^[ア-オ]/)) setPush(get, value);
              break;
            case 2:
              if (value.kana.match(/^[カ-コ]/)) setPush(get, value);
              break;
            case 3:
              if (value.kana.match(/^[サ-ソ]/)) setPush(get, value);
              break;
            case 4:
              if (value.kana.match(/^[タ-ト]/)) setPush(get, value);
              break;
            case 5:
              if (value.kana.match(/^[ナ-ノ]/)) setPush(get, value);
              break;
            case 6:
              if (value.kana.match(/^[ハ-ホ]/)) setPush(get, value);
              break;
            case 7:
              if (value.kana.match(/^[マ-モ]/)) setPush(get, value);
              break;
            case 8:
              if (value.kana.match(/^[ヤ-ヨ]/)) setPush(get, value);
              break;
            case 9:
              if (value.kana.match(/^[ラ-ロ]/)) setPush(get, value);
              break;
            case 10:
              if (value.kana.match(/^[ワ-ン]/)) setPush(get, value);
              break;
          }
        });
        data = get;
      }

      //コード順でソート
      if (sortSearch == 1) {
        data.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      }
      //利用者名でソート
      if (sortSearch == 2) {
        data.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          return 0;
        });
      }
      //受験者番号でソート
      if (sortSearch == 3) {
        data.sort((a, b) => {
          if (a.examNumber < b.examNumber) return -1;
          if (a.examNumber > b.examNumber) return 1;
          return 0;
        });
      }
      userDataSelect = data;
      this.usersData = data;
    },

    onInitializedUser: function (flexGrid) {
      let i = 0;
      while (flexGrid.columns.length < 3) {
        let clm = new wjGrid.Column();
        if (i == 0) clm.width = '2*';
        if (i == 1) clm.width = '2*';
        if (i == 2) clm.width = '1*';
        flexGrid.columns.push(clm);
        i++;
      }
      while (flexGrid.rows.length < userCount) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.formatItem.addHandler(userCell);
      // configure the grid
      flexGrid.mergeManager = new customMergeUser();
      flexGrid.alternatingRowStep = 1;

      //初回のユーザ選択値
      setUserSelectPoint(0);

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        ht = flexGrid.hitTest(e.pageX, e.pageY);
        //選択した要素の取得
        let row = ht._row;
        _self.userRow = row;
        setUserSelectPoint(row);
        _self.selectUserCode = userDataSelect[row].code;
        _self.createInfo();
      });
    },
  },
};

//カナアイコンフィルタリング用
function setPush(get, value) {
  return get.push({
    id: value.id,
    code: value.code,
    examNumber: value.examNumber,
    name: value.name,
    kana: value.kana,
    active: value.active,
  });
}

function setUserSelectPoint(row) {
  document.querySelector('#selectUserText').innerText =
    userDataSelect[row].code + ' ' + userDataSelect[row].name;
  document.querySelector('#selectUserExamNumber').innerText =
    userDataSelect[row].examNumber;
}

function userCell(s, e) {
  if (e.cell.children.length == 0) {
    let align = 'left';
    let str = e.cell.innerHTML;
    str = '<div>' + str + '</div>';
    e.cell.innerHTML = str.replace(',', '');
    wjCore.setCss(e.cell, {
      display: 'table',
      tableLayout: 'fixed',
    });
    wjCore.setCss(e.cell.children[0], {
      display: 'table-cell',
      textAlign: align,
      verticalAlign: 'middle',
    });
  }
}
</script>
<style scoped>
</style>