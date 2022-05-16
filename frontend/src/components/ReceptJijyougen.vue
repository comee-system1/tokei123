<template>
  <div id="recept-jijyougen" class="mt-n5">
    <wj-flex-grid
      id="grid_jijyougen"
      :initialized="onInitialized"
      :itemsSourceChanged="onitemsSourceChanged"
      :allowMerging="6"
      :headersVisibility="'Column'"
      :alternatingRowStep="0"
      :allowDragging="false"
      :allowResizing="false"
      :deferResizing="false"
      :allowSorting="false"
      :itemsSource="receptData"
    >
      <wj-flex-grid-column
        :binding="'sityoson'"
        :header="'市町村名'"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyukyusyaBango'"
        :header="'受給者番号'"
        align="center"
        width="2*"
        format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyousyamei'"
        :header="'利用者名'"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougenicon'"
        :header="'上限額\n管理事業所'"
        :multiLine="true"
        align="center"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougengaku'"
        :multiLine="true"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutan'"
        :header="centerHeader[2]"
        :multiLine="true"
        align="right"
        format="n0"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resehanei'"
        :width="30"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kobanSorts'"
        :header="verticalHeader[4]"
        :width="30"
        align="center"
        valign="middle"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyosyobango'"
        :header="'事業所番号'"
        width="2*"
        align="center"
        :format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyosyomei'"
        :header="'事業所名'"
        width="2*"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'teikyoservice'"
        :header="'提供\nサービス'"
        width="2*"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'souhiyougaku'"
        :header="centerHeader[3]"
        width="2*"
        align="right"
        :multiLine="true"
        :format="'n0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutangaku'"
        :header="centerHeader[0]"
        width="2*"
        align="right"
        :format="'n0'"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'hensyu'"
        :header="verticalHeader[5]"
        :width="30"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekkafutangaku'"
        :header="centerHeader[1]"
        width="3*"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekka'"
        :header="verticalHeader[1]"
        align="center"
        :width="30"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resekakutei'"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="print"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>
    <div id="menubar">
      <v-btn
        elevation="2"
        outlined
        tile
        block
        id="jigyosyoMisiyo"
        @click="jigyosyoMisiyo()"
        >事業所未使用</v-btn
      >
      <v-btn
        elevation="2"
        outlined
        tile
        mt-1
        block
        id="jigyosyoAdd"
        @click="jigyosyoAddList()"
        >事業所追加</v-btn
      >
    </div>
    <!--事業所追加押下確認ダイアログ-->
    <v-dialog v-model="jigyosyoAdd.flag" width="500">
      <wj-flex-grid
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :itemsSource="receptParts"
        id="receptParts"
      >
        <wj-flex-grid-column
          :binding="'jigyosyobango'"
          :header="'登録済 他サービス事業所一覧'"
          align="center"
          width="*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jigyosyomei'"
          align="center"
          width="*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'teikyoservice'"
          align="center"
          width="*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'regist_select'"
          :header="'選択'"
          align="center"
          :width="32"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
      <v-btn>追加</v-btn>
    </v-dialog>
    <!--事業所未使用押下確認ダイアログ-->
    <v-dialog v-model="jigyosyoMisiyoConfirm.flag" width="500">
      <v-card class="pa-4">
        <v-card-text class="pa-0"
          >{{ jigyosyoMisiyoConfirm.message }}
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="jigyosyoMisiyoConfirm.flag = false"
          >
            キャンセル
          </v-btn>
          <v-btn color=" darken-1" text @click="jigyosyoMisiyoAdd()">
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';

import { isNumber, changeType, DataType } from '@grapecity/wijmo';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      verticalHeader: [
        '上限額管理計算',
        '管理結果',
        'レセプト確定',
        '印刷',
        '項番',
        '編集',
      ],
      centerHeader: [
        '利用者\n負担額',
        '管理結果\n後利用者\n負担額',
        '利用者負担\n上限金額',
        '総費用額',
      ],
      receptData: this.getData(),
      mainFlexGrid: [],
      editGridFlag: false,
      jigyosyoMisiyoConfirm: { flag: false, message: '' }, // 事業所未使用
      jigyosyoAdd: { flag: false },
      receptParts: [],
    };
  },
  components: {},
  methods: {
    /*******************
     * 確定登録・解除ボタン
     */
    parentDefineButton(type) {
      console.log(type);
      for (let i = 0; i < this.allData.length; i++) {
        let mark = this.mainFlexGrid.getCellData(i, 15);
        console.log(mark);
        if (mark == '〇') {
          this.mainFlexGrid.setCellData(i, 15, 'complete');

          this.allData[i]['complateFlag'] = true;
        }
        //this.allData[i]['print'] = mark;
      }
    },
    /*******************
     * アルファベット絞り込み
     */
    parentAlphabet(alphaSearch) {
      let get = [];
      let data = this.allData;
      data.forEach(function (value) {
        switch (alphaSearch) {
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
      });
      data = get;

      this.receptData = data;
    },
    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.allData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.riyousyamei < b.riyousyamei) return -1;
          if (a.riyousyamei > b.riyousyamei) return 1;
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.code < b.code) return -1;
          if (a.code > b.code) return 1;
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jigyosyobango < b.jigyosyobango) return 1;
          if (a.jigyosyobango > b.jigyosyobango) return -1;
          return 0;
        });
      }

      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
    },
    /**********************
     * 親コンポーネントの全選択/全解除
     */
    parentSelectAll(type) {
      let mark = '';
      if (type == 1) mark = '〇';
      for (let i = 0; i < this.allData.length; i++) {
        this.mainFlexGrid.setCellData(i, 17, mark);
        this.allData[i]['print'] = mark;
      }
    },
    /***********
     * 親コンポーネントの上限管理計算へ反映ボタン
     */
    parentReceptCalc() {
      alert('aaa');
    },
    getData: function () {
      let receptData = [];
      for (let i = 0; i < 4; i++) {
        //  for (let j = 0; j < Math.floor(Math.random() * 5) + 2; j++) {
        receptData.push({
          sityoson: '東経市',
          jyukyusyaBango: '1000',
          //  jyukyusyaBango: '1000' + i,
          code: 10000000,
          riyousyamei: '東経太郎' + i,
          kana: 'トウケイタロウ',
          jyougenicon: '自',
          jyougengaku: '南山事務所',
          riyosyafutan: 9000,
          resehanei: '',
          //kobanSorts: j + 1,
          kobanSorts: i + 1,
          // jigyosyobango: '1000000' + i + j,
          jigyosyobango: '1000000' + i,
          jigyosyomei: 'ひまわり園',
          teikyoservice: '22 生活介護',
          souhiyougaku: '',
          riyosyafutangaku: '',
          kanrikekkafutangaku: '',
          kanrikekka: '',
          resekakutei: '',
          print: '',
          complateFlag: false, // 確定状態
          fixFlag: i % 4 == 0, //変更不可データ
          viewflag: true, //表示状態
        });
        //  }
      }
      for (let i = 0; i < 3; i++) {
        //  for (let j = 0; j < Math.floor(Math.random() * 5) + 2; j++) {
        receptData.push({
          sityoson: '東経市',
          jyukyusyaBango: '1001',
          //  jyukyusyaBango: '1000' + i,
          code: 10000000,
          riyousyamei: '東経太郎' + i,
          kana: 'トウケイタロウ',
          jyougenicon: '自',
          jyougengaku: '南山事務所',
          riyosyafutan: 9000,
          resehanei: '',
          //kobanSorts: j + 1,
          kobanSorts: i + 1,
          // jigyosyobango: '1000000' + i + j,
          jigyosyobango: '1000000' + i,
          jigyosyomei: 'ひまわり園',
          teikyoservice: '22 生活介護',
          souhiyougaku: '',
          riyosyafutangaku: '',
          kanrikekkafutangaku: '',
          kanrikekka: '',
          resekakutei: '',
          print: '',
          complateFlag: false, // 確定状態
          fixFlag: i % 3 == 0, //変更不可データ
          viewflag: true, //表示状態
        });
        //  }
      }

      // データ配列の成型
      receptData = this.fixDefaultTypeArray(receptData);

      //マージ用の配列を作成
      let merge = this.createMergeArray(receptData);

      this.merge = merge;
      this.allData = receptData;
      return receptData;
    },
    /******************
     * データ配列の成型
     */
    fixDefaultTypeArray: function (receptData) {
      // 項番でソート
      receptData.sort((a, b) => {
        if (a.kobanSorts < b.kobanSorts) return -1;
        if (a.kobanSorts > b.kobanSorts) return 1;
        return 0;
      });
      // 受給者番号でソート
      receptData.sort((a, b) => {
        if (a.jyukyusyaBango < b.jyukyusyaBango) return -1;
        if (a.jyukyusyaBango > b.jyukyusyaBango) return 1;
        return 0;
      });

      //項番をキャスト
      for (let i = 0; i < receptData.length; i++) {
        receptData[i]['kobanSorts'] = String(receptData[i]['kobanSorts']);
      }
      // viewFlagがtrueのデータのみ取得
      let returns = [];
      for (let i = 0; i < receptData.length; i++) {
        if (receptData[i]['viewflag'] == true) {
          returns.push(receptData[i]);
        }
      }

      return returns;
    },
    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray: function (receptData) {
      //jyukyusyaBango をキーに変更し、グループ化をする
      let array = [];
      for (let i = 0; i < receptData.length; i++) {
        //配列の要素数を指定する
        array[receptData[i]['jyukyusyaBango']] = [];
        for (let j = 0; j < receptData.length; j++) {
          if (
            receptData[i]['jyukyusyaBango'] == receptData[j]['jyukyusyaBango']
          ) {
            array[receptData[i]['jyukyusyaBango']].push({ j });
          }
        }
      }

      let merge = [];
      array.forEach(function (elem, key) {
        merge.push({
          k: key,
          first: elem[0].j,
          last: elem.length + elem[0].j,
        });
      });
      return merge;
    },
    onitemsSourceChanged: function (flexGrid) {
      this.mainFlexGrid = flexGrid;
      let array = this.receptData;
      let merge = this.createMergeArray(array);
      this.merge = merge;

      // データセルのマージ
      this.createCellMerge(flexGrid);
    },
    onInitialized: function (flexGrid) {
      this.mainFlexGrid = flexGrid;
      let _self = this;
      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);

      // セルのマージ
      //this.createCellMerge(flexGrid);

      //セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      //セルのフォーマット指定
      this.createCellFormat(flexGrid, _self);

      // セルの値を編集
      this.edittingCell(flexGrid, _self);

      //flexGrid.itemsSource = griddata;
    },
    /******************
     * 事務所追加ボタンを押下
     */
    jigyosyoAddList: function () {
      // 編集列の選択値を取得
      this.jigyosyoAdd.flag = true;
      console.log(this.hensyuTarget);
      console.log(this.hensyuTargetRow);
      console.log(this.allData);
      //受給者番号が同じデータのみ表示
      let jyukyusyaBango = this.hensyuTarget.jyukyusyaBango;
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (jyukyusyaBango == this.allData[i].jyukyusyaBango) {
          array.push({
            jigyosyobango: this.allData[i].jigyosyobango,
            jigyosyomei: this.allData[i].jigyosyomei,
            teikyoservice: this.allData[i].teikyoservice,
          });
        }
      }
      this.receptParts = array;
    },

    /******************
     * 事務所未使用ボタンを押下
     */
    jigyosyoMisiyo: function () {
      // 編集列の選択値を取得
      let jM = this.hensyuTarget.jigyosyomei;
      let tS = this.hensyuTarget.teikyoservice;
      let message = jM + ' ' + tS + 'を未使用に設定します。よろしいですか？';

      this.jigyosyoMisiyoConfirm.flag = true;
      this.jigyosyoMisiyoConfirm.message = message;
    },
    /*************
     * 事業所未使用ボタンのはいを実行
     */
    jigyosyoMisiyoAdd: function () {
      // 入力した利用者の「上限額管理計算」に〇が表示される
      // 変更場所の受給者番号取得
      let jB = this.getClickJyukyusyaBango(this.hensyuTargetRow);
      //受給者番号が持つ行数の取得
      let jBrow = this.getJyukyusyaBangoRow(jB);
      //クリックした行数
      let row = this.hensyuTargetRow;
      for (let i = jBrow.first; i < jBrow.last; i++) {
        this.mainFlexGrid.setCellData(i, 6, '〇');
      }
      this.jigyosyoMisiyoConfirm.flag = false;
      document.getElementById('menubar').style.display = 'none';
      this.mainFlexGrid.setCellData(row, 13, ' ');

      let get = [];
      let data = this.allData;
      let i = 0;
      let _self = this;
      data.forEach(function (value) {
        if (i == row) {
          // 非表示用
          _self.allData[i]['viewflag'] = false;
        } else {
          get.push(value);
          _self.allData[i]['viewflag'] = true;
        }
        i++;
      });
      this.receptData = get;
      //this.allData = get;
      this.mainFlexGrid.itemsSource = [];
    },
    /****************
     * セルのクリックイベント
     */
    clickEventCell: function (flexGrid, _self) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        //レセプト確定セルを押下し、確定アイコンの表示
        let ht = flexGrid.hitTest(e);
        // console.log(ht.target.innerHTML);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let text = ht.target.innerText;
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          //編集カラムを押下
          if (hPage.col == 13) {
            let element = document.getElementById('menubar');
            if (flexGrid.getCellData(hPage.row, 13) == '〇') {
              flexGrid.setCellData(hPage.row, 13, ' ');
              _self.receptData[hPage.row]['hensyu'] = '';
              element.style.display = 'none';
            } else {
              for (let i = 0; i < _self.receptData.length; i++) {
                flexGrid.setCellData(i, 13, '');
                _self.receptData[i]['hensyu'] = '';
              }
              element.style.display = 'none';

              if (flexGrid.getCellData(hPage.row, 13) == '') {
                let mark = '〇';
                flexGrid.setCellData(hPage.row, 13, mark);
                _self.receptData[hPage.row]['hensyu'] = mark;
                // 編集対象のデータを保持
                _self.hensyuTarget = _self.receptData[hPage.row];
                // 編集対象の行
                _self.hensyuTargetRow = hPage.row;
                element.style.top = e.pageY + 'px';
                element.style.left = e.pageX + 'px';
                element.style.display = 'block';
                // fixFlagがtrueの時は、事業所未使用を非表示にする
                document.getElementById('jigyosyoMisiyo').style.display =
                  'block';
                if (_self.receptData[hPage.row]['fixFlag']) {
                  document.getElementById('jigyosyoMisiyo').style.display =
                    'none';
                }
              }
            }
          }
          //印刷カラムを押下
          if (hPage.col == 17) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 17) == '〇') mark = '';
            flexGrid.setCellData(hPage.row, 17, mark);
            _self.receptData[hPage.row]['print'] = mark;
          }
          // レセプト確定カラムを押下
          if (hPage.col == 16) {
            if (ht.target.innerText == '〇') {
              flexGrid.setCellData(hPage.row, 16, '');
              _self.receptData[hPage.row]['resekakutei'] = '';
            }
            if (ht.target.innerText == 'complete') {
              flexGrid.setCellData(hPage.row, 16, 'delete');
              _self.receptData[hPage.row]['resekakutei'] = 'delete';
              _self.receptData[hPage.row]['complateFlag'] = false;
            }
            if (ht.target.innerText == 'delete') {
              flexGrid.setCellData(hPage.row, 16, 'complete');
              _self.receptData[hPage.row]['resekakutei'] = 'complete';
              _self.receptData[hPage.row]['complateFlag'] = true;
            }
          }

          // 順番列を押下
          // グループ化された項番を一度クリアし、クリックした順番に番号を振りなおす
          if (hPage.col == 7) {
            //クリックした際の受給者番号取得
            let jB = _self.getClickJyukyusyaBango(hPage.row);
            //受給者番号が持つ行数の取得
            let jBrow = _self.getJyukyusyaBangoRow(jB);

            if (text == '') {
              // 順番の最大値を取得
              let numbers = [];
              for (let i = jBrow.first; i < jBrow.last; i++) {
                numbers.push(_self.allData[i].kobanSorts);
              }
              var max = numbers.reduce(function (a, b) {
                return Math.max(a, b);
              });
              let num = max + 1;
              flexGrid.setCellData(hPage.row, 7, num);
              _self.allData[hPage.row].kobanSorts = num;
            } else {
              for (let i = jBrow.first; i < jBrow.last; i++) {
                flexGrid.setCellData(i, 7, '');
                _self.allData[i].kobanSorts = '';
              }
            }
          }
        }
      });
    },
    /*************
     * クリックした際の受給者番号取得
     */
    getClickJyukyusyaBango: function (row) {
      return this.allData[row].jyukyusyaBango;
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyusyaBangoRow: function (jb) {
      let data = [];
      for (let i = 0; i < this.merge.length; i++) {
        let key = this.merge[i].k;
        if (key == jb) {
          data.push(this.merge[i]);
        }
      }
      return data[0];
    },
    /********
     * セルを編集
     */
    edittingCell: function (flexGrid, _self) {
      flexGrid.beginningEdit.addHandler(function (senders, args) {
        if (_self.allData[args.row].complateFlag) {
          if (args.col == 13 || args.col == 14) {
            args.cancel = true;
          }
        }
      });
      flexGrid.cellEditEnding.addHandler((s, e) => {
        let col = s.columns[e.col];
        let value = changeType(
          s.activeEditor.value,
          DataType.Number,
          col.format
        );

        // console.log('length=>' + _self.allData.length);
        // console.log('row=>' + e.row);
        // console.log('col=>' + e.col);
        // console.log('value=>' + value);
        // console.log(isNumber(value));

        let pt_souhiyou = flexGrid.getCellData(e.row, 11);
        let pt_riyousyafutan = flexGrid.getCellData(e.row, 12);
        if (e.col == 11 || e.col == 12) {
          if (!isNumber(value) && value.length > 0) {
            e.cancel = true;
            e.stayInEditMode = true;
            alert('数値のみの入力になります。');
          } else if (
            (pt_souhiyou > 0 && value) ||
            (pt_riyousyafutan > 0 && value)
          ) {
            // 総費用額と利用者負担額の欄に入力後、入力した利用者の「上限額管理計算」に〇が表示される
            // 変更場所の受給者番号取得
            let jB = _self.getClickJyukyusyaBango(e.row);
            //受給者番号が持つ行数の取得
            let jBrow = _self.getJyukyusyaBangoRow(jB);
            for (let i = jBrow.first; i < jBrow.last; i++) {
              flexGrid.setCellData(i, 6, '〇');
            }
            flexGrid.setCellData(e.row, 15, '');
          }
        }
      });
    },

    /*****************
     * セルのフォーマット指定
     */
    createCellFormat: function (flexGrid, _self) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;

        let classname = '';

        if (
          text == _self.verticalHeader[0] ||
          text == _self.verticalHeader[1] ||
          text == _self.verticalHeader[2] ||
          text == _self.verticalHeader[3] ||
          text == _self.verticalHeader[5] ||
          text == _self.verticalHeader[4]
        ) {
          classname = 'vertical';
        }
        if (
          text == _self.centerHeader[0] ||
          text == _self.centerHeader[1] ||
          text == _self.centerHeader[2] ||
          text == _self.centerHeader[3]
        ) {
          classname = 'text-center';
        }
        // if (text == '〇' || text == '●') {
        //   classname = 'vertical';
        // }
        // if (text == 'complete') {
        //   classname = 'complete';
        // } else if (text == 'delete') {
        //   classname = 'delete';
        // }

        // 固定行データ
        if (_self.allData[e.row] && _self.allData[e.row].fixFlag) {
          if (e.panel == flexGrid.cells) {
            e.cell.style.background = '#fffeed';
          }
        }

        //if (classname) {
        if (e.panel == flexGrid.columnHeaders) {
          e.cell.innerHTML =
            '<div class="text-center w-100 ' +
            classname +
            '">' +
            html +
            '</div>';
        }
        //}
        if (e.panel == flexGrid.cells && e.col == 6) {
          e.cell.innerHTML = '<div "' + classname + '">' + html + '</div>';
          wjCore.setCss(e.cell, {
            display: 'table',
            tableLayout: 'absolute',
            verticalAlign: 'middle',
          });
          wjCore.setCss(e.cell.children[0], {
            display: 'table-cell',
            verticalAlign: 'middle',
          });
        }
      });
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader: function (flexGrid, _self) {
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 6, _self.verticalHeader[0]);
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 13, _self.verticalHeader[5]);
      panel.setCellData(0, 14, '上限管理後');
      panel.setCellData(0, 16, _self.verticalHeader[2]);
      panel.setCellData(0, 17, _self.verticalHeader[3]);
      flexGrid.columnHeaders.rows[1].height = 90;
    },
    /**************
     * 全体セルのマージ
     */
    createCellMerge: function (flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5), //基本情報
        new wjGrid.CellRange(0, 6, 1, 6), //レセプト
        new wjGrid.CellRange(1, 3, 1, 4), //上限額管理事業所
        new wjGrid.CellRange(0, 7, 0, 12), //利用者請求実績
        new wjGrid.CellRange(0, 13, 1, 13), //編集
        new wjGrid.CellRange(0, 14, 0, 15), //上限管理後
        new wjGrid.CellRange(0, 16, 1, 16), //レセプト確定
        new wjGrid.CellRange(0, 17, 1, 17), //印刷
      ];
      // データセル用のマージ配列の作成
      let ranges = [];
      for (let i = 0; i < this.merge.length; i++) {
        for (let j = 0; j <= 6; j++) {
          ranges.push(
            new wjGrid.CellRange(
              this.merge[i].first,
              j,
              this.merge[i].last - 1,
              j
            )
          );
        }
      }

      let mm = new wjGrid.MergeManager(flexGrid);
      console.log(ranges);

      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };

      flexGrid.mergeManager = mm;
    },
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#recept-jijyougen {
  #grid_jijyougen {
    height: 52vh;
  }
  .wj-flexgrid .wj-cell {
    display: flex;
    font-size: 12px;
    font-weight: normal;
  }

  .wj-header.wj-cell {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
  }

  .wj-header.wj-cell.wj-align-center {
    justify-content: center;
  }

  .wj-state-selected,
  .wj-state-last-selected {
    color: $font_color;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }

  .complete {
    background-image: url('@/assets/kaku_15px.png');
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .delete {
    background-image: url('@/assets/kesu_15px.png');
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
  }

  #menubar {
    display: none;
    position: absolute;
    background-color: $white;
    min-width: 80px;
    border: 1px solid $light-gray;
    top: 0;
    left: 0;

    #jigyosyoMisiyo {
      color: $red;
    }
  }
}
</style>