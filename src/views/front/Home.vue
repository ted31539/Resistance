<template>
  <Loading :active="isLoading" :z-index="1060" />
  <div>
    <SwiperBanner />
  </div>
  <section class="pt-15 mt-15">
    <div class="d-flex flex-column pb-15 mb-15">
      <div class="container">
        <div class="row mt-auto mb-11 pb-4 px-0">
          <div class="col-12 col-lg-6 order-2 order-lg-1">
            <div class="about-us-team"></div>
          </div>
          <div class="col-12 col-lg-6 order-1 order-lg-2 mb-11 mb-lg-0">
            <h2 class="fs-2 mb-8"><span class="fs-5 text-black-50 decoration-slash">About us</span><br>關 於 我 們</h2>
            <p class="fs-5 align-self-center mb-8">
              我們分別是服裝設計師、裁縫師、行銷、成衣業前員工組成的團隊，結合世界各地的經驗，利用台灣先進的紡織科技，致力創造防風雨、耐磨、台灣設計、製造的機能流行服飾</p>
            <router-link to="/about" class="btn btn-lg btn-start-line-dark">了解更多...</router-link>
          </div>
        </div>
        <div class="row mb-11 overflow-hidden ">
          <div class="col-12 col-lg-4 me-lg-auto
      d-flex flex-column justify-content-center justify-content-lg-start
      justify-content-lg-center align-items-center align-items-lg-start ">
            <p class="fs-6 text-black-50 fw-bold">Material</p>
            <h3 class="fs-3 flex-shrink-1 text-black-50 mb-5">頂級布料</h3>
            <p class="text-black-50 mb-4">
              僅佔世界棉花產量中不到1%的高級土耳其棉，僅有特定季節才得以收成，不起毛球、不易皺，親膚柔軟又強韌耐磨。</p>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center">
            <div class="about-us-material"></div>
          </div>
        </div>
        <div class="row mb-auto">
          <div class="col-12 col-lg-4 order-lg-1 offset-lg-2 text-center text-lg-end me-lg-auto d-flex
      flex-column align-items-center align-items-lg-end justify-content-center
      justify-content-lg-end justify-content-lg-center">
            <p class="fs-6 text-black-50 fw-bold">Technique</p>
            <h3 class="d-inline-flex text-black-50 mb-5">精工技藝</h3>
            <p class="text-black-50 mb-4 mb-lg-0">
              透過耗時 2 年研發的十字型織法，成就耐久度超高的頂規布料，不僅耐洗，不易變形、鬆脫，更保有驚人的透氣度，顛覆您對服飾的想像。</p>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center">
            <div class="about-us-technique"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative bg-primary py-20 mb-15">
      <div class="container position-relative pb-15">
        <h2 class="fs-2 text-white mb-8"><span class="fs-5 text-secondary decoration-slash-light">Latest</span><br>最 新 商
          品</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-6 pt-15">
          <div v-for="product in latestProducts" :key="product.id" class="col d-flex justify-content-center mb-11">
            <Card :product="product" :dark-mode="true"></Card>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex flex-column py-15 mb-15">
      <h2 class="fs-2 mb-8 text-end"> <span class="fs-5 text-black-50 decoration-slash-left">Classification</span><br>商
        品 分 類</h2>
      <div class="row g-5 row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets/image/tshirt-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay bg-transparent d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: 'T恤' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">T恤</span></router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets\image\shirt-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay bg-transparent d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: '襯衫' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">襯衫</span></router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets\image\coat-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay bg-transparent d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: '外套' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">外套</span></router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets\image\pants-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay bg-transparent d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: '長褲' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">長褲</span></router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets\image\shorts-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay bg-transparent d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: '短褲' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">短褲</span></router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="classification card border-0">
            <img src="~@/assets\image\bag-item.jpg" class="vh-40" alt="classification">
            <div class="card-img-overlay d-flex
          justify-content-center align-items-center z-index-3">
              <router-link class="stretched-link" :to="{ name: 'Products', query: { category: '配件' } }"><span
                  class="position-absolute bottom-0 end-0 p-8 fs-4 fw-bold text-shadow">配件</span></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Articles />
  </section>
</template>

<script>
import SwiperBanner from '@/components/swiper/SwiperBanner.vue';
import Card from '@/components/Card.vue';
import Articles from '@/components/Articles.vue';

export default {
  name: 'Home',
  data() {
    return {
      products: [],
      latestProducts: [],
      isLoading: false,
    };
  },
  components: {
    Card,
    SwiperBanner,
    Articles,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.getLatestProducts();
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    getLatestProducts() {
      const february = new Date('2022-01-31').getTime() / 1000;
      this.latestProducts = this.products.filter((product) => product.create_at > Math.floor(february));
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
