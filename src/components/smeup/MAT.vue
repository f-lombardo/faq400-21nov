<template>
  <div v-if="this.component && this.component.loaded">
    <h2>{{ this.component.title }}</h2>
    <kup-data-table :data.prop="getData()"></kup-data-table>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BasicComponent from "@/components/Basic.vue"; // @ is an alias to /src

@Component
export default class MAT extends BasicComponent {
  protected name = "MAT";
}
</script>
