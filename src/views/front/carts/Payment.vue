<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <section class="container w-100 pb-11">
    <div class="row">
      <div class="col-12 pb-11">
        <div class="bg-light shadow-sm">
          <h3 class="title">感謝您的購買</h3>
          <p class="fs-2 text-center p-4">下列為您的訂單資訊</p>
          <div class="d-flex justify-content-center p-4">
            <router-link to="/" class="btn w-40 btn-outline-primary me-8">前往首頁</router-link>
            <router-link :to="{ name: 'Products', query: { category: '所有商品' } }" class="btn w-40 btn-primary">繼續購物
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6 pb-11">
        <div class="shadow-sm">
          <h3 class="title">顧客資訊</h3>
          <div class="bg-light p-4">
            <div class="row row-cols-2">
              <div class="col-4 border-bottom mb-4">下單日期：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ toNormalTime(order.create_at) }}</div>
              <div class="col-4 border-bottom mb-4">訂單編號：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ order.id }}</div>
              <div class="col-4 border-bottom mb-4">顧客姓名：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ order.user?.name }}</div>
              <div class="col-4 border-bottom mb-4">聯絡電話：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ order.user?.tel }}</div>
              <div class="col-4 border-bottom mb-4">電子郵件：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ order.user?.email }}</div>
              <div class="col-4 border-bottom mb-4">地址：</div>
              <div class="col-7 text-break border-bottom mb-4">{{ order.user?.address }}</div>
              <div class="col-4 border-bottom mb-4">訂單金額：</div>
              <div class="col-7 text-break border-bottom mb-4">NT$ {{ currency(order.total) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="shadow-sm">
          <table class="shadow-sm d-flex flex-column bg-light">
            <thead>
              <tr class="row g-0">
                <th class="col-12">
                  <h3 class="title">購物車</h3>
                </th>
              </tr>
              <tr class="row g-0 d-none d-md-flex">
                <th class="col-5 p-2">商品資料</th>
                <th class="col-3 p-2">單價價格</th>
                <th class="col-1 p-2">數量</th>
                <th class="col-3 p-2">小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in order.products" :key="product.id">
                <tr v-for="(size, key) in product.sizeObj" :key="size" class="row g-0 border-bottom">
                  <td class="col-10 col-md-5 d-flex align-items-center p-2">
                    <img class="w-50 me-2" :src="product.product.imageUrl" alt="">
                    <h4 class="fs-6 fs-sm-4">{{ product.product.title }}
                      <span class="fs-6 fs-sm-5">{{ `(${key})` }}</span>
                    </h4>
                  </td>
                  <td class="col-12 col-md-1 order-md-3 d-flex align-items-center fs-6 fs-sm-4 fw-bold p-2">
                    <span class="d-md-none">數量： </span>{{ size }}
                  </td>
                  <td class="col-6 col-md-3 order-md-2 fw-bold fs-6 fs-sm-4 d-flex align-items-center p-2"><span
                      class="d-md-none">單價： </span>NT${{ currency(product.product.price) }}</td>
                  <td
                    class="col-6 col-md-3  order-md-4 fw-bold fs-6 fs-sm-4 d-flex align-items-center p-2 text-end text-md-start">
                    <span class="d-md-none">小計： </span>NT${{ currency(product.product.price * size) }}</td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <template v-if="priceGap">
                <tr class="row g-0 p-2">
                  <td class="col-6 fs-5">原價：</td>
                  <td class="col-6 text-end fs-5">NT$ {{ originTotal }}</td>
                </tr>
                <tr class="row g-0 p-2">
                  <td class="col-6 fs-6 fs-sm-5 text-secondary fw-bold mb-4">優惠：{{ discount }}</td>
                  <td class="col-6 text-end fs-6 fs-sm-5 text-secondary fw-bold">省去 -NT$ {{ priceGap }}</td>
                </tr>
              </template>
              <tr class="row g-0 p-2 mb-4">
                <td class="col-6 fs-5 fs-sm-4 fw-bold">總計:</td>
                <td class="col-6 fs-5 fs-sm-4 text-end fw-bold">NT$ {{ currency(order.total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </section>
  <OrderRemindModal :authState="authState" ref="orderRemindModal" />
</template>

<script>
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/methods/firebase';
import OrderRemindModal from '@/components/modal/orderRemindModal.vue';

export default {
  name: 'payment',
  inject: ['emitter', 'putMessageState', 'currency', 'toNormalTime'],
  components: {
    OrderRemindModal,
  },
  data() {
    return {
      order: {},
      isLoading: false,
      originTotal: 0,
      priceGap: '',
      discount: '',
      authState: '',
    };
  },
  methods: {
    getOrder(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
          } else {
            this.putMessageState(res, '取得訂單');
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
    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.authState = true;
          this.$refs.orderRemindModal.openModal();
        } else {
          this.authState = false;
          this.$refs.orderRemindModal.openModal();
        }
      });
    },
  },
  watch: {
    order() {
      const finalTotal = this.order.total;
      Object.keys(this.order.products).forEach((item) => {
        this.originTotal += this.order.products[item].total;
      });
      this.priceGap = this.originTotal - finalTotal;
      this.discount = `${(finalTotal / this.originTotal) * 100}%`;
    },
  },
  created() {
    this.getAuthState();
  },
  mounted() {
    const { id } = this.$route.params;
    this.getOrder(id);
  },
};
</script>
