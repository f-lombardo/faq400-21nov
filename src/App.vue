<template>
  <!-- The custom attribute data-app is mandatory for Vuetify
    This attribute is basically what the v-app component does.
    https://vuetifyjs.com/en/framework/default-markup
  -->
  <div id="app" data-app>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  created() {
    // get script
    /*
    this.$scriptManager
      .getScript("Configuration")
      .then(script => {
        if (script.RESTUrl) {
          Vue.prototype.$SmeUP.FAQ400Nov21.urls.rest = script.RESTUrl;
          Vue.prototype.$SmeUP.axiosInstance.defaults.baseURL =
            Vue.prototype.$SmeUP.FAQ400Nov21.urls.rest;
        }
      })
      .catch(err => {
        console.log(err);
      });
    */
    Vue.prototype.$SmeUP.axiosInstance.defaults.baseURL =
      Vue.prototype.$SmeUP.FAQ400Nov21.urls.rest;
  }
};
</script>

<style lang="scss">
@import "/style/_style.scss";
</style>
