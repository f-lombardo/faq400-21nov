<template>
  <div >
    <!--
      v-html="scheda.component.template"
    <button>{{ scheda.componente }}</button>
    <v-html></v-html>
    <component v-bind:is="scheda.component"></component>      
    -->
    <h1>{{ this.scheda }}</h1>
    <component :is="scheda.component"></component>      
  </div>
</template>
<script>

//import Bottoniera from './Bottoniera.vue';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';

export default {
  /**/
  props: {
    scheda: {
      type : Object
    }
  },
  /*
  computed: {
    currentComponent: function () {
      return this.scheda.component;
    }
  },
  components: {
    Bottoniera
  }
  */
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