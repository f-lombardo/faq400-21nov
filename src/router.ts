import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";

import store from "./store/store";

Vue.use(Router);

// mode: 'history',
export default new Router({
  base: "./",
  routes: [
    {
      path: "/",
      component: Login,
      alias: "/login"
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      beforeEnter(to, from, next) {
        if (store.getters["user/isLogged"]) {
          next();
        } else {
          next("/");
        }
      }
    }
  ]
});
