<template>
  <section class="d-flex flex-column w-100 bg-light vh-100">
    <div class="bg-info">
      <div class="container">
        <h3 class="fs-3 py-3 text-white text-shadow">優惠券</h3>
      </div>
    </div>
    <div class="container bg-light">
      <div class="d-flex flex-column">
        <div class="d-flex py-3">
          <h3 class="fs-4">優惠券列表</h3>
          <button @click="openModal(true)" class="btn btn-secondary ms-auto">新增優惠券</button>
        </div>
        <table class="mb-6">
          <thead>
            <tr class="border border-top-0 border-start-0 border-end-0 border-3">
              <th width="100">
                優惠券名稱
              </th>
              <th width="100">
                折扣
              </th>
              <th width="60">
                到期日
              </th>
              <th width="60">
                啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id" class="border-bottom">
              <td>
                {{ coupon.title }}
              </td>
              <td>
                {{ `${coupon.percent}%` }}
              </td>
              <td>
                {{ toNormalTime(coupon.due_date) }}
              </td>
              <td>
                <div>
                  <label>
                    <input disabled :checked="coupon.is_enabled" type="checkbox" class="checkbox" name="" id="">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                  </label>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <button @click="openModal(false, coupon)" type="button" class="btn btn-primary">編輯</button>
                  <button @click="openDeleteModal(coupon)" type="button" class="btn btn-danger">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination @update-page="getCoupons" :pagination="pagination" class="mx-auto"></Pagination>
      </div>
    </div>
    <CouponModal ref="modal" :coupon="tempCoupon" :couponIsNew="couponIsNew" @emit-updateCoupon="updateCoupon">
    </CouponModal>
    <DeleteModal ref="deletModal" :item="tempCoupon" @emit-delete="deleteCoupon"></DeleteModal>
    <Loading :active="isLoading" :z-index="1060"></Loading>
  </section>
</template>

<script>
import CouponModal from '@/components/modal/CouponModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'DashBoardCoupons',
  components: {
    CouponModal,
    Pagination,
    DeleteModal,
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      couponIsNew: '',
      isLoading: false,
    };
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.putMessageState(err, '取得優惠券列表');
        });
    },
    openModal(isNew, tempCoupon) {
      this.couponIsNew = isNew;
      if (this.couponIsNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...tempCoupon };
      }
      this.$refs.modal.openModal();
    },
    updateCoupon(tempCoupon) {
      this.tempCoupon = tempCoupon;
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      let message = '建立優惠券';
      if (!this.couponIsNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = 'put';
        message = '更新優惠券';
      }
      this.$http[httpMethod](url, { data: this.tempCoupon })
        .then((res) => {
          if (res.data.success) {
            this.getCoupons();
            this.isLoading = false;
            this.$refs.modal.closeModal();
            this.putMessageState(res, message);
          } else {
            this.isLoading = false;
            this.$refs.modal.closeModal();
            this.putMessageState(res, message);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.modal.closeModal();
          this.putMessageState(err, message);
        });
    },
    openDeleteModal(coupon) {
      this.tempCoupon = { ...coupon };
      this.$refs.deletModal.openModal();
    },
    deleteCoupon(item) {
      this.tempCoupon = { ...item };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCoupons();
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempCoupon.title}`);
          } else {
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempCoupon.title}`);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.deletModal.closeModal();
          this.putMessageState(err, `刪除${this.tempCoupon.title}`);
        });
    },
  },
  inject: ['putMessageState', 'toNormalTime'],
  mounted() {
    this.getCoupons();
  },
};
</script>
