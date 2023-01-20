<template>
  <v-container class="pa-0">
    <div :class="scrollAreaFlag ? 'scrollArea' : ''">
      <svg
        viewbox="viewport"
        style="border: 1px solid gray; width: 800px; height: 660px"
        @click="svgClick"
      >
        <!--メモリ-->
        <rect x="0" y="0" height="30" width="800" class="header" />
        <rect x="0" y="0" height="660" width="100" class="header" />
        <g stroke="gray" stroke-width="1">
          <!--各分軸-->
          <line
            v-for="n in minuteLine"
            :key="`t-${n}`"
            x1="100"
            :y1="n * 5"
            x2="800"
            :y2="n * 5"
            class="minuteLine"
          ></line>

          <!--各時間軸-->
          <line
            v-for="n in 26"
            :key="`k-${n}`"
            x1="100"
            :y1="n * 30"
            x2="800"
            :y2="n * 30"
            stroke="black"
          ></line>
          <!--各曜日軸-->
          <line
            v-for="n of 7"
            :key="n"
            :x1="100 * n"
            y1="0"
            :x2="100 * n"
            y2="700"
          ></line>
        </g>
        <!--週-->
        <text x="144" y="20" class="week">月</text>
        <text x="244" y="20" class="week">火</text>
        <text x="344" y="20" class="week">水</text>
        <text x="444" y="20" class="week">木</text>
        <text x="544" y="20" class="week">金</text>
        <text x="644" y="20" class="week">土</text>
        <text x="726" y="20" class="week">日・祝</text>
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
    </div>

    <v-dialog
      v-model="addSchedule_dialog"
      width="600"
      class="addSchedule_dialog"
    >
      <v-card>
        <v-card-title class="text-caption grey lighten-2">
          週間予定
        </v-card-title>
        <v-row dense class="pa-2 text-caption">
          <v-col cols="3">
            <wj-flex-grid
              id="gridLife"
              :autoSearch="true"
              :headersVisibility="'Column'"
              :selectionMode="3"
              :initialized="onInitializedLife"
              :itemsSourceChanged="onInitializedLifeChanged"
              :itemsSource="lifeViewData"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :showMarquee="true"
              :alternating-row-step="0"
            >
              <wj-flex-grid-column
                header="日常生活"
                binding="life"
                width="*"
                :word-wrap="false"
                :allowResizing="true"
                :isReadOnly="true"
                align="center"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
          <v-col>
            <div class="d-flex flex-row">
              <v-card elevation="0">
                <p class="text-caption ma-0">開始時間</p>
                <v-row no-gutters class="ma-0">
                  <select v-model="start_time" class="selectBox pa-1">
                    <option v-for="h in 20" :key="h">
                      {{ h + 3 }}
                    </option>
                  </select>
                  <span>：</span>
                  <select v-model="minute_time" class="selectBox pa-1">
                    <option v-for="m in 5" :key="m">
                      {{ m * 10 }}
                    </option>
                  </select>
                </v-row>
              </v-card>
              <v-card elevation="0" class="ml-2">
                <p class="text-caption ma-0">所要時間</p>
                <v-row no-gutters class="ma-0">
                  <select v-model="require_start_time" class="selectBox pa-1">
                    <option v-for="h in 7" :key="h">
                      {{ h - 1 }}
                    </option>
                  </select>
                  <span>：</span>
                  <select v-model="require_minute_time" class="selectBox pa-1">
                    <option v-for="m in 5" :key="m">
                      {{ m * 10 }}
                    </option>
                  </select>
                </v-row>
              </v-card>
            </div>
            <div class="flex-row">
              <p class="text-caption ma-0">曜日</p>
              <v-btn-toggle multiple v-model="weekSelected">
                <v-btn v-for="wk in weekString" :key="wk" small>{{ wk }}</v-btn>
              </v-btn-toggle>
            </div>
            <div class="flex-row">
              <p class="text-caption ma-0">項目名</p>
              <input type="text" v-model="itemName" class="pa-1 block" />
            </div>
            <div class="flex-row text-end mt-5">
              <v-btn small @click="settedRects()">登録</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
export default {
  data() {
    return {
      scrollAreaFlag: false,
      ratio: 1,
      dx: 0,
      dy: 0,
      sampleText: 'Hello',
      isMove: false,
      isResize: false,
      beforeMouseX: null,
      beforeMouseY: null,
      selectIdx: 0,
      viewport: '0 0 800 700',
      weekly: [1, 2, 3, 4, 5, 6, 7],
      weekString: ['日', '月', '火', '水', '木', '金', '土'],
      weekSelected: [],
      rects: [],
      timeLine: [],
      minuteLine: [],
      addSchedule_dialog: false,
      lifeViewData: [], // 日常生活項目グリッド
      start_time: '',
      minute_time: '',
      require_start_time: '',
      require_minute_time: '',
      itemName: '',
    };
  },
  props: {},
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
        dispTime = ('00' + time).slice(-2) + ':00';
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

    // 分刻みメモリ
    let minuteLine = [];
    for (let i = 6; i <= 160; i++) {
      minuteLine.push(i);
    }
    this.minuteLine = minuteLine;
  },
  mounted() {
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('mousemove', this.mouseMove);
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  },
  methods: {
    /***************************
     * 子供の関数を実行
     * svg表示用データ登録
     */
    settedRects() {
      this.$emit('settedRect');
    },
    /**************************
     * 親からの実行関数
     * スケジュール設定用ダイアログ入力用
     */
    setScheduleData(lifeViewData, serviceViewData) {
      console.log(lifeViewData);
      console.log(serviceViewData);
      this.lifeViewData = lifeViewData;
      this.addSchedule_dialog = true;
    },
    /*************************
     * 日常生活項目
     */
    onInitializedLifeChanged() {},
    /*************************
     * 日常生活項目
     */
    onInitializedLife(flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          wijmo.addClass(cell, 'gridHeader');
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          cell.style.textAlign = 'left';
        }
      };
    },
    /*********************************
     * 親から実行
     * svgの表示データ
     */
    setSVG(data) {
      this.rects = data;
    },
    /*********************************
     * 親から実行
     * svgの高さ指定のための関数
     */
    setGridHeight(type) {
      if (type == 0) {
        this.scrollAreaFlag = false;
      } else {
        this.scrollAreaFlag = true;
      }
    },
    /************
     * svgをクリック
     */
    svgClick(e) {
      this.$emit('childSetSVGPosition', e);
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
      this.rects.forEach((value, key) => {
        this.rects[key].halfPosition = 0;
      });
      // 曜日毎の件数をチェック
      let weekcount = [];
      for (let i = 0; i < this.weekly.length; i++) {
        let number = this.rects.filter((n) => n.week == this.weekly[i]);
        weekcount.push(number.length);
      }
      this.rects.forEach((value, key) => {
        this.weekly.forEach((wk) => {
          if (wk == value.week) {
            let st = value.y; // 開始位置(比較元)
            let ed = Number(st) + Number(value.height); // 終了位置(比較元)
            this.rects.forEach((value2, key2) => {
              // 所持する曜日の件数が1件の時も含める
              if (
                (key != key2 && value2.week == value.week) ||
                weekcount[wk - 1] == 1
              ) {
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
                if (
                  this.rects[key].halfPosition == 0 ||
                  weekcount[wk - 1] == 1
                ) {
                  this.rects[key].width = 100;
                } else {
                  this.rects[key].width = 50;
                }
                // 横位置指定x halfPositionの値で可変 0:100 1:100 2:150
                if (weekcount[wk - 1] == 1) {
                  this.rects[key].x = 100 * Number(value2.week);
                } else if (this.rects[key].halfPosition == 2) {
                  this.rects[key].x = 100 * Number(value2.week) + 50;
                } else {
                  this.rects[key].x = 100 * Number(value2.week);
                }
                // テキスト位置指定x halfPositionの値で可変 0:50 1:25 2:25
                if (
                  this.rects[key].halfPosition == 0 ||
                  weekcount[wk - 1] == 1
                ) {
                  this.rects[key].xText = 50;
                } else {
                  this.rects[key].xText = 25;
                }
              }
            });
          }
        });
      });

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

  .scrollArea {
    height: 340px;
    overflow-y: auto;
  }
  .minuteLine {
    fill: none;
    stroke: #ccc;
    stroke-width: 1px;
    opacity: 0.5;
  }
}
#gridLife {
  .gridHeader {
    background-color: $view_Title_background_Orange;
  }
}
.selectBox {
  border: 1px solid $light-gray;
  width: 60px;
  -webkit-appearance: auto;
}
</style>
