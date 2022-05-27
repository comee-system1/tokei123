<template>
  <v-row id="screen_dialog" v-show="screenFlag">
      <v-col class="text-h2">
        <p>療養介護については、</p>
        <p>実績記録票の提出はありません。</p>
      </v-col>
    </v-row>
</template>
<script>
export default {
  props: {
    changedService: String,
  },
  watch: {
    changedService() {
      this.screenFlag = false;
    }
  },
  data() {
    return {
      screenFlag: true,
    }

  }
}
</script>

<style lang="scss" scoped>
#screen_dialog {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.46;
  background-color: rgb(33, 33, 33, 1);
  border-color: rgb(33, 33, 33);
  width: 100%;
  height: 100%;
  z-index: 4;
  padding: 0;
  margin: 0;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    -webkit-text-stroke: 1px #000;
    // text-stroke: 1px #000;
    z-index: 10;
  }
}
</style>