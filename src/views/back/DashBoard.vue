<template>
  <div class="container-fluid d-flex p-0 bg-primary">
    <div class="h-100">
      <ul class="nav d-flex flex-column" id="nav">
        <li class="nav-item logo position-relative py-6 ps-6 mb-4">
          <button @click="resizeNav"
            class="toggle-nav-btn btn btn-secondary rounded-circle position-absolute top-50 start-100 translate-middle"><i
              class="bi bi-chevron-right fs-6"></i></button>
          <h2 class="m-0 h1 fs-4 lh-1 text-secondary">
            R<span>esistance</span>
          </h2>
        </li>
        <li class="nav-item mb-4">
          <router-link @click="$router.push('/')" to="/admin/orders"
            class="btn btn-primary border-0 rounded-0 w-100 text-start ps-6 d-flex flex-nowrap"
            data-bs-toggle="collapse" href="#orderCollapse" role="button" aria-expanded="false"
            aria-controls="Ordercollapse">
            <i class="bi bi-laptop me-3"></i><span class="text-nowrap ">前台</span>
          </router-link>
        </li>
        <li class="nav-item mb-4">
          <router-link @click="$router.push('/admin/orders')" to="/admin/orders"
            class="btn btn-primary border-0 rounded-0 w-100 text-start ps-6 d-flex flex-nowrap"
            data-bs-toggle="collapse" href="#orderCollapse" role="button" aria-expanded="false"
            aria-controls="Ordercollapse">
            <i class="bi bi-cash-coin me-3"></i><span class="text-nowrap ">訂單</span>
          </router-link>
        </li>
        <li class="nav-item mb-4">
          <router-link @click="$router.push('/admin/products')" to="/admin/products"
            class="btn btn-primary border-0 rounded-0 w-100 text-start ps-6 d-flex flex-nowrap"
            data-bs-toggle="collapse" href="#productCollapse" role="button" aria-expanded="false"
            aria-controls="#productCollapse">
            <i class="bi bi-gift-fill me-3"></i><span class="text-nowrap ">產品</span>
          </router-link>
        </li>
        <li class="nav-item mb-4">
          <router-link @click="this.$router.push('/admin/coupons')" to=""
            class="btn btn-primary border-0 rounded-0 w-100 text-start ps-6 d-flex flex-nowrap"
            data-bs-toggle="collapse" href="#Ordercollapse" role="button" aria-expanded="false"
            aria-controls="Ordercollapse">
            <i class="bi bi-card-heading me-3"></i><span class="text-nowrap ">優惠券</span>
          </router-link>
        </li>
        <li class="nav-item mb-4">
          <router-link @click="this.$router.push('/admin/articles')" to="/admin/articles"
            class="btn btn-primary border-0 rounded-0 w-100 text-start ps-6 d-flex flex-nowrap"
            data-bs-toggle="collapse" href="#articlecollapse" role="button" aria-expanded="false"
            aria-controls="articlecollapse">
            <i class="bi bi-journal-richtext me-3"></i><span class="text-nowrap ">文章</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  inject: ['putMessageState'],
  methods: {
    resizeNav() {
      const arrow = document.querySelector('.bi-chevron-right');
      arrow.classList.toggle('rotate-reverse');
      const nav = document.querySelector('#nav');
      nav.classList.toggle('hiden-nav');
    },
    checkLoginStatus() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;

      const url = `${process.env.VUE_APP_API}api/user/check`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.putMessageState(res, '登入');
          } else {
            this.putMessageState(res, '登入');
            this.$router.push('/adminLogin');
          }
        })
        .catch(() => {
          this.$router.push('/adminLogin');
        });
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/helpers/views/_dashBoard.scss';
</style>
