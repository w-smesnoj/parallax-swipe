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
export default router;
