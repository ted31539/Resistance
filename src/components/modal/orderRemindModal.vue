<template>
  <div ref="modal" class="modal fade z-index-999" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="productModalLabel">
            提醒
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div v-if="authState">
              可至會員專區查看訂單!
            </div>
            <div v-else>
              可用訂單上的信箱，至會員專區註冊查看訂單!
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal, $router.push('/member')" v-if="authState" type="button"
            class="btn btn-primary">前往會員專區</button>
          <button @click="closeModal, $router.push('/member')" v-else type="button"
            class="btn btn-primary">註冊會員</button>
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/misxins/modalMixins';

export default {
  inject: ['toNormalTime', 'toTimestamp'],
  mixins: [modalMixin],
  emits: ['update-passsword'],
  props: {
    authState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
};
</script>
