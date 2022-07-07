<template>
  <div ref="modal" class="modal fade z-index-999" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="productModalLabel">
            修改密碼
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="row mb-3">
                  <div class="col-12">
                    <div>
                      <label for="title" class="form-label">電子郵件</label>
                      <input v-model="user.email" type="text" class="form-control" placeholder="輸入原帳號電子信箱">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click.stop="updatePassword" type="button" class="btn btn-primary">確認</button>
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
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    updatePassword() {
      this.$emit('update-passsword', this.user);
      this.closeModal();
    },
  },
};
</script>
