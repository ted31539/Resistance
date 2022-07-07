<template>
  <section class="banner vh-30 position-relative">
  </section>
  <section class="container pt-11">
    <ul class="d-flex justify-content-around flex-wrap  w-100 w-md-75 w-lg-50 mx-auto mb-10">
      <li class="d-flex flex-column align-items-center">
        <div :class="{ 'progress-active': page === 'Cart' }" class="progress">1</div>
        <p>購物車</p>
      </li>
      <li class="d-flex flex-column align-items-center">
        <div :class="{ 'progress-active': page === 'UserForm' }" class="progress">2</div>
        <p>填寫資料</p>
      </li>
      <li class="d-flex flex-column align-items-center">
        <div :class="{ 'progress-active': page === 'Order' }" class="progress">3</div>
        <p>確認訂單</p>
      </li>
      <li class="d-flex flex-column align-items-center">
        <div :class="{ 'progress-active': page === 'Payment' }" class="progress">4</div>
        <p>完成購物</p>
      </li>
    </ul>
    {{ page }}
  </section>
  <router-view />
</template>

<script>
export default {
  inject: ['emitter'],
  name: 'Carts',
  computed: {
    page() {
      return this.$route.name;
    },
  },
};
</script>
