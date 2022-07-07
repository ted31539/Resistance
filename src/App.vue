<template>
  <ToastMessage />
  <router-view />
</template>

<script>
import { getWindowWidth, getWindowHeight } from './methods/getWindowSize';
import emitter from './methods/eventBus';
import putMessageState from './methods/putMessage';
import ToastMessage from './components/ToastMessage.vue';
import { toNormalTime, toTimestamp } from './methods/timeConverter';
import currency from './methods/currency';
import { toggleFavorite, getFavoriteIdAry } from './methods/addFavorite';

export default {
  provide() {
    return {
      getWindowWidth,
      getWindowHeight,
      emitter,
      putMessageState,
      toNormalTime,
      toTimestamp,
      currency,
      toggleFavorite,
      getFavoriteIdAry,
    };
  },
  components: {
    ToastMessage,
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
