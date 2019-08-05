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
    this.$scriptManager
      .getScript("Configuration")
      .then(script => {
        if (script.RESTUrl) {
          Vue.prototype.$SmeUP.GTWFrontend.urls.rest = script.RESTUrl;
          Vue.prototype.$SmeUP.axiosInstance.defaults.baseURL =
            Vue.prototype.$SmeUP.GTWFrontend.urls.rest;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
//---- Global style ----
.full-width {
  width: 100%;
}
</style>
