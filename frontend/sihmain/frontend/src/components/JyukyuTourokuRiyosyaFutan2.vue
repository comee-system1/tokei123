<template>
  <div id="JyukyuTourokuRiyosyaFutan2" style="width: 530px">
    <v-container fluid class="riyosyafutan-container">
      <v-row no-gutters class="riyosyafutan-header-row">
        <v-card
          elevation="0"
          id="riyosyafutanheader"
          class="riyosyafutan-header d-flex flex-row"
          flat
          tile
        >
          <label class="riyosyafutan-header-title"
            >{{ this.titleNum }}利用者負担</label
          >
        </v-card>
      </v-row>
      <div style="height: 265px">
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
              :value="tesymd"
              v-model="tesymd"
              placeholder="開始日を選択"
            ></datepicker>
            &nbsp;～&nbsp;
            <datepicker
              :language="ja"
              class="input_picker"
              :format="DatePickerFormat"
              :value="teeymd"
              v-model="teeymd"
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
              v-model="fjyogen"
              :text="fjyogen"
            ></wj-combo-box>
            <label style="padding-top: 4px; padding-left: 4px">円</label>
          </v-card>
        </v-row>
        <v-row no-gutters class="riyosyafutan-jgenkbn-row">
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
            class="riyosyafutan-jgenkbn-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              row
              v-model="jgenkbn"
              class="riyosyafutan-jgenkbn-group"
            >
              <v-radio label="非該当" :key="1" :value="1"></v-radio>
              <v-radio label="該当" :key="2" :value="2"></v-radio>
            </v-radio-group>
          </v-card>
        </v-row>
        <v-row no-gutters class="riyosyafutan-jgenknrikbn-row">
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
            class="riyosyafutan-jgenknrikbn-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              row
              v-model="jgenknrikbn"
              class="riyosyafutan-jgenknrikbn-group"
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
                    class="riyosyafutan-jgenknrikbn-input"
                    :textChanged="onTextChanged"
                    v-model="jgenname"
                    :text="jgenname"
                  ></wj-combo-box>
                  <wj-combo-box
                    class="riyosyafutan-jgenknrikbn-input2"
                    :textChanged="onTextChanged"
                    v-model="jgenryaku"
                    :text="jgenryaku"
                  ></wj-combo-box>
                </v-card>
              </v-card>
            </v-radio-group>
          </v-card>
        </v-row>
        <!-- <v-row no-gutters class="riyosyafutan-TajigyosyoRiyoService-row">
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
      </v-row> -->
        <v-row no-gutters class="riyosyafutan-sykksn-row">
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
            class="riyosyafutan-sykksn-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              row
              v-model="sykksn"
              class="riyosyafutan-sykksn-group"
            >
              <v-radio label="非該当" :key="1" :value="1"></v-radio>
              <v-radio label="該当" :key="2" :value="2"></v-radio>
            </v-radio-group>
          </v-card>
        </v-row>
        <v-row no-gutters class="riyosyafutan-tkkfhi-row">
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
            class="riyosyafutan-tkkfhi-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              row
              v-model="tkkfhiKbn"
              class="riyosyafutan-tkkfhi-group"
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
                    class="riyosyafutan-tkkfhi-input"
                    :textChanged="onTextChanged"
                    v-model="tkkfhiValue"
                    :text="tkkfhiValue"
                  ></wj-combo-box>
                  <label style="padding-top: 4px; padding-left: 4px"
                    >円／日</label
                  >
                </v-card>
              </v-card>
            </v-radio-group>
          </v-card>
        </v-row>
      </div>
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
      mode: '',
      subGridSelected: false,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),

      jyogenid: 0,
      jyukyuid: 0,

      tesymd: '',
      teeymd: '',

      ftn: 0,
      fjyogen: 0,

      jgenkbn: -1,
      jgenknrikbn: -1,
      jgenknri: 0,
      jgenname: '',
      jgenryaku: '',

      sykksn: -1,

      tkkfhi: -1,
      tkkfhi12: 0,
      tkkfhiKbn: 0,
      tkkfhiValue: '',

      syafukug: 0,
      kyftok: 0,
      kyuftokkbn: 0,
      tasikgn: 0,
      mushojdo: 0,

      riyosyafutanTajigyosyoRiyoServiceData: this.getTajigyosyoRiyoService(),
    };
  },
  props: ['titleNum'],
  components: {
    Datepicker,
  },
  mounted() {},
  methods: {
    changeMode() {
      return this.mode === 'modRiyosyafutan';
    },
    setTrunModify() {
      this.setButtonColor('modifyButtonRiyosyafutan', true);
      this.setButtonColor('addButtonRiyosyafutan', false);
      this.$emit('setMode', 'modRiyosyafutan');
    },
    setTrunAdd() {
      this.setButtonColor('modifyButtonRiyosyafutan', false);
      this.setButtonColor('addButtonRiyosyafutan', true);
      this.$emit('setMode', 'modRiyosyafutan');
    },
    cancel() {
      this.setButtonColor('modifyButtonRiyosyafutan', false);
      this.setButtonColor('addButtonRiyosyafutan', false);
      this.$emit('setMode', 'new');
      this.changeMode();
    },
    setButtonColor(id, on) {
      var targetbtn = document.getElementById(id);
      if (targetbtn != null) {
        targetbtn.style.color = on ? '#fff' : 'black';
        targetbtn.style.backgroundColor = on ? '#444' : '#f5f5f5';
      }
    },
    setData(selectedData) {
      this.clearData();
      if (selectedData.length > 0) {
        this.setdata(selectedData[0]);
      }
      this.$emit('setMode', 'new');
    },
    setdata(data) {
      if (data.tesymd.length > 0) {
        this.jyogenid = data.jyogenid; //利用者負担関係内部ID
        this.jyukyuid = data.jyukyuid; //受給者証内部ID

        this.tesymd = moment(data.tesymd).format('YYYY-M-D'); //適用開始日
        if (data.teeymd != '99991231') {
          this.teeymd = moment(data.teeymd).format('YYYY-M-D'); //適用終了日
        }

        this.ftn = data.ftn; //利用者負担割合
        this.fjyogen = data.fjyogen; //利用者負担上限月額

        this.jgenkbn = data.jgenkbn; //上限管理対象区分
        this.jgenknrikbn = data.jgenknrikbn; //上限管理委託事業者区分
        this.jgenknri = data.jgenknri; //上限管理委託事業者内部ID
        this.jgenname = data.jgenname; //上限管理事業者名
        this.jgenryaku = data.jgenryaku; //上限管理事業者略称

        this.sykksn = data.sykksn; //食事提供加算

        this.tkkfhi = data.tkkfhi; //特定障害者特別給付費
        this.tkkfhi12 = data.tkkfhi12; //特定障害者特別給付費(GH/CH)
        if (data.tkkfhi == 0 && this.tkkfhi12 == 0) {
          this.tkkfhiKbn = 0;
          this.tkkfhiValue = 0;
        } else if (data.tkkfhi > 0) {
          this.tkkfhiKbn = 1;
          this.tkkfhiValue = data.tkkfhi;
        } else if (data.tkkfhi12 > 0) {
          this.tkkfhiKbn = 2;
          this.tkkfhiValue = data.tkkfhi12;
        }

        this.syafukug = data.syafukug; //社会福祉法人減額
        this.kyftok = data.kyftok; //給付費等の額の特例
        this.kyuftokkbn = data.kyuftokkbn; //給付費等の額の特例の有無
        this.tasikgn = data.tasikgn; //多子軽減対象
        this.mushojdo = data.mushojdo; //無償化対象児童

        this.isModify = true;
      }
    },
    clearData() {
      this.jyogenid = 0;
      this.jyukyuid = 0;

      this.tesymd = '';
      this.teeymd = '';

      this.ftn = 0;
      this.fjyogen = 0;

      this.jgenkbn = 0;
      this.jgenknrikbn = -1;
      this.jgenknri = 0;
      this.jgenname = '';
      this.jgenryaku = '';

      this.sykksn = -1;

      this.tkkfhi = 0;
      this.tkkfhi12 = 0;
      this.tkkfhiKbn = -1;
      this.tkkfhiValue = 0;

      this.syafukug = 0;
      this.kyftok = 0;
      this.kyuftokkbn = 0;
      this.tasikgn = 0;
      this.mushojdo = 0;
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
    onTextChanged(txb) {},
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      if (this.mode !== 'new' && this.mode !== 'modRiyosyafutan') {
        this.setButtonColor('modifyButtonRiyosyafutan', false);
        this.setButtonColor('addButtonRiyosyafutan', false);
      }
    },
    /****************
     * グリッド選択情報
     */
    setSubGridSelected(seleced) {
      this.$emit('setSubGridSelected', seleced);
    },
    setSubGridSelectedFromParent(seleced) {
      this.subGridSelected = seleced;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#JyukyuTourokuRiyosyaFutan2 {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
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

  .riyosyafutan-jgenkbn-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-jgenkbn-selection {
      height: 100%;
      padding-left: 0px;
      .riyosyafutan-jgenkbn-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -18px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }

  .riyosyafutan-jgenknrikbn-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-jgenknrikbn-selection {
      width: 400px;
      height: 100%;
      margin-left: 4px;
      .riyosyafutan-jgenknrikbn-group {
        margin-top: -10px;
        margin-left: -49px;
        padding-top: -50px;
        transform: scale(0.75);
      }
      .riyosyafutan-jgenknrikbn-input {
        height: 25px;
        margin-left: -1px;
        border-radius: revert;
        border-radius: 3px;
      }
      .riyosyafutan-jgenknrikbn-input.wj-control .wj-input {
        width: 300px;
      }
      .riyosyafutan-jgenknrikbn-input2 {
        height: 25px;
        margin-left: -1px;
        border-radius: revert;
        border-radius: 3px;
      }
      .riyosyafutan-jgenknrikbn-input2.wj-control .wj-input {
        width: 200px;
      }
    }
  }

  .riyosyafutan-TajigyosyoRiyoService-row {
    height: 100px;
    margin: 4px 4px 0px 4px;
  }

  .riyosyafutan-sykksn-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-sykksn-selection {
      height: 100%;
      padding-left: 0px;
      .riyosyafutan-sykksn-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -20px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }

  .riyosyafutan-tkkfhi-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    .riyosyafutan-tkkfhi-selection {
      width: 400px;
      height: 100%;
      margin-left: 4px;
      .riyosyafutan-tkkfhi-group {
        margin-top: -10px;
        margin-left: -49px;
        padding-top: -50px;
        transform: scale(0.75);
      }
      .riyosyafutan-tkkfhi-input {
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