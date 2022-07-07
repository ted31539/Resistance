<template>
  <div ref="modal" class="modal fade" id="articleModal" tabindex="-1" aria-labelledby="articleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="articleModalLabel">
            <span v-if="articleIsNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="row mb-3">
                  <div class="col-6">
                    <div>
                      <label for="title" class="form-label fw-bold">文章標題</label>
                      <input v-model="tempArticle.title" type="text" class="form-control" id="title" placeholder="輸入標題">
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <label for="title" class="form-label fw-bold">作者</label>
                      <input v-model="tempArticle.author" type="text" class="form-control" id="title"
                        placeholder="輸入作者">
                    </div>
                  </div>
                </div>
                <div class="row mb-6">
                  <div class="col-6">
                    <div>
                      <label for="due_date" class="form-label fw-bold">文章建立日期</label>
                      <input v-model="create_at" type="date" class="form-control" id="due_date" placeholder="輸入文章建立日期">
                    </div>
                  </div>
                  <div class="col-6 d-flex align-items-end">
                    <div class="w-100">
                      <label for="tag" class="form-label fw-bold">標籤</label>
                      <div class="d-flex">
                        <input v-model="tag" type="text" class="form-control w-50 me-3" id="tag" placeholder="輸入標籤">
                        <button id="tag-btn" @click="addTag" :class="switchTag()"
                          class="btn btn-primary w-30">新增標籤</button>
                      </div>
                      <ul class="d-flex flex-wrap">
                        <li v-for="(tag, index) in tempArticle.tag" :key="tag" class="d-flex">
                          <div class="btn btn-success inactive">{{ tag }}</div>
                          <button @click="tempArticle.tag.splice(index, 1)" class="btn btn-danger">刪除</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="row mb-6">
                  <div class="col-12 d-flex">
                    <div>
                      <label for="isEnable" class="d-flex align-items-center">
                        <input v-model="tempArticle.isPublic" :true-value="true" :false-value="false" type="checkbox"
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
            <div class="row">
              <div class="col-12">
                <Ckeditor :editor="editor" v-model="tempArticle.content" :config="editorConfig" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click="updateArticle" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '@/methods/uploadImage';
import modalMixin from '@/misxins/modalMixins';

export default {
  mixins: [modalMixin],
  inject: ['toNormalTime', 'toTimestamp'],
  components: {
    Ckeditor: CKEditor.component,
  },
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    articleIsNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emit-update-article'],
  data() {
    return {
      tempArticle: {},
      tag: '',
      create_at: '',
      editor: ClassicEditor,
      editorConfig: { extraPlugins: [this.uploader] },
    };
  },
  watch: {
    article() {
      this.tempArticle = { ...this.article };
      if (this.articleIsNew) {
        this.create_at = this.toNormalTime();
        this.tempArticle.create_at = new Date(this.create_at).getTime() / 1000;
        this.tempArticle.tag = [];
        this.tempArticle.isPublic = false;
      } else {
        this.create_at = this.toNormalTime(this.tempArticle.create_at);
      }
    },
    create_at() {
      this.tempArticle.create_at = new Date(this.create_at).getTime() / 1000;
    },
  },
  methods: {
    updateArticle() {
      this.$emit('emit-update-article', this.tempArticle);
    },
    switchTag() {
      return {
        disabled: !this.tag?.length,
      };
    },
    addTag() {
      this.tempArticle.tag.push(this.tag);
      this.tag = '';
    },
    uploader(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader); /* eslint no-param-reassign: ["error", { "props": false }] */
    },
  },
};
</script>
