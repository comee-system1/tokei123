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
      <v-col class="d-flex" cols="5">
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
        <v-btn small class="ml-3" @click="addSchduleData"
          >追加
          <v-icon small>mdi-arrow-up-bold-box-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <label
          outlined
          tile
          class="text-center label text-caption pa-1 lightGray"
        >
          入力内容
        </label>
        <v-btn-toggle
          v-model="weekplanType"
          id="weekplanType"
          mandatory
          class="ml-1"
          color="yellow"
        >
          <v-btn small @click="displayPattern(0)">週間予定</v-btn>
          <v-btn small @click="displayPattern(1)">主な日常生活等</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="*" class="d-flex justify-end">
        <v-btn small>前回コピー</v-btn>
        <v-btn small class="ml-2">履歴参照</v-btn>
      </v-col>
    </v-row>
    <calendarSelect
      v-show="displayPatternFlag == 0"
      ref="childSelect"
      @calendarSelectMethod="selectMethod"
      @parentSetSVGPosition="parentSetSVGPosition"
      @settedRect="settedRect"
    ></calendarSelect>
    <calendarInput
      v-show="displayPatternFlag == 1"
      ref="childInput"
    ></calendarInput>
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
import calendarSelect from '../components/MonitoringSampleCaleandarSelect';
import calendarInput from '../components/MonitoringSampleCaleandarInput';
export default {
  components: {
    calendarSelect,
    calendarInput,
  },
  data() {
    return {
      userName: '',
      createDate: dayjs().format('YYYY年M月DD日'),
      startDate: dayjs().format('YYYY年M月'),
      datepickerYoteiYm_dialog: false,
      pickerYoteiYm: '',
      weekplanType: '',
      displayPatternFlag: 0,
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
          width: 100,
          height: 120,
          xText: 50,
          yText: 10,
          id: 'green',
          color: 'yelow',
          stroke: 'black',
          text: 'TVドラマ11',
          text2: '朝食',
          halfPosition: 0, // 1:左側 2:右側 0:指定なし
          week: 1,
        },
        {
          x: 200,
          y: 200,
          width: 50,
          height: 20,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床',
          halfPosition: 1, // 1:左側 2:右側 0:指定なし
          week: 2,
        },
        {
          x: 250,
          y: 200,
          width: 50,
          height: 20,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床2',
          halfPosition: 2, // 1:左側 2:右側 0:指定なし
          week: 2,
        },
        {
          x: 700,
          y: 100,
          width: 50,
          height: 20,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床7',
          halfPosition: 1, // 1:左側 2:右側 0:指定なし
          week: 7,
        },
        {
          x: 750,
          y: 100,
          width: 50,
          height: 120,
          xText: 25,
          yText: 10,
          id: 'green',
          color: 'green',
          stroke: 'black',
          text: '起床7-2',
          halfPosition: 2, // 1:左側 2:右側 0:指定なし
          week: 7,
        },
      ],
      svgData: {},
      addDialog: false,
    };
  },
  props: {
    selectedUserObj: Object,
  },
  mounted() {
    this.setUserdata(this.selectedUserObj);
    this.$refs.childSelect.setSVG(this.rects);
    this.$refs.childInput.setSVG(this.rects);
  },
  beforeDestroy() {},
  methods: {
    /****************************
     * 子メソッドを実行
     * svg表示用データ登録
     ********/
    settedRect() {
      let rects = this.rects;
      this.rects = [];
      // サンプル追加
      rects.push({
        x: 550,
        y: 60,
        width: 50,
        height: 40,
        xText: 25,
        yText: 10,
        id: 'green',
        color: 'yelow',
        stroke: 'black',
        text: '追加した',
        halfPosition: 2, // 1:左側 2:右側 0:指定なし
        week: 6,
      });

      this.rects = rects;
      this.$refs.childSelect.setSVG(this.rects);
      this.$refs.childInput.setSVG(this.rects);
    },
    /*************************
     * 追加ボタンを押下
     * 子メソッドを実行
     */
    addSchduleData() {
      this.$refs.childSelect.setScheduleData();
    },
    /*
     * 子から実行されるメソッド
     * svgを押下した時のposition
     */
    parentSetSVGPosition(e) {
      // 絶対座標系のSVG要素位置
      var offsetX = e.offsetX;
      var offsetY = e.offsetY;
      console.log(offsetX);
      console.log(offsetY);
      console.log(this.svgData);
    },
    /***************************
     * 子から日常生活・福祉サービスを押下
     */
    selectMethod(svgData) {
      this.svgData = svgData;
      console.log(svgData);
      // this.rects.push({
      //   x: 400,
      //   y: 300,
      //   width: 100,
      //   height: 40,
      //   xText: 50,
      //   yText: 10,
      //   id: 'green',
      //   color: 'green',
      //   stroke: 'black',
      //   text: svgData.life ? svgData.life : svgData.service,
      //   halfPosition: 0, // 1:左側 2:右側 0:指定なし
      //   week: 4,
      // });

      // this.$refs.childSelect.setSVG(this.rects);
      // this.$refs.childInput.setSVG(this.rects);
    },
    /***************************
     * 入力内容表示切替
     */
    displayPattern(type) {
      if (type == 0) {
        //週間予定
        this.$refs.childSelect.setGridHeight(type);
      } else {
        // 主な日常生活
        this.$refs.childInput.setGridHeight(type);
      }
      this.displayPatternFlag = type;
    },

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
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#samplecaleandar {
  margin-left: 0;
  margin-right: auto;
  max-width: 1028px;
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
      line-height: 20px;
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
  #lifeRadio {
    div {
      position: relative;
      width: 80px;
    }
    label {
      position: absolute;
      top: 1px;
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
