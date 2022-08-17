<template>
  <div id="JyukyuTourokuSikyuryo2">
    <v-container fluid class="sikyuryo-container">
      <v-row no-gutters class="sikyuryo-header-row">
        <v-card
          id="sikyuryoheader"
          elevation="0"
          class="sikyuryo-header d-flex flex-row"
          flat
          tile
        >
          <label class="sikyuryo-header-title"
            >{{ this.titleNum }}支給決定内容</label
          >
        </v-card>
      </v-row>
      <div style="overflow-y: scroll; height: 200px" @scroll="onScroll()">
        <v-card
          elevation="0"
          style="background-color: rgba(255, 255, 255, 0)"
          v-for="(item, index) in serviceSyubetu"
          :key="item.servicecode"
          flat
          tile
        >
          <!-- <v-card
        elevation="0"
        style="background-color: trans"
        v-for="item in serviceSyubetu"
        :key="item.servicecode"
        flat
        tile
      > -->
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
            <p class="ml-2 mb-0">{{ item.servicename }}</p>
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
            <p class="ml-2 mb-0">{{ item.sienkubunymdDisp }}</p>
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
                style="margin-top: -6px"
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
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              支給量等
            </v-card>
            <p class="required">*</p>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">回</label>
            </v-card>
          </v-row>
          <v-row
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              支給量等
            </v-card>
            <p class="required">*</p>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">：</label>
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
            </v-card>
          </v-row>
          <v-row
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length5 d-flex flex-row"
              flat
              tile
            >
              一回当たり
            </v-card>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">：</label>
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
            </v-card>
          </v-row>
          <v-row
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              移動介護
            </v-card>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">：</label>
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
            </v-card>
          </v-row>
          <v-row
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              支給量等
            </v-card>
            <p class="required">*</p>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">単位</label>
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">日</label>
            </v-card>
          </v-row>
          <v-row
            v-show="item.sikyuryotouDisp"
            no-gutters
            class="sikyuryo-sikyuryotou-row2"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              受託居宅
            </v-card>
            <v-card
              elevation="0"
              class="sikyuryo-sikyuryotou-input d-flex flex-row"
            >
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
              <label style="padding-top: 4px; padding-left: 4px">：</label>
              <wj-combo-box
                class="sikyuryo-sikyuryotou-input2"
                :textChanged="onTextChanged"
              ></wj-combo-box>
            </v-card>
          </v-row>
          <v-row
            v-show="item.keikasotiDisp"
            no-gutters
            class="sikyuryo-keikasoti-row"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length3 d-flex flex-row"
              flat
              tile
            >
              退所後
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
                <v-radio label="１年未満" :key="1" :value="1"></v-radio>
                <v-radio label="１年以上" :key="0" :value="0"></v-radio>
              </v-radio-group>
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
          <v-row no-gutters class="sikyuryo-syogaisyurui-row">
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              障害種類
            </v-card>
            <v-card
              elevation="0"
              class="sikyuryo-syogaisyurui-combobox d-flex flex-row"
            >
              <wj-menu
                id="comboSyogaisyurui"
                class="customCombobox"
                :initialized="initComboSyogaisyurui"
                :isRequired="true"
                :itemsSource="syogaisyuruiCombo"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                :itemClicked="onSelectedSyogaisyurui"
              >
              </wj-menu>
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
              共同生活
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
                <v-radio label="無し" :key="1" :value="1"></v-radio>
                <v-radio label="有り" :key="0" :value="0"></v-radio>
              </v-radio-group>
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
              雇用契約
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
                <v-radio label="無し" :key="1" :value="1"></v-radio>
                <v-radio label="有り" :key="0" :value="0"></v-radio>
              </v-radio-group>
            </v-card>
          </v-row>
          <v-row
            v-show="item.keikasotiDisp"
            no-gutters
            class="sikyuryo-keikasoti-row"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length6 d-flex flex-row"
              flat
              tile
            >
              障害年金１級
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
                <v-radio label="無し" :key="1" :value="1"></v-radio>
                <v-radio label="有り" :key="0" :value="0"></v-radio>
              </v-radio-group>
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
              たん吸引
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
              経過居宅
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
                <v-radio label="通常" :key="1" :value="1"></v-radio>
                <v-radio label="経過" :key="0" :value="0"></v-radio>
              </v-radio-group>
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
              居宅利用
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
                <v-radio label="通常" :key="1" :value="1"></v-radio>
                <v-radio label="特例" :key="0" :value="0"></v-radio>
              </v-radio-group>
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
              長期入院
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
          <v-row
            v-show="item.keikasotiDisp"
            no-gutters
            class="sikyuryo-syokujinyuryoku-row"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length4 d-flex flex-row"
              flat
              tile
            >
              食事入力
            </v-card>
            <v-card
              elevation="0"
              class="sikyuryo-syokujinyuryoku-selection d-flex flex-row"
            >
              <v-checkbox
                class="item-button"
                label="入所との併用時、入所側で入力"
              >
              </v-checkbox>
            </v-card>
          </v-row>
          <v-row
            v-show="item.keikasotiDisp"
            no-gutters
            class="sikyuryo-keikasoti-row"
          >
            <v-card
              elevation="0"
              class="sikyuryo-title-length5 d-flex flex-row"
              flat
              tile
            >
              視覚障害者
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
          <v-divider
            color="#ce3e47"
            height="20px"
            style="margin: 4px"
            v-show="serviceSyubetu.length - 1 != index"
          ></v-divider>
          <!-- <v-divider
          color="#ce3e47"
          height="20px"
          style="margin: 4px"
        ></v-divider> -->
        </v-card>
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
      serviceSyubetu: this.getServiceSyubetu(),
      syogaisyuruiCombo: this.getSyogaisyuruiCombo(),

      sikyuryotou: -1,
      sienkubunymdStart: '',
      sienkubunymdEnd: '',
      sienkubunymdDisp: '',
    };
  },
  props: ['titleNum'],
  components: {
    Datepicker,
  },
  mounted() {},
  methods: {
    changeMode() {
      return this.mode === 'modSikyuryo';
    },
    setTrunModify() {
      this.setButtonColor('modifyButtonSikyuryo', true);
      this.setButtonColor('addButtonSikyuryo', false);
      this.$emit('setMode', 'modSikyuryo');
    },
    setTrunAdd() {
      this.setButtonColor('modifyButtonSikyuryo', false);
      this.setButtonColor('addButtonSikyuryo', true);
      this.$emit('setMode', 'modSikyuryo');
    },
    cancel() {
      this.setButtonColor('modifyButtonSikyuryo', false);
      this.setButtonColor('addButtonSikyuryo', false);
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
      if (data == null) return;
      if (data.sksymd.length > 0) {
        this.syugaikubunymdStart = moment(data.sksymd).format('YYYY-M-D');
        if (data.skeymd != '99991231') {
          this.syugaikubunymdEnd = moment(data.skeymd).format('YYYY-M-D');
        }
        if (this.sienkubunymdStart.length > 0) {
          this.sienkubunymdDisp =
            this.sienkubunymdStart + ' ～ ' + this.sienkubunymdEnd;
        }
        this.isModify = true;
      }
    },
    clearData() {},
    addService() {
      this.serviceSyubetu.push({
        servicecode: String(this.serviceSyubetu.length + 1),
        servicename: '生活支援',
        keikasoti: 1,
        sikyuryotouDisp: false,
        sikyukikanDisp: true,
        kasankoumokuDisp: true,
        keikasotiDisp: true,
        sikyuryoKasankoumokuData: [{ value: '加算項目を選択' }, { value: '' }],
      });
    },
    getServiceSyubetu() {
      let list = [];
      list.push(
        {
          servicecode: '11',
          servicename: 'ああああああ',
          sienkubunymdDisp: '2022-4-1 ～ 2023-3-31',
          keikasoti: 1,
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
          servicecode: '22',
          servicename: '生活支援',
          sienkubunymdDisp: '2022-4-1 ～ 2023-3-31',
          keikasoti: 0,
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
          sienkubunymdDisp: '2022-4-1 ～ 2023-3-31',
          keikasoti: 0,
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
      return list;
    },
    initComboSyogaisyurui(combo) {
      combo.header = this.syogaisyuruiCombo[0].text;
      var obj = document.getElementById('comboSyogaisyurui');
      obj.style.color = 'gray';
    },
    onSelectedSyogaisyurui(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        var obj = document.getElementById('comboSyogaisyurui');
        if (e.selectedIndex == 0) {
          obj.style.color = 'gray';
        } else {
          obj.style.color = 'black';
        }
      }
    },
    getSyogaisyuruiCombo() {
      let list = [];
      list.push(
        {
          key: 0,
          text: '障害種類を選択',
        },
        {
          key: 1,
          text: '知的障害児',
        },
        {
          key: 2,
          text: '自閉症児',
        },
        {
          key: 3,
          text: '盲児',
        },
        {
          key: 4,
          text: 'ろうあ児',
        },
        {
          key: 5,
          text: '肢体不自由児',
        }
      );
      return list;
    },
    onInitializedKasankoumoku(grd) {
      grd.beginUpdate();
      grd.cells.rows.defaultSize = 25;

      grd.endUpdate();
    },
    onTextChanged(txb) {},
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      if (this.mode !== 'new' && this.mode !== 'modSikyuryo') {
        this.setButtonColor('modifyButtonSikyuryo', false);
        this.setButtonColor('addButtonSikyuryo', false);
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
    onScroll() {
      this.$emit('onScroll', 'c-sikyuryo');
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

div#JyukyuTourokuSikyuryo2 {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;

  ::-webkit-scrollbar {
    width: 12px !important;
  }

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

  .sikyuryo-title-length3 {
    width: 100px;
    padding: 2px 0px 0px 26px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .sikyuryo-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .sikyuryo-title-length5 {
    width: 100px;
    padding: 2px 0px 0px 14px;
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
        width: 350px;
        margin-top: -5px;
        margin-left: -40px;
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

  .sikyuryo-sikyuryotou-row2 {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .sikyuryo-sikyuryotou-input {
      height: 100%;
    }
    .sikyuryo-sikyuryotou-input2 {
      width: 60px;
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .sikyuryo-sikyuryotou.wj-control .wj-input {
      width: 60px;
      text-align: right;
    }
  }
  .sikyuryo-syokujinyuryoku-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .sikyuryo-syokujinyuryoku-selection {
      height: 100%;
      width: 300px;
      .item-button {
        margin-top: -3px;
        margin-left: -30px;
        transform: scale(0.75);
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

  .sikyuryo-syogaisyurui-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .sikyuryo-syogaisyurui-combobox {
      height: 25px;
      margin-top: -2px;
      margin-left: 4px;
      padding-left: -2px;
      .sikyuryo-syogaisyurui-items {
        font-size: 12px;
      }
    }
  }
  div.customCombobox.customCombobox {
    margin-top: 2px;
    width: 150px !important;
    font-size: 12px !important;
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
        width: 300px;
        margin-top: 0px;
        margin-left: -30px;
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