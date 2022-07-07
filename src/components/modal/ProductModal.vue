<template>
  <div ref="modal" class="modal fade z-index-999" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="productModalLabel">
            <span v-if="productIsNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入主圖片網址</label>
                  <input @change="upLoadImage" v-model="tempProduct.imageUrl" type="text" class="form-control"
                    id="imageUrl" placeholder="輸入圖片網址">
                  <img :src="tempProduct.imageUrl">
                </div>
                <div v-if="!tempProduct.imagesUrl?.length" class="mb-3">
                  <button @click="tempProduct.imagesUrl.push('')" type="button"
                    class="btn btn-outline-success w-100">新增副圖片</button>
                </div>
                <template v-if="tempProduct.imagesUrl?.length">
                  <div v-for="(image, index) in tempProduct.imagesUrl" :key="image" class="mb-3">
                    <label :for="`imageUrl-${index}`" class="form-label">輸入副圖片網址</label>
                    <input v-model="tempProduct.imagesUrl[index]" type="text" class="form-control"
                      :id="`imageUrl-${index}`" placeholder="輸入圖片網址">
                    <img :src="tempProduct.imagesUrl[index]">
                    <button @click="tempProduct.imagesUrl.splice(index, 1)" type="button"
                      class="btn btn-outline-danger mt-3 w-100">移除圖片</button>
                    <button
                      v-if="tempProduct.imagesUrl[tempProduct.imagesUrl?.length - 1].length && (tempProduct.imagesUrl?.length - 1) == index"
                      @click="tempProduct.imagesUrl.push('')" type="button"
                      class="btn btn-outline-success w-100">新增副圖片</button>
                  </div>
                </template>
              </div>
              <div class="col-8">
                <div class="row mb-3">
                  <div class="col-12">
                    <div>
                      <label for="title" class="form-label">標題</label>
                      <input v-model="tempProduct.title" type="text" class="form-control" id="title" placeholder="輸入標題">
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <div>
                      <label for="due_date" class="form-label">建立日期</label>
                      <input v-model="create_at" type="date" class="form-control" id="due_date">
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <label for="serious" class="form-label">系列</label>
                      <input v-model="tempProduct.serious" type="text" class="form-control" id="serious">
                    </div>
                  </div>
                </div>
                <div class="row mb-6">
                  <div class="col-6">
                    <label for="category" class="form-label">分類</label>
                    <input v-model="tempProduct.category" type="text" class="form-control" id="category"
                      placeholder="輸入分類">
                  </div>
                  <div class="col-6">
                    <label for="unit" class="form-label">單位</label>
                    <input v-model="tempProduct.unit" type="text" class="form-control" id="unit" placeholder="輸入單位">
                  </div>
                </div>
                <div class="row mb-6">
                  <div class="col-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input v-model="tempProduct.origin_price" type="number" class="form-control" id="origin_price"
                      placeholder="輸入原價">
                  </div>
                  <div class="col-6">
                    <label for="price" class="form-label">售價</label>
                    <input v-model="tempProduct.price" type="number" class="form-control" id="price" placeholder="輸入售價">
                  </div>
                </div>
                <hr class="mb-6">
                <div class="row mb-6">
                  <div class="col-12">
                    <div>
                      <label for="description" class="form-label">產品簡單描述</label>
                      <input v-model="tempProduct.description" type="text" class="form-control" id="description"
                        placeholder="輸入產品描述">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mb-6">
                    <p class="mb-2">產品詳細說明</p>
                    <form action="" enctype="multipart/form-data" method="post" ref="imageForm">
                      <Ckeditor :editor="editor" v-model="tempProduct.content" :config="editorConfig" class="w-50"
                        id="content"></Ckeditor>
                    </form>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="isEnable" class="d-flex align-items-center">
                    <input v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" type="checkbox"
                      class="checkbox pt-8" name="" id="isEnable">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                    <span class="ms-4">是否啟用</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click="updateProduct" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import modalMixin from '@/misxins/modalMixins';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '@/methods/uploadImage';

export default {
  inject: ['toNormalTime', 'toTimestamp'],
  mixins: [modalMixin],
  components: {
    Ckeditor: CKEditor.component,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    productIsNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emit-updateProduct'],
  data() {
    return {
      tempProduct: {},
      create_at: '',
      editor: ClassicEditor,
      editorConfig: { extraPlugins: [this.uploader] },
    };
  },
  watch: {
    product() {
      this.tempProduct = { ...this.product };
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (this.couponIsNew) {
        this.create_at = this.toNormalTime();
        this.tempProduct.create_at = this.toTimestamp(this.create_at);
        this.tempProduct.is_enabled = 0;
        this.tempProduct.content = '';
      } else {
        this.create_at = this.toNormalTime(this.tempProduct.create_at);
      }
    },
    create_at() {
      this.tempProduct.create_at = this.toTimestamp(this.create_at);
    },
  },
  methods: {
    updateProduct() {
      this.$emit('emit-updateProduct', this.tempProduct);
    },
    uploader(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader); /* eslint no-param-reassign: ["error", { "props": false }] */
    },
  },
};
</script>
