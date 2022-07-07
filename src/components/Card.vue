<template>
  <div @click="toProductPage" class="card border-0 hvr-float cursor-pointer" :id="product.id">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="vh-30">
      <p :class="[darkMode ? 'bg-light' : 'bg-primary', { 'text-white': !darkMode }]" class="card-classification position-absolute top-0 start-10 translate-middle
         bg-opacity-75 px-2 py-3 text-center text-vertical-lr text-upright">{{ product.category }}</p>
      <img :src="product.imageUrl" class="card-img-top h-100">
      <button @click.stop="swithFavorite(product, $event)" :class="{ active: favoriteIdAry.includes(product.id) }"
        type="button" class="btn btn-love scale-up position-absolute top-0 end-0 z-index-2999">
        <i class="bi bi-heart-fill text-light fs-3 outer"></i>
      </button>
      <button type="button" class="btn btn-love active scale-up position-fixed top-0 end-0 z-index-1999">
        <i class="bi bi-heart-fill text-light fs-3"></i>
      </button>
    </div>
    <div :class="{ 'bg-primary': darkMode, 'text-white': darkMode }" class="card-body text-center position-relative">
      <h4 class="card-title mb-4">{{ product.title }}</h4>
      <div class="d-flex flex-column mb-4">
        <p :class="[darkMode ? 'text-info' : 'text-secondary']" class="card-text text-decoration-line-through">
          售價：${{ currency(product.origin_price) }}元</p>
        <p class="card-text fw-bold">特價：${{ currency(product.price) }}元</p>
      </div>
      <button @click.stop="openModal(product)" :class="[darkMode ? 'btn-start-line' : 'btn-start-line-dark']" type="button"
        class="btn-lg">加入購物車<i class="bi bi-bag-plus-fill ms-2"></i>
      </button>
    </div>
  </div>
  <ShopModal :product="product" ref="modal" class="z-index-2999" />
</template>

<script>
import { gsap } from 'gsap';
import ShopModal from '@/components/modal/ShopModal.vue';

export default {
  inject: ['currency', 'emitter', 'toggleFavorite', 'getFavoriteIdAry', 'putMessageState'],
  data() {
    return {
      favoriteIdAry: this.getFavoriteIdAry(),
      isLoading: false,
    };
  },
  components: {
    ShopModal,
  },
  props: {
    darkMode: {
      type: Boolean,
      default() {
        return false;
      },
    },
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toProductPage(e) {
      const { target } = e;
      const btn = document.querySelector('.btn-lg.btn-start-line');
      const btnDark = document.querySelector('.btn-lg.btn-start-line-dark');
      if (target !== btn || target !== btnDark) {
        this.$router.push(`/product/${this.product.id}`);
      }
    },
    swithFavorite(product, e) {
      let targetBtn;

      if (e.target.tagName === 'BUTTON') {
        targetBtn = e.target.nextSibling;
      } else {
        targetBtn = e.target.parentNode.nextElementSibling;
      }

      if (!this.favoriteIdAry.includes(product.id)) {
        let navFavoriteBtn = document.querySelector('#navFavoriteBtn');
        if (!navFavoriteBtn) {
          navFavoriteBtn = document.querySelector('#navFavoriteSmBtn');
        }
        const endX = navFavoriteBtn.getBoundingClientRect().left - targetBtn.getBoundingClientRect().left - 2;
        const endY = navFavoriteBtn.getBoundingClientRect().top - targetBtn.getBoundingClientRect().top;

        const animation = gsap.timeline({ defaults: { ease: 'none' } });
        animation.to(targetBtn, {
          duration: 0.45, x: endX, y: endY, opacity: 1, scale: 1,
        });
        animation.to(targetBtn, {
          duration: 0.3, x: endX, y: endY, opacity: 0,
        }, 0.45);
        animation.to(navFavoriteBtn, {
          duration: 0.1, scale: 1.5,
        });
        animation.to(navFavoriteBtn, {
          duration: 0.1, scale: 1,
        });
        animation.to(navFavoriteBtn, {
          duration: 0.1, scale: 1.5,
        });
        animation.to(navFavoriteBtn, {
          duration: 0.1, scale: 1,
        });
        animation.to(targetBtn, {
          duration: 0.1, x: 0, y: 0, opacity: 0,
        });

        setTimeout(() => {
          this.toggleFavorite(product);
          this.favoriteIdAry = this.getFavoriteIdAry();
        }, 700);
      } else {
        const animation = gsap.timeline({ defaults: { ease: 'none' } });
        animation.to(targetBtn, {
          duration: 0.45, x: 0, y: -100, opacity: 1, scale: 2,
        });
        animation.to(targetBtn, {
          duration: 0.3, x: 0, y: -100, opacity: 0,
        }, 0.38);
        animation.to(targetBtn, {
          duration: 0.1, x: 0, y: 0, opacity: 0, scale: 1,
        });

        this.toggleFavorite(product);
        this.favoriteIdAry = this.getFavoriteIdAry();
      }
    },
    openModal(tempProduct) {
      this.tempProduct = { ...tempProduct };
      this.$refs.modal.openModal();
    },
  },
  mounted() {
    this.emitter.on('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });
  },
  unmounted() {
    this.emitter.off('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });
  },
};
</script>
