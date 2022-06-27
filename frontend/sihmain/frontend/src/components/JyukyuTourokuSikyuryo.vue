<template>
  <div id="JyukyuTourokuSikyuryo" :style="mainHeight">
    <v-container fluid class="sikyuryo-container">
      <v-row no-gutters class="sikyuryo-header-row">
        <v-card elevation="0" class="sikyuryo-header d-flex flex-row" flat tile>
          <label class="sikyuryo-header-title"
            >{{ this.titleNum }}支給決定内容</label
          >
          <v-card
            v-if="$_subGridSelected()"
            elevation="0"
            class="sikyuryo-header d-flex flex-row-reverse"
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
      <!-- <v-card elevation="0" v-for="(item, index) in serviceSyubetu" :key="item.servicecode" flat tile> -->
      <v-card
        elevation="0"
        v-for="item in serviceSyubetu"
        :key="item.servicecode"
        flat
        tile
      >
        <v-row no-gutters class="sikyuryo-servicesyubetu-row">
          <v-card
            elevation="0"
            class="sikyuryo-title-length6 d-flex flex-row"
            flat
            tile
          >
            サービス種別
          </v-card>
          <p class="required">*</p>
          <v-card class="sikyuryo-servicesyubetu-disp" outlined>
            {{ item.servicename }}
          </v-card>
        </v-row>
        <v-row
          v-show="item.sikyuryotouDisp"
          no-gutters
          class="sikyuryo-sikyuryotou-row"
        >
          <v-card
            elevation="0"
            class="sikyuryo-title-length4 d-flex flex-row"
            style="height: 50px; padding-top: 15px"
            flat
            tile
          >
            支給量等
          </v-card>
          <p class="required">*</p>
          <v-card
            elevation="0"
            class="sikyuryo-sikyuryotou-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              v-model="sikyuryotou"
              class="sikyuryo-sikyuryotou-group"
            >
              <v-card elevation="0" flat tile>
                <v-card elevation="0" class="d-flex flex-row" flat tile>
                  <v-radio
                    label="当該月の日数より８日除いた日数"
                    :key="1"
                    :value="1"
                  ></v-radio>
                </v-card>
                <v-card elevation="0" class="d-flex flex-row" flat tile>
                  <v-radio
                    style="margin-top: 6px"
                    label=""
                    :key="0"
                    :value="0"
                  ></v-radio>
                  <wj-combo-box
                    class="sikyuryo-sikyuryotou-input"
                    :textChanged="onTextChanged"
                  ></wj-combo-box>
                  <label style="padding-top: 4px; padding-left: 4px"
                    >日／月</label
                  >
                </v-card>
              </v-card>
            </v-radio-group>
          </v-card>
        </v-row>
        <v-row
          v-show="item.sikyukikanDisp"
          no-gutters
          class="sikyuryo-sikyukikan-row"
        >
          <v-card
            elevation="0"
            class="sikyuryo-title-length4 d-flex flex-row"
            flat
            tile
          >
            支給期間
          </v-card>
          <p class="required">*</p>
          <v-card
            elevation="0"
            class="sikyuryo-sikyukikan-picker d-flex flex-row"
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
        <v-row
          v-show="item.kasankoumokuDisp"
          no-gutters
          class="sikyuryo-kasankoumoku-row"
        >
          <v-card
            elevation="0"
            class="sikyuryo-title-length4 d-flex flex-row"
            style="height: 50px; padding-top: 15px"
            flat
            tile
          >
            加算項目
          </v-card>
          <v-card elevation="0" flat tile>
            <wj-flex-grid
              id="gridKasankoumoku"
              class="no-scrollbars"
              :initialized="onInitializedKasankoumoku"
              :itemsSource="item.sikyuryoKasankoumokuData"
              :headersVisibility="'None'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowDragging="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :isReadOnly="true"
              :alternatingRowStep="0"
              :selectionMode="'None'"
              style="
                width: 300px;
                height: 51px;
                border-bottom: none;
                border-right: none;
                font-size: 12px;
                margin-left: 4px;
                border-radius: 2px;
              "
            >
              <wj-flex-grid-column
                :binding="'value'"
                :allowMerging="true"
                width="*"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-card>
        </v-row>
        <v-row
          v-show="item.keikasotiDisp"
          no-gutters
          class="sikyuryo-keikasoti-row"
        >
          <v-card
            elevation="0"
            class="sikyuryo-title-length4 d-flex flex-row"
            flat
            tile
          >
            経過措置
          </v-card>
          <v-card
            elevation="0"
            class="sikyuryo-keikasoti-selection d-flex flex-row"
            flat
            tile
          >
            <v-radio-group
              row
              v-model="item.keikasoti"
              class="sikyuryo-keikasoti-group"
            >
              <v-radio label="非該当" :key="1" :value="1"></v-radio>
              <v-radio label="該当" :key="0" :value="0"></v-radio>
            </v-radio-group>
          </v-card>
        </v-row>
        <!-- <v-divider color="#ce3e47" height="20px" style="margin: 4px;" v-show="serviceSyubetu.length-1!=index"></v-divider> -->
        <v-divider
          color="#ce3e47"
          height="20px"
          style="margin: 4px"
        ></v-divider>
      </v-card>
      <v-row no-gutters class="sikyuryo-addbutton-row">
        <v-btn
          class="sikyuryo-add-button"
          style="height: 30px"
          @click="openDialog_Term('add_new')"
        >
          サービス種別を追加</v-btn
        >
      </v-row>
      <v-row
        v-if="$_mode() === 'modSikyuryo'"
        no-gutters
        class="sikyuryo-button-row"
      >
        <v-btn class="cancel-button" @click="openDialog_Term('regist')">
          キャンセル</v-btn
        >
        <v-card
          elevation="0"
          class="sikyuryo-bottom-regist d-flex flex-row-reverse"
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
      serviceSyubetu: this.getServiceSyubetu(),
      sikyuryotou: -1,
      sienkubunymdStart: '',
      sienkubunymdEnd: '',
      sienkubunymdStart: '',
      sienkubunymdEnd: '',
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
      if (this.$_mode() === 'new') {
        height = 'calc((29px * 14.1))';
      } else {
        height = 'calc((29px * 15.1) + 4px)';
      }
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.$_setMode('modSikyuryo');
      this.Resize();
    },
    getServiceSyubetu() {
      let serviceSyubetu = [];
      serviceSyubetu.push(
        {
          servicecode: '22',
          servicename: '生活支援',
          keikasoti: -1,
          sikyuryotouDisp: false,
          sikyukikanDisp: true,
          kasankoumokuDisp: true,
          keikasotiDisp: true,
          sikyuryoKasankoumokuData: [
            { value: '加算項目を選択' },
            { value: '' },
          ],
        },
        {
          servicecode: '32',
          servicename: '施設入所支援',
          keikasoti: -1,
          sikyuryotouDisp: true,
          sikyukikanDisp: true,
          kasankoumokuDisp: true,
          keikasotiDisp: true,
          sikyuryoKasankoumokuData: [
            { value: '重度障害者支援加算' },
            { value: '加算項目を選択' },
          ],
        }
      );
      return serviceSyubetu;
    },
    onInitializedKasankoumoku(grd) {
      grd.beginUpdate();
      grd.cells.rows.defaultSize = 25;

      grd.endUpdate();
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#comboSienkubun {
  .wj-btn.wj-btn-default {
    border-left: none;
  }
}

div#JyukyuTourokuSikyuryo {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  height: calc(29px * 14.1);
  .sikyuryo-container {
    padding: 0px !important;
  }
  .sikyuryo-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .sikyuryo-header {
      width: 100%;
      height: 100%;
      background-color: #c6c6c6;
    }
    .sikyuryo-header-title {
      height: 25px;
      width: 200px;
      padding: 2px 0px 0px 8px;
      color: black;
    }
  }

  .sikyuryo-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .sikyuryo-title-length6 {
    width: 100px;
    padding: 2px 0px 0px 8px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .sikyuryo-servicesyubetu-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .sikyuryo-servicesyubetu-disp {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color: white;
      border-radius: 2px;
      text-align: left;
      padding: 2px 0px 0px 4px;
    }
  }

  .sikyuryo-sikyuryotou-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .sikyuryo-sikyuryotou-selection {
      height: 100%;
      margin-left: 4px;
      .sikyuryo-sikyuryotou-group {
        width: 400px;
        margin-top: -5px;
        margin-left: -45px;
        padding-top: -50px;
        transform: scale(0.75);
      }
      .sikyuryo-sikyuryotou-input {
        height: 25px;
      }
      .sikyuryo-sikyuryotou-input.wj-control .wj-input {
        width: 60px;
        text-align: center;
      }
    }
  }

  .sikyuryo-sikyukikan-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .sikyuryo-sikyukikan-picker {
      padding: 0px 0px 0px 4px;
    }
  }

  .sikyuryo-kasankoumoku-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
  }

  .no-scrollbars.wj-flexgrid [wj-part='root'] {
    overflow: hidden !important;
  }

  .sikyuryo-keikasoti-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .sikyuryo-keikasoti-selection {
      height: 100%;
      padding-left: 0px;
      .sikyuryo-keikasoti-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -20px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }

  .sikyuryo-button-row {
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
    .sikyuryo-bottom-regist {
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
.sikyuryo-addbutton-row {
  height: 30px;
  margin: 4px 4px 0px 4px;
  // 追加ボタン
  .sikyuryo-add-button {
    width: 180px;
    margin-left: 4px;
    border: 1px solid $light-gray;
    background-image: url('../assets/plus_gray_15px.png');
    background-position: top 6px left 1px;
  }
}
</style>