<template>
  <div id="keikakuWeek" :style="styles">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }" class="pr-1">
          <div class="ht50">
            <div class="mt-1">
              <v-card class="d-flex flex-row" flat tile>
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="120"
                  height="20"
                  class="text-center"
                >
                  利用者名
                </v-card>
                <v-card
                  elevation="0"
                  outlined
                  tile
                  class="ml-1 pl-1 lightYellow"
                  width="160"
                  height="20"
                >
                  {{ userName }}
                </v-card>
                <v-card
                  :color="'grey lighten-4 ml-1'"
                  elevation="0"
                  tile
                  small
                  width="80"
                  height="20"
                  class="text-center"
                >
                  作成日
                </v-card>
                <v-card class="text-center ml-1" width="140" outlined tile>
                  {{ getYmd }}
                </v-card>
              </v-card>
            </div>
            <div class="mt-1">
              <v-card class="d-flex flex-row" flat tile>
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="120"
                  height="20"
                  class="text-center"
                >
                  週間計画開始年月
                </v-card>
                <v-card
                  class="ml-1 text-center"
                  width="160"
                  height="20"
                  outlined
                  tile
                  @click="inputCalendarClick(0)"
                >
                  {{ getYm }}
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-card>
                <v-card class="ml-auto" elevation="0">
                  <v-tabs
                    light
                    height="20"
                    @change="onInputChange"
                    v-model="inputChange"
                  >
                    <v-tab>週間予定</v-tab>
                    <v-tab>主な日常生活等</v-tab>
                  </v-tabs>
                </v-card>
              </v-card>
            </div>
          </div>
          <FullCalendar
            ref="fullCalendar"
            id="fullCalendar"
            :options="calendarOptions"
          />
          <v-card class="mt-1 d-flex justify-end" flat tile>
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="60"
              height="20"
              class="text-center"
            >
              完了
            </v-card>
            <v-card elevation="0">
              <input type="checkbox" class="mt-2 ml-2" />
            </v-card>
            <v-card
              elevation="0"
              class="ml-2 lightYellow"
              tile
              outlined
              width="200"
              height="20"
            ></v-card>
            <v-btn small class="ml-1" elevation="0" @click="regist" height="20"
              >登録</v-btn
            >
          </v-card>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth2 }">
          <div class="mt-1 ht50">
            <v-btn-toggle tile class="ml-n4">
              <v-btn small height="20">前回コピー</v-btn>
              <v-btn small height="20">履歴参照</v-btn>
            </v-btn-toggle>
          </div>
          <wj-flex-grid
            id="keikakuLifeGrid"
            :selectionMode="3"
            :headersVisibility="1"
            :alternatingRowStep="0"
            :autoGenerateColumns="false"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showBandedRows="false"
            :initialized="onInitializeLife"
            :itemsSourceChanged="changeInitializeLife"
            :itemsSource="itemdataLife"
          >
            <wj-flex-grid-column
              :header="'日常生活'"
              binding="every"
              align="center"
              :isReadOnly="true"
              width="*"
            ></wj-flex-grid-column>
          </wj-flex-grid>

          <wj-flex-grid
            class="mt-1"
            id="keikakuFukusiGrid"
            :selectionMode="3"
            :headersVisibility="1"
            :alternatingRowStep="0"
            :autoGenerateColumns="false"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showBandedRows="false"
            :initialized="onInitializeFukusi"
            :itemsSourceChanged="changeInitializeFukusi"
            :itemsSource="itemdataFukusi"
          >
            <wj-flex-grid-column
              :header="'福祉サービス'"
              binding="every"
              align="center"
              :isReadOnly="true"
              width="*"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="attendeeStateDatepicker"
        v-model="picker"
        type="month"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Draggable from '@fullcalendar/interaction';
import UserList from './UserList.vue';
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
let w = ['mon', 'thu', 'web', 'the', 'fri', 'sat', 'sun'];
let wk = '';
let x = 330;
let startY = 0;
let endY = 0;
let startWeekPos = 0;
let endWeekPos = 0;
function diffXCount(st, ed) {
  let pos1 = w.indexOf(st);
  let pos2 = w.indexOf(ed);
  startWeekPos = pos1;
  endWeekPos = pos2;
  let calc = endWeekPos - startWeekPos + 1;
  return calc;
}
function mouseDragGetWeek(e) {
  x = 330;
  for (let i = 0; i < 7; i++) {
    if (e.clientX >= x && e.clientX < x + 120) {
      wk = w[i];
      break;
    }
    x = parseInt(x + 120);
  }
}
function mouseDragBackgroundColor(elem, e, newDiv) {
  let cy = 0;
  let y = 140;
  for (let i = 0; i < 36; i++) {
    if (e.clientY >= y && e.clientY < y + 15) {
      cy = y;
      startY = y;
    }
    newDiv.style.top = cy - 60 + 'px';
    y = y + 15;
  }
  let cx = 0;
  for (let i = 0; i <= 7; i++) {
    if (e.clientX >= x && e.clientX < x + 120) {
      cx = x;
    }
    newDiv.style.left = cx + 'px';
    x = x + 120;
  }
  if (cx && cy) {
    elem.appendChild(newDiv);
  }
}
export default {
  mouseDragBackgroundColor,
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    UserList,
  },
  data() {
    return {
      moveFlag: false,
      onLifeGrid: '',
      onFukusiGrid: '',
      leftWidth: '280px',
      rightWidth: '80%',
      rightWidth2: '12%',
      userName: '',
      datepicker_dialog: false,
      picker: '',
      itemdataLife: [],
      itemdataFukusi: [],
      events: [],
      eventSelected: [],
      getYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      getYm: dayjs().format('YYYY') + '年' + dayjs().format('MM') + '月',
      inputChange: 0,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, Draggable],
        initialView: 'timeGridWeek',
        headerToolbar: false,
        // eventMouseEnter: this.handleEventMouseEnter.bind(this),
        // eventMouseLeave: this.handleEventMouseLeave.bind(this),
        select: this.handleDateSelect,
        //  dateClick: this.handleDateClick,
        eventClick: this.onEventClick,
        eventDragStart: this.onDragEvent,
        droppable: true,
        editable: true,
        navLinks: false,
        selectable: true,
        contentHeight: '78vh',
        slotDuration: '00:30:00',
        locale: 'ja',
        firstDay: 1,
        dayMaxEvents: true,
        nowIndicator: true,
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
        },
        events: [],
        views: {
          timeGridWeek: {
            slotMinTime: '04:00:00',
            slotMaxTime: '22:00:00',

            dayHeaderFormat: function (date) {
              const weekNum = date.date.marker.getDay();
              const week = ['日・祝', '月', '火', '水', '木', '金', '土'][
                weekNum
              ];
              return week;
            },
          },
        },
      },
      headerheight: 60,
    };
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  mounted() {
    let elem = document.getElementById('fullCalendar');
    let newDiv = document.createElement('div');
    let _self = this;
    let startX = '';
    elem.addEventListener('mousedown', function (e) {
      if (_self.eventSelected.length != 0) {
        newDiv = document.createElement('div');
        _self.moveFlag = true;
        newDiv.className = 'cls';
        mouseDragGetWeek(e);
        startX = wk;
        mouseDragBackgroundColor(elem, e, newDiv);
      }
    });
    elem.addEventListener('mousemove', function (e) {
      if (_self.moveFlag == true && _self.eventSelected.length != 0) {
        mouseDragGetWeek(e);
        let client_w = 120;
        // 曜日配列の位置をとって差分の取得
        let diffX = diffXCount(startX, wk);
        newDiv.style.width = parseInt(client_w * diffX) + 'px';
        newDiv.style.height = parseInt(e.clientY - startY) + 'px';
      }
    });
    elem.addEventListener('mouseup', function (e) {
      endY = e.clientY;
      _self.moveFlag = false;
      newDiv.style.width = 'auto';
      newDiv.remove();
    });
    elem.addEventListener('mouseleave', function () {
      this.moveFlag = false;
      newDiv.style.width = 'auto';
      newDiv.remove();
    });
    let life = [];
    life.push(
      {
        id: 1,
        every: '起床',
      },
      {
        id: 2,
        every: '就寝',
      },
      {
        id: 3,
        every: '洗顔・歯磨き',
      },
      {
        id: 4,
        every: '朝食',
      },
      {
        id: 5,
        every: '昼食',
      },
      {
        id: 6,
        every: '夕食',
      },
      {
        id: 7,
        every: 'おやつ',
      },
      {
        id: 8,
        every: '入浴',
      },
      {
        id: 9,
        every: 'テレビを観る',
      }
    );
    this.itemdataLife = life;

    let fukusi = [];
    fukusi.push(
      {
        id: 1,
        every: 'ヘルパー',
      },
      {
        id: 2,
        every: '生活サポート',
      },
      {
        id: 3,
        every: '洗顔・歯磨き',
      },
      {
        id: 4,
        every: '生活介護',
      },
      {
        id: 5,
        every: '就労移行支援',
      }
    );
    this.itemdataFukusi = fukusi;

    let events = [];
    events = [
      {
        title: '起床',
        start: '2022-09-26T07:00:00',
        end: '2022-09-26T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'テレビドラマ・朝食',
        start: '2022-09-26T07:30:00',
        end: '2022-09-26T08:00:00',
      },
      {
        title: 'ゴミ収集',
        start: '2022-09-26T08:00:00',
        end: '2022-09-26T08:30:00',
        backgroundColor: 'yellow',
        textColor: 'black',
      },
      {
        title: 'テレビドラマ・昼食',
        start: '2022-09-26T12:00:00',
        end: '2022-09-26T12:30:00',
      },

      {
        title: '起床',
        start: '2022-09-27T07:00:00',
        end: '2022-09-27T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'ヘルパー(家事)',
        start: '2022-09-27T10:00:00',
        end: '2022-09-27T12:00:00',
        backgroundColor: 'yellow',
        textColor: 'black',
      },
      {
        title: 'テレビドラマ・朝食',
        start: '2022-09-27T07:30:00',
        end: '2022-09-27T08:00:00',
      },
      {
        title: '起床',
        start: '2022-09-28T07:00:00',
        end: '2022-09-28T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'テレビドラマ・昼食',
        start: '2022-09-27T12:00:00',
        end: '2022-09-27T12:30:00',
      },

      {
        title: 'テレビドラマ・朝食',
        start: '2022-09-28T07:30:00',
        end: '2022-09-28T08:00:00',
      },
      {
        title: 'テレビドラマ・昼食',
        start: '2022-09-28T12:00:00',
        end: '2022-09-28T12:30:00',
      },
      {
        title: '通院同行(内科・歯科)',
        start: '2022-09-28T14:00:00',
        end: '2022-09-28T16:00:00',
        backgroundColor: 'red',
      },
      {
        title: '起床',
        start: '2022-09-29T07:00:00',
        end: '2022-09-29T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'テレビドラマ・朝食',
        start: '2022-09-29T07:30:00',
        end: '2022-09-29T08:00:00',
      },
      {
        title: '外出(買い物・銀行・クリーニング等)',
        start: '2022-09-29T08:13:00',
        end: '2022-09-29T12:00:00',
        backgroundColor: 'pink',
        textColor: 'black',
      },

      {
        title: 'テレビドラマ・昼食',
        start: '2022-09-29T12:00:00',
        end: '2022-09-29T12:30:00',
      },

      {
        title: '起床',
        start: '2022-09-30T07:00:00',
        end: '2022-09-30T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'テレビドラマ・朝食',
        start: '2022-09-30T07:30:00',
        end: '2022-09-30T08:00:00',
      },
      {
        title: '起床',
        start: '2022-10-01T07:00:00',
        end: '2022-10-01T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },

      {
        title: 'テレビドラマ・昼食',
        start: '2022-09-30T12:00:00',
        end: '2022-09-30T12:30:00',
      },

      {
        title: 'テレビドラマ・朝食',
        start: '2022-10-01T07:30:00',
        end: '2022-10-01T08:00:00',
      },

      {
        title: 'テレビドラマ・昼食',
        start: '2022-10-01T12:00:00',
        end: '2022-10-01T12:30:00',
      },

      {
        title: '起床',
        start: '2022-10-02T07:00:00',
        end: '2022-10-02T07:30:00',
        backgroundColor: 'green',
        //textColor: 'black',
      },
      {
        title: 'テレビドラマ・朝食',
        start: '2022-10-02T07:30:00',
        end: '2022-10-02T08:00:00',
      },

      {
        title: 'テレビドラマ・昼食',
        start: '2022-10-02T12:00:00',
        end: '2022-10-02T12:30:00',
      },

      {
        title: '夕食',
        start: '2022-09-26T19:30:00',
        end: '2022-09-26T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-09-27T19:30:00',
        end: '2022-09-27T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-09-28T19:30:00',
        end: '2022-09-28T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-09-29T19:30:00',
        end: '2022-09-29T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-09-30T19:30:00',
        end: '2022-09-30T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-10-01T19:30:00',
        end: '2022-10-01T20:00:00',
      },
      {
        title: '夕食',
        start: '2022-10-02T19:30:00',
        end: '2022-10-02T20:00:00',
      },
    ];
    this.events = events;
    this.calendarOptions.events = events;

    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('keikakuWeek') != null) {
        document.getElementById('keikakuWeek').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },

    handleEventMouseEnter() {
      alert('enter');
    },
    handleEventMouseLeave() {
      alert('leave');
    },
    handleDateSelect(selectInfo) {
      // ドラッグドロップした位置が過去の時間の場合は何もしない
      if (endY < startY) {
        return false;
      }
      // ドラッグドロップした位置が過去の日の場合は何もしない
      if (endWeekPos < startWeekPos) {
        return false;
      }
      let startdate = dayjs(selectInfo.startStr).format('YYYYMMDD');
      let enddate = dayjs(selectInfo.endStr).format('YYYYMMDD');
      let startmonth = dayjs(selectInfo.startStr).format('YYYYMM');
      let endmonth = dayjs(selectInfo.endStr).format('YYYYMM');
      let starttime = dayjs(selectInfo.startStr).format('HH:mm:ss');
      let endtime = dayjs(selectInfo.endStr).format('HH:mm:ss');
      let diff = enddate - startdate;

      // 月跨ぎの時
      // 月毎のloopを計算
      if (startmonth != endmonth) {
        // スタート月の最終日
        let startEndDay = dayjs(selectInfo.startStr)
          .add(1, 'month')
          .date(0)
          .format('YYYYMMDD');
        diff = startEndDay - startdate;
        // 翌月の最初の日
        let tmp = endmonth + '01';
        let diffnext = parseInt(enddate - tmp) + 1;
        diff = diff + diffnext;
      }

      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (this.eventSelected.length == 0) {
        //alert('select event');
        return false;
      }

      // 日付が別の時は日付分ループする
      if (diff > 0) {
        for (let i = 0; i <= diff; i++) {
          let start =
            dayjs(startdate).add(i, 'd').format('YYYY-MM-DD') + 'T' + starttime;
          let end =
            dayjs(startdate).add(i, 'd').format('YYYY-MM-DD') + 'T' + endtime;
          calendarApi.addEvent({
            id: 1,
            title: this.eventSelected,
            start: start,
            end: end,
          });
        }
      } else {
        calendarApi.addEvent({
          id: 1,
          title: this.eventSelected,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        });
      }
    },
    /***********************
     * 登録ボタン
     ***********************/
    regist() {
      // 現在表示しているイベントデータの取得
      let calendarApi = this.$refs.fullCalendar.getApi();
      console.log(calendarApi.getEvents());
    },
    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr);
    },
    onDragEvent() {
      this.eventSelected = '';
      this.onLifeGrid.select(-1, -1);
      this.onFukusiGrid.select(-1, -1);
    },
    onEventClick(info) {
      console.log('onEvent');

      if (info.el.classList.contains('fc-h-event')) {
        alert('aa');
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    inputCalendarClick() {
      this.picker = dayjs().format('YYYY') + '-' + dayjs().format('MM');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = dayjs(this.picker).format('YYYY年MM月');
      this.datepicker_dialog = false;
    },
    onInitializeLife(flexGrid) {
      let _self = this;
      this.onLifeGrid = flexGrid;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          _self.eventSelected = _self.itemdataLife[ht.row].every;
          _self.onFukusiGrid.select(-1, -1);
        }
      });
    },
    onInitializeFukusi(flexGrid) {
      let _self = this;
      this.onFukusiGrid = flexGrid;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          _self.eventSelected = _self.itemdataFukusi[ht.row].every;
          _self.onLifeGrid.select(-1, -1);
        }
      });
    },
    changeInitializeLife(flexGrid) {
      flexGrid.select(-1, -1);
    },
    changeInitializeFukusi(flexGrid) {
      flexGrid.select(-1, -1);
    },
    /*****************************
     * 入力内容切替
     *************************/
    onInputChange() {
      console.log(this.inputChange);
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuWeek {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .input_form {
    border: 1px solid #ccc;
  }
  .lightYellow {
    background-color: $light_yellow;
  }
  .ht50 {
    height: 50px;
  }

  .fc-scrollgrid-sync-table {
    display: none;
  }
  .fc-col-header-cell {
    a {
      &.fc-col-header-cell-cushion {
        color: #666;
      }
    }
  }

  .fc-highlight {
    background-color: transparent !important;
  }
  .fc-event-time {
    display: none;
  }
  div {
    .fc-event-title {
      word-wrap: break-word;
    }
  }
  .fc-timegrid-slot-label {
    background: $grid_selected_background;
    color: $white;
  }
  table {
    tr {
      th {
        &.fc-col-header-cell {
          background: $grid_selected_background;
          a {
            color: $white !important;
          }
        }
      }
      td {
        &:first-child {
          border-top: none;
        }
      }
    }
    &.fc-scrollgrid-liquid {
      tr {
        &.fc-scrollgrid-section-body {
          td {
            &:first-child {
              table {
                tr {
                  &:not(:nth-child(4n + 1)) {
                    td {
                      div {
                        display: none;
                      }
                    }
                  }
                  &:nth-child(1) {
                    td {
                      color: $grid_selected_background;
                    }
                  }
                  &:nth-child(4n + 1) {
                    td {
                      div {
                        &.fc-timegrid-slot-label-frame {
                          position: relative;
                          div {
                            position: absolute;
                            top: -20px;
                            left: 0px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
div#keikakuFukusiGrid,
div#keikakuLifeGrid {
  width: 98%;
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
}
// #fullCalendar {
//   position: relative;
// }
.cls {
  width: 120px;
  height: 16px;
  background-color: green;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
