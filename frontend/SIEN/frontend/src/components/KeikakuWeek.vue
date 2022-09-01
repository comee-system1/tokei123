<template>
  <div id="keikakuWeek">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }" class="pr-1">
          <v-row no-gutters class="mt-1">
            <v-card class="d-flex justify-start" flat tile>
              <v-card
                outlined
                tile
                width="60"
                class="text-center label text-caption"
              >
                利用者名
              </v-card>
              <v-card
                width="200"
                class="ml-1 text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                {{ userName }}
              </v-card>
              <v-card
                outlined
                tile
                width="60"
                class="ml-1 text-center label text-caption"
              >
                作成日
              </v-card>
              <v-card
                width="100"
                class="ml-1 text-center text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                2022年4月22日
              </v-card>

              <v-card
                outlined
                tile
                width="120"
                class="ml-1 text-center label text-caption"
              >
                週間計画開始年月
              </v-card>
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="140px"
                height="24px"
                class="text-caption ml-1"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-tabs
                height="25"
                v-model="inputTypemodel"
                class="mt-2"
                @change="inputTypeChange"
              >
                <v-tab
                  class="text-caption"
                  v-for="value in inputType"
                  :key="value.key"
                  style="height: 25px"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-col cols="6" class="text-end pr-1">
              <v-btn-toggle tile>
                <v-btn small>前回コピー</v-btn>
                <v-btn small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col :cols="gridMain">
              <wj-flex-grid
                id="keikakuWeekGrid"
                :selectionMode="'4'"
                :headersVisibility="1"
                :alternatingRowStep="0"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :showBandedRows="false"
                :initialized="onInitialize"
                :itemsSourceChanged="onInitializeItemChanged"
                :itemsSource="viewdata"
                :style="styles"
              >
                <wj-flex-grid-column
                  :header="' '"
                  binding="times"
                  align="center"
                  valign="middle"
                  width="1.3*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  v-for="val in weekarray"
                  :key="val.header"
                  :header="val.header"
                  :binding="val.binding"
                  align="center"
                  valign="middle"
                  format="g"
                  width="2*"
                  :wordWrap="true"
                  :isReadOnly="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col :cols="gridSub" class="pl-1">
              <div v-if="inputTypemodel == 1">
                <v-card
                  outlined
                  tile
                  :style="{ height: textareaHeight }"
                  class="ohidden"
                >
                  <v-toolbar
                    flat
                    color="primary"
                    dark
                    elevation="0"
                    height="20"
                    tile
                  >
                    <v-toolbar-title class="text-caption">{{
                      mainActiveTitle
                    }}</v-toolbar-title>
                  </v-toolbar>
                  <div class="pa-1 textarea" @click="onEditTextDialog(1)">
                    {{ mainActiveText }}
                  </div>
                </v-card>
                <v-card
                  outlined
                  tile
                  class="mt-1 ohidden"
                  :style="{ height: textareaHeight }"
                >
                  <v-toolbar
                    flat
                    color="primary"
                    dark
                    elevation="0"
                    height="20"
                    tile
                  >
                    <v-toolbar-title class="text-center text-caption">
                      {{ weekActiveTitle }}
                    </v-toolbar-title>
                  </v-toolbar>
                  <div class="pa-1 textarea" @click="onEditTextDialog(2)">
                    {{ weekActiveText }}
                  </div>
                </v-card>
              </div>
              <div v-if="inputTypemodel == 0">
                <wj-flex-grid
                  id="keikakuItemGrid"
                  :selectionMode="3"
                  :headersVisibility="1"
                  :alternatingRowStep="0"
                  :autoGenerateColumns="false"
                  :allowResizing="false"
                  :allowDragging="false"
                  :allowSorting="false"
                  :showBandedRows="false"
                  :initialized="onInitializeItem"
                  :itemsSourceChanged="onInitializeItemChanged"
                  :itemsSource="itemdata"
                >
                  <wj-flex-grid-column
                    :header="'日常生活'"
                    binding="every"
                    align="center"
                    :isReadOnly="true"
                    width="*"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
                <wj-flex-grid
                  id="keikakuServiceGrid"
                  :selectionMode="3"
                  :headersVisibility="1"
                  :alternatingRowStep="0"
                  :autoGenerateColumns="false"
                  :allowResizing="false"
                  :allowDragging="false"
                  :allowSorting="false"
                  :showBandedRows="false"
                  :initialized="onInitializeServiceItem"
                  :itemsSourceChanged="onInitializeItemChanged"
                  :itemsSource="servicedata"
                >
                  <wj-flex-grid-column
                    :header="'福祉サービス'"
                    binding="service"
                    align="center"
                    :isReadOnly="true"
                    width="*"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </div>
            </v-col>
            <div v-if="inputTypemodel == 1" style="width: 100%">
              <v-card class="d-flex justify-start" flat tile>
                <v-card
                  outlined
                  tile
                  width="100"
                  height="80"
                  class="text-center label text-caption textarea"
                  color="primary"
                  dark
                >
                  {{ weekActiveServiceTitle }}
                </v-card>
                <v-card
                  width="100%"
                  height="80"
                  class="ml-1 text-caption textarea"
                  elevation="0"
                  outlined
                  tile
                  @click="onEditTextDialog(3)"
                >
                  {{ weekActiveServiceText }}
                </v-card>
              </v-card>
            </div>

            <v-row dense class="ma-2" justify="space-between">
              <v-col cols="4">
                <v-btn small>削除</v-btn>
              </v-col>
              <v-col cols="7">
                <v-card class="d-flex justify-end" flat tile>
                  <v-card
                    outlined
                    tile
                    width="60"
                    class="text-center text-caption label pt-1"
                    >完了
                  </v-card>
                  <v-card elevation="0" width="30" class="text-center mt-1">
                    <input type="checkbox" />
                  </v-card>
                  <v-card
                    class="lightYellow pl-1 pt-1 ml-1"
                    width="140"
                    outlined
                    tile
                  >
                    竹下道子
                  </v-card>
                  <v-btn small class="ml-3" @click="ideaIkouKadaiRegist"
                    >登録</v-btn
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuWeekDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelectWeek"
      >
      </v-date-picker>
    </v-dialog>

    <v-dialog
      v-model="editTextDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="editTextDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="editTextSave"> 仮設定 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-textarea
          outlined
          v-model="dialogText"
          :style="textstyles"
          class="editTextarea"
          hide-details="false"
        >
        </v-textarea>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import UserList from './UserList.vue';
import * as wjcCore from '@grapecity/wijmo';
export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
  },
  data() {
    return {
      dialogTitle: '',
      dialogText: '',
      notekey: 0,
      editTextDialog: false,
      onflexGrid: '',
      onItemGrid: '',
      onServiceGrid: '',
      rowCount: 0,
      leftWidth: '280px',
      rightWidth: '80%',
      gridMain: 10,
      gridSub: 2,
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        moment().format('YYYY') +
        '年' +
        moment().format('MM') +
        '月' +
        moment().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      inputType: [
        {
          key: 1,
          value: '週間予定',
        },
        {
          key: 2,
          value: '主な日常生活等',
        },
      ],
      inputTypemodel: 0, // 0: 週間予定 1: 主な日常生活
      keikakuKubunModel: '',
      viewdata: [],

      weekarray: [
        {
          key: 1,
          header: '月',
          binding: 'monday1',
        },
        {
          key: 2,
          binding: 'monday2',
        },
        {
          key: 3,
          header: '火',
          binding: 'thuseday1',
        },
        {
          key: 4,
          binding: 'thuseday2',
        },
        {
          key: 5,
          header: '水',
          binding: 'wednesday1',
        },
        {
          key: 6,
          binding: 'wednesday2',
        },
        {
          key: 7,
          header: '木',
          binding: 'thursday1',
        },
        {
          key: 8,
          binding: 'thursday2',
        },
        {
          key: 9,
          header: '金',
          binding: 'friday1',
        },
        {
          key: 10,
          binding: 'friday2',
        },
        {
          key: 11,
          header: '土',
          binding: 'saturday1',
        },
        {
          key: 12,
          binding: 'saturday2',
        },
        {
          key: 13,
          header: '日・祝',
          binding: 'sunday1',
        },
        {
          key: 14,
          binding: 'sunday2',
        },
      ],
      everySelected: 0,
      itemdata: [],
      servicedata: [],
      ranges: [],
      headerRanges: [],
      headerheight: 240,
      textareaHeight: '',
      draggedFlag: false, // gridをクリックしてdragしている情報を保持する
      position: [],
      mainActiveTitle: '',
      mainActiveText: '', // 主な日常生活の活動データ
      weekActiveTitle: '',
      weekActiveText: '', // 週単位以外のサービス
      weekActiveServiceTitle: '',
      weekActiveServiceText: '',
      userName: '',
    };
  },
  created() {},
  mounted() {
    this._makeDragSource(this.onflexGrid);
    window.addEventListener('resize', this.calculateWindowHeight);

    this.mainActiveTitle = '主な日常生活の活動';
    // 主な日常生活の活動データ
    this.mainActiveText =
      '私はじっと話のものがお発表もするといるですんななけれて、一一の衣食にさっそく這入っうとして使用ますが、実はこの人心の他人が立つれると、ここかをあなたの時代の話からするでいです事なけれんと話云って安心なる来ませた。自分とまた大森さんをそうしてまだ挙げないんんなけれた。ネルソンさんはなぜ人々にやりているなものならますなく。（それでも人を濁しためたでますばたいは間違っですうて、）こう怠けだろ周囲で、文部省の警視総監くらいしゃべっとなさるという、お茶の尊重も結果のうちだってし見るので弱らでて記憶方あって行くありという小自力ないのない。';
    this.weekActiveTitle = '週単位以外のサービス';
    this.weekActiveText = '相談支援事業所とサークルや教室を見学予定';

    this.weekActiveServiceTitle = 'サービス提供によって実現する生活の全体像';
    this.weekActiveServiceText =
      '・本人の描いている「テレビドラマの主人公のような強くて明るい生活」をそのまま支援目標としたことで、本人の生活意欲や本人の望む生活の具体的内容を共有していく\n・本人の生活(行動範囲)の広がりがみられてきており、編み物等の趣味への意欲につながってきている。半面、加齢による体力的な低下も現れているため、定期的なモニタリングが必要';
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('keikakuWeekGrid') != null) {
        document.getElementById('keikakuWeekGrid').style.height =
          window.innerHeight - this.headerheight + 'px';

        let ht = document.getElementById('keikakuWeekGrid').style.height;
        this.textareaHeight = parseInt(ht.replace(/[^0-9]/g, '') / 2) + 'px';
      }
    },
    editTextSave() {
      if (this.notekey == 1) {
        this.mainActiveText = this.dialogText;
      }
      if (this.notekey == 2) {
        this.weekActiveText = this.dialogText;
      }
      if (this.notekey == 3) {
        this.weekActiveServiceText = this.dialogText;
      }
      this.editTextDialog = false;
    },
    onEditTextDialog(type) {
      this.notekey = type;
      if (type == 1) {
        this.dialogTitle = this.mainActiveTitle;
        this.dialogText = this.mainActiveText;
      }
      if (type == 2) {
        this.dialogTitle = this.weekActiveTitle;
        this.dialogText = this.weekActiveText;
      }
      if (type == 3) {
        this.dialogTitle = this.weekActiveServiceTitle;
        this.dialogText = this.weekActiveServiceText;
      }

      this.editTextDialog = true;
    },
    /*********************************
     * 登録ボタン
     */
    ideaIkouKadaiRegist() {
      alert('regist');
    },
    /*************************
     * 週間予定・主な日常生活等切替タブ
     */
    inputTypeChange() {
      if (this.inputTypemodel == 0) {
        this.gridMain = 10;
        this.gridSub = 2;
        this.headerheight = 180;
        this.textareaHeight = '';
      }
      if (this.inputTypemodel == 1) {
        this.gridMain = 9;
        this.gridSub = 3;
        this.headerheight = 300;
      }
      this.calculateWindowHeight();
    },
    /******************************
     * グリッドのドラックドロップ
     */
    _makeDragSource(s) {
      s.addEventListener(
        s.hostElement,
        'mousedown',
        (e) => {
          // 右側の日常生活を押下時のみ有効
          if (this.everySelected != 0) {
            let ht = this.onflexGrid.hitTest(e);
            this.draggedFlag = true;
            this.position.down = { col: ht.col, row: ht.row };
          }
        },
        true
      );
      s.addEventListener(
        s.hostElement,
        'mouseup',
        (e) => {
          if (this.everySelected != 0) {
            let ht = this.onflexGrid.hitTest(e);
            this.position.up = { col: ht.col, row: ht.row };
            let downcol = this.position.down.col;
            let downrow = this.position.down.row;
            let upcol = this.position.up.col;
            let uprow = this.position.up.row;
            if (upcol < downcol) {
              downcol = this.position.up.col;
              upcol = this.position.down.col;
            }
            if (uprow < downrow) {
              downrow = this.position.up.row;
              uprow = this.position.down.row;
            }

            for (let c = downcol; c <= upcol; c++) {
              let bind = this.weekarray[c - 1].binding;
              for (let r = downrow; r <= uprow; r++) {
                this.viewdata[r][bind] = this.everySelected;
              }
            }
            let view = this.viewdata.slice();
            this.viewdata = view;
            this.createRanges();
            this.createMerge(this.onflexGrid);
            this.draggedFlag = false;
          }
        },
        true
      );
    },

    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    createData() {
      let setting = [];
      setting.push({
        times: ' ',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: ' ',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '06:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '06:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '06:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '06:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '08:00',
        monday1: '起床',
        monday2: '起床',
        thuseday1: '起床',
        thuseday2: '起床',
        wednesday1: '起床',
        wednesday2: '起床',
        thursday1: '起床',
        thursday2: '起床',
        friday1: '起床',
        friday2: '起床',
        saturday1: '起床',
        saturday2: '起床',
        sunday1: '起床',
        sunday2: '起床',
      });
      setting.push({
        times: '08:00',
        monday1: '起床',
        monday2: '起床',
        thuseday1: '起床',
        thuseday2: '起床',
        wednesday1: '起床',
        wednesday2: '起床',
        thursday1: '起床',
        thursday2: '起床',
        friday1: '起床',
        friday2: '起床',
        saturday1: '起床',
        saturday2: '起床',
        sunday1: '起床',
        sunday2: '起床',
      });
      setting.push({
        times: '08:00',
        monday1: 'TVドラマ・朝食',
        monday2: 'TVドラマ・朝食',
        thuseday1: 'TVドラマ・朝食',
        thuseday2: 'TVドラマ・朝食',
        wednesday1: 'TVドラマ・朝食',
        wednesday2: 'TVドラマ・朝食',
        thursday1: 'TVドラマ・朝食',
        thursday2: 'TVドラマ・朝食',
        friday1: 'TVドラマ・朝食',
        friday2: 'TVドラマ・朝食',
        saturday1: 'TVドラマ・朝食',
        saturday2: 'TVドラマ・朝食',
        sunday1: '朝食',
        sunday2: '朝食',
      });
      setting.push({
        times: '08:00',
        monday1: 'TVドラマ・朝食',
        monday2: 'TVドラマ・朝食',
        thuseday1: 'TVドラマ・朝食',
        thuseday2: 'TVドラマ・朝食',
        wednesday1: 'TVドラマ・朝食',
        wednesday2: 'TVドラマ・朝食',
        thursday1: 'TVドラマ・朝食',
        thursday2: 'TVドラマ・朝食',
        friday1: 'TVドラマ・朝食',
        friday2: 'TVドラマ・朝食',
        saturday1: 'TVドラマ・朝食',
        saturday2: 'TVドラマ・朝食',
        sunday1: '朝食',
        sunday2: '朝食',
      });
      setting.push({
        times: '10:00',
        monday1: 'ゴミ収集',
        monday2: 'ゴミ収集',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '10:00',
        monday1: 'ゴミ収集',
        monday2: 'ゴミ収集',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '10:00',
        monday1: '',
        monday2: '',
        thuseday1: 'ヘルパー(家事)',
        thuseday2: 'ヘルパー(家事)',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '10:00',
        monday1: '',
        monday2: '',
        thuseday1: 'ヘルパー(家事)',
        thuseday2: 'ヘルパー(家事)',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '12:00',
        monday1: '',
        monday2: '',
        thuseday1: 'ヘルパー(家事)',
        thuseday2: 'ヘルパー(家事)',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '12:00',
        monday1: '',
        monday2: '',
        thuseday1: 'ヘルパー(家事)',
        thuseday2: 'ヘルパー(家事)',
        wednesday1: '',
        wednesday2: '',
        thursday1: '外出\n(買い物・銀行・クリーニング等)',
        thursday2: '外出\n(買い物・銀行・クリーニング等)',
        friday1: '',
        friday2: '',
        saturday1: '',
        saturday2: '',
        sunday1: '外出\n(買い物・銀行・クリーニング等)',
        sunday2: '外出\n(買い物・銀行・クリーニング等)',
      });
      setting.push({
        times: '12:00',
        monday1: 'TVドラマ・昼食',
        monday2: 'TVドラマ・昼食',
        thuseday1: 'TVドラマ・昼食',
        thuseday2: 'TVドラマ・昼食',
        wednesday1: 'TVドラマ・昼食',
        wednesday2: 'TVドラマ・昼食',
        thursday1: 'TVドラマ・昼食',
        thursday2: 'TVドラマ・昼食',
        friday1: 'TVドラマ・昼食',
        friday2: 'TVドラマ・昼食',
        saturday1: 'TVドラマ・昼食',
        saturday2: 'TVドラマ・昼食',
        sunday1: '昼食',
        sunday2: '昼食',
      });
      setting.push({
        times: '12:00',
        monday1: 'TVドラマ・昼食',
        monday2: 'TVドラマ・昼食',
        thuseday1: 'TVドラマ・昼食',
        thuseday2: 'TVドラマ・昼食',
        wednesday1: 'TVドラマ・昼食',
        wednesday2: 'TVドラマ・昼食',
        thursday1: 'TVドラマ・昼食',
        thursday2: 'TVドラマ・昼食',
        friday1: 'TVドラマ・昼食',
        friday2: 'TVドラマ・昼食',
        saturday1: 'TVドラマ・昼食',
        saturday2: 'TVドラマ・昼食',
        sunday1: '昼食',
        sunday2: '昼食',
      });
      setting.push({
        times: '14:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '14:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });

      setting.push({
        times: '14:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '通院同行\n(内科・歯科)',
        wednesday2: '通院同行\n(内科・歯科)',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '14:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '通院同行\n(内科・歯科)',
        wednesday2: '通院同行\n(内科・歯科)',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '16:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '通院同行\n(内科・歯科)',
        wednesday2: '通院同行\n(内科・歯科)',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '16:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '通院同行\n(内科・歯科)',
        wednesday2: '通院同行\n(内科・歯科)',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '16:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '16:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '18:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '18:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '18:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '18:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '20:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '20:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '20:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });
      setting.push({
        times: '20:00',
        monday1: '',
        monday2: '',
        thuseday1: '',
        thuseday2: '',
        wednesday1: '',
        wednesday2: '',
        thursday1: '',
        thursday2: '',
        friday1: '',
        friday3: '',
        saturday1: '',
        saturday2: '',
        sunday1: '',
        sunday2: '',
      });

      this.viewdata = setting;

      let item = [];
      item.push(
        {
          id: 1,
          every: '起床',
        },
        {
          id: 2,
          every: '就寝',
        },
        {
          id: 3,
          every: '洗顔・歯磨き',
        },
        {
          id: 4,
          every: '朝食',
        },
        {
          id: 5,
          every: '昼食',
        },
        {
          id: 6,
          every: '夕食',
        },
        {
          id: 7,
          every: 'おやつ',
        },
        {
          id: 8,
          every: '入浴',
        },
        {
          id: 9,
          every: 'テレビを観る',
        }
      );
      this.itemdata = item;

      let servicedata = [];
      servicedata.push(
        {
          id: 1,
          service: 'ヘルパー',
        },
        {
          id: 2,
          service: '生活サポート',
        },
        {
          id: 3,
          service: '地域活動支援センター',
        },
        {
          id: 4,
          service: '生活介護',
        },
        {
          id: 5,
          service: '就労移行支援',
        }
      );
      this.servicedata = servicedata;
    },
    /********************
     * 日常生活
     *************/
    onInitializeItem(flexGrid) {
      let _self = this;
      this.onItemGrid = flexGrid;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          _self.everySelected = _self.itemdata[ht.row].every;
          _self.onServiceGrid.select(-1, -1);
        }
      });
    },
    /********************
     * 福祉サービス
     *************/
    onInitializeServiceItem(flexGrid) {
      let _self = this;
      this.onServiceGrid = flexGrid;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          _self.everySelected = _self.servicedata[ht.row].service;
          _self.onItemGrid.select(-1, -1);
        }
      });
    },
    onInitializeItemChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      let tooltip = new wjcCore.Tooltip();
      let _self = this;
      let bind = '';
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.cells) {
          if (_self.weekarray[e.col - 1]) {
            bind =
              e.panel.rows[e.row].dataItem[_self.weekarray[e.col - 1].binding];
          }
          tooltip.setTooltip(e.cell, bind);
        }
      });
    },
    onInitialize(flexGrid) {
      this.onflexGrid = flexGrid;
      flexGrid.frozenColumns = 1;
      this.createData();

      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        flexGrid.cells.rows.defaultSize = 14.5;
      });
      this.createRanges();
      this.createMerge(flexGrid);
    },
    groupBy(xs, key) {
      let row = 0;
      let i2 = 0;
      let start = [];
      let last = [];
      let text = [];
      for (let i = 0; i < xs.length; i++) {
        i2 = i - 1;

        if (row == 0) {
          if (i - 1 < 0) {
            i = 0;
          } else {
            i = i - 1;
          }
          start.push(i);
          start.push(i);
          text.push(xs[i][key]);
          text.push(xs[i][key]);
        } else if (xs[i][key] != xs[i2][key]) {
          last.push(i - 1);
          last.push(i - 1);
          row = 0;
          continue;
        }
        row++;
      }
      last.push(xs.length - 1);
      last.push(xs.length - 1);

      let returns = {
        start: start,
        last: last,
        text: text,
      };
      return returns;
    },
    createRanges() {
      let headerRanges = [];
      let ranges = [];
      let mergeGroup = [];
      let start = [];
      let last = [];
      let text = [];

      // 時間軸のグループ化
      mergeGroup = this.groupBy(this.viewdata, 'times');
      start = mergeGroup.start;
      last = mergeGroup.last;
      // text = mergeGroup.text;
      for (let i = 0; i < start.length; i++) {
        // if (text[i]) {
        ranges.push(new wjGrid.CellRange(start[i], 0, last[i], 0));
        // }
      }
      // 曜日軸のグループ化
      for (let i = 1; i <= 7; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i * 2 - 1, 0, i * 2));
      }
      this.headerRanges = headerRanges;
      // 週間のグループ化
      console.log(this.weekarray.length);
      for (let wk = 0; wk < this.weekarray.length; wk++) {
        mergeGroup = this.groupBy(this.viewdata, this.weekarray[wk].binding);
        start = mergeGroup.start;
        last = mergeGroup.last;
        text = mergeGroup.text;

        console.log(start);
        console.log(last);
        console.log(text);

        for (let i = 0; i < start.length; i++) {
          if (text[i]) {
            ranges.push(
              new wjGrid.CellRange(
                start[i],
                this.weekarray[wk].key,
                last[i],
                this.weekarray[wk].key
              )
            );
          }
        }
      }
      this.ranges = ranges;
    },
    createMerge(flexGrid) {
      let ranges = this.ranges;
      let headerRanges = this.headerRanges;
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
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
    inputCalendarClick() {
      this.picker =
        moment().format('YYYY') +
        '-' +
        moment().format('MM') +
        '-' +
        moment().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelectWeek() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuWeek {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  height: var(--height);

  div.label {
    background-color: $light-gray;
  }
  .wj-align-center {
    display: flex;
  }
  .borderBottom {
    border-bottom: 1px solid $deepgreen;
  }
  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw200 {
    max-width: 200px;
  }
  .wj-frozen {
    background-color: $selected_color;
  }
  .ohidden {
    overflow: hidden;
  }
  .textarea {
    height: 100%;
    &:hover {
      background-color: $light-white;
      cursor: pointer;
    }
  }
}

#keikakuWeekDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 280px;
  width: 300px;
  max-width: 300px;
}
</style>
