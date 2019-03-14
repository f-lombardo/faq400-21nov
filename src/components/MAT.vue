<template>
  <p>
    MATRICE {{ this.component.title }}
  </p>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue'; // @ is an alias to /src

@Component
export default class MAT extends BasicComponent {
  protected name = 'MAT';
}
</script>