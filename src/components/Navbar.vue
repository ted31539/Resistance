<template>
  <nav class="navbar navbar-expand-md navbar-light flex-wrap fixed-top px-0 z-index-999 w-100">
    <div class="container-fluid">
      <div class="d-flex justify-content-between w-100">
        <h1 class="m-0 h1 lh-1 me-3 me-lg-4">
          <router-link class="navbar-brand m-0 p-0 align-middle" aria-current="page" href="#" to="/">Resistance
          </router-link>
        </h1>
        <div class="offcanvas offcanvas-end justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav text-center">
            <li class="nav-item position-relative align-self-center">
              <router-link class="nav-link px-3 px-lg-4" aria-current="page" href="#"
                :to="{ name: 'Products', query: { category: '所有商品' } }">所有商品</router-link>
            </li>
            <li class="nav-item position-relative align-self-center">
              <router-link class="nav-link px-3 px-lg-4" aria-current="page" href="#" to="/about">品牌故事</router-link>
            </li>
            <li class="nav-item pe-0 position-relative align-self-center">
              <router-link class="nav-link px-3 px-lg-4" aria-current="page" href="#" to="/questions">常見問題</router-link>
            </li>
            <li class="nav-item pe-0 position-relative align-self-center">
              <router-link class="nav-link px-3 px-lg-4" aria-current="page" href="#" to="/login">會員登入</router-link>
            </li>
            <li class="nav-item pe-0 position-relative align-self-center">
              <router-link class="nav-link px-3 px-lg-4" aria-current="page" href="#" to="/adminLogin">登入後台
              </router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex" role="group" aria-label="Basic example">
          <template v-if="windowWidth >= 333">
            <button @click.stop="switchDropdown('favorite')" :class="{ active: favoriteIdAry.length }"
              id="navFavoriteBtn" class="btn btn-love scale-up px-sm-3 px-1" data-bs-toggle="tooltip" title="最愛商品"
              type="button">
              <i class="bi bi-heart-fill fs-4 me-1 position-relative">
                <span v-if="favoriteIdAry.length"
                  class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger fs-6">
                  {{ favoriteIdAry.length }}</span>
              </i>
            </button>
            <button @click.stop="switchDropdown('carts')" class="btn scale-up px-sm-3 px-1" type="button">
              <i class="bi bi-cart-fill fs-4 position-relative">
                <span v-if="carts.length"
                  class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger fs-6">{{
                      carts.length
                  }}</span></i>
            </button>
            <router-link @click.stop="" to="/login"
              class="btn scale-up px-sm-3 px-1 d-flex flex-column align-items-center align-self-center border-0"> <i
                class="bi bi-person-fill fs-4"></i></router-link>
          </template>
          <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#navbaroffcanva" aria-controls="navbaroffcanva" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div v-if="windowWidth < 333" class="d-flex justify-content-between w-100">
        <button @click.stop="switchDropdown('favorite')" :class="{ active: favoriteIdAry.length }"
          ref="navFavoriteSmBtn" id="navFavoriteSmBtn" class="btn btn-love scale-up px-sm-3 px-1"
          data-bs-toggle="tooltip" title="最愛商品" type="button">
          <i class="bi bi-heart-fill fs-4 me-1 position-relative">
            <span v-if="favoriteIdAry.length"
              class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger fs-6">
              {{ favoriteIdAry.length }}</span>
          </i>
        </button>
        <button @click.stop="switchDropdown('carts')" class="btn scale-up d-flex align-items-center px-sm-3 px-1"
          type="button">
          <i class="bi bi-cart-fill fs-4 position-relative">
            <span v-if="carts.length"
              class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger fs-6">{{
                  carts.length
              }}</span>
          </i>
        </button>
        <router-link @click.stop="" to="/login"
          class="btn scale-up px-sm-3 px-1 d-flex flex-column align-items-center align-self-center border-0"> <i
            class="bi bi-person-fill fs-4"></i></router-link>
      </div>
    </div>
  </nav>
  <transition name="dropdown">
    <ul v-if="dropdownIsOpen" @click.stop="" ref="dropdown" class="nav-dropdown" :class="{ show: dropdownIsOpen }"
      aria-labelledby="dropdownMyfavorite">
      <template v-if="dropdownTarget === 'favorite'">
        <MyfavoriteDropdownContent @switch-dropdown="switchDropdown" />
      </template>
      <template v-if="dropdownTarget === 'carts'">
        <CartsDropdownContent @switch-dropdown="switchDropdown" />
      </template>
    </ul>
  </transition>
  <!-- offcanvas -->
  <div ref="offcanva" class="offcanvas offcanvas-end bg-black w-100" id="navbaroffcanva">
    <ul class="navbar-nav text-center">
      <div class="offcanvas-header px-8">
        <h5 class="offcanvas-title h1" id="offcanvasNavbarLabel">Resistance</h5>
        <button type="button" class="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close"><i
            class="bi bi-x-lg"></i></button>
      </div>
      <li class="nav-item position-relative align-self-center mb-8">
        <router-link @click="$router.push('/'), closeOffcanvas()" data-bs-dismiss="offcanvas" class="nav-link fs-2 px-4"
          aria-current="page" href="#" to="">首頁</router-link>
      </li>
      <li class="nav-item position-relative align-self-center mb-8">
        <router-link @click="$router.push({ name: 'Products', query: { category: '所有商品' } }), closeOffcanvas()"
          data-bs-dismiss="offcanvas" class="nav-link fs-2 px-4" aria-current="page" to="" href="#">所有商品</router-link>
      </li>
      <li class="nav-item position-relative align-self-center mb-8">
        <router-link @click="$router.push('/about'), closeOffcanvas()" data-bs-dismiss="offcanvas"
          class="nav-link fs-2 px-4" aria-current="page" href="#" to="">品牌故事</router-link>
      </li>
      <li class="nav-item pe-0 position-relative align-self-center mb-8">
        <router-link @click="$router.push('/questions'), closeOffcanvas()" data-bs-dismiss="offcanvas"
          class="nav-link fs-2 px-4" aria-current="page" href="#" to="">常見問題</router-link>
      </li>
      <li class="nav-item pe-0 position-relative align-self-center mb-8">
        <router-link @click="closeOffcanvas(), $router.push('/login')" data-bs-dismiss="offcanvas"
          class="nav-link fs-2 px-4" aria-current="page" href="#" to="">會員登入</router-link>
      </li>
      <li class="nav-item pe-0 position-relative align-self-center">
        <router-link @click="closeOffcanvas(), $router.push('/adminLogin')" data-bs-dismiss="offcanvas"
          class="nav-link fs-2 px-4" aria-current="page" href="#" to="">登入後台</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import 'bootstrap/js/dist/dropdown';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import MyfavoriteDropdownContent from './dropdown/MyfavoriteDropdownContent.vue';
import CartsDropdownContent from './dropdown/CartsDropdownContent.vue';

export default {
  inject: ['emitter', 'getFavoriteIdAry', 'getWindowWidth'],
  components: {
    MyfavoriteDropdownContent,
    CartsDropdownContent,
  },
  data() {
    return {
      navOffcanvas: '',
      dropdownIsOpen: false,
      dropdownTarget: '',
      favoriteIdAry: this.getFavoriteIdAry() || [],
      windowWidth: this.getWindowWidth(),
      carts: [],
    };
  },
  methods: {
    closeOffcanvas() {
      this.navOffcanvas.hide();
    },
    switchDropdown(target) {
      this.dropdownIsOpen = !this.dropdownIsOpen;
      this.dropdownTarget = target;
    },
    getCarts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
          }
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
  },
  mounted() {
    this.navOffcanvas = new Offcanvas(this.$refs.offcanva, {
      backdrop: false,
    });

    this.getCarts();

    window.addEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });

    this.emitter.on('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });

    this.emitter.on('updateCart', () => {
      this.getCarts();
    });

    document.addEventListener('click', () => {
      if (!this.dropdownIsOpen) {
        return;
      }
      this.switchDropdown('');
    });

    this.emitter.on('switchDropdown', (openDropdownState) => {
      this.switchDropdown(openDropdownState.target);
    });
  },
  beforeUnmount() {
    this.emitter.off('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
    });

    this.emitter.off('updateCart', () => {
      this.getCarts();
    });

    this.emitter.off('openDropdown', (openDropdownState) => {
      this.switchDropdown(openDropdownState.target);
    });
  },
  unmounted() {
    document.removeEventListener('click', () => {
      if (this.$refs.dropdown) {
        this.switchDropdown(false, '');
      }
    });

    window.removeEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/helpers/components/_nav.scss';
</style>
