<template>
  <section class="container position-realtive d-flex flex-column align-items-center justify-content-center vh-100">
    <Loading :active="isLoading" :z-index="1060"></Loading>

    <div class="p-8 d-flex flex-column align-items-center shadow">
      <p class="h1 fs-3 fs-sm-1 opacity-10 text-black mb-8">R e s i s t a n c e</p>
      <div class="textSwitch d-flex justify-content-center w-100 mb-2" @click.stop="switchContent">
        <button :class="{ 'fw-bolder': action === '登入' }" type="button"
          class="btn btn-bg-light border-end rounded-0 fs-3 w-50 py-5">登入</button>
        <button :class="{ 'fw-bolder': action === '註冊' }" type="button"
          class="btn btn-bg-light border-start rounded-0 fs-3 w-50 py-5">註冊</button>
      </div>
      <Form class="d-flex flex-column mb-5" ref="accountForm" @submit="sign" v-slot="{ errors }">
        <div class="p-4">
          <label for="email" class="me-4"><i class="bi bi-person-fill"></i></label>
          <Field v-model="user.email" :class="{ 'is-invalid': errors['email'] }" rules="email|required" name="email"
            type="text" class="w-100 border-0 border-bottom" placeholder="請輸入信箱" id="email" />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="p-4">
          <label for="password" class="me-4"><i class="bi bi-key-fill"></i></label>
          <Field v-model="user.password" :class="{ 'is-invalid': errors['password'] }" rules="required|min:6"
            type="password" name="password" class="w-100 border-0 border-bottom" placeholder="請輸入密碼" id="password" />
          <ErrorMessage name="password" class="invalid-feedback" />
        </div>
        <div class="p-4 text-center d-flex">
          <button type="submit" class="btn btn-primary fs-4 w-100">確認
            <span v-if="action === '登入'" class="fw-bold">登入</span>
            <span v-if="action === '註冊'" class="fw-bold">註冊</span>
          </button>
        </div>
      </Form>
      <div class="align-self-end">
        <button @click.prevent.stop="openModal" class="btn text-secondary p-4">忘記密碼?</button>
      </div>
    </div>
    <AccountModal ref="accountModal" @update-passsword="updatePasssword" />
  </section>
</template>

<script>
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/methods/firebase';
import AccountModal from '@/components/modal/AccountModal.vue';

export default {
  name: 'FrontLogin',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      action: '登入',
      isLoading: false,
    };
  },
  components: {
    AccountModal,
  },
  inject: ['putMessageState', 'emitter'],
  methods: {
    sign() {
      if (this.action === '註冊') {
        createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
          .then(() => {
            auth.languageCode = 'zh-TW';
            auth.ActionCodeSettings = {
              url: `https://ted31539.github.io/clothes/#/login/?email=${auth.currentUser.email}`,
            };
            sendEmailVerification(auth.currentUser, auth.ActionCodeSettings).then(() => {
              this.$refs.accountForm.resetForm();
              this.emitter.emit('push-message', {
                content: '驗證信已發送到您的信箱，請點選信中驗證連結',
                state: true,
              });
            });
          })
          .catch((error) => {
            this.$refs.accountForm.resetForm();
            let message = '';
            switch (error.message) {
              case 'Firebase: Error (auth/email-already-in-use).':
                message = '帳號已註冊';
                break;
              default:
                message = '註冊失敗';
            }
            this.emitter.emit('push-message', {
              content: message,
              state: false,
            });
          });
      } else if (this.action === '登入') {
        signInWithEmailAndPassword(auth, this.user.email, this.user.password)
          .then(() => {
            this.$refs.accountForm.resetForm();
          })
          .catch((error) => {
            let message = '';
            switch (error.message) {
              case 'Firebase: Error (auth/user-not-found).':
                message = '帳號不存在';
                break;
              case 'Firebase: Error (auth/wrong-password).':
                message = '密碼錯誤';
                break;
              default:
                message = '';
            }
            this.emitter.emit('push-message', {
              content: `登入失敗，${message}`,
              state: false,
            });
          });
      }
    },
    switchContent(e) {
      const target = e.target.innerText;
      this.action = target;
    },
    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            this.emitter.emit('push-message', {
              content: '登入成功',
              state: true,
            });
            this.$router.push('/member');
          } else {
            this.emitter.emit('push-message', {
              content: '請至信箱驗證帳號',
              state: false,
            });
          }
        }
      });
    },
    openModal() {
      this.$refs.accountModal.openModal();
    },
    updatePasssword(user) {
      sendPasswordResetEmail(auth, user.email).then(() => {
        this.$refs.accountForm.resetForm();
        this.$router.replace('/login');
        this.emitter.emit('push-message', {
          content: '請至您的信箱，請點選信中驗連結定新密碼',
          state: true,
        });
      }).catch(() => {
        this.$refs.accountForm.resetForm();
        this.emitter.emit('push-message', {
          content: '發生錯誤，請重新整理頁面',
          state: false,
        });
      });
    },
  },
  created() {
    this.getAuthState();
  },
};
</script>
