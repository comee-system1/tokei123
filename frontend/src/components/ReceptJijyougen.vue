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
      :style="gridHeight"
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
        width="3*"
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
        :binding="'jyougengakuJigyosyo'"
        :multiLine="true"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutanGetsugaku'"
        :header="'利用者負担\n上限月額'"
        :multiLine="true"
        format="n0"
        :width="60"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougengakukanrikeisan'"
        :width="24"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'koban'"
        :header="'項番'"
        :width="24"
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
        width="3*"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'teikyoservice'"
        :header="'提供\nサービス'"
        width="3*"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'souhiyougaku'"
        :header="'総費用額'"
        width="2*"
        align="right"
        :multiLine="true"
        :format="'n0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutangaku'"
        :header="'利用者\n負担額'"
        width="2*"
        align="right"
        :format="'n0'"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'hensyu'"
        :width="24"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekkafutangaku'"
        :header="'管理結果\n後利用者\n負担額'"
        width="2*"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekka'"
        :header="'管理結果'"
        align="center"
        :width="24"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resekakutei'"
        :width="24"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="print"
        :width="24"
        :isReadOnly="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>

    <div id="menubar">
      <v-btn
        elevation="2"
        icon
        small
        absolute
        top
        right
        @click="menubar_close()"
        color="secondary"
        ><v-icon dark small> mdi-close </v-icon></v-btn
      >
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
    <v-dialog v-model="jigyosyoAdd.flag" width="600">
      <div style="position: relative">
        <wj-flex-grid
          :allowMerging="6"
          :headersVisibility="'Column'"
          :alternatingRowStep="0"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :itemsSource="receptParts"
          :initialized="onAddInitialized"
          class="receptParts"
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
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'regist_select'"
            :header="'選択'"
            align="center"
            width="1*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
        <v-row class="receptPartsArea mt-n2" no-gutters>
          <v-col cols="12">
            <v-btn small @click="add()">追加</v-btn>
          </v-col>
        </v-row>
      </div>
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
import '@/assets/scss/common.scss';
import { getReceptJijyogenData } from '@/data/receptJiJyougenData.js';
import * as wjGrid from '@grapecity/wijmo.grid';
//import * as wjCore from '@grapecity/wijmo';
import { isNumber, changeType, DataType } from '@grapecity/wijmo';
import sysConst from '@/utiles/const';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      receptData: [],
      mainFlexGrid: [],
      filterTextJyogen: { jyougenkanrijiKey: 0, jyougenkanriji: '指定なし' }, // 検索項目
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      filterSibori: { type: 1 }, // 絞込
      alphaSelect: 0,
      gridHeight: '', // グリッドの高さ
      jigyosyoAdd: { flag: false },
      editGridFlag: false,
      jigyosyoMisiyoConfirm: { flag: false, message: '' }, // 事業所未使用
      receptParts: [], // レセプト追加用
      completeJudgeButton: 0, // 確定登録・解除ボタン判定
      editBackColorCell: [],
    };
  },
  components: {},
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 54;
      if (height > 800) {
        ht = 65;
      } else if (height > 700) {
        ht = 58;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
    /*******************
     * 確定登録・解除ボタン
     */
    parentDefineButton(type) {
      this.completeJudgeButton = type;

      for (let i = 0; i < this.receptData.length; i++) {
        if (type == 2) {
          // 確定解除
          this.mainFlexGrid.setCellData(i, 16, '');
          this.receptData[i]['resekakutei'] = '';
          this.receptData[i]['complateFlag'] = false;
        } else {
          let mark = this.receptData[i]['resekakutei'];
          //   let _self = this;
          if (mark == '〇') {
            this.mainFlexGrid.setCellData(i, 16, 'complete');
            this.receptData[i]['resekakutei'] = 'complete';
            this.receptData[i]['complateFlag'] = true;
          }
        }
      }
    },

    /*****************************
     * 事業所追加用ダイアログ追加ボタン
     */
    add() {
      // 入力した利用者の「上限額管理計算」に〇が表示される
      this.setJyougenKanriCalc();

      let _self = this;
      this.receptParts.forEach(function (value) {
        _self.allData[value['key']]['viewflag'] = value['regist_select'];
        _self.allData[value['key']]['hensyu'] = '';
      });

      // viewFlagが1以上のデータのみ取得
      let returns = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i]['viewflag'] >= 1) {
          returns.push(this.allData[i]);
        }
      }
      this.receptData = returns;
      this.mainFlexGrid.itemsSource = [];
      this.jigyosyoAdd.flag = false;
      document.getElementById('menubar').style.display = 'none';
    },

    /*****************************
     * 事業所追加用
     */
    onAddInitialized(flexGrid) {
      this.addFlexGrid = flexGrid;
      let _self = this;
      // セルのクリックイベント
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let text = ht.target.innerText;
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 〇を記載
          if (text.length == 0) {
            flexGrid.setCellData(hPage.row, 3, 1);
            _self.receptParts[hPage.row]['regist_select'] = 1;
          }
        }
      });

      //セルのフォーマット
      flexGrid.formatItem.addHandler(function (s, e) {
        let text = e.cell.innerText;
        let classname = '';
        if (text == 0) {
          text = '';
        } else if (text == 1) {
          text = '〇';
        } else if (text == 2) {
          text = '〇';
          classname = 'fixgrey';
        }
        e.cell.innerHTML =
          '<div class="text-center ' + classname + '">' + text + '</div>';
      });
      //セルのマージ
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 2), //基本情報
      ];
      let mm = new wjGrid.MergeManager(flexGrid);
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /******************
     * 事務所追加ボタンを押下
     */
    jigyosyoAddList() {
      // 編集列の選択値を取得
      this.jigyosyoAdd.flag = true;
      //表示中のデータを取得
      let jud = [];
      for (let i = 0; i < this.receptData.length; i++) {
        jud.push({
          jigyosyobango: this.receptData[i].jigyosyobango,
          jyukyusyaBango: this.receptData[i].jyukyusyaBango,
        });
      }
      // 表示データの選択に〇を表示する
      let jyukyusyaBango = this.hensyuTarget.jyukyusyaBango;
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (jyukyusyaBango == this.allData[i].jyukyusyaBango) {
          let viewflag = 0;
          for (let j = 0; j < jud.length; j++) {
            if (this.allData[i]['viewflag'] == 2) {
              viewflag = 2;
            } else if (
              jud[j]['jigyosyobango'] == this.allData[i]['jigyosyobango'] &&
              jud[j]['jyukyusyaBango'] == this.allData[i]['jyukyusyaBango']
            ) {
              viewflag = 1;
            }
          }
          this.allData[i]['viewflag'] = viewflag;
          array.push({
            key: i,
            jigyosyobango: this.allData[i].jigyosyobango,
            jyukyusyaBango: this.allData[i].jyukyusyaBango,
            jigyosyomei: this.allData[i].jigyosyomei,
            teikyoservice: this.allData[i].teikyoservice,
            regist_select: viewflag,
          });
        }
      }
      this.receptParts = array;
    },
    /******************
     * 事務所未使用ボタンを押下
     */
    jigyosyoMisiyo() {
      // 編集列の選択値を取得
      let jM = this.hensyuTarget.jigyosyomei;
      let tS = this.hensyuTarget.teikyoservice;
      let message = jM + ' ' + tS + 'を未使用に設定します。よろしいですか？';
      this.jigyosyoMisiyoConfirm.flag = true;
      this.jigyosyoMisiyoConfirm.message = message;
    },

    /**************
     * 編集用メニューを閉じる
     */
    menubar_close() {
      this.mainFlexGrid.setCellData(this.hensyuTargetRow, 13, ' ');
      this.receptData[this.hensyuTargetRow]['hensyu'] = '';
      document.getElementById('menubar').style.display = 'none';
    },

    /*************
     * 事業所未使用ボタンのはいを実行
     */
    jigyosyoMisiyoAdd() {
      let get = [];
      // 入力した利用者の「上限額管理計算」に〇が表示される
      this.setJyougenKanriCalc();
      //クリックした行数
      let row = this.hensyuTargetRow;
      this.jigyosyoMisiyoConfirm.flag = false;
      document.getElementById('menubar').style.display = 'none';
      this.mainFlexGrid.setCellData(row, 13, '');
      let data = this.receptData;
      let i = 0;
      data.forEach(function (value) {
        if (i != row) {
          value.hensyu = '';
          // 非表示用
          get.push(value);
        }
        i++;
      });

      this.receptData = get;
      this.mainFlexGrid.itemsSource = [];
    },
    /*********************
     * レセプト確定の値を指定する
     */
    editReseKaku(row, code) {
      // 変更場所の受給者番号取得
      let jB = this.getClickJyukyusyaBango(row);
      //受給者番号が持つ行数の取得
      let jBrow = this.getJyukyusyaBangoRow(jB);

      // 確定解除した際の背景色を白に戻す配列
      for (let i = jBrow.first; i < jBrow.last; i++) {
        // this.mainFlexGrid.setCellData(i, 16, code);
        this.receptData[i]['resekakutei'] = code;
        if (code == '') {
          this.receptData[i]['complateFlag'] = false;
          if (this.receptData[i]['fixFlag'] == 0) {
            this.editBackColorCell.push(i);
          }
        }
        if (code == 'complete') {
          this.receptData[i]['complateFlag'] = true;
        }
      }
      this.mainFlexGrid.refresh();
    },
    /*********************
     * データを変更した際に上限額管理計算に〇を表示
     */
    setJyougenKanriCalc(row) {
      // 変更場所の受給者番号取得
      if (!row) {
        row = this.hensyuTargetRow;
      }
      let jB = this.getClickJyukyusyaBango(row);
      //受給者番号が持つ行数の取得
      let jBrow = this.getJyukyusyaBangoRow(jB);
      for (let i = jBrow.first; i < jBrow.last; i++) {
        //this.mainFlexGrid.setCellData(i, 6, '〇');
        this.receptData[i]['jyougengakukanrikeisan'] = 1;
      }
    },
    /*************
     * クリックした際の受給者番号取得
     */
    getClickJyukyusyaBango(row) {
      return this.receptData[row].jyukyusyaBango;
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyusyaBangoRow(jb) {
      let data = [];
      let merge = this.createMergeArray(this.receptData);
      for (let i = 0; i < merge.length; i++) {
        let key = merge[i].k;
        if (key == jb) {
          data.push(merge[i]);
        }
      }
      return data[0];
    },

    onInitialized(flexGrid) {
      // flexGrid.select(-1, -1);
      this.receptData = getReceptJijyogenData();
      this.allData = this.receptData;
      this.mainFlexGrid = flexGrid;
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      //セルのクリックイベント
      this.clickEventCell(flexGrid);
      // セルの値を編集
      this.edittingCell(flexGrid);
    },

    onitemsSourceChanged(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.merge = this.createMergeArray(this.receptData);
      // データセルのマージ
      this.createCellMerge(flexGrid);
      //セルのフォーマット指定
      this.createCellFormat(flexGrid);
    },

    /********
     * セルを編集
     */
    edittingCell(flexGrid) {
      let _self = this;
      flexGrid.beginningEdit.addHandler(function (senders, args) {
        if (_self.receptData[args.row].complateFlag) {
          if (
            args.col == 11 ||
            args.col == 12 ||
            args.col == 13 ||
            args.col == 14
          ) {
            args.cancel = true;
          }
        }
        if (_self.receptData[args.row].fixFlag) {
          if (args.col == 11 || args.col == 12) {
            args.cancel = true;
          }
        }
        if (args.col == 14) args.cancel = true;
        if (args.col == 15) args.cancel = true;
      });
      flexGrid.cellEditEnding.addHandler((s, e) => {
        let col = s.columns[e.col];
        let value = changeType(
          s.activeEditor.value,
          DataType.Number,
          col.format
        );
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
            this.setJyougenKanriCalc(e.row);
            flexGrid.setCellData(e.row, 15, '');
          }
        }
      });
    },

    /****************
     * セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        //レセプト確定セルを押下し、確定アイコンの表示
        let ht = flexGrid.hitTest(e);
        // console.log(ht.target.innerHTML);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let text = ht.target.innerText;
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 編集を行うセルを選択状態にする
          if (hPage.col == 11 || hPage.col == 12) {
            flexGrid.startEditing(true, hPage.row, hPage.col);
          }
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
            /*
            if (ht.target.innerText == '〇') {
              _self.editReseKaku(hPage.row, '');
            }
            */
            if (ht.target.innerText == '') {
              // 上限管理計算の値が●であることの確認
              let jyougengakukanrikeisan =
                _self.receptData[hPage.row].jyougengakukanrikeisan;
              if (jyougengakukanrikeisan == 2) {
                _self.editReseKaku(hPage.row, 1);
              }
            }

            if (ht.target.innerText == 'complete') {
              flexGrid.setCellData(hPage.row, 16, '');
              _self.editReseKaku(hPage.row, '');
            }
            /*
            if (ht.target.innerText == 'delete') {
              flexGrid.setCellData(hPage.row, 16, 'complete');
              // 上限管理計算の値が●であることの確認
              let jyougengakukanrikeisan =
                _self.receptData[hPage.row].jyougengakukanrikeisan;
              if (jyougengakukanrikeisan == '●') {
                _self.editReseKaku(hPage.row, 'complete');
              }
            }
            */
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
                numbers.push(_self.receptData[i].kobanSorts);
              }
              var max = numbers.reduce(function (a, b) {
                return Math.max(a, b);
              });
              let num = max + 1;
              flexGrid.setCellData(hPage.row, 7, num);
              _self.receptData[hPage.row].kobanSorts = num;
            } else {
              for (let i = jBrow.first; i < jBrow.last; i++) {
                flexGrid.setCellData(i, 7, '');
                _self.receptData[i].kobanSorts = '';
              }
            }
          }
        }
      });
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 6, '上限額管理計算');
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 13, '編集行');
      panel.setCellData(0, 14, '上限管理後');
      panel.setCellData(0, 16, 'レセプト確定');
      panel.setCellData(0, 17, '印刷');

      flexGrid.columnHeaders.rows[1].height = 100;
      flexGrid.rows.defaultSize = 20;
    },
    /********************
     * セルフォーマット
     */
    createCellFormat(flexGrid) {
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        let classname = '';
        let text = e.cell.innerText;
        let html = e.cell.innerHTML;
        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 5) {
            classname = 'vertical';
          }
          if (e.col == 6) {
            classname = 'vertical';
          }
          if (e.col == 7 && e.row == 1) {
            classname = 'vertical';
          }
          if (e.col == 13) {
            classname = 'vertical';
          }
          if (e.col == 15 || e.col == 16 || e.col == 17) {
            classname = 'vertical';
          }
        }

        if (e.panel != flexGrid.columnHeaders) {
          if (
            e.col == 0 ||
            e.col == 2 ||
            e.col == 4 ||
            e.col == 9 ||
            e.col == 10
          ) {
            classname = 'text-start';
          }
          if (e.col <= 5) {
            e.cell.style.background = sysConst.COLOR.gridBackground;
          }
          if (e.col == 11 || e.col == 12) {
            classname = 'text-end';
          }
        }

        // 固定行データ
        if (e.panel == flexGrid.cells) {
          if (e.col <= 5)
            e.cell.style.background = sysConst.COLOR.gridBackground;
          if (e.col >= 7 && e.col < 14) {
            if (_self.receptData[e.row]) {
              if (_self.receptData[e.row].fixFlag) {
                e.cell.style.background = sysConst.COLOR.gridBackground;
                e.cell.style.color = sysConst.COLOR.fontColor;
              } else {
                e.cell.style.background = sysConst.COLOR.white;
                if (e.col >= 8 && e.col < 13) {
                  e.cell.style.color = sysConst.COLOR.blueTextColor;
                }
              }
            }
          }
          if (e.col == 14 || e.col == 15)
            e.cell.style.background = sysConst.COLOR.gridBackground;
        }
        if (e.panel == flexGrid.columnHeaders) {
          e.cell.innerHTML =
            '<div class="text-center w-100 ' +
            classname +
            '">' +
            html +
            '</div>';
        }

        if (e.panel == flexGrid.cells) {
          if (e.col == 5 || e.col == 14) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
          if (e.col == 11 || e.col == 12) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
          if (
            e.col == 6 ||
            e.col == 7 ||
            e.col == 13 ||
            e.col == 15 ||
            e.col == 16
          ) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }
          if (e.col == 1 || e.col == 3) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
          }
          // if (e.col == 16) {
          //   if (text == 'complete') {
          //     e.cell.innerHTML = '<div class="complete">complete</div>';
          //   } else if (text == 'delete') {
          //     e.cell.innerHTML = '<div class="delete">delete</div>';
          //   } else {
          //     e.cell.innerHTML =
          //       '<div class="receptKakutei">' + html + '</div>';
          //   }
          // }

          if (e.col == 6) {
            if (text == 1) {
              html = '〇';
            }
            if (text == 2) {
              html = '●';
            }
            e.cell.innerHTML = '<div >' + html + '</div>';
          }
          if (e.col == 16) {
            if (text == 1) {
              html = '〇';
            }
            e.cell.innerHTML = '<div >' + html + '</div>';
          }
        }

        // if (e.panel == flexGrid.cells && e.col == 6) {
        //   e.cell.innerHTML = '<div "' + classname + '">' + html + '</div>';
        //   wjCore.setCss(e.cell, {
        //     display: 'table',
        //     tableLayout: 'absolute',
        //     verticalAlign: 'middle',
        //   });
        //   wjCore.setCss(e.cell.children[0], {
        //     display: 'table-cell',
        //     verticalAlign: 'middle',
        //   });
        // }
      });
    },
    /***********
     * 親コンポーネントの上限管理計算ボタン
     */
    parentReceptCalc() {
      // apiに接続して計算結果を得るので、
      // 適当に出力する
      for (let i = 0; i < this.receptData.length; i++) {
        if (this.receptData[i]['jyougengakukanrikeisan'] == 1) {
          // 1→2に変更
          this.receptData[i]['jyougengakukanrikeisan'] = 2;
          this.receptData[i]['kanrikekkafutangaku'] = 9300 + i;
          this.receptData[i]['kanrikekka'] = 1;
        }
      }

      this.mainFlexGrid.refresh();
    },
    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray(receptData) {
      let array = [];
      for (let i = 0; i < receptData.length; i++) {
        array.push({
          row: i,
          jyukyusyaBango: receptData[i]['jyukyusyaBango'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'jyukyusyaBango');
      let merge = [];
      Object.keys(mergeGroup).map((key) => {
        let firsts = mergeGroup[key][0].row;
        let lasts = mergeGroup[key][mergeGroup[key].length - 1].row + 1;
        merge.push({
          k: key,
          first: firsts,
          last: lasts,
        });
      });
      return merge;
    },
    /**************
     * 全体セルのマージ
     */
    createCellMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 0, 12),
        new wjGrid.CellRange(0, 13, 1, 13),
        new wjGrid.CellRange(0, 14, 0, 15),
        new wjGrid.CellRange(0, 16, 1, 16),
        new wjGrid.CellRange(0, 17, 1, 17),
        new wjGrid.CellRange(1, 3, 1, 4),
      ];
      // データセル用のマージ配列の作成
      let ranges = [];
      let merge = this.createMergeArray(this.receptData);
      for (let i = 0; i < merge.length; i++) {
        for (let j = 0; j <= 6; j++) {
          ranges.push(
            new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
          );
        }
        let j = 16;
        ranges.push(
          new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
        );
      }

      let mm = new wjGrid.MergeManager(flexGrid);

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

    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.receptData;
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
          if (a.jyukyusyaBango < b.jyukyusyaBango) return 1;
          if (a.jyukyusyaBango > b.jyukyusyaBango) return -1;
          return 0;
        });
      }

      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
    },

    /*******************
     * アルファベット絞り込み
     */
    parentAlphabet(alphaSearch) {
      this.alphaSelect = alphaSearch;
      this.receptData = this.filtered();
    },
    /*************
     * 利用者のフィルタリンク
     */
    child_Riyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.receptData = this.filtered();
    },
    /******************
     * 親コンポーネントの絞り込み
     */
    parentFilter(type) {
      this.filterSibori = { type: type };
      this.receptData = this.filtered();
    },
    /*************
     * 上限管理事のフィルタリンク
     */
    child_Jyougenkanriji(text, key) {
      // フィルタリングの実施
      this.filterTextJyogen = { jyougenkanrijiKey: key, jyougenkanriji: text };
      this.receptData = this.filtered();
    },
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        // 検索条件がないとき
        if (
          this.filterTextJyogen.jyougenkanrijiKey == 0 &&
          this.filterTextRiyosya.riyosyaKey == 0 &&
          this.filterSibori.type == 1
        ) {
          array.push(this.allData[i]);
        } else {
          if (
            (this.allData[i]['jigyosyomei'].indexOf(
              this.filterTextJyogen.jyougenkanriji
            ) != -1 ||
              this.filterTextJyogen.jyougenkanrijiKey == 0) &&
            // 絞り込みトグル
            (this.filterSibori.type == 1 ||
              (this.filterSibori.type == 2 &&
                this.allData[i]['kanrikekka'] == 1) ||
              (this.filterSibori.type == 3 &&
                this.allData[i]['kanrikekka'] == '')) &&
            // 利用者コンボボックス
            (this.filterTextRiyosya.riyosyaKey == 0 ||
              (this.filterTextRiyosya.riyosyaKey == 1 &&
                this.allData[i]['nyukyo'] == 1) ||
              (this.filterTextRiyosya.riyosyaKey == 2 &&
                this.allData[i]['taikyo'] == 1))
          ) {
            array.push(this.allData[i]);
          }
        }
      }
      let select = this.alphaSelect;
      let get = [];
      array.forEach(function (value) {
        switch (select) {
          case 0:
            get.push(value);
            break;
          case 1:
            if (value.kana.match(/^[ア-オ]/)) {
              get.push(value);
            }
            break;
          case 2:
            if (value.kana.match(/^[カ-コ]/)) {
              get.push(value);
            }
            break;
          case 3:
            if (value.kana.match(/^[サ-ソ]/)) {
              get.push(value);
            }
            break;
          case 4:
            if (value.kana.match(/^[タ-ト]/)) {
              get.push(value);
            }
            break;
          case 5:
            if (value.kana.match(/^[ナ-ノ]/)) {
              get.push(value);
            }
            break;
          case 6:
            if (value.kana.match(/^[ハ-ホ]/)) {
              get.push(value);
            }
            break;
          case 7:
            if (value.kana.match(/^[マ-モ]/)) {
              get.push(value);
            }
            break;
          case 8:
            if (value.kana.match(/^[ヤ-ヨ]/)) {
              get.push(value);
            }
            break;
          case 9:
            if (value.kana.match(/^[ラ-ロ]/)) {
              get.push(value);
            }
            break;
          case 10:
            if (value.kana.match(/^[ワ-ン]/)) {
              get.push(value);
            }
            break;
        }
      });

      return get;
    },
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div.receptParts {
  background-color: $white;
  padding: 2%;
  border: none;
  .wj-cell {
    font-size: 12px;
  }
  .fixgrey {
    background-color: $light-gray;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 4px;
  }
}
div.receptPartsArea {
  background-color: $white;
  width: 100%;
  margin: 0;
  text-align: right;
  padding: 0px 15px 15px 0px;
}

div#recept-jijyougen {
  #grid_jijyougen {
    height: 52vh;

    .wj-cell {
      padding: 1px;
    }
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

  .wj-cell.wj-state-multi-selected {
    color: $font_color !important;
  }

  .wj-state-selected,
  .wj-state-last-selected {
    color: $font_color !important;
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
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    text-indent: -9999px;
  }
  .delete {
    background-image: url('@/assets/kesu_15px.png');
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    text-indent: -9999px;
  }

  #menubar {
    display: none;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid $black;
    min-width: 80px;
    top: 0;
    left: 0;
    padding: 30px 10px;
    button {
      background-color: $white;
      &:first-child {
        position: absolute;
        top: 5px;
        left: auto;
        right: 5px;
        z-index: 1;
        border: 1px solid $light-gray;
      }
    }
  }

  .receptKakutei {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>