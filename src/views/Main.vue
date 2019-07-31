<template>
  <div>
    <component :is="root.type" :component="root" :key="root.id"></component>
    <!--   -->
    <smeup-message
      :visible="getMessageVisible()"
      :message="getMessage()"
      @onShowFalse="setMessageVisible(false)"
    ></smeup-message>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import smeupMessage from "@/components/Message.vue";

import Message from "@/classes/Message";

@Component({
  components: {
    smeupMessage
  }
})
export default class Main extends Vue {
  public root: any = "";
  public message: Message = new Message(null);
  public messageVisible: boolean = false;

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

  public getMessage(): Message {
    return this.message;
  }
  public setMessage(message: Message): void {
    this.message = message;
    this.messageVisible = true;
  }
  public getMessageVisible(): boolean {
    return this.messageVisible;
  }
  public setMessageVisible(visible: boolean) {
    this.messageVisible = visible;
  }
}
</script>
