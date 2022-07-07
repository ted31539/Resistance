<template>
  <NavBar />
  <div class="h-1 w-100" />
  <div id="navSwitchRef">
    <router-view />
  </div>
  <Footer />
  <CartBtn />
</template>

<script>
import NavBar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import CartBtn from '../../components/CartBtn.vue';

export default {
  props: ['page'],
  name: 'Index',
  components: {
    NavBar,
    Footer,
    CartBtn,
  },
  methods: {
    navAndCartBtnSwitch() {
      const nav = document.querySelector('nav');
      const navIcons = document.querySelectorAll('.navbar i');
      const navSwitchRef = document.querySelector('#navSwitchRef');
      const cartBtn = document.querySelector('.cart-btn-bg');

      const options = {
        rootMargin: '0px 0px -100% 0px',
        threshold: 0,
      };

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            nav.classList.remove('bg-opacity-75');
            nav.classList.remove('bg-black');
            nav.classList.remove('navbar-dark');
            navIcons.forEach((icon) => {
              icon.classList.remove('text-white');
            });

            if (this.page === 'Home') {
              cartBtn.classList.add('opacity-0');
            } else {
              cartBtn.classList.remove('opacity-0');
            }

            return;
          }

          nav.classList.add('bg-opacity-75');
          nav.classList.add('bg-black');
          nav.classList.add('navbar-dark');
          navIcons.forEach((icon) => {
            icon.classList.add('text-white');
          });

          cartBtn.classList.remove('opacity-0');
        });
      };

      const observer = new IntersectionObserver(callback, options);

      observer.observe(navSwitchRef);
    },
  },
  updated() {
    this.navAndCartBtnSwitch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.navAndCartBtnSwitch();
  },
};
</script>
