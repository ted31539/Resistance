<template>
  <div @click.stop="" class="position-fixed top-10 end-0 p-4 z-index-2999">
    <div class="toast-container">
      <div v-for=" (content, index) in messages" :key="index" class="toast show" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="toast-header py-4">
          <svg class="rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <rect width="100%" height="100%" :fill="content.state ? '#0d6efd' : '#dc3545'"></rect>
          </svg>
          <strong class="me-auto">{{ content.content }}</strong>
          <button @click="clearToast(index)" type="button" class="btn-close" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {

  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 4500);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      this.messages.push(message);
      this.toastShow();
    });
  },
  beforeunmount() {
    this.emitter.off('push-message', (message) => {
      this.messages.push(message);
      this.toastShow();
    });
  },
};
</script>
