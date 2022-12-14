<template>
  <v-container id="samplecaleandar" class="pa-0">
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
      <v-col class="d-flex" cols="6">
        <v-card
          outlined
          tile
          class="text-center label text-caption pa-1 orenge"
        >
          週間計画開始年月
        </v-card>
        <v-card outlined tile class="text-center label text-caption pa-1">
          <div class="float-right" @click="inputCalendarClick()">
            {{ startDate }}
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex">
        <label class="lightGray text-caption">入力内容</label>
        <v-btn-toggle
          v-model="weekplanType"
          id="weekplanType"
          mandatory
          class="ml-1"
          color="yellow"
        >
          <v-btn small>週間予定</v-btn>
          <v-btn small>主な日常生活等</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <v-btn small>前回コピー</v-btn>
        <v-btn small class="ml-2">履歴参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <v-col>
        <svg
          viewbox="viewport"
          style="border: 1px solid gray; width: 800px; height: 440px"
        >
          <!--メモリ-->
          <rect x="0" y="0" height="20" width="800" class="header" />
          <rect x="0" y="0" height="600" width="100" class="header" />
          <g stroke="gray" stroke-width="1">
            <line
              v-for="n in 30"
              :key="`k-${n}`"
              x1="100"
              :y1="n * 20"
              x2="800"
              :y2="n * 20"
            ></line>
            <line
              v-for="n of 7"
              :key="n"
              :x1="100 * n"
              y1="0"
              :x2="100 * n"
              y2="600"
            ></line>
          </g>
          <!--週-->
          <text x="144" y="14" class="week">月</text>
          <text x="244" y="14" class="week">火</text>
          <text x="344" y="14" class="week">水</text>
          <text x="444" y="14" class="week">木</text>
          <text x="544" y="14" class="week">金</text>
          <text x="644" y="14" class="week">土</text>
          <text x="726" y="14" class="week">日・祝</text>
          <!--time-->
          <text x="50" y="25" class="time">04:00</text>
          <text x="50" y="65" class="time">06:00</text>
          <text x="50" y="105" class="time">08:00</text>
          <text x="50" y="145" class="time">10:00</text>
          <text x="50" y="185" class="time">12:00</text>
          <text x="50" y="225" class="time">14:00</text>
          <text x="50" y="265" class="time">16:00</text>
          <text x="50" y="305" class="time">18:00</text>
          <text x="50" y="345" class="time">20:00</text>
          <text x="50" y="385" class="time">22:00</text>
          <text x="50" y="425" class="time">24:00</text>

          <!--ドラッグ位置-->
          <rect
            v-for="(r, idx) in rects"
            :key="idx"
            :x="r.x"
            :y="r.y"
            :height="r.height"
            :width="r.width"
            class="drag"
            :class="r.color"
            @mousedown="move($event, idx)"
          ></rect>
          <line
            v-for="(r, idxLine) in rects"
            :key="`idxLine_${idxLine}`"
            :x1="r.x"
            :y1="r.y + r.height"
            :x2="r.x + r.width"
            :y2="r.y + r.height"
            stroke="gray"
            stroke-width="10"
            opacity="0.5"
            @mousedown="resize($event, idxLine)"
          ></line>
          <text
            v-for="(rstr, idxstr) in rects"
            :key="`idx_${idxstr}`"
            text-anchor="middle"
            dominant-baseline="central"
          >
            <tspan :x="rstr.x + rstr.xText" :dy="rstr.y + rstr.yText">
              {{ rstr.text }}
            </tspan>
            <tspan :x="rstr.x + rstr.xText" :dy="15">{{ rstr.text2 }}</tspan>
            <tspan :x="rstr.x + rstr.xText" :dy="15">{{ rstr.text3 }}</tspan>
          </text>
        </svg>
      </v-col>
      <v-col class="ml-2">
        <wj-flex-grid
          :autoSearch="true"
          :headersVisibility="'Column'"
          :selectionMode="3"
          :initialized="onInitializedUser"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="usersViewData"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="true"
          :formatItem="onFormatItem"
        >
          <wj-flex-grid-column
            header="日常生活"
            binding="riyocode"
            width="2*"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script>
// dayjsのインポート
import dayjs from 'dayjs';
// ロケールのインポート
import 'dayjs/locale/ja';

export default {
  data() {
    return {
      userName: '',
      createDate: dayjs().format('YYYY年M月DD日'),
      startDate: dayjs().format('YYYY年M月'),
      datepickerYoteiYm_dialog: false,
      pickerYoteiYm: '',
      weekplanType: '',
      ratio: 1,
      dx: 0,
      dy: 0,
      sampleText: 'Hello',
      isMove: false,
      isResize: false,
      beforeMouseX: null,
      beforeMouseY: null,
      selectIdx: 0,
      viewport: '0 0 800 600',
      weekly: [1, 2, 3, 4, 5, 6, 7],
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
        {
          x: 150,
          y: 60,
          width: 50,
          height: 40,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'yelow',
          stroke: 'black',
          text: 'TVドラマ',
          text2: '朝食',
          halfPosition: 2, // 1:左側 2:右側 0:指定なし
          week: 1,
        },
        {
          x: 100,
          y: 200,
          width: 50,
          height: 120,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'yelow',
          stroke: 'black',
          text: 'TVドラマ11',
          text2: '朝食',
          halfPosition: 2, // 1:左側 2:右側 0:指定なし
          week: 1,
        },
        {
          x: 200,
          y: 200,
          width: 100,
          height: 20,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床',
          halfPosition: 1, // 1:左側 2:右側 0:指定なし
          week: 2,
        },
        {
          x: 200,
          y: 200,
          width: 100,
          height: 20,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床2',
          halfPosition: 1, // 1:左側 2:右側 0:指定なし
          week: 2,
        },
        {
          x: 300,
          y: 100,
          width: 100,
          height: 20,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床7',
          halfPosition: 0, // 1:左側 2:右側 0:指定なし
          week: 7,
        },
        {
          x: 300,
          y: 100,
          width: 100,
          height: 120,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床7-2',
          halfPosition: 0, // 1:左側 2:右側 0:指定なし
          week: 7,
        },
      ],
    };
  },
  props: {
    selectedUserObj: Object,
  },
  mounted() {
    this.setUserdata(this.selectedUserObj);
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('mousemove', this.mouseMove);
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  },
  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserdata(obj) {
      this.userName = obj.names;
    },
    // viewboxを作成
    makeViewBox(x, y, w, h) {
      this.viewport = [x, y, w, h].join(' ');
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
    // 図形を動かすフラグを立てる
    move(e, i) {
      this.isMove = true;
      this.selectIdx = i;
      e.preventDefault();
    },
    // 図形のサイズを動かす
    resize(e, i) {
      this.isResize = true;
      this.selectIdx = i;
      e.preventDefault();
    },
    // マウスのクリックが終わった段階で初期化
    mouseUp(e) {
      this.isMove = false;
      this.isResize = false;
      this.beforeMouseX = null;
      this.beforeMouseY = null;

      // データ配列の改修を行う
      // 時間重複チェック
      //console.log(this.rects);
      this.rects.forEach((value, key) => {
        this.rects[key].halfPosition = 0;
      });
      console.log(this.rects);

      this.rects.forEach((value, key) => {
        this.weekly.forEach((wk) => {
          if (wk == value.week) {
            let st = value.y; // 開始位置(比較元)
            let ed = Number(st) + Number(value.height); // 終了位置(比較元)
            this.rects.forEach((value2, key2) => {
              if (key != key2 && value2.week == value.week) {
                // 開始位置の重複チェック
                let st2 = value2.y;
                let ed2 = Number(st2) + Number(value2.height);
                if (
                  (st >= st2 && st <= ed2 && ed >= st2 && st <= ed2) ||
                  (st <= st2 && st <= ed2 && ed >= st2 && st <= ed2)
                ) {
                  this.rects[key].halfPosition =
                    Number(this.rects[key2].halfPosition) + 1;
                }
                // 横幅の指定width halfPositionの値で可変 0:100 1:50 2:50
                if (this.rects[key].halfPosition == 0) {
                  this.rects[key].width = 100;
                } else {
                  this.rects[key].width = 50;
                }
                // 横位置指定x halfPositionの値で可変 0:100 1:100 2:150
                if (this.rects[key].halfPosition == 2) {
                  this.rects[key].x = 100 * Number(value2.week) + 50;
                } else {
                  this.rects[key].x = 100 * Number(value2.week);
                }
                // テキスト位置指定x halfPositionの値で可変 0:50 1:25 2:25
                if (this.rects[key].halfPosition == 0) {
                  this.rects[key].xText = 50;
                } else {
                  this.rects[key].xText = 25;
                }
              }
            });
          }
        });
      });

      console.log(this.rects);

      e.preventDefault();
    },
    // move中は前回まで動かした差分を取りながら座標を変化させていく
    mouseMove(e) {
      var mouseX;
      var mouseY;
      var dx = 0;
      var dy = 0;
      var tempX;
      var tempY;
      // リサイズの条件判定
      if (this.isResize) {
        mouseY = e.offsetY * this.ratio + this.dy;
        dy = 0;
        if (this.beforeMouseY) {
          dy = mouseY - this.beforeMouseY;
        }
        this.beforeMouseY = mouseY;
        tempY = dy + Number(this.rects[this.selectIdx].height);
        if (tempY < 20) tempY = 20;
        this.rects[this.selectIdx].height = tempY;
      }
      // ドラッグの条件判定
      if (this.isMove) {
        mouseX = e.offsetX * this.ratio + this.dx;
        mouseY = e.offsetY * this.ratio + this.dy;
        dx = 0;
        dy = 0;
        if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX;
          dy = mouseY - this.beforeMouseY;
        }
        this.beforeMouseX = mouseX;
        this.beforeMouseY = mouseY;
        tempX = dx + Number(this.rects[this.selectIdx].x);
        tempY = dy + Number(this.rects[this.selectIdx].y);
        if (tempX > 0) this.rects[this.selectIdx].x = tempX;
        if (tempY > 0) this.rects[this.selectIdx].y = tempY;
      }
      e.preventDefault();
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#samplecaleandar {
  .header {
    fill: #f0f8ff;
  }
  .drag {
    opacity: 1;
    rx: 5;
    ry: 5;
    stroke-width: '1';
    stroke: $black;
    &.green {
      fill: $view_Title_background_Green_Dark;
    }
    &.yelow {
      fill: $time_color_yellow;
    }
  }

  .week {
    font-family: Verdana;
    font-size: 14px;
  }
  .time {
    font-family: Verdana;
    font-size: 14px;
  }
  tspan {
    font-size: 11px;
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
      line-height: 25px;
    }
    .orenge {
      background-color: $view_Title_background_Orange;
    }
    .lightGray {
      background-color: $light-gray;
    }
  }
  #weekplanType {
    .v-btn--active {
      span {
        color: $view_Title_background_Main;
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
