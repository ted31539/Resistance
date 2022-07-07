<template>
  <div ref="modal" class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl modal-fullscreen-xl-down">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="orderModalLabel">
            訂單細節
          </h5>
          <button @click="initUserControl" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <h3 class="mb-3">用戶資料</h3>
                <table v-if="tempOrder.user" class="w-100">
                  <tbody>
                    <tr class="border-bottom">
                      <th style="width: 80px;">姓名</th>
                      <template v-if="userControl.name">
                        <td>{{ tempOrder.user.name }}</td>
                        <td><button @click="userControl.name = false" type="button"
                            class="btn-sm btn-primary">修改</button></td>
                      </template>
                      <template v-else>
                        <td><input class="form-control p-0" type="text" v-model="tempOrder.user.name"></td>
                        <td><button @click="userControl.name = true" type="button"
                            class="btn-sm btn-secondary">確定</button></td>
                      </template>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 80px;">Email</th>
                      <template v-if="userControl.email">
                        <td>{{ tempOrder.user.email }}</td>
                        <td><button @click="userControl.email = false" type="button"
                            class="btn-sm btn-primary">修改</button></td>
                      </template>
                      <template v-else>
                        <td><input class="form-control p-0" type="text" v-model="tempOrder.user.email"></td>
                        <td><button @click="userControl.email = true" type="button"
                            class="btn-sm btn-secondary">確定</button></td>
                      </template>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 80px;">電話</th>
                      <template v-if="userControl.tel">
                        <td>{{ tempOrder.user.tel }}</td>
                        <td><button @click="userControl.tel = false" type="button"
                            class="btn-sm btn-primary">修改</button></td>
                      </template>
                      <template v-else>
                        <td><input class="form-control p-0" type="text" v-model="tempOrder.user.tel"></td>
                        <td><button @click="userControl.tel = true" type="button"
                            class="btn-sm btn-secondary">確定</button></td>
                      </template>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 80px;">地址</th>
                      <template v-if="userControl.address">
                        <td>{{ tempOrder.user.address }}</td>
                        <td><button @click="userControl.address = false" type="button"
                            class="btn-sm btn-primary">修改</button></td>
                      </template>
                      <template v-else>
                        <td><input class="form-control p-0" type="text" v-model="tempOrder.user.address"></td>
                        <td><button @click="userControl.address = true" type="button"
                            class="btn-sm btn-secondary">確定</button></td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-6">
                <h3 class="mb-3">訂單細節</h3>
                <table class="mb-6">
                  <tbody>
                    <tr class="border-bottom">
                      <th style="width: 100px;">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 100px;">下單時間</th>
                      <td>{{ toNormalTime(tempOrder.create_at) }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 100px;">付款時間</th>
                      <td>{{ toNormalTime(tempOrder.paid_date) }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 100px;">付款狀態</th>
                      <td>
                        <span v-if="tempOrder.is_paid" class="text-success">已付款</span>
                        <span v-else class="text-danger">
                          未付款</span>
                      </td>
                    </tr>
                    <tr class="border-bottom">
                      <th style="width: 100px;">總金額</th>
                      <td>{{ currency(tempOrder.total) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="w-100">
                      <th class="w-100">
                        <button @click="tempOrder.is_paid = !tempOrder.is_paid" type="button"
                          class="btn btn-primary mt-3">修改付款狀態</button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <h3 class="mb-3">選購商品</h3>
                <table class="bg-light w-100">
                  <tbody v-if="tempOrder.products">
                    <tr v-for="product in tempOrder.products" :key="product.id">
                      <th>
                        {{ product.product.title }}
                      </th>
                      <th>{{ product.qty }} / {{ product.product.unit }}</th>
                      <th> {{ currency(product.final_total) }} </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="initUserControl" type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button @click="updateOrder" type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/misxins/modalMixins';

export default {
  mixins: [modalMixin],
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['emit-update-order'],
  data() {
    return {
      tempOrder: {},
      userControl: {
        name: true,
        email: true,
        tel: true,
        address: true,
      },
    };
  },
  watch: {
    order() {
      this.tempOrder = { ...this.order };
    },
  },
  inject: ['toNormalTime', 'toTimestamp', 'currency'],
  methods: {
    updateOrder() {
      this.$emit('emit-update-order', this.tempOrder);
    },
    initUserControl() {
      this.userControl = {
        name: true,
        email: true,
        tel: true,
        address: true,
      };
    },
  },
};
</script>
