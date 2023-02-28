<template>
  <v-container id="weekCaleandar" class="pa-0">
    <v-row no-gutters class="rowStyle_Dark pa-1 pl-0">
      <v-card class="koumokuTitle titleBlueDark mr-1 ml-1" outlined tile>
        利用者名
      </v-card>
      <v-card
        width="250"
        class="koumokuData border mr-1 pl-1"
        elevation="0"
        outlined
        tile
      >
        {{ riyocode }}
        {{ userName }}
      </v-card>
      <v-card class="koumokuTitle titleBlueDark mr-1 ml-1" outlined tile>
        作成日
      </v-card>
      <v-card
        width="120"
        class="koumokuData border mr-1 pl-1"
        elevation="0"
        outlined
        tile
      >
        {{ createDate }}
      </v-card>
    </v-row>
    <v-row no-gutters class="mt-1">
      <v-col class="d-flex" cols="8">
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          計画開始年月
        </v-card>
        <v-card
          outlined
          tile
          class="text-center label text-caption pa-1 koumokuTitle"
        >
          <div class="float-right" @click="inputCalendarClick()">
            {{ startDate }}
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain mr-1 ml-1" outlined tile>
          入力内容
        </v-card>
        <v-btn-toggle v-model="weekplanType" class="weekplanType">
          <v-btn :value="0">週間予定</v-btn>
          <v-btn :value="1" @click="dialogDaily(1)">主な日常生活等</v-btn>
          <v-btn :value="2" @click="dialogDaily(2)">生活の全体像</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="4" class="d-flex justify-end weekplanType">
        <v-btn @click="weekInput()">
          <v-icon small> mdi-plus-circle </v-icon> 週間項目入力</v-btn
        >
        <v-btn class="ml-1" @click="onLastTimeCopy(`${rekiid}`)"
          >前回コピー</v-btn
        >
        <v-btn class="ml-1">計画コピー</v-btn>
        <v-btn class="ml-1" @click="historyFlag = true">履歴参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <div id="calendarViewArea">
        <svg viewbox="viewport" class="calendar">
          <!--メモリ-->
          <rect
            x="0"
            y="0"
            :height="calendarSepalate"
            class="colHeader header"
            stroke-width="1"
          />
          <rect
            x="0"
            y="0"
            :height="calendarHeight"
            :width="timewidth"
            class="rowHeader header"
            stroke-width="1"
          />
          <g stroke="black">
            <!--各時間軸-->
            <line x1="0" y1="0" x2="100%" y2="0" stroke-width="1"></line>
            <line
              x1="0"
              :y1="calendarHeight"
              x2="100%"
              :y2="calendarHeight"
              stroke-width="1"
            ></line>
            <line
              v-for="n in 24"
              :key="`k-${n}`"
              :x1="timewidth"
              :y1="n * calendarSepalate"
              x2="100%"
              :y2="n * calendarSepalate"
              stroke-dasharray="1.5 2"
              stroke-width="0.2"
            ></line>

            <!--各曜日軸-->
            <line x1="0" y1="1" x2="0" :y2="calendarHeight"></line>
            <line x1="100%" y1="1" x2="100%" :y2="calendarHeight"></line>

            <rect
              v-for="n of 7"
              :key="n"
              :x="planwidth * (n - 1) + timewidth"
              y="0"
              width="1"
              :height="calendarHeight"
              fill="#999"
              stroke-width="0"
            />
          </g>
          <!--週-->
          <text x="158" y="15" class="week">月</text>
          <text x="286" y="15" class="week">火</text>
          <text x="414" y="15" class="week">水</text>
          <text x="542" y="15" class="week">木</text>
          <text x="670" y="15" class="week">金</text>
          <text x="798" y="15" class="week">土</text>
          <text x="910" y="15" class="week">日・祝</text>

          <!--time-->
          <text
            x="50"
            :y="times.y"
            class="time"
            v-for="times in timeLine"
            :key="`time-${times.id}`"
          >
            {{ times.time }}
          </text>

          <rect
            v-for="val in viewSchedule"
            :key="`box-${val.id}`"
            :x="val.x"
            :y="val.y"
            :width="val.width"
            :height="val.height"
            :fill="val.bcolorcode"
            :stroke="`#ccc`"
            stroke-width="1"
            class="rects"
          />
          <foreignObject
            v-for="val in viewSchedule"
            :key="`text-${val.id}`"
            :x="val.xText"
            :y="val.yText"
            :width="val.width"
            :height="val.height"
            @click="weekInput(val.id)"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <center
                  v-bind="attrs"
                  v-on="on"
                  :style="`color: ${val.fcolorcode}`"
                >
                  {{ val.freetok }}
                </center>
              </template>
              <span>{{ val.freetok }}</span>
            </v-tooltip>
          </foreignObject>
        </svg>
      </div>
    </v-row>
    <v-row no-gutters class="mt-2 bottomArea">
      <v-col
        ><v-btn small height="24" @click="onWeekKeikakuDelete(`${rekiid}`)"
          >削除</v-btn
        ></v-col
      >
      <v-col class="d-flex justify-end">
        <label>完了</label>
        <input
          type="checkbox"
          v-model="checkCompleteFlag"
          class="ml-1"
          @click="onComplete()"
        />
        <v-card class="ml-1 box">{{ complete }}</v-card>
        <v-btn
          small
          class="ml-6"
          height="24"
          @click="onRegistSchedule(`${rekiid}`)"
          >登録</v-btn
        >
      </v-col>
    </v-row>

    <v-navigation-drawer right v-model="historyFlag" absolute temporary>
      <v-card elevation="0">
        <v-card-title class="dialog_title">
          履歴参照
          <v-btn class="dialog_close pa-0" @click="historyFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <wj-flex-grid
            id="historyGrid"
            :headersVisibility="'Column'"
            :alternating-row-step="0"
            :initialized="onInitializedHistory"
            :selectionMode="'Row'"
            :itemsSource="historyView"
            :formatItem="onFormatItemHistory"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
          >
            <wj-flex-grid-column
              header="計画作成日"
              binding="planDate"
              :width="'*'"
              align="center"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="週間計画完了"
              binding="planFinFlag"
              align="center"
              :width="'*'"
              :isReadOnly="true"
              class="finish"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-card>
      </v-card>
    </v-navigation-drawer>

    <v-dialog v-model="datepickerYoteiYm_dialog">
      <v-date-picker
        id="monitoring_sample_Datepicker"
        type="month"
        v-model="pickerYoteiYm"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="weekInputFlag" width="900px">
      <v-card elevation="0" tile>
        <v-card-title class="dialog_title">
          週間項目入力
          <v-btn class="dialog_close pa-0" @click="weekInputFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-card tile class="pa-2">
        <v-row no-gutters>
          <v-col class="weekInputFlag__left">
            <div class="d-flex">
              <label>項目</label>
              <textarea v-model="input_komoku" class="ml-1"></textarea>
            </div>
            <div class="d-flex mt-1">
              <label class="low">曜日</label>
              <div class="ml-1">
                <v-btn-toggle
                  v-model="input_week"
                  dense
                  multiple
                  @change="onInputWeek()"
                >
                  <v-btn
                    v-for="(w, key) in week"
                    :key="key"
                    :value="key"
                    small
                    class="input_week_btn"
                    height="24"
                    >{{ w }}</v-btn
                  >
                </v-btn-toggle>
              </div>
            </div>
            <div class="d-flex mt-1">
              <div class="time">
                <label class="middle">時間</label>
              </div>
              <div>
                <div class="d-flex">
                  <div class="ml-1">
                    <input
                      type="time"
                      v-model="input_time_start"
                      @change="onTimeMinute()"
                    />
                  </div>
                  <span>～</span>
                  <div class="ml-1">
                    <input
                      type="time"
                      v-model="input_time_end"
                      @change="onTimeMinute()"
                    />
                  </div>
                  <v-card
                    class="ml-1 minutebox"
                    elevation="0"
                    outlined
                    shaped
                    tile
                    >{{ time_minute }}分</v-card
                  >
                </div>
                <div class="d-flex ml-1 text-caption">(最小30分)</div>
              </div>
            </div>
            <div class="d-flex mt-1">
              <div class="divLabel">
                <label class="low">色</label>
              </div>
              <div class="ml-1">
                <v-btn
                  small
                  height="24"
                  @click="onColorFlag(1)"
                  :style="`background-color:${input_backColor}`"
                  >背景色</v-btn
                >
              </div>
              <div class="ml-1">
                <v-btn
                  small
                  height="24"
                  @click="onColorFlag(2)"
                  :style="`color:${input_fontColor};`"
                  >文字色</v-btn
                >
              </div>
            </div>
            <v-row class="mt-2" no-gutters>
              <v-btn small @click="onClearSchedule()">画面クリア</v-btn>
              <v-btn
                small
                class="ml-1"
                @click="onDeleteSchedule(`${weekKmkUniqkey}`)"
                :disabled="scheduleDisabledFlag"
                >削除</v-btn
              >
              <v-btn
                small
                class="ml-auto"
                @click="onRegistKmkSchedule(`${weekKmkUniqkey}`)"
                >登録</v-btn
              >
            </v-row>
          </v-col>
          <v-col class="weekInputFlag__right ml-1">
            <label>大分類</label>
            <select v-model="daibunrui" class="ml-1" @change="onBunruiSelect()">
              <option
                :value="value.value"
                v-for="value in daibunruiList"
                :key="value.value"
              >
                {{ value.name }}
              </option>
            </select>

            <wj-flex-grid
              id="bunruiGrid"
              :headersVisibility="'Column'"
              :initialized="onInitializedBunrui"
              :itemsSourceChanged="onInitializedBunruiChange"
              :itemsSource="bunruiView"
              :alternating-row-step="0"
              :formatItem="onFormatItemBunrui"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :selectionMode="'Row'"
              :isReadOnly="true"
              class="mt-1"
            >
              <wj-flex-grid-column
                binding="bigBunruiCode"
                :width="40"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="bigBunrui"
                :width="'*'"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="middleBunruiCode"
                :width="40"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="middleBunrui"
                :width="'*'"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                binding="middleBunruiType1"
                :width="50"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dailyFlag" :width="dailyWidth">
      <v-card elevation="0" tile>
        <v-card-title class="dialog_title">
          <span v-if="dailyType == 'mainLife'">主な日常生活等の入力</span>
          <span v-if="dailyType == 'allLife'">生活の全体像</span>
          <v-btn class="dialog_close pa-0" @click="dailyFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-row no-gutters :class="`pa-1 overflowArea ${dailyType}`">
          <v-col cols="6" v-if="dailyType == 'mainLife'">
            <div class="mt-2 subject">主な日常生活上の活動</div>
            <textarea
              v-model="nichijokatsudo"
              class="textarea"
              :readonly="checkCompleteFlag"
            ></textarea>
          </v-col>
          <v-col cols="6" class="pl-1" v-if="dailyType == 'mainLife'">
            <div class="mt-2 subject">週単位以外のサービス</div>
            <textarea
              v-model="shugaiservice"
              class="textarea"
              :readonly="checkCompleteFlag"
            ></textarea>
          </v-col>
          <v-col cols="12" class="d-flex" v-if="dailyType == 'allLife'">
            <div class="subject width">
              <p>サービス提供によって実現する生活の全体像</p>
            </div>
            <textarea
              v-model="zentaizou"
              class="textarea min"
              :readonly="checkCompleteFlag"
            ></textarea>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-2">
          <v-btn small @click="onClearDaliy()">画面クリア</v-btn>
          <v-btn small class="ml-auto" @click="dailyFlag = false">閉じる</v-btn>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorFlag" width="400px">
      <v-card elevation="0" tile>
        <v-card-title class="dialog_title"> 色選択 </v-card-title>
        <v-row no-gutters>
          <v-col
            v-for="value in palette"
            :key="`${value.CODE}`"
            cols="2"
            :style="`backgroundColor:${value.CODE}`"
            class="palette"
            @click="onPalette(value.CODE)"
          >
            &nbsp;
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="completeDialogFlag"
      width="400px"
      @input="onCompleteClose()"
    >
      <v-card elevation="0" tile class="completeDialog">
        <v-card-title class="dialog_title">
          完了チェック
          <v-btn class="dialog_close pa-0" @click="onCompleteClose()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <div class="pl-1 mt-1 d-flex">
          <label>利用者名</label>
          <v-card elevation="0" class="ml-1 pl-1 read" tile>{{
            userName
          }}</v-card>
        </div>
        <div class="pl-1 mt-1 d-flex">
          <label>作成日</label>
          <v-card elevation="0" class="ml-1 pl-1 read" tile>{{
            createDate
          }}</v-card>
        </div>
        <div class="pa-1 d-flex">
          <v-btn class="ml-auto" small @click="onCompleteRegist()">登録</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// dayjsのインポート
import dayjs from 'dayjs';
// ロケールのインポート
import 'dayjs/locale/ja';
import { getConnect } from '@/connect/getConnect';
import { postConnect } from '@/connect/postConnect';
import { putConnect } from '@/connect/putConnect';
import { deleteConnect } from '@/connect/deleteConnect';
import MessageConst from '@/utiles/MessageConst.js';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';

const KEIKAUREKI_URL = '/Keikakureki'; // 計画履歴データ
const MSTKMK_URL = '/MstWeekKmk'; // 週間計画項目一覧マスタ取得
const SAISHINREKI_URL = '/weekKeikakuSaishinReki'; // 週間計画最新
const SYUKANKMK_URL = '/weekKeikakuKmk'; // 週間項目
const LASTTIMECOPY_URL = '/weekLastTimeCopy'; // 前回コピー
const WEEKKEIKAKU_URL = '/weekKeikaku'; // 週間計画
const KBN = 2;
const MSIID = 1; // 作成者内部ID
const JIGYOID = 62;
const ENTPRIID = 1; // 事業者内部ID
const FOLDER = 'SIENP';
const CALENDARHEIGHT = 540;
const CALENDARSEPALATE = 22;
const PLANHEIGHT = 11;
const PLANWIDTH = 128; // 予定表示部分横幅
const TIMEWIDTH = 100; // 時間軸幅
const STARTTIME = 500; // 開始時間5時
const ERRORMESSAGE = '登録データに誤りがあります。';
export default {
  components: {},
  data() {
    return {
      completeDialogFlag: false,
      scheduleDisabledFlag: false,
      kmkdaicode: 0,
      kmkchucode: 0,
      rekiid: 0,
      cntid: 0,
      palette: sysConst.COLORPALETTE,
      viewSchedule: [],
      time_minute: 0,
      starttime: STARTTIME,
      planwidth: PLANWIDTH,
      timewidth: TIMEWIDTH,
      calendarHeight: CALENDARHEIGHT,
      calendarSepalate: CALENDARSEPALATE,
      bunruiView: [],
      daibunrui: 0,
      bunruiGrid: [],
      daibunruiList: [],
      defaultBunruiView: [],
      weekKmkUniqkey: 0,
      input_backColor: '',
      input_fontColor: '',
      input_komoku: '',
      input_time_start: '',
      input_time_end: '',
      input_week: [],
      week: ['毎日', '月', '火', '水', '木', '金', '土', '日・祝'],
      historyView: [],
      checkCompleteFlag: false,
      weekInputFlag: false,
      complete: '',
      riid: '',
      riyocode: '',
      userName: '',
      createDate: dayjs().format('YYYY年M月DD日'),
      startDate: dayjs().format('YYYY年MM月'),
      datepickerYoteiYm_dialog: false,
      pickerYoteiYm: '',
      weekplanType: 0,
      displayPatternFlag: 0,
      historyFlag: false,
      svgData: {},
      addDialog: false,
      timeLine: [],
      // ヘッダ(曜日表記エリア)の高さ20
      // 項目1時間当たり22
      rects: [],
      dailyFlag: false,
      colorFlag: false,
      selectColorType: 0,
      dailyWidth: 0,
      dailyType: '',
      nichijokatsudo: '',
      shugaiservice: '',
      zentaizou: '',
    };
  },
  props: {
    selectedUserObj: Object,
  },
  created() {
    // タイムラインの配列を作成
    let timeline = []; // 2時間刻み用
    let timelineAll = []; // 1時間刻み用
    let time = 6;
    let y = 50;
    for (let i = 1; i <= 23; i++) {
      let dispTime = '';
      let dispTimeAll = '';
      if (i % 2 == 1) {
        let hour = ('00' + time).slice(-2);
        // 24時の時は0を表示
        if (hour >= 24) {
          hour = '0' + (hour - 24);
        }
        dispTime = hour + ':00';
      }
      dispTimeAll = ('00' + time).slice(-2) + ':00';

      timeline.push({
        id: i,
        time: dispTime,
        y: y,
      });
      timelineAll.push({
        id: i,
        time: dispTimeAll,
        y: y,
      });
      time++;
      y = y + CALENDARSEPALATE;
    }
    this.timeLine = timeline;
  },
  computed: {},
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  beforeDestroy() {},
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('historyGrid') != null) {
        document.getElementById('historyGrid').style.height =
          window.innerHeight - 140 + 'px';
      }
      if (document.getElementById('calendarViewArea') != null) {
        document.getElementById('calendarViewArea').style.height =
          window.innerHeight - 170 + 'px';
      }
    },
    onClearDaliy() {
      // 主な日常生活上の活動をクリア
      if (this.dailyType == 'mainLife') {
        this.nichijokatsudo = '';
        this.shugaiservice = '';
      }
      // 生活の全体像をクリア
      if (this.dailyType == 'allLife') {
        this.zentaizou = '';
      }
    },
    onClearSchedule() {
      this.input_komoku = '';
      this.input_week = [];
      this.input_time_start = '';
      this.input_time_end = '';
      this.time_minute = '-';
      this.input_backColor = '#fff';
      this.input_fontColor = '#fff';
    },
    onDeleteSchedule(id = 0) {
      // 選択状態のデータを取得
      // データ更新時にキーとして利用
      if (id > 0) {
        let tmpUniqKey = this.getTmpKeyViewSchedule(id);
        let body = {};
        let params = {
          kbn: KBN,
          pJigyoid: JIGYOID,
          pIntcode: this.riid,
          pCntid: tmpUniqKey[0].cntid,
          pId: tmpUniqKey[0].rekiid,
        };
        deleteConnect(SYUKANKMK_URL, params, FOLDER, body)
          .then((result) => {
            if (result.okflg) {
              alert('delete okflg=>' + result.okflg);
            } else {
              alert(result.msg);
            }
          })
          .catch(function (e) {
            alert(e);
          });
      }
    },
    /**********************
     * 週間計画を元に選択したスケジュールのidに対応したデータを取得
     */
    getTmpKeyViewSchedule(id) {
      let tmp = {};
      if (id > 0) {
        tmp = this.viewSchedule.filter(function (value) {
          if (value.id == id) {
            return value;
          }
        });
      }
      return tmp;
    },
    onRegistSchedule(id) {
      if (id > 0) {
        let tmpUniqKey = this.getTmpKeyViewSchedule(id);
        let mymd = this.createDate.replace(/(年|月|日)/g, '');
        let sym = this.startDate.replace(/(年|月)/g, '');
        let body = {
          entpriid: ENTPRIID,
          riid: tmpUniqKey[0].riid,
          rekiid: tmpUniqKey[0].rekiid,
          mymd: mymd,
          msiid: MSIID,
          sym: sym,
          nichijokatsudo: this.nichijokatsudo,
          shugaiservice: this.shugaiservice,
          zentaizou: this.zentaizou,
        };
        let params = {
          kbn: KBN,
        };
        putConnect(WEEKKEIKAKU_URL, params, FOLDER, body)
          .then((result) => {
            if (result.okflg) {
              alert('put okflg=>' + result.okflg);
            } else {
              alert(result.msg);
            }
          })
          .catch(function (e) {
            alert(e);
          });
      }
    },
    onRegistKmkSchedule(id = 0) {
      let tmp = [];
      tmp = [...this.viewSchedule];
      let tmpUniqKey = {};
      // 選択状態のデータを取得
      // データ更新時にキーとして利用
      if (id > 0) {
        tmpUniqKey = this.getTmpKeyViewSchedule(id);
      }
      // 適当な日付を指定したいので、今日の日付を指定
      // 12時以降の日付を指定する場合は翌日を指定
      let tmpDay = dayjs().format('YYYY-MM-DD');
      let nextDay = dayjs().add(1, 'd').format('YYYY-MM-DD');
      let st = tmpDay;
      let ed = tmpDay;
      if (this.input_time_start > this.input_time_end) {
        ed = nextDay;
      }
      // 開始日が4時前の場合は翌日を指定
      if (this.input_time_start < '04:00') {
        st = nextDay;
        ed = nextDay;
      }
      let inputWeek = this.input_week;
      let _self = this;
      inputWeek.map(function (value) {
        let max = Math.max.apply(
          null,
          tmp.map(function (o) {
            return o.id;
          })
        );
        tmp.push({
          id: max + 1,
          stime: st + ' ' + _self.input_time_start,
          etime: ed + ' ' + _self.input_time_end,
          yobi: value - 1,
          fcolor: _self.input_fontColor,
          bcolor: _self.input_backColor,
          freetok: _self.input_komoku,
        });
      });

      let errorFlag = this.registDataErrorCheck(tmp);
      if (errorFlag) {
        alert(ERRORMESSAGE);
      } else if (this.input_komoku.length == 0) {
        alert('項目' + MessageConst.INPUT_ERROR.NO_INPUT);
      } else if (this.input_week.length == 0) {
        alert('曜日' + MessageConst.INPUT_ERROR.NO_INPUT);
      } else if (!this.input_time_start) {
        alert('開始時間' + MessageConst.INPUT_ERROR.NO_INPUT);
      } else if (!this.input_time_end) {
        alert('終了時間' + MessageConst.INPUT_ERROR.NO_INPUT);
      } else {
        let body = {
          entpriid: ENTPRIID,
          riid: id > 0 ? tmpUniqKey[0].riid : this.riid,
          rekiid: id > 0 ? tmpUniqKey[0].rekiid : this.rekiid,
          id: id > 0 ? tmpUniqKey[0].id : 0,
          kmkdaicode: this.kmkdaicode,
          kmkchucode: this.kmkchucode,
          freetok: this.input_komoku,
          yobi: this.input_week,
          stime: this.input_time_start,
          etime: this.input_time_end,
          bcolorcode: this.input_backColor,
          fcolorcode: this.input_fontColor,
        };
        let params2 = {
          kbn: KBN,
        };
        if (id > 0) {
          // データの更新
          putConnect(SYUKANKMK_URL, params2, FOLDER, body)
            .then((result) => {
              if (result.okflg) {
                alert('put okflg=>' + result.okflg);
                // データの再表示
                _self.getWeekSaihinPlanData();
              } else {
                alert(result.msg);
              }
            })
            .catch(function (e) {
              alert(e);
            });
        } else {
          // データの登録
          postConnect(SYUKANKMK_URL, params2, FOLDER, body)
            .then((result) => {
              if (result.okflg) {
                alert('post okflg=>' + result.okflg);
                // データの再表示
                _self.getWeekSaihinPlanData();
              }
            })
            .catch(function (e) {
              alert(e);
            });
        }
        this.weekInputFlag = false;
      }
    },
    settingSchedule(data) {
      // 日付の重複チェック
      // 2件以上重複データがある時はエラーを表示
      let errorFlag = this.registDataErrorCheck(data);
      let tmp = [];
      if (errorFlag) {
        alert(ERRORMESSAGE);
      } else {
        // 重複している場合はflagを立てる
        // 0:初期値 1:左半分 2:右半分
        // 初回はすべて0にしておく
        for (let i = 0; i < data.length; i++) {
          data[i].halfType = 0;
        }

        for (let i = 0; i < data.length; i++) {
          let halfType = 0;
          for (let j = 0; j < data.length; j++) {
            if (
              data[i].id != data[j].id &&
              data[i].yobi == data[j].yobi &&
              ((data[i].etime >= data[j].stime &&
                data[i].stime <= data[j].etime) ||
                (data[i].stime <= data[j].stime &&
                  data[i].etime >= data[j].stime))
            ) {
              if (data[j].halfType == 1) {
                halfType = 2;
              } else {
                halfType = 1;
              }
            }
          }
          data[i].halfType = halfType;

          // 時間軸におけるyとyTextの位置
          // 初期値をendTimeの日付の5:00からとする
          // 基準日
          let first = dayjs().format('YYYY-MM-DD 05:00');
          let st = dayjs(data[i].stime).unix();
          let ed = dayjs(data[i].etime).unix();
          let fst = dayjs(first).unix();
          let startPos = st - fst;
          let endPos = ed - st;
          let sec = 30 * 60;
          let div = startPos / sec;
          let divEnd = endPos / sec;
          // 高さの指定
          data[i].height = PLANHEIGHT * divEnd;
          // 曜日におけるxとxTextの位置
          data[i].x = TIMEWIDTH + PLANWIDTH * data[i].yobi;
          data[i].xText = TIMEWIDTH + PLANWIDTH * data[i].yobi;
          // 右半分表示
          if (halfType == 2) {
            data[i].x = TIMEWIDTH + PLANWIDTH * data[i].yobi + PLANWIDTH / 2;
            data[i].xText =
              TIMEWIDTH + PLANWIDTH * data[i].yobi + PLANWIDTH / 2;
          }

          // 横幅の指定
          data[i].width = PLANWIDTH;
          if (halfType) {
            data[i].width = PLANWIDTH / 2;
          }

          data[i].y = CALENDARSEPALATE + PLANHEIGHT * div;
          data[i].yText = CALENDARSEPALATE + PLANHEIGHT * div - 2;

          tmp.push(data[i]);
        }
        this.viewSchedule = tmp.slice();
      }
      return tmp;
    },
    // 登録データのエラーチェック
    registDataErrorCheck(data) {
      let errorCnt = 0;
      let errorFlag = false;
      for (let i = 0; i < data.length; i++) {
        errorCnt = 0;
        for (let j = 0; j < data.length; j++) {
          if (
            data[i].id > data[j].id &&
            data[i].yobi == data[j].yobi &&
            ((data[i].etime >= data[j].stime &&
              data[i].stime <= data[j].etime) ||
              (data[i].stime <= data[j].stime &&
                data[i].etime >= data[j].stime))
          ) {
            errorCnt++;
          }
          // エラーカウントが2以上の文字があればエラーを表示
          if (errorCnt >= 2) {
            errorFlag = true;
            break;
          }
        }
      }
      return errorFlag;
    },
    // ダイアログ時間設定
    onTimeMinute() {
      this.time_minute = '-';
      // 今日を基準に日付の差分時間(分)の取得を行う
      let today = dayjs().format('YYYY-MM-DD');
      let tomorrow = dayjs().add(1, 'd').format('YYYY-MM-DD');
      let minute = 0;
      if (this.input_time_end && this.input_time_start) {
        let end = '';
        // 四時より前の時間なら翌日を指定
        if (Number(this.input_time_end.replace(/:/, '')) < 400) {
          end = tomorrow + ' ' + this.input_time_end;
        } else {
          end = today + ' ' + this.input_time_end;
        }

        let ed = dayjs(end).unix();
        let start = today + ' ' + this.input_time_start;
        let st = dayjs(start).unix();
        minute = ed - st;
        // 表示が4時までの為4時以降の時間は処理を行わない
        let four = dayjs(dayjs().format('YYYY-MM-DD 04:00')).unix();
        // input_time_startの方が大きいときは翌日として日付を指定する
        if (st > ed) {
          today = dayjs().add(1, 'd').format('YYYY-MM-DD');
          if (ed < four) {
            start = today + ' ' + this.input_time_start;
            st = dayjs(start).unix();
            minute = st - ed;
            this.time_minute = minute / 60;
          } else {
            this.time_minute = '-';
          }
        } else {
          // 終了時が4時以降
          if (four < ed && ed < st) {
            this.time_minute = '-';
          } else {
            this.time_minute = minute / 60;
          }
        }
      }
    },
    /************************
     *  ダイアログ曜日選択
     */
    onInputWeek() {
      let found = this.input_week.find((element) => element == 0);
      if (found == 0) {
        this.input_week = [];
        let tmp = [];
        this.week.map(function (value, k) {
          if (k != 0) {
            tmp.push(k);
          }
        });
        this.input_week = tmp;
      }
    },
    /**********************************
     * 週間項目入力
     */
    weekInput(k = 0) {
      // 選択データの取得
      // 週間項目登録/編集のユニークキーを保持 登録時は0を持つ
      this.weekKmkUniqkey = k;
      if (k > 0) {
        this.scheduleDisabledFlag = false;
        let tmp = '';
        tmp = this.viewSchedule.find(function (value) {
          if (value.id == k) {
            return value;
          }
        });
        this.input_komoku = tmp.freetok;
        this.input_week = [tmp.yobi + 1];
        this.input_time_start = dayjs(tmp.stime).format('HH:mm');
        this.input_time_end = dayjs(tmp.etime).format('HH:mm');
        this.input_backColor = tmp.bcolorcode;
        this.input_fontColor = tmp.fcolorcode;
        this.kmkchucode = tmp.kmkchucode;
        this.kmkdaicode = tmp.kmkdaicode;
      } else {
        this.scheduleDisabledFlag = true;
        this.input_komoku = '';
        this.input_week = [];
        this.input_time_start = '';
        this.input_time_end = '';
        this.input_backColor = '#FFFFFF';
        this.input_fontColor = '#000';
      }

      this.onTimeMinute();
      this.weekInputFlag = true;
    },
    // ダイアログカレンダー表示
    inputCalendarClick() {
      this.datepickerYoteiYm_dialog = true;
    },
    // ダイアログカレンダーの月を選択
    monthSelect() {
      this.startDate = dayjs(this.pickerYoteiYm).format('YYYY年M月');
      this.datepickerYoteiYm_dialog = false;
    },
    /**************************
     * ダイアログの表示
     * type 1:主な日常生活 2:全体の生活像
     */
    dialogDaily(type) {
      this.dailyFlag = true;
      if (type == 1) {
        this.dailyWidth = 600; // ダイアログのサイズ
        this.dailyType = 'mainLife';
      }
      if (type == 2) {
        this.dailyWidth = 1100; // ダイアログのサイズ
        this.dailyType = 'allLife';
      }
    },

    /***************************
     * 履歴参照
     */
    onInitializedHistory(historyGrid) {
      let _self = this;
      historyGrid.hostElement.addEventListener('click', function (e) {
        var ht = historyGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          let result = _self.historyView[ht.row];
          _self.riid = result.rekiid;
          // 週間予定データを取得
          _self.getWeekPlanData();
        }
      });
    },
    onFormatItemHistory(historyGrid, e) {
      if (e.panel == historyGrid.columnHeaders) {
        if (e.col == 0) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
        if (e.col == 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      }
    },
    /*****************************
     * 分類grid
     */
    onInitializedBunruiChange(bunruiGrid) {
      if (this.kmkchucode && this.kmkdaicode) {
        bunruiGrid.select(this.kmkchucode - 1, 0);
      } else {
        bunruiGrid.select(-1, -1);
      }
    },
    onInitializedBunrui(bunruiGrid) {
      let params = {
        pJigyoid: JIGYOID,
      };
      let _self = this;
      bunruiGrid.hostElement.addEventListener('click', function (e) {
        var ht = bunruiGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          _self.input_komoku = _self.bunruiView[ht.row].middleBunrui;
          _self.kmkdaicode = _self.bunruiView[ht.row].bigBunruiCode;
          _self.kmkchucode = _self.bunruiView[ht.row].middleBunruiCode;
        }
      });

      getConnect(MSTKMK_URL, params, FOLDER).then((result) => {
        let bunruiView = [];
        let daibunruiList = [];
        daibunruiList.push({
          value: 0,
          name: '指定なし',
        });
        result.map(function (value) {
          value.tyu.map(function (val) {
            bunruiView.push({
              bigBunruiCode: value.intcode,
              bigBunrui: value.kmkname,
              middleBunruiCode: val.intcode,
              middleBunrui: val.kmkname,
              middleBunruiType1: val.ryaku,
            });
          });
          daibunruiList.push({
            value: value.intcode,
            name: value.kmkname,
          });
        });

        _self.bunruiView = bunruiView;
        _self.defaultBunruiView = [...bunruiView];
        _self.daibunruiList = daibunruiList;
        _self.bunruiGrid = bunruiGrid;
        _self._self.createHeaderBunrui(bunruiGrid);
      });
    },
    onBunruiSelect() {
      let view = [];
      let _self = this;
      _self.defaultBunruiView.filter(function (value) {
        if (value.bigBunruiCode == _self.daibunrui || _self.daibunrui == 0) {
          view.push(value);
        }
      });
      this.bunruiView = view;
      _self._self.createHeaderBunrui(this.bunruiGrid);
    },
    createHeaderBunrui(bunruiGrid) {
      var panel = bunruiGrid.columnHeaders;
      panel.setCellData(0, 0, '大分類');
      panel.setCellData(0, 2, '中分類');

      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      headerRanges.push(new wjGrid.CellRange(0, 2, 0, 4));

      // 大分類のマージ処理
      let key = 'bigBunruiCode';
      const tmp = this.bunruiView.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});

      let bodyRanges = [];
      let no = 0;
      let row = 0;
      Object.keys(tmp).map(function (value) {
        row = tmp[value].length - 1 + no;
        bodyRanges.push(new wjGrid.CellRange(no, 0, row, 0));
        bodyRanges.push(new wjGrid.CellRange(no, 1, row, 1));
        no = no + tmp[value].length;
      });
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
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }
      };
      bunruiGrid.mergeManager = mm;
    },
    onFormatItemBunrui(bunruiGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.row == 0) {
          e.cell.style.textAlign = 'center';
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        e.cell.style.color = sysConst.COLOR.black;
        if (e.col >= 2) {
          wijmo.addClass(e.cell, 'selectOrenge');
        }
      }
    },
    /****************************
     * 週間予定データを取得
     */
    getWeekPlanData() {
      let params = {
        pJigyoid: JIGYOID,
        pIntcode: this.riid,
        pCntid: this.rekiid,
      };

      let _self = this;
      getConnect(WEEKKEIKAKU_URL + '/' + KBN, params, FOLDER)
        .then((result) => {
          this.rekiid = result.rekiid;
          this.nichijokatsudo = result.nichijokatsudo;
          this.shugaiservice = result.shugaiservice;
          this.zentaizou = result.zentaizou;
          _self.createDate = dayjs(
            _self.insertStr(_self.insertStr(result.mymd, 4, '-'), 7, '-')
          ).format('YYYY年MM月DD日');

          // 週間項目取得
          _self.getWeekNikData(result.nik);
          // _self.cntid = result.cntid;
          // _self.getWeekKmkData(result.cntid);
        })
        .catch(function (e) {
          alert(e);
        });
    },
    /****************************
     * 週間予定最新データを取得
     */
    getWeekSaihinPlanData() {
      if (this.riid > 0) {
        let params = {
          pJigyoid: JIGYOID,
          pIntcode: this.riid,
          pYmd: '',
        };
        let _self = this;
        getConnect(SAISHINREKI_URL + '/' + KBN, params, FOLDER)
          .then((result) => {
            this.rekiid = result.rekiid;
            this.nichijokatsudo = result.nichijokatsudo;
            this.shugaiservice = result.shugaiservice;
            this.zentaizou = result.zentaizou;
            _self.createDate = dayjs(
              _self.insertStr(_self.insertStr(result.mymd, 4, '-'), 7, '-')
            ).format('YYYY年MM月DD日');

            // 週間項目取得
            _self.getWeekNikData(result.nik);
            // _self.cntid = result.cntid;
            // _self.getWeekKmkData(result.cntid);
          })
          .catch(function (e) {
            alert(e);
          });
      }
    },

    // 指定文字列を指定位置に挿入
    insertStr(str, index, insert) {
      return str.slice(0, index) + insert + str.slice(index, str.length);
    },

    /***********************
     * 週間項目データの取得
     * cntid作成内部IDをキーにして項目データを取得
     */
    getWeekNikData(result) {
      let data = [];
      result.map(function (value) {
        // 適当な日付を指定したいので、今日の日付を指定
        // 12時以降の日付を指定する場合は翌日を指定
        let nextDay = dayjs().add(1, 'd').format('YYYY-MM-DD');
        let etimeInt = Number(value.etime.replace(/:/, ''));
        let tmpDay = dayjs().format('YYYY-MM-DD');
        // 5時より前なら翌日を指定
        if (etimeInt < 500) {
          tmpDay = nextDay.slice();
        }
        data.push({
          cntid: value.intcode,
          stime: tmpDay + ' ' + value.stime,
          etime: tmpDay + ' ' + value.etime,
          yobi: value.yobi,
          bcolorcode: value.bcolorcode,
          fcolorcode: value.fcolorcode,
          freetok: value.freetok,
          entpriid: value.entpriid,
          rekiid: value.rekiid,
          id: value.id,
          riid: value.riid,
          kmkchucode: value.kmkchucode,
          kmkdaicode: value.kmkdaicode,
        });
      });
      this.settingSchedule(data);
    },
    /***********************
     * 週間項目データの取得
     * cntid作成内部IDをキーにして項目データを取得
     */
    // 下記不要になる予定(getWeekNikDataに書き換え)
    getWeekKmkData(cntid) {
      let params = {
        cntid: cntid,
      };
      let _self = this;
      getConnect(SYUKANKMK_URL + '/' + KBN, params, FOLDER)
        .then((result) => {
          let data = [];
          result.map(function (value, key) {
            // 適当な日付を指定したいので、今日の日付を指定
            // 12時以降の日付を指定する場合は翌日を指定
            let nextDay = dayjs().add(1, 'd').format('YYYY-MM-DD');
            let etimeInt = Number(value.etime.replace(/:/, ''));
            let tmpDay = dayjs().format('YYYY-MM-DD');
            // 5時より前なら翌日を指定
            if (etimeInt < 500) {
              tmpDay = nextDay.slice();
            }
            data.push({
              id: key + 1,
              stime: tmpDay + ' ' + value.stime,
              etime: tmpDay + ' ' + value.etime,
              yobi: value.yobi,
              bcolorcode: value.bcolorcode,
              fcolorcode: value.fcolorcode,
              freetok: value.freetok,
              entpriid: value.entpriid,
              rekiid: value.rekiid,
              riid: value.riid,
              kmkchucode: value.kmkchucode,
              kmkdaicode: value.kmkdaicode,
            });
          });
          _self.settingSchedule(data);
        })
        .catch(function (e) {
          alert(e);
        });
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserdata(obj) {
      this.userName = obj.names;
      this.riyocode = obj.riyocode;
      this.riid = obj.riid;
      // 選択したユーザー一覧から週間予定データを取得
      this.getWeekSaihinPlanData();
      // 選択したユーザー一覧から履歴を取得
      let params = {
        pJigyoid: JIGYOID,
        pIntcode: this.riid,
      };
      let _self = this;
      getConnect(KEIKAUREKI_URL + '/' + KBN, params, FOLDER).then((result) => {
        // 取得データをbinding名に指定
        let temp = result.filter(function (value) {
          //value.planDate = value.mymd;
          value.planDate = dayjs(
            _self.insertStr(_self.insertStr(value.mymd, 4, '-'), 7, '-')
          ).format('YYYY年MM月DD日');
          value.planFinFlag = value.kanryo ? true : false;
          return value;
        });
        _self.historyView = temp;
      });
    },
    /****************************
     * 色コードダイアログ
     */
    onColorFlag(type) {
      this.colorFlag = true;
      this.selectColorType = type;
    },
    onPalette(colorCode) {
      // 背景色の指定
      if (this.selectColorType == 1) {
        this.input_backColor = colorCode;
      }
      // 文字色の指定
      if (this.selectColorType == 2) {
        this.input_fontColor = colorCode;
      }
      this.colorFlag = false;
    },
    /*************************
     * 前回コピー
     */
    onLastTimeCopy(id) {
      let tmpUniqKey = [];
      if (this.viewSchedule.length == 0) {
        alert(MessageConst.WARN.ROW_EDIT_NO_SELECT);
        return false;
      }
      if (id > 0) {
        tmpUniqKey = this.getTmpKeyViewSchedule(id);
        let body = {};
        let params2 = {
          kbn: KBN,
          pJigyoid: JIGYOID,
          pIntcode: this.riid,
          pCntid: tmpUniqKey[0].rekiid,
        };
        postConnect(LASTTIMECOPY_URL, params2, FOLDER, body)
          .then((result) => {
            if (result.okflg) {
              alert('copy flg=>' + result.okflg);
            } else {
              alert(result.msg);
            }
          })
          .catch(function (e) {
            alert(e);
          });
      }
    },
    onComplete() {
      this.completeDialogFlag = true;
    },
    onCompleteClose() {
      this.completeDialogFlag = false;
      this.checkCompleteFlag = false;
    },
    onCompleteRegist() {
      this.completeDialogFlag = false;
      this.checkCompleteFlag = true;
      this.complete = this.createDate;
    },
    onWeekKeikakuDelete(id) {
      if (id > 0) {
        let tmpUniqKey = this.getTmpKeyViewSchedule(id);
        let body = {};
        let params = {
          kbn: KBN,
          pJigyoid: JIGYOID,
          pIntcode: this.riid,
          pCntid: tmpUniqKey[0].rekiid,
        };

        deleteConnect(WEEKKEIKAKU_URL, params, FOLDER, body)
          .then((result) => {
            if (result.okflg) {
              alert('delete okflg=>' + result.okflg);
            } else {
              alert(result.msg);
            }
          })
          .catch(function (e) {
            alert(e);
          });
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    printExec() {
      let doc = new wijmo.PrintDocument({
        title: 'PrintDocumentテスト',
      });
      let view = '';
      this.viewSchedule.forEach(function () {
        view +=
          '<rect x=100 y=100 width="466" height="492" transform="translate(45 156)" fill="red"/>';
      });

      let tbl = this._renderSVG(view);
      doc.append(tbl);
      console.log(this.viewSchedule);

      // doc.append(view);
      doc.print();
    },
    _renderSVG(view) {
      let svg = '';

      svg +=
        '<svg width="1123" height="794" viewBox="0 0 1123 794" fill="none" xmlns="http://www.w3.org/2000/svg">';
      svg +=
        '<g id="&#230;&#167;&#152;&#229;&#188;&#143;3-2_&#233;&#128;&#177;&#233;&#150;&#147;&#232;&#168;&#136;&#231;&#148;&#187;&#232;&#161;&#168;">';
      svg += '<rect width="1123" height="794" fill="white"/>';
      svg += '<g id="label_name">';
      svg += '<g id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;">';
      svg +=
        '<text fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="14" letter-spacing="0em"><tspan x="438.8" y="59.8408">&#x7d99;&#x7d9a;&#x30b5;&#x30fc;&#x30d3;&#x30b9;&#x7b49;&#x5229;&#x7528;&#x8a08;</tspan><tspan x="587.2" y="59.8408">&#x3010;&#x9031;&#x9593;&#x8a08;&#x753b;&#x8868;&#x3011;</tspan></text>';
      svg +=
        '<text fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="14" letter-spacing="-0.4em"><tspan x="578.8" y="59.8408">&#x753b;</tspan></text>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 3">';
      svg += '<g id="label_stroke_name">';
      svg += '<rect x="45.5" y="74.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<g id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;">';
      svg +=
        '<text fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="49" y="85.2905">&#x5229;&#x7528;&#x8005;&#x6c0f;</tspan><tspan x="89.68" y="85.2905">&#xff08;&#x5150;&#x7ae5;&#x6c0f;&#x540d;&#xff09;</tspan></text>';
      svg +=
        '<text fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="-0.48em"><tspan x="85" y="85.2905">&#x540d;</tspan></text>';
      svg += '</g>';
      svg +=
        '<rect x="45.5" y="74.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid">';
      svg +=
        '<rect x="176.5" y="74.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_2">';
      svg +=
        '<rect x="389.5" y="74.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_2" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="393" y="85.2905">&#x969c;&#x5bb3;&#x7a0b;&#x5ea6;&#x533a;&#x5206;</tspan></text>';
      svg +=
        '<rect x="389.5" y="74.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_2">';
      svg +=
        '<rect x="520.5" y="74.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_3">';
      svg +=
        '<rect x="733.5" y="74.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_3" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="737" y="85.2905">&#x76f8;&#x8ac7;&#x652f;&#x63f4;&#x4e8b;&#x696d;&#x8005;&#x540d;</tspan></text>';
      svg +=
        '<rect x="733.5" y="74.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_3">';
      svg +=
        '<rect x="864.5" y="74.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 4">';
      svg += '<g id="label_stroke_name_4">';
      svg += '<rect x="45.5" y="90.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_4" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="49" y="101.291">&#x969c;&#x5bb3;&#x798f;&#x7949;&#x30b5;&#x30fc;&#x30d3;&#x30b9;&#x53d7;&#x7d66;&#x8005;&#x756a;&#x53f7;</tspan></text>';
      svg +=
        '<rect x="45.5" y="90.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_4">';
      svg +=
        '<rect x="176.5" y="90.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_5">';
      svg +=
        '<rect x="389.5" y="90.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_5" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="393" y="101.291">&#x5229;&#x7528;&#x8005;&#x8ca0;&#x62c5;&#x4e0a;&#x9650;&#x984d;</tspan></text>';
      svg +=
        '<rect x="389.5" y="90.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_5">';
      svg +=
        '<rect x="520.5" y="90.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_6">';
      svg +=
        '<rect x="733.5" y="90.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_6" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="737" y="101.291">&#x8a08;&#x753b;&#x4f5c;&#x6210;&#x62c5;&#x5f53;&#x8005;</tspan></text>';
      svg +=
        '<rect x="733.5" y="90.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_6">';
      svg +=
        '<rect x="864.5" y="90.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 5">';
      svg += '<g id="label_stroke_name_7">';
      svg +=
        '<rect x="45.5" y="106.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_7" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="49" y="117.291">&#x5730;&#x57df;&#x76f8;&#x8ac7;&#x652f;&#x63f4;&#x53d7;&#x7d66;&#x8005;&#x8a3c;&#x756a;&#x53f7;</tspan></text>';
      svg +=
        '<rect x="45.5" y="106.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_7">';
      svg +=
        '<rect x="176.5" y="106.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_8">';
      svg +=
        '<rect x="389.5" y="106.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_8" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="393" y="117.291">&#x901a;&#x6240;&#x53d7;&#x7d66;&#x8005;&#x8a3c;&#x756a;&#x53f7;</tspan></text>';
      svg +=
        '<rect x="389.5" y="106.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_8">';
      svg +=
        '<rect x="520.5" y="106.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 6">';
      svg += '<g id="label_stroke_name_9">';
      svg +=
        '<rect x="45.5" y="131.5" width="131" height="16" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_9" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="49" y="142.291">&#x8a08;&#x753b;&#x958b;&#x59cb;&#x5e74;&#x6708;</tspan></text>';
      svg +=
        '<rect x="45.5" y="131.5" width="131" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_9">';
      svg +=
        '<rect x="176.5" y="131.5" width="213" height="16" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 14">';

      svg += '<g id="Frame 16">';

      svg += view;

      svg +=
        '<rect width="66" height="492" transform="translate(45 156)" fill="#E3F2FD"/>';
      svg += '<g id="Frame_solid_10">';
      svg +=
        '<rect x="45.5" y="156.5" width="65" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame 15">';
      svg += '<g id="label_name_2">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_2" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="88.3633" y="200.791">6:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_3">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_3" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="88.3633" y="240.791">8:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_4">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_4" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="280.791">10:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_5">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_5" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="320.791">12:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_6">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_6" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="360.791">14:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_7">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_7" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="400.791">16:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_8">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_8" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="440.791">18:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_9">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_9" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="480.791">20:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_10">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_10" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="82.7734" y="520.791">22:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_11">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_11" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="88.3633" y="560.791">0:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_12">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_12" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="88.3633" y="600.791">2:00</tspan></text>';
      svg += '</g>';
      svg += '<g id="label_name_13">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;_13" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="88.3633" y="640.791">4:00</tspan></text>';
      svg += '</g>';
      svg +=
        '<rect x="45.5" y="167.5" width="65" height="480" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 7">';
      svg += '<g id="label_stroke_name_10">';
      svg +=
        '<rect x="110.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_10" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="161.5" y="164.791">&#x6708;</tspan></text>';
      svg +=
        '<rect x="110.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot">';
      svg +=
        '<rect x="110.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_2">';
      svg +=
        '<rect x="110.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_3">';
      svg +=
        '<rect x="110.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_4">';
      svg +=
        '<rect x="110.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_5">';
      svg +=
        '<rect x="110.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_6">';
      svg +=
        '<rect x="110.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_7">';
      svg +=
        '<rect x="110.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_8">';
      svg +=
        '<rect x="110.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_9">';
      svg +=
        '<rect x="110.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_10">';
      svg +=
        '<rect x="110.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_11">';
      svg +=
        '<rect x="110.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_12">';
      svg +=
        '<rect x="110.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_13">';
      svg +=
        '<rect x="110.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_14">';
      svg +=
        '<rect x="110.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_15">';
      svg +=
        '<rect x="110.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_16">';
      svg +=
        '<rect x="110.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_17">';
      svg +=
        '<rect x="110.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_18">';
      svg +=
        '<rect x="110.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_19">';
      svg +=
        '<rect x="110.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_20">';
      svg +=
        '<rect x="110.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_21">';
      svg +=
        '<rect x="110.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_22">';
      svg +=
        '<rect x="110.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_23">';
      svg +=
        '<rect x="110.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_24">';
      svg +=
        '<rect x="110.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_25">';
      svg +=
        '<rect x="110.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_11">';
      svg +=
        '<rect x="110.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 8">';
      svg += '<g id="label_stroke_name_11">';
      svg +=
        '<rect x="221.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_11" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="272.5" y="164.791">&#x706b;</tspan></text>';
      svg +=
        '<rect x="221.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_26">';
      svg +=
        '<rect x="221.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_27">';
      svg +=
        '<rect x="221.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_28">';
      svg +=
        '<rect x="221.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_29">';
      svg +=
        '<rect x="221.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_30">';
      svg +=
        '<rect x="221.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_31">';
      svg +=
        '<rect x="221.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_32">';
      svg +=
        '<rect x="221.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_33">';
      svg +=
        '<rect x="221.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_34">';
      svg +=
        '<rect x="221.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_35">';
      svg +=
        '<rect x="221.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_36">';
      svg +=
        '<rect x="221.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_37">';
      svg +=
        '<rect x="221.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_38">';
      svg +=
        '<rect x="221.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_39">';
      svg +=
        '<rect x="221.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_40">';
      svg +=
        '<rect x="221.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_41">';
      svg +=
        '<rect x="221.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_42">';
      svg +=
        '<rect x="221.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_43">';
      svg +=
        '<rect x="221.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_44">';
      svg +=
        '<rect x="221.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_45">';
      svg +=
        '<rect x="221.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_46">';
      svg +=
        '<rect x="221.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_47">';
      svg +=
        '<rect x="221.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_48">';
      svg +=
        '<rect x="221.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_49">';
      svg +=
        '<rect x="221.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_50">';
      svg +=
        '<rect x="221.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_12">';
      svg +=
        '<rect x="221.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 9">';
      svg += '<g id="label_stroke_name_12">';
      svg +=
        '<rect x="332.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_12" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="383.5" y="164.791">&#x6c34;</tspan></text>';
      svg +=
        '<rect x="332.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_51">';
      svg +=
        '<rect x="332.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_52">';
      svg +=
        '<rect x="332.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_53">';
      svg +=
        '<rect x="332.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_54">';
      svg +=
        '<rect x="332.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_55">';
      svg +=
        '<rect x="332.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_56">';
      svg +=
        '<rect x="332.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_57">';
      svg +=
        '<rect x="332.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_58">';
      svg +=
        '<rect x="332.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_59">';
      svg +=
        '<rect x="332.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_60">';
      svg +=
        '<rect x="332.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_61">';
      svg +=
        '<rect x="332.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_62">';
      svg +=
        '<rect x="332.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_63">';
      svg +=
        '<rect x="332.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_64">';
      svg +=
        '<rect x="332.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_65">';
      svg +=
        '<rect x="332.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_66">';
      svg +=
        '<rect x="332.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_67">';
      svg +=
        '<rect x="332.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_68">';
      svg +=
        '<rect x="332.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_69">';
      svg +=
        '<rect x="332.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_70">';
      svg +=
        '<rect x="332.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_71">';
      svg +=
        '<rect x="332.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_72">';
      svg +=
        '<rect x="332.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_73">';
      svg +=
        '<rect x="332.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_74">';
      svg +=
        '<rect x="332.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_75">';
      svg +=
        '<rect x="332.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_13">';
      svg +=
        '<rect x="332.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 10">';
      svg += '<g id="label_stroke_name_13">';
      svg +=
        '<rect x="443.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_13" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="494.5" y="164.791">&#x6728;</tspan></text>';
      svg +=
        '<rect x="443.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_76">';
      svg +=
        '<rect x="443.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_77">';
      svg +=
        '<rect x="443.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_78">';
      svg +=
        '<rect x="443.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_79">';
      svg +=
        '<rect x="443.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_80">';
      svg +=
        '<rect x="443.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_81">';
      svg +=
        '<rect x="443.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_82">';
      svg +=
        '<rect x="443.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_83">';
      svg +=
        '<rect x="443.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_84">';
      svg +=
        '<rect x="443.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_85">';
      svg +=
        '<rect x="443.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_86">';
      svg +=
        '<rect x="443.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_87">';
      svg +=
        '<rect x="443.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_88">';
      svg +=
        '<rect x="443.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_89">';
      svg +=
        '<rect x="443.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_90">';
      svg +=
        '<rect x="443.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_91">';
      svg +=
        '<rect x="443.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_92">';
      svg +=
        '<rect x="443.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_93">';
      svg +=
        '<rect x="443.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_94">';
      svg +=
        '<rect x="443.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_95">';
      svg +=
        '<rect x="443.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_96">';
      svg +=
        '<rect x="443.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_97">';
      svg +=
        '<rect x="443.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_98">';
      svg +=
        '<rect x="443.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_99">';
      svg +=
        '<rect x="443.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_100">';
      svg +=
        '<rect x="443.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_14">';
      svg +=
        '<rect x="443.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 11">';
      svg += '<g id="label_stroke_name_14">';
      svg +=
        '<rect x="554.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_14" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="605.5" y="164.791">&#x91d1;</tspan></text>';
      svg +=
        '<rect x="554.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_101">';
      svg +=
        '<rect x="554.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_102">';
      svg +=
        '<rect x="554.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_103">';
      svg +=
        '<rect x="554.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_104">';
      svg +=
        '<rect x="554.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_105">';
      svg +=
        '<rect x="554.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_106">';
      svg +=
        '<rect x="554.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_107">';
      svg +=
        '<rect x="554.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_108">';
      svg +=
        '<rect x="554.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_109">';
      svg +=
        '<rect x="554.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_110">';
      svg +=
        '<rect x="554.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_111">';
      svg +=
        '<rect x="554.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_112">';
      svg +=
        '<rect x="554.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_113">';
      svg +=
        '<rect x="554.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_114">';
      svg +=
        '<rect x="554.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_115">';
      svg +=
        '<rect x="554.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_116">';
      svg +=
        '<rect x="554.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_117">';
      svg +=
        '<rect x="554.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_118">';
      svg +=
        '<rect x="554.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_119">';
      svg +=
        '<rect x="554.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_120">';
      svg +=
        '<rect x="554.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_121">';
      svg +=
        '<rect x="554.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_122">';
      svg +=
        '<rect x="554.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_123">';
      svg +=
        '<rect x="554.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_124">';
      svg +=
        '<rect x="554.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_125">';
      svg +=
        '<rect x="554.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_15">';
      svg +=
        '<rect x="554.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 12">';
      svg += '<g id="label_stroke_name_15">';
      svg +=
        '<rect x="665.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_15" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="716.5" y="164.791">&#x571f;</tspan></text>';
      svg +=
        '<rect x="665.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_126">';
      svg +=
        '<rect x="665.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_127">';
      svg +=
        '<rect x="665.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_128">';
      svg +=
        '<rect x="665.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_129">';
      svg +=
        '<rect x="665.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_130">';
      svg +=
        '<rect x="665.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_131">';
      svg +=
        '<rect x="665.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_132">';
      svg +=
        '<rect x="665.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_133">';
      svg +=
        '<rect x="665.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_134">';
      svg +=
        '<rect x="665.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_135">';
      svg +=
        '<rect x="665.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_136">';
      svg +=
        '<rect x="665.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_137">';
      svg +=
        '<rect x="665.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_138">';
      svg +=
        '<rect x="665.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_139">';
      svg +=
        '<rect x="665.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_140">';
      svg +=
        '<rect x="665.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_141">';
      svg +=
        '<rect x="665.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_142">';
      svg +=
        '<rect x="665.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_143">';
      svg +=
        '<rect x="665.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_144">';
      svg +=
        '<rect x="665.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_145">';
      svg +=
        '<rect x="665.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_146">';
      svg +=
        '<rect x="665.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_147">';
      svg +=
        '<rect x="665.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_148">';
      svg +=
        '<rect x="665.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_149">';
      svg +=
        '<rect x="665.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_150">';
      svg +=
        '<rect x="665.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_16">';
      svg +=
        '<rect x="665.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 13">';
      svg += '<g id="label_stroke_name_16">';
      svg +=
        '<rect x="776.5" y="156.5" width="111" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_16" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="818.5" y="164.791">&#x65e5;&#x30fb;&#x795d;</tspan></text>';
      svg +=
        '<rect x="776.5" y="156.5" width="111" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_151">';
      svg +=
        '<rect x="776.5" y="167.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_152">';
      svg +=
        '<rect x="776.5" y="177.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_153">';
      svg +=
        '<rect x="776.5" y="197.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_154">';
      svg +=
        '<rect x="776.5" y="217.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_155">';
      svg +=
        '<rect x="776.5" y="237.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_156">';
      svg +=
        '<rect x="776.5" y="257.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_157">';
      svg +=
        '<rect x="776.5" y="277.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_158">';
      svg +=
        '<rect x="776.5" y="297.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_159">';
      svg +=
        '<rect x="776.5" y="317.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_160">';
      svg +=
        '<rect x="776.5" y="337.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_161">';
      svg +=
        '<rect x="776.5" y="357.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_162">';
      svg +=
        '<rect x="776.5" y="377.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_163">';
      svg +=
        '<rect x="776.5" y="397.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_164">';
      svg +=
        '<rect x="776.5" y="417.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_165">';
      svg +=
        '<rect x="776.5" y="437.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_166">';
      svg +=
        '<rect x="776.5" y="457.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_167">';
      svg +=
        '<rect x="776.5" y="477.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_168">';
      svg +=
        '<rect x="776.5" y="497.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_169">';
      svg +=
        '<rect x="776.5" y="517.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_170">';
      svg +=
        '<rect x="776.5" y="537.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_171">';
      svg +=
        '<rect x="776.5" y="557.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_172">';
      svg +=
        '<rect x="776.5" y="577.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_173">';
      svg +=
        '<rect x="776.5" y="597.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_174">';
      svg +=
        '<rect x="776.5" y="617.5" width="111" height="20" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_dot_175">';
      svg +=
        '<rect x="776.5" y="637.5" width="111" height="10" stroke="#333333" stroke-dasharray="1.5 2"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_17">';
      svg +=
        '<rect x="776.5" y="156.5" width="111" height="491" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 17">';
      svg += '<g id="label_stroke_name_17">';
      svg +=
        '<rect x="887.5" y="156.5" width="190" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_17" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="937.5" y="164.791">&#x4e3b;&#x306a;&#x65e5;&#x5e38;&#x751f;&#x6d3b;&#x4e0a;&#x306e;&#x6d3b;&#x52d5;</tspan></text>';
      svg +=
        '<rect x="887.5" y="156.5" width="190" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_18">';
      svg +=
        '<rect x="887.5" y="167.5" width="190" height="234.5" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="label_stroke_name_18">';
      svg += '<rect x="887.5" y="402" width="190" height="11" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_18" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" font-weight="bold" letter-spacing="0em"><tspan x="937.5" y="410.291">&#x9031;&#x5358;&#x4f4d;&#x4ee5;&#x5916;&#x306e;&#x30b5;&#x30fc;&#x30d3;&#x30b9;</tspan></text>';
      svg +=
        '<rect x="887.5" y="402" width="190" height="11" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_19">';
      svg +=
        '<rect x="887.5" y="413" width="190" height="234.5" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '</g>';
      svg += '<g id="Frame 18">';
      svg += '<g id="label_stroke_name_19">';
      svg += '<rect x="45.5" y="664.5" width="62" height="84" fill="#E3F2FD"/>';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_19" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="49.5" y="691.291">&#x30b5;&#x30fc;&#x30d3;&#x30b9;&#x63d0;&#x4f9b;</tspan><tspan x="49.5" y="703.291">&#x306b;&#x3088;&#x3063;&#x3066;&#x5b9f;&#x73fe;</tspan><tspan x="54" y="715.291">&#x3059;&#x308b;&#x751f;&#x6d3b;&#x306e;&#10;</tspan><tspan x="63" y="727.291">&#x5168;&#x4f53;&#x50cf;</tspan></text>';
      svg +=
        '<rect x="45.5" y="664.5" width="62" height="84" stroke="#333333"/>';
      svg += '</g>';
      svg += '<g id="Frame_solid_20">';
      svg +=
        '<rect x="107.5" y="664.5" width="970" height="84" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg +=
        '<text id="Rpr_complete-picture" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="112" y="678.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;</tspan><tspan x="112" y="692.791">&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;</tspan><tspan x="112" y="706.791">&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;</tspan><tspan x="112" y="720.791">&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;</tspan><tspan x="112" y="734.791">&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan></text>';
      svg +=
        '<text id="Rpr_non-weekly-service" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="892" y="427.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="441.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="455.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="469.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="483.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="497.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="511.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="525.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="539.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="553.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="567.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="581.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="595.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="609.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="623.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="637.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan></text>';
      svg +=
        '<text id="Rpr_activity" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="892" y="181.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="195.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="209.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="223.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="237.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="251.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="265.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="279.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="293.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="307.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="321.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="335.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="349.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="363.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="377.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan><tspan x="892" y="391.791">&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;&#xff11;&#xff12;&#xff13;&#xff14;&#xff15;&#xff16;&#xff17;&#xff18;&#xff19;&#xff10;</tspan></text>';
      svg +=
        '<text id="Rpn_startdate" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="181" y="142.791">2023&#x5e74;12&#x6708;</tspan></text>';
      svg +=
        '<text id="Rpn_day-care-number" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="525" y="117.791">1234567890</tspan></text>';
      svg +=
        '<text id="Rpn_region-support-number" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="181" y="117.791">1234567890</tspan></text>';
      svg +=
        '<text id="Rps_staff-name" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="868" y="101.791">&#x5927;&#x6b63;&#x3000;&#x96c5;&#x592b;</tspan></text>';
      svg +=
        '<text id="Rpn_limit-money" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="525" y="101.791">37,200&#x5186;</tspan></text>';
      svg +=
        '<text id="Rpn_main-number" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="181" y="101.791">1234567890</tspan></text>';
      svg +=
        '<text id="Rps_support-office-name" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="868" y="85.7905">&#x3068;&#x3046;&#x3051;&#x3044;&#x76f8;&#x8ac7;&#x652f;&#x63f4;&#x30bb;&#x30f3;&#x30bf;&#x30fc;</tspan></text>';
      svg +=
        '<text id="Rpn_division" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="525" y="85.7905">&#x533a;&#x5206;6</tspan></text>';
      svg +=
        '<text id="Rps_user-name" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="9" letter-spacing="0em"><tspan x="181" y="85.7905">&#x6771;&#x7d4c;&#x3000;&#x592a;&#x90ce;</tspan></text>';
      svg += '<g id="label_stroke_name_20">';
      svg +=
        '<text id="&#227;&#131;&#169;&#227;&#131;&#153;&#227;&#131;&#171;&#230;&#158;&#160;&#228;&#187;&#152;&#227;&#129;&#141;_20" fill="#333333" xml:space="preserve" style="white-space: pre" font-family="Meiryo" font-size="10" letter-spacing="0em"><tspan x="1018" y="40.6006">&#x69d8;&#x5f0f;&#xff13;&#xff0d;&#xff12;</tspan></text>';
      svg +=
        '<rect x="1008.5" y="30.5" width="69" height="14" stroke="#333333"/>';
      svg += '</g>';
      svg += '</g>';
      svg += '</svg>';

      return svg;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
$headerColor: #e3f2fd;
$width: 1280px-280px;
$height: 24px;
$middle: 48px;

#weekCaleandar {
  margin-left: 0;
  margin-right: auto;
  width: $width;
  min-width: $width;
  max-width: $width;
  font-size: $cell_fontsize;
  .colHeader {
    width: 100%;
    &.header {
      fill: $headerColor;
    }
  }

  .rowHeader {
    &.header {
      fill: $headerColor;
    }
  }

  svg line {
    fill: none;
  }
  #calendarViewArea {
    width: 100%;
    overflow: auto;
    height: 75vh;
    .calendar {
      width: 100%;
      height: 540px;
      foreignObject {
        font-size: 10px;
      }
    }
  }

  .filterArea {
    background-color: $view_Title_background_Main;
    .lightGray {
      background-color: $light-gray;
    }
    .lightYellow {
      background-color: $light_yellow;
    }
  }
  .koumokuData,
  .weekplanType,
  .koumokuTitle {
    height: 21px;
    font-size: $default_fontsize;
    button {
      height: 21px;
      padding: 0px 4px;
    }
  }
  .weekplanType {
    button {
      &.v-btn {
        &--active {
          background-color: $light_yellow;
          color: $view_Title_background_Main;
        }
        &:before {
          top: auto;
        }
      }
    }
  }

  .bottomArea {
    label {
      background-color: $view_Title_background_Main;
      color: $white;
      width: 80px;
      height: 25px;
      line-height: 25px;
      font-size: $default_fontsize;
      text-align: center;
    }
    input[type='checkbox'] {
      height: 25px;
      width: 25px;
    }
    .box {
      height: 25px;
      width: 200px;
      border: 1px solid $light-gray;
      box-shadow: none;
      background-color: $light_yellow;
      padding: 1px 2px;
      font-size: $default_fontsize;
    }
  }

  #colorDialog {
    width: 400px;
    border: 1px solid red;
  }
}
.v-navigation-drawer__content,
.v-dialog {
  .palette {
    height: 40px;
    &:hover {
      border: 1px solid #666;
    }
  }
  .weekInputFlag {
    &__right {
      font-size: $default_fontsize;
      label {
        background-color: $view_Title_background_Blue;
        width: 120px;
        height: $height;
        line-height: $height;
        display: inline-block;
        text-align: center;
      }
      select {
        width: 200px;
        height: $height;
        border: 1px solid $light-gray;
        font-size: $default_fontsize;
        -webkit-appearance: auto;
      }
      #bunruiGrid {
        font-size: 0.75rem;
        width: 400px;
        height: 220px;
        .wj-cell {
          &.wj-state-active,
          &.wj-state-multi-selected {
            &.selectOrenge {
              background-color: $view_Title_background_Orange !important;
            }
          }
        }
      }
    }
    &__left {
      .divLabel {
        background-color: $view_Title_background_Main;
        font-size: $default_fontsize;
        width: 120px;
        color: $white;
        text-align: center;
        line-height: $height;
        height: $height;
      }
      label {
        background-color: $view_Title_background_Main;
        font-size: $default_fontsize;
        width: 120px;
        color: $white;
        text-align: center;
        line-height: 100px;
        &.low {
          height: $height;
          line-height: $height;
        }
        &.middle {
          height: $middle;
          line-height: $middle;
        }
      }
      .input_week_btn {
        min-width: 20px;
        background-color: $white;
        font-size: $default_fontsize;
      }
      .d-block {
        display: block !important;
        width: 100%;
      }
      .time {
        width: 120px;
        text-align: center;
        background-color: $view_Title_background_Main;
      }
      .fcolor {
        width: 80px;
        height: $height;
        line-height: $height;
        text-align: center;
        font-size: $default_fontsize;
        border: 1px solid $light-gray;
      }
      input[type='color'],
      input[type='time'] {
        width: 100px;
        height: $height;
        &.min {
          width: 50px;
        }
      }
      textarea {
        border: 1px solid $light-gray;
        width: 162px;
        height: 100px;
        resize: none;
      }
      .minutebox {
        width: 80px;
        text-align: right;
      }
      .v-btn-toggle {
        button {
          min-width: 40px;
          &.v-btn {
            &--active {
              border: 1px solid $black;
              color: $view_Title_background_Main;
            }
          }
        }
      }
    }
  }
  .v-card {
    &__title {
      &.dialog_title {
        font-size: $default_fontsize;
        background-color: $view_Title_background_Main;
        color: $white;
        position: relative;
        padding: 5px;
        .dialog_close {
          height: $height;
          min-width: 20px;
          color: $black;
          position: absolute;
          left: auto;
          right: 10px;
          top: 10px;
        }
      }
    }
    .subject {
      background-color: $view_Title_background_Blue;
      text-align: center;
      font-size: $default_fontsize;
      border: 1px solid $light-gray;
      &.width {
        width: 120px;
        position: relative;
        p {
          position: absolute;
          top: 26%;
        }
      }
    }
    .overflowArea {
      height: 66vh;
      overflow: auto;
      &.allLife {
        height: 140px;
      }
    }
    .textarea {
      border: 1px solid $light-gray;
      resize: none;
      width: 100%;
      height: 440px;
      font-size: 0.88rem;
      padding: 1px;
      &:focus {
        outline: none;
      }
      &.min {
        height: 132px;
        font-size: 0.76rem;
      }
    }
    &.completeDialog {
      font-size: $default_fontsize;
      label {
        background-color: $view_Title_background_Blue_Dark;
        color: $white;
        height: $height;
        width: 100px;
        text-align: center;
      }
      .read {
        background-color: $light_yellow;
        height: $height;
        border: 1px solid $light-gray;
        width: 280px;
      }
    }
  }
}
#monitoring_sample_Datepicker {
  position: absolute;
  left: 200px;
  top: 140px;
  width: 300px;
}

.viewBoxes {
  position: absolute;
  font-size: 9px;
}
</style>
