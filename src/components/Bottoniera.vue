<template>
    <div>
      <button v-for="(button,index) in buttons" :key="index" style="color:red">
        {{ button.message }}
      </button>
    </div>
</template>
<script>
export default {
  name : 'bottoniera',
  props: {
    buttons: {
      default: () => ([]),
      type: Array
    },
    horizontal: {
      default: true,
      type: Boolean
    }
  }  
}
</script>