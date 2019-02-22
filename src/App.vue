<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="100">
    <!-- 
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <!-- 
    <Renderer :scheda="{ componente: 'button' }"></Renderer>
    <Renderer :scheda="{ name: 'pulsante', component: { template: '<button>ciao</button>' } }"></Renderer>

                      template: `<div><button>ciao</button><Renderer :scheda="{ component: { template: '<button>secondo</button>' } }"></Renderer></div>` 
    <Bottoniera :buttons="[{message:'primo'},{message:'secondo'},{message:'terzo'}]"></Bottoniera>
    -->
    <Renderer :scheda="jsonProva"></Renderer>
  </div>
</template>

<script>
import Renderer from './components/Renderer.vue';
import Bottoniera from './components/Bottoniera.vue';

export default {
  data: function () {
    return {
      jsonProva: {
                    component: { 
                      template: `<div><button>ciao</button><button>a tutti</button><Bottoniera :buttons="[{message:'primo'},{message:'secondo'},{message:'terzo'}]"></Bottoniera></div>`
                      } 
                  }
    }
  },  
  name: 'app',
  components: {
    Renderer,
    Bottoniera
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>