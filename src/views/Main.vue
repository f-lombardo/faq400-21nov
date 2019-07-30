<template>
  <div>
    <component :is="root.type" :component="root" :key="root.id"></component>
    <!--   -->
    <smeup-message
      :visible="this.message.visible"
      :text="this.message.text"
      @onShowFalse="
        setMessage({
          visible: false
        })
      "
    ></smeup-message>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import smeupMessage from "@/components/Message.vue";

import Message from "../interfaces/Message";

@Component({
  components: {
    smeupMessage
  }
})
export default class Main extends Vue {
  public root: any = "";
  public message: Message = {
    text: "",
    visible: false
  };

  private created() {
    // get script
    this.$scriptManager
      .getScript("Start")
      .then(script => {
        this.root = script;
      })
      .catch(err => {
        console.log(err);
      });
    // save main in store
    this.$store.dispatch("webup/setMain", this);
  }

  public setMessage(message: Message): void {
    this.message = message;
  }
}
</script>
