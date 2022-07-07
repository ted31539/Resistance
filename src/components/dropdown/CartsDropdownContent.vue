<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <template v-if="carts?.length">
    <li v-for="cart in carts" :key="cart.id" class="d-flex align-items-center p-4 border-bottom">
      <router-link @click="toProduct(cart.product.id)" :to="`/product/${cart.product.id}`" class="w-40">
        <img :src="cart.product.imageUrl">
      </router-link>
      <div class="ms-4">
        <h5>{{ cart.product.title }}</h5>
        <p>{{ `${cart.qty} * NT$ ${currency(cart.product.price)} = ${cart.total}` }}</p>
        <ul>
          <li v-for="(item, size) in cart.sizeObj" :key="item" class="list-unstyled fs-6 fw-light">{{ `${size}* ${item}
          件` }}</li>
        </ul>

      </div>
      <button @click.stop="deleteCart(cart.id)" type="button" class="btn scale-up"><i
          class="bi bi-trash-fill"></i></button>
    </li>
    <li :class="[total - final_total ? 'justify-content-between:' : 'justify-content-end']" class="d-flex p-4">
      <p v-if="total - final_total" class="fs-4 text-decoration-line-through">總價:{{ currency(total) }}</p>
      <p class="fs-4 fw-bold">{{ total - final_total ? '特價:' : '總價:' }}{{ currency(final_total) }}</p>
    </li>
    <li class="p-4 list-unstyled">
      <router-link @click.stop="toCarts" to="/carts/cart" class="btn btn-primary w-100">前往購物車頁面</router-link>
    </li>
  </template>
  <template v-else>
    <li class="list-unstyled p-6">
      <p class="text-shadow text-secondary">購物車沒有商品</p>
    </li>
  </template>

</template>

<script>
export default {
  inject: ['currency', 'emitter', 'toggleFavorite', 'putMessageState'],
  emits: ['switch-dropdown'],
  data() {
    return {
      carts: [],
      isLoading: true,
      total: '',
      final_total: '',
    };
  },
  methods: {
    getCarts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
            this.total = res.data.data.total;
            this.final_total = res.data.data.final_total;
          } else {
            this.putMessageState(res, '取得購物車列表');
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    deleteCart(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
            this.emitter.emit('updateCart');
            this.isLoading = false;
            this.putMessageState(res, '從購物車刪除');
          } else {
            this.isLoading = false;
            this.putMessageState(res, '從購物車刪除');
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    toCarts() {
      this.$emit('switch-dropdown', 'favorite');
      this.$router.push('/carts/cart');
    },
    toProduct(id) {
      this.$emit('switch-dropdown', 'favorite');
      this.$router.push(`/product/${id}`);
    },
  },
  mounted() {
    setTimeout(() => {
      this.getCarts();
    }, 150);

    this.emitter.on('updateCart', this.getCarts);
  },
  beforeUnmount() {
    this.emitter.off('updateCart', this.getCarts);
  },
};
</script>
