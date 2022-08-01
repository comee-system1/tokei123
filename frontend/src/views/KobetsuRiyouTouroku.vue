<template>
  <div id="kobeturiyou">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container fluid class="container">
      <v-row no-gutters>
        <v-col class="leftArea">
          <user-list-print
            ref="user_list_print"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list-print>
        </v-col>
        <v-col class="rightArea ml-1">
          <v-row class="mt-0" no-gutters>
            <v-col>
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pr-2 text-center" elevation="0" :min-width="80">
                  <label class="greyLabel">利用者名</label>
                </v-card>
                <v-card class="light_yellow" :width="240" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
                <v-card
                  class="pr-2 ml-2 text-center"
                  elevation="0"
                  :min-width="80"
                >
                  <label class="greyLabel">受給者番号</label>
                </v-card>
                <v-card class="light_yellow" :width="100" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-end">
              生活支援変動情報:
              <v-btn x-small>
                <v-icon x-small class="white mr-3 rounded-circle">
                  mdi-download
                </v-icon>
                個別取込</v-btn
              >
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col md="4">
              <v-card elevation="0">
                <div class="clearfix">
                  <a class="addButton" @click="openDialog_Term('nyutaiin_add')"
                    >入退院追加</a
                  >
                  <a
                    class="ml-1 addButton"
                    @click="openDialog_Term('gaihaku_add')"
                    >外泊追加</a
                  >
                  <a class="ml-1 addButton" @click="openDialog_Add()"
                    >加算追加</a
                  >
                </div>
              </v-card>
            </v-col>
            <v-col md="6" class="ml-auto">
              <v-card elevation="0">
                <v-row no-gutters>
                  <v-col class="blue--text text-end"> 青文字 </v-col>
                  <v-col cols="2"> :編集可能 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_02.png" />
                  </v-col>
                  <v-col cols="*"> :入退院 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_03.png" />
                  </v-col>
                  <v-col cols="*"> :外泊 </v-col>
                  <v-col cols="1">
                    <div class="editMark"></div>
                  </v-col>
                  <v-col cols="*">:手修正済</v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <wj-flex-grid
            id="flexGrid"
            class="mt-1"
            :headersVisibility="'Column'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :itemsSourceChanged="onChangeInitialized"
            :autoGenerateColumns="false"
            :isReadOnly="true"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'None'"
            :style="gridHeight"
            :itemsSource="viewdata"
          ></wj-flex-grid>
        </v-col>
      </v-row>
      <dialog-kikantuika
        ref="dialog_kikantuika"
        @kikantuika_dialog_regist="kikantuika_dialog_regist"
        @kikantuika_dialog_delete="kikantuika_dialog_delete"
      >
      </dialog-kikantuika>
      <dialog-kasantuika
        ref="dialog_kasantuika"
        @kasantuika_dialog_regist="kasantuika_dialog_regist"
        @kasantuika_dialog_delete="kasantuika_dialog_delete"
      ></dialog-kasantuika>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import UserListPrint from '../components/UserListPrint.vue';
import DialogKikantuika from '../components/DialogKikantuika.vue';
import DialogKasantuika from '../components/DialogKasantuika.vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
// 一覧データ取得
import { KobetsuIcrnNyusho } from '@backend/api/KobetsuIcrnNyusho';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      plusOne: 1, // 該当日付を含める
      mainGrid: [], // 表示grid
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      dialog: false, // 期間追加用のダイアログ
      alertMessageFlag: false, // 変更時のアラートメッセージ
      editGridFlag: false, // grid編集状態フラグ
      // kasanRow: 0, // 加算情報の行数
      gridHeight: '', // グリッドの高さ
      rowCounts: {}, // 各行数
      viewdata: [],
      // hendoRow: 0, // 変動情報の行数
      num: 0,
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
    DialogKikantuika,
    DialogKasantuika,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    onInitialized(flexGrid) {
      // 初回の提供サービスコードを渡す
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.mainGrid = flexGrid;
      this.methodCellFormatSetting(flexGrid);
      // セルのクリックイベント
      this.methodCellClickEvent(flexGrid);
    },
    onChangeInitialized(flexGrid) {
      flexGrid.frozenColumns = 4;
      if (flexGrid.rows.length > 0) {
        flexGrid.rows[1].height = 30;
        flexGrid.rows[2].height = 30;
      }
    },
    /**************
     * セルのクリックイベント
     */
    methodCellClickEvent(flexGrid) {
      let _self = this;
      let leftClumn = 4; // 左ヘッダの数
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (
          ht.cellType == wjGrid.CellType.Cell &&
          ht.col >= leftClumn &&
          ht.col < _self.lastdate + leftClumn
        ) {
          // クリックしたデータ
          let selectedData = _self.viewdata[ht.row];
          // 入退院・外泊を押下
          //console.log(selectedData);
          if (selectedData.kmkkbn1 === 1 && selectedData.kmkkbn2 === 2) {
            let text = ht.target.innerText;
            if (text) {
              var parent = e.target.parentNode;
              let ground = parent
                .querySelector('p')
                .parentNode.getElementsByTagName('p');
              // htmlで指定したキーの取得
              // date-1-2
              // 1: nyugai_infの配列順番のキー
              // 2: 1:入退院 2:外泊
              let parentKey = ground[0].id.split('-');
              let params = {};
              // 開始日の取得
              if (parentKey[2] == 1) {
                // 入退院
                params = {
                  getkbn: 0,
                  riid: 1,
                  kbn: 1,
                  ngsymd: selectedData.nyugai_inf[parentKey[1]].ngsymd,
                  rendo: 0,
                };
                _self.$refs.dialog_kikantuika.parentFromOpenDialog(
                  params,
                  'nyutaiin_add'
                );
              }
              if (parentKey[2] == 2) {
                // 外泊
                params = {
                  getkbn: 0,
                  riid: 1,
                  kbn: 2,
                  ngsymd: selectedData.nyugai_inf[parentKey[1]].ngsymd,
                  rendo: 0,
                };

                _self.$refs.dialog_kikantuika.parentFromOpenDialog(
                  params,
                  'gaihaku_add'
                );
              }
            }
          } else {
            // クリックした日付
            let selectedDay = 'day' + (ht.col - leftClumn + 1).toString();
            if (selectedData[selectedDay] === '〇') {
              _self.viewdata[ht.row][selectedDay] = '×';
            } else if (selectedData[selectedDay] === '×') {
              _self.viewdata[ht.row][selectedDay] = '';
            } else if (selectedData[selectedDay] === '') {
              _self.viewdata[ht.row][selectedDay] = '〇';
            }
            // 食事・光熱水費の時は合計値の再計算
            if (
              selectedData.kmkkbn1 === 1 &&
              (selectedData.kmkkbn2 === 3 || selectedData.kmkkbn2 === 4)
            ) {
              _self.viewdata[ht.row]['kingaku'] = calc(
                _self.viewdata[ht.row]
              )[0];
              _self.viewdata[ht.row]['kei'] = calc(_self.viewdata[ht.row])[1];
              _self.alertMessageFlag = true;
            }
          }
          flexGrid.refresh();
        }

        // 合計値の計算式
        function calc(data) {
          let kingaku = 0;
          for (let i = 1; i <= _self.lastdate; i++) {
            let d = 'day' + i;
            if (data[d] === '〇') {
              kingaku += 1;
            }
          }
          return [kingaku * data['kmkkbn6'], kingaku];
        }
      });
    },

    /*******************************
     * ヘッダメニューのサービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = moment(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      if (serviceArgument['search_button']) {
        // ユーザ選択の無効化
        this.$refs.user_list_print.userCheckInvalide();
        this.userDataSelect[0]['riyosyo'] = '';
        this.userDataSelect[0]['jyukyusyabango'] = '';
        this.$refs.user_list_print.setChildTeikyocode(
          this.teikyoCode,
          serviceArgument['search_button']
        );
        this.mainGrid.columns.clear();
      }
    },
    /**********************
     * 左メニューで作成されたユーザ一覧の取得を行う
     */
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    /***************************
     * データの取得
     */
    getData() {
      let self = this;
      // データの取得
      KobetsuIcrnNyusho().then((result) => {
        this.mainGrid.columns.clear();
        // ヘッダ作成
        this.createHeader(this.mainGrid);
        let views = [];

        views = result.riyo_inf;
        this.createMerge(this.mainGrid, views);
        self.viewdata = views;
      });
    },
    /*****
     * 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
     */
    setUserSelectPoint(row) {
      // データの取得
      this.getData();

      // 選択したユーザー一覧の内容
      this.userDataSelect[0]['riyosyo'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;

      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;

      // 値の設定
      this.selectType = '';
      this.editGridFlag = '';
    },

    /**************************
     * ヘッダ作成
     */
    createHeader(flexGrid) {
      flexGrid.columns.insert(0, new wjGrid.Column());
      flexGrid.columns.insert(1, new wjGrid.Column());
      flexGrid.columns.insert(2, new wjGrid.Column());
      flexGrid.columns.insert(3, new wjGrid.Column());
      let column = 0;
      flexGrid.columns[column++].binding = 'komoku0';
      flexGrid.columns[column++].binding = 'komoku1';
      flexGrid.columns[column++].binding = 'komoku2';
      flexGrid.columns[column++].binding = 'komoku3';

      let c = column++;
      // 日付ヘッダ
      for (let day = 1; day <= this.lastdate; day++) {
        flexGrid.columns.insert(c, new wjGrid.Column());
        flexGrid.columns[c].binding = 'day' + day;
        c = column++;
      }

      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns[c].binding = 'kei';
      flexGrid.columns[c + 1].binding = 'kingaku';
      flexGrid.columnHeaders.setCellData(0, 0, '項目');
      for (let day = 1; day <= this.lastdate; day++) {
        let date = this.year + '/' + this.month + '/' + day;
        flexGrid.columnHeaders.setCellData(0, day + 3, date);
      }
      flexGrid.columnHeaders.setCellData(0, c, '計');
      flexGrid.columnHeaders.setCellData(0, c + 1, '金額');

      flexGrid.columnHeaders.rows.defaultSize = 38;
      flexGrid.rows.defaultSize = 20;
      flexGrid.columns[0].width = 20;
      flexGrid.columns[1].width = 20;
      flexGrid.columns[2].width = 40;
      flexGrid.columns[3].width = 90;

      for (let i = 4; i <= this.lastdate + 3; i++) {
        flexGrid.columns[i].width = 24;
      }
      flexGrid.columnHeaders.columns[this.lastdate + 4].width = 34;
    },

    /*****************
     * マージ
     */
    createMerge(flexGrid, data) {
      let headerRanges = [];
      let cellRanges = [];

      // 変動情報の数を取得
      this.hendoRow = data.filter(function (x) {
        return x.kmkkbn1 === 1;
      }).length;

      // 加算情報の数を取得
      this.kasanRow = data.filter(function (x) {
        return x.kmkkbn1 === 2;
      }).length;

      // 食事の行数
      this.mealRowCount = data.filter(function (x) {
        return x.kmkkbn2 === 3;
      }).length;

      // 体制＋個別の行数
      this.taiseiKobetsuRow = data.filter(function (x) {
        return x.mstkasanh0 === 1;
      }).length;

      // 個別の行数
      this.kobetsuRow = data.filter(function (x) {
        return x.mstkasanh0 === 2;
      }).length;

      headerRanges = [new wjGrid.CellRange(0, 0, 0, 3)];

      // 変動情報のマージ
      cellRanges.push(new wjGrid.CellRange(0, 0, this.hendoRow - 1, 0));
      // 食事の最初の行数
      let mealFirstRow = 0;
      for (let i = 0; i < data.length; i++) {
        // 利用日・入院日退院日
        if (data[i].kmkkbn2 === 1 || data[i].kmkkbn2 === 2) {
          cellRanges.push(new wjGrid.CellRange(i, 1, i, 3));
        }
        // 食事の最初の行数を取得
        if (data[i].kmkkbn2 === 3 && mealFirstRow === 0) {
          mealFirstRow = i;
        }
        // 光熱水費
        if (data[i].kmkkbn2 === 4) {
          cellRanges.push(new wjGrid.CellRange(i, 1, i, 2));
        }

        // 体制＋個別
        if (data[i].mstkasanh0 === 1) {
          cellRanges.push(new wjGrid.CellRange(i, 2, i, 3));
        }

        // 個別
        if (data[i].mstkasanh0 === 2) {
          cellRanges.push(new wjGrid.CellRange(i, 2, i, 3));
        }
      }

      //食事のマージ
      cellRanges.push(
        new wjGrid.CellRange(
          mealFirstRow,
          1,
          mealFirstRow + this.mealRowCount - 1,
          2
        )
      );

      // 加算情報のマージ
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow,
          0,
          this.hendoRow + this.kasanRow - 1,
          0
        )
      );

      // 体制＋個別のマージ
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow,
          1,
          this.hendoRow + this.taiseiKobetsuRow - 1,
          1
        )
      );

      // 個別のマージ
      cellRanges.push(
        new wjGrid.CellRange(
          this.hendoRow + this.taiseiKobetsuRow,
          1,
          this.hendoRow + this.taiseiKobetsuRow + this.kobetsuRow - 1,
          1
        )
      );

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /***************
     * ヘッダメニューのサービスを変更したとき
     */
    parentServiceChange(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.userDataSelect[0]['riyosyo'] = '';
      this.userDataSelect[0]['jyukyusyabango'] = '';
    },

    /*********************
     * 矢印を登録する
     */
    settingArrowView(data, i) {
      this.viewdata[i]['key'] = [];
      this.viewdata[i]['st'] = [];
      this.viewdata[i]['ed'] = [];
      this.viewdata[i]['diff'] = [];
      let gokei = 0;
      // 月末の取得
      let date = this.year + '-' + this.month + '-01';
      let matu = moment(date).endOf('month');
      let si = moment(date).startOf('month');
      let useDay = [];
      for (let n = 0; n < data.date.length; n++) {
        let end = '';
        if (data.date[n].taiinbi) {
          end = moment(data.date[n].taiinbi);
        }
        let nextMonthFlag = false;
        // 前月以前の場合は月初を指定する
        let start = moment(data.date[n].nyuuinbi);
        let beforeMonthFlag = false;
        // 変更前のデータ(表示用)
        let beforeStart = start;
        let beforeEnd = end;
        // 翌月以降の場合は月末を指定する
        if (end > matu || !end) {
          end = matu;
          nextMonthFlag = true;
        }

        if (start < si) {
          start = si;
          beforeMonthFlag = true;
        }

        let diff = end.diff(start, 'days');
        gokei += diff;
        this.viewdata[i]['key'].push(n);
        this.viewdata[i]['st'].push(beforeStart.format('M/D'));
        if (beforeEnd) {
          this.viewdata[i]['ed'].push(beforeEnd.format('M/D'));
        } else {
          this.viewdata[i]['ed'].push('未設定');
        }
        this.viewdata[i]['diff'].push(diff);

        for (let day = 0; day <= diff; day++) {
          let dayAdd = moment(start).add(day, 'd').format('D');
          let d = 'day' + dayAdd;

          if (day === 0) {
            // 既存データのtaiinbiの日付が重複しているとき
            if (useDay.indexOf(d) != -1) {
              this.viewdata[i][d] = 'center';
            } else if (!beforeMonthFlag) {
              this.viewdata[i][d] = 'start';
            } else {
              this.viewdata[i][d] = 'start-m';
            }
          } else if (day == diff) {
            if (!nextMonthFlag) {
              // 使った日付を保持
              useDay.push(d);
              this.viewdata[i][d] = 'end';
            } else {
              this.viewdata[i][d] = 'middle';
            }
          } else {
            this.viewdata[i][d] = 'middle';
          }
        }

        this.viewdata[i]['gokei'] = gokei + data.date.length;
        this.viewdata[i]['kingaku'] = 'none';
      }
    },

    /************************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        // 文字列を縦に変更
        let classname = '';
        if (e.panel != flexGrid.columnHeaders) {
          if (e.col == 0) {
            classname = 'vertical';
          }
          if (e.col == 1 && e.row >= _self.hendoRow) {
            classname = 'vertical';
          }
          // 利用日の表示
          if (
            tmpitem &&
            tmpitem.kmkkbn1 == 1 &&
            tmpitem.kmkkbn2 == 1 &&
            e.col >= 4 &&
            e.col < _self.lastdate + 4
          ) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            positionCenter(e);
          }
          // 金額
          if (e.col == _self.lastdate + 5) {
            if (text.length == 0) {
              e.cell.style.backgroundColor = sysConst.COLOR.selectedColor;
            } else {
              positionRight(e);
              e.cell.style.backgroundColor = sysConst.COLOR.white;
            }
          }
          // 合計
          if (e.col == _self.lastdate + 4) {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            positionRight(e);
          }
          // 食事
          if (
            tmpitem &&
            tmpitem.kmkkbn1 == 1 &&
            (tmpitem.kmkkbn2 == 3 || tmpitem.kmkkbn2 == 4) &&
            e.col >= 4 &&
            e.col < _self.lastdate + 4
          ) {
            positionCenter(e);
            e.cell.style.color = sysConst.COLOR.blueTextColor;
          }

          // セルの中央
          if (e.col >= 4 && e.col < _self.lastdate + 4) {
            positionCenter(e);
          }

          // 入院・退院
          if (
            tmpitem &&
            tmpitem.kmkkbn1 == 1 &&
            tmpitem.kmkkbn2 == 2 &&
            e.col >= 4 &&
            e.col < _self.lastdate + 4
          ) {
            let d = (e.col - 3).toString();
            // console.log(tmpitem.nyuuinbi_box_date);
            if (tmpitem.nyuuinbi) {
              // 0番目の区分で色を判定
              let color = '';
              let kbn = '';
              if (tmpitem.nyugai_inf[0].kbn === 1) {
                color = 'color_red';
                kbn = 1;
              } else {
                color = 'color_green';
                kbn = 2;
              }
              // nyuuinbiカラムの数値と一致するときに赤線に変更
              // 始まり
              var boxdate = tmpitem.nyuuinbi_box_date.find(
                (v) => v.startKey == d
              );
              let box = '';
              if (boxdate) {
                box =
                  '<p id="date-' +
                  boxdate.num +
                  '-' +
                  kbn +
                  '" >' +
                  boxdate.date +
                  '</p>';
              } else {
                box = '<p></p>';
              }
              if (tmpitem.nyuuinbi_st.indexOf(d) != -1) {
                html = "<div class='arrow-box " + color + "'></div>";
                html += "<div class='arrow-start " + color + "'></div>";
                html += "<div class='datearea'>" + box + '</div>';
              }
              // 中間
              if (tmpitem.nyuuinbi.indexOf(d) != -1) {
                html = "<div class='arrow-box " + color + "'></div>";
              }
              // 終わり
              if (tmpitem.nyuuinbi_ed.indexOf(d) != -1) {
                html = "<div class='arrow-box " + color + "'></div>";
                if (tmpitem.nyuuinbi_st.indexOf(d) != -1) {
                  html +=
                    "<div class='arrow-center " +
                    color +
                    "'><div class='" +
                    color +
                    "'></div></div>";
                  html += "<div class='datearea'>" + box + '</div>';
                } else {
                  html += "<div class='arrow-end " + color + "'></div>";
                }
              }
            }

            wjCore.setCss(e.cell, {
              display: 'table',
              tableLayout: 'absolute',
            });
            wjCore.setCss(e.cell.children[0], {
              display: 'table-cell',
              verticalAlign: 'middle',
            });
          }
        }

        if (e.panel == flexGrid.columnHeaders) {
          // 日付表示
          if (isDate.isDate(text)) {
            html = dateFormatString.dateFormatString(text);
            positionCenter(e);
          }

          if (e.row == 0 && (e.col == 0 || e.col >= _self.lastdate + 4)) {
            positionCenter(e);
          }
        }

        e.cell.innerHTML = '<div class="' + classname + '">' + html + '</div>';

        function positionCenter(e) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
        function positionRight(e) {
          e.cell.style.textAlign = 'right';
          e.cell.style.justifyContent = 'right';
          e.cell.style.alignItems = 'right';
        }
      });
    },

    mealMarges(cellRanges) {
      let stMeal = 0;
      let edMeal = 0;
      for (let i = 0; i < this.rowHendoData.hendo.length; i++) {
        if (this.rowHendoData.hendo[i].type == 'meal') {
          edMeal = stMeal;
          for (let m = 0; m < this.rowHendoData.hendo[i].data.length; m++) {
            edMeal++;
          }
          break;
        }
        stMeal++;
      }
      if (edMeal > 0) {
        cellRanges.push(new wjGrid.CellRange(stMeal, 1, edMeal - 1, 2));
      }
    },

    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 64;
      if (height > 800) {
        ht = 75;
      } else if (height > 700) {
        ht = 70;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },

    /*************************
     * ダイアログの表示
     */
    // 入退院ダイアログの登録ボタン押下
    kikantuika_dialog_regist() {
      // 登録データの再取得
      this.getData();

      this.num = 0;
      this.deleteGridFlag = false;
      this.mainGrid.itemsSource = [];
      this.mainGrid.itemsSource = this.viewdata;
    },

    // 加算追加ダイアログの登録ボタン押下
    kasantuika_dialog_regist() {
      alert('kasan');
    },

    // 入退院ダイアログの削除ボタン押下
    kikantuika_dialog_delete() {
      alert('kasan');
    },
    // 加算追加ダイアログの削除ボタン押下
    kasantuika_dialog_delete() {
      let kasanid = this.$refs.dialog_kasantuika.kasanid;
      let type = this.$refs.dialog_kasantuika.type;
      if (type == 'taisei_kobetu') {
        this.gridItemName[0].taisei_kobetu.splice(kasanid, 1);
      }
      if (type == 'kobetu') {
        this.gridItemName[0].kobetu.splice(kasanid, 1);
      }
      this.kasanRow = this.kasanRow - 1;
      this.mainGrid.itemsSource = [];
    },

    // 変動情報ダイアログの表示
    openDialog_Term(type) {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kikantuika.parentFromOpenDialog('', type);
      } else {
        alert('利用者を選択してください。');
      }
    },
    // 加算追加ダイアログの表示
    openDialog_Add() {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kasantuika.parentFromOpenDialog('0', 'add');
      } else {
        alert('利用者を選択してください。');
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#kobeturiyou {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: none;

  .wj-cell {
    padding: 0 !important;
    &.wj-frozen-row {
      text-align: center;
      z-index: 2 !important;
    }
  }
  .wj-frozen {
    background-color: $selected_color;
    z-index: 2 !important;
  }

  .container {
    padding: 4px;
    min-width: 1320px;
  }
  .wj-cells {
    font-size: $cell_fontsize;
  }
  .wj-cells .wj-cell.wj-state-selected {
    background-color: $light-white !important;
    color: $font_color !important;
  }
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 100px;
    height: 100%;
  }
  // 受給者証状況用のエリアボックス
  .jyukyusyaBox {
    height: 60px;
    overflow-y: auto;
  }
  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }
  .rightArea {
    min-width: 1020px;
    max-width: 1020px;
  }

  .gridBackground {
    background-color: $grid_background;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.backGray {
      background-color: $selected_color;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      font-size: 16px;
    }
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  }
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    font-size: 16px;
  }

  // 期間追加・加算追加ボタン
  a {
    &.addButton {
      height: 20px;
      width: 100px;
      background-color: $white;
      border: 1px solid $font_color;
      display: block;
      float: left;
      color: $font_color !important;
      text-align: right;
      border-radius: 3px;
      padding: 0px 10px 0px 0px;
      cursor: pointer;
      background-image: url('../assets/plus_15px.png');
      background-position: top 1px left 1px;
      &:hover {
        background-color: $selected_color;
      }
    }
  }
  #flexGrid {
    width: auto;
    max-width: none;
    min-width: none;
    .wj-cell {
      padding: 0 !important;
      &.wj-frozen-row {
        text-align: center;
        z-index: 2 !important;
      }
    }
    .wj-frozen {
      background-color: $selected_color;
    }
  }

  // 手修正済み
  div.editMark {
    width: 30px;
    height: 14px;
    margin-top: 3px;
    background-color: $pink;
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  // ヘッド
  .head {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  // 縦書き
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }

  div.arrow-box {
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    &.color_red {
      border-top: 1px solid $red;
    }
    &.color_green {
      border-top: 1px solid $green;
    }
  }
  .arrow-start {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-right: 3px solid $red;
    }
    &.color_green {
      border-right: 3px solid $green;
    }
  }
  .arrow-center {
    div {
      width: 5px;
      height: 5px;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      position: absolute;
      left: 10px;
      top: 1px;
      text-indent: -9999px;
      &:first-child {
        &.color_red {
          border-right: 3px solid $red;
        }
        &.color_green {
          border-right: 3px solid $green;
        }
      }
      &:last-child {
        &.color_red {
          border-left: 3px solid $red;
        }
        &.color_green {
          border-left: 3px solid $green;
        }
      }
    }
  }
  .arrow-end {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: auto;
    right: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-left: 3px solid $red;
    }
    &.color_green {
      border-left: 3px solid $green;
    }
  }

  div.datearea {
    width: 140px;
    height: 26px;
    text-align: left;
    p {
      color: $deepgreen;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
      top: 6px;
      left: 2%;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }
}
</style>
