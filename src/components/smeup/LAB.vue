<template>
  <h1>
    {{ this.component.data[0].value }}
  </h1>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BasicComponent from "@/components/Basic.vue"; // @ is an alias to /src

@Component
export default class LAB extends BasicComponent {
  protected name = "LAB";
}
</script>
