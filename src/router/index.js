import Vue from 'vue';
import Router from 'vue-router';
import Store from '../components/Store.vue';
import Details from '../components/Details.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: '/store',
    },
    {
      path: '/store',
      name: 'Store',
      meta: {
        title: () => {
          return 'Store';
        },
      },
      component: Store,
      children: [
        {
          path: 'main/:mainitem',
          component: Details,
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title(to);
  }
  next();
});

export default router;
