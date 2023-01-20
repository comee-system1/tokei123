<template>
  <v-container id="samplecaleandar" class="pa-0">
    <v-row no-gutters class="mt-1">
      <v-col cols="*">
        <calendarDate
          ref="childcalendar"
          @childSetSVGPosition="childSetSVGPosition"
          @settedRect="settedRect"
        ></calendarDate>

        <v-row class="completeArea">
          <v-col>
            <v-btn small>削除</v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <label class="text-caption">完了</label>
            <input
              type="checkbox"
              name="completeFlag"
              v-model="completeFlag"
              class="ml-1"
            />
            <v-card
              class="completeText ml-1"
              outlined
              tile
              elevation="0"
            ></v-card>
            <v-btn small tile class="ml-1 text-caption">登録</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-2" style="width: 100px">
        <v-card class="d-flex text-caption" id="lifeRadio" elevation="0">
          <div v-for="val in lifeRadio" :key="val.id">
            <input
              type="radio"
              :id="'radio_' + val.id"
              name="radio"
              v-model="radio"
              :value="val.id"
            />
            <label :for="'radio_' + val.id">{{ val.value }}</label>
          </div>
        </v-card>
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
        <wj-flex-grid
          id="serviceLife"
          :autoSearch="true"
          :headersVisibility="'Column'"
          :selectionMode="3"
          :initialized="onInitializedService"
          :itemsSourceChanged="onInitializedLifeChanged"
          :itemsSource="serviceViewData"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="true"
          :alternating-row-step="0"
        >
          <wj-flex-grid-column
            header="福祉サービス"
            binding="service"
            width="*"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import calendarDate from '../components/MonitoringSampleCaleandarDate';
export default {
  components: {
    calendarDate,
  },
  data() {
    return {
      completeFlag: false,
      radio: 1,
      lifeRadio: [
        { id: 1, value: '項目選択' },
        { id: 2, value: 'フリー入力' },
      ],
      serviceViewData: [],
      lifeViewData: [],
      flexGridLife: '',
      flexGridService: '',
    };
  },
  props: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    /*************************
     * 子からの実行関数
     * svg表示用データ登録
     */
    settedRect() {
      this.$emit('settedRect');
    },
    /**************************
     * 親からの実行関数
     * スケジュール設定用ダイアログ入力用
     */
    setScheduleData() {
      this.$refs.childcalendar.setScheduleData(
        this.lifeViewData,
        this.serviceViewData
      );
    },
    /****************************
     * 子供から実行の関数
     * svg表示用のpositionデータ
     */
    childSetSVGPosition(e) {
      // // 絶対座標系のSVG要素位置
      // var offsetX = e.offsetX;
      // var offsetY = e.offsetY;
      // alert(offsetX);
      // alert(offsetY);
      // alert('jjjj');
      this.$emit('parentSetSVGPosition', e);
    },
    /*********************************
     * 親から実行
     * svgの表示用データ
     */
    setSVG(data) {
      this.$refs.childcalendar.setSVG(data);
    },
    /*********************************
     * 親から実行
     * gridの高さ指定のための関数
     */
    setGridHeight(type) {
      // 子メソッドの実行
      this.$refs.childcalendar.setGridHeight(type);
    },

    /**********************
     * 日常生活のgrid
     */
    onInitializedLife(flexGrid) {
      this.flexGridLife = flexGrid;
      let lifeViewData = [];
      lifeViewData.push({ life: '起床' });
      lifeViewData.push({ life: '就寝' });
      lifeViewData.push({ life: '洗顔・歯磨き' });
      lifeViewData.push({ life: '朝食' });
      lifeViewData.push({ life: '昼食' });
      this.lifeViewData = lifeViewData;
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          _self.flexGridService.select(-1, -1);
          _self.$emit('calendarSelectMethod', lifeViewData[ht.row]);
        }
      });
    },
    onInitializedLifeChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    onInitializedService(flexGrid) {
      this.flexGridService = flexGrid;

      let serviceViewData = [];
      serviceViewData.push({ service: 'ヘルパー' });
      serviceViewData.push({ service: '生活サポート' });
      serviceViewData.push({ service: '地域活動支援センター' });
      serviceViewData.push({ service: '生活介護' });
      serviceViewData.push({ service: '就労移行支援' });
      this.serviceViewData = serviceViewData;

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          _self.flexGridLife.select(-1, -1);
          _self.$emit('calendarSelectMethod', serviceViewData[ht.row]);
        }
      });
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

  .completeArea {
    label {
      background-color: $view_Title_background_Main;
      color: $white;
      width: 60px;
      text-align: center;
      line-height: 30px;
    }
    input[type='checkbox'] {
      height: 25px;
      width: 25px;
    }
    .completeText {
      background-color: $light_yellow;
      width: 200px;
    }
  }

  #serviceLife,
  #gridLife {
    .wj-header {
      background-color: $light_yellow;
      &.wj-cell {
        text-align: center;
      }
    }
    .wj-cell {
      font-size: 11px;
      text-align: left;
    }
  }
}
</style>
