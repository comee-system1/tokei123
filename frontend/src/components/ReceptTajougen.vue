<template>
  <div id="recept-tajyougen" class="mt-n5">
    <wj-flex-grid
      id="grid_tajyougen"
      :initialized="onInitialized"
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
        :binding="'sityonm'"
        :header="'市町村名'"
        align="center"
        valign="middle"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyukyuno'"
        :header="'受給者番号'"
        align="center"
        :width="100"
        format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'names'"
        :header="'利用者名'"
        align="center"
        width="3*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyokbn'"
        :header="'上限額\n管理事業所'"
        :multiLine="true"
        align="center"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyonm'"
        :multiLine="true"
        align="center"
        width="3*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'fjyogen'"
        :header="centerHeader[2]"
        :multiLine="true"
        align="right"
        format="n0"
        :width="80"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'hannei'"
        :width="30"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'cnt'"
        :header="verticalHeader[4]"
        :width="30"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyo_jigyono'"
        :header="'事業所番号'"
        width="2*"
        align="center"
        :format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyo_jigyonm'"
        :header="'事業所名'"
        width="3*"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'svcnm'"
        :header="'提供\nサービス'"
        width="3*"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'sogaku'"
        :header="centerHeader[3]"
        :width="70"
        align="right"
        :multiLine="true"
        :format="'n0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyogaku'"
        :header="centerHeader[0]"
        :width="60"
        align="right"
        :format="'n0'"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jknr_riyogaku'"
        :header="centerHeader[1]"
        :width="65"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jknr_rslt'"
        :header="verticalHeader[1]"
        align="center"
        :width="30"
        :multiLine="true"
        :dataMap="customerMap"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resekakutei'"
        :width="30"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="print"
        :width="30"
        align="center"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjGrid from '@grapecity/wijmo.grid';
import { isNumber, changeType, DataType } from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import * as wijmo from '@grapecity/wijmo';
import { ReceptTajyougen } from '@backend/api/ReceptTajyougen';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      verticalHeader: [
        'レセプト反映',
        '管理結果',
        'レセプト確定',
        '印刷',
        '項番',
      ],
      centerHeader: [
        '利用者\n負担額',
        '管理結果\n後利用者\n負担額',
        '利用者負担\n上限金額',
        '総費用額',
      ],
      receptData: [],
      mainFlexGrid: [],
      editGridFlag: false,
      filterTextJyogen: { jyougenkanrijiKey: 0, jyougenkanriji: '指定なし' }, // 検索項目
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      filterSibori: { type: 1 }, // 絞込
      alphaSelect: 0,
      editedCells: [],
      completeJudgeButton: 0, // 確定登録・解除ボタン判定
      gridHeight: '', // グリッドの高さ
      customerMap: [1, 2, 3],
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
        ht = 67;
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
          //this.mainFlexGrid.setCellData(i, 15, '');
          this.receptData[i]['complateFlag'] = false;
          this.receptData[i].resekakutei = '';
        } else {
          //   let _self = this;
          if (
            this.receptData[i].hanneikey == 2 &&
            this.receptData[i].resekakutei == 1
          ) {
            //  this.mainFlexGrid.setCellData(i, 15, 'complete');
            this.receptData[i]['complateFlag'] = true;
            this.receptData[i].resekakutei = 1;
          }
        }
        this.mainFlexGrid.refresh();
      }
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
    /*************
     * 上限管理事のフィルタリンク
     */
    child_Jyougenkanriji(text, key) {
      // フィルタリングの実施
      this.filterTextJyogen = { jyougenkanrijiKey: key, jyougenkanriji: text };
      this.receptData = this.filtered();
    },
    /***************************
     * 絞り込みの実施
     */
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
            (this.allData[i]['jigyonm'].indexOf(
              this.filterTextJyogen.jyougenkanriji
            ) != -1 ||
              this.filterTextJyogen.jyougenkanrijiKey == 0) &&
            // 絞り込みトグル
            (this.filterSibori.type == 1 ||
              (this.filterSibori.type == 2 &&
                this.allData[i]['jknr_rslt'].length > 0) ||
              (this.filterSibori.type == 3 &&
                this.allData[i]['jknr_rslt'].length == 0)) &&
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
    /******************
     * 親コンポーネントの絞り込み
     */
    parentFilter(type) {
      this.filterSibori = { type: type };
      this.receptData = this.filtered();
    },
    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.receptData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.names < b.names) {
            return -1;
          }
          if (a.names > b.names) {
            return 1;
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jigyo_jigyono < b.jigyo_jigyono) {
            return -1;
          }
          if (a.jigyo_jigyono > b.jigyo_jigyono) {
            return 1;
          }
          return 0;
        });
      }

      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
      // this.mainFlexGrid.refresh();
    },
    /**********************
     * 親コンポーネントの印刷全選択/全解除
     * 0:全選択
     * 1:全解除
     */
    parentSelectAll(type) {
      let mark = '';
      if (type == 0) {
        mark = 1;
      }
      for (let i = 0; i < this.receptData.length; i++) {
        this.receptData[i]['print'] = mark;
      }
      this.mainFlexGrid.refresh();
    },
    /**********************
     * 親コンポーネントのレセプト確定全選択/全解除
     * 2:全選択
     * 3:全解除
     */
    parentDefineAll(type) {
      for (let i = 0; i < this.receptData.length; i++) {
        // レセプト反映が●の時のみ
        // 確定を全選択
        if (this.receptData[i].hanneikey == 2 && type == 2) {
          this.receptData[i].resekakutei = 1;
        }
        // 全解除
        if (this.receptData[i].hanneikey == 2 && type == 3) {
          this.receptData[i].resekakutei = '';
        }
        this.mainFlexGrid.refresh();
      }
    },
    /***********
     * 親コンポーネントのレセプトへ反映ボタン
     */
    parentReceptReflect() {
      for (let i = 0; i < this.receptData.length; i++) {
        let pt13 = this.mainFlexGrid.getCellData(i, 13);
        let pt14 = this.mainFlexGrid.getCellData(i, 14);
        let complateFlag = this.receptData[i].complateFlag;
        if (pt13 && pt14 && !complateFlag) {
          // ●に変更する
          let mark = '2';
          this.receptData[i]['hanneikey'] = mark;
          this.mainFlexGrid.setCellData(i, 6, mark);

          this.receptData[i]['jknr_riyogaku'] = pt13;
          this.receptData[i]['jknr_rslt'] = pt14;
        }
      }
    },

    onInitialized(flexGrid) {
      ReceptTajyougen().then((result) => {
        // 親の自上限管理のコンボボックスを設定する関数を実行
        this.$emit('settingJyogenCombobox', result);

        this.allData = result;
        this.receptData = result;
        this.mainFlexGrid = flexGrid;

        // ヘッダ情報の作成
        this.createHeader(flexGrid);
        // ヘッダセルのマージ
        this.createHeaderMerge(flexGrid);

        flexGrid.itemsSource = result;
      });

      // セルのクリックイベント
      this.clickEventCell(flexGrid);

      // セルのフォーマット指定
      this.createCellFormat(flexGrid);

      // セルの値を編集
      this.edittingCell(flexGrid);
    },
    /****************
     *
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        // レセプト確定セルを押下し、確定アイコンの表示
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 編集を行うセルを選択状態にする
          if (hPage.col == 13 || hPage.col == 14) {
            flexGrid.startEditing(true, hPage.row, hPage.col);
          }

          // 印刷カラムを押下
          if (hPage.col == 16) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 16) == '〇') mark = '';
            flexGrid.setCellData(hPage.row, 16, mark);
            _self.receptData[hPage.row]['print'] = mark;
          }
          // レセプト確定カラムを押下
          if (hPage.col == 15) {
            // レセプト反映されているもののみ〇をつける
            if (_self.receptData[hPage.row].hanneikey == 2) {
              _self.receptData[hPage.row].resekakutei = 1;
              flexGrid.setCellData(hPage.row, 15, 1);
            }
          }
          // レセプト反映カラムを押下●→〇に変更
          // レセプト確定が〇の場合空欄にする
          // if (hPage.col == 6) {
          //   if (
          //     _self.receptData[hPage.row].hanneikey == 2 &&
          //     !_self.receptData[hPage.row].blueFlag
          //   ) {
          //     _self.receptData[hPage.row].hanneikey = 1;
          //     flexGrid.setCellData(hPage.row, 6, 1);
          //     _self.receptData[hPage.row].resekakutei = '';
          //     flexGrid.setCellData(hPage.row, 15, '');
          //   }
          // }
        }
      });
    },
    /********
     * セルを編集
     */
    edittingCell(flexGrid) {
      let _self = this;
      flexGrid.beginningEdit.addHandler(function (senders, args) {
        if (_self.receptData[args.row].complateFlag) {
          if (args.col == 13 || args.col == 14) {
            args.cancel = true;
          }
        }
        if (
          _self.receptData[args.row].blueFlag ||
          _self.receptData[args.row].complateFlag
        ) {
          if (args.col == 13 || args.col == 14) {
            args.cancel = true;
          }
        }
        if (args.col == 16) {
          args.cancel = true;
        }
      });

      flexGrid.cellEditEnding.addHandler((s, e) => {
        let col = s.columns[e.col];
        let value = changeType(
          s.activeEditor.value,
          DataType.Number,
          col.format
        );

        // let pt6 = flexGrid.getCellData(e.row, 6);
        let pt13 = flexGrid.getCellData(e.row, 13);
        let pt14 = flexGrid.getCellData(e.row, 14);
        // if (e.col == 13) {
        if (!isNumber(value) && value.length > 0) {
          e.cancel = true;
          e.stayInEditMode = true;
          alert('数値のみの入力になります。');
        } else if ((pt13 > 0 && value) || (pt14 > 0 && value)) {
          // 管理結果利用負担額と管理結果に数値が入力された場合レセプト反映に1を立てる
          flexGrid.setCellData(e.row, 6, 1);
          flexGrid.setCellData(e.row, 15, '');
          _self.receptData[e.row].hanneikey = 1;
          _self.receptData[e.row].resekakutei = '';
          // 数値入力後、レセプト反映が●の場合、負担額の背景をピンクにする
          // 編集をしたデータの配列を保持
          // if (pt6 == '●') {
          //   if (s.activeEditor.value != s.getCellData(e.row, e.col, true)) {
          //     _self.editedCells.push(e.range);
          //   }
          // }
        }
        //}
      });
    },
    // 後ほど消す
    onItemsSourceChanged(flexGrid) {
      let receptData = this.allData;
      console.log('change');
      console.log(this.editGridFlag);
      console.log(receptData);
      if (this.editGridFlag) {
        while (flexGrid.rows.length < receptData.length) {
          flexGrid.rows.push(new wjGrid.Row());
        }

        for (let i = 0; i < receptData.length; i++) {
          let j = 0;
          flexGrid.setCellData(i, j++, receptData[i]['sityonm']);
          flexGrid.setCellData(i, j++, receptData[i]['jyukyuno']);
          flexGrid.setCellData(i, j++, receptData[i]['names']);
          flexGrid.setCellData(i, j++, receptData[i]['jigyokbn']);
          flexGrid.setCellData(i, j++, receptData[i]['jigyonm']);
          flexGrid.setCellData(i, j++, receptData[i]['fjyogen']);
          flexGrid.setCellData(i, j++, receptData[i]['hanneikey']);
          flexGrid.setCellData(i, j++, receptData[i]['cnt']);
          flexGrid.setCellData(i, j++, receptData[i]['jigyo_jigyono']);
          flexGrid.setCellData(i, j++, receptData[i]['jigyo_jigyonm']);
          flexGrid.setCellData(i, j++, receptData[i]['svcnm']);
          flexGrid.setCellData(i, j++, receptData[i]['sogaku']);
          flexGrid.setCellData(i, j++, receptData[i]['riyogaku']);
          flexGrid.setCellData(i, j++, receptData[i]['jknr_riyogaku']);
          flexGrid.setCellData(i, j++, receptData[i]['jknr_rslt']);
          flexGrid.setCellData(i, j++, receptData[i]['resekakutei']);
          flexGrid.setCellData(i, j++, receptData[i]['print']);
        }
      }
    },
    /*****************
     * セルのフォーマット指定
     */
    createCellFormat(flexGrid) {
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;

        let classname = '';
        if (
          text == _self.verticalHeader[0] ||
          text == _self.verticalHeader[1] ||
          text == _self.verticalHeader[2] ||
          text == _self.verticalHeader[3] ||
          text == _self.verticalHeader[4]
        ) {
          classname = 'vertical';
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
        if (
          text == _self.centerHeader[0] ||
          text == _self.centerHeader[1] ||
          text == _self.centerHeader[2] ||
          text == _self.centerHeader[3]
        ) {
          classname = 'text-center';
        }

        if (e.panel != flexGrid.columnHeaders) {
          if (e.col == 5 || e.col == 11 || e.col == 12 || e.col == 13) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
          if (
            e.col == 0 ||
            e.col == 2 ||
            e.col == 4 ||
            e.col == 9 ||
            e.col == 10
          ) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
        }

        if (e.panel != flexGrid.columnHeaders) {
          if (
            _self.receptData[e.row] &&
            _self.receptData[e.row].blueFlag &&
            e.col < 15
          ) {
            // 上限額管理事業所が同一法人で別事業所の場合テキストを青にする
            e.cell.style.color = sysConst.COLOR.blueTextColor;
            e.cell.style.background = sysConst.COLOR.gridBackground;
          } else {
            e.cell.style.color = sysConst.COLOR.fontColor;
            e.cell.style.background = sysConst.COLOR.white;
          }
          if ((e.col >= 0 && e.col <= 5) || (e.col >= 7 && e.col <= 12)) {
            e.cell.style.background = sysConst.COLOR.gridBackground;
          }

          // レセプト反映後に数値を変えたとき
          wijmo.removeClass(e.cell, 'edited-cell');
          for (var i = 0; i < _self.editedCells.length; i++) {
            if (_self.editedCells[i].equals(e.range)) {
              wijmo.addClass(e.cell, 'edited-cell');
            }
          }

          // 確定登録ボタンを押下
          if (_self.completeJudgeButton == 1) {
            if (e.col == 13 || e.col == 14) {
              // 文字が入っていれば背景を黄色
              if (flexGrid.getCellData(e.row, e.col)) {
                e.cell.style.background = sysConst.COLOR.gridBackground;
              }
            }
          }

          // レセプト反映/確定
          if (e.col == 6 || e.col == 15 || e.col == 16) {
            classname = 'text-center';
            if (text == 1) {
              html = '〇';
              if (_self.receptData[e.row].complateFlag) {
                classname = 'complete';
                html = 'kaku';
              }
            }
            if (text == 2) {
              html = '●';
            }
          }
          if (e.col == 6) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
        }

        if (e.col == 6) {
          e.cell.style.borderLeft = sysConst.COLOR.separateBorderColor;
          e.cell.style.borderRight = sysConst.COLOR.separateBorderColor;
        }
        if (e.col == 13) {
          e.cell.style.borderLeft = sysConst.COLOR.separateBorderColor;
        }
        if (e.col == 15) {
          e.cell.style.borderLeft = sysConst.COLOR.separateBorderColor;
        }

        if (classname) {
          e.cell.innerHTML =
            '<div class="text-center w-100 ' +
            classname +
            '">' +
            html +
            '</div>';
        }
      });
      this.completeJudgeButton = 0;
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
      panel.setCellData(0, 6, this.verticalHeader[0]);
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 13, '上限管理後');
      panel.setCellData(0, 15, this.verticalHeader[2]);
      panel.setCellData(0, 16, this.verticalHeader[3]);
      flexGrid.columnHeaders.rows[1].height = 70;
      flexGrid.rows.defaultSize = 20;
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5), // 基本情報
        new wjGrid.CellRange(0, 6, 1, 6), // レセプト
        new wjGrid.CellRange(1, 3, 1, 4), // 上限額管理事業所
        new wjGrid.CellRange(0, 7, 0, 12), // 利用者請求実績
        new wjGrid.CellRange(0, 13, 0, 14), // 上限管理後
        new wjGrid.CellRange(0, 15, 1, 15), // レセプト確定
        new wjGrid.CellRange(0, 16, 1, 16), // 印刷
      ];
      let mm = new wjGrid.MergeManager();
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
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#recept-tajyougen {
  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: normal;
  }
  .wj-header.wj-cell {
    font-size: 12px;
    text-align: center !important;
  }
  .wj-cell.wj-state-selected {
    color: $font_color;
  }

  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  .wj-cell.edited-cell {
    background-color: pink !important;
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
}
.wj-grid-listbox {
  max-height: 100 !important;
  font-size: 12px;
}
</style>