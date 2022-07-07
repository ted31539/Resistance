<template>
  <section class="container pt-11">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="row pt-10">
      <ol class="breadcrumb mb-10">
        <li class="breadcrumb-item">
          <router-link :to="`/`" class="text-primary">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Products', query: { category: '所有商品' } }" class="text-primary">產品</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Products', query: { category: product.category } }" class="text-primary">
            {{ product.category }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">{{ product.title }}</li>
      </ol>
      <div class="col-12 col-lg-7 mb-5">
        <Swiper :productImages="product.imagesUrl" :viewHeight="'page'"></Swiper>
      </div>
      <div class="col-12 col-lg-5">
        <h3 class="mb-1">{{ product.title }}</h3>
        <p class="mb-2">特價：NT${{ currency(product.price) }}<span
            class="text-decoration-line-through text-secondary ms-6">售價：NT${{ currency(product.origin_price) }}</span>
        </p>
        <p class="mb-8 fw-bold fs-5">全站滿3000免運</p>
        <p class="text-black-50 mb-8">{{ product.description }}</p>
        <label for="size">尺寸</label>
        <select class="form-select text-center mb-1" aria-label="Default select example" v-model="size" id="size">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <label for="qty">數量</label>
        <div class="input-group mb-3">
          <button @click="minusQty" class="btn btn-outline-secondary" type="button">-</button>
          <input v-model="qty" disabled="disabled" type="text" class="form-control text-center bg-white" id="qty">
          <button @click="addQty" class="btn btn-outline-secondary" type="button">+</button>
        </div>
        <div class="d-flex mb-3">
          <button @click="addCart(product.id, qty, false)" type="button" class="btn btn-secondary flex-fill me-4">
            <i class="bi bi-basket position-relative" ref="outerShopIcon">
              <img :src="product.imageUrl"
                class="add-animation rounded-circle position-fixed text-danger opacity-0 z-index-2999"
                ref="innerShopIcon">
            </i>
            加入購物車</button>
          <button @click="addCart(product.id, qty, true)" type="button" class="btn btn-primary flex-fill"><i
              class="bi bi-bag-fill me-1"></i>即刻購買</button>
        </div>
        <button @click="swithFavorite(product)" :class="{ active: favoriteIdAry.includes(product.id) }" type="button"
          class="btn btn-love w-100"><i class="bi bi-heart-fill me-1"></i>
          <p v-if="!favoriteIdAry.includes(product.id)" class="d-inline text-shadow">加入我的最愛</p>
          <p v-else class="d-inline text-shadow text-secondary">已加入我的最愛</p>
        </button>
      </div>
    </div>
    <hr class="mb-0">
  </section>
  <section class="container">
    <div class="textSwitch d-flex justify-content-between mb-10" @click.stop=switchContent>
      <button type="button" class="btn btn-bottom-line w-100 py-5">商品描述</button>
      <button type="button" class="btn btn-bottom-line w-100 py-5">商品尺寸</button>
      <button type="button" class="btn btn-bottom-line w-100 py-5">購買須知</button>
    </div>
    <div>
      <div v-if="productContent === 'content'" v-html="content"></div>
      <div v-else-if="productContent === 'size'">
        <table v-if="product.category === 'T恤' || product.category === '襯衫' || product.category === '外套'">
          <thead>
            <tr class="bg-secondary">
              <th width="60" class="border-0 border-3 text-center py-4">尺寸
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                肩寬
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                胸寬
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                衣長
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                S
              </th>
              <td class="border border-3 text-center py-4">
                45
              </td>
              <td class="border border-3 text-center py-4">
                50
              </td>
              <td class="border border-3 text-center py-4">
                72
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                M
              </th>
              <td class="border border-3 text-center py-4">
                48
              </td>
              <td class="border border-3 text-center py-4">
                55
              </td>
              <td class="border border-3 text-center py-4">
                74
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                L
              </th>
              <td class="border border-3 text-center py-4">
                52
              </td>
              <td class="border border-3 text-center py-4">
                58
              </td>
              <td class="border border-3 text-center py-4">
                76
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                XL
              </th>
              <td class="border border-3 text-center py-4">
                55
              </td>
              <td class="border border-3 text-center py-4">
                62
              </td>
              <td class="border border-3 text-center py-4">
                78
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" class="text-end py-4">單位: 公分( cm )</th>
            </tr>
          </tfoot>
        </table>
        <table v-else-if="product.category === '短褲' || product.category === '長褲'">
          <thead>
            <tr class="bg-secondary">
              <th width="60" class="border-0 border-3 text-center py-4">尺寸
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                腰寬
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                臀寬
              </th>
              <th width="60" class="border-0 border-3 text-center py-4">
                褲長
              </th>
              <th width="65" class="border-0 border-3 text-center py-4">
                大腿寬
              </th>
              <th width="65" class="border-0 border-3 text-center py-4">
                褲口寬
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                S
              </th>
              <td class="border border-3 text-center py-4">
                35.5
              </td>
              <td class="border border-3 text-center py-4">
                47.5
              </td>
              <td class="border border-3 text-center py-4">
                94
              </td>
              <td class="border border-3 text-center py-4">
                30.5
              </td>
              <td class="border border-3 text-center py-4">
                11
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                M
              </th>
              <td class="border border-3 text-center py-4">
                38
              </td>
              <td class="border border-3 text-center py-4">
                49.8
              </td>
              <td class="border border-3 text-center py-4">
                95
              </td>
              <td class="border border-3 text-center py-4">
                32.5
              </td>
              <td class="border border-3 text-center py-4">
                11
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                L
              </th>
              <td class="border border-3 text-center py-4">
                40.5
              </td>
              <td class="border border-3 text-center py-4">
                52.5
              </td>
              <td class="border border-3 text-center py-4">
                96.5
              </td>
              <td class="border border-3 text-center py-4">
                33.5
              </td>
              <td class="border border-3 text-center py-4">
                11.5
              </td>
            </tr>
            <tr>
              <th class="border border-3 text-center bg-light py-4">
                XL
              </th>
              <td class="border border-3 text-center py-4">
                43
              </td>
              <td class="border border-3 text-center py-4">
                54.9
              </td>
              <td class="border border-3 text-center py-4">
                98
              </td>
              <td class="border border-3 text-center py-4">
                35
              </td>
              <td class="border border-3 text-center py-4">
                12
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="6" class="text-end py-4">單位: 公分( cm )</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div v-else>
        <strong class="text-danger">無換貨服務，一律退貨，重新下單！</strong>
        <p>七天內享有鑑賞期。</p>
        <p>商品不得下水、拆毀吊牌、毀損。</p>
        <p>退貨後，請通知課服人員，告知訂單編號。</p>
        <p>無須負擔運費。</p>
      </div>
    </div>
  </section>
  <section class="container py-11">
    <h3 class="mb-11">你可能也喜歡...</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-0">
      <div v-for="product in similarProducts" :key="product.id" class="col d-flex justify-content-center">
        <Card :product="product"></Card>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import Card from '@/components/Card.vue';
import Swiper from '@/components/swiper/SwiperProduct.vue';

export default {
  inject: ['currency', 'emitter', 'toggleFavorite', 'getFavoriteIdAry', 'putMessageState'],
  name: 'Product',
  props: ['id'],
  data() {
    return {
      product: {},
      products: {},
      carts: [],
      content: '',
      size: 'S',
      qty: 1,
      productContent: 'content',
      similarProducts: [],
      favoriteIdAry: this.getFavoriteIdAry(),
      isLoading: false,
      sizeObj: {},
    };
  },
  components: {
    Swiper,
    Card,
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.getProducts();
          this.content = res.data.product.content;
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
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getSimilarProducts();
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
            duration: 0,
            x: startX,
            y: startY,
            scale: 1,
            opacity: 1,
          })
          .to(target, {
            duration: 0.6,
            x: endX,
            y: endY,
            scale: 2.5,
            opacity: 1,
          })
          .to(target, {
            duration: 0,
            x: startX,
            y: startY,
            scale: 1,
            opacity: 0,
          })
          .to(cartBtn, {
            duration: 0.1,
            scale: 1.5,
          })
          .to(cartBtn, {
            duration: 0.1,
            scale: 1,
          })
          .to(cartBtn, {
            duration: 0.1,
            scale: 1.5,
          })
          .to(cartBtn, {
            duration: 0.1,
            scale: 1,
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
            setTimeout(() => {
              this.$router.push('/carts/cart');
            }, 1000);
          }
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
          this.isLoading = false;
        });
    },
    addQty() {
      this.qty += 1;
    },
    minusQty() {
      if (this.qty > 1) {
        this.qty -= 1;
      }
    },
    switchContent(e) {
      const target = e.target.innerText;

      switch (target) {
        case '商品描述':
          this.productContent = 'content';
          break;
        case '商品尺寸':
          this.productContent = 'size';
          break;
        default:
          this.productContent = 'notice';
      }
    },
    swithFavorite(product) {
      this.toggleFavorite(product);
      this.favoriteIdAry = this.getFavoriteIdAry();
    },
    getSimilarProducts() {
      this.similarProducts = [];
      const { category, id } = this.product;
      const filterProducts = this.products.filter((product) => product.category === category && product.id !== id);

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const ary = new Set([]);

      for (let index = 0; ary.size < (filterProducts.length < 4 ? filterProducts.length : 4); index + 1) {
        const num = getRandomInt(filterProducts.length);
        ary.add(num);
      }

      ary.forEach((item) => {
        this.similarProducts.push(filterProducts[item]);
      });
    },
  },
  watch: {
    carts() {
      const [cartProduct] = this.carts.filter((cart) => cart.product_id === this.product.id);
      this.sizeObj = { ...cartProduct?.sizeObj } || {};
    },
    id() {
      this.getProduct(this.id);
    },
  },
  mounted() {
    this.getProduct(this.id);
    this.getCarts();
    this.emitter.on('updateCart', this.getCarts);
    this.emitter.on('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });
  },
  beforeUnmount() {
    this.emitter.off('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });
    this.emitter.off('updateCart', this.getCarts);
  },
};
</script>
