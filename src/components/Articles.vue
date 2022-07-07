<template>
  <div class="position-relative py-15">
    <div class="position-absolute top-0 bg-black h-100 w-100"></div>
    <div class="container position-relative">
      <h2 class="fs-2 text-white mb-8"><span class="fs-5 text-secondary decoration-slash-light">News</span><br>最 新 消 息
      </h2>
      <div class="p-4">
        <ul class="list-unstyled">
          <li v-for="article in articles" :key=article.id
            class="news-link position-relative d-flex text-white border-top border-bottom p-4 border-secondary">
            <p class="me-8">{{ toNormalTime(article.toNormalTime) }}</p>
            <router-link class="stretched-link" :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Pagination @update-page="getArticles" :pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Articles',
  inject: ['putMessageState', 'emitter', 'toNormalTime', 'toTimestamp'],
  components: {
    Pagination,
  },
  data() {
    return {
      articles: [],
      pagination: [],
    };
  },
  methods: {
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
