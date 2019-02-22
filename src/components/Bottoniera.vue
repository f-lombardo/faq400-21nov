<template>
    <div>
      <button v-for="(button,index) in buttons" :key="index" style="color:red">
        {{ button.message }}
      </button>
    </div>
</template>
<script>
export default {
  props: {
    buttons: Array,
    horizontal: Boolean
  }
}
</script>
