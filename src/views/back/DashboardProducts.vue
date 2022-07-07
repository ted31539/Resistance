<template>
  <section class="d-flex flex-column w-100 bg-light">
    <div class="bg-info">
      <div class="container">
        <h3 class="fs-3 py-3 text-white text-shadow">產品</h3>
      </div>
    </div>
    <div class="container bg-light">
      <div class="d-flex flex-column">
        <div class="d-flex py-3">
          <h3 class="fs-4">產品列表</h3>
          <button @click="openModal(true)" class="btn btn-secondary ms-auto">新增產品</button>
        </div>
        <table class="mb-6">
          <thead>
            <tr class="border border-top-0 border-start-0 border-end-0 border-3">
              <th width="100" class="py-4">
              </th>
              <th width="100">
                產品名稱
              </th>
              <th width="100">
                分類
              </th>
              <th width="60">
                原價
              </th>
              <th width="60">
                售價
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
            <tr v-for="product in products" :key="product.id" class="border-bottom">
              <td>
                <img :src="product.imageUrl" alt="" class="pe-3 vh-10 vw-20">
              </td>
              <td>
                {{ product.title }}
              </td>
              <td>
                {{ product.category }}
              </td>
              <td>
                {{ currency(product.origin_price) }}
              </td>
              <td>
                {{ currency(product.price) }}
              </td>
              <td>
                <div>
                  <label>
                    <input disabled :checked="product.is_enabled" type="checkbox" class="checkbox" name="" id="">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                  </label>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <button @click="openModal(false, product)" type="button" class="btn btn-primary">編輯</button>
                  <button @click="openDeleteModal(product)" type="button" class="btn btn-danger">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination @update-page="getProducts" :pagination="pagination" class="mx-auto"></Pagination>
      </div>
    </div>
    <ProductModal ref="modal" :product="tempProduct" :productIsNew="productIsNew" @emit-updateProduct="updateProduct">
    </ProductModal>
    <DeleteModal ref="deletModal" :item="tempProduct" @emit-delete="deleteProduct"></DeleteModal>
    <Loading :active="isLoading" :z-index="1060"></Loading>
  </section>

</template>

<script>
import ProductModal from '@/components/modal/ProductModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'DashBoardProducts',
  components: {
    ProductModal,
    Pagination,
    DeleteModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      productIsNew: '',
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
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
    openModal(isNew, tempProduct) {
      this.productIsNew = isNew;
      if (this.productIsNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...tempProduct };
      }
      this.$refs.modal.openModal();
    },
    openDeleteModal(product) {
      this.tempProduct = { ...product };
      this.$refs.deletModal.openModal();
    },
    deleteProduct(item) {
      this.tempProduct = { ...item };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempProduct.title}`);
          } else {
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, `刪除${this.tempProduct.title}`);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.deletModal.closeModal();
          this.putMessageState(err, `刪除${this.tempProduct.title}`);
        });
    },
    updateProduct(tempProduct) {
      this.tempProduct = tempProduct;
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      let message = '建立產品';
      if (!this.productIsNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        message = '更新產品';
      }
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.isLoading = false;
            this.$refs.modal.closeModal();
            this.putMessageState(res, message);
          } else {
            this.isLoading = false;
            this.$refs.modal.closeModal();
            this.putMessageState(res, message);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$refs.modal.closeModal();
          this.emitter.emit('push-message', {
            content: '更新產品錯誤',
            state: false,
          });
        });
    },
  },
  inject: ['putMessageState', 'emitter', 'currency'],
  mounted() {
    this.getProducts();
  },
};
</script>
