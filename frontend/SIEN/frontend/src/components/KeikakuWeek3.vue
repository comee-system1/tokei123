<template>
  <div id="keikakuWeek">
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
          <div class="ht60">
            <div class="mt-1">
              <v-card class="d-flex flex-row" flat tile>
                <v-card
                  :color="'pt-1 grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="120"
                  height="28"
                  class="text-center"
                >
                  利用者名
                </v-card>
                <v-card
                  elevation="0"
                  outlined
                  tile
                  class="ml-1 pl-1 pt-1 lightYellow"
                  width="160"
                  height="28"
                >
                  {{ userName }}
                </v-card>
                <v-card
                  :color="'grey lighten-4 pt-1 ml-1'"
                  elevation="0"
                  tile
                  small
                  width="80"
                  height="28"
                  class="text-center"
                >
                  作成日
                </v-card>
                <v-card class="text-center pt-1 ml-1" width="140" outlined tile>
                  {{ getYmd }}
                </v-card>
              </v-card>
            </div>
            <div class="mt-1">
              <v-card class="d-flex flex-row" flat tile>
                <v-card
                  :color="'pt-1 grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="120"
                  height="28"
                  class="text-center"
                >
                  週間計画開始年月
                </v-card>
                <v-card
                  class="pt-1 ml-1 text-center"
                  width="160"
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
                  <v-tabs light height="24">
                    <v-tab>週間予定</v-tab>
                    <v-tab>主な日常生活等</v-tab>
                  </v-tabs>
                </v-card>
              </v-card>
            </div>
          </div>
          <FullCalendar :options="calendarOptions" class="mt-1" />
        </v-col>
        <v-col :style="{ 'max-width': rightWidth2 }">
          <div class="mt-1 ht60">
            <v-btn-toggle tile>
              <v-btn x-small>前回コピー</v-btn>
              <v-btn x-small>履歴参照</v-btn>
            </v-btn-toggle>
          </div>
          <wj-flex-grid
            class="mt-1"
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
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    UserList,
  },
  data() {
    return {
      leftWidth: '280px',
      rightWidth: '80%',
      rightWidth2: '12%',
      userName: '',
      datepicker_dialog: false,
      picker: '',
      itemdataLife: [],
      events: [],
      getYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      getYm: dayjs().format('YYYY') + '年' + dayjs().format('MM') + '月',
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, Draggable],
        initialView: 'timeGridWeek',
        headerToolbar: false,
        select: this.handleDateSelect,
        //  dateClick: this.handleDateClick,
        eventClick: this.onEventClick,
        droppable: true,
        editable: true,
        navLinks: false,
        selectable: true,
        contentHeight: '600px',
        slotDuration: '00:30:00',
        locale: 'ja',
        firstDay: 1,
        dayMaxEvents: true,
        nowIndicator: true,
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

          // timeGridDay: {
          //   slotMinTime: '04:00:00',
          //   slotMaxTime: '22:00:00',
          // },
        },
      },
    };
  },
  computed: {},
  mounted() {
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

    let events = [];
    events = [
      {
        title: 'event 1',
        start: '2022-09-21T12:00:00',
        end: '2022-09-21T14:30:00',
      },
      {
        title: 'event 2',
        start: '2022-09-21T11:00:00',
        end: '2022-09-21T12:30:00',
      },
    ];
    this.events = events;
    this.calendarOptions.events = events;
  },
  methods: {
    handleDateSelect(selectInfo) {
      console.log(selectInfo.startStr);
      console.log(selectInfo.endStr);
      /*
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: 1,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
      */
    },

    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr);
    },
    onEventClick: function (info) {
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
    onInitializeLife() {},
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

  .lightYellow {
    background-color: $light_yellow;
  }
  .ht60 {
    height: 60px;
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
  // .fc-highlight {
  //   background-color: transparent !important;
  // }
  // .fc-event-time {
  //   display: none;
  // }
}
div#keikakuLifeGrid {
  width: 98%;
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
}
</style>
