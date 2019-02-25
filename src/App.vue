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
    <Renderer :scheda="jsonProva"></Renderer>
    -->
    <Renderer :scheda="jsonProva"></Renderer>
  </div>
</template>

<script>
import Renderer from './components/Renderer.vue';
import parser from './parser/parser.js';
import jsonScheda from './provaScheda.json'

/*
     template: `<div><button>ciao</button><button>a tutti</button><Bottoniera :buttons="[{message:'primo'},{message:'secondo'},{message:'terzo'}]"></Bottoniera></div>`
*/
export default {
  mounted() {
    //this.myTemplate = this.callParser(jsonScheda)
    //this.jsonProva.component.template = this.callParser(jsonScheda)
  },
  data: function () {
    /**/
    return { 
      //myTemplate: `<div><button>ciao</button><button>a tutti</button><vaadin-text-field label="First Name" :value="'Armando'"></vaadin-text-field></div>`,
      jsonProva: {
                    component: { 
                      template : "<button>ciao</button>"
                    } 
                  }
      }
/**/
    /**
    jsonProva: return parser(jsonScheda)
    return {
      jsonProva: {
                    component: { 
                      template: `<div><button>ciao</button><button>a tutti</button><vaadin-text-field label="First Name" :value="'Armando'"></vaadin-text-field></div>`
                      } 
                  }
    }
    /**/
  },  
  name: 'app',
  components: {
    Renderer,
  },
  methods: {
    callParser(scheda) {
      parser(scheda)
    }
  },
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