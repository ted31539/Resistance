<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <section class="products-banner vh-30 position-relative">
  </section>
  <section class="container py-10">
    <div class="row">
      <ol class="breadcrumb px-3 mb-10">
        <li class="breadcrumb-item">
          <router-link :to="`/`" class="text-primary">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Products', query: { category: '所有商品' } }" class="text-primary">產品</router-link>
        </li>
        <li class="breadcrumb-item active">{{ category }}</li>
      </ol>
    </div>
    <div class="row">
      <div class="col-lg-2 text-center mb-8">
        <h2 class="fs-2 mb-11"><span class="fs-5 text-black-50">Classification</span><br>產品分類</h2>
        <ProductSidebar :category="category" />
      </div>
      <div class="col-lg-10 text-center">
        <h2 class="fs-2 mb-11"><span class="fs-5 text-black-50">Products</span><br>{{ category }}</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-6">
          <div v-for="product in filterProducts" :key="product.id" class="col mb-11">
            <Card :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card.vue';
import ProductSidebar from '@/components/sidebar/ProductSidebar.vue';

export default {
  name: 'Products',
  props: ['category'],
  data() {
    return {
      products: [],
      filterProducts: [],
      isLoading: false,
    };
  },
  components: {
    ProductSidebar,
    Card,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getFilterProducts(this.category);
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    getFilterProducts(category = '所有商品') {
      if (category === '所有商品') {
        this.filterProducts = [...this.products];
      } else if (category === 'HardMax' || category === 'AirMax') {
        this.filterProducts = this.products.filter((product) => product.serious === category);
      } else {
        this.filterProducts = this.products.filter((product) => product.category === category);
      }
    },
  },
  watch: {
    category() {
      this.getFilterProducts(this.category);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
