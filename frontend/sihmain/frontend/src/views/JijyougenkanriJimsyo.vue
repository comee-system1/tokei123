<template>
  <div id="jijyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :jyougengakuFlag="true"
    ></header-services>

    <v-container fluid class="jijyougen-container">
      <v-row class="mt-0 filterArea">
        <v-col cols="4" class="pt-1">
          <label>事業所</label>
          <wj-combo-box :items-source="jimusyoSearch"></wj-combo-box>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-0 filterArea">
        <v-col cols="3">
          <label>絞込</label>
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn small color="secondary" dark outlined :width="btnwidth"
              >全員</v-btn
            >
            <v-btn small color="secondary" dark outlined :width="btnwidth"
              >上限管理済み</v-btn
            >
            <v-btn small color="secondary" dark outlined :width="btnwidth"
              >未処理</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col cols="3">
          <label class="text-right">ソート</label>
          <v-btn-toggle v-model="toggle_sort">
            <v-btn
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="sortUser(1)"
              >カナ</v-btn
            >
            <v-btn
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="sortUser(2)"
              >コード</v-btn
            >
            <v-btn
              small
              color="secondary"
              dark
              outlined
              :width="btnwidth"
              @click="sortUser(3)"
              >受給者番</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col cols="3" class="ml-3">
          <label>カナ検索</label>
          <wj-combo-box
            :textChanged="onTextChangedUser"
            small
            color="secondary"
            dark
            outlined
            :width="btnwidth"
            placeholder="カナ検索"
          ></wj-combo-box>
        </v-col>
        <v-col cols="1" class="mt-2">
          <v-btn small color="secondary" outlined :width="btnwidth">検索</v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-1">
        <v-col cols="5">
          <v-btn-toggle class="flex-wrap">
            <v-btn
              outlined
              v-for="(n, k) in alphabet"
              :key="n"
              :width="11"
              p-0
              style="min-width: auto; padding: 15px; height: 5px"
              @click="onAlphabet(k)"
              >{{ n }}</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col cols="5"
          ><v-card elevation="0">
            <small
              >(管理結果)1:管理事務所で利用者負担額を充当 2:調整事務は行わない
              3:下記の通り調整した</small
            >
          </v-card></v-col
        >
        <v-col cols="2" class="text-right mb-1">
          <v-btn small elevation="0" @click="allcheck(1)">全選択</v-btn>
          <v-btn small class="ml-1" elevation="0" @click="allcheck(0)"
            >全解除</v-btn
          >
        </v-col>
      </v-row>
      <wj-flex-grid
        id="flexGrid"
        class="mt-1"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :autoGenerateColumns="false"
        :initialized="onInitialized"
        :isReadOnly="false"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :itemsSourceChanged="itemsSourceChanged"
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
          align="right"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'rese'"
          :header="'レセ確定'"
          :width="30"
          cssClass="cell-img"
          :cellTemplate="tplImage"
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
          align="right"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyoufutan'"
          :header="'利用者\n負担額'"
          :wordwrap="true"
          :multiLine="true"
          align="right"
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
          header="印刷"
          binding="print"
          :width="30"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>

    <v-dialog v-model="dialog" width="50%">
      <v-card class="pa-2">
        <v-card-title>上限管理 他サービス事業所実績登録</v-card-title>
        <v-container>
          <v-row class="mb-1" no-gutters>
            <v-col cols="2" class="mt-1">
              <v-card elevation="0" align="center">利用者 </v-card>
            </v-col>
            <v-col cols="10">
              <v-row no-gutters>
                <v-col cols="4"
                  ><wj-combo-box :text="jyukyuBango"></wj-combo-box
                ></v-col>
                <v-col cols="8"
                  ><wj-combo-box :text="riyou"></wj-combo-box
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
          <hr size="1" />

          <v-row class="justify-end mt-2">
            <v-btn small>他サービス前回コピー</v-btn>
            <v-btn small>順番並び替え</v-btn>
          </v-row>
          <v-row class="mt-5" no-gutters>
            <v-col cols="2" class="mt-1 pa-0">事業所名</v-col>
            <v-col cols="4" class="pa-0"
              ><wj-combo-box
                :text="dialog_jimusyoBango"
                style="width: 100%"
              ></wj-combo-box
            ></v-col>
            <v-col cols="6"
              ><wj-combo-box
                :itemsSource="dialog_jimusyoName"
                :isRequired="false"
                :selectedIndex="-1"
                :selectedIndexChanged="dialog_jimusyoNameChange"
              ></wj-combo-box
            ></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" class="mt-1">総費用額</v-col>
            <v-col cols="4"
              ><wj-combo-box
                :textChanged="dialog_souhiyogaku_change"
              ></wj-combo-box
            ></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" class="mt-1">利用者負担額</v-col>
            <v-col cols="4"
              ><wj-combo-box :text="dialog_riyosyafutangaku"></wj-combo-box
            ></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" class="mt-1">提供サービス</v-col>
            <v-col cols="8">
              <wj-combo-box
                :itemsSource="dialog_teikyoService1"
                :isRequired="false"
                :selectedIndex="-1"
                :selectedIndexChanged="dialog_teikyoService1_change"
                style="width: 300px"
              ></wj-combo-box>
              <wj-combo-box
                :itemsSource="dialog_teikyoService2"
                :selectedIndexChanged="dialog_teikyoService2_change"
                :isRequired="false"
                :selectedIndex="-1"
                style="width: 300px"
              ></wj-combo-box>
              <wj-combo-box
                :itemsSource="dialog_teikyoService3"
                :selectedIndexChanged="dialog_teikyoService3_change"
                :isRequired="false"
                :selectedIndex="-1"
                style="width: 300px"
              ></wj-combo-box>
            </v-col>
          </v-row>

          <v-card class="d-flex mt-3" elevation="0">
            <v-card elevation="0">
              <v-btn @click="dialog = false" tile outlined> 画面クリア </v-btn>
            </v-card>
            <v-card elevation="0" class="ml-1">
              <v-btn @click="dialog = false" tile outlined> 削除 </v-btn>
            </v-card>
            <v-card elevation="0" class="ml-auto">
              <v-btn @click="dialog_setting()" tile outlined> 設定 </v-btn>
            </v-card>
          </v-card>

          <hr class="mt-2" />
          <div class="mt-2">他サービス入力済一覧</div>
          <wj-flex-grid
            :itemsSource="data"
            :initialized="serviceInitialized"
            :headersVisibility="'None'"
            style="height: 100px"
          >
            <wj-flex-grid-column
              binding="id"
              header="ID"
              width="1*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              binding="jimusyoBango"
              width="2*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              binding="jimusyoName"
              width="2*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              binding="teikyoService"
              width="2*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              binding="syohiyougaku"
              width="2*"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              binding="riyousyafutangaku"
              width="2*"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
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
      year: moment().year(),
      month: moment().format('MM'),
      btnwidth: 'auto',
      data: [],
      allData: [],
      jimusyoSearch: ['指定なし', 'ひまわり園', 'すみれ介護センター'],
      dialog_jimusyoName: this.getJimusyoName(),
      dialog_jimusyoName_select: '',
      dialog_jimusyoBango: '',
      dialog_souhiyogaku: '',
      dialog_riyosyafutangaku: '',
      dialog_teikyoService1: this.getDialog_teikyoService(),
      dialog_teikyoService2: this.getDialog_teikyoService(),
      dialog_teikyoService3: this.getDialog_teikyoService(),
      dialog_teikyoService1_select: '',
      dialog_teikyoService2_select: '',
      dialog_teikyoService3_select: '',
      dateArgument: '',
      searchArgument: '',
      alphabet: alphabet,
      dialog: false,
      mainTableGrid: '',
      griddata: [],
      selectedUser: '',
      tplImage: CellMaker.makeImage({}),
      toggle_sort: 2,
      jyukyuBango: '',
      riyou: '',
      servieGrid: '',
    };
  },
  components: {
    HeaderServices,
  },
  methods: {
    dialog_souhiyogaku_change: function (e) {
      this.dialog_souhiyogaku = e.text;
    },
    dialog_teikyoService1_change: function (e) {
      this.dialog_teikyoService1_select = e.selectedIndex;
    },
    dialog_teikyoService3_change: function (e) {
      this.dialog_teikyoServic21_select = e.selectedIndex;
    },
    dialog_teikyoService2_change: function (e) {
      this.dialog_teikyoService3_select = e.selectedIndex;
    },
    getDialog_teikyoService: function () {
      let teikyoServices = [];
      teikyoServices.push({
        code: 11,
        name: '11:居宅介護',
      });
      teikyoServices.push({
        code: 15,
        name: '15:行動援護',
      });
      teikyoServices.push({
        code: 46,
        name: '46:就労継続支援B型',
      });
      let array = [];
      for (let i = 0; i < teikyoServices.length; i++) {
        array[i] = teikyoServices[i]['name'];
      }
      this.teikyoServices = teikyoServices;
      return array;
    },
    dialog_jimusyoNameChange: function (e) {
      this.dialog_jimusyoName_select = e.selectedIndex;
      this.dialog_jimusyoBango = this.jumusyoNames[e.selectedIndex].bango;
    },
    getJimusyoName: function () {
      let jumusyoNames = [];
      jumusyoNames.push({
        name: 'さくら訪問介護',
        bango: '11210001',
      });
      jumusyoNames.push({
        name: 'たんぽぽ就労事業',
        bango: '11210002',
      });
      let array = [];
      for (let i = 0; i < jumusyoNames.length; i++) {
        array[i] = jumusyoNames[i]['name'];
      }
      this.jumusyoNames = jumusyoNames;
      return array;
    },
    allcheck: function (type) {
      let chk = document.getElementsByClassName('chk');
      for (let i = 0; i < chk.length; i++) {
        chk[i].checked = type == 1 ? true : false;
      }
    },
    sortUser: function (sortType) {
      let data = this.griddata.concat();
      //かな順でソート
      if (sortType == 1) {
        data.sort((a, b) => {
          if (a.jyougenkanri < b.jyougenkanri) return -1;
          if (a.jyougenkanri > b.jyougenkanri) return 1;
          return 0;
        });
      }
      //コード順でソート
      if (sortType == 2) {
        data.sort((a, b) => {
          if (a.code < b.code) return -1;
          if (a.code > b.code) return 1;
          return 0;
        });
      }
      //受給版順でソート
      if (sortType == 3) {
        data.sort((a, b) => {
          if (a.jyukyuBango < b.jyukyuBango) return -1;
          if (a.jyukyuBango > b.jyukyuBango) return 1;
          return 0;
        });
      }
      this.griddata = data;
      this.mainTableGrid.itemsSource = data;
    },
    onAlphabet: function (key) {
      let data = this.griddata;
      if (key > 0) {
        let get = [];
        data.forEach(function (value) {
          if (value.kana) {
            switch (key) {
              case 1:
                if (value.kana.match(/^[ア-オ]/)) get.push(value);
                break;
              case 2:
                if (value.kana.match(/^[カ-コ]/)) get.push(value);
                break;
              case 3:
                if (value.kana.match(/^[サ-ソ]/)) get.push(value);
                break;
              case 4:
                if (value.kana.match(/^[タ-ト]/)) get.push(value);
                break;
              case 5:
                if (value.kana.match(/^[ナ-ノ]/)) get.push(value);
                break;
              case 6:
                if (value.kana.match(/^[ハ-ホ]/)) get.push(value);
                break;
              case 7:
                if (value.kana.match(/^[マ-モ]/)) get.push(value);
                break;
              case 8:
                if (value.kana.match(/^[ヤ-ヨ]/)) get.push(value);
                break;
              case 9:
                if (value.kana.match(/^[ラ-ロ]/)) get.push(value);
                break;
              case 10:
                if (value.kana.match(/^[ワ-ン]/)) get.push(value);
                break;
            }
          }
        });
        data = get;
      }

      this.mainTableGrid.itemsSource = data;
    },
    onTextChangedUser: function (e) {
      let data = [];
      this.allData.forEach(function (value) {
        if (value.jyougenkanri.indexOf(e.text) != -1) {
          data.push(value);
        }
      });
      this.griddata = data;
      this.mainTableGrid.itemsSource = data;
    },
    getData: function () {
      let data = [];
      for (let i = 0; i <= 3; i++) {
        data.push({
          group: i, //所属グループのid
          code: Math.random() * 100,
          space: '自',
          jyougenkanri: 'ひまわり園',
          kana: 'ヒマワリ園' + Math.random() * 100,
          city: '東経市',
          jyukyuBango: '110001' + i,
          riyou: '東経太郎',
          riyousyafutan: 9300,
          rese: '', //require('@/assets/kaku_15px.png'),
          kouban: 1,
          jigyosyoBango: '1121' + i,
          jigyosyoMei: 'すみれ介護センター',
          teikyoService: '11:居宅介護',
          souhiyogaku: 98500,
          riyoufutan: 9300,
          nyuryoku: '',
          print: true,
        });
      }
      for (let i = 0; i <= 1; i++) {
        data.push({
          group: i,
          code: Math.random() * 100,
          space: '自',
          jyougenkanri: 'ひまわり園',
          kana: 'ヒマワリ園' + i,
          city: '東経市',
          jyukyuBango: '110001' + (i % 3),
          riyou: '東経太郎',
          riyousyafutan: 9300,
          rese: '', //require('@/assets/kaku_15px.png'),
          kouban: 2,
          jigyosyoBango: '1121' + i,
          jigyosyoMei: 'ひまわり園',
          teikyoService: '11:居宅介護',
          souhiyogaku: 98500,
          riyoufutan: 9300,
          nyuryoku: '',
          print: true,
        });
      }
      data.sort((a, b) => {
        if (a.kouban < b.kouban) return -1;
        if (a.kouban > b.kouban) return 1;
        return 0;
      });

      //初期は受給版順でソート
      data.sort((a, b) => {
        if (a.jyukyuBango < b.jyukyuBango) return -1;
        if (a.jyukyuBango > b.jyukyuBango) return 1;
        return 0;
      });

      //グループ順でソート
      data.sort((a, b) => {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      });
      this.allData = data;
      return data;
    },
    serviceInitialized: function (grid) {
      while (grid.rows.length <= 9) {
        grid.rows.push(new wjGrid.Row());
      }

      this.servieGrid = grid;
    },
    dialog_setting: function () {
      //ダイアログの設定ボタン
      console.log(this.dialog_souhiyogaku);
      let dialogDatas = [];
      dialogDatas.push({
        id: this.selectedUser['kouban'] + 1,
        jimusyoBango: this.dialog_jimusyoBango,
        jimusyoName: this.jumusyoNames[this.dialog_jimusyoName_select].name,
        teikyoService:
          this.teikyoServices[this.dialog_teikyoService1_select].name,
        syohiyougaku: this.dialog_souhiyogaku,
        riyousyafutangaku: this.dialog_riyosyafutangaku,
      });
      this.setServiceGridData(this.servieGrid, dialogDatas);
    },
    setServiceGridData(grid, dialogData) {
      console.log(dialogData);

      for (let i = 0; i < dialogData.length; i++) {
        let j = 0;
        grid.setCellData(i, j++, dialogData[i]['id']);
        grid.setCellData(i, j++, dialogData[i]['jimusyoBango']);
        grid.setCellData(i, j++, dialogData[i]['jimusyoName']);
        grid.setCellData(i, j++, dialogData[i]['teikyoService']);
        grid.setCellData(i, j++, dialogData[i]['syohiyougaku']);
        grid.setCellData(i, j++, dialogData[i]['riyousyafutangaku']);
      }
    },
    onInitialized: function (grid) {
      let griddata = this.getData();
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
      let _self = this;
      grid.hostElement.addEventListener('click', function (e) {
        var ht = grid.hitTest(e);
        let hPage = grid.hitTest(e.pageX, e.pageY);
        // console.log(ht.target.innerText);
        // console.log(e.target.innerHTML);
        // console.log(hPage);
        //入力・計算を押下
        if (
          hPage.col == 13 &&
          (ht.target.innerText == '' || ht.target.innerText == '〇')
        ) {
          //表示している配列の選択値を取得
          if (_self.data.length) {
            _self.selectedUser = _self.data[hPage.row];
          } else {
            _self.selectedUser = griddata[hPage.row];
          }
          e.target.innerText = '〇';
          _self.dialog = true;
          _self.jyukyuBango = _self.selectedUser['jyukyuBango'];
          _self.riyou = _self.selectedUser['riyou'];
        }
      });
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

      this.mainTableGrid = grid;
      this.griddata = griddata;
      grid.itemsSource = griddata;
    },
    // onFormatItem(flexGrid, e) {
    //   console.log(flexGrid);
    //   console.log(e);
    // },
    itemsSourceChanged: function (grid) {
      let griddata = this.griddata;
      let merge = [];
      let j = 0;
      for (let i = 0; i < griddata.length; i++) {
        if (
          (griddata[i + 1] &&
            griddata[i]['jyukyuBango'] == griddata[i + 1]['jyukyuBango']) ||
          (griddata[i - 1] &&
            griddata[i]['jyukyuBango'] == griddata[i - 1]['jyukyuBango'])
        ) {
          merge.push({
            row: j,
            jyukyuBango: griddata[i]['jyukyuBango'],
          });
        }
        j++;
      }
      let end = [];
      for (let i = 0; i < merge.length; i++) {
        end[merge[i].jyukyuBango] = { row: i };
      }
      let start = [];
      for (let i = merge.length - 1; i >= 0; --i) {
        start[merge[i].jyukyuBango] = { row: i };
      }
      for (let i = 0; i < griddata.length; i++) {
        let j = 0;

        grid.setCellData(i, j++, griddata[i]['space']);
        grid.setCellData(i, j++, griddata[i]['jyougenkanri']);
        grid.setCellData(i, j++, griddata[i]['city']);
        grid.setCellData(i, j++, griddata[i]['jyukyuBango']);
        grid.setCellData(i, j++, griddata[i]['riyou']);
        grid.setCellData(i, j++, griddata[i]['riyousyafutan']);
        grid.setCellData(i, j++, griddata[i]['rese']);
        grid.setCellData(i, j++, griddata[i]['kouban']);
        grid.setCellData(i, j++, griddata[i]['jigyosyoBango']);
        grid.setCellData(i, j++, griddata[i]['jigyosyoMei']);
        grid.setCellData(i, j++, griddata[i]['teikyoService']);
        grid.setCellData(i, j++, griddata[i]['souhiyogaku']);
        grid.setCellData(i, j++, griddata[i]['riyoufutan']);
        grid.setCellData(i, j++, griddata[i]['nyuryoku']);
        grid.setCellData(i, j++, '');
        grid.setCellData(i, j++, '');
        grid.setCellData(i, j++, griddata[i]['print']);
      }
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
@import '@/assets/scss/common.scss';
</style>