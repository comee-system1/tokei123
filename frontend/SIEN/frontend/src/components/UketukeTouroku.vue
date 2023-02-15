<template>
  <div id="uketukeTouroku">
    <v-container no-gutters fluid class="container pa-0">
      <v-row no-gutters>
        <v-col class="centerArea">
          <v-container no-gutters fluid class="container pa-0 mt-1">
            <v-row no-gutters class="rowStyle_Input">
              <v-card class="koumokuTitle titleMain pa-1" outlined tile>
                対応者名
              </v-card>
              <v-card class="koumokuData ml-1 pa-0" width="300" tile outlined>
                {{ tantouData.code }} {{ tantouData.name }}
              </v-card>
              <v-col cols="*">
                <v-card class="ml-1 pa-1" style="border: none" tile outlined>
                  <div align="right">
                    <font :style="{ color: sysConst.COLOR.hissu_Color }"
                      ><b>*</b></font
                    >:必須項目
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutters class="rowStyle_Input mt-1">
              <v-card class="koumokuTitle titleBlue pa-1" outlined tile>
                対応日<span class="requiredMark"> * </span>
              </v-card>
              <v-card
                class="ml-1"
                color="transparent"
                height="100%"
                style="border: none; margin-top: 1px"
                outlined
                tile
              >
                <v-btn
                  elevation="2"
                  @click="inputCalendarClick()"
                  tile
                  outlined
                  width="160px"
                  height="100%"
                  class="btnymd"
                  >{{ getYmd() }}
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
                <v-btn
                  elevation="2"
                  class="btnymd pa-0 ml-1"
                  height="100%"
                  tile
                  @click="calendarClick(1)"
                >
                  <v-icon>mdi-arrow-left-bold</v-icon>
                  前日
                </v-btn>
                <v-btn
                  elevation="2"
                  class="btnymd pa-0 ml-1"
                  height="100%"
                  width="35"
                  min-width="35"
                  tile
                  @click="calendarClick(0)"
                  >今日
                </v-btn>
                <v-btn
                  elevation="2"
                  class="btnymd pa-0 ml-1"
                  height="100%"
                  tile
                  @click="calendarClick(2)"
                  >翌日
                  <v-icon>mdi-arrow-right-bold</v-icon>
                </v-btn>
              </v-card>
            </v-row>
            <v-row no-gutters class="rowStyle_Input mt-1">
              <v-card class="koumokuTitle titleBlue pa-1" outlined tile>
                利用者名<span class="requiredMark"> * </span>
              </v-card>
              <input
                id="uketukeTourokuUser"
                type="text"
                class="ml-1 border"
                style="width: 300px"
                name="txtuser"
                v-model="dispUserName"
                @click="inputClicked(99)"
                readonly="readonly"
              />
            </v-row>
            <v-row no-gutters class="rowStyle_Input mt-1 mb-1">
              <v-card class="koumokuTitle titleBlue pa-1" outlined tile>
                開始時間<span class="requiredMark"> * </span>
              </v-card>
              <input
                class="ml-1 border"
                type="time"
                id="timeinput"
                name="appt"
                v-model="selectDataObj.jikan"
              />
              <v-btn
                elevation="2"
                class="btnymd pa-0 ml-1"
                height="23px"
                style="margin-top: 1px"
                tile
                @click="timeClick(0)"
              >
                <v-icon small>mdi-clock-time-four-outline</v-icon>
                クリア
              </v-btn>
              <v-btn
                elevation="2"
                class="btnymd pa-0 ml-1"
                height="23px"
                style="margin-top: 1px"
                tile
                @click="timeClick(1)"
              >
                <v-icon small>mdi-clock-time-four-outline</v-icon>
                現時刻
              </v-btn>
            </v-row>
            <!-- <v-divider class="mt-1"></v-divider> -->
            <!-- <v-row no-gutters class="rowStyle_Input" style="display: none"> -->
            <v-row no-gutters class="rowStyle_Input mt-1" style="display: none">
              <v-card class="koumokuTitle titleGreen pa-1" outlined tile>
                事業区分<span class="requiredMark"> * </span>
              </v-card>
              <v-tabs
                class="ml-1"
                height="100%"
                style="width: 100px"
                v-model="kbnTab"
                left
                hide-slider
                @change="kbnChange($event)"
              >
                <v-tab
                  v-for="item in kbnItem"
                  :key="item.val"
                  :href="item.href"
                  outline
                >
                  {{ item.name }}
                </v-tab>
              </v-tabs>
            </v-row>
            <v-container no-gutters fluid class="v-tabCont pa-0">
              <!-- CP -->
              <v-tabs-items v-model="kbnTab" transition="none">
                <!-- transition="false" -->
                <v-tab-item :value="sysConst.JIGYO_KBN_NAME.KIHON">
                  <v-container
                    no-gutters
                    fluid
                    class="container ma-0 pa-0"
                    style="height: 100%"
                  >
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        入力区分<span class="requiredMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.sykkbn"
                      >
                        <v-btn
                          mandatory
                          v-for="n in mstSyukeiKbnList"
                          :key="n.val"
                          :value="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          width="60"
                          @click="jigyoKbnclick(n.val)"
                        >
                          {{ n.ryaku }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        初回・継続
                      </v-card>
                      <v-btn-toggle
                        id="uketukeTourokuSyokaibtn"
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.syokaiflg"
                      >
                        <v-btn
                          v-for="n in SyokaiorKeizokuItem"
                          :key="n.val"
                          :value="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          :disabled="selectDataObj.sykkbn == 3"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                      <v-card
                        class="koumokuData ml-1 pa-1"
                        width="200px"
                        tile
                        outlined
                        v-show="selectDataObj.syokaikeizoku == 1"
                      >
                        初回日：{{ selectDataObj.syokaiymd }}
                      </v-card>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <!-- CP -->
                <v-tab-item value="Keikakusoudan" eager>
                  <v-container
                    no-gutters
                    fluid
                    class="container ma-0 pa-0"
                    style="height: 100%"
                  >
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        入力区分<span class="requiredMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.cskbn"
                      >
                        <v-btn
                          mandatory
                          v-for="n in keikakuInputKbnItem"
                          :key="n.val"
                          :value="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          @click="keikakuInputKbnclick(n.val)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        加算有無<span class="requiredMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.kasanUmu"
                      >
                        <v-btn
                          v-for="n in getKasanUmu"
                          :key="n.val"
                          :value="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          @click="KasanUmuclick(n.val, 0)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        支援方法
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuSienHouhou"
                        type="text"
                        class="ml-1 border"
                        name="txtsienhouhou_keikaku"
                        v-model="selectDataObj.sdnhourk"
                        @click="inputClicked(11)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        加算項目
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuKasan"
                        type="text"
                        class="ml-1 border"
                        style="width: 400px"
                        name="txtkasankoumoku_keikaku"
                        v-model="selectDataObj.kasanname"
                        @click="inputClicked(12)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        機関・場所
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuKikanBasyo"
                        type="text"
                        class="ml-1 border"
                        style="width: 400px"
                        name="txtkikanBasyo"
                        v-model="selectDataObj.kikanbasyoname"
                        @click="inputClicked(13)"
                      />
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        対応者名
                      </v-card>
                      <input
                        id="uketukeTourokuTaiousyamei"
                        type="text"
                        class="ml-1 border"
                        style="width: 400px"
                        name="txttaiousyamei"
                        v-model="selectDataObj.taiousyameiname"
                        @click="inputClicked(14)"
                      />
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        終了時間<span class="requiredMark"> * </span>
                      </v-card>
                      <input
                        class="ml-1 border"
                        type="time"
                        id="timeinput"
                        name="appt"
                        v-model="selectDataObj.etime"
                      />
                      <v-btn
                        elevation="2"
                        class="btnymd pa-0 ml-1"
                        height="23px"
                        style="margin-top: 1px"
                        tile
                        @click="timeClick(2)"
                      >
                        <v-icon small>mdi-clock-time-four-outline</v-icon>
                        クリア
                      </v-btn>
                      <v-btn
                        elevation="2"
                        class="btnymd pa-0 ml-1"
                        height="23px"
                        style="margin-top: 1px"
                        tile
                        @click="timeClick(3)"
                      >
                        <v-icon small>mdi-clock-time-four-outline</v-icon>
                        現時刻
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <!-- CP -->
                <v-tab-item value="Chiikisoudan" eager>
                  <v-container
                    no-gutters
                    fluid
                    class="container ma-0 pa-0"
                    style="height: 100%"
                  >
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        入力区分<span class="requiredMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.cskbn"
                      >
                        <v-btn
                          mandatory
                          v-for="n in chiikiInputKbnItem"
                          :key="n.val"
                          :value="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          @click="chiikiInputKbnclick(n.val)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle_Input mt-1">
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        加算有無<span class="requiredMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1 kbnBtn"
                        v-model="selectDataObj.kasanUmu"
                      >
                        <v-btn
                          v-for="n in getKasanUmu"
                          :key="n.val"
                          outlined
                          height="23"
                          elevation="2"
                          @click="KasanUmuclick(n.val, 1)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row
                      v-show="
                        selectDataObj.kasanumu != -1 &&
                        selectDataObj.kasanumu != kasanUmuItem[0].val &&
                        selectDataObj.kasanumu != kasanUmuItem[2].val
                      "
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        支援方法
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiSienHouhou"
                        type="text"
                        class="ml-1 border"
                        name="txtsienhouhou_chiiki"
                        v-model="selectDataObj.sdnhourk"
                        @click="inputClicked(21)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-show="
                        selectDataObj.kasanumu != -1 &&
                        selectDataObj.kasanumu != kasanUmuItem[0].val &&
                        selectDataObj.kasanumu != kasanUmuItem[2].val
                      "
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        加算項目
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiKasan"
                        type="text"
                        class="ml-1 border"
                        style="width: 400px"
                        name="txtkasankoumoku_chiiki"
                        v-model="selectDataObj.kasanname"
                        @click="inputClicked(22)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-show="selectDataObj.kasanumu == kasanUmuItem[1].val"
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        委託先
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiItakusaki"
                        type="text"
                        class="ml-1 border"
                        style="width: 400px"
                        name="txtitakusaki"
                        v-model="selectDataObj.nameD"
                        @click="inputClicked(23)"
                      />
                    </v-row>
                    <v-row
                      v-show="
                        selectDataObj.kasanumu == kasanUmuItem[3].val ||
                        selectDataObj.kasanumu == kasanUmuItem[4].val
                      "
                      no-gutters
                      class="rowStyle_Input mt-1"
                    >
                      <v-card
                        class="koumokuTitle titleGreen pa-1"
                        outlined
                        tile
                      >
                        終了時間<span class="requiredMark"> * </span>
                      </v-card>
                      <input
                        class="ml-1 border"
                        type="time"
                        id="timeinput"
                        name="appt"
                        v-model="selectDataObj.etime"
                      />
                      <v-btn
                        elevation="2"
                        class="btnymd pa-0 ml-1"
                        height="23px"
                        style="margin-top: 1px"
                        tile
                        @click="timeClick(2)"
                      >
                        <v-icon small>mdi-clock-time-four-outline</v-icon>
                        クリア
                      </v-btn>
                      <v-btn
                        elevation="2"
                        class="btnymd pa-0 ml-1"
                        height="23px"
                        style="margin-top: 1px"
                        tile
                        @click="timeClick(3)"
                      >
                        <v-icon small>mdi-clock-time-four-outline</v-icon>
                        現時刻
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-container>
            <v-row no-gutters class="rowStyle_Input mt-1" v-show="dipCommonFlg">
              <v-card class="koumokuTitle titleGreen pa-1" outlined tile>
                支援方法
              </v-card>
              <input
                id="uketukeTourokuSienhouhou"
                type="text"
                class="ml-1 border"
                name="txtsienhouhou"
                v-model="selectDataObj.sdnhourk"
                @click="inputClicked(1)"
                readonly="readonly"
                :disabled="selectDataObj.sykkbn == 3"
              />
              <v-card class="koumokuTitle titleGreen ml-1 pa-1" outlined tile>
                同席者１
              </v-card>
              <input
                id="uketukeTourokuDousekisya1"
                type="text"
                class="ml-1 border"
                name="txtdouseki1"
                v-model="selectDataObj.sdnnam1"
                @click="inputClicked(4)"
                :disabled="selectDataObj.sykkbn == 3"
              />
            </v-row>
            <v-row no-gutters class="rowStyle_Input mt-1" v-show="dipCommonFlg">
              <v-card class="koumokuTitle titleGreen pa-1" outlined tile>
                関係
              </v-card>
              <input
                id="uketukeTourokuKankei"
                type="text"
                class="ml-1 border"
                name="txtkaneki"
                v-model="selectDataObj.sdnkanrk"
                @click="inputClicked(2)"
                readonly="readonly"
                :disabled="selectDataObj.sykkbn == 3"
              />
              <v-card class="koumokuTitle titleGreen ml-1 pa-1" outlined tile>
                同席者２
              </v-card>
              <input
                id="uketukeTourokuDousekisya2"
                type="text"
                class="ml-1 border"
                name="txtdouseki2"
                v-model="selectDataObj.sdnnam2"
                @click="inputClicked(5)"
                :disabled="selectDataObj.sykkbn == 3"
              />
            </v-row>
            <v-row no-gutters class="rowStyle_Input mt-1" v-show="dipCommonFlg">
              <v-card class="koumokuTitle titleGreen pa-1" outlined tile>
                相談者名
              </v-card>
              <input
                id="uketukeTourokuSoudansya"
                type="text"
                class="ml-1 border"
                name="txtsoudansya"
                v-model="selectDataObj.sdnnam"
                @click="inputClicked(3)"
                :disabled="selectDataObj.sykkbn == 3"
              />
              <v-card class="koumokuTitle titleGreen ml-1 pa-1" outlined tile>
                同席者３
              </v-card>
              <input
                id="uketukeTourokuDousekisya3"
                type="text"
                class="ml-1 border"
                name="txtdouseki3"
                v-model="selectDataObj.sdnnam3"
                @click="inputClicked(6)"
                :disabled="selectDataObj.sykkbn == 3"
              />
            </v-row>
            <v-divider class="btmborder mt-1"></v-divider>
            <v-row no-gutters class="rowStyle_Input mt-1">
              <v-card class="koumokuTitle titleOrange pa-1" outlined tile>
                支援項目<span class="requiredMark"> * </span>
              </v-card>
              <input
                id="uketukeTourokuSienkoumoku"
                style="width: 400px"
                type="text"
                class="ml-1 border"
                name="txtsienkoumoku"
                v-model="selectDataObj.cskmknm"
                @click="inputClicked(7)"
                readonly="readonly"
              />
            </v-row>
            <v-row
              id="uketukeTourokuNaiyo"
              no-gutters
              class="rowStyleHigh mt-1"
            >
              <v-card
                class="koumokuTitle titleOrange pa-1"
                style="position: relative"
                outlined
                tile
              >
                内容
                <span class="requiredMark"> * </span>
              </v-card>
              <v-textarea
                id="uketukeTourokuNaiyoTxt"
                class="ma-0 pa-0 ml-1"
                clearable
                clear-icon="mdi-close-circle"
                no-resize
                v-model="selectDataObj.naiyo"
                height="100%"
                hide-details
                solo
                flat
                row-height="15"
              ></v-textarea>
            </v-row>

            <v-row no-gutters class="rowStyle_Input mt-1">
              <v-card class="koumokuTitle titleOrange pa-1" outlined tile
                >業務日誌</v-card
              >
              <v-checkbox
                class="ma-0 pa-0 mr-1 ml-1"
                hide-details
                v-model="selectDataObj.kan"
                :label="'表示する'"
                style="width: 200px"
              >
              </v-checkbox>
              <div name="hideitem" class="rowStyle_Input" style="display: flex">
                <v-card
                  class="koumokuTitle titleOrange pa-1 ml-1"
                  outlined
                  tile
                  v-show="dispPeerCounselor"
                >
                  ﾋﾟｱｶｳﾝｾﾗｰ
                </v-card>
                <v-btn-toggle
                  class="flex-wrap ml-1 kbnBtn"
                  v-model="selectDataObj.peer"
                  v-show="dispPeerCounselor"
                >
                  <v-btn
                    v-for="n in PeerCounselorItem"
                    :key="n.val"
                    :value="n.val"
                    outlined
                    height="23"
                    elevation="2"
                  >
                    {{ n.name }}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </v-row>
            <div name="hideitem" class="rowStyle_Input" style="display: flex">
              <v-row
                no-gutters
                class="rowStyle_Input mt-1 mb-1"
                v-show="dispSyoyou"
              >
                <v-card class="koumokuTitle titleOrange pa-1" outlined tile>
                  所要時間
                </v-card>
                <input
                  class="border ml-1"
                  style="width: 50px; text-align: right"
                  type="text"
                  @input="numbervalidate"
                  v-model="selectDataObj.syoyoujikan"
                />
                <P class="ma-1" v-show="dispRank" style="width: 150px">分</P>
                <v-card
                  class="koumokuTitle titleOrange pa-1"
                  outlined
                  tile
                  v-show="dispRank"
                  >ランク</v-card
                >
                <v-btn-toggle
                  class="flex-wrap ml-1 kbnBtn"
                  v-model="selectDataObj.rank"
                  v-show="dispRank"
                >
                  <v-btn
                    v-for="n in RankItem"
                    :key="n.val"
                    :value="n.val"
                    outlined
                    height="23"
                    elevation="2"
                  >
                    {{ n.name }}
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </div>

            <v-row no-gutters class="rowStyle_Input mt-2 mb-2">
              <v-btn width="100" height="25" @click="clrClicked(0)">
                画面クリア
              </v-btn>
              <v-btn
                class="ml-1"
                width="100"
                height="25"
                @click="clrClicked(1)"
              >
                内容クリア
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="" width="75" height="25" @click="delClicked">
                削除
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mr-1" width="75" height="25" @click="addClicked">
                登録
              </v-btn>
            </v-row>
          </v-container>
          <v-container no-gutters fluid class="container pa-0"></v-container>
        </v-col>
        <v-col class="rightArea mt-1 mb-2">
          <!-- 右側エリア -->
          <v-container no-gutters fluid class="container ma-0 pa-0 mt-1">
            <v-row no-gutters>
              <v-tabs
                height="30"
                v-model="rightTab"
                centered
                hide-slider
                @change="rightTabkbnChange($event)"
              >
                <v-tab
                  v-for="item in rightItem"
                  :key="item.val"
                  :href="item.href"
                  outline
                >
                  {{ item.name }}
                </v-tab>
              </v-tabs>
            </v-row>
          </v-container>
          <v-container no-gutters fluid class="container ma-0 pa-0">
            <v-tabs-items v-model="rightTab">
              <v-tab-item
                class="pa-0 pb-1"
                value="User"
                eager
                transition="none"
              >
                <user-list
                  ref="user_list"
                  class="pt-1 ml-1 mr-1"
                  :dispAddDaicho="true"
                  :dispHideBar="false"
                  :headerheight="220"
                  :grdheight="125"
                  @child-select="setUserSelectPoint"
                  @child-user="getSelectUserChildComponent"
                >
                </user-list>
              </v-tab-item>
              <v-tab-item value="Mst" eager transition="none">
                <!-- 右側＞参照＞マスタ -->
                <v-container no-gutters fluid class="container ma-0 pa-1 pt-0">
                  <wj-flex-grid
                    id="mstIcrnGrid"
                    :headersVisibility="'Column'"
                    :autoGenerateColumns="false"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowPinning="false"
                    :allowMerging="'AllHeaders'"
                    :allowResizing="false"
                    :allowSorting="false"
                    :allowDragging="false"
                    :selectionMode="'Row'"
                    :isReadOnly="true"
                    :initialized="onInitializemstIcrnGrid"
                    :formatItem="onFormatItemmstIcrnGrid"
                    :itemsSourceChanged="onItemsSourceChanged"
                    :itemsSource="mstdata"
                  >
                  </wj-flex-grid>
                  <wj-flex-grid
                    id="soudansyaMstIcrnGrid"
                    :headersVisibility="'Column'"
                    :autoGenerateColumns="false"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowPinning="false"
                    :allowMerging="'AllHeaders'"
                    :allowResizing="false"
                    :allowSorting="false"
                    :allowDragging="false"
                    :selectionMode="'Row'"
                    :isReadOnly="true"
                    :initialized="onInitializeSoudansyaMstIcrnGrid"
                    :formatItem="onFormatItemSoudansyaMstIcrnGrid"
                    :itemsSourceChanging="onItemsSoudansyaMstSourceChanging"
                    :itemsSourceChanged="onItemsSourceChanged"
                    :itemsSource="soudansyaMstdata"
                  >
                  </wj-flex-grid>
                  <wj-flex-grid
                    id="sienMstIcrnGrid"
                    :headersVisibility="'Column'"
                    :autoGenerateColumns="false"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowPinning="false"
                    :allowMerging="'AllHeaders'"
                    :allowResizing="false"
                    :allowSorting="false"
                    :allowDragging="false"
                    :selectionMode="'Row'"
                    :isReadOnly="true"
                    :initialized="onInitializeSienMstIcrnGrid"
                    :formatItem="onFormatItemSienMstIcrnGrid"
                    :itemsSourceChanged="onItemsSourceChanged"
                    :itemsSource="mstSodantaiouList"
                  >
                  </wj-flex-grid>
                </v-container>
              </v-tab-item>

              <v-tab-item value="Soudan" eager transition="none">
                <!-- 右側＞参照＞相談履歴 -->
                <v-container no-gutters fluid class="container ma-0 pa-1 pt-0">
                  <v-row no-gutters class="rowStyle_Input">
                    <v-card
                      class="koumokuTitle titleMain pa-1"
                      width="50"
                      outlined
                      tile
                    >
                      期間
                    </v-card>
                    <v-card
                      class="ml-1"
                      color="transparent"
                      height="100%"
                      style="border: none; margin-top: 1px"
                      outlined
                      tile
                    >
                      <v-btn
                        @click="inputYmCalendarClick(0)"
                        elevation="2"
                        tile
                        outlined
                        width="130px"
                        height="100%"
                        class="btnymd"
                        >{{ getSYm() }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>
                    </v-card>
                    <label class="mr-1 ml-1">～</label>
                    <v-card
                      class="ml-1"
                      color="transparent"
                      height="100%"
                      style="border: none; margin-top: 2px"
                      outlined
                      tile
                    >
                      <v-btn
                        @click="inputYmCalendarClick(1)"
                        elevation="2"
                        tile
                        outlined
                        width="130px"
                        height="100%"
                        class="btnymd"
                        >{{ getEYm() }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>
                    </v-card>
                  </v-row>
                  <v-row
                    no-gutters
                    class="rowStyle_Input mt-1"
                    style="height: 25px"
                  >
                    <v-card
                      class="koumokuTitle titleMain pa-1 mr-1"
                      width="50"
                      outlined
                      tile
                    >
                      項目
                    </v-card>
                    <select
                      class="customSelectBox hHigh mr-1"
                      v-model="selRirekiKoumoku"
                      @change="onRirekiKoumokuClicked"
                      style="width: 280px"
                    >
                      <option
                        v-for="val in RirekiKoumokuList"
                        :key="val.val"
                        :value="val.val"
                      >
                        {{ val.name }}
                      </option>
                    </select>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ml-1"
                      width="50"
                      height="25"
                      @click="rirekiSearchClicked()"
                    >
                      検索
                    </v-btn>
                  </v-row>
                  <v-row no-gutters class="mt-1">
                    <wj-flex-grid
                      id="rirekiIcrnGrid"
                      style="height: 65vh"
                      :headersVisibility="'Column'"
                      :autoGenerateColumns="false"
                      :allowAddNew="false"
                      :allowDelete="false"
                      :allowPinning="false"
                      :allowMerging="'AllHeaders'"
                      :allowResizing="false"
                      :allowSorting="false"
                      :allowDragging="false"
                      :selectionMode="'Row'"
                      :isReadOnly="true"
                      :initialized="onInitializeRirekiIcrnGrid"
                      :formatItem="onFormatItemRirekiIcrnGrid"
                      :autoRowHeights="true"
                      :itemsSourceChanged="onItemsSourceChanged"
                      :itemsSource="rirekidata"
                    >
                    </wj-flex-grid>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item value="Kihon" eager transition="none">
                <v-container no-gutters fluid class="container ma-0 pa-1 pt-0">
                  <!-- 右側＞参照＞基本情報 -->
                  <wj-flex-grid
                    id="kihonIcrnGrid"
                    :headersVisibility="'Column'"
                    :autoGenerateColumns="false"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowPinning="false"
                    :allowMerging="'AllHeaders'"
                    :allowResizing="false"
                    :allowSorting="false"
                    :allowDragging="false"
                    :selectionMode="'Row'"
                    :isReadOnly="true"
                    :autoRowHeights="true"
                    :initialized="onInitializeKihonIcrnGrid"
                    :formatItem="onFormatItemKihonIcrnGrid"
                    :itemsSourceChanged="onItemsSourceChanged"
                    :itemsSource="kihondata"
                  >
                  </wj-flex-grid>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog v-model="datepicker_dialog" class="datepicker_dialogs">
      <v-date-picker
        id="uketukeTourokuDatepicker"
        scrollable
        no-title
        mode="single"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeTourokuDatepickerSym"
        type="month"
        v-model="pickersym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_eym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeTourokuDatepickerEym"
        type="month"
        v-model="pickereym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(1)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import * as wjCore from '@grapecity/wijmo';
import UserList from '../components/UserListUktk.vue';
import { getConnect } from '@connect/getConnect';
import { postConnect } from '@connect/postConnect';
import { putConnect } from '@connect/putConnect';
import { deleteConnect } from '@connect/deleteConnect';

const DISP_MST_GRD = {
  SienHouhou: 1,
  Kankei: 2,
  SoudansyaName: 3,
  Douseki1: 4,
  Douseki2: 5,
  Douseki3: 6,
  SienKoumoku: 7,
  KeikakuSienHouhou: 11,
  KeikakuKasan: 12,
  KeikakuKikanBasyo: 13,
  ChiikiSienHouhou: 21,
  ChiikiKasan: 22,
  ChiikiItakusaki: 23,
  User: 99,
};
const KANKEI_KBN = {
  Other: 0,
  Honnin: 1,
  Kazoku: 2,
};
const GRD_ID = {
  Mst: 'mstIcrnGrid',
  SoudansyaMst: 'soudansyaMstIcrnGrid',
  SienMst: 'sienMstIcrnGrid',
};
const GRD_TITLE = {
  Soudansya: '相談者',
  Sienkoumoku: '支援項目マスタ',
  Kojinrireki: '個人相談履歴',
  Kihon: '基本情報',
};
const TAB_NAME = {
  User: 'User',
  Mst: 'Mst',
  SoudansyaMst: 'soudansyaMstIcrnGrid',
  SienMst: 'sienMstIcrnGrid',
};
const INPUT_ID = {
  Syokai: 'uketukeTourokuSyokaibtn',
  SienHouhou: 'uketukeTourokuSienhouhou',
  Kankei: 'uketukeTourokuKankei',
  Soudansya: 'uketukeTourokuSoudansya',
  Dousekisya1: 'uketukeTourokuDousekisya1',
  Dousekisya2: 'uketukeTourokuDousekisya2',
  Dousekisya3: 'uketukeTourokuDousekisya3',
  Sienkoumoku: 'uketukeTourokuSienkoumoku',
  KeikakuSienHouhou: 'uketukeTourokuKeikakuSienHouhou',
  KeikakuKasan: 'uketukeTourokuKeikakuKasan',
  KeikakuKikanBasyo: 'uketukeTourokuKeikakuKikanBasyo',
  Taiousyamei: 'uketukeTourokuTaiousyamei',
  ChiikiSienHouhou: 'uketukeTourokuChiikiSienHouhou',
  ChiikiKasan: 'uketukeTourokuChiikiKasan',
  ChiikiItakusaki: 'uketukeTourokuChiikiItakusaki',
  Naiyo: 'uketukeTourokuNaiyo',
  User: 'uketukeTourokuUser',
};
const TITLE_TXT = {
  Sienhouhou: '支援方法',
  HonninnKankei: '本人との関係',
  Soudansya: '相談者',
  Dousekisya1: '同席者１',
  Dousekisya2: '同席者２',
  Dousekisya3: '同席者３',
  Itakusaki: '委託先',
  Kasan: '加算項目',
  Kikan: '機関・場所',
};
// HTML要素の非表示ID
const HIDE_NAME = {
  hideitem: 'hideitem', // ﾋﾟｱｶｳﾝｾﾗｰ・ランク・所要時間
};
const NAIYO_HEIGHT = {
  height1: 75,
  height2: 130,
};
const STYLE_BLOCK = 'block';
const STYLE_FLEX = 'flex';
const STYLE_NONE = 'none';
const CMB_ID = {
  cmb1: 'comboFilters',
};
export default {
  props: {
    dispTab: String,
    userData: Object, // 選択ユーザ
    selectViewData: Object, // 選択登録済みデータ
  },
  components: { UserList },
  data() {
    return {
      sysConst: sysConst,
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      userListComponentDatas: [], // ユーザー一覧データ
      taiouYmd: '', // 対応日
      picker: '',
      kikanSymd: '', // 履歴検索期間開始
      kikanEymd: '', // 履歴検索期間終了
      pickersym: '',
      pickereym: '',
      datepicker_dialog_sym: false,
      datepicker_dialog_eym: false,
      datepicker_dialog: false,
      dispMstGrid: 0,
      kbnTab: '',
      kbnItem: [
        {
          val: 0,
          name: '基本相談',
          href: '#' + sysConst.JIGYO_KBN_NAME.KIHON,
          hrefval: sysConst.JIGYO_KBN_NAME.KIHON,
        },
        {
          val: 1,
          name: '計画相談',
          href: '#' + sysConst.JIGYO_KBN_NAME.KEIKAKU,
          hrefval: sysConst.JIGYO_KBN_NAME.KEIKAKU,
        },
        {
          val: 2,
          name: '地域相談',
          href: '#' + sysConst.JIGYO_KBN_NAME.CHIIKI,
          hrefval: sysConst.JIGYO_KBN_NAME.CHIIKI,
        },
      ],
      dispUserName: '',
      userInfo: {},
      jigyoKbnItem: sysConst.JIGYOKBN,
      keikakuInputKbnItem: sysConst.KEIKAKUJIGYOKBN,
      chiikiInputKbnItem: sysConst.CHIIKIJIGYOKBN,
      SyokaiorKeizokuItem: [
        { val: 1, name: '初回' },
        { val: 2, name: '継続' },
      ],
      PeerCounselorItem: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      RankItem: [
        { val: 1, name: 'A' },
        { val: 2, name: 'B' },
        { val: 3, name: 'C' },
        { val: 4, name: 'D' },
      ],
      kasanUmuItem: [
        { val: 0, name: '無し', kbn: 'all' },
        { val: 1, name: '有り', kbn: 'all' },
        { val: 2, name: '対面支援', kbn: 'chiikiIkou' },
        { val: 3, name: '緊急支援Ⅰ', kbn: 'chiikiTeichaku' },
        { val: 4, name: '緊急支援Ⅱ', kbn: 'chiikiTeichaku' },
      ],
      rightTab: TAB_NAME.User, // タブの初期状態
      rightItem: [
        { val: 0, name: '利用者', href: '#User' },
        { val: 1, name: 'マスタ', href: '#Mst' },
        { val: 2, name: '相談履歴', href: '#Soudan' },
        { val: 3, name: '基本情報', href: '#Kihon' },
      ],
      dispPeerCounselor: true,
      dispRank: true,
      dispSyoyou: true,
      mstdata: [],
      MstHerderItem: [
        { dataname: 'codeD', title: 'コード', width: 70, align: 'center' },
        { dataname: 'name', title: '', width: '*', align: 'left' },
      ],
      soudansyaMstdata: [],
      SoudansyaMstHerderItem: [
        { dataname: 'codeD', title: 'コード', width: 50, align: 'center' },
        { dataname: 'sdnnamD', title: '氏名', width: '*', align: 'left' },
        // { dataname: 'tudukigara', title: '続柄', width: 50, align: 'left' },
        // { dataname: 'mimoto', title: '身元', width: 30, align: 'center' },
        {
          dataname: 'rennrakusaki',
          title: '連絡先',
          width: 100,
          align: 'left',
        },
      ],
      SienMstHerderItem: [
        { dataname: 'daicodeD', title: '大項目', width: 40, align: 'center' },
        { dataname: 'dainames', title: '大項目', width: '*', align: 'left' },
        { dataname: 'tyucodeD', title: '項目', width: 40, align: 'center' },
        { dataname: 'tyunames', title: '項目', width: '*', align: 'left' },
      ],
      selRirekiKoumoku: 0,
      RirekiKoumokuList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: 'テスト' },
      ],
      rirekidata: [],
      RirekiHerderItem: [
        { dataname: 'ymdD', title: '対応日', width: 90, align: 'center' },
        { dataname: 'naiyoD', title: '内容', width: '*', align: 'left' },
      ],
      kihondata: [],
      KihonHerderItem: [
        { dataname: 'title', title: '', width: 100, align: 'center' },
        { dataname: 'naiyo', title: '', width: '*', align: 'left' },
      ],
      kankeiDataSelect: {},
      selectDataObj: this.getKihonDefaultData(),
      dipCommonFlg: true, // 支援方法～同席者３までの表示フラグ
      windowheight: window.innerHeight,
      mstHouhouList: this.getHouhouMst(),
      mstKankeiList: this.getKankeiMst(),
      mstSodantaiouList: this.getSodantaiouMst(),
      mstItakuList: this.getItakuMst(),
      mstKasanList: [],
      mstSoudansyaList: [],
      mstKikanList: this.getKikanMst(),
      mstSyukeiKbnList: [],
      editFlg: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    // 空データ作成
    this.setKihonInfo();
    this.getSyukeiKbn();
    if (this.kbnTab == this.kbnItem[1].hrefval) {
      this.keikakuInputKbnclick(sysConst.KEIKAKUJIGYOKBN.Keikaku.val);
    } else if (this.kbnTab == this.kbnItem[2].hrefval) {
      this.keikakuInputKbnclick(sysConst.CHIIKIJIGYOKBN.Keikaku.val);
    }
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  created() {
    // 初期ユーザ検索
    this.kbnTab = this.dispTab;
  },
  watch: {
    selectViewData(newselectViewData) {
      // 登録済みデータ表示処理
      this.setKihonInfo(newselectViewData);
    },
  },
  computed: {
    // selectedData() {
    //   // ここでユーザ検索処理する
    // },
    // rirekiData() {
    //   // 履歴選択処理
    // },

    getKasanUmu() {
      if (this.kbnTab == this.kbnItem[2].hrefval) {
        if (this.selectDataObj.cskbn == sysConst.CHIIKIJIGYOKBN.Keikaku.val) {
          return this.kasanUmuItem.filter(
            (e) => e.kbn == 'all' || e.kbn == 'chiikiIkou'
          );
        } else if (
          this.selectDataObj.cskbn == sysConst.CHIIKIJIGYOKBN.Syougaiji.val
        ) {
          return this.kasanUmuItem.filter(
            (e) => e.kbn == 'all' || e.kbn == 'chiikiTeichaku'
          );
        } else {
          return this.kasanUmuItem.filter((e) => e.kbn == 'all');
        }
      } else {
        return this.kasanUmuItem.filter((e) => e.kbn == 'all');
      }
    },
  },
  methods: {
    /*
     * マスタ取得処理
     */
    getSinkiKeizoku() {
      if (this.kbnTab == this.kbnItem[0].hrefval) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pIntcode: this.userInfo.riid,
          pYmd: this.taiouYmd.format('YYYYMMDD'),
          pJikan: this.selectDataObj.jikan,
        };

        getConnect('/UktkSinkiKeizoku', params, 'SIENT').then((result) => {
          if (result !== undefined) {
            this.selectDataObj.syokaiflg = result;
          }
        });
      }
    },
    getUktkKihon() {
      let params = {
        pJigyoid: 62,
        pIntcode: this.userInfo.riid,
        pYmd: dayjs().format('YYYYMMDD'),
      };
      this.kihondata = [];
      getConnect('/UktkKihon', params, 'SIENT').then((result) => {
        console.log(result);
        let tmplist = [
          { title: '生年月日', naiyo: result.birth },
          { title: '性別', naiyo: result.sex_view },
          { title: '住所', naiyo: result.address },
          { title: '電話番号１', naiyo: result.tel_view },
          { title: '電話番号２', naiyo: result.tel2_view },
          { title: '携帯電話', naiyo: result.ktelno },
          { title: 'FAX番号', naiyo: result.faxno },
          { title: 'メールアドレス', naiyo: result.email },
          { title: '携帯メール', naiyo: result.kmail },
          { title: '障害区分', naiyo: result.syogaikbnnm1 },
          { title: '世帯の状況', naiyo: result.setainm },
          { title: '本人の状況', naiyo: result.honninnm },
        ];

        this.kihondata = tmplist.concat();
      });
    },
    getSyukeiKbn() {
      if (this.kbnTab == this.kbnItem[0].hrefval) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
        };

        getConnect('/MstSyukeikbn', params, 'SIENT').then((result) => {
          if (result !== undefined) {
            this.mstSyukeiKbnList = result;
          }
        });
      }
    },
    getHouhouMst() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      getConnect('/MstHouhou', params, 'SIENT').then((result) => {
        this.mstHouhouList = result;
        this.setClrItem(this.mstHouhouList);
        this.inputClicked(DISP_MST_GRD.User);
      });
    },
    getKankeiMst() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      getConnect('/MstKankei', params, 'SIENT').then((result) => {
        this.setClrItem(result);
        this.mstKankeiList = result;
      });
    },
    getSodantaiouMst() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      getConnect('/MstSodanTaiou', params, 'SIENT').then((result) => {
        this.setClrItemSoudantaiou(result);
        this.mstSodantaiouList = result;
      });
    },
    getItakuMst() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };
      getConnect('/MstItaku', params, 'SIENC').then((result) => {
        this.setClrItem(result);
        this.mstItakuList = result;
      });
    },
    getKasanMst(ymd, svc) {
      let params = {
        uniqid: 3,
        traceid: 123,
        pYmd: ymd,
        pSvcCode: svc,
      };
      getConnect('/MstKasan', params, 'SIENT').then((result) => {
        this.setClrItem(result);
        this.mstKasanList = result;
      });
    },
    getMstSodansya() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pIntcode: this.userInfo.riid,
        pKanid: 0,
      };
      getConnect('/MstSodansya', params, 'SIENT').then((result) => {
        this.setClrItem(result);
        this.mstSoudansyaList = result;
      });
    },
    getKikanMst() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      getConnect('/MstKikan', params, 'SIENT').then((result) => {
        this.mstKikanList = result;
        this.setClrItem(this.mstKikanList);
        this.inputClicked(DISP_MST_GRD.User);
      });
    },
    setClrItem(list) {
      list.unshift({ codeD: '', name: 'クリア' });
    },
    setClrItemSoudantaiou(list) {
      list.unshift({ daicodeD: '', dainames: 'クリア' });
    },
    getEditflg() {
      return this.editFlg;
    },
    resetEditflg() {
      this.editFlg = false;
    },
    /**************
     * 初期化系
     */
    initComboFilters(combo) {
      if (combo.hostElement.id == CMB_ID.cmb1) {
        combo.header = this.RirekiKoumokuList[0].name;
      }
    },
    onInitializemstIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        if (this.selectDataObj.inputkbn == sysConst.JIGYOKBN.Renraku.val) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let mstitem = flexGrid.cells.rows[ht.row].dataItem;
          if (
            this.dispMstGrid == DISP_MST_GRD.SienHouhou ||
            this.dispMstGrid == DISP_MST_GRD.KeikakuSienHouhou ||
            this.dispMstGrid == DISP_MST_GRD.ChiikiSienHouhou
          ) {
            let mstitem = flexGrid.cells.rows[ht.row].dataItem;
            if (mstitem.codeD == '') {
              this.selectDataObj.sdnhouid = 0;
              this.selectDataObj.sdnhourk = '';
            } else {
              this.selectDataObj.sdnhouid = mstitem.sdnhouid;
              this.selectDataObj.sdnhourk = mstitem.sdnhounm;
            }

            if (this.dispMstGrid == DISP_MST_GRD.SienHouhou) {
              this.inputClicked(DISP_MST_GRD.Kankei);
            } else if (this.dispMstGrid == DISP_MST_GRD.KeikakuSienHouhou) {
              this.inputClicked(DISP_MST_GRD.KeikakuKasan);
            } else if (this.dispMstGrid == DISP_MST_GRD.ChiikiSienHouhou) {
              this.inputClicked(DISP_MST_GRD.ChiikiKasan);
            }
          } else if (this.dispMstGrid == DISP_MST_GRD.Kankei) {
            let kankeiObj = flexGrid.cells.rows[ht.row].dataItem;
            if (kankeiObj.codeD == '') {
              this.selectDataObj.sdnkanid = 0;
              this.selectDataObj.sdnkanrk = '';
            } else {
              this.selectDataObj.sdnkanid = kankeiObj.sdnkanid;
              this.selectDataObj.sdnkanrk = kankeiObj.sdnkannm;
            }
            if (kankeiObj.honninflg == KANKEI_KBN.Honnin) {
              this.selectDataObj.sdnnam = this.userInfo.names;
              document.getElementById(INPUT_ID.Soudansya).disabled = true;
              document.getElementById(INPUT_ID.Soudansya).style.background =
                sysConst.COLOR.gridBackground;
              this.inputClicked(DISP_MST_GRD.Douseki1);
            } else {
              document.getElementById(INPUT_ID.Soudansya).disabled = false;
              document.getElementById(INPUT_ID.Soudansya).style.background =
                sysConst.COLOR.gridSelectedColor;
              this.inputClicked(DISP_MST_GRD.SoudansyaName);
            }
          } else if (this.dispMstGrid == DISP_MST_GRD.KeikakuKasan) {
            this.selectDataObj.kasanname = mstitem.name;
            this.inputClicked(DISP_MST_GRD.KeikakuKikanBasyo);
          } else if (this.dispMstGrid == DISP_MST_GRD.ChiikiItakusaki) {
            this.inputClicked(DISP_MST_GRD.SienKoumoku);
          } else if (this.dispMstGrid == DISP_MST_GRD.ChiikiKasan) {
            this.inputClicked(DISP_MST_GRD.ChiikiItakusaki);
          } else if (this.dispMstGrid == DISP_MST_GRD.KeikakuKikanBasyo) {
            this.selectDataObj.kikanbasyoname = mstitem.name;
            this.inputClicked(DISP_MST_GRD.Taiousyamei);
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.MstHerderItem.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.MstHerderItem[colIndex].dataname;
        col.header = this.MstHerderItem[colIndex].title;
        col.width = this.MstHerderItem[colIndex].width;
        col.align = this.MstHerderItem[colIndex].align;
      }

      flexGrid.endUpdate();
    },
    onInitializeSoudansyaMstIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        if (this.selectDataObj.inputkbn == sysConst.JIGYOKBN.Renraku) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let item = flexGrid.cells.rows[ht.row].dataItem;
          if (this.dispMstGrid == DISP_MST_GRD.SoudansyaName) {
            this.selectDataObj.sdnnam = item.sdnnam;
            this.inputClicked(DISP_MST_GRD.Douseki1);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki1) {
            this.selectDataObj.sdnnam1 = item.sdnnam;
            this.inputClicked(DISP_MST_GRD.Douseki2);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki2) {
            this.selectDataObj.sdnnam2 = item.sdnnam;
            this.inputClicked(DISP_MST_GRD.Douseki3);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki3) {
            this.selectDataObj.sdnnam3 = item.sdnnam;
            this.inputClicked(DISP_MST_GRD.SienKoumoku);
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.SoudansyaMstHerderItem.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.SoudansyaMstHerderItem[colIndex].dataname;
        col.width = this.SoudansyaMstHerderItem[colIndex].width;
        col.align = this.SoudansyaMstHerderItem[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(0, colIndex, GRD_TITLE.Soudansya);
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.SoudansyaMstHerderItem[colIndex].title
        );
      }
      flexGrid.endUpdate();
    },
    onInitializeSienMstIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        if (this.selectDataObj.inputkbn == sysConst.JIGYOKBN.Renraku.val) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let sienKoumokuObj = flexGrid.cells.rows[ht.row].dataItem;
          if (sienKoumokuObj.id == 0) {
            this.selectDataObj.cskmkid = sienKoumokuObj.tyucskmkid;
            this.selectDataObj.cskmknm = '';
          } else {
            this.selectDataObj.cskmkid = sienKoumokuObj.tyucskmkid;
            this.selectDataObj.cskmknm = sienKoumokuObj.tyunames;
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.SienMstHerderItem.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.SienMstHerderItem[colIndex].dataname;
        // col.header = this.headerList[colIndex].title;
        col.width = this.SienMstHerderItem[colIndex].width;
        col.align = this.SienMstHerderItem[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(0, colIndex, GRD_TITLE.Sienkoumoku);
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.SienMstHerderItem[colIndex].title
        );
      }

      flexGrid.endUpdate();
    },
    onInitializeRirekiIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          this.selectDataObj = flexGrid.cells.rows[ht.row].dataItem;
          this.setTaiouData();
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.RirekiHerderItem.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.RirekiHerderItem[colIndex].dataname;
        // col.header = this.RirekiHerderItem[colIndex].title;
        col.width = this.RirekiHerderItem[colIndex].width;
        col.align = this.RirekiHerderItem[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 0) {
          col.format = sysConst.FORMAT.Ymd;
        }

        flexGrid.columnHeaders.setCellData(0, colIndex, GRD_TITLE.Kojinrireki);
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.RirekiHerderItem[colIndex].title
        );
      }
      flexGrid.endUpdate();
    },
    onInitializeKihonIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();

      // ヘッダの設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.KihonHerderItem.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.KihonHerderItem[colIndex].dataname;
        col.width = this.KihonHerderItem[colIndex].width;
        col.align = this.KihonHerderItem[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(0, colIndex, GRD_TITLE.Kihon);
      }
      flexGrid.endUpdate();
    },
    onFormatItemmstIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.columnHeaders && e.col == 1) {
        if (
          this.dispMstGrid == DISP_MST_GRD.SienHouhou ||
          this.dispMstGrid == DISP_MST_GRD.KeikakuSienHouhou ||
          this.dispMstGrid == DISP_MST_GRD.ChiikiSienHouhou
        ) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.Sienhouhou);
        } else if (this.dispMstGrid == DISP_MST_GRD.Kankei) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.HonninnKankei);
        } else if (this.dispMstGrid == DISP_MST_GRD.ChiikiItakusaki) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.Itakusaki);
        } else if (
          this.dispMstGrid == DISP_MST_GRD.KeikakuKasan ||
          this.dispMstGrid == DISP_MST_GRD.ChiikiKasan
        ) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.Kasan);
        } else if (this.dispMstGrid == DISP_MST_GRD.KeikakuKikanBasyo) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.Kikan);
        }
      }
    },
    onFormatItemSoudansyaMstIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.columnHeaders && e.row == 0) {
        let title = '';
        if (this.dispMstGrid == DISP_MST_GRD.SoudansyaName) {
          title = TITLE_TXT.Soudansya;
        } else if (this.dispMstGrid == DISP_MST_GRD.Douseki1) {
          title = TITLE_TXT.Dousekisya1;
        } else if (this.dispMstGrid == DISP_MST_GRD.Douseki2) {
          title = TITLE_TXT.Dousekisya2;
        } else if (this.dispMstGrid == DISP_MST_GRD.Douseki3) {
          title = TITLE_TXT.Dousekisya3;
        }
        for (
          let colIndex = 0;
          colIndex < this.SoudansyaMstHerderItem.length;
          colIndex++
        ) {
          flexGrid.columnHeaders.setCellData(0, colIndex, title);
        }
      }
    },
    onFormatItemSienMstIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem != null) {
          flexGrid.beginUpdate();
          e.cell.style.borderBottom = '';
          // 仮想マージ
          // 上の行と同じ利用者の場合は空で表示する
          if (e.row > 0 && e.col < 2) {
            let tmpPreitem = e.panel.rows[e.row - 1].dataItem;
            if (
              tmpPreitem != null &&
              tmpitem.daicskmkid == tmpPreitem.daicskmkid
            ) {
              e.panel.setCellData(e.row, e.col, '');
            }
          }
          // 下の行と同じ利用者の場合は下線を非表示化
          if (e.row < flexGrid.rows.length - 1 && e.col < 2) {
            let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
            if (
              tmpNextitem != null &&
              tmpitem.daicskmkid == tmpNextitem.daicskmkid
            ) {
              e.cell.style.borderBottom = 0;
            }
          }
          flexGrid.endUpdate();
        }
      }
    },
    onFormatItemRirekiIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.col == 0) {
          e.cell.innerHTML =
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>' +
            '<font >' +
            tmpitem.jikan +
            '</font>';
        }
        // else if (e.col == 1) {
        //   e.cell.innerHTML =
        //     '<font color="#276bc5">' +
        //     tmpitem.cskmknm +
        //     '</font>' +
        //     '<div>' +
        //     wjCore.escapeHtml(e.cell.innerHTML) +
        //     '</div>';
        // }
      }
    },
    onFormatItemKihonIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.cells && e.col == 0) {
        e.cell.style.backgroundColor = sysConst.COLOR.selectedColor;
      }
    },
    onItemsSoudansyaMstSourceChanging(flexGrid) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      // if (this.dispMstGrid == DISP_MST_GRD.SoudansyaName) {
      //   if (this.selectDataObj.honninflg != KANKEI_KBN.Kazoku) {
      //     flexGrid.getColumn(2).visible = false;
      //     flexGrid.getColumn(3).visible = false;
      //   } else {
      //     flexGrid.getColumn(2).visible = true;
      //     flexGrid.getColumn(3).visible = true;
      //   }
      // } else {
      //   flexGrid.getColumn(2).visible = true;
      //   flexGrid.getColumn(3).visible = true;
      // }
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userInfo = row;
      if (this.userInfo.riid == 0) {
        this.dispUserName = '';
      } else {
        this.dispUserName =
          String(this.userInfo.riyocode).padStart(7, '0') +
          ' ' +
          this.userInfo.names;
        this.getMstSodansya();
        this.getSinkiKeizoku();
        this.getUktkKihon();
      }
      this.rirekiSearchClicked(
        this.kikanSymd.format('YYYYMMDD'),
        this.kikanEymd.format('YYYYMMDD'),
        this.userInfo.riid
      );
    },
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    inputYmCalendarClick(kbn) {
      if (kbn == 0) {
        this.datepicker_dialog_sym = true;
      } else {
        this.datepicker_dialog_eym = true;
      }
    },
    inputCalendarClick() {
      this.picker =
        this.taiouYmd.format('YYYY') +
        '-' +
        this.taiouYmd.format('MM') +
        '-' +
        this.taiouYmd.format('DD');
      this.datepicker_dialog = true;
    },
    jigyoKbnclick(kbn) {
      if (kbn == 3) {
        this.selectDataObj.syokaiflg = '';
      }
    },
    keikakuInputKbnclick(kbn) {
      if (kbn == sysConst.KEIKAKUJIGYOKBN.Keikaku.val) {
        this.getKasanMst(this.taiouYmd.format('YYYYMMDD'), 52);
      } else {
        this.getKasanMst(this.taiouYmd.format('YYYYMMDD'), 55);
      }
    },
    chiikiInputKbnclick(kbn) {
      if (kbn == sysConst.CHIIKIJIGYOKBN.Keikaku.val) {
        this.getKasanMst(this.taiouYmd.format('YYYYMMDD'), 53);
      } else {
        this.getKasanMst(this.taiouYmd.format('YYYYMMDD'), 54);
      }
    },
    setKihonInfo(newselectViewData) {
      // this.kihonInfo = newselectViewData;
      if (!newselectViewData) {
        this.selectDataObj = this.getKihonDefaultData();
      } else {
        this.selectDataObj = newselectViewData;
        this.setUserSelectPoint({
          riid: newselectViewData.intcode,
          riyocode: 0,
          riyocodeD: '',
          names: newselectViewData.rname,
          kana: '',
          jyukyuno: 0,
          jyukyunoD: '',
        });
      }
      if (this.selectDataObj.rname != '') {
        this.dispUserName = this.selectDataObj.rname;
        this.dispUserName =
          String(this.selectDataObj.riyocode).padStart(7, '0') +
          ' ' +
          this.selectDataObj.rname;
        this.taiouYmd = dayjs(this.selectDataObj.ymd);
      } else {
        this.dispUserName = '';
      }

      this.rirekiSearchClicked(
        this.selectDataObj.taiouYmd,
        this.selectDataObj.taiouYmd,
        this.selectDataObj.intcode
      );
      this.handleResize();
    },

    /**************
     * 月の選択 ダイアログの日付を押下
     */
    dateSelect() {
      this.taiouYmd = dayjs(this.picker);
      this.datepicker_dialog = false;
    },
    //カレンダーボタンの日付遷移
    calendarClick(type) {
      let tmpdate;
      if (type == 0) {
        tmpdate = new dayjs();
      } else if (type == 1) {
        tmpdate = dayjs(
          this.taiouYmd.format('YYYY') +
            '-' +
            this.taiouYmd.format('MM') +
            '-' +
            this.taiouYmd.format('DD')
        ).add(-1, 'days');
      } else if (type == 2) {
        tmpdate = dayjs(
          this.taiouYmd.format('YYYY') +
            '-' +
            this.taiouYmd.format('MM') +
            '-' +
            this.taiouYmd.format('DD')
        ).add(1, 'days');
      }
      this.taiouYmd = tmpdate;
    },
    timeClick(type) {
      if (type == 0) {
        this.selectDataObj.jikan = '';
      } else if (type == 1) {
        let mom = new dayjs();
        this.selectDataObj.jikan = mom.format('HH:mm');
      } else if (type == 2) {
        this.selectDataObj.etime = '';
      } else if (type == 3) {
        let mom = new dayjs();
        this.selectDataObj.etime = mom.format('HH:mm');
      }
    },
    getYmd() {
      if (!this.taiouYmd) {
        this.taiouYmd = dayjs();
      }
      return (
        this.taiouYmd.format('YYYY') +
        '年' +
        this.taiouYmd.format('MM') +
        '月' +
        this.taiouYmd.format('DD') +
        '日'
      );
    },
    inputClicked(kbn) {
      if (kbn != DISP_MST_GRD.User) {
        document.getElementById(GRD_ID.Mst).style.display = STYLE_NONE;
        document.getElementById(GRD_ID.SoudansyaMst).style.display = STYLE_NONE;
        document.getElementById(GRD_ID.SienMst).style.display = STYLE_NONE;
        this.rightTab = TAB_NAME.Mst;
      } else {
        this.rightTab = TAB_NAME.User;
      }
      this.dispMstGrid = kbn;
      switch (kbn) {
        case DISP_MST_GRD.SienHouhou:
        case DISP_MST_GRD.Kankei:
        case DISP_MST_GRD.KeikakuSienHouhou:
        case DISP_MST_GRD.KeikakuKasan:
        case DISP_MST_GRD.ChiikiSienHouhou:
        case DISP_MST_GRD.ChiikiKasan:
        case DISP_MST_GRD.KeikakuKikanBasyo:
        case DISP_MST_GRD.Taiousyamei:
          this.mstdata = this.getMstData(kbn);
          document.getElementById(GRD_ID.Mst).style.display = STYLE_BLOCK;

          if (kbn == DISP_MST_GRD.SienHouhou) {
            this.setFocus(INPUT_ID.SienHouhou);
          } else if (kbn == DISP_MST_GRD.Kankei) {
            this.setFocus(INPUT_ID.Kankei);
          } else if (kbn == DISP_MST_GRD.KeikakuKasan) {
            this.setFocus(INPUT_ID.KeikakuKasan);
          } else if (kbn == DISP_MST_GRD.ChiikiKasan) {
            this.setFocus(INPUT_ID.ChiikiKasan);
          } else if (kbn == DISP_MST_GRD.SoudansyaName) {
            this.setFocus(INPUT_ID.KeikakuKikanBasyo);
          } else if (kbn == DISP_MST_GRD.Taiousyamei) {
            this.setFocus(INPUT_ID.Taiousyamei);
          }
          break;
        case DISP_MST_GRD.SoudansyaName:
          if (this.selectDataObj.honninflg != KANKEI_KBN.Kazoku) {
            this.soudansyaMstdata = this.getSoudansyaMstData().filter(
              (x) => !x.isKazoku
            );
          } else {
            this.soudansyaMstdata = this.getSoudansyaMstData().filter(
              (x) => x.isKazoku
            );
          }
          document.getElementById(GRD_ID.SoudansyaMst).style.display =
            STYLE_BLOCK;
          this.setFocus(INPUT_ID.Soudansya);
          break;
        case DISP_MST_GRD.Douseki1:
        case DISP_MST_GRD.Douseki2:
        case DISP_MST_GRD.Douseki3:
          this.soudansyaMstdata = this.getSoudansyaMstData();
          document.getElementById(GRD_ID.SoudansyaMst).style.display =
            STYLE_BLOCK;
          if (kbn == DISP_MST_GRD.Douseki1) {
            this.setFocus(INPUT_ID.Dousekisya1);
          } else if (kbn == DISP_MST_GRD.Douseki2) {
            this.setFocus(INPUT_ID.Dousekisya2);
          } else if (kbn == DISP_MST_GRD.Douseki3) {
            this.setFocus(INPUT_ID.Dousekisya3);
          }
          break;
        case DISP_MST_GRD.SienKoumoku:
          document.getElementById(GRD_ID.SienMst).style.display = STYLE_BLOCK;
          this.setFocus(INPUT_ID.Sienkoumoku);
          break;
        case DISP_MST_GRD.ChiikiItakusaki:
          document.getElementById(GRD_ID.Mst).style.display = STYLE_BLOCK;
          this.mstdata = this.getMstData(kbn);
          this.setFocus(INPUT_ID.ChiikiItakusaki);
          break;
        case DISP_MST_GRD.User:
          this.setFocus(INPUT_ID.User);
          break;
      }
    },
    setFocus(id) {
      if (document.getElementById(id) != null) {
        document.getElementById(id).focus();
      }
    },
    // クリア
    clrClicked(kbn) {
      if (kbn == 0) {
        this.setUserSelectPoint({
          riid: 0,
          riyocode: 0,
          riyocodeD: '',
          names: '',
          kana: '',
          jyukyuno: 0,
          jyukyunoD: '',
        });
        this.selectDataObj = this.getKihonDefaultData();
        this.inputClicked(99);
      } else {
        this.selectDataObj.rcnt = 0;
        this.selectDataObj.cskmknm = '';
        this.selectDataObj.cskmkid = 0;
        this.selectDataObj.naiyo = '';
        this.selectDataObj.kan = 0;
        this.selectDataObj.peer = 0;
        this.selectDataObj.syoyoujikan = '';
        this.selectDataObj.rank = 0;
        this.inputClicked(7);
      }
    },
    // 削除
    delClicked() {
      if (this.selectDataObj.rcnt == 0) {
        alert('削除対象データ' + messageConst.INPUT_ERROR.NO_SELECT);
        return;
      }
      if (confirm(messageConst.CONFIRM.DELETE)) {
        let params = {
          uniqid: 3,
          traceid: 123,
        };
        let body = {
          jigyoid: 62,
          ymd: this.taiouYmd.format('YYYYMMDD'),
          rcnt: this.selectDataObj.rcnt,
        };
        deleteConnect('/Uktk', params, 'SIENT', body).then(() => {
          this.clrClicked(0);
          this.editFlg = true;
        });
      }
    },
    // 登録
    addClicked() {
      if (!this.userInfo.riid || this.userInfo.riid == 0) {
        alert('利用者' + messageConst.INPUT_ERROR.NO_SELECT);
        return;
      }
      if (this.selectDataObj.jikan.length == 0) {
        alert('開始時間' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }
      if (this.selectDataObj.cskmknm.length == 0) {
        alert('支援項目' + messageConst.INPUT_ERROR.NO_SELECT);
        return;
      }
      if (this.selectDataObj.naiyo.length == 0) {
        alert('内容' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }
      if (this.selectDataObj.rcnt == 0) {
        if (confirm(messageConst.CONFIRM.POST)) {
          let params = {
            uniqid: 3,
            traceid: 123,
            pIntcode: this.userInfo.riid,
          };
          postConnect('/Uktk', params, 'SIENT', this.createPostData()).then(
            () => {
              this.clrClicked(1);
              this.editFlg = true;
            }
          );
        }
      } else {
        if (confirm(messageConst.CONFIRM.PUT)) {
          let params = {
            uniqid: 3,
            traceid: 123,
            pIntcode: this.userInfo.riid,
            pJigyoid: 62,
            pOldymd: this.selectDataObj.ymd,
            pOldrcnt: this.selectDataObj.rcnt,
          };
          putConnect('/Uktk', params, 'SIENT', this.selectDataObj).then(() => {
            this.clrClicked(1);
            this.editFlg = true;
          });
        }
      }
    },
    createPostData() {
      let cskbn = 0;
      if (this.kbnTab == sysConst.JIGYO_KBN_NAME.KIHON) {
        cskbn = 3;
      } else if (this.kbnTab == sysConst.JIGYO_KBN_NAME.KEIKAKU) {
        cskbn = 3;
      } else if (this.kbnTab == sysConst.JIGYO_KBN_NAME.CHIIKI) {
        cskbn = 3;
      }

      let doukousya = [];
      if (this.selectDataObj.sdnnam1.trim().length > 0) {
        doukousya.push(this.selectDataObj.sdnnam1.trim());
      }
      if (this.selectDataObj.sdnnam2.trim().length > 0) {
        doukousya.push(this.selectDataObj.sdnnam2.trim());
      }
      if (this.selectDataObj.sdnnam3.trim().length > 0) {
        doukousya.push(this.selectDataObj.sdnnam3.trim());
      }

      let result = {
        jigyoid: 62,
        ymd: this.taiouYmd.format('YYYYMMDD'),
        rcnt: 0,
        siid: 261,
        intcode: this.userInfo.riid,
        jikan: this.selectDataObj.jikan,
        cskbn: cskbn,
        cskmkid: this.selectDataObj.cskmkid,
        kan: this.selectDataObj.kan ? 1 : 0,
        nkbn: 1,
        syoyo: this.selectDataObj.syoyoujikan,
        rank: this.selectDataObj.rank,
        peer: this.selectDataObj.peer,
        sgyjky: 1,
        naiyo: this.selectDataObj.naiyo,
        sdntioflg: 1,
        sdnhouid: this.selectDataObj.sdnhouid,
        sdnhouchuid: 0,
        sdnkanid: this.selectDataObj.sdnkanid,
        sdnkanchuid: 0,
        sdnnam: this.selectDataObj.sdnkanrk,
        sdntel: '',
        // dokoflg: doukousya.length == 0 ? 0 : 1,
        dokosha: doukousya,
        sdnkeiroid: 0,
        sykkbn: this.selectDataObj.sykkbn,
        kasan: 0,
        homon: 0,
        kikan: '',
        tanto: '',
        basho: '',
        etime: '',
        cssaiid: [0],
        uline: [
          {
            kbn: 0,
            gyo: 0,
            st: 0,
            ed: 0,
          },
        ],
      };

      return result;
    },
    getKihonDefaultData() {
      let obj = {
        inputkbn: 0,
        syokaiflg: 1,
        jigyoid: 0,
        ymd: 0,
        ymdD: '',
        rcnt: 0,
        jikan: '',
        intcode: 0,
        riyocode: 0,
        riyocodeD: '',
        rname: '',
        rkana: '',
        sex: 0,
        sexname: '',
        birth: 0,
        age: 0,
        cskbn: 0,
        kasanumu: 0,
        nkbn: 0,
        // dokoflg: 0,
        dokosha: [],
        sdntioflg: 0,
        sdntiork: '',
        sdnhouid: 0,
        sdnhourk: '',
        sdnhouchuid: 0,
        sdnhouchurk: '',
        sdnkanid: 0,
        sdnkanrk: '',
        sdnkanchuid: 0,
        sdnkanchurk: '',
        sdnnam: '',
        sdnnam1: '',
        sdnnam2: '',
        sdnnam3: '',
        sdntel: '',
        setaiid: 0,
        setairk: '',
        honninid: 0,
        honninrk: '',
        kasan: 0,
        kasanrk: '',
        homon: 0,
        kikan: '',
        tanto: '',
        basho: '',
        etime: '',
        sykkbn: 0,
        sykkbnkigo: '0',
        daicskmkid: 0,
        daicskmkrk: '0',
        cskmkid: 0,
        cskmknm: '',
        naiyo: '',
        uline: [],
        syoyo: 0,
        rank: 0,
        ranknm: '',
        peer: 0,
        peermark: '',
        kan: 0,
        nismark: '',
        siid: 0,
        sryaku: '',
      };
      if (this.kbnItem != undefined) {
        if (this.kbnTab == this.kbnItem[1].hrefval) {
          obj.cskbn = sysConst.KEIKAKUJIGYOKBN.Keikaku.val;
        } else if (this.kbnTab == this.kbnItem[2].hrefval) {
          obj.cskbn = sysConst.CHIIKIJIGYOKBN.Keikaku.val;
          obj.kasanumu = 0;
        }
      }

      return obj;
    },
    numbervalidate() {
      this.selectDataObj.syoyoujikan = this.hankaku2Zenkaku(
        this.selectDataObj.syoyoujikan
      );
      if (isNaN(this.selectDataObj.syoyoujikan)) {
        this.selectDataObj.syoyoujikan = '';
        return;
      }
      if (String(this.selectDataObj.syoyoujikan).length > 3) {
        this.selectDataObj.syoyoujikan = Number(
          String(this.selectDataObj.syoyoujikan).slice(0, 3)
        );
      }

      this.selectDataObj.syoyoujikan = this.selectDataObj.syoyoujikan.replace(
        /\D/g,
        ''
      );
    },
    hankaku2Zenkaku(str) {
      return str.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
    },
    onRirekiKoumokuClicked() {
      this.selRirekiKoumoku = this.RirekiKoumokuList[this.selRirekiKoumoku].val;
    },
    rirekiSearchClicked(symd, eymd, riid) {
      if (!symd && !eymd && !riid) {
        symd = this.kikanSymd.format('YYYYMMDD');
        eymd = this.kikanEymd.format('YYYYMMDD');
        riid = this.userInfo.riid;
      } else if (riid == 0) {
        this.rirekidata = [];
        return;
      }
      let endDate = this.kikanEymd.endOf('month').format('DD');
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pIntcode: this.userInfo.riid,
        pSymd: this.kikanSymd.format('YYYYMMDD'),
        pEymd: this.kikanEymd.format('YYYYMM') + endDate,
        Dspkbn: 0,
      };
      getConnect('/Uktk', params, 'SIENT').then((result) => {
        this.rirekidata = result;
      });
    },
    kihonInputClicked() {},
    getMstData(kbn) {
      let tmpviewdata = [];
      tmpviewdata.push({
        id: 0,
        codeD: '',
        name: '',
        nameD: 'クリア',
      });

      if (
        kbn == DISP_MST_GRD.SienHouhou ||
        kbn == DISP_MST_GRD.KeikakuSienHouhou ||
        kbn == DISP_MST_GRD.ChiikiSienHouhou
      ) {
        return this.mstHouhouList;
      } else if (kbn == DISP_MST_GRD.Kankei) {
        return this.mstKankeiList;
      } else if (kbn == DISP_MST_GRD.ChiikiItakusaki) {
        return this.mstItakuList;
      } else if (
        kbn == DISP_MST_GRD.KeikakuKasan ||
        kbn == DISP_MST_GRD.ChiikiKasan
      ) {
        return this.mstKasanList;
      } else if (kbn == DISP_MST_GRD.KeikakuKikanBasyo) {
        return this.mstKikanList;
      }

      return tmpviewdata;
    },
    getSoudansyaMstData() {
      let tmpviewdata = [];
      tmpviewdata.push(
        {
          id: 0,
          code: 0,
          codeD: '',
          sdnnam: '',
          sdnnamD: 'クリア',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        {
          id: 1,
          code: 1,
          codeD: String(1).padStart(3, '0'),
          sdnnam: '関係者 一郎',
          sdnnamD: '関係者 一郎',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '022-232-1123',
          isKazoku: false,
        },
        {
          id: 2,
          code: 2,
          codeD: String(2).padStart(3, '0'),
          sdnnam: '関係者 次郎太',
          sdnnamD: '関係者 次郎太',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '022-232-1124',
          isKazoku: false,
        },
        {
          id: 3,
          code: 1,
          codeD: String(1).padStart(3, '0'),
          sdnnam: '家族 花子',
          sdnnamD: '家族 花子',
          tudukigara: '母親',
          mimoto: '○',
          rennrakusaki: '022-232-4567',
          isKazoku: true,
        },
        {
          id: 4,
          code: 2,
          codeD: String(2).padStart(3, '0'),
          sdnnam: '家族 太郎',
          sdnnamD: '家族 太郎',
          tudukigara: '兄',
          mimoto: '',
          rennrakusaki: '022-232-6789',
          isKazoku: true,
        }
      );
      return tmpviewdata;
    },
    getSYm() {
      if (!this.kikanSymd) {
        this.kikanSymd = dayjs()
          .subtract(1, 'year')
          .add(1, 'months')
          .set('date', 1);
        this.pickersym =
          this.kikanSymd.year() + '-' + this.kikanSymd.format('MM');
      }
      return (
        this.kikanSymd.format('YYYY') +
        '年' +
        this.kikanSymd.format('MM') +
        '月'
      );
    },
    getEYm() {
      if (!this.kikanEymd) {
        this.kikanEymd = dayjs().set('date', dayjs().daysInMonth());
        this.pickereym =
          this.kikanEymd.year() + '-' + this.kikanEymd.format('MM');
      }
      return (
        this.kikanEymd.format('YYYY') +
        '年' +
        this.kikanEymd.format('MM') +
        '月'
      );
    },
    monthSelect(kbn) {
      if (kbn == 0) {
        this.kikanSymd = dayjs(this.pickersym);
        this.datepicker_dialog_sym = false;
      } else {
        this.kikanEymd = dayjs(this.pickereym);
        this.datepicker_dialog_eym = false;
      }
    },
    rightTabkbnChange(kbn) {
      if (kbn == TAB_NAME.Mst && this.mstdata.length == 0) {
        this.inputClicked(DISP_MST_GRD.SienHouhou);
      }
    },
    kbnChange(href) {
      let style;
      if (href == this.kbnItem[0].hrefval) {
        style = STYLE_FLEX;
      } else if (href == this.kbnItem[1].hrefval) {
        style = STYLE_NONE;
      } else if (href == this.kbnItem[2].hrefval) {
        style = STYLE_NONE;
      }
      let elList = document.getElementsByName(HIDE_NAME.hideitem);
      for (let i = 0; i < elList.length; i++) {
        elList[i].style.display = style;
      }
      this.keikakuDispChange();
    },
    /*
     加算有無による画面表示切り替え
     */
    KasanUmuclick(kbn, kind) {
      if (kind == 0) {
        // 計画相談
        this.selectDataObj.kasanumu = kbn;
      } else {
        // 地域相談
        this.selectDataObj.kasanumu = kbn;
      }
      this.keikakuDispChange();
    },
    keikakuDispChange() {
      if (this.kbnTab == this.kbnItem[0].hrefval) {
        this.dipCommonFlg = true;
      } else if (this.kbnTab == this.kbnItem[1].hrefval) {
        if (this.selectDataObj.kasanumu == this.kasanUmuItem[1].val) {
          this.dipCommonFlg = false;
        } else {
          this.dipCommonFlg = true;
        }
      } else if (this.kbnTab == this.kbnItem[2].hrefval) {
        if (
          this.selectDataObj.kasanumu == this.kasanUmuItem[0].val ||
          this.selectDataObj.kasanumu == this.kasanUmuItem[2].val
        ) {
          this.dipCommonFlg = true;
        } else {
          this.dipCommonFlg = false;
        }
      }
      this.handleResize();
    },
    handleResize() {
      this.windowheight = window.innerHeight;
      let el = document.getElementById(INPUT_ID.Naiyo);
      let elTxt = document.getElementsByTagName('textarea')[0];
      if (el == null || elTxt == null) {
        return;
      }
      let tmp = 0;
      let minheight = 0;
      let defheight = 720;
      if (this.kbnTab == this.kbnItem[0].hrefval) {
        tmp = this.windowheight - (defheight - NAIYO_HEIGHT.height2);
        minheight = NAIYO_HEIGHT.height2;
      } else if (
        this.kbnTab == this.kbnItem[1].hrefval &&
        this.selectDataObj.kasanumu == this.kasanUmuItem[1].val
      ) {
        tmp = this.windowheight - (defheight - NAIYO_HEIGHT.height1);
        minheight = NAIYO_HEIGHT.height1;
      } else {
        tmp = this.windowheight - (defheight - NAIYO_HEIGHT.height2);
        minheight = NAIYO_HEIGHT.height2;
      }
      if (tmp < minheight) {
        tmp = minheight;
      }
      el.style.height = tmp + 'px';
      elTxt.style.height = tmp + 'px';
    },
    setTaiouData() {
      this.taiouYmd = dayjs(this.selectDataObj.taiouYmdf);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#uketukeTouroku {
  background: $white;
  color: $font_color;
  font-size: 14px;
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1120px !important;
  max-width: 1120px;
  width: 1120px;
  height: auto;
  min-height: 500px !important;
  // width: auto;

  .centerArea {
    // margin-right: 4px;
    min-width: 700px;
    max-width: 700px;
    .v-tab {
      border: 1px solid;
      margin-right: 4px;
      // margin-bottom: -2px;
      border-color: $light-gray;
      border-bottom: none;
      height: 25px;
      // background: $font_color_saturday;
    }
    .v-tab--active {
      color: $white;
      background: teal;
      border-color: teal;
    }
    .v-tabCont {
      border-top: 2px solid;
      // border-bottom: 2px solid;
      border-color: teal;
      // height: 150px;
    }
    .btmborder {
      border: 1px solid;
      border-color: teal;
    }

    .v-textarea {
      border: none;
      border-color: $light-gray;
      font-size: 14px;
      border-radius: 0px;
      width: 410px;
      min-width: 410px;
      max-width: 410px;

      textarea {
        width: 370px;
        padding-left: 2px;
        border: thin solid;
        border-color: $light-gray;
        margin: 0px;
        line-height: normal; /* 初期値 */
        height: 148px;
      }
      :focus {
        border: 1px solid #ff9900;
        outline: 0;
      }
    }

    .v-input__slot {
      padding-left: 0px;
    }
  }
  .rightArea {
    min-width: 420px;
    max-width: 420px;
    min-height: 520px;
    max-height: 1080px;
    border: thin solid;
    border-color: green;

    .v-tab {
      border: thin solid;
      border-radius: 10px;
      height: 25px;
    }
    .v-slide-group__content {
      background-color: $white !important;
    }
    #mstIcrnGrid,
    #soudansyaMstIcrnGrid,
    #sienMstIcrnGrid,
    #rirekiIcrnGrid,
    #kihonIcrnGrid {
      color: $font_color;
      font-size: $cell_fontsize;
      height: 73vh;
      background: $grid_background;
      // max-width: 100%;
      .wj-header {
        // ヘッダのみ縦横中央寄せ
        color: $font_color;
        font-size: $cell_fontsize;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: normal;
      }
      .wj-cell-maker {
        width: 15px;
        height: 15px;
      }
      .wj-cell {
        padding: 2px;
      }
      .wj-cell:not(.wj-header) {
        background: $grid_background;
      }
      .wj-cells
        .wj-row:hover
        .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
        transition: all 0s;
        background: $grid_hover_background;
      }

      .wj-cells .wj-cell.wj-state-multi-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
      }

      .wj-cells .wj-cell.wj-state-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
      }
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
    }
  }

  .rowStyleHigh {
    height: 150px;
  }
}
#uketukeTourokuDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 130px;
  left: 250px;
  width: 300px;
  max-width: 300px;
}
#uketukeTourokuDatepickerSym,
#uketukeTourokuDatepickerEym {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 150px;
  left: 820px;
  width: 300px;
  max-width: 300px;
}
</style>
