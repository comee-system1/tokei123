<template>
  <div id="chiikizentai" class="mt-1" :style="styles">
    <v-row class="mx-1" dense v-for="value in note" :key="value.key">
      <v-col cols="2" class="text-center valign text-caption">
        <v-card class="lightBlue" elevation="0" outlined tile height="100%">
          <label> {{ value.title }}</label>
        </v-card>
      </v-col>
      <v-col cols="10" class="mr-0 text-caption">
        <v-textarea
          no-resize
          v-model="value.value"
          auto-grow
          hide-details
          solo
          flat
          dense
          outlined
          rows="2"
          style="font-size: 14px; height: auto"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row no-gutters class="rowStyle my-1">
      <v-spacer></v-spacer>
      <v-btn-toggle
        tile
        style="height: 20px"
        v-model="arrow"
        @change="changeArrow()"
        mandatory
      >
        <v-btn height="20" elevation="2">矢印書く</v-btn>
        <v-btn height="20" elevation="2">矢印消す</v-btn>
      </v-btn-toggle>
      <v-btn-toggle class="ml-4" tile style="height: 20px">
        <v-btn height="20" elevation="2" @click="rowSort()">順変更</v-btn>
        <v-btn height="20" elevation="2" @click="rowAdd()">行追加</v-btn>
        <v-btn height="20" elevation="2" @click="rowDelete()">行削除</v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row no-gutters>
      <v-col cols="*" class="mx-1 text-caption">
        <wj-flex-grid
          id="grdChiikiZentai"
          :autoGenerateColumns="false"
          :imeEnabled="true"
          :headersVisibility="'Column'"
          :allowDragging="'None'"
          :initialized="onInitialized"
          :itemsSource="viewData"
          style="height: 260px"
        >
        </wj-flex-grid>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

//ラインを描画
const COLOR1 = '#005243';
const COLOR2 = '#3b7960';
const COLOR3 = '#7ebeab';
const COLOR4 = '#92b5a9';
const COLOR5 = '#bed3ca';
const COLOR6 = '#e9e4d4';
const ARROWHTML_PRE = '<div class="mt-1" style="color:white; background:';
const ARROWHTML_SUF =
  '; border-radius: 5px 50% 50% 5px; text-align:center; height:12px"> </div>';

export default {
  props: {},
  components: {},
  data() {
    return {
      inputs: [],
      notekey: 0,
      note: [
        {
          key: 0,
          title: 'サービス等利用計画の\n到達目標',
          value:
            '文章は目的主題で著作さ権利ますたため、公表され情報で説明法可能の引用theとするれるてはしあれ、ペディアの他は、検証さ未然を既存認めことにより誤認独自んなてなりないです。',
        },
        {
          key: 1,
          title: '（１）長期目標\n（内容及び期間等）',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。',
        },
        {
          key: 2,
          title: '（２）短期目標\n（内容及び期間等）',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。',
        },
      ],

      mainGrid: null,
      rowHeight: sysConst.GRDROWHEIGHT.Row + 10,
      headerList: [],
      headerListOrg: [
        {
          dataname: 'num',
          maintitle: '優先\n順位',
          subtitle: '優先\n順位',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'fuan',
          maintitle: 'nameさんの\n期待や不安',
          subtitle: 'nameさんの\n期待や不安',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'hito',
          maintitle: 'その為に\n協力する人',
          subtitle: 'その為に\n協力する人',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'naiyo',
          maintitle: '協力する\n内容',
          subtitle: '協力する\n内容',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'ryui',
          maintitle: '支援上の留意\n事項等',
          subtitle: '支援上の留意\n事項等',
          width: '10*',
          align: 'left',
        },
      ],
      headerListOrgDelete: [
        {
          dataname: 'del',
          maintitle: '削除',
          subtitle: '削除',
          width: 40,
          align: 'center',
        },
      ],
      viewData: [],

      headerheight: 200,

      selectedRanges: [],

      drawArrow: true,
      arrow: 0,

      sortEditFlag: false,
    };
  },
  created() {},
  mounted() {},
  computed: {
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {
    createHeaderList() {
      //apiから取得
      let result = [
        {
          dataname: 'tuki1',
          maintitle: '協力（支援）の目安',
          subtitle: '4月',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tuki2',
          maintitle: '協力（支援）の目安',
          subtitle: '5月',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tuki3',
          maintitle: '協力（支援）の目安',
          subtitle: '6月',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tuki4',
          maintitle: '協力（支援）の目安',
          subtitle: '7月',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tuki5',
          maintitle: '協力（支援）の目安',
          subtitle: '8月',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tuki6',
          maintitle: '協力（支援）の目安',
          subtitle: '9月',
          width: '10*',
          align: 'left',
        },
      ];
      let headerListOrg = JSON.parse(JSON.stringify(this.headerListOrg));
      this.headerList = [];
      this.headerList = headerListOrg
        .concat(result)
        .concat(this.headerListOrgDelete);
    },
    onInitialized(flexGrid) {
      this.mainGrid = flexGrid;
      flexGrid.beginUpdate();
      let _self = this;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 0) {
            //番号付け替え
            if (_self.sortEditFlag) {
              let row = ht.row % 2 == 0 ? ht.row : ht.row - 1;
              let items = flexGrid.itemsSource;
              let max = this.getMaxNum();
              if (items[row].num != '' && max == items[row].num) {
                return;
              }
              max++;
              items[row].num = max;
              items[row + 1].num = max;
              flexGrid.refresh();
            }
          } else {
            let cr = flexGrid.selectedRanges[0];
            if (cr.col < 5 && cr.col2 < 5) {
              return;
            }
            if (cr.col > 10 && cr.col2 > 10) {
              return;
            }
            if (cr.row % 2 != 0 || cr.row2 % 2 != 0) {
              return;
            }
            // 選択範囲の整理
            let col1 = cr.col < 5 ? 5 : cr.col > 10 ? 10 : cr.col;
            let col2 = cr.col2 < 5 ? 5 : cr.col2 > 10 ? 10 : cr.col2;
            let row = cr.row;
            //カラム前後整理
            if (col1 > col2) {
              let c1 = col1;
              col1 = col2;
              col2 = c1;
            }
            if (_self.drawArrow) {
              //----------------
              //矢印書く
              //----------------
              //先頭カラムを含むマージを削除
              let mergedRangeS = flexGrid.getMergedRange(ht.panel, row, col1);
              if (mergedRangeS != undefined) {
                let col1S = mergedRangeS.col;
                let col2S = mergedRangeS.col2;
                let idx = _self.selectedRanges.findIndex(
                  (v) => v.row == row && v.col == col1S
                );
                if (idx > -1) {
                  _self.selectedRanges.splice(idx, 1);
                  //先頭より前のマージを復元
                  if (col1S <= col1 - 1) {
                    _self.selectedRanges.push(
                      new wjGrid.CellRange(row, col1S, row, col1 - 1)
                    );
                  }
                  //選択セルが１つ
                  //or 選択の先頭が既マージセルの先頭と同じ
                  //or 既マージセルの後尾が選択の後尾より大きい場合
                  //後尾のマージを復元
                  if (col1 == col2 || col1 == col1S || col2 < col2S) {
                    if (col2 < col2S) {
                      _self.selectedRanges.push(
                        new wjGrid.CellRange(row, col2 + 1, row, col2S)
                      );
                    }
                  }
                }
              }
              //後尾カラムを含むマージを削除
              let mergedRangeE = flexGrid.getMergedRange(ht.panel, row, col2);
              if (mergedRangeE != undefined) {
                let col1E = mergedRangeE.col;
                let col2E = mergedRangeE.col2;
                let idx = _self.selectedRanges.findIndex(
                  (v) => v.row == row && v.col == col1E
                );
                if (idx > -1) {
                  _self.selectedRanges.splice(idx, 1);
                  //後尾より後のマージを復元
                  if (col2 + 1 <= col2E) {
                    _self.selectedRanges.push(
                      new wjGrid.CellRange(row, col2 + 1, row, col2E)
                    );
                  }
                }
              }
              //間のカラムのマージを削除
              for (let c = col1 + 1; c <= col2 - 1; c++) {
                let idx = _self.selectedRanges.findIndex(
                  (v) => v.row == row && v.col == c
                );
                if (idx > -1) {
                  _self.selectedRanges.splice(idx, 1);
                }
              }
              //選択したカラムを追加
              _self.selectedRanges.push(
                new wjGrid.CellRange(row, col1, row, col2)
              );
              _self.doMerge();
            } else {
              //----------------
              //矢印消す
              //----------------
              //先頭カラムを含むマージを削除
              let mergedRange = flexGrid.getMergedRange(ht.panel, row, col1);
              if (mergedRange != undefined) {
                let col = mergedRange.col;
                let idx = _self.selectedRanges.findIndex(
                  (v) => v.row == row && v.col == col
                );
                if (idx > -1) {
                  _self.selectedRanges.splice(idx, 1);
                }
                //入力クリア
                for (let c = mergedRange.col; c <= mergedRange.col2; c++) {
                  flexGrid.rows[row + 1].dataItem['tuki' + (c - 4)] = '';
                }
              }
              _self.doMerge();
            }

            //データ登録用始点終点フラグ,矢印色処理
            let tmpitem = flexGrid.cells.rows[row].dataItem;
            let cnt = 0;
            for (let c = 5; c <= 10; c++) {
              var range = flexGrid.getMergedRange(ht.panel, row, c);
              let start = false;
              let end = false;
              let color = '';
              if (range != undefined) {
                if (range.isSingleCell) {
                  start = true;
                  end = true;
                } else if (c == range.leftCol) {
                  start = true;
                } else if (c == range.rightCol) {
                  end = true;
                }
                //マージデータがある最初のセルをカウント
                if (start) {
                  cnt++;
                }
                //カウントにより色決定
                switch (cnt) {
                  case 1:
                    color = COLOR1;
                    break;
                  case 2:
                    color = COLOR2;
                    break;
                  case 3:
                    color = COLOR3;
                    break;
                  case 4:
                    color = COLOR4;
                    break;
                  case 5:
                    color = COLOR5;
                    break;
                  case 6:
                    color = COLOR6;
                    break;
                }
              }
              tmpitem['tuki' + (c - 4) + 'Start'] = start;
              tmpitem['tuki' + (c - 4) + 'End'] = end;
              tmpitem['tuki' + (c - 4) + 'Color'] = color;
            }
          }
        }
      });
      // フォーマットイベント
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
          if (e.col == 11) {
            e.cell.style.backgroundColor =
              sysConst.COLOR.gridHeaderDeleteColumn;
            e.cell.style.color = sysConst.COLOR.fontColor;
          }
        } else if (e.panel.cellType == wjGrid.CellType.Cell) {
          //範囲選択行列のみ
          if (e.row % 2 == 0 && e.col >= 5 && e.col <= 10) {
            var range = s.getMergedRange(e.panel, e.row, e.col);
            //マージされていたら
            if (range != undefined) {
              //ラインを描画
              let tmpitem = s.rows[e.row].dataItem;
              let color = tmpitem['tuki' + (e.col - 4) + 'Color'];
              e.cell.innerHTML = ARROWHTML_PRE + color + ARROWHTML_SUF;
            }
          }
          // if (e.row % 2 == 0 && e.col == 0) {
          //   e.cell.style.color = sysConst.COLOR.fontColor;
          //   e.cell.style.backgroundColor = sysConst.COLOR.white;
          //   let tmpitem = s.rows[e.row].dataItem;
          //   if (tmpitem.num.length == 0) {
          //     e.cell.style.color = sysConst.COLOR.fontColor;
          //     e.cell.style.backgroundColor = sysConst.COLOR.red;
          //   }
          // }
        }
      });
      // 入力開始イベント
      flexGrid.beginningEdit.addHandler((s, e) => {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          if (e.col == 0) {
            e.cancel = true;
            return;
          }
          if (e.col >= 5 && e.col <= 10) {
            if (e.row % 2 == 0) {
              e.cancel = true;
              return;
            } else {
              var range = s.getMergedRange(e.panel, e.row - 1, e.col);
              //マージされていない
              if (range == undefined) {
                alert('矢印が設定されていません。');
                e.cancel = true;
                return;
              }
            }
          }
        }
      });
      // 入力終了後イベント
      flexGrid.cellEditEnded.addHandler((s, e) => {
        s.beginUpdate();
        if (e.row % 2 == 1) {
          s.autoSizeRow(e.row, false, 0);
          if (s.rows[e.row].height < this.rowHeight * 2) {
            s.rows[e.row].height = this.rowHeight * 2;
          }
        }
        s.endUpdate();
      });
      // データ変更後イベント
      flexGrid.itemsSourceChanged.addHandler((s) => {
        s.beginUpdate();
        for (let r = 0; r < s.rows.length; r++) {
          if (r % 2 == 0) {
            s.rows[r].height = this.rowHeight;
          } else {
            s.autoSizeRow(r, false, 0);
            if (s.rows[r].height < this.rowHeight * 2) {
              s.rows[r].height = this.rowHeight * 2;
            }
          }
        }
        s.endUpdate();
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header + 5;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header + 5;
      flexGrid.rows.defaultSize = this.rowHeight;
      flexGrid.rows.minSize = this.rowHeight;
      flexGrid.alternatingRowStep = 0;
      // ヘッダ文字列の設定
      this.createHeaderList();
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.name = this.headerList[colIndex].dataname;
        col.binding = this.headerList[colIndex].dataname;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].maintitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.headerList[colIndex].subtitle
        );
      }
      this.doMerge();
      flexGrid.endUpdate();
    },
    createRangesHeader() {
      let ranges = [];
      ranges.push(new wjGrid.CellRange(0, 0, 1, 0));
      ranges.push(new wjGrid.CellRange(0, 1, 1, 1));
      ranges.push(new wjGrid.CellRange(0, 2, 1, 2));
      ranges.push(new wjGrid.CellRange(0, 3, 1, 3));
      ranges.push(new wjGrid.CellRange(0, 4, 1, 4));
      ranges.push(new wjGrid.CellRange(0, 11, 1, 11));
      ranges.push(new wjGrid.CellRange(0, 5, 0, 10));

      return ranges;
    },
    createRanges() {
      let ranges = [];

      let rowCount = this.viewData.length;
      for (let row = 0; row < rowCount; row += 2) {
        for (let col = 0; col < this.headerListOrg.length; col++) {
          ranges.push(new wjGrid.CellRange(row, col, row + 1, col));
        }
        ranges.push(new wjGrid.CellRange(row, 11, row + 1, 11));
      }

      return ranges;
    },
    createMerge(flexGrid, headerRanges, ranges, rangesSelected) {
      flexGrid.mergeManager = null;
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
          for (let h = 0; h < rangesSelected.length; h++) {
            if (rangesSelected[h].contains(r, c)) {
              return rangesSelected[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    doMerge() {
      this.createMerge(
        this.mainGrid,
        this.createRangesHeader(),
        this.createRanges(),
        this.selectedRanges
      );
    },
    changeArrow() {
      this.drawArrow = !this.drawArrow;
      this.arrow = this.drawArrow ? 0 : 1;
    },
    /************************
     * 順変更
     */
    rowSort() {
      // 並び順を変更するフラグ
      this.sortEditFlag = true;
      for (let i = 0; i < this.viewData.length; i++) {
        this.viewData[i].num = '';
      }
      this.mainGrid.refresh();
    },
    /************************
     * 行追加
     */
    rowAdd() {
      this.createData();
      this.doMerge();
    },
    createData() {
      let array = this.viewData.slice();
      let num = this.getMaxNum() + 1;
      for (let i = 0; i < 2; i++) {
        array.push({
          num: num,
          numbk: num,
          subnum: i + 1,
          fuan: '',
          hito: '',
          naiyo: '',
          ryui: '',
          tuki1: '',
          tuki1Start: false,
          tuki1End: false,
          tuki1Color: '',
          tuki2: '',
          tuki2Start: false,
          tuki2End: false,
          tuki2Color: '',
          tuki3: '',
          tuki3Start: false,
          tuki3End: false,
          tuki3Color: '',
          tuki4: '',
          tuki4Start: false,
          tuki4End: false,
          tuki4Color: '',
          tuki5: '',
          tuki5Start: false,
          tuki5End: false,
          tuki5Color: '',
          tuki6: '',
          tuki6Start: false,
          tuki6End: false,
          tuki6Color: '',
          del: false,
        });
      }
      this.viewData = array;
    },
    getMaxNum() {
      let items = this.mainGrid.itemsSource;
      let max = 0;
      if (items.length > 0) {
        let nums = items.map(function (v) {
          return v.num;
        });
        max = nums.reduce(function (a, b) {
          return Math.max(a, b);
        });
      }
      return max;
    },
    /************************
     * 行削除
     */
    rowDelete() {
      this.viewData = this.delcheck(this.viewData).filter(Boolean);
      //再採番
      this.reNum();
      //並び替え取消
      this.sortEditFlag = false;
    },
    delcheck(array) {
      //処理対象行より下のデータの行番号(row)を補正処理の為、下から削除
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].del) {
          delete array[i];
          if (i % 2 == 0) {
            //処理対象行のマージデータ削除
            let dellist = this.selectedRanges.filter((v) => v.row == i);
            dellist.forEach((e) => {
              let idx = this.selectedRanges.findIndex(
                (v) => v.row == e.row && v.col == e.col
              );
              if (idx > -1) {
                this.selectedRanges.splice(idx, 1);
              }
            });
            //処理対象行より下のデータの行番号(row)を補正
            let relist = this.selectedRanges.filter((v) => v.row > i);
            relist.forEach((e) => {
              e.row = e.row - 2;
              e.row2 = e.row;
            });
          }
        }
      }
      return array;
    },
    regist() {
      //並べ替え
      this.sort();
      //データチェック
      //登録
      //再表示
    },
    sort() {
      if (this.sortEditFlag) {
        let idx = this.viewData.findIndex((v) => v.num.length == 0);
        if (idx > -1) {
          alert('優先順位に空欄があります。\r\n確認してください。');
          return;
        }
        this.mainGrid.itemsSource = [];
        this.viewData.sort(function (a, b) {
          if (a.num !== b.num) {
            return a.num - b.num;
          }
          if (a.subnum !== b.subnum) {
            return a.subnum - b.subnum;
          }
          return 0;
        });
        //マージデータの並べ替え
        for (let i = 0; i < this.viewData.length; i++) {
          if (i % 2 == 1) {
            continue;
          }
          let list = this.selectedRanges.filter(
            (v) => v.row == (this.viewData[i].numbk - 1) * 2
          );
          list.forEach((e) => {
            e.row2 = i;
          });
        }
        this.selectedRanges.forEach((e) => {
          e.row = e.row2;
        });
        //再採番
        this.reNum();
        this.mainGrid.itemsSource = this.viewData;
        this.mainGrid.refresh();

        this.sortEditFlag = false;
      }
    },
    reNum() {
      let renum = 0;
      for (let i = 0; i < this.viewData.length; i++) {
        if (i % 2 == 0) {
          renum++;
        }
        this.viewData[i].num = renum;
        this.viewData[i].numbk = renum;
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#chiikizentai {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: var(--height);
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  .editarea {
    overflow-y: scroll;
    //width: 890px;
    width: 100%;
    div {
      width: 870px;
    }
  }
}
#grdChiikiZentai {
  font-size: 12px;
  color: $font_color;
  font-family: 'メイリオ';

  .wj-control .wj-content .wj-flexgrid {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }

  .wj-header {
    font-weight: normal;
    background: $view_Title_background_Blue;
    color: $view_Title_font_color_Blue;
    align-items: center;
    text-align: center !important;
  }

  .wj-header.wj-cell {
    display: flex;
    align-items: center;
    font-weight: normal;
  }

  .wj-header.wj-cell.wj-align-left {
    justify-content: center;
  }
}
.lightBlue {
  background-color: $view_Title_background_Blue !important;
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    white-space: pre-wrap;
  }
}
</style>
