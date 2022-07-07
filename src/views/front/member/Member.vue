<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <section class="member-banner vh-30 position-relative">
  </section>
  <section class="container py-10">
    <div class="row g-0 align-items-center mb-10">
      <div class="col-6">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link :to="`/`" class="text-primary">首頁</router-link>
          </li>
          <li class="breadcrumb-item active">會員專區</li>
        </ol>
      </div>
      <div class="col-6 d-flex flex-column">
        <button @click="signOut" type="button" class="btn btn-primary align-self-end">登出</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2 text-center mb-8">
        <h2 class="fs-2 mb-11"><span class="fs-5 text-black-50">Navbar</span><br>導覽列</h2>
        <MemberSidebar @change-category="changeCategory" />
      </div>
      <div class="col-lg-10 text-center">
        <div>
          <h2 class="fs-2 mb-11"><span class="fs-5 text-black-50  ">
              <span v-if="category === '帳號'">Acount</span>
              <span v-else-if="category === '訂單'">Orders</span>
              <span v-else-if="category === '我的最愛'">Favorites</span>
            </span><br>{{ category }}</h2>
          <div v-if="category === '帳號'" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-6">
            <div class="w-100 d-flex flex-column">
              <h3 class="title">顧客資訊</h3>
              <div class="row row-cols-2 shadow-sm bg-light g-0 p-4">
                <div class="col-4 border-bottom mb-4 text-start">電子郵件：</div>
                <div class="col-7 text-break border-bottom mb-4">{{ this.user.email }}</div>
                <div class="col-4 border-bottom mb-4 text-start">姓名：</div>
                <div class="col-7 text-break border-bottom mb-4">{{ this.user.displayName }}</div>
                <div class="col-4 border-bottom mb-4 text-start">信箱認證：</div>
                <div class="col-7 text-break border-bottom mb-4">
                  <p v-if="this.user.emailVerified" class="text-success">認證</p>
                  <div v-else class="text-danger">未認證
                    <button @click.stop="sendEmailVerification" type="button" class="btn btn-primary ">驗證去</button>
                  </div>
                </div>
              </div>
              <div class="align-self-end py-4">
                <button @click="openModal" type="button" class="btn btn-primary ">修改帳號資料</button>
              </div>
            </div>
          </div>
          <div v-else-if="category === '訂單'" class="row lg-3 g-6">
            <div v-for="(order, index) in orderFilter" :key="order.id" class="shadow-sm">
              <h3 :class="{ 'text-danger': !order.is_paid }" class="title">訂單資訊</h3>
              <div class="bg-light p-4">
                <div class="row row-cols-2">
                  <div class="col-4 border-bottom mb-4">下單日期：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ toNormalTime(order.create_at) }}</div>
                  <div class="col-4 border-bottom mb-4">訂單編號：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ order.id }}</div>
                  <div class="col-4 border-bottom mb-4">顧客姓名：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ order.user?.name }}</div>
                  <div class="col-4 border-bottom mb-4">聯絡電話：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ order.user?.tel }}</div>
                  <div class="col-4 border-bottom mb-4">電子郵件：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ order.user?.email }}</div>
                  <div class="col-4 border-bottom mb-4">地址：</div>
                  <div class="col-7 text-break border-bottom mb-4">{{ order.user?.address }}</div>
                  <div class="col-4 border-bottom mb-4">付款狀態：</div>
                  <div class="col-7 text-break border-bottom mb-4">
                    <p v-if="order.is_paid" class="text-success">已付款</p>
                    <p v-else class="text-danger">未付款</p>
                  </div>
                  <div class="col-4 border-bottom mb-4">訂單金額：</div>
                  <div class="col-7 text-break border-bottom mb-4">NT$ {{ currency(order.total) }}
                    <button type="button" class="btn"><i @click.stop="switchDropdown($event, index)"
                        class="bi bi-arrow-down-circle-fill"></i></button>
                  </div>
                  <div class="col-12 mb-4">
                    <OrderDropdown :index="index" :ref="`orderDropdown-${index}`" :order="order" />
                  </div>
                </div>
                <button v-if="!order.is_paid" @click.stop="pay(order.id)" type="button"
                  class="btn btn-primary w-100">確認付款</button>
              </div>
            </div>
            <div v-if="!orderFilter.length" class="h3 text-secondary">無訂單</div>
          </div>
          <div v-else-if="category === '我的最愛'" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-6">
            <div v-for="product in favoriteProductAry" :key="product.id" class="col mb-11">
              <Card :product="product"></Card>
            </div>
            <div v-if="!favoriteProductAry.length" class="h3 text-secondary w-100">無產品</div>
          </div>
        </div>
      </div>
    </div>
    <MemberModal ref="memberModal" :user="tempUser" @update-user="updateUser" />
  </section>
</template>

<script>
import {
  onAuthStateChanged, updateProfile, sendEmailVerification, signOut,
} from 'firebase/auth';
import { auth } from '@/methods/firebase';
import Card from '@/components/Card.vue';
import MemberSidebar from '@/components/sidebar/MemberSidebar.vue';
import MemberModal from '@/components/modal/MemberModal.vue';
import OrderDropdown from '@/components/dropdown/OrderDropdown.vue';

export default {
  inject: ['putMessageState', 'emitter', 'getFavoriteIdAry', 'toNormalTime', 'currency'],
  name: 'Member',
  data() {
    return {
      products: [],
      favoriteIdAry: this.getFavoriteIdAry(),
      favoriteProductAry: [],
      orders: [],
      category: '帳號',
      isLoading: false,
      user: {
        email: '',
        displayName: '',
      },
      tempUser: {},
      pagination: [],
    };
  },
  components: {
    MemberSidebar,
    MemberModal,
    Card,
    OrderDropdown,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getfavoriteProductAry();
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: err,
            state: false,
          });
        });
    },
    async getAllOrders() {
      this.isLoading = true;
      const orderPromisesAry = [];
      try {
        const pagination = await this.getOrdersPage();
        for (let i = 1; i <= pagination.total_pages; i += 1) {
          const page = i;
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
          orderPromisesAry.push(this.getSinglePageOrders(url));
        }
        Promise.all(orderPromisesAry).then((res) => {
          res.forEach((orders) => {
            this.orders = this.orders.concat(orders);
          });
          this.isLoading = false;
        });
      } catch (err) {
        this.isLoading = false;
        this.emitter.emit('push-message', {
          content: '發生錯誤，請重新整理頁面',
          state: false,
        });
      }
      return true;
    },
    getOrdersPage(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      return this.$http
        .get(url)
        .then((res) => res.data.pagination)
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    getSinglePageOrders(url) {
      return this.$http
        .get(url)
        .then((res) => res.data.orders)
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    getfavoriteProductAry() {
      this.favoriteProductAry = this.products.filter((item) => this.favoriteIdAry.includes(item.id));
      this.isLoading = false;
    },
    changeCategory(category) {
      this.category = category;
    },
    openModal() {
      this.tempUser = { ...this.user };
      this.$refs.memberModal.openModal();
    },
    updateUser(tempUser) {
      updateProfile(auth.currentUser, {
        displayName: tempUser.displayName,
      })
        .then(() => {
          this.getAuthState();
          this.emitter.emit('push-message', {
            content: '帳號資料已更新',
            state: true,
          });
        })
        .catch(() => {
          this.getAuthState();
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    sendEmailVerification() {
      this.isLoading = true;
      sendEmailVerification(auth.currentUser).then(() => {
        this.isLoading = false;
        this.emitter.emit('push-message', {
          content: '驗證信已發送到您的信箱，請點選信中驗證連結',
          state: true,
        });
      });
    },
    getAuthState() {
      this.isLoading = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isLoading = false;
          this.user.email = user.email;
          this.user.displayName = user.displayName;
          this.user.emailVerified = user.emailVerified;
        } else {
          this.$router.push('/login');
        }
      });
    },
    switchDropdown(e, index) {
      e.target.classList.toggle('dropdown-show');
      this.$refs[`orderDropdown-${index}`][0].toggleCollapse();
    },
    pay(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.putMessageState(res, '付款');
            this.isLoading = false;
            this.$router.push(`/carts/payment/${id}`);
          } else {
            this.putMessageState(res, '付款');
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
    signOut() {
      this.isLoading = true;
      signOut(auth)
        .then(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '帳號已經登出',
            state: true,
          });
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
  },
  computed: {
    orderFilter() {
      return this.orders.filter((order) => this.user.email === order.user.email);
    },
  },
  created() {
    this.getAuthState();
    this.getProducts();
    // this.getOrders();
    this.getAllOrders();
  },
  mounted() {
    this.emitter.on('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
      this.getfavoriteProductAry();
    });
  },
  beforeUnmount() {
    this.emitter.off('getFavoriteIdAry', () => {
      this.favoriteIdAry = this.getFavoriteIdAry();
      this.getfavoriteProductAry();
    });
  },
};
</script>
