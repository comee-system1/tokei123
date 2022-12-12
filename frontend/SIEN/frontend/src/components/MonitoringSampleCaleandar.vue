<template>
  <div style="margin-left: 400px">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      rects: [
        {
          x: 100, // 初期値x
          y: 80, // 初期値y
          width: 50, // 横幅
          height: 20, // 高さ
          xText: 25, // テキストの位置x
          yText: 10, // テキストの位置y
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床',
        },
        /*
        {
          x: 200,
          y: 80,
          width: 100,
          height: 20,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床',
        },
        */
        {
          x: 150,
          y: 60,
          width: 50,
          height: 120,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'yelow',
          stroke: 'black',
          text: 'TVドラマ',
          text2: '朝食',
        },
      ],
    };
  },

  mounted() {
    console.log('MOUNT LISTENER ON');
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('mousemove', this.mouseMove);
  },
  beforeDestroy() {
    console.log('MOUNT LISTENER OFF');
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  },
  methods: {
    // viewboxを作成
    makeViewBox(x, y, w, h) {
      this.viewport = [x, y, w, h].join(' ');
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

      // データ配列のリフォームを行う
      // 時間重複チェック
      //console.log(this.rects);
      this.rects.forEach((value) => {
        console.log('base=>' + value.y);
        this.rects.forEach((value2) => {
          //if (key != key2) {

          console.log('check=>' + value2.y);
          //}
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
</style>
