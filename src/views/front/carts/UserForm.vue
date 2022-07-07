<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <section class="container w-100 w-lg-75 pb-11">
    <div class="row">
      <div class="col-12 col-lg-6 pb-11">
        <div class="shadow-sm">
          <h3 class="title">顧客資訊</h3>
          <Form @submit="createOrder" v-slot="{ errors }" ref="form" class="bg-light p-4">
            <div class="form-floating mb-4">
              <Field v-model="form.user.name" :class="{ 'is-invalid': errors['name'] }" rules="required" name="name"
                type="text" class="form-control" id="name" placeholder="name:"></Field>
              <label for="name">姓名:</label>
              <ErrorMessage name="name" class="invalid-feedback" />
            </div>
            <div class="form-floating mb-4">
              <Field v-model="form.user.email" rules="email|required" :class="{ 'is-invalid': errors['email'] }"
                name="email" type="email" class="form-control" id="email" placeholder="name@example.com"></Field>
              <label for="email">電子信箱:</label>
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="form-floating mb-4">
              <Field v-model="form.user.tel" :class="{ 'is-invalid': errors['tel'] }" rules="required|min:8|max:10"
                name="tel" type="tel" class="form-control" id="tel" placeholder="0912345678"></Field>
              <label for="tel">連絡電話：</label>
              <ErrorMessage name="tel" class="invalid-feedback" />
            </div>
            <div class="form-floating mb-4">
              <Field v-model="form.user.address" rules="required" :class="{ 'is-invalid': errors['address'] }"
                name="address" type="text" class="form-control" id="address" placeholder="address"></Field>
              <ErrorMessage name="address" class="invalid-feedback" />
              <label for="address">地址：</label>
            </div>
            <div class="mb-4">
              <label for="formGroupMesage" class="form-label  ms-3">想跟我們說的：</label>
              <input v-model="form.message" type="text" class="form-control" id="formGroupMesage">
            </div>
            <div class="form-check mb-3">
              <Field v-model="checked" :class="{ 'is-invalid': errors['agreement'] }" value="true" rules="required"
                name="agreement" class="form-check-input" type="checkbox" id="groupCheck"></Field>
              <label class="form-check-labe" for="groupCheck">
                我已閱讀並同意網站條款
              </label>
              <ErrorMessage name="agreement" class="invalid-feedback" />
            </div>
            <button type="submit" class="btn btn-primary w-100">送出訂單</button>
          </Form>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="shadow-sm">
          <h3 class="title">購物須知</h3>
          <div class="bg-light p-4">
            <div class="mb-4">
              <p class="fw-bold">商品購買須知</p>
              <p>商品情境照為示意用，因拍攝關係可能略有色差異，實際以廠商出貨為主，並以規格內容物為主。</p>
            </div>
            <div class="mb-4">
              <p class="fw-bold">商品購買須知</p>
              <p>根據《消費者保護法》，於本站購物皆享有商品到貨「七日猶豫期」（含例假日）的權益。若收到的商品有任何問題，可於猶豫期內申請退貨。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['emitter', 'putMessageState'],
  name: 'UserForm',
  data() {
    return {
      carts: [],
      checked: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '請留下想說的話',
      },
      isLoading: false,
    };
  },
  methods: {
    getCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
            if (!this.carts?.length) {
              this.emitter.emit('push-message', {
                content: '購物車無商品，請購物，若訂單已送出請詢問客服',
                state: false,
              });
              this.$router.push('/products');
            }
          } else {
            this.putMessageState(res, '取得購物車列表');
          }
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    createOrder() {
      const data = {
        data: this.form,
      };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, data)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('updateCart');
            this.$refs.form.resetForm();
            this.putMessageState(res, '建立訂單');
            this.isLoading = false;
            this.$router.push(`/carts/order/${res.data.orderId}`);
          } else {
            this.putMessageState(res, '建立訂單');
            this.isLoading = false;
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
  },
  mounted() {
    this.getCarts();
  },
};
</script>
