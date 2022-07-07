<template>
  <div :ref="`collapse${index}`" class="collapse">
    <table class="shadow-sm d-flex flex-column bg-light">
      <thead>
        <tr class="row g-0">
          <th class="col-12">
            <h3 class="title">購物車</h3>
          </th>
        </tr>
        <tr class="row d-none d-md-flex">
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
          <tr class="row">
            <td class="col-6 fs-5">原價：</td>
            <td class="col-6 text-end fs-5">NT$ {{ originTotal }}</td>
          </tr>
          <tr class="row">
            <td class="col-6 fs-6 fs-sm-5 text-secondary fw-bold mb-4">優惠：{{ discount }}</td>
            <td class="col-6 text-end fs-6 fs-sm-5 text-secondary fw-bold">省去 -NT$ {{ priceGap }}</td>
          </tr>
        </template>
        <tr class="row mb-4">
          <td class="col-6 fs-5 fs-sm-4 fw-bold">總計:</td>
          <td class="col-6 fs-5 fs-sm-4 text-end fw-bold">NT$ {{ currency(order.total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import '@popperjs/core';
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  inject: ['toNormalTime', 'currency'],
  props: {
    order: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      tempOrder: [],
      myCollapse: null,
      originTotal: 0,
      priceGap: '',
      discount: '',
    };
  },
  methods: {
    toggleCollapse() {
      this.myCollapse.toggle();
    },
  },
  watch: {
    order() {
      this.tempOrder = { ...this.order };
      const finalTotal = this.order.total;
      Object.keys(this.order.products).forEach((item) => {
        this.originTotal += this.order.products[item].total;
      });
      this.priceGap = this.originTotal - finalTotal;
      this.discount = `${(finalTotal / this.originTotal) * 100}%`;
    },
  },
  mounted() {
    this.tempOrder = { ...this.order };
    const finalTotal = this.order.total;
    Object.keys(this.order.products).forEach((item) => {
      this.originTotal += this.order.products[item].total;
    });
    this.priceGap = this.originTotal - finalTotal;
    this.discount = `${(finalTotal / this.originTotal) * 100}%`;
    this.myCollapse = new Collapse(this.$refs[`collapse${this.index}`], {
      toggle: false,
    });
  },
};
</script>
