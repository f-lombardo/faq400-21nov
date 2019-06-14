<style>
form {
  display: table; /* shrinks to fit content */
  margin: auto;
  text-align: right;
  padding: 4px;
}
fieldset {
  padding: 4px;
}
</style>

<template>
  <form>
    <h1 style="text-align:left;padding-bottom:4px;">Sme.UP Gateway</h1>
    <fieldset>
      <kup-text-input
        @ketchupTextInputUpdated="onFldChangeUser($event)"
        label="USER"
        is-clearable
        :initial-value="this.userValue"
      ></kup-text-input>
      <br />
      <br />
      <kup-text-input
        @ketchupTextInputUpdated="onFldChangePwd($event)"
        label="PASSWORD"
        is-clearable
      ></kup-text-input>
      <br />
      <br />
      <kup-button
        label="LOGIN"
        @ketchupButtonClicked="onClick($event)"
      ></kup-button>
    </fieldset>
    <label style="text-align:left;color:red;padding:4px;">{{ message }}</label>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store/store";

@Component
export default class Main extends Vue {
  private userValue: string = "admin";
  private pwdValue: string = "";
  private message: string = "";

  // TODO Logout
  beforeMount() {
    console.log("RESET PAGE");
    //reset status
    this.$store.dispatch("user/setUser", {
      name: "",
      password: ""
    });
  }

  private onFldChangeUser($event: CustomEvent) {
    this.userValue = $event.detail.value;
    console.log("USER CHANGED", $event.detail);
    this.message = "";
  }
  private onFldChangePwd($event: CustomEvent) {
    this.pwdValue = $event.detail.value;
    console.log("PWD CHANGED", $event.detail);
    this.message = "";
  }

  private onClick($event: CustomEvent) {
    this.message = "";
    if (this.userValue == "admin" && this.pwdValue == "admin123") {
      var xxx = this.$store
        .dispatch("user/setUser", {
          name: this.userValue,
          password: this.pwdValue
        })
        .then(() => {
          console.log("LOGGED IN");
          this.$router.push("/");
        });
    } else {
      this.message = "WRONG CREDENTIALS SUPPLIED";
    }
  }
}
</script>
