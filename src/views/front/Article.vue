<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <section class="article-banner vh-30 position-relative">
  </section>
  <section class="container pt-5">
    <h2 class="fs-2"><span class="fs-5 text-black-50 decoration-slash-light">Title</span><br>{{ article.title }}</h2>
    <p class="fs-6 badge text-wrap bg-light text-black-50">{{ toNormalTime(article.create_at) }}</p>
    <hr class="mb-11">
    <div v-html="article.content" class="mb-11"></div>
  </section>
</template>

<script>
export default {
  inject: ['emitter', 'toNormalTime'],
  name: 'Article',
  data() {
    return {
      article: {},
      isLoading: false,
    };
  },
  methods: {
    getArticle(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getArticle(id);
  },
};
</script>
