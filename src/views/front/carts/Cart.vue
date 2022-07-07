<template>
  <section class="container pb-11">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <table class="shadow-sm d-flex flex-column bg-light">
      <thead>
        <tr class="row">
          <th class="col-12">
            <h3 class="title">購物車</h3>
          </th>
        </tr>
        <tr class="row d-none d-md-flex">
          <th class="col-4 py-2">商品資料</th>
          <th class="col-2 py-2">單價價格</th>
          <th class="col-3 py-2">數量</th>
          <th class="col-2 py-2">小計</th>
          <th class="col-1 py-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="cart in carts" :key="cart.id">
          <tr v-for="(size, key) in cart.sizeObj" :key="size" class="row g-0 border-bottom">
            <td class="col-10 col-md-4 d-flex align-items-center p-2">
              <img class="w-50 me-2" :src="cart.product.imageUrl" alt="productImage">
              <h4 class="fs-6 fs-sm-4">{{ cart.product.title }}
                <span class="fs-6 fs-sm-5">{{ `${key}` }}</span>
              </h4>
            </td>
            <td class="col-2 col-md-1 d-flex align-items-center p-2 order-md-last">
              <button class="btn scale-up" @click.stop="deleteCart(cart.id)">
                <i class="bi bi-trash-fill fs-3"></i>
              </button>
            </td>
            <td class="col-12 col-md-3 order-md-3 d-flex align-items-center p-2">
              <div class="input-group">
                <button @click="updateCart('minus', cart.id, cart.product_id, key, cart.sizeObj, cart.qty)"
                  class="btn btn-secondary" type="button">-</button>
                <input v-model.number="cart.sizeObj[key]" type="number" disabled="disabled"
                  class="form-control bg-transparent text-center" id="number">
                <button @click="updateCart('add', cart.id, cart.product_id, key, cart.sizeObj, cart.qty)"
                  class="btn btn-secondary" type="button">+</button>
              </div>
            </td>
            <td class="col-6 col-md-2 order-md-2 fw-bold fs-6 fs-sm-4 d-flex align-items-center p-2"><span
                class="d-md-none">單價： </span>NT${{ currency(cart.product.price) }}</td>
            <td
              class="col-6 col-md-2  order-md-4 fw-bold fs-6 fs-sm-4 d-flex align-items-center p-2 text-end text-md-start">
              <span class="d-md-none">小計： </span>NT${{ currency(cart.product.price * size) }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot class="p-2">
        <template v-if="total - final_total">
          <tr class="row">
            <td class="col-6 fs-5">原價：</td>
            <td class="col-6 text-end fs-5">NT$ {{ currency(this.total) }}</td>
          </tr>
          <tr class="row">
            <td class="col-6 fs-6 fs-sm-5 text-secondary fw-bold mb-4">優惠：{{ discount }}</td>
            <td class="col-6 text-end fs-6 fs-sm-5 text-secondary fw-bold">省去 -NT$ {{ currency(this.total -
                this.final_total)
            }}</td>
          </tr>
        </template>
        <tr class="row mb-4">
          <td class="col-6 fs-5 fs-sm-4 fw-bold">總計:</td>
          <td class="col-6 fs-5 fs-sm-4 text-end fw-bold">NT$ {{ this.final_total }}</td>
        </tr>
        <tr class="row">
          <td class="col-6">
            <button @click.stop="deleteAllCart" type="button" class="btn btn-lg w-100 btn-outline-primary">
              清空購物車
            </button>
          </td>
          <td class="col-6 text-end">
            <router-link :to="{ name: 'Products', query: { category: '所有商品' } }" class="btn btn-lg w-100 btn-primary">
              繼續購物</router-link>
          </td>
        </tr>
      </tfoot>
    </table>
  </section>
  <section class="container pb-11">
    <div class="row">
      <div class="col-12 col-lg-8 mb-11 mb-lg-0">
        <div class="shadow-sm">
          <h3 class="title mb-11">你可能也喜歡...</h3>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0">
            <div v-for="product in similarProducts" :key="product.id" class="col d-flex justify-content-center">
              <Card :product="product"></Card>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="shadow-sm">
          <h3 class="title">訂單資訊</h3>
          <div class="p-4 bg-light">
            <div class="row mb-4">
              <div class="col-6 fs-4 fw-bold">商品數量：</div>
              <div class="col-6 fs-4 text-end">共 {{ this.totalQty }} 件</div>
            </div>
            <div class="row border-bottom mb-7">
              <div class="col-6 fs-4 fw-bold mb-4">小計：</div>
              <div class="col-6 fs-4 text-end ">NT$ {{ currency(this.final_total) }}</div>
              <div class="col-12 mb-1">
                <a v-if="couponStatus == 'init'" @click.prevent="useCoupon('show')" :class="{ disabled: isUseCoupon }"
                  href="#" class="text-start fs-4 text-secondary btn btn-bottom-line p-0"><span class="fw-bold"
                    v-if="isUseCoupon">已</span>使用優惠券</a>
                <div v-if="couponStatus == 'show'" class="input-group">
                  <input v-model="couponCode" type="text" class="form-control" placeholder="輸入優惠券" aria-label="coupon"
                    aria-describedby="conpou">
                  <button @click.stop="addCoupon" class="btn btn-secondary" type="button"
                    id="button-addon2">送出優惠券</button>
                </div>
              </div>
            </div>
            <div class="row">
              <template v-if="total - final_total">
                <div class="col-6 fs-4 mb-4">原價：</div>
                <div class="col-6 text-end fs-4">NT$ {{ currency(this.total) }}</div>
                <div class="col-6 fs-5 text-secondary fw-bold mb-4">優惠：{{ discount }}</div>
                <div class="col-6 text-end fs-5 text-secondary fw-bold">省去 -NT$ {{ currency(this.isUseCoupon) }}</div>
              </template>
              <div class="col-6 fs-4 fw-bold mb-4">總計：</div>
              <div class="col-6 text-end fs-4 fw-bold">NT$ {{ currency(this.final_total) }}</div>
            </div>
            <div class="row">
              <div class="col-12">
                <a @click.stop="toFormPage" class="btn btn-lg btn-primary w-100">前往結帳</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Cart',
  inject: ['currency', 'emitter', 'putMessageState'],
  data() {
    return {
      couponStatus: 'init',
      carts: [],
      products: {},
      isLoading: false,
      total: '',
      final_total: '',
      cartData: {},
      totalQty: 0,
      similarProducts: [],
      couponCode: 'max',
      isUseCoupon: '',
    };
  },
  components: {
    Card,
  },
  methods: {
    getCarts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartData = res.data.data;
            this.carts = res.data.data.carts;
            this.total = res.data.data.total;
            this.final_total = res.data.data.final_total;
            this.isUseCoupon = this.total - this.final_total;
            this.getProducts();
            this.caculateTotalQty();
          } else {
            this.putMessageState(res, '取得購物車列表');
          }
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
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getSimilarProducts();
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
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
            this.putMessageState(res, '從購物車刪除');
            this.emitter.emit('getCart');
          } else {
            this.putMessageState(res, '從購物車刪除');
          }
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
    deleteAllCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
            this.emitter.emit('updateCart');
            this.putMessageState(res, '刪除全部購物車');
            this.emitter.emit('getCart');
          } else {
            this.putMessageState(res, '刪除全部購物車');
          }
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
    updateCart(action, cartId, cartProductId, sizetype, sizeQtyObj, cartQty) {
      this.isLoading = true;
      const id = cartId;
      const productId = cartProductId;
      const sizeObj = sizeQtyObj;
      const size = sizetype;
      let qty = cartQty;

      if (action === 'add') {
        sizeObj[size] += 1;
        qty += 1;
      } else {
        if (sizeObj[size] === 1) {
          this.emitter.emit('push-message', {
            content: '商品數量不得為負數',
            state: false,
          });
          return;
        }
        sizeObj[size] -= 1;
        qty -= 1;
      }

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .put(url, {
          data: {
            product_id: productId,
            qty,
            sizeObj,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
            this.emitter.emit('updateCart');
            this.putMessageState(res, '更新購物車');
            this.emitter.emit('getCart');
            this.isLoading = false;
          } else {
            this.putMessageState(res, '更新購物車');
            this.isLoading = false;
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    caculateTotalQty() {
      this.totalQty = 0;
      this.carts.forEach((cart) => {
        this.totalQty += cart.qty;
      });
    },
    useCoupon(status) {
      this.couponStatus = status;
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http
        .post(url, {
          data: {
            code: this.couponCode,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.final_total = res.data.data.final_total;
            this.getCarts();
            this.couponStatus = 'init';
            this.putMessageState(res, '套用優惠券');
          } else {
            this.putMessageState(res, '套用優惠券');
          }
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
    getSimilarProducts() {
      this.similarProducts = [];
      const { category, id } = this.carts[0]?.product || {};
      const filterProducts = this.products.filter((product) => product.category === category && product.id !== id) || [];

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const ary = new Set([]);

      for (let index = 0; ary.size < (filterProducts.length < 4 ? filterProducts.length : 4); index + 1) {
        const num = getRandomInt(filterProducts.length);
        ary.add(num);
      }

      ary.forEach((item) => {
        this.similarProducts.push(filterProducts[item]);
      });
    },
    toFormPage() {
      if (!this.carts.length) {
        this.emitter.emit('push-message', {
          content: '購物車沒有商品，請先購物',
          state: false,
        });
        this.$router.push({ name: 'Products', query: { category: '所有商品' } });
        return;
      }
      this.$router.push('/carts/userform');
    },
  },
  computed: {
    discount() {
      return `${(this.final_total / this.total) * 100}%`;
    },
  },
  watch: {
    carts() {
      if (!this.carts.length) {
        this.emitter.emit('push-message', {
          content: '購物車沒有商品，請先購物',
          state: false,
        });
        this.$router.push({ name: 'Products', query: { category: '所有商品' } });
      }
    },
  },
  mounted() {
    this.getCarts();
    this.emitter.on('updateCart', this.getCarts);
  },
  beforeUnmount() {
    this.emitter.off('updateCart', this.getCarts);
  },
};
</script>
