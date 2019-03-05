<template>
    <component
      :is="this.getMainComponentType()"
      :component="this.getMainComponent()">
    </component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// TODO
const script = require('@/script.json');

@Component
export default class Main extends Vue {

  private script: any;

  private created() {
    // get json via REST
    this.script = script;
  }

  private getMainComponent() {
    return this.script;
  }

  private getMainComponentType() {
    return this.script.type;
  }

}
</script>