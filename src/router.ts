import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

// mode: 'history',
export default new Router({
  base: './',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
  ],
});
