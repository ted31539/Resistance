<template>
  <div ref="modal" class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="couponModalLabel">
            <span v-if="couponIsNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="title" class="form-label fw-bold">標題</label>
                  <input v-model="tempCoupon.title" type="text" class="form-control" id="title" placeholder="輸入標題">
                </div>
                <div class="mb-3">
                  <label for="code" class="form-label fw-bold">優惠碼</label>
                  <input v-model="tempCoupon.code" type="text" class="form-control" id="code" placeholder="輸入優惠碼">
                </div>
                <div class="mb-3">
                  <label for="due_date" class="form-label fw-bold">到期日</label>
                  <input v-model="due_date" type="date" class="form-control" id="due_date" placeholder="輸入到期日">
                </div>
                <div class="mb-3">
                  <label for="percent" class="form-label fw-bold">折扣百分比</label>
                  <input v-model="tempCoupon.percent" type="number" class="form-control" id="percent"
                    placeholder="輸入折扣百分比: 50">
                </div>
                <div class="mb-3">
                  <label for="isEnable" class="d-flex align-items-center">
                    <input v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" type="checkbox"
                      class="checkbox pt-8" name="" id="isEnable">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                    <span class="fw-bold ms-4">是否啟用</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click="updateCoupon" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/misxins/modalMixins';

export default {
  mixins: [modalMixin],
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    couponIsNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emit-updateCoupon'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };
      if (this.couponIsNew) {
        this.due_date = this.toNormalTime();
        this.tempCoupon.due_date = this.toTimestamp(this.due_date);
      } else {
        this.due_date = this.toNormalTime(this.tempCoupon.due_date);
      }
    },
    due_date() {
      this.tempCoupon.due_date = this.toTimestamp(this.due_date);
    },
    couponIsNew() {
      if (this.couponIsNew) {
        this.tempCoupon.is_enabled = 0;
      }
    },
  },
  inject: ['toNormalTime', 'toTimestamp'],
  methods: {
    updateCoupon() {
      this.$emit('emit-updateCoupon', this.tempCoupon);
    },
  },
};
</script>
