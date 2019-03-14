<template>
  <p>
    LABEL {{ this.component.data[0].value }}
  </p>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue'; // @ is an alias to /src

@Component
export default class LAB extends BasicComponent {
  protected name = 'LAB';
}
</script>