<template>
  <div id="JyukyuTourokuRiyosyaFutan" :style="mainHeight">
    <v-container fluid class="riyosyafutan-container">
      <v-row no-gutters class="riyosyafutan-header-row">
        <v-card
          elevation="0"
          class="riyosyafutan-header d-flex flex-row"
          flat
          tile
        >
          <label class="riyosyafutan-header-title"
            >{{ this.titleNum }}利用者負担</label
          >
          <v-card
            v-if="$_subGridSelected()"
            elevation="0"
            class="riyosyafutan-header d-flex flex-row-reverse"
            flat
            tile
          >
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              修正</v-btn
            >
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              追加</v-btn
            >
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-tekiyokikan-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length4 d-flex flex-row"
          flat
          tile
        >
          適用期間
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="riyosyafutan-tekiyokikan-picker d-flex flex-row"
        >
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="sienkubunymdStart"
            v-model="sienkubunymdStart"
            placeholder="開始日を選択"
          ></datepicker>
          &nbsp;～&nbsp;
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="sienkubunymdEnd"
            v-model="sienkubunymdEnd"
            placeholder="終了日を選択"
          ></datepicker>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-futanjougengetugaku-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length6 d-flex flex-row"
          flat
          tile
        >
          負担上限月額
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="riyosyafutan-futanjougengetugaku-input d-flex flex-row"
        >
          <wj-combo-box
            class="riyosyafutan-futanjougengetugaku-input2"
            :textChanged="onTextChanged"
          ></wj-combo-box>
          <label style="padding-top: 4px; padding-left: 4px">円</label>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-jougenkanritaisyo-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length6 d-flex flex-row"
          flat
          tile
        >
          上限管理対象
        </v-card>
        <v-card
          elevation="0"
          class="riyosyafutan-jougenkanritaisyo-selection d-flex flex-row"
          flat
          tile
        >
          <v-radio-group
            row
            v-model="jougenkanritaisyo"
            class="riyosyafutan-jougenkanritaisyo-group"
          >
            <v-radio label="非該当" :key="1" :value="1"></v-radio>
            <v-radio label="該当" :key="0" :value="0"></v-radio>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-jougenkanrijigyosyo-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length4 d-flex flex-row"
          style="padding-top: 5px"
          flat
          tile
        >
          上限管理<br />事業所
        </v-card>
        <v-card
          elevation="0"
          class="riyosyafutan-jougenkanrijigyosyo-selection d-flex flex-row"
          flat
          tile
        >
          <v-radio-group
            row
            v-model="jougenkanrijigyosyo"
            class="riyosyafutan-jougenkanrijigyosyo-group"
          >
            <v-card elevation="0" flat tile>
              <v-card elevation="0" class="d-flex flex-row" flat tile>
                <v-radio label="自施設事業所" :key="0" :value="0"></v-radio>
                <v-radio label="他施設事業所" :key="1" :value="1"></v-radio>
              </v-card>
              <v-card
                elevation="0"
                style="padding-top: 6px; padding-left: 4px"
                class="d-flex flex-row"
                flat
                tile
              >
                <wj-combo-box
                  class="riyosyafutan-jougenkanrijigyosyo-input"
                  :textChanged="onTextChanged"
                ></wj-combo-box>
                <wj-combo-box
                  class="riyosyafutan-jougenkanrijigyosyo-input2"
                  :textChanged="onTextChanged"
                ></wj-combo-box>
              </v-card>
            </v-card>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-TajigyosyoRiyoService-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length6 d-flex flex-row"
          style="height: 100px; padding-top: 30px"
          flat
          tile
        >
          他施設事業所<br />利用サービス
        </v-card>
        <v-card elevation="0" flat tile>
          <wj-flex-grid
            id="gridTajigyosyoRiyoService"
            :initialized="onInitializedTajigyosyoRiyoService"
            :itemsSource="riyosyafutanTajigyosyoRiyoServiceData"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :isReadOnly="true"
            :alternatingRowStep="0"
            :selectionMode="'Row'"
            style="
              width: 400px;
              height: 100px;
              border-bottom: none;
              border-right: none;
              font-size: 12px;
              margin-left: 4px;
              border-radius: 2px;
            "
          >
            <wj-flex-grid-column
              :binding="'kouban'"
              :header="'項番'"
              :allowMerging="false"
              :width="50"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'jigyonum'"
              :header="'事業所番号'"
              :allowMerging="false"
              :width="100"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'jigyoname'"
              :header="'事業所名'"
              :allowMerging="false"
              width="*"
              align="left"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-syokujiteikyotaisei-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length6 d-flex flex-row"
          flat
          tile
        >
          食事提供体制
        </v-card>
        <v-card
          elevation="0"
          class="riyosyafutan-syokujiteikyotaisei-selection d-flex flex-row"
          flat
          tile
        >
          <v-radio-group
            row
            v-model="syokujiteikyotaisei"
            class="riyosyafutan-syokujiteikyotaisei-group"
          >
            <v-radio label="非該当" :key="1" :value="1"></v-radio>
            <v-radio label="該当" :key="0" :value="0"></v-radio>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row no-gutters class="riyosyafutan-tokutetokubetukyufuhi-row">
        <v-card
          elevation="0"
          class="riyosyafutan-title-length5 d-flex flex-row"
          style="padding-top: 5px"
          flat
          tile
        >
          特定<br />特別給付費
        </v-card>
        <v-card
          elevation="0"
          class="riyosyafutan-tokutetokubetukyufuhi-selection d-flex flex-row"
          flat
          tile
        >
          <v-radio-group
            row
            v-model="tokutetokubetukyufuhi"
            class="riyosyafutan-tokutetokubetukyufuhi-group"
          >
            <v-card elevation="0" flat tile>
              <v-card elevation="0" class="d-flex flex-row" flat tile>
                <v-radio label="非当該" :key="0" :value="0"></v-radio>
                <v-radio label="施設入所支援" :key="1" :value="1"></v-radio>
                <v-radio label="共同生活援助" :key="2" :value="2"></v-radio>
              </v-card>
              <v-card
                elevation="0"
                style="padding-top: 6px; padding-left: 4px"
                class="d-flex flex-row"
                flat
                tile
              >
                <wj-combo-box
                  class="riyosyafutan-tokutetokubetukyufuhi-input"
                  :textChanged="onTextChanged"
                ></wj-combo-box>
                <label style="padding-top: 4px; padding-left: 4px"
                  >円／日</label
                >
              </v-card>
            </v-card>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row
        v-if="$_msg() === 'modRiyosyafutan'"
        no-gutters
        class="riyosyafutan-button-row"
      >
        <v-btn class="cancel-button" @click="openDialog_Term('regist')">
          キャンセル</v-btn
        >
        <v-card
          elevation="0"
          class="riyosyafutan-bottom-regist d-flex flex-row-reverse"
          flat
          tile
        >
          <v-btn class="regist-button" @click="openDialog_Term('regist')">
            登 録</v-btn
          >
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.input';
export default {
  data() {
    return {
      ja: ja,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      jougenkanritaisyo: -1,
      jougenkanrijigyosyo: -1,
      riyosyafutanTajigyosyoRiyoServiceData: this.getTajigyosyoRiyoService(),
      syokujiteikyotaisei: -1,
      tokutetokubetukyufuhi: -1,
    };
  },
  props: ['titleNum'],
  components: {
    Datepicker,
  },
  mounted() {
    this.Resize();
  },
  methods: {
    Resize() {
      let height = '';
      if (this.$_msg() === 'new') {
        height = 'calc((29px * 11))';
      } else {
        height = 'calc((29px * 12) + 4px)';
      }
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.$_setMsg('modRiyosyafutan');
      this.Resize();
    },
    getTajigyosyoRiyoService() {
      let result = [];
      result.push(
        {
          kouban: '1',
          jigyonum: '1100112345',
          jigyoname: 'たんぽぽ就労事業所',
        },
        {
          kouban: '2',
          jigyonum: '1100155345',
          jigyoname: 'さくら訪問介護事業所',
        },
        {
          kouban: '事業所を追加',
          jigyonum: '事業所を追加',
          jigyoname: '事業所を追加',
        }
      );
      return result;
    },
    onInitializedTajigyosyoRiyoService(grd) {
      grd.beginUpdate();
      grd.cells.rows.defaultSize = 24;

      grd.endUpdate();
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#JyukyuTourokuRiyosyaFutan {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  height: calc(29px * 12);
  .riyosyafutan-container {
    padding: 0px !important;
  }
  .riyosyafutan-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .riyosyafutan-header {
      width: 100%;
      height: 100%;
      background-color: #c6c6c6;
    }
    .riyosyafutan-header-title {
      width: 200px;
      height: 25px;
      padding: 2px 0px 0px 8px;
      color: black;
    }
  }

  .riyosyafutan-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .riyosyafutan-title-length5 {
    width: 100px;
    padding: 2px 0px 0px 14px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .riyosyafutan-title-length6 {
    width: 100px;
    padding: 2px 0px 0px 8px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .riyosyafutan-tekiyokikan-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .riyosyafutan-tekiyokikan-picker {
      padding: 0px 0px 0px 4px;
    }
  }

  .riyosyafutan-futanjougengetugaku-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .riyosyafutan-futanjougengetugaku-input {
      height: 100%;
    }
    .riyosyafutan-futanjougengetugaku-input2 {
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .riyosyafutan-futanjougengetugaku-input2.wj-control .wj-input {
      width: 100px;
      text-align: right;
    }
  }

  .riyosyafutan-jougenkanritaisyo-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-jougenkanritaisyo-selection {
      height: 100%;
      padding-left: 0px;
      .riyosyafutan-jougenkanritaisyo-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -18px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }

  .riyosyafutan-jougenkanrijigyosyo-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-jougenkanrijigyosyo-selection {
      width: 400px;
      height: 100%;
      margin-left: 4px;
      .riyosyafutan-jougenkanrijigyosyo-group {
        margin-top: -10px;
        margin-left: -49px;
        padding-top: -50px;
        transform: scale(0.75);
      }
      .riyosyafutan-jougenkanrijigyosyo-input {
        height: 25px;
        margin-left: -1px;
        border-radius: revert;
        border-radius: 3px;
      }
      .riyosyafutan-jougenkanrijigyosyo-input.wj-control .wj-input {
        width: 300px;
      }
      .riyosyafutan-jougenkanrijigyosyo-input2 {
        height: 25px;
        margin-left: -1px;
        border-radius: revert;
        border-radius: 3px;
      }
      .riyosyafutan-jougenkanrijigyosyo-input2.wj-control .wj-input {
        width: 200px;
      }
    }
  }

  .riyosyafutan-TajigyosyoRiyoService-row {
    height: 100px;
    margin: 4px 4px 0px 4px;
  }

  .riyosyafutan-syokujiteikyotaisei-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-syokujiteikyotaisei-selection {
      height: 100%;
      padding-left: 0px;
      .riyosyafutan-syokujiteikyotaisei-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -20px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }

  .riyosyafutan-tokutetokubetukyufuhi-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-tokutetokubetukyufuhi-selection {
      width: 400px;
      height: 100%;
      margin-left: 4px;
      .riyosyafutan-tokutetokubetukyufuhi-group {
        margin-top: -10px;
        margin-left: -49px;
        padding-top: -50px;
        transform: scale(0.75);
      }
      .riyosyafutan-tokutetokubetukyufuhi-input {
        width: 100px;
        height: 25px;
        margin-left: -1px;
        border-radius: revert;
        border-radius: 3px;
      }
      .wj-control .wj-input {
        width: 50px;
      }
    }
  }

  // スクロールバーの表示
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }

  .riyosyafutan-button-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .cancel-button {
      height: 25px;
      width: 100px;
      text-align: center;
      margin-top: 2px;
      border-radius: 3px;
      border: 1px solid $light-gray;
    }
    .riyosyafutan-bottom-regist {
      width: calc(100% - 100px);
      float: right;
      .regist-button {
        height: 25px;
        width: 100px;
        color: $white;
        background-color: #027eb0;
        text-align: center;
        margin-top: 2px;
        border-radius: 3px;
        &:hover {
          background-color: #005f85;
        }
      }
    }
  }
}
// 追加ボタン
a {
  &.syubetu-add-button {
    height: 25px;
    width: 150px;
    background-color: $white;
    border: 1px solid $font_color;
    display: block;
    float: left;
    color: $font_color !important;
    text-align: left;
    border-radius: 3px;
    padding: 2px 0px 0px 20px;
    margin-top: 2px;
    margin-left: 4px;
    cursor: pointer;
    background-image: url('../assets/plus_gray_15px.png');
    background-position: top 4px left 1px;
    &:hover {
      background-color: $selected_color;
    }
  }
}
</style>