<template>
  <div>
    <v-row no-gutters>
      <v-col col="12">
        <v-row no-gutters>
          <wj-combo-box
            :textChanged="onTextChangedUser"
            style="width: 100%"
            placeholder="カナ検索"
          ></wj-combo-box>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(1)"
            >
              全員
            </v-card>
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(2)"
              >全員2</v-card
            >
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(3)"
              >全員3</v-card
            >
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(1)"
            >
              コード順
            </v-card>
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(2)"
              >カナ順</v-card
            >
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(3)"
              >受給者番号順</v-card
            >
          </v-col>
        </v-row>
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
        binding="riyocode"
        width="2*"
        :wordWrap="true"
        :allowResizing="false"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="利用者名"
        binding="names"
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
  </div>
</template>
<script>
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import customMergeUser from '@/utiles/customMergeUser';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

let selects = ['印刷を全選択', '印刷を全解除'];
let userUrl = 'http://local-tokei:8085/';
let userDataAll = [];
let userDataSelect = [];
let checkAll = '';
let userCount = 0;
let textSearch = '';
let sortSearch = '';
let alphaSearch = '';
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
      usersData: [],
      selects: selects,
      isDroppedDown: false,
      alphabet: alphabet,
      riyo_inf: [],
    };
  },
  methods: {
    sortUser: function (sortType) {
      sortSearch = sortType;
      this.userFilter();
    },
    onAlphabet: function (key) {
      alphaSearch = key;
      this.userFilter();
    },
    onTextChangedUser: function (s) {
      textSearch = s.text;
      this.userFilter();
    },
    onselectedIndexChanged: function (s) {
      checkAll = s.selectedIndex;
      this.userFilter();
    },
    createUser: function () {
      let usersData = [];
      usersData['status'] = 'idle';
      userCount = 100;
      let riyo_inf = [];
      for (let i = 0; i < userCount; i++) {
        riyo_inf.push({
          riid: '5500' + i,
          riyocode: i + 1000,
          names: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          jukyuid: i * 10,
          jyukyuno: 'num-' + i * Math.floor(Math.random() * 10) + 1,
          sityoid: i * 30,
          jidoid: i * 40,
          kzkname: '東経家族' + i,
          kakutei: 0,
          active: false,
        });
      }

      usersData['riyo_inf'] = riyo_inf;
      userDataAll = usersData;
      userDataSelect = userDataAll;

      this.userFilter();
      return riyo_inf;
    },

    userFilter() {
      let data = [];

      userDataSelect['riyo_inf'].forEach(function (value) {
        if (checkAll == '0') value.active = true;
        if (checkAll == '1') value.active = false;
        if (value.names.indexOf(textSearch) != -1) {
          data.push({
            riid: value.riid,
            riyocode: value.riyocode,
            names: value.names,
            kana: value.kana,
            jukyuid: value.jukyuid,
            jyukyuno: value.jyukyuno,
            sityoid: value.sityoid,
            jidoid: value.jidoid,
            kzkname: value.kzkname,
            kakutei: value.kakutei,
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
          if (a.riyocode < b.riyocode) return -1;
          if (a.riyocode > b.riyocode) return 1;
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
      //受給者番号でソート
      if (sortSearch == 3) {
        data.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) return -1;
          if (a.jyukyuno > b.jyukyuno) return 1;
          return 0;
        });
      }
      this.$emit('child-user', data);
      this.usersData = data;
    },
    userFilter2() {
      return true;
    },
    onInitializedUser: function (flexGrid) {
      const axiosApi = axios.create({
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let _self = this;
      axiosApi
        .get(userUrl)
        .then(function (response) {
          console.log(response);
          _self.usersData = _self.createUser();

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
          _self.$emit('child-select', 0);
        })
        .catch(function (error) {
          console.log(error);
          alert('error');
        });

      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        ht = flexGrid.hitTest(e.pageX, e.pageY);
        //選択した要素の取得
        if (e.target.innerText.length > 0) {
          let row = ht._row;
          _self.$emit('child-event', userDataSelect['riyo_inf'][row].riyocode);
          _self.$emit('child-select', row);
        }
      });
    },
  },
};

//カナアイコンフィルタリング用
function setPush(get, value) {
  return get.push({
    riid: value.riid,
    riyocode: value.riyocode,
    names: value.names,
    kana: value.kana,
    jukyuid: value.jukyuid,
    jyukyuno: value.jyukyuno,
    sityoid: value.sityoid,
    jidoid: value.jidoid,
    kzkname: value.kzkname,
    kakutei: value.kakutei,
    active: value.active,
  });
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