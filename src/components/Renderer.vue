<template>
  <div>
    <!--
    <button>{{ scheda.componente }}</button>
    -->
    <component v-bind:is="scheda.component"></component>      
  </div>
</template>
<script>

import Bottoniera from './Bottoniera.vue';

export default {
  /**/
  props: {
    scheda: {
      type : Object
    }
  },
  computed: {
    currentComponent: function () {
      return this.scheda.component;
    }
  },
  components: {
    Bottoniera
  }
    /*
    data: function () {
      return {
        scheda: scheda
      }
    },
        scheda: {componente: 'prova'}
    methods: {
      setScheda(scheda) {
        this.scheda = scheda
      }
    }
 */ 
}
/*
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
  */
</script>