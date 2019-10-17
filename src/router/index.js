import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'explorer',
      component: (r) => require.ensure([], () => r(require('../pages/HalExplorerPage.vue').default))
    },
    {
      path: '/*',
      redirect: 'explorer'
    }
  ]
});
