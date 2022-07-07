<template>
  <div class="cart-btn-bg btn-cart position-fixed end-0 bottom-0 translate-middle
    bg-opacity-75 p-0 z-index-1999">
    <button @click.stop="emitSwitchDropdown" id="cartBtn" type="button" class="btn btn-focus-large position-relative">
      <span v-if="carts.length"
        class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger fs-6">{{
            carts.length
        }}</span>
      <i class="bi bi-basket fs-3 text-white"></i>
    </button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  inject: ['emitter'],
  methods: {
    getCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
          }
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    emitSwitchDropdown() {
      this.emitter.emit('switchDropdown', {
        target: 'carts',
      });
    },
  },
  mounted() {
    this.getCarts();
    this.emitter.on('updateCart', () => {
      this.getCarts();
    });
  },
  beforeUnmount() {
    this.emitter.off('updateCart', () => {
      this.getCarts();
    });
  },
};
</script>
