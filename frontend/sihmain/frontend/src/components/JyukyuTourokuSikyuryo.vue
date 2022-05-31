<template>
  <div id="JyukyuTourokuSikyuryo">
    <v-container fluid class="sikyuryo-container">
      <v-row no-gutters class="sikyuryo-header-row">
        <v-card elevation="0" class="sikyuryo-header d-flex flex-row" flat tile>
          <label class="sikyuryo-header-title">②支給決定内容</label>
        </v-card>
      </v-row>
      <!-- <v-card elevation="0" v-for="(item, index) in serviceSyubetu" :key="item.servicecode" flat tile> -->
      <v-card elevation="0" v-for="(item) in serviceSyubetu" :key="item.servicecode" flat tile>
        <v-row no-gutters class="sikyuryo-servicesyubetu-row">          
          <v-card elevation="0" class="sikyuryo-title-length6 d-flex flex-row" flat tile>
            サービス種別
          </v-card>
          <p class="required">*</p>	
          <v-card class="sikyuryo-servicesyubetu-disp" outlined>
            {{ item.servicename }}
          </v-card>
        </v-row>
        <v-row v-show="item.sikyuryotou" no-gutters class="sikyuryo-sikyuryotou-row">
          <v-col backgroudcolor="red">
            <v-card elevation="0" class="sikyuryo-title-length4 d-flex flex-row" style="height: 50px; padding-top: 15px;" flat tile>
              支給量等
            </v-card>
            <p class="required">*</p>	
          </v-col>
          <v-col>
            <v-radio-group v-model="sikyuryotou" class="sikyuryo-sikyuryotou-group">
              <v-row no-gutters style="width: 80%">
                <v-radio label="当該月の日数より８日除いた日数" :key="1" :value="1"></v-radio>
              </v-row>
              <v-row no-gutters style="width: 80%">
                <v-radio label="" :key="0" :value="0"></v-radio>
                <wj-combo-box
                  class="sikyuryo-sikyuryotou-input"
                  :textChanged="onTextChanged"
                  placeholder="番号を入力"
                ></wj-combo-box>日／月
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <!-- <v-divider style="margin: 4px; color: black;" v-show="serviceSyubetu.length-1!=index"></v-divider> -->
        <v-divider color="darkgray" height="20px" style="margin: 4px;"></v-divider>
      </v-card>
      <v-row no-gutters class="sikyuryo-button-row">
        <v-card elevation="0" class="sikyuryo-button-new d-flex flex-row" flat tile>
          <a class="syubetu-add-button"  @click="openDialog_Term('add_new')"
            >サービス種別を追加</a
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
import "@grapecity/wijmo.styles/wijmo.css";
import "@grapecity/wijmo.vue2.input";
export default {
  data() {
    return {
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      serviceSyubetu: this.getServiceSyubetu(),
      sikyuryotou: 0,
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    getServiceSyubetu() {
      let serviceSyubetu = [];
      serviceSyubetu.push(
        {
          servicecode: '22',
          servicename: '生活支援',
          sikyuryotou: false,
          sikyukikan: true,
          kasankoumoku: true,
          keikasoti: true,
        },
        {
          servicecode: '32',
          servicename: '施設入所支援',
          sikyuryotou: true,
          sikyukikan: true,
          kasankoumoku: true,
          keikasoti: true,
        },
      );
      return serviceSyubetu;
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
  height: calc(29px * 9);
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
      background-color:#c6c6c6;
    }
    .sikyuryo-header-title {
      height: 25px;
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
    position: relative;/*相対配置*/
    .sikyuryo-servicesyubetu-disp {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color:white;
      border-radius: 2px;
      text-align: left;
      padding: 2px 0px 0px 4px;
    }
  }

  .sikyuryo-sikyuryotou-row {
    height: 50px;
    margin: 4px 4px 0px 4px;
    position: relative;/*相対配置*/
    .sikyuryo-sikyuryotou-group {
      width: 80%;
      margin-top: 0px;
      margin-left: -20px;
      padding-top: 0px;
      transform: scale(0.75);
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