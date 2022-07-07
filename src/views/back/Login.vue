<template>
  <section class="container position-realtive d-flex flex-column justify-content-center vh-100">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="p-8 d-flex flex-column align-items-center">
      <div>
        <p class="h1 opacity-10 text-black mb-11">R e s i s t a n c e</p>
        <h3 class="pb-4">後台登入</h3>
        <form class="d-flex flex-column" @submit.prevent="login">
          <div class="p-4">
            <label for="username" class="me-4"><i class="bi bi-person-fill"></i></label>
            <input v-model="user.username" type="text" class="w-100 border-0 border-bottom" placeholder="請輸入帳號"
              id="username">
          </div>
          <div class="p-4">
            <label for="password" class="me-4"><i class="bi bi-key-fill"></i></label>
            <input v-model="user.password" type="password" class="w-100 border-0 border-bottom" placeholder="請輸入密碼"
              id="password">
          </div>
          <div class="p-4 text-center d-flex flex-column">
            <button type="submit" class="btn btn-primary fs-4 w-100 mb-5">確認登入</button>
            <router-link to="/" class="btn btn-secondary fs-4 w-100">回到前台</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      user: {
        username: 'ted31539@gmail.com',
        password: 'ted31539',
      },
      isLoading: false,
    };
  },
  inject: ['putMessageState'],
  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.isLoading = true;
      this.$http
        .post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            this.isLoading = false;
            this.$router.push('/admin/orders');
          } else {
            this.isLoading = false;
            this.putMessageState(res, '登入');
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.putMessageState(err, '登入');
        });
    },
  },
};
</script>
