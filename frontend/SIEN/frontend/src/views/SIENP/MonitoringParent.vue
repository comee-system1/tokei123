<template>
  <div id="monitoringParent">
    <div class="commonTab">
      <v-container no-gutters fluid class="pa-0">
        <v-tabs hide-slider v-model="tab">
          <v-tab
            v-for="item in menuItem"
            :key="item.val"
            :href="item.href"
            @change="tabsChange(item.hrefval)"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-container>
      <v-container no-gutters fluid class="pa-0">
        <v-tabs-items v-model="tab" class="pa-1">
          <v-layout no-gutters>
            <v-col
              no-gutters
              class="pa-0 mr-1"
              :style="{ 'max-width': leftWidth }"
              v-show="
                (tab == 'Houkokusyo' && userdrawer) ||
                tab == 'SyukanKeikaku' ||
                tab == 'SampleCaleandar'
              "
            >
              <user-list
                ref="user_list"
                :dispHideBar="false"
                :dispAddDaicho="false"
                :dispSvcReki="false"
                :dispYoteiYm="true"
                :dispGrdMoniKanryo="true"
                :grdheight="125"
                @child-select="setUserSelectPoint"
              >
              </user-list>
            </v-col>
            <v-col no-gutters class="pa-0">
              <v-tab-item value="KeikakuIcrn" transition="none">
                <KeikakuIcrn
                  ref="KeikakuIcrn"
                  @moni-select="moniSelect"
                ></KeikakuIcrn>
              </v-tab-item>
              <v-tab-item value="Houkokusyo" transition="none" eager>
                <MonitoringHoukokusho
                  :selectedUserObj="selectedUserObj"
                  @userDispChange="userdrawer = $event"
                  ref="Houkokusyo"
                >
                </MonitoringHoukokusho>
              </v-tab-item>
              <v-tab-item value="SyukanKeikaku" transition="none">
                <MonitoringSyukanKeikaku
                  :selectedUserObj="selectedUserObj"
                  ref="SyukanKeikaku"
                >
                </MonitoringSyukanKeikaku>
              </v-tab-item>
              <v-tab-item value="SampleCaleandar" transition="none" eager>
                <SampleCaleandar
                  :selectedUserObj="selectedUserObj"
                  ref="SampleCalendar"
                >
                </SampleCaleandar>
              </v-tab-item>
              <v-tab-item value="MonitoringJissiIcrn" transition="none">
                <MonitoringJissiIcrn
                  ref="MonitoringJissiIcrn"
                ></MonitoringJissiIcrn>
              </v-tab-item>
            </v-col>
          </v-layout>
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
import ls from '@/utiles/localStorage';
import KeikakuIcrn from '../../components/MonitoringYoteiIcrn.vue';
import MonitoringJissiIcrn from '../../components/MonitoringJissiIcrn.vue';
import MonitoringHoukokusho from '../../components/MonitoringHoukokusho.vue';
import MonitoringSyukanKeikaku from '../../components/MonitoringSyukanKeikaku.vue';
import SampleCaleandar from '../../components/MonitoringSampleCaleandar.vue';
import UserList from '../../components/UserList.vue';

export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    KeikakuIcrn,
    MonitoringJissiIcrn,
    MonitoringHoukokusho,
    MonitoringSyukanKeikaku,
    SampleCaleandar,
    UserList,
  },
  data: function () {
    return {
      leftWidth: '280px',
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        {
          name: 'モニタリング予定一覧',
          href: '#KeikakuIcrn',
          hrefval: 'KeikakuIcrn',
        },
        {
          name: 'モニタリング報告書',
          href: '#Houkokusyo',
          hrefval: 'Houkokusyo',
        },
        {
          name: '週間計画書',
          href: '#SyukanKeikaku',
          hrefval: 'SyukanKeikaku',
        },
        {
          name: 'モニタリング実施一覧',
          href: '#MonitoringJissiIcrn',
          hrefval: 'MonitoringJissiIcrn',
        },
        {
          name: 'サンプルカレンダー',
          href: '#SampleCaleandar',
          hrefval: 'SampleCaleandar',
        },
      ],
      selectedUserObj: {},
      userdrawer: true,
    };
  },
  watch: {
    selectedData() {
      // 子供に受け渡すだけ
    },
  },
  methods: {
    tabsChange(hrefval) {
      this.$router.app.$off('print_event_global');
      ls.setlocalStorageEncript(ls.KEY.SansyoTab, hrefval);
      this.tab = hrefval;
      if (this.selectedUserObj != null) {
        this.setUserSelectPoint(this.selectedUserObj);
      }
      if (this.tab == 'KeikakuIcrn') {
        if (this.$refs.KeikakuIcrn != undefined) {
          this.$refs.KeikakuIcrn.setPrintEvent();
        }
      }
      if (this.tab == 'MonitoringJissiIcrn') {
        if (this.$refs.MonitoringJissiIcrn != undefined) {
          this.$refs.MonitoringJissiIcrn.setPrintEvent();
        }
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.selectedUserObj = row;

      if (this.tab == 'Houkokusyo') {
        if (this.$refs.Houkokusyo != undefined) {
          this.$refs.Houkokusyo.setUserdata(row);
        }
      }
      if (this.tab == 'SyukanKeikaku') {
        if (this.$refs.SyukanKeikaku != undefined) {
          this.$refs.SyukanKeikaku.setUserdata(row);
        }
      }
      if (this.tab == 'SampleCaleandar') {
        if (this.$refs.SampleCalendar != undefined) {
          this.$refs.SampleCalendar.setUserdata(row);
        }
      }
    },
    moniSelect(item, ymItem) {
      // v-tabにeagerが必要
      this.tabsChange(this.menuItem[1].hrefval);
      this.$refs.Houkokusyo.setDataFromYoteiList(item, ymItem);
    },
  },
};
</script>

<style lang="scss"></style>
