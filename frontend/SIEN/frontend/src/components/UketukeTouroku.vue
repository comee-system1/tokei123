<template>
  <div id="uketukeTouroku">
    <v-container no-gutters fluid class="container pa-0">
      <v-row no-gutters>
        <v-col class="centerArea">
          <v-container no-gutters fluid class="container pa-0 mt-1">
            <v-row no-gutters class="rowStyle">
              <v-card class="koumokuTitle pa-1" outlined tile>
                対応者名
              </v-card>
              <v-card class="koumokuData ml-1 pa-1" tile outlined>
                {{ tantouData.code }} {{ tantouData.name }}
              </v-card>
              <v-col cols="*">
                <v-card class="ml-1 pa-1" style="border: none" tile outlined>
                  <div align="right">
                    <font class="hissu"><b>*</b></font
                    >:必須項目
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                対応日<span class="mandatoryMark"> * </span>
              </v-card>
              <v-card
                class="ml-1"
                color="transparent"
                height="100%"
                style="border: none"
                outlined
                tile
              >
                <v-btn
                  @click="inputCalendarClick()"
                  tile
                  outlined
                  width="160px"
                  height="100%"
                  >{{ getYmd() }}
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
                <v-btn
                  elevation="0"
                  class="pa-0 ml-1"
                  height="100%"
                  x-small
                  tile
                  @click="calendarClick(1)"
                >
                  <v-icon>mdi-arrow-left-bold</v-icon>
                </v-btn>
                <v-btn
                  elevation="0"
                  class="pa-0 ml-1"
                  height="100%"
                  x-small
                  tile
                  @click="calendarClick(0)"
                  >今日
                </v-btn>
                <v-btn
                  elevation="0"
                  class="pa-0 ml-1"
                  height="100%"
                  x-small
                  tile
                  @click="calendarClick(2)"
                >
                  <v-icon>mdi-arrow-right-bold</v-icon>
                </v-btn>
                <v-btn
                  elevation="0"
                  class="pa-0 ml-1"
                  height="100%"
                  x-small
                  tile
                  @click="searchClick()"
                  >利用者検索
                </v-btn>
              </v-card>
            </v-row>
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                利用者名<span class="mandatoryMark"> * </span>
              </v-card>
              <input
                id="uketukeTourokuUser"
                type="text"
                class="ml-1"
                style="width: 300px"
                name="txtuser"
                v-model="dispUserName"
                @click="inputClicked(99)"
                readonly="readonly"
              />
            </v-row>
            <v-row no-gutters class="rowStyle mt-1 mb-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                開始時間<span class="mandatoryMark"> * </span>
              </v-card>
              <input
                class="ml-1"
                type="time"
                id="timeinput"
                name="appt"
                v-model="rirekiDataSelect.sTime"
              />
              <v-btn
                elevation="0"
                class="pa-0 ml-1"
                height="100%"
                x-small
                tile
                @click="timeClick(0)"
                >クリア
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 ml-1"
                height="100%"
                x-small
                tile
                @click="timeClick(1)"
                >現時刻
              </v-btn>
            </v-row>
            <!-- <v-divider class="mt-1"></v-divider> -->
            <!-- <v-row no-gutters class="rowStyle" style="display: none"> -->
            <v-row no-gutters class="rowStyle mt-1" style="display: none">
              <v-card class="koumokuTitle pa-1" outlined tile>
                事業区分<span class="mandatoryMark"> * </span>
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
              <v-tabs-items v-model="kbnTab">
                <!-- transition="false" -->
                <v-tab-item value="Kihonsoudan" eager>
                  <v-container
                    no-gutters
                    fluid
                    class="container ma-0 pa-0"
                    style="height: 100%"
                  >
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        入力区分<span class="mandatoryMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1"
                        v-model="rirekiDataSelect.inputkbn"
                      >
                        <v-btn
                          v-for="n in jigyoKbnItem"
                          :key="n.val"
                          small
                          outlined
                          @click="jigyoKbnclick(n.val)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        初回・継続
                      </v-card>
                      <v-btn-toggle
                        id="uketukeTourokuSyokaibtn"
                        class="flex-wrap ml-1"
                        v-model="rirekiDataSelect.syokaiflg"
                      >
                        <v-btn
                          v-for="n in SyokaiorKeizokuItem"
                          :key="n.val"
                          small
                          outlined
                          v-bind:disabled="rirekiDataSelect.inputkbn == 3"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                      <v-card
                        class="koumokuData ml-1 pa-1"
                        width="200px"
                        tile
                        outlined
                        v-if="kihonInfo.syokaikeizoku == 1"
                      >
                        初回日：{{ kihonInfo.syokaiymd }}
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
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        入力区分<span class="mandatoryMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1"
                        v-model="kihonInfo.keikakuSoudanObj.inputkbn"
                      >
                        <v-btn
                          v-for="n in keikakuInputKbnItem"
                          :key="n.val"
                          small
                          outlined
                          @click="keikakuInputKbnclick(n.val)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        加算有無<span class="mandatoryMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1"
                        v-model="kihonInfo.keikakuSoudanObj.kasanUmu"
                      >
                        <v-btn
                          v-for="n in kasanUmuItem"
                          :key="n.val"
                          small
                          outlined
                          @click="KasanUmuclick(n.val, 0)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.keikakuSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        支援方法
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuSienHouhou"
                        type="text"
                        class="ml-1"
                        name="txtsienhouhou_keikaku"
                        v-model="rirekiDataSelect.sdnhourk"
                        @click="inputClicked(11)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.keikakuSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        加算項目
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuKasan"
                        type="text"
                        class="ml-1"
                        style="width: 400px"
                        name="txtkasankoumoku_keikaku"
                        v-model="kihonInfo.keikakuSoudanObj.kasanname"
                        @click="inputClicked(12)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.keikakuSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        機関・場所
                      </v-card>
                      <input
                        id="uketukeTourokuKeikakuKikanBasyo"
                        type="text"
                        class="ml-1"
                        style="width: 400px"
                        name="txtkikanBasyo"
                        v-model="kihonInfo.keikakuSoudanObj.kikanbasyoname"
                        @click="inputClicked(13)"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.keikakuSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        対応者名
                      </v-card>
                      <input
                        id="taiousyamei_keikaku"
                        type="text"
                        class="ml-1"
                        style="width: 400px"
                        name="txttaiousyamei"
                        v-model="kihonInfo.keikakuSoudanObj.taiousyameiname"
                        @click="inputClicked(14)"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.keikakuSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        終了時間<span class="mandatoryMark"> * </span>
                      </v-card>
                      <input
                        class="ml-1"
                        type="time"
                        id="timeinput"
                        name="appt"
                        v-model="kihonInfo.keikakuSoudanObj.etime"
                      />
                      <v-btn
                        elevation="0"
                        class="pa-0 ml-1"
                        height="100%"
                        x-small
                        tile
                        @click="timeClick(2)"
                        >クリア
                      </v-btn>
                      <v-btn
                        elevation="0"
                        class="pa-0 ml-1"
                        height="100%"
                        x-small
                        tile
                        @click="timeClick(3)"
                        >現時刻
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
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        入力区分<span class="mandatoryMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1"
                        v-model="kihonInfo.inputkbn"
                      >
                        <v-btn
                          v-for="n in chiikiInputKbnItem"
                          :key="n.val"
                          small
                          outlined
                          @click="chiikiInputKbnclick(n.val)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row no-gutters class="rowStyle mt-1">
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        加算有無<span class="mandatoryMark"> * </span>
                      </v-card>
                      <v-btn-toggle
                        class="flex-wrap ml-1"
                        v-model="kihonInfo.kasanUmu"
                      >
                        <v-btn
                          v-for="n in kasanUmuItem"
                          :key="n.val"
                          small
                          outlined
                          @click="KasanUmuclick(n.val, 1)"
                        >
                          {{ n.name }}
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.chiikiSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        支援方法
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiSienHouhou"
                        type="text"
                        class="ml-1"
                        name="txtsienhouhou_chiiki"
                        v-model="rirekiDataSelect.sdnhourk"
                        @click="inputClicked(21)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.chiikiSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        加算項目
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiKasan"
                        type="text"
                        class="ml-1"
                        style="width: 400px"
                        name="txtkasankoumoku_chiiki"
                        v-model="kihonInfo.chiikiSoudanObj.kasanname"
                        @click="inputClicked(22)"
                        readonly="readonly"
                      />
                    </v-row>
                    <v-row
                      v-if="
                        kihonInfo.chiikiSoudanObj.kasanumu ==
                        kasanUmuItem[1].val
                      "
                      no-gutters
                      class="rowStyle mt-1"
                    >
                      <v-card class="koumokuTitle pa-1" outlined tile>
                        委託先
                      </v-card>
                      <input
                        id="uketukeTourokuChiikiItakusaki"
                        type="text"
                        class="ml-1"
                        style="width: 400px"
                        name="txtitakusaki"
                        v-model="kihonInfo.chiikiSoudanObj.itakusakiname"
                        @click="inputClicked(23)"
                      />
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-container>
            <v-row no-gutters class="rowStyle mt-1" v-if="dipCommonFlg">
              <v-card class="koumokuTitle pa-1" outlined tile>
                支援方法
              </v-card>
              <input
                id="uketukeTourokuSienhouhou"
                type="text"
                class="ml-1"
                name="txtsienhouhou"
                v-model="rirekiDataSelect.sdnhourk"
                @click="inputClicked(1)"
                readonly="readonly"
              />
              <v-card class="koumokuTitle ml-1 pa-1" outlined tile>
                同席者１
              </v-card>
              <input
                id="uketukeTourokuDousekisya1"
                type="text"
                class="ml-1"
                name="txtdouseki1"
                v-model="kihonInfo.dousekisya1Obj.name"
                @click="inputClicked(4)"
              />
            </v-row>
            <v-row no-gutters class="rowStyle mt-1" v-if="dipCommonFlg">
              <v-card class="koumokuTitle pa-1" outlined tile> 関係 </v-card>
              <input
                id="uketukeTourokuKankei"
                type="text"
                class="ml-1"
                name="txtkaneki"
                v-model="rirekiDataSelect.sdnkanrk"
                @click="inputClicked(2)"
                readonly="readonly"
              />
              <v-card class="koumokuTitle ml-1 pa-1" outlined tile>
                同席者２
              </v-card>
              <input
                id="uketukeTourokuDousekisya2"
                type="text"
                class="ml-1"
                name="txtdouseki2"
                v-model="kihonInfo.dousekisya2Obj.name"
                @click="inputClicked(5)"
              />
            </v-row>
            <v-row no-gutters class="rowStyle mt-1" v-if="dipCommonFlg">
              <v-card class="koumokuTitle pa-1" outlined tile>
                相談者名
              </v-card>
              <input
                id="uketukeTourokuSoudansya"
                type="text"
                class="ml-1"
                name="txtsoudansya"
                v-model="rirekiDataSelect.sdnnam"
                @click="inputClicked(3)"
              />
              <v-card class="koumokuTitle ml-1 pa-1" outlined tile>
                同席者３
              </v-card>
              <input
                id="uketukeTourokuDousekisya3"
                type="text"
                class="ml-1"
                name="txtdouseki3"
                v-model="kihonInfo.dousekisya3Obj.name"
                @click="inputClicked(6)"
              />
            </v-row>
            <v-divider class="btmborder mt-1"></v-divider>
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                支援項目<span class="mandatoryMark"> * </span>
              </v-card>
              <input
                id="uketukeTourokuSienkoumoku"
                style="width: 400px"
                type="text"
                class="ml-1"
                name="txtsienkoumoku"
                v-model="rirekiDataSelect.cskmknm"
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
                class="koumokuTitle pa-1"
                style="position: relative"
                outlined
                tile
              >
                内容
                <span class="mandatoryMark"> * </span>
              </v-card>
              <v-textarea
                id="uketukeTourokuNaiyoTxt"
                class="ma-0 pa-0 ml-1"
                clearable
                clear-icon="mdi-close-circle"
                no-resize
                v-model="rirekiDataSelect.naiyo"
                height="100%"
                hide-details
                solo
                flat
                row-height="15"
              ></v-textarea>
            </v-row>

            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>業務日誌</v-card>
              <v-checkbox
                class="ma-0 pa-0 mr-2"
                v-model="rirekiDataSelect.kan"
                :label="'表示する'"
                style="width: 200px"
              >
              </v-checkbox>
              <div name="hideitem" class="rowStyle" style="display: flex">
                <v-card
                  class="koumokuTitle pa-1 ml-1"
                  outlined
                  tile
                  v-if="dispPeerCounselor"
                >
                  ﾋﾟｱｶｳﾝｾﾗｰ
                </v-card>
                <v-btn-toggle
                  class="flex-wrap ml-1"
                  v-model="rirekiDataSelect.peer"
                  v-if="dispPeerCounselor"
                >
                  <v-btn
                    v-for="n in PeerCounselorItem"
                    :key="n.val"
                    small
                    outlined
                  >
                    {{ n.name }}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </v-row>
            <div name="hideitem" class="rowStyle" style="display: flex">
              <v-row no-gutters class="rowStyle mt-1 mb-1" v-if="dispSyoyou">
                <v-card class="koumokuTitle pa-1" outlined tile>
                  所要時間
                </v-card>
                <input
                  class="syoyoujikan ml-1"
                  style="width: 50px"
                  @input="numbervalidate"
                  v-model="rirekiDataSelect.syoyo"
                />
                <P class="ma-1" v-if="dispRank" style="width: 150px">分</P>
                <v-card class="koumokuTitle pa-1" outlined tile v-if="dispRank"
                  >ランク</v-card
                >
                <v-btn-toggle
                  class="flex-wrap ml-1"
                  v-model="rirekiDataSelect.rank"
                  v-if="dispRank"
                >
                  <v-btn v-for="n in RankItem" :key="n.val" small outlined>
                    {{ n.name }}
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </div>

            <v-row no-gutters class="rowStyle mt-2 mb-2">
              <v-col cols="5">
                <v-btn class="centerBtn" @click="clrClicked(0)">
                  画面クリア
                </v-btn>
                <v-btn class="centerBtn ml-1" @click="clrClicked(1)">
                  内容クリア
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn class="centerBtn" @click="delClicked"> 削除 </v-btn>
              </v-col>
              <v-col cols="*">
                <div align="right">
                  <v-btn class="centerBtn mr-1" @click="addClicked">
                    登録
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container no-gutters fluid class="container pa-0"></v-container>
        </v-col>
        <v-col class="rightArea mt-1">
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
              <v-tab-item value="User" eager>
                <user-list
                  ref="user_list"
                  class="ml-1"
                  :dispAddDaicho="true"
                  @child-select="setUserSelectPoint"
                  @child-user="getSelectUserChildComponent"
                  style="height: 82vh"
                >
                </user-list>
              </v-tab-item>
              <v-tab-item value="Mst" eager>
                <!-- 右側＞参照＞マスタ -->
                <v-container no-gutters fluid class="container ma-0 pa-1">
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

              <v-tab-item value="Soudan" eager>
                <!-- 右側＞参照＞相談履歴 -->
                <v-container no-gutters fluid class="container ma-0 pa-1">
                  <v-row no-gutters class="rowStyle mt-1">
                    <v-card class="rirekikoumokuTitle pa-1" outlined tile>
                      期間
                    </v-card>
                    <v-card
                      class="ml-1"
                      color="transparent"
                      height="100%"
                      style="border: none"
                      outlined
                      tile
                    >
                      <v-btn
                        @click="inputYmCalendarClick(0)"
                        tile
                        outlined
                        width="130px"
                        height="100%"
                        >{{ getSYm() }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>
                    </v-card>
                    <v-card
                      class="rirekikoumokuTitleMini ml-1 pa-1"
                      outlined
                      tile
                    >
                      ～
                    </v-card>
                    <v-card
                      class="ml-1"
                      color="transparent"
                      height="100%"
                      style="border: none"
                      outlined
                      tile
                    >
                      <v-btn
                        @click="inputYmCalendarClick(1)"
                        tile
                        outlined
                        width="130px"
                        height="100%"
                        >{{ getEYm() }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>
                    </v-card>
                  </v-row>
                  <v-row no-gutters class="rowStyle mt-1" style="height: 25px">
                    <v-card class="rirekikoumokuTitle pa-1" outlined tile>
                      項目
                    </v-card>
                    <wj-menu
                      id="comboFilters"
                      class="customCombobox ml-1"
                      :itemsSource="RirekiKoumokuList"
                      :initialized="initComboFilters"
                      :isRequired="true"
                      selectedValuePath="val"
                      displayMemberPath="name"
                      v-model="selRirekiKoumoku"
                      :itemClicked="onRirekiKoumokuClicked"
                      style="width: 250px"
                    >
                    </wj-menu>
                    <v-btn
                      class="ml-1"
                      style="width: 50px; height: 25px"
                      @click="rirekiSearchClicked()"
                    >
                      検索
                    </v-btn>
                  </v-row>
                  <v-row no-gutters class="mt-1">
                    <wj-flex-grid
                      id="rirekiIcrnGrid"
                      style="height: 70vh"
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
              <v-tab-item value="Kihon" eager>
                <v-container no-gutters fluid class="container ma-0 pa-1">
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
        id="datepicker"
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
        id="datepicker"
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
import moment from 'moment';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import * as wjCore from '@grapecity/wijmo';
// import * as wjGrid from '@grapecity/wijmo.grid';
import { mstHouhou } from '@backend/api/MstHouhou';
import { mstKankei } from '@backend/api/MstKankei';
import { mstSodantaiou } from '@backend/api/MstSodantaiou';
import { uketukeIcrn } from '@backend/api/UketukeIcrn';
import UserList from '../components/UserList.vue';

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
};
// HTML要素の非表示ID
const HIDE_NAME = {
  hideitem: 'hideitem', // ﾋﾟｱｶｳﾝｾﾗｰ・ランク・所要時間
};
const NAIYO_HEIGHT = {
  height1: '125px',
  height2: '150px',
  height3: '175px',
  height4: '300px',
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
          href: '#Kihonsoudan',
          hrefval: 'Kihonsoudan',
        },
        {
          val: 1,
          name: '計画相談',
          href: '#Keikakusoudan',
          hrefval: 'Keikakusoudan',
        },
        {
          val: 2,
          name: '地域相談',
          href: '#Chiikisoudan',
          hrefval: 'Chiikisoudan',
        },
      ],
      dispUserName: '',
      userInfo: {},
      kihonInfo: this.getKihonDefaultData(),
      jigyoKbnItem: sysConst.JIGYOKBN,
      keikakuInputKbnItem: sysConst.KEIKAKUJIGYOKBN,
      chiikiInputKbnItem: sysConst.CHIIKIJIGYOKBN,
      SyokaiorKeizokuItem: [
        { val: 0, name: '初回' },
        { val: 1, name: '継続' },
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
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
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
        { dataname: 'nameD', title: '氏名', width: '*', align: 'left' },
        { dataname: 'tudukigara', title: '続柄', width: 50, align: 'left' },
        { dataname: 'mimoto', title: '身元', width: 30, align: 'center' },
        {
          dataname: 'rennrakusaki',
          title: '連絡先',
          width: 100,
          align: 'left',
        },
      ],
      SienMstHerderItem: [
        { dataname: 'daicode', title: '大項目', width: 40, align: 'center' },
        { dataname: 'dainames', title: '大項目', width: '*', align: 'left' },
        { dataname: 'tyucode', title: '項目', width: 40, align: 'center' },
        { dataname: 'tyunames', title: '項目', width: '*', align: 'left' },
      ],
      selRirekiKoumoku: 0,
      RirekiKoumokuList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: 'テスト' },
      ],
      rirekidata: [],
      RirekiHerderItem: [
        { dataname: 'taiouYmd', title: '対応日', width: 90, align: 'center' },
        { dataname: 'naiyo', title: '内容', width: '*', align: 'left' },
      ],
      kihondata: [],
      KihonHerderItem: [
        { dataname: 'title', title: '', width: 100, align: 'center' },
        { dataname: 'naiyo', title: '', width: '*', align: 'left' },
      ],
      kankeiDataSelect: {},
      rirekiDataSelect: {},
      dipCommonFlg: true, // 支援方法～同席者３までの表示フラグ
      windowheight: window.innerHeight,
      mstHouhouList: this.getHouhouMst(),
      mstKankeiList: this.getKankeiMst(),
      mstSodantaiouList: this.getSodantaiouMst(),
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  created() {
    // 初期ユーザ検索
    this.kbnTab = this.dispTab;
  },
  watch: {
    selectedData() {
      // ここでユーザ検索処理する
    },
    rirekiData() {
      // 履歴選択処理
    },
    selectViewData(newselectViewData) {
      // 登録済みデータ表示処理
      this.setKihonInfo(newselectViewData);
    },
  },
  methods: {
    /*
     * マスタ取得処理
     */
    getHouhouMst() {
      mstHouhou(true).then((result) => {
        this.mstHouhouList = result;
        this.inputClicked(DISP_MST_GRD.User);
      });
    },
    getKankeiMst() {
      mstKankei(true).then((result) => {
        this.mstKankeiList = result;
      });
    },
    getSodantaiouMst() {
      mstSodantaiou(true).then((result) => {
        this.mstSodantaiouList = result;
      });
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
        if (this.kihonInfo.inputkbn == sysConst.JIGYOKBN.Renraku.val) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (
            this.dispMstGrid == DISP_MST_GRD.SienHouhou ||
            this.dispMstGrid == DISP_MST_GRD.KeikakuSienHouhou ||
            this.dispMstGrid == DISP_MST_GRD.ChiikiSienHouhou
          ) {
            let sienHouhouObj = flexGrid.cells.rows[ht.row].dataItem;
            if (sienHouhouObj.id == 0) {
              this.rirekiDataSelect.sdnhouid = sienHouhouObj.id;
              this.rirekiDataSelect.sdnhourk = '';
            } else {
              this.rirekiDataSelect.sdnhouid = sienHouhouObj.id;
              this.rirekiDataSelect.sdnhourk = sienHouhouObj.name;
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
            if (kankeiObj.id == 0) {
              this.rirekiDataSelect.sdnkanid = kankeiObj.id;
              this.rirekiDataSelect.sdnkanrk = '';
            } else {
              this.rirekiDataSelect.sdnkanid = kankeiObj.id;
              this.rirekiDataSelect.sdnkanrk = kankeiObj.name;
            }
            if (kankeiObj.honninflg == KANKEI_KBN.Honnin) {
              this.rirekiDataSelect.sdnnam = this.userInfo.names;
              document.getElementById(INPUT_ID.Soudansya).disabled = true;
              document.getElementById(INPUT_ID.Soudansya).style.background =
                sysConst.COLOR.gridBackground;
              this.inputClicked(DISP_MST_GRD.Douseki1);
            } else {
              this.kihonInfo.soudansyaObj = {};
              document.getElementById(INPUT_ID.Soudansya).disabled = false;
              document.getElementById(INPUT_ID.Soudansya).style.background =
                sysConst.COLOR.gridSelectedColor;
              this.inputClicked(DISP_MST_GRD.SoudansyaName);
            }
          } else if (this.dispMstGrid == DISP_MST_GRD.KeikakuKasan) {
            this.inputClicked(DISP_MST_GRD.KeikakuKikanBasyo);
          } else if (this.dispMstGrid == DISP_MST_GRD.ChiikiKasan) {
            this.inputClicked(DISP_MST_GRD.ChiikiItakusaki);
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
        if (this.kihonInfo.inputkbn == sysConst.JIGYOKBN.Renraku) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (this.dispMstGrid == DISP_MST_GRD.SoudansyaName) {
            this.kihonInfo.soudansyaObj = flexGrid.cells.rows[ht.row].dataItem;

            this.inputClicked(DISP_MST_GRD.Douseki1);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki1) {
            this.kihonInfo.dousekisya1Obj =
              flexGrid.cells.rows[ht.row].dataItem;
            this.inputClicked(DISP_MST_GRD.Douseki2);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki2) {
            this.kihonInfo.dousekisya2Obj =
              flexGrid.cells.rows[ht.row].dataItem;
            this.inputClicked(DISP_MST_GRD.Douseki3);
          } else if (this.dispMstGrid == DISP_MST_GRD.Douseki3) {
            this.kihonInfo.dousekisya3Obj =
              flexGrid.cells.rows[ht.row].dataItem;
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
        if (this.kihonInfo.inputkbn == sysConst.JIGYOKBN.Renraku.val) {
          return;
        }
        // 選択値を登録画面に渡す
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let sienKoumokuObj = flexGrid.cells.rows[ht.row].dataItem;
          console.log(sienKoumokuObj);
          if (sienKoumokuObj.id == 0) {
            this.rirekiDataSelect.cskmkid = sienKoumokuObj.tyucskmkid;
            this.rirekiDataSelect.cskmknm = '';
          } else {
            this.rirekiDataSelect.cskmkid = sienKoumokuObj.tyucskmkid;
            this.rirekiDataSelect.cskmknm = sienKoumokuObj.tyunames;
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
          this.rirekiDataSelect = flexGrid.cells.rows[ht.row].dataItem;
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
      this.kihondata = this.getKihonData();

      flexGrid.endUpdate();
    },
    onFormatItemmstIcrnGrid(flexGrid, e) {
      if (e.panel == flexGrid.columnHeaders && e.col == 1) {
        if (this.dispMstGrid == DISP_MST_GRD.SienHouhou) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.Sienhouhou);
        } else if (this.dispMstGrid == DISP_MST_GRD.Kankei) {
          e.panel.setCellData(e.row, e.col, TITLE_TXT.HonninnKankei);
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
            tmpitem.sTime +
            '</font>';
        } else if (e.col == 1) {
          e.cell.innerHTML =
            '<font color="blue">' +
            tmpitem.title +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
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
      if (this.dispMstGrid == DISP_MST_GRD.SoudansyaName) {
        if (this.kihonInfo.kankeiObj.honninflg != KANKEI_KBN.Kazoku) {
          flexGrid.getColumn(2).visible = false;
          flexGrid.getColumn(3).visible = false;
        } else {
          flexGrid.getColumn(2).visible = true;
          flexGrid.getColumn(3).visible = true;
        }
      } else {
        flexGrid.getColumn(2).visible = true;
        flexGrid.getColumn(3).visible = true;
      }
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      console.log(row);
      this.userInfo = row;
      if (this.userInfo.riid == 0) {
        this.dispUserName = '';
      } else {
        this.dispUserName =
          String(this.userInfo.riyocode).padStart(7, '0') +
          ' ' +
          this.userInfo.names +
          ' (' +
          this.userInfo.age +
          '歳）';
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
      this.setEnable(kbn == sysConst.JIGYOKBN.Renraku.val);
      if (kbn == 3) {
        this.rirekiDataSelect.syokaiflg = '';
      }
    },
    keikakuInputKbnclick(kbn) {
      console.log(kbn);
    },
    chiikiInputKbnclick(kbn) {
      console.log(kbn);
    },
    setKihonInfo(newselectViewData) {
      // this.kihonInfo = newselectViewData;
      if (!newselectViewData) {
        this.rirekiDataSelect = this.getNewuketuke();
      } else {
        this.rirekiDataSelect = newselectViewData;
      }
      this.setEnable(
        this.rirekiDataSelect.inputkbn == sysConst.JIGYOKBN.Renraku.val
      );
      this.rirekiSearchClicked(
        this.rirekiDataSelect.taiouYmd,
        this.rirekiDataSelect.taiouYmd,
        this.rirekiDataSelect.intcode
      );
    },
    setEnable(enabled) {
      const dis = 'disabled';
      let backcolor = '';
      let backcolorsoudansya = '';
      if (enabled) {
        document.getElementById(INPUT_ID.Syokai).setAttribute(dis, enabled);
        document.getElementById(INPUT_ID.SienHouhou).setAttribute(dis, enabled);
        document.getElementById(INPUT_ID.Kankei).setAttribute(dis, enabled);
        document.getElementById(INPUT_ID.Soudansya).setAttribute(dis, enabled);
        document
          .getElementById(INPUT_ID.Dousekisya1)
          .setAttribute(dis, enabled);
        document
          .getElementById(INPUT_ID.Dousekisya2)
          .setAttribute(dis, enabled);
        document
          .getElementById(INPUT_ID.Dousekisya3)
          .setAttribute(dis, enabled);
        backcolor = sysConst.COLOR.gridNoneBackground;
        backcolorsoudansya = sysConst.COLOR.gridNoneBackground;
      } else {
        document.getElementById(INPUT_ID.Syokai).removeAttribute(dis);
        document.getElementById(INPUT_ID.SienHouhou).removeAttribute(dis);
        document.getElementById(INPUT_ID.Kankei).removeAttribute(dis);
        document.getElementById(INPUT_ID.Dousekisya1).removeAttribute(dis);
        document.getElementById(INPUT_ID.Dousekisya2).removeAttribute(dis);
        document.getElementById(INPUT_ID.Dousekisya3).removeAttribute(dis);
        if (this.kihonInfo.kankeiObj.honninflg == KANKEI_KBN.Honnin) {
          document
            .getElementById(INPUT_ID.Soudansya)
            .setAttribute(true, enabled);
          backcolorsoudansya = sysConst.COLOR.gridBackground;
        } else {
          document.getElementById(INPUT_ID.Soudansya).removeAttribute(dis);
          backcolorsoudansya = sysConst.COLOR.gridSelectedColor;
        }
        backcolor = sysConst.COLOR.gridSelectedColor;
      }
      document.getElementById(INPUT_ID.SienHouhou).style.background = backcolor;
      document.getElementById(INPUT_ID.Kankei).style.background = backcolor;
      document.getElementById(INPUT_ID.Soudansya).style.background =
        backcolorsoudansya;
      document.getElementById(INPUT_ID.Dousekisya1).style.background =
        backcolor;
      document.getElementById(INPUT_ID.Dousekisya2).style.background =
        backcolor;
      document.getElementById(INPUT_ID.Dousekisya3).style.background =
        backcolor;
    },
    /**************
     * 月の選択 ダイアログの日付を押下
     */
    dateSelect() {
      let split = this.picker.split('-');
      this.taiouYmd = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: split[2],
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.datepicker_dialog = false;
    },
    //カレンダーボタンの日付遷移
    calendarClick(type) {
      let tmpdate;
      if (type == 0) {
        tmpdate = new moment();
      } else if (type == 1) {
        tmpdate = moment({
          years: this.taiouYmd.format('YYYY'),
          months: this.taiouYmd.format('MM') - 1,
          days: this.taiouYmd.format('DD'),
          hours: 0,
          minutes: 0,
          seconds: 0,
        }).add(-1, 'days');
      } else if (type == 2) {
        tmpdate = moment({
          years: this.taiouYmd.format('YYYY'),
          months: this.taiouYmd.format('MM') - 1,
          days: this.taiouYmd.format('DD'),
          hours: 0,
          minutes: 0,
          seconds: 0,
        }).add(1, 'days');
      }
      this.taiouYmd = tmpdate;
    },
    timeClick(type) {
      if (type == 0) {
        this.rirekiDataSelect.sTime = '';
      } else {
        let mom = new moment();
        this.rirekiDataSelect.sTime = mom.format('HH') + ':' + mom.format('mm');
      }
    },
    getYmd() {
      if (!this.taiouYmd) {
        this.taiouYmd = moment();
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
          }
          break;
        case DISP_MST_GRD.SoudansyaName:
          if (this.kihonInfo.kankeiObj.honninflg != KANKEI_KBN.Kazoku) {
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
        case DISP_MST_GRD.KeikakuKikanBasyo:
          this.setFocus(INPUT_ID.KeikakuKikanBasyo);
          break;
        case DISP_MST_GRD.ChiikiItakusaki:
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
    searchClick() {
      // ユーザ検索実行
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
      }
      // this.kihonInfo = this.getKihonDefaultData();
      this.rirekiDataSelect = this.getNewuketuke();
      console.log(this.userInfo);
    },
    // 削除
    delClicked() {
      console.log('delClicked');
    },
    // 登録
    addClicked() {
      console.log('addClicked');
    },
    getKihonDefaultData() {
      return {
        inputkbn: -1,
        syokaikeizoku: -1,
        syokaiymd: '',
        kankeiObj: {
          id: 0,
          code: '',
          name: '',
          nameD: '',
          codeD: '',
          ryaku: '',
          nikeiflg: 0,
          honninflg: 0,
        },
        soudansyaObj: {
          id: 0,
          code: '',
          codeD: '',
          name: '',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        dousekisya1Obj: {
          id: 0,
          code: '',
          codeD: '',
          name: '',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        dousekisya2Obj: {
          id: 0,
          code: '',
          codeD: '',
          name: '',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        dousekisya3Obj: {
          id: 0,
          code: '',
          codeD: '',
          name: '',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        sienKoumokuObj: {
          daicskmkid: 0,
          daicode: '',
          dainames: '',
          dairyaku: '',
          daicskbn: '',
          daicolor: '',
          daisyukflg: '',
          tyucskmkid: 0,
          tyucode: '',
          tyunames: '',
          tyuryaku: '',
          tyucolor: '',
          tyusyukflg: '',
        },
        keikakuSoudanObj: {
          inputkbn: -1,
          kasanumu: -1,
          sienhouhou: 0,
          sienhouhouname: '',
          kasan: 0,
          kasanname: '',
          kikanbasyo: 0,
          kikanbasyoname: '',
          taiousyamei: 0,
          taiousyameiname: '',
          stime: '',
          etime: '',
        },
        chiikiSoudanObj: {
          inputkbn: -1,
          kasanumu: -1,
          sienhouhou: 0,
          sienhouhouname: '',
          kasan: 0,
          kasanname: '',
          itakusaki: 0,
          itakusakiname: '',
        },
        startTime: '',
        syoyoujikan: '',
        naiyo: '',
        peerCounselor: -1,
        rank: -1,
        gyoumunissi: false,
      };
    },
    numbervalidate() {
      if (isNaN(this.kihonInfo.syoyoujikan)) {
        this.kihonInfo.syoyoujikan = '';
        return;
      }
      if (String(this.kihonInfo.syoyoujikan).length > 3) {
        this.kihonInfo.syoyoujikan = Number(
          String(this.kihonInfo.syoyoujikan).slice(0, 3)
        );
      }
      this.kihonInfo.syoyoujikan = this.kihonInfo.syoyoujikan.replace(
        /\D/g,
        ''
      );
    },
    onRirekiKoumokuClicked(s) {
      s.header = this.RirekiKoumokuList[s.selectedIndex].name;
      this.selRirekiKoumoku = s.selectedValue;
      let f = document.activeElement;
      f.blur();
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
      uketukeIcrn(symd, eymd, riid).then((result) => {
        this.rirekidata = result;
        this.getSodantaiouMst();
        console.log(this.rirekidata);
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
      let userCount = 10;
      let name = '';
      if (
        kbn == DISP_MST_GRD.SienHouhou ||
        kbn == DISP_MST_GRD.KeikakuSienHouhou ||
        kbn == DISP_MST_GRD.ChiikiSienHouhou
      ) {
        return this.mstHouhouList;
      } else if (kbn == DISP_MST_GRD.Kankei) {
        return this.mstKankeiList;
      } else if (
        kbn == DISP_MST_GRD.KeikakuKasan ||
        kbn == DISP_MST_GRD.ChiikiKasan
      ) {
        for (let i = 1; i < userCount; i++) {
          switch (i) {
            case 1:
              name = '入院時情報連携加算';
              break;
            case 2:
              name = '退院・退所時加算';
              break;
            case 3:
              name = '医療/保育/教育加算';
              break;
            case 4:
              name = 'サービス提供モニタリング加算';
              break;
            case 5:
              name = '地域体制共同支援加算';
              break;
            case 6:
              name = '初回加算訪問';
              break;
            default:
              name = 'その他' + i;
              break;
          }
          tmpviewdata.push({
            id: i,
            codeD: String(i).padStart(7, '0'),
            name: name,
            nameD: name,
            kbn: 0,
          });
        }
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
          name: '',
          nameD: 'クリア',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '',
          isKazoku: false,
        },
        {
          id: 1,
          code: 1,
          codeD: String(1).padStart(3, '0'),
          name: '関係者 一郎',
          nameD: '関係者 一郎',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '022-232-1123',
          isKazoku: false,
        },
        {
          id: 2,
          code: 2,
          codeD: String(2).padStart(3, '0'),
          name: '関係者 次郎太',
          nameD: '関係者 次郎太',
          tudukigara: '',
          mimoto: '',
          rennrakusaki: '022-232-1124',
          isKazoku: false,
        },
        {
          id: 3,
          code: 1,
          codeD: String(1).padStart(3, '0'),
          name: '家族 花子',
          nameD: '家族 花子',
          tudukigara: '母親',
          mimoto: '○',
          rennrakusaki: '022-232-4567',
          isKazoku: true,
        },
        {
          id: 4,
          code: 2,
          codeD: String(2).padStart(3, '0'),
          name: '家族 太郎',
          nameD: '家族 太郎',
          tudukigara: '兄',
          mimoto: '',
          rennrakusaki: '022-232-6789',
          isKazoku: true,
        }
      );
      return tmpviewdata;
    },

    getKihonData() {
      let tmpviewdata = [
        { title: '生年月日', naiyo: '1950年01月01日' },
        { title: '性別', naiyo: '男性' },
        { title: '住所', naiyo: '〒520-0462\n東経県西経市南経区北経町1-1-1' },
        { title: '電話番号１', naiyo: '000-0000-0000' },
        { title: '電話番号２', naiyo: '111-2222-3333' },
        { title: '携帯電話', naiyo: '090-4444-5555' },
        { title: 'FAX番号', naiyo: '666-7777-8888' },
        { title: 'メールアドレス', naiyo: 'mailaddress@xxx.co.jp' },
        { title: '携帯メール', naiyo: 'mailaddress2@xxx.co.jp' },
        { title: '障害区分', naiyo: '障害区分' },
        { title: '世帯の状況', naiyo: '施設入所' },
        { title: '本人の状況', naiyo: '要介護状態' },
      ];
      return tmpviewdata;
    },
    getSYm() {
      if (!this.kikanSymd) {
        this.kikanSymd = moment()
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
        this.kikanEymd = moment().set('date', moment().daysInMonth());
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
        let split = this.pickersym.split('-');
        this.kikanSymd = moment({
          year: split[0],
          month: Number(split[1]) - 1,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millsecond: 0,
        });
        this.datepicker_dialog_sym = false;
      } else {
        let split = this.pickereym.split('-');
        this.kikanEymd = moment({
          year: split[0],
          month: Number(split[1]) - 1,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millsecond: 0,
        });
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
        this.kihonInfo.keikakuSoudanObj.kasanumu = kbn;
      } else {
        // 地域相談
        this.kihonInfo.chiikiSoudanObj.kasanumu = kbn;
      }
      this.keikakuDispChange();
    },
    keikakuDispChange() {
      if (this.kbnTab == this.kbnItem[0].hrefval) {
        this.dipCommonFlg = true;
      } else if (this.kbnTab == this.kbnItem[1].hrefval) {
        if (
          this.kihonInfo.keikakuSoudanObj.kasanumu == this.kasanUmuItem[1].val
        ) {
          this.dipCommonFlg = false;
        } else {
          this.dipCommonFlg = true;
        }
      } else if (this.kbnTab == this.kbnItem[2].hrefval) {
        if (
          this.kihonInfo.chiikiSoudanObj.kasanumu == this.kasanUmuItem[1].val
        ) {
          this.dipCommonFlg = false;
        } else {
          this.dipCommonFlg = true;
        }
      }
      this.handleResize();
    },
    handleResize() {
      this.windowheight = window.innerHeight;
      let el = document.getElementById(INPUT_ID.Naiyo);
      let elTxt = document.getElementsByTagName('textarea')[0];
      if (window.innerHeight <= 850) {
        if (
          this.kbnTab == this.kbnItem[1].hrefval &&
          this.kihonInfo.keikakuSoudanObj.kasanumu == this.kasanUmuItem[1].val
        ) {
          el.style.height = NAIYO_HEIGHT.height1;
          elTxt.style.height = NAIYO_HEIGHT.height1;
        } else {
          if (this.kbnTab == this.kbnItem[0].hrefval) {
            el.style.height = NAIYO_HEIGHT.height2;
            elTxt.style.height = NAIYO_HEIGHT.height2;
          } else {
            el.style.height = NAIYO_HEIGHT.height3;
            elTxt.style.height = NAIYO_HEIGHT.height3;
          }
        }
      } else {
        el.style.height = NAIYO_HEIGHT.height4;
        elTxt.style.height = NAIYO_HEIGHT.height4;
      }
    },
    setTaiouData() {
      console.log('aaaaaaaaaaaaa');
      console.log(this.rirekiDataSelect);
      this.taiouYmd = moment(this.rirekiDataSelect.taiouYmdf);
    },
    getNewuketuke() {
      let obj = {
        entpriid: 0,
        intcode: 0,
        rcnt: 0,
        taiouYmd: '',
        taiouYmdf: {},
        sTime: '',
        name: '',
        cskbn: 0,
        cskmkid: 0,
        cskmknm: '',
        jigyouKbn: '',
        jigyouKbnD: '',
        syokai: '',
        kasan: '',
        kasanName: '',
        kikanmei: '',
        taiousya2: '',
        sienHouhou: '',
        sdnhouid: 0,
        sdnhourk: '',
        sdnkanid: 0,
        sdnkanrk: '',
        kankeiSoudansya: '',
        sdnnam: '',
        soudanKoumoku: '',
        title: '',
        naiyo: '',
        peer: 0,
        syoyo: 0,
        rank: 0,
        ranknm: '',
        kan: 0,
        syoyouJikan: '',
        nissi: '',
        tanntouid: 0,
        taiousya: '',
      };
      return obj;
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#uketukeTouroku {
  background: $white;
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1050px !important;
  max-width: 1050px;
  width: 1050px;
  height: auto;
  // width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  .centerArea {
    // margin-right: 4px;
    min-width: 630px;
    max-width: 630px;
    // min-height: 450px;
    // // height: 87vh;
    // // background: #a4c6ff;
    // // border: thin solid;
    .ymd,
    .v-btn {
      font-size: 14px;
      background-color: $white;
      border: thin solid;
      border-color: $light-gray;
      color: $font_color;
      height: 25px;
    }
    .centerBtn {
      border: thin solid;
      border-color: $light-gray;
      width: 90px;
      height: 30px;
      background: $btn_background;
    }

    .v-tab {
      border: 1px solid;
      margin-right: 4px;
      // margin-bottom: -2px;
      border-color: $light-gray;
      border-bottom: none;
      height: 25px;
      // background: blue;
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
    .koumokuTitleMini {
      color: $font_color;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      text-align: center;
      background: $white;
      border: none;
    }

    input {
      color: $font_color;
      border: thin solid;
      border-color: $light-gray;
      width: 100px;
      height: 100%;
      text-align: center;
      padding-left: 2px;
    }
    input[type='time'] {
      width: 75px;
      height: 100%;
    }
    input[type='text'] {
      width: 200px;
      height: 100%;
      text-align: left;
    }

    input:focus {
      border: 1px solid #ff9900;
      outline: 0;
    }
    input:disabled {
      background: $view_Data_Read_background;
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
    .v-checkbox {
      color: $font_color;
    }

    .mandatoryMark {
      position: absolute;
      color: $Hissu_Color;
      top: 0;
      left: 0;
      font-weight: bold;
    }
    .hissu {
      color: $Hissu_Color;
    }
  }
  .rightArea {
    min-width: 420px;
    max-width: 420px;
    min-height: 500px;
    height: 88vh;
    border: thin solid;
    border-color: green;

    .v-tab {
      border: thin solid;
      border-radius: 10px;
      height: 25px;
    }

    .rirekikoumokuTitle {
      color: $font_color;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 25px;
      text-align: center;
      background: $view_Title_background;
      border: none;
    }
    .rirekikoumokuTitleMini {
      color: $font_color;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      text-align: center;
      background: $white;
      border: none;
    }

    #mstIcrnGrid,
    #soudansyaMstIcrnGrid,
    #sienMstIcrnGrid,
    #rirekiIcrnGrid,
    #kihonIcrnGrid {
      color: $font_color;
      font-size: $cell_fontsize;
      height: 80vh;
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

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }

  .koumokuData_input {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Input_background;
    padding-top: 2px;
    padding-left: 2px;
  }
  .rowStyle {
    height: 25px;
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
  left: 390px;
  width: 300px;
  max-width: 300px;

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: blue;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: red;
  }
}
div.customCombobox {
  position: relative;
  width: 300px !important;
  height: 25px !important;
  &.customCombobox {
    width: 160px !important;
    div {
      text-align: left;
    }
  }

  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
  &:hover {
    background-color: #e1e1e1;
  }
  &:focus {
    background-color: #fff;
  }
  div * {
    height: 21px !important;
    padding: 0;
    span {
      height: 21px !important;
      margin-top: 8px;
    }
    &.wj-form-control {
      position: absolute;
      top: -3px;
      width: 100%;
    }
  }
  input {
    height: 25px !important;
  }
}
</style>
