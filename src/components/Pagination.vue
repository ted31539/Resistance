<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li :class="{ 'disabled': !pagination.has_pre }" class="page-item">
        <a @click.prevent="updatePage(pagination.current_page - 1)" class="page-link text-primary" href="#"
          aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pagination.total_pages" :key="page" :class="{ 'active': pagination.current_page === page }"
        class="page-item"><a @click.prevent="updatePage(page)" class="page-link text-primary" href="#">{{ page }}</a>
      </li>
      <li :class="{ 'disabled': !pagination.has_next }" class="page-item">
        <a @click.prevent="updatePage(pagination.current_page + 1)" class="page-link text-primary" href="#"
          aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['update-page'],
  methods: {
    updatePage(page) {
      if (page === this.pagination.current_page) {
        return;
      }
      this.$emit('update-page', page);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/helpers/components/_pagination.scss';
</style>
