<template>
  <v-container id="samplecaleandar" class="pa-0">
    <v-row no-gutters class="mt-1">
      <v-col cols="*">
        <calendarDate ref="childcalendar"></calendarDate>
        <v-row
          no-gutters
          justify="center"
          align-content="center"
          class="textarea rowHeight mt-1"
        >
          <v-col cols="2" class="text-caption textareaRowTitle" align="center">
            <v-card outlined tile height="120"
              ><label>サービス提供によって実現する生活の全体像</label></v-card
            >
          </v-col>
          <v-col cols="10" class="text-caption textareaRowData">
            <v-card outlined tile height="120">
              <textarea v-model="textareaTotal"></textarea>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col><v-btn small>削除</v-btn></v-col>
          <v-col class="text-end"><v-btn small>登録</v-btn></v-col>
        </v-row>
      </v-col>
      <v-col class="ml-2" style="width: 100px">
        <v-row no-gutters class="textarea">
          <v-card tile elevation="0" outlined class="textareaTitle text-caption"
            >主な日常生活上の活動</v-card
          >
          <v-card class="textareaData" tile elevation="0" outlined>
            <textarea v-model="textareaLife"></textarea>
          </v-card>
        </v-row>
        <v-row no-gutters class="textarea mt-1">
          <v-card tile elevation="0" outlined class="textareaTitle text-caption"
            >週単位以外のサービス</v-card
          >
          <v-card class="textareaData" tile elevation="0" outlined>
            <textarea v-model="textareaService"></textarea>
          </v-card>
        </v-row>
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
      textareaLife: '',
      textareaService: '',
      textareaTotal: '',
    };
  },
  props: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    /*********************************
     * 親から実行
     * gridの表示用データ
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
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#samplecaleandar {
  .textarea {
    width: 100%;
    &.rowHeight {
      height: 120px;
    }
    .textareaTitle {
      width: 100%;
      text-align: center;
      background-color: $view_Data_Input_background;
    }
    .textareaRowTitle {
      div {
        background-color: $view_Data_Input_background;
        text-align: center;
        position: relative;
        label {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: 90%;
          height: 3.2rem;
        }
      }
    }
    .textareaData {
      width: 100%;

      textarea {
        height: 160px;
        width: 100%;
        resize: none;
        font-size: 10.5px;
        &:focus {
          outline: none;
        }
      }
    }
    .textareaRowData {
      width: 100%;
      textarea {
        width: 100%;
        resize: none;
        font-size: 10.5px;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
