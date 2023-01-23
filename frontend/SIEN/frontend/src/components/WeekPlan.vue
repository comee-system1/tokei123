<template>
  <v-container id="weekCaleandar" class="pa-0">
    <v-row no-gutters class="filterArea pa-1">
      <v-card
        outlined
        tile
        width="60"
        class="text-center label text-caption lightGray"
      >
        利用者名
      </v-card>
      <v-card
        width="200"
        class="text-caption lightYellow pl-1"
        elevation="0"
        outlined
        tile
      >
        {{ riyocode }}
        {{ userName }}
      </v-card>
      <v-card
        outlined
        tile
        width="60"
        class="text-center label text-caption lightGray ml-2"
      >
        作成日
      </v-card>
      <v-card
        width="120"
        class="text-caption lightYellow pl-1"
        elevation="0"
        outlined
        tile
      >
        {{ createDate }}
      </v-card>
    </v-row>
    <v-row no-gutters class="mt-1 planArea">
      <v-col class="d-flex" cols="8">
        <v-card
          outlined
          tile
          class="text-center label text-caption pa-1 orenge"
        >
          計画開始年月
        </v-card>
        <v-card outlined tile class="text-center label text-caption pa-1">
          <div class="float-right" @click="inputCalendarClick()">
            {{ startDate }}
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
        <label
          outlined
          tile
          class="text-center label text-caption pa-1 lightGray ml-1"
        >
          入力内容
        </label>
        <v-btn-toggle
          v-model="weekplanType"
          mandatory
          class="ml-1 weekplanType"
        >
          <v-btn small>週間予定</v-btn>
          <v-btn small>主な日常生活等</v-btn>
          <v-btn small>全体の生活像</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-btn small @click="weekInput()">
          <v-icon small> mdi-plus-circle </v-icon> 週間項目入力</v-btn
        >
        <v-btn small class="ml-1">前回コピー</v-btn>
        <v-btn small class="ml-1">計画コピー</v-btn>
        <v-btn small class="ml-1" @click="historyFlag = true">履歴参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <svg viewbox="viewport" class="calendar">
        <!--メモリ-->
        <rect x="0" y="0" height="30" class="colHeader header" />
        <rect x="0" y="0" height="660" width="100" class="rowHeader header" />
        <g stroke="gray" stroke-width="1">
          <!--各時間軸-->
          <line
            v-for="n in 26"
            :key="`k-${n}`"
            x1="100"
            :y1="n * 30"
            x2="100%"
            :y2="n * 30"
            stroke="black"
          ></line>

          <!--各曜日軸-->

          <line
            v-for="n of 7"
            :key="n"
            :x1="128 * (n - 1) + 100"
            y1="0"
            :x2="128 * (n - 1) + 100"
            y2="700"
          ></line>
        </g>
        <!--週-->
        <text x="158" y="20" class="week">月</text>
        <text x="286" y="20" class="week">火</text>
        <text x="414" y="20" class="week">水</text>
        <text x="542" y="20" class="week">木</text>
        <text x="670" y="20" class="week">金</text>
        <text x="798" y="20" class="week">土</text>
        <text x="910" y="20" class="week">日・祝</text>

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
          x="100"
          y="150"
          width="128"
          height="15"
          fill="yellow"
          stroke="gray"
          stroke-width="1"
          class="rects"
        />
        <foreignObject :x="100" :y="150" width="125" height="80">
          <center>朝食</center>
        </foreignObject>
        <rect
          :x="100 + 128"
          y="150"
          width="128"
          height="90"
          fill="yellow"
          stroke="gray"
          stroke-width="1"
          class="rects"
        />
        <foreignObject :x="100 + 130" :y="150" width="125" height="80">
          <p>これはXHTMLなので、自動折り返しされます。</p>
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
    <v-dialog v-model="weekInputFlag" width="60%">
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
                <v-btn-toggle multiple v-model="input_week" tile>
                  <v-btn v-for="w in week" :key="w" small>{{ w }}</v-btn>
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
                    <input type="time" v-model="input_time_start" />
                  </div>
                  <span>～</span>
                  <div class="ml-1">
                    <input type="time" v-model="input_time_end" />
                  </div>
                </div>
                <div class="d-flex ml-1">(最小単位30分、以降10分単位)</div>
              </div>
            </div>
          </v-col>
          <v-col>bbb</v-col>
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

const KEIKAUREKI_URL = '/Keikakureki';
const TRACEID = 123;
const UNIQID = 3;
const JIGYOID = 1;
export default {
  components: {},
  data() {
    return {
      input_komoku: '',
      input_time_start: '',
      input_time_end: '',
      input_week: [],
      week: ['毎日', '月', '火', '水', '木', '金', '土'],
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
      weekplanType: '',
      displayPatternFlag: 0,
      historyFlag: false,
      svgData: {},
      addDialog: false,
      timeLine: [],
      rects: [
        {
          x: 100, // 初期値x
          y: 20, // 初期値y
          width: 50, // 横幅
          height: 120, // 高さ
          xText: 25, // テキストの位置x
          yText: 10, // テキストの位置y
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床',
          halfPosition: 1, // 1:左側 2:右側 0:指定なし
          week: 1,
        },
      ],
    };
  },
  props: {
    selectedUserObj: Object,
  },
  created() {
    // タイムラインの配列を作成
    let timeline = []; // 2時間刻み用
    let timelineAll = []; // 1時間刻み用
    let time = 4;
    let y = 35;
    for (let i = 1; i <= 21; i++) {
      let dispTime = '';
      let dispTimeAll = '';
      if (i % 2 == 1) {
        let hour = ('00' + time).slice(-2);
        // 24時の時は0を表示
        if (hour == 24) {
          hour = '00';
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
      y = y + 30;
    }
    this.timeLine = timeline;
  },
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
    // ダイアログカレンダー表示
    inputCalendarClick() {
      this.datepickerYoteiYm_dialog = true;
    },
    // ダイアログカレンダーの月を選択
    monthSelect() {
      this.startDate = dayjs(this.pickerYoteiYm).format('YYYY年M月');
      this.datepickerYoteiYm_dialog = false;
    },
    /**********************************
     * 週間項目入力
     */
    weekInput() {
      this.weekInputFlag = true;
    },
    /***************************
     * 履歴参照
     */
    onInitializedHistory() {
      let params = {
        jigyoid: JIGYOID,
        intcode: this.riid,
        uniqid: UNIQID,
        traceid: TRACEID,
      };
      getConnect(KEIKAUREKI_URL, params, 'SIENP').then((result) => {
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
    /****************
     * ユーザー一覧を押下
     */
    setUserdata(obj) {
      this.userName = obj.names;
      this.riyocode = obj.riyocode;
      this.riid = obj.riid;
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
  .calendar {
    border: 1px solid gray;
    width: 100%;
    height: 660px;
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
  .planArea {
    label {
      height: 28px;
      padding: 2px 10px;
      line-height: 20px;
    }

    .orenge {
      background-color: $view_Title_background_Orange;
    }
    .lightGray {
      background-color: $light-gray;
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
    &__left {
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
      .d-block {
        display: block !important;
        width: 100%;
      }
      .time {
        width: 120px;
        text-align: center;
        background-color: $view_Title_background_Main;
      }
      input[type='time'] {
        width: 100px;
        height: $height;
      }
      textarea {
        border: 1px solid $light-gray;
        width: 162px;
        height: 100px;
        resize: none;
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
  }
}
#monitoring_sample_Datepicker {
  position: absolute;
  left: 200px;
  top: 140px;
  width: 300px;
}
</style>
