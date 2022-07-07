<template>
  <div ref="modal" class="modal fade" id="delteModal" tabindex="-1" aria-labelledby="delteModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title">刪除{{ item.title || '' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>是否刪除<strong class="mx-2">{{ item.title || '' }}</strong> (刪除後將無法恢復)。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click="deleteItem" type="button" class="btn btn-danger">確認刪除</button>
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
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['emit-delete'],
  data() {
    return {
      tempItem: {},
    };
  },
  watch: {
    item() {
      this.tempItem = { ...this.item };
    },
  },
  methods: {
    deleteItem() {
      this.$emit('emit-delete', this.tempItem);
    },
  },
};
</script>
