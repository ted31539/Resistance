<template>
  <section class="container-fluid overflow-hidden">
    <div class="row banner-height g-0">
      <div :class="{ 'w-100': windowWidth < 768 || windowHeight < 750 }"
        class="col-md-7 col-lg-8 col-xl-9  position-relative" ref="switchBigBanner">
        <div
          class="swiper-button position-absolute position-absolute top-50 start-50 translate-middle z-index-999 w-100 d-flex justify-content-between">
          <button @click="slidePrev" type="button" class="swiper-button-prev-custom btn hvr-grow fs-2 text-white"><i
              class="bi bi-arrow-left-circle-fill"></i></button>
          <button @click="slideNext" type="button" class="swiper-button-next-custom btn hvr-grow fs-2 text-white"><i
              class="bi bi-arrow-right-circle-fill"></i></button>
        </div>
        <swiper :speed="800" :autoplay="{ delay: 9000, }" effect="fade" :fadeEffect="{ crossFade: true }"
          :modules="modules" :slides-per-view="1" :space-between="0" @swiper="setFirstSwiper" class="w-100 h-100">
          <swiper-slide class="banner-primary">
            <router-link :to="{ name: 'Products', query: { category: '所有商品' } }" class="stretched-link"></router-link>
          </swiper-slide>
          <swiper-slide class="banner-second">
            <router-link :to="{ name: 'Products', query: { serious: 'AirMax' } }" class="stretched-link"></router-link>
          </swiper-slide>
          <swiper-slide class="banner-third">
            <router-link :to="{ name: 'Products', query: { serious: 'HardMax' } }" class="stretched-link"></router-link>
          </swiper-slide>
        </swiper>
        <div v-if="windowWidth < 768 || windowHeight < 750"
          class="banner-text-animation position-absolute bottom-5 start-50 translate-middle-x  text-white bg-transparent z-index-3 d-flex flex-column "
          v-html="renderBannerText" @click="toPage">
        </div>
      </div>
      <div v-if="windowWidth >= 768 && windowHeight >= 750"
        class="col-md-5 col-lg-4 col-xl-3 d-flex flex-column justify-content-between">
        <div class="row g-0 vh-40 opacity-80">
          <div class=" offset-1 col-11 d-flex flex-column justify-content-evenly">
            <h2 class="fs-3 fw-light">勇敢冒險</h2>
            <h2 class="fs-3 scale-y-4 lh-1" :class="{ 'scale-y-5': windowHeight > 1200, }">再大的風雨也無懼</h2>
          </div>
        </div>
        <div class="row g-0 vh-40 position-relative" id="ringLocation">
          <div class="col-12 w-100">
            <div class="swiperSecondBanner">
              <div v-if="windowWidth >= 768 && windowHeight >= 750" id="circle"
                class="rotate position-absolute top-n20 end-n20 z-index-999">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                  y="0px" width="20px" height="20px" viewport="200 200" viewBox="50 50 200 200" xml:space="preserve">
                  <defs>
                    <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
                  </defs>
                  <circle cx="0" cy="0" r="50" fill="none" />
                  <g>
                    <use xlink:href="#circlePath" fill="none" />
                    <text fill="#000">
                      <textPath xlink:href="#circlePath">L A T E S T ____ P R O D U C T S</textPath>
                    </text>
                  </g>
                </svg>
              </div>
              <swiper :autoplay="{ delay: 9000, }" :allow-touch-move="false" :speed="800" :modules="modules"
                :slides-per-view="1" :space-between="0" @swiper="setSecondSwiper" class="vh-40">
                <swiper-slide class="d-flex">
                  <img src="~@/assets/image/banner-home2.jpg" alt="">
                  <div class="bg-mask"></div>
                </swiper-slide>
                <swiper-slide class="d-flex">
                  <img src="~@/assets/image/banner-home3.jpg" alt="">
                  <div class="bg-mask"></div>
                </swiper-slide>
                <swiper-slide class="d-flex">
                  <img src="~@/assets/image/banner-home1.jpg" alt="">
                  <div class="bg-mask"></div>
                </swiper-slide>
              </swiper>
            </div>
            <div @click="toPage"
              class="banner-text-animation banner-text text-white bg-primary-transparent z-index-3 d-flex flex-column"
              v-html="renderBannerText">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-absolute bottom-0 end-0 p-2 z-index-5">
      <div class="scroll"></div>
      <div class="text-white px-4 py-2">
        滾輪下滑
      </div>
    </div>
  </section>
</template>

<script>
import 'swiper/swiper.scss';
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { Controller, EffectFade, Autoplay } from 'swiper';

export default {
  name: 'Home',
  data() {
    return {
      windowWidth: '1000',
      windowHeight: '1000',
      firstSwiper: null,
      secondSwiper: null,
      modules: [Controller, EffectFade, Autoplay],
      renderBannerText: '<h4 class="opacity-90 align-self-baseline mb-2"> <span class="fs-2">全</span>系列商品</h4><p class="opacity-90 align-self-baseline mb-2">無堅不摧的潮流</p><p class="opacity-90 align-self-baseline mb-5vh">永遠穿不壞的服飾品牌</p><button type="button" id="productsBtn" class="btn btn-lg btn-start-line align-self-baseline fs-3">即刻購物</button>',
      bannerText: [
        {
          content: '<h4 class="opacity-90 align-self-baseline mb-2"> <span class="fs-2">全</span>系列商品</h4><p class="opacity-90 align-self-baseline mb-2">無堅不摧的潮流</p><p class="opacity-90 align-self-baseline mb-5vh">永遠穿不壞的服飾品牌</p><button type="button" id="productsBtn" class="btn btn-lg btn-start-line align-self-baseline fs-3">即刻購物</button>',
        },
        {
          content: '<h4 class="opacity-90 align-self-baseline mb-2"> <span class="fs-2">呼</span>吸系列</h4><p class="opacity-90 align-self-baseline mb-2">AirMax透氣材質</p><p class="opacity-90 align-self-baseline mb-5vh">就是要你飛天遁地</p><button type="button" id="airMaxBtn" class="btn btn-lg btn-start-line align-self-baseline fs-3">即刻購物</button>',
        },
        {
          content: '<h4 class="opacity-90 align-self-baseline mb-2"> <span class="fs-2">盔</span>甲系列</h4><p class="opacity-90 align-self-baseline mb-2">HardMax材質</p><p class="opacity-90 align-self-baseline mb-5vh">不怕你燃</p><button type="button" id="hardMaxBtn" class="btn btn-lg btn-start-line align-self-baseline fs-3">即刻購物</button>',
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getWindowSize() {
      this.windowWidth = this.getWindowWidth();
      this.windowHeight = this.getWindowHeight();
    },
    setFirstSwiper(swiper) {
      this.firstSwiper = swiper;
    },
    setSecondSwiper(swiper) {
      this.secondSwiper = swiper;
    },
    slidePrev() {
      const totalIndex = this.firstSwiper.slides.length;
      if (!this.firstSwiper.realIndex) {
        this.firstSwiper.slideTo(totalIndex - 1);
        if (this.windowWidth >= 768 && this.windowHeight >= 750) {
          this.secondSwiper.slideTo(totalIndex - 1);
        }
        this.renderBannerText = this.bannerText[this.firstSwiper.realIndex].content;
        return;
      }
      this.firstSwiper.slidePrev();
      if (this.windowWidth >= 768 && this.windowHeight >= 750) {
        this.secondSwiper.slidePrev();
      }
    },
    slideNext() {
      const totalIndex = this.firstSwiper.slides.length;
      if (this.firstSwiper.realIndex === totalIndex - 1) {
        this.firstSwiper.slideTo(0);
        if (this.windowWidth >= 768 && this.windowHeight >= 750) {
          this.secondSwiper.slideTo(0);
        }
        this.renderBannerText = this.bannerText[this.firstSwiper.realIndex].content;
        return;
      }
      this.firstSwiper.slideNext();
      if (this.windowWidth >= 768 && this.windowHeight >= 750) {
        this.secondSwiper.slideNext();
      }
    },
    toPage(e) {
      const { target } = e;
      if (target.tagName === 'BUTTON') {
        switch (target.id) {
          default: {
            break;
          }
          case 'productsBtn':
            this.$router.push({ name: 'Products', query: { category: '所有商品' } });
            break;
          case 'airMaxBtn':
            this.$router.push({ name: 'Products', query: { serious: 'AirMax' } });
            break;
          case 'hardMaxBtn':
            this.$router.push({ name: 'Products', query: { serious: 'HardMax' } });
            break;
        }
      }
    },
  },
  inject: ['getWindowWidth', 'getWindowHeight'],
  mounted() {
    this.getWindowSize();
    window.addEventListener('resize', () => {
      this.getWindowSize();
      if (this.windowWidth >= 768 && this.windowHeight >= 750) {
        this.renderBannerText = this.bannerText[this.firstSwiper.realIndex]?.content;
      }
    });
    this.firstSwiper.on('slideChangeTransitionStart', () => {
      this.renderBannerText = this.bannerText[this.firstSwiper.realIndex]?.content;
    });
  },
  unmounted() {
    window.removeEventListener('resize', () => {
      this.getWindowSize();
      if (this.windowWidth >= 768 && this.windowHeight >= 750) {
        this.renderBannerText = this.bannerText[this.firstSwiper.realIndex]?.content;
      }
    });
    this.firstSwiper.off('slideChangeTransitionStart', () => {
      this.renderBannerText = this.bannerText[this.firstSwiper.realIndex]?.content;
    });
  },
};
</script>

<style lang="scss" scoped>
.banner-text-animation {

  &::v-deep p,
  &::v-deep h4,
  &::v-deep router-link {
    overflow: hidden;
    position: relative;
    animation: color 1s ease-out;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      background: white;
      animation: title 1s ease-out;
    }
  }
}
</style>
