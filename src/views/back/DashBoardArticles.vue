<template>
  <section class="d-flex flex-column w-100 vh-100 bg-light">
    <div class="bg-info">
      <div class="container">
        <h3 class="fs-3 py-3 text-white text-shadow">文章</h3>
      </div>
    </div>
    <div class="container bg-light">
      <div class="d-flex flex-column">
        <div class="d-flex py-3">
          <h3 class="fs-4">文章列表</h3>
          <button @click="openModal(true)" class="btn btn-secondary ms-auto">新增文章</button>
        </div>
        <table class="mb-6">
          <thead>
            <tr class="border border-top-0 border-start-0 border-end-0 border-3">
              <th width="100">
                文章名稱
              </th>
              <th width="60">
                作者
              </th>
              <th width="60">
                分類
              </th>
              <th width="100">
                創立時間
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
            <tr v-for="article in articles" :key="article.id" class="border-bottom">
              <td>
                {{ article.title }}
              </td>
              <td>
                {{ article.author }}
              </td>
              <td>
                <ul>
                  <li v-for="tag in article.tag" :key="tag" class="list-unstyled">
                    <div class="btn btn-success disabled">{{ tag }}</div>
                  </li>
                </ul>
              </td>
              <td>
                {{ this.toNormalTime(article.create_at) }}
              </td>
              <td>
                <div>
                  <label>
                    <input disabled :checked="article.isPublic" type="checkbox" class="checkbox" :true-value="1"
                      :false-value="0">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                  </label>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <button @click="getArticle(article.id)" type="button" class="btn btn-primary">編輯</button>
                  <button @click="openDeleteModal(article)" type="button" class="btn btn-danger">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination @update-page="getAticles" :pagination="pagination" class="mx-auto"></Pagination>
      </div>
    </div>
    <ArticleModal ref="modal" :article="tempArticle" :articleIsNew="articleIsNew" @emit-update-article="updateAticle">
    </ArticleModal>
    <DeleteModal ref="deletModal" :item="tempArticle" @emit-delete="deleteArticle"></DeleteModal>
    <Loading :active="isLoading" :z-index="1060"></Loading>
  </section>s

</template>

<script>
import ArticleModal from '@/components/modal/ArticleModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'DashBoardArticles',
  components: {
    ArticleModal,
    Pagination,
    DeleteModal,
  },
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      articleIsNew: '',
      isLoading: false,
    };
  },
  methods: {
    getAticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    openModal(isNew, tempArticle) {
      this.articleIsNew = isNew;
      if (this.articleIsNew) {
        this.tempArticle = {};
      } else {
        this.tempArticle = { ...tempArticle };
      }
      this.$refs.modal.openModal();
    },
    getArticle(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.openModal(false, res.data.article);
          } else {
            this.putMessageState(res, '取得單一文章');
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.putMessageState(err, '取得單一文章');
        });
    },
    openDeleteModal(article) {
      this.tempArticle = { ...article };
      this.$refs.deletModal.openModal();
    },
    deleteArticle(item) {
      this.tempArticle = { ...item };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getAticles();
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempArticle.title}`);
          } else {
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempArticle.title}`);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.deletModal.closeModal();
          this.putMessageState(err, `刪除${this.tempArticle.title}`);
        });
    },
    updateAticle(tempArticle) {
      this.tempArticle = tempArticle;
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      let message = '建立文章';
      if (!this.articleIsNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        message = '更新文章';
      }
      this.$http[httpMethod](url, { data: this.tempArticle })
        .then((res) => {
          if (res.data.success) {
            this.getAticles();
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
  },
  inject: ['putMessageState', 'emitter', 'toNormalTime', 'toTimestamp'],
  mounted() {
    this.getAticles();
  },
};
</script>
