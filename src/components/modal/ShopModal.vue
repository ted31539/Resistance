<template>
  <div ref="modal" class="modal fade z-index-1999 overflow-hidden position-fixed" id="productModal" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <Loading :active="isLoading" :z-index="1060"></Loading>
            <div class="row">
              <div class="col-12 col-lg-7 mb-2">
                <Swiper :productImages="product.imagesUrl" :viewHeight="'modal'" />
              </div>
              <div class="col-12 col-lg-5">
                <h3 class="mb-1">{{ product.title }}</h3>
                <p class="mb-2">特價：NT${{ currency(product.price) }}<span
                    class="text-decoration-line-through text-secondary ms-6">售價：NT${{ currency(product.origin_price)
                    }}</span> </p>
                <p class="mb-4 fw-bold fs-5">全站滿3000免運</p>
                <p class="text-black-50 mb-4">{{ product.description }}</p>
                <label for="size">尺寸</label>
                <select class="form-select text-center mb-1" aria-label="Default select example" v-model="size"
                  id="size">
                  <option selected value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <label for="qty">數量</label>
                <div class="input-group mb-3">
                  <button @click="minusQty" class="btn btn-outline-secondary" type="button">-</button>
                  <input v-model.number="qty" disabled="disabled" type="number"
                    class="form-control text-center bg-white" id="qty">
                  <button @click="addQty" class="btn btn-outline-secondary" type="button">+</button>
                </div>
                <div class="d-flex mb-3">
                  <button @click="addCart(product.id, qty, false)" type="button"
                    class="btn btn-secondary flex-fill me-4">
                    <i class="bi bi-basket position-relative" ref="outerShopIcon">
                      <img :src="product.imageUrl"
                        class="add-animation rounded-circle position-fixed text-danger opacity-0 z-index-2999"
                        ref="innerShopIcon">
                    </i>
                    加入購物車</button>
                  <button @click="addCart(product.id, qty, true)" type="button" class="btn btn-primary flex-fill"><i
                      class="bi bi-bag-fill me-1"></i>即刻購買</button>
                </div>
                <button @click="swithFavorite(product)" :class="{ active: favoriteIdAry.includes(product.id) }"
                  type="button" class="btn btn-love w-100"><i class="bi bi-heart-fill me-1"></i>
                  <p v-if="!favoriteIdAry.includes(product.id)" class="d-inline text-shadow">加入我的最愛</p>
                  <p v-else class="d-inline text-shadow text-secondary">已加入我的最愛</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import modalMixin from '@/misxins/modalMixins';
import Swiper from '@/components/swiper/SwiperProduct.vue';

export default {
  inject: ['currency', 'emitter', 'toggleFavorite', 'getFavoriteIdAry', 'putMessageState', 'getWindowWidth', 'getWindowHeight'],
  mixins: [modalMixin],
  components: {
    Swiper,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['emit-updateProduct'],
  data() {
    return {
      favoriteIdAry: this.getFavoriteIdAry(),
      isLoading: false,
      carts: [],
      size: 'S',
      qty: 1,
      sizeObj: {},
    };
  },
  methods: {
    addCart(id, qty, goToCart) {
      this.isLoading = true;

      function captureState(elements) {
        const state = [];
        gsap.utils.toArray(elements).forEach((element) => state.push(element, element.style.cssText));
        return state;
      }

      function revertState(state) {
        for (let i = 0; i < state.length; i += 2) {
          state[i].style.cssText = state[i + 1];
        }
      }

      if (!goToCart) {
        const target = this.$refs.innerShopIcon;
        const cartBtn = document.querySelector('#cartBtn');
        const startX = this.$refs.outerShopIcon.getBoundingClientRect().left - this.$refs.innerShopIcon.getBoundingClientRect().left;
        const startY = this.$refs.outerShopIcon.getBoundingClientRect().top - this.$refs.innerShopIcon.getBoundingClientRect().top;
        const endX = cartBtn.getBoundingClientRect().left - this.$refs.innerShopIcon.getBoundingClientRect().left;
        const endY = cartBtn.getBoundingClientRect().top - this.$refs.innerShopIcon.getBoundingClientRect().top;

        target.classList.remove('opacity-0');

        const state = captureState(target);

        const animation = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'none',
            yoyo: true,
            repeat: 0,
            onComplete: () => revertState(state),
          },
        });

        animation
          .to(target, {
            duration: 0, x: startX, y: startY, scale: 1, opacity: 1,
          })
          .to(target, {
            duration: 0.6, x: endX, y: endY, scale: 2.5, opacity: 1,
          })
          .to(target, {
            duration: 0, x: startX, y: startY, scale: 1, opacity: 0,
          })
          .to(cartBtn, {
            duration: 0.1, scale: 1.5,
          })
          .to(cartBtn, {
            duration: 0.1, scale: 1,
          })
          .to(cartBtn, {
            duration: 0.1, scale: 1.5,
          })
          .to(cartBtn, {
            duration: 0.1, scale: 1,
          });

        animation.play(0);

        setTimeout(() => {
          target.classList.add('opacity-0');
        }, 500);
      }

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      if (this.sizeObj[this.size]) {
        this.sizeObj[this.size] += this.qty;
      } else {
        this.sizeObj[this.size] = this.qty;
      }

      const product = { product_id: id, qty, sizeObj: this.sizeObj };

      this.$http
        .post(url, { data: product })
        .then((res) => {
          const message = '加入購物車';
          if (res.data.success) {
            this.emitter.emit('updateCart');
            this.isLoading = false;
            this.putMessageState(res, message);
          } else {
            this.isLoading = false;
            this.putMessageState(res, message);
          }
          if (goToCart) {
            this.closeModal();
            setTimeout(() => {
              this.$router.push('/carts/cart');
            }, 1000);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    getCarts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
          } else {
            this.putMessageState(res, '取得購物車列表');
          }
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
    swithFavorite(product) {
      this.toggleFavorite(product);
      this.favoriteIdAry = this.getFavoriteIdAry();
    },
    addQty() {
      this.qty += 1;
    },
    minusQty() {
      if (this.qty > 1) {
        this.qty -= 1;
      }
    },
  },
  watch: {
    carts() {
      const [cartProduct] = this.carts.filter((cart) => cart.product_id === this.product.id);
      this.sizeObj = { ...cartProduct?.sizeObj } || {};
    },
  },
  mounted() {
    this.getCarts();
    this.emitter.on('updateCart', this.getCarts);
  },
  beforeUnmount() {
    this.emitter.off('updateCart', this.getCarts);
  },
};
</script>
