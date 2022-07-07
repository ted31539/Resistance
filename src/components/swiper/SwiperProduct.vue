<template>
  <div class="gallery-container">
    <Swiper v-show="windowWidth >= 768" class="swiper-container"
      :class="[viewHeight === 'modal' ? 'gallery-thumbs-modal' : 'gallery-thumbs-page']" :modules="modules"
      @swiper="setThumbsSwiper" :allowSlideNext="true" :slidesPerView="3" :direction="'vertical'" watch-slides-progress
      cssMode>
      <Swiper-slide v-for="image in productImages" :key="image">
        <img :src="image" alt="Slide 01">
      </Swiper-slide>
    </Swiper>
    <Swiper class="swiper-container mySwiper2"
      :class="[viewHeight === 'modal' ? 'gallery-main-modal' : 'gallery-main-page']" :modules="modules"
      :thumbs="{ swiper: thumbsSwiper }" @swiper="onSwiper" :grabCursor="true" :freeMode="true"
      preventInteractionOnTransition>
      <div
        class="swiper-button position-absolute position-absolute bottom-0 start-50 translate-middle z-index-999 w-100 d-flex justify-content-between">
        <button @click="slidePrev" type="button" class="swiper-button-prev-custom btn hvr-grow fs-2 text-white"><i
            class="bi bi-arrow-left-circle-fill"></i></button>
        <button @click="slideNext" type="button" class="swiper-button-next-custom btn hvr-grow fs-2 text-white"><i
            class="bi bi-arrow-right-circle-fill"></i></button>
      </div>
      <Swiper-slide v-for="image in productImages" :key="image">
        <img data-bs-toggle="tooltip" data-bs-placement="top" title="拖曳向右滑動" :src="image" alt="product">
      </Swiper-slide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { Thumbs, Navigation } from 'swiper/';
import { ref } from 'vue';

export default {
  name: 'SwiperNew',
  inject: ['getWindowWidth'],
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    productImages: {
      type: Array,
      default() {
        return [];
      },
    },
    viewHeight: {
      type: String,
      default() {
        return 'modal';
      },
    },
  },
  data() {
    return {
      swiper: null,
      windowWidth: this.getWindowWidth(),
    };
  },
  setup() {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    return {
      modules: [Thumbs, Navigation],
      thumbsSwiper,
      setThumbsSwiper,
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    slidePrev() {
      this.swiper.slidePrev();
    },
    slideNext() {
      this.swiper.slideNext();
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });
  },
  unmounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });
  },
};
</script>
