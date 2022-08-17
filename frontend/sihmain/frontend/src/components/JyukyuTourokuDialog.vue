<template>
  <v-dialog v-model="dispFlag" width="700" persistent>
    <v-card class="pa-2" id="jyukyuTourokuDialog" height="100%">
      <v-btn
        class="mt-1"
        elevation="2"
        icon
        small
        absolute
        top
        right
        @click="dispFlag = false"
        color="secondary"
        ><v-icon dark small> mdi-close </v-icon>
      </v-btn>
      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <div v-if="mode == 'modKihon'">
            <JyukyuTourokuKihon ref="kihon"> </JyukyuTourokuKihon>
          </div>
          <div v-else-if="mode == 'modSyogaikubun'">
            <JyukyuTourokuSyogaiKubun ref="syogaiKubun">
            </JyukyuTourokuSyogaiKubun>
          </div>
          <div v-else-if="mode == 'modSikyuryo'">
            <JyukyuTourokuSikyuryo ref="sikyuryo"> </JyukyuTourokuSikyuryo>
          </div>
          <div v-else-if="mode == 'modKeikakuSoudan'">
            <JyukyuTourokuKeikakuSoudan ref="keikaku">
            </JyukyuTourokuKeikakuSoudan>
          </div>
          <div v-else-if="mode == 'modRiyosyafutan'">
            <JyukyuTourokuRiyosyaFutan ref="futan"> </JyukyuTourokuRiyosyaFutan>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';
import JyukyuTourokuKihon from './JyukyuTourokuKihon.vue';
import JyukyuTourokuSyogaiKubun from './JyukyuTourokuSyogaiKubun.vue';
import JyukyuTourokuSikyuryo from './JyukyuTourokuSikyuryo.vue';
import JyukyuTourokuKeikakuSoudan from './JyukyuTourokuKeikakuSoudan.vue';
import JyukyuTourokuRiyosyaFutan from './JyukyuTourokuRiyosyaFutan.vue';

export default {
  data() {
    return {
      dispFlag: false,
      mode: '',
    };
  },
  components: {
    JyukyuTourokuKihon,
    JyukyuTourokuSyogaiKubun,
    JyukyuTourokuSikyuryo,
    JyukyuTourokuKeikakuSoudan,
    JyukyuTourokuRiyosyaFutan,
  },
  computed: {},
  mounted() {},
  methods: {
    open(mode, selectedData) {
      this.dispFlag = true;
      this.mode = mode;
      Vue.nextTick(() => {
        if (selectedData.length > 0) {
          if (mode == 'modKihon') {
            this.$refs.kihon.setMode(mode);
            this.$refs.kihon.setData(selectedData);
          } else if (mode == 'modSyogaikubun') {
            this.$refs.syogaiKubun.setMode(mode);
            this.$refs.syogaiKubun.setData(selectedData);
          } else if (mode == 'modSikyuryo') {
            this.$refs.sikyuryo.setMode(mode);
            this.$refs.sikyuryo.setData(selectedData);
          } else if (mode == 'modKeikakuSoudan') {
            this.$refs.keikaku.setMode(mode);
            this.$refs.keikaku.setData(selectedData);
          } else if (mode == 'modRiyosyafutan') {
            this.$refs.futan.setMode(mode);
            this.$refs.futan.setData(selectedData);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#jyukyuTourokuDialog {
  width: 700px;
  height: 500px;
  font-size: 12px;
}
</style>