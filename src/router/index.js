import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/front/Index.vue'),
    props: (route) => ({ page: route.name }),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/front/Home.vue'),
      },
      {
        path: 'login',
        name: 'FrontLogin',
        component: () => import('../views/front/member/FrontLogin.vue'),
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('../views/front/member/Member.vue'),
      },
      {
        path: 'products/:category?',
        name: 'Products',
        component: () => import('../views/front/product/Products.vue'),
        props: (route) => ({ category: route.query.category }),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/front/product/Product.vue'),
        props: (route) => ({ id: route.params.id }),
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('../views/front/Article.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/About.vue'),
      },
      {
        path: 'questions',
        name: 'Questions',
        component: () => import('../views/front/Questions.vue'),
      },
      {
        path: 'carts',
        name: 'Carts',
        component: () => import('../views/front/carts/Carts.vue'),
        children: [
          {
            path: 'cart',
            name: 'Cart',
            component: () => import('../views/front/carts/Cart.vue'),
          },
          {
            path: 'userForm',
            name: 'UserForm',
            component: () => import('../views/front/carts/UserForm.vue'),
          },
          {
            path: 'order/:id',
            name: 'Order',
            component: () => import('../views/front/carts/Order.vue'),
          },
          {
            path: 'payment/:id',
            name: 'Payment',
            component: () => import('../views/front/carts/Payment.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/adminLogin',
    name: 'Login',
    component: () => import('../views/back/Login.vue'),
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: () => import('../views/back/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'DashBoardProducts',
        component: () => import('../views/back/DashboardProducts.vue'),
      },
      {
        path: 'coupons',
        name: 'DashBoardCoupons',
        component: () => import('../views/back/DashBoardCoupons.vue'),
      },
      {
        path: 'orders',
        name: 'DashBoardOrders',
        component: () => import('../views/back/DashBoardOrders.vue'),
      },
      {
        path: 'articles',
        name: 'DashBoardArticles',
        component: () => import('../views/back/DashBoardArticles.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
