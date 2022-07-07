<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <template v-if="favoriteProductAry.length">
    <li v-for="product in favoriteProductAry" :key="product.id" class="d-flex align-items-center p-4 border-bottom">
      <router-link @click="toProduct(product.id)" to="" class="w-40">
        <img :src="product.imageUrl">
      </router-link>
      <div class="ms-4">
        <h5>{{ product.title }}</h5>
        <p>{{ '售價：NT' + currency(product.price) }}</p>
      </div>
      <button @click.stop="deleteFavorite(product)" type="button" class="btn scale-up"><i
          class="bi bi-trash-fill"></i></button>
    </li>
    <li class="p-4 list-unstyled">
      <router-link @click.stop="toMember" to="/member" class="btn btn-primary w-100">前往會員專區查看清單</router-link>
    </li>
  </template>
  <template v-else>
    <li class="list-unstyled p-6">
      <p class="text-shadow text-secondary">我的最愛沒有商品</p>
    </li>
  </template>

</template>

<script>
export default {
  inject: ['currency', 'emitter', 'getFavoriteIdAry', 'toggleFavorite'],
  emits: ['switch-dropdown'],
  data() {
    return {
      favoriteIdAry: this.getFavoriteIdAry(),
      products: [],
      favoriteProductAry: [],
      isLoading: true,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getfavoriteProductAry();
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    getfavoriteProductAry() {
      this.favoriteProductAry = this.products.filter((item) => this.favoriteIdAry.includes(item.id));
      this.isLoading = false;
    },
    deleteFavorite(product) {
      this.toggleFavorite(product);
      this.favoriteIdAry = this.getFavoriteIdAry();
      this.getfavoriteProductAry();
    },
    toProduct(id) {
      this.$emit('switch-dropdown', 'favorite');
      this.$router.push(`/product/${id}`);
    },
    toMember() {
      this.$emit('switch-dropdown', 'favorite');
      this.$router.push('/member');
    },
  },
  mounted() {
    this.emitter.on('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
      this.getfavoriteProductAry();
    });
    setTimeout(() => {
      this.getProducts();
    }, 150);
  },
  beforeUnmount() {
    this.emitter.off('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
      this.getfavoriteProductAry();
    });
  },
};
</script>
