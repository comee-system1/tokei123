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
        <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
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
        <v-card class="koumokuTitle titleBlueDark mr-1 ml-1" outlined tile>
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
        <v-btn class="ml-1">前回コピー</v-btn>
        <v-btn class="ml-1">計画コピー</v-btn>
        <v-btn class="ml-1" @click="historyFlag = true">履歴参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <svg viewbox="viewport" class="calendar">
        <!--メモリ-->

        <rect x="0" y="0" :height="calendarSepalate" class="colHeader header" />
        <rect
          x="0"
          y="0"
          :height="calendarHeight"
          :width="timewidth"
          class="rowHeader header"
        />
        <g stroke="black" stroke-width="0.5">
          <!--各時間軸-->
          <line x1="0" y1="1" x2="100%" y2="1"></line>
          <line
            x1="0"
            :y1="calendarHeight"
            x2="100%"
            :y2="calendarHeight"
          ></line>
          <line
            v-for="n in 24"
            :key="`k-${n}`"
            :x1="timewidth"
            :y1="n * calendarSepalate"
            x2="100%"
            :y2="n * calendarSepalate"
            class="lines"
          ></line>

          <!--各曜日軸-->
          <line x1="1" y1="1" x2="0" :y2="calendarHeight"></line>
          <line x1="99.9%" y1="1" x2="99.9%" :y2="calendarHeight"></line>
          <line
            v-for="n of 7"
            :key="n"
            :x1="planwidth * (n - 1) + timewidth"
            y1="0"
            :x2="planwidth * (n - 1) + timewidth"
            :y2="calendarHeight"
          ></line>
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
          :fill="val.color"
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
              <center v-bind="attrs" v-on="on" :style="`color: ${val.stroke}`">
                {{ val.text }}
              </center>
            </template>
            <span>{{ val.text }}</span>
          </v-tooltip>
        </foreignObject>
      </svg>
    </v-row>
    <v-row no-gutters class="mt-2 bottomArea">
      <v-col><v-btn small>削除</v-btn></v-col>
      <v-col class="d-flex justify-end">
        <label>完了</label>
        <input type="checkbox" v-model="checkCompleteFlag" class="ml-1" />
        <v-card class="ml-1 box">{{ complete }}</v-card>
        <v-btn small class="ml-6">登録</v-btn>
      </v-col>
    </v-row>

    <v-navigation-drawer right v-model="historyFlag" absolute temporary>
      <v-card elevation="0">
        <v-card-title class="dialog_title">
          履歴参照
          <v-btn class="closeButton pa-0" @click="historyFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <wj-flex-grid
            id="historyGrid"
            :headersVisibility="'Column'"
            :alternating-row-step="0"
            :initialized="onInitializedHistory"
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
              :isReadOnly="false"
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
          <v-btn class="closeButton pa-0" @click="weekInputFlag = false">
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
                    class="ml-1 minutebox text-caption"
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
                <span class="text-caption">背景色</span>
                <input type="color" v-model="input_backColor" class="min" />
              </div>
              <div class="ml-5">
                <span class="text-caption">文字色</span>
                <input type="color" v-model="input_fontColor" class="min" />
              </div>
            </div>
            <v-row class="mt-2" no-gutters>
              <v-btn small>画面クリア</v-btn>
              <v-btn small class="ml-1">削除</v-btn>
              <v-btn
                small
                class="ml-auto"
                @click="onRegistSchedule(`${schedule_id}`)"
                :disabled="scheduleRegistFlag"
                >登録</v-btn
              >
            </v-row>
          </v-col>
          <v-col class="weekInputFlag__right ml-1">
            <label>大分類</label>
            <select v-model="daibunrui" class="ml-1">
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
              <wj-flex-grid-column
                binding="middleBunruiType2"
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
          <v-btn class="closeButton pa-0" @click="dailyFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-row no-gutters :class="`pa-1 overflowArea ${dailyType}`">
          <v-col cols="6" v-if="dailyType == 'mainLife'">
            <div class="mt-2 subject">主な日常生活上の活動</div>
            <textarea v-model="mainLifeTextarea" class="textarea"></textarea>
          </v-col>
          <v-col cols="6" class="pl-1" v-if="dailyType == 'mainLife'">
            <div class="mt-2 subject">週単位以外のサービス</div>
            <textarea v-model="mainWeekTextarea" class="textarea"></textarea>
          </v-col>
          <v-col cols="12" class="d-flex" v-if="dailyType == 'allLife'">
            <div class="subject width">
              <p>サービス提供によって実現する生活の全体像</p>
            </div>
            <textarea v-model="lifeAllTextarea" class="textarea min"></textarea>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-2">
          <v-btn small>画面クリア</v-btn>
          <v-btn small>削除</v-btn>
          <v-btn small class="ml-auto">登録</v-btn>
        </v-row>
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
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';

const KEIKAUREKI_URL = '/Keikakureki'; // 計画履歴データ
// const SAISHINREKI_URL = '/WeekSaishinreki'; // 週間計画最新
const KBN = 2;
const TRACEID = 123;
const UNIQID = 3;
const JIGYOID = 1;
const FOLDER = 'SIENP';
const CALENDARHEIGHT = 540;
const CALENDARSEPALATE = 22;
const PLANHEIGHT = 11;
const PLANWIDTH = 128; // 予定表示部分横幅
const TIMEWIDTH = 100; // 時間軸幅
const STARTTIME = 500; // 開始時間5時
const ERRORMESSAGE = '2件登録されているデータが存在します。';
export default {
  components: {},
  data() {
    return {
      scheduleRegistFlag: true,
      viewSchedule: this.getSchedule(),
      time_minute: 0,
      starttime: STARTTIME,
      planwidth: PLANWIDTH,
      timewidth: TIMEWIDTH,
      calendarHeight: CALENDARHEIGHT,
      calendarSepalate: CALENDARSEPALATE,
      bunruiView: [],
      daibunrui: 0,
      daibunruiList: [
        {
          value: 0,
          name: '指定なし',
        },
        {
          value: 1,
          name: '余韻',
        },
      ],
      schedule_id: 0,
      input_backColor: '#FFFFFF',
      input_fontColor: '#000000',
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
      startDate: dayjs().format('YYYY年M月'),
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
      dailyWidth: 0,
      dailyType: '',
      mainLifeTextarea: '',
      mainWeekTextarea: '',
      lifeAllTextarea: '',
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
    },

    getSchedule() {
      /*
      // 適当な日付を指定したいので、今日の日付を指定
      // 12時以降の日付を指定する場合は翌日を指定
      let tmpDay = dayjs().format('YYYY-MM-DD');
      let nextDay = dayjs().add(1, 'd').format('YYYY-MM-DD');
      let data = [
        {
          id: 1,
          startTime: tmpDay + ' 05:00',
          endTime: tmpDay + ' 06:30',
          week: 1,
          color: '#fbebd6',
          stroke: 'black',
          text: '朝食aa',
        },
        {
          id: 2,
          startTime: tmpDay + ' 12:00',
          endTime: nextDay + ' 01:30',
          week: 1,
          color: '#fbebd6',
          stroke: 'black',
          text: '朝食bb',
        },
        {
          id: 3,
          startTime: tmpDay + ' 12:00',
          endTime: tmpDay + ' 20:30',
          week: 1,
          color: '#fbebd6',
          stroke: '#ff7f50',
          text: '朝食cc',
        },
      ];
      */
      let data = [];
      let tmp = this.settingSchedule(data);

      return tmp;
    },

    onRegistSchedule(id = 0) {
      let tmp = [];
      tmp = [...this.viewSchedule];

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
          startTime: st + ' ' + _self.input_time_start,
          endTime: ed + ' ' + _self.input_time_end,
          week: value - 1,
          stroke: _self.input_fontColor,
          color: _self.input_backColor,
          text: _self.input_komoku,
        });
      });
      // idがある時はデータのdelete/insertを行う
      // 指定IDのデータ削除
      if (id > 0) {
        let k = tmp.findIndex((value) => value.id == id);
        tmp.splice(k, 1);
      }
      let errorFlag = this.registDataErrorCheck(tmp);
      if (errorFlag) {
        alert(ERRORMESSAGE);
      } else {
        this.viewSchedule = this.settingSchedule(tmp);
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
              data[i].week == data[j].week &&
              ((data[i].endTime >= data[j].startTime &&
                data[i].startTime <= data[j].endTime) ||
                (data[i].startTime <= data[j].startTime &&
                  data[i].endTime >= data[j].startTime))
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
          let st = dayjs(data[i].startTime).unix();
          let ed = dayjs(data[i].endTime).unix();
          let fst = dayjs(first).unix();
          let startPos = st - fst;
          let endPos = ed - st;
          let sec = 30 * 60;
          let div = startPos / sec;
          let divEnd = endPos / sec;
          // 高さの指定
          data[i].height = PLANHEIGHT * divEnd;
          // 曜日におけるxとxTextの位置
          data[i].x = TIMEWIDTH + PLANWIDTH * data[i].week;
          data[i].xText = TIMEWIDTH + PLANWIDTH * data[i].week;
          // 右半分表示
          if (halfType == 2) {
            data[i].x = TIMEWIDTH + PLANWIDTH * data[i].week + PLANWIDTH / 2;
            data[i].xText =
              TIMEWIDTH + PLANWIDTH * data[i].week + PLANWIDTH / 2;
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
            data[i].week == data[j].week &&
            ((data[i].endTime >= data[j].startTime &&
              data[i].startTime <= data[j].endTime) ||
              (data[i].startTime <= data[j].startTime &&
                data[i].endTime >= data[j].startTime))
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
      this.scheduleRegistFlag = true;
      this.time_minute = '-';
      // 今日を基準に日付の差分時間(分)の取得を行う
      let today = dayjs().format('YYYY-MM-DD');
      let minute = 0;
      if (this.input_time_end && this.input_time_start) {
        let end = today + ' ' + this.input_time_end;
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
            this.scheduleRegistFlag = false;
            this.time_minute = minute / 60;
          } else {
            this.scheduleRegistFlag = true;
            this.time_minute = '-';
          }
        } else {
          // 終了時が4時以降
          if (four < ed && ed < st) {
            this.scheduleRegistFlag = true;
            this.time_minute = '-';
          } else {
            this.scheduleRegistFlag = false;
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
      if (k > 0) {
        let tmp = '';
        tmp = this.viewSchedule.find(function (value) {
          if (value.id == k) {
            return value;
          }
        });
        this.schedule_id = k;
        this.input_komoku = tmp.text;
        this.input_week = [tmp.week + 1];
        this.input_time_start = dayjs(tmp.startTime).format('HH:mm');
        this.input_time_end = dayjs(tmp.endTime).format('HH:mm');
        this.input_backColor = tmp.color;
        this.input_fontColor = tmp.stroke;
      } else {
        this.schedule_id = k;
        this.input_komoku = '';
        this.input_week = [];
        this.input_time_start = '';
        this.input_time_end = '';
        this.input_backColor = '#FFFFFF';
        this.input_fontColor = '#000000';
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
    onInitializedHistory() {
      let params = {
        jigyoid: JIGYOID,
        intcode: 100,
        uniqid: UNIQID,
        traceid: TRACEID,
      };
      getConnect(KEIKAUREKI_URL, params, FOLDER).then((result) => {
        // console.log(result);
        // 取得データをbinding名に指定
        let temp = result.filter(function (value) {
          value.planDate = value.krekiymd;
          value.planFinFlag = value.kanryo ? true : false;
          return value;
        });
        this.historyView = temp;
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
    onInitializedBunrui(bunruiGrid) {
      let bunruiView = [];
      bunruiView.push({
        bigBunruiCode: '003',
        bigBunrui: '余韻',
        middleBunruiCode: '001',
        middleBunrui: 'テレビを観る',
        middleBunruiType1: 'TV',
        middleBunruiType2: 'TV',
      });
      bunruiView.push({
        bigBunruiCode: '003',
        bigBunrui: '余韻',
        middleBunruiCode: '002',
        middleBunrui: 'ゲーム',
        middleBunruiType1: 'ゲーム',
        middleBunruiType2: '',
      });
      bunruiView.push({
        bigBunruiCode: '003',
        bigBunrui: '余韻',
        middleBunruiCode: '003',
        middleBunrui: '読書',
        middleBunruiType1: '読書',
        middleBunruiType2: '',
      });
      bunruiView.push({
        bigBunruiCode: '004',
        bigBunrui: '余韻1',
        middleBunruiCode: '004',
        middleBunrui: '読書',
        middleBunruiType1: '読書',
        middleBunruiType2: '',
      });
      bunruiView.push({
        bigBunruiCode: '004',
        bigBunrui: '余韻1',
        middleBunruiCode: '004',
        middleBunrui: '読書',
        middleBunruiType1: '読書',
        middleBunruiType2: '',
      });
      bunruiView.push({
        bigBunruiCode: '005',
        bigBunrui: '余韻2',
        middleBunruiCode: '005',
        middleBunrui: '読書',
        middleBunruiType1: '読書',
        middleBunruiType2: '',
      });

      this.bunruiView = bunruiView;
      this.createHeaderBunrui(bunruiGrid);
    },
    createHeaderBunrui(bunruiGrid) {
      var panel = bunruiGrid.columnHeaders;
      panel.setCellData(0, 0, '大分類');
      panel.setCellData(0, 2, '中分類');

      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      headerRanges.push(new wjGrid.CellRange(0, 2, 0, 5));

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
        jigyoid: JIGYOID,
        intcode: 100,
        cntid: 1,
        kbn: KBN,
        uniqid: UNIQID,
        traceid: TRACEID,
      };
      console.log(params);
      /*
      getConnect(SAISHINREKI_URL, params, FOLDER).then((result) => {
        console.log(result);
      });
      */
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserdata(obj) {
      this.userName = obj.names;
      this.riyocode = obj.riyocode;
      this.riid = obj.riid;

      // 選択したユーザー一覧から週間予定データを取得
      this.getWeekPlanData();
      // 選択したユーザー一覧から履歴を取得
      this.onInitializedHistory();
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
$headerColor: #f0f8ff;
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
  .calendar {
    width: 100%;
    height: 560px;
    foreignObject {
      font-size: 10px;
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
  .weekplanType,
  .koumokuTitle {
    height: 21px;
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
      font-size: 0.85rem;
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
      font-size: 0.85rem;
    }
  }
}
.v-navigation-drawer__content,
.v-dialog {
  .weekInputFlag {
    &__right {
      font-size: 0.85rem;

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
        font-size: 0.85rem;
        -webkit-appearance: auto;
      }
      #bunruiGrid {
        font-size: 0.75rem;
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
        font-size: 0.85rem;
        width: 120px;
        color: $white;
        text-align: center;
        line-height: $height;
        height: $height;
      }
      label {
        background-color: $view_Title_background_Main;
        font-size: 0.85rem;
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
        font-size: 0.85rem;
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
        font-size: 0.85rem;
        background-color: $view_Title_background_Main;
        color: $white;
        position: relative;
        padding: 5px;
        .closeButton {
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
      font-size: 0.85rem;
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
  }
}
#monitoring_sample_Datepicker {
  position: absolute;
  left: 200px;
  top: 140px;
  width: 300px;
}
</style>
