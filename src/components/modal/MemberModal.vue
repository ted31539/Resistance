<template>
  <div ref="modal" class="modal fade z-index-999" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="productModalLabel">
            修改帳號資料
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
                      <input v-model="tempUser.email" disabled type="text" class="form-control" id="title"
                        placeholder="不得修改">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row mb-3">
                  <div class="col-12">
                    <div>
                      <label for="title" class="form-label">姓名</label>
                      <input v-model="tempUser.displayName" type="text" class="form-control" id="title"
                        placeholder="輸入姓名">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click.stop="updateUser" type="button" class="btn btn-primary">確認</button>
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
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['update-user'],
  data() {
    return {
      tempUser: {
        email: '',
        displayName: '',
      },
    };
  },
  watch: {
    user() {
      this.tempUser = this.user;
    },
  },
  methods: {
    updateUser() {
      this.$emit('update-user', this.tempUser);
      this.closeModal();
    },
  },
};
</script>
