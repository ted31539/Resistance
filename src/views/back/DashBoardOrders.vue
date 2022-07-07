<template>
  <section class="d-flex flex-column w-100 bg-light vh-100">
    <div class="bg-info">
      <div class="container">
        <h3 class="fs-3 py-3 text-white text-shadow">訂單</h3>
      </div>
    </div>
    <div class="container bg-light">
      <div class="d-flex flex-column">
        <div class="d-flex py-3">
          <h3 class="fs-4">訂單列表</h3>
        </div>
        <table class="mb-6">
          <thead>
            <tr class="border border-top-0 border-start-0 border-end-0 border-3">
              <th width="80">
                購買時間
              </th>
              <th width="100">
                Email
              </th>
              <th width="100">
                購買款項
              </th>
              <th width="60">
                應付金額
              </th>
              <th width="60">
                是否付款
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-bottom">
              <td>
                {{ toNormalTime(order.create_at) }}
              </td>
              <td>
                {{ order.user.email }}
              </td>
              <td>
                <ul>
                  <li v-for="item in order.products" :key="item.id">
                    {{ `${item.product.title}: ` }} {{ item.qty }} {{ item.product.unit }}
                  </li>
                </ul>
              </td>
              <td>
                {{ currency(order.total) }}
              </td>
              <td>
                <div>
                  <label>
                    <input disabled :checked="order.is_paid" type="checkbox" class="checkbox" name="" id="">
                    <span class="check-btn-box">
                      <span class="check-btn"></span>
                    </span>
                  </label>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <button @click="openModal(order)" type="button" class="btn btn-primary">檢視</button>
                  <button @click="openDeleteModal(order)" type="button" class="btn btn-danger">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination @update-page="getOrders" :pagination="pagination" class="mx-auto"></Pagination>
      </div>
    </div>
    <OrderModal ref="OrderModal" :order="tempOrder" @emit-update-order="updateOrder"></OrderModal>
    <DeleteModal ref="deletModal" :item="tempOrder" @emit-delete="deleteOrder"></DeleteModal>
    <Loading :active="isLoading" :z-index="1060"></Loading>
  </section>
</template>

<script>
import OrderModal from '@/components/modal/OrderModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'DashBoardOrders',
  components: {
    OrderModal,
    Pagination,
    DeleteModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    openModal(tempOrder) {
      this.tempOrder = { ...tempOrder };
      this.$refs.OrderModal.openModal();
    },
    updateOrder(tempOrder) {
      this.tempOrder = tempOrder;
      this.isLoading = true;

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      const httpMethod = 'put';
      const message = '更新訂單';

      this.$http[httpMethod](url, { data: this.tempOrder })
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.isLoading = false;
            this.$refs.OrderModal.closeModal();
            this.putMessageState(res, message);
          } else {
            this.isLoading = false;
            this.$refs.OrderModal.closeModal();
            this.putMessageState(res, message);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$refs.OrderModal.closeModal();
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
    openDeleteModal(order) {
      this.tempOrder = { ...order };
      this.$refs.deletModal.openModal();
    },
    deleteOrder(item) {
      this.tempOrder = { ...item };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, '刪除訂單');
          } else {
            this.isLoading = false;
            this.$refs.deletModal.closeModal();
            this.putMessageState(res, '刪除訂單');
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$refs.deletModal.closeModal();
          this.emitter.emit('push-message', {
            content: '發生錯誤，請重新整理頁面',
            state: false,
          });
        });
    },
  },
  inject: ['putMessageState', 'toNormalTime', 'currency'],
  mounted() {
    this.getOrders();
  },
};
</script>
