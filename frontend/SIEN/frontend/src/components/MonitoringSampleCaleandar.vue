<template>
  <svg
    viewbox="0 0 800 600"
    style="border: 1px solid gray; width: 800px; height: 440px"
  >
    <!--メモリ-->
    <rect x="0" y="0" height="20" width="800" class="header" />
    <rect x="0" y="0" height="600" width="100" class="header" />
    <g stroke="gray" stroke-width="1">
      <line
        v-for="n in 30"
        :key="n"
        x1="100"
        :y1="n * 20"
        x2="800"
        :y2="n * 20"
      ></line>
      <line
        v-for="n in 7"
        :key="n"
        :x1="100 * n"
        :y1="0"
        :x2="100 * n"
        :y2="600"
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
    <rect x="100" y="80" height="20" width="100" class="drag" />
    <text x="100" y="95" class="kisyo">起床</text>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      sampleText: 'Hello',
    };
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
.header {
  fill: #f0f8ff;
}
.drag {
  fill: #ffff00;
  opacity: 0.4;
}
.week {
  font-family: Verdana;
  font-size: 14px;
}
.time {
  font-family: Verdana;
  font-size: 14px;
}
.kisyo {
  font-family: Verdana;
  font-size: 14px;
  letter-spacing: 2;
}
</style>
