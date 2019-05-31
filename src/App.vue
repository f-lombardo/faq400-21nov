<template>
  <!-- The custom attribute data-app is mandatory for Vuetify
    This attribute is basically what the v-app component does.
    https://vuetifyjs.com/en/framework/default-markup
   -->
  <div id="app" data-app>
    <router-view />
  </div>
</template>

<style lang="scss">
//---- Global style ----
.full-width {
  width: 100%;
}
</style>
