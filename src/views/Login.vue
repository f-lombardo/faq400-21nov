<template>
  <form class="login-form">
    <h1 class="login-title">Sme.UP Gateway</h1>
    <fieldset class="login-container">
      <kup-text-input
        @ketchupTextInputUpdated="onFldChangeUser($event)"
        class="login-field"
        label="Username"
        is-clearable
        :initial-value="this.userValue"
      ></kup-text-input>
      <kup-text-input
        @ketchupTextInputUpdated="onFldChangePwd($event)"
        class="login-field"
        label="Password"
        is-clearable
        input-type="password"
      ></kup-text-input>
      <kup-button
        class="login-button"
        icon-class="mdi mdi-lock"
        label="Login"
        @kupButtonClicked="onClick($event)"
      ></kup-button>
    </fieldset>
    <label class="login-error">{{ message }}</label>
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

  created(): void {
    // console.log("REST URL:", process.env.VUE_APP_SMEUP_REST_URL);
    // console.log("RESET PAGE");
    this.$store.dispatch("webup/clearRoot");
    this.$store.dispatch("user/setUser", {
      user: "",
      password: ""
    });
  }

  private onFldChangeUser($event: CustomEvent): void {
    this.userValue = $event.detail.value;
    // console.log("USER CHANGED", $event.detail);
    this.message = "";
  }

  private onFldChangePwd($event: CustomEvent): void {
    this.pwdValue = $event.detail.value;
    // console.log("PWD CHANGED", $event.detail);
    this.message = "";
  }

  private onClick($event: CustomEvent): void {
    this.message = "";
    if (this.userValue == "admin" && this.pwdValue == "admin123") {
      this.$store
        .dispatch("user/setUser", {
          name: this.userValue,
          password: this.pwdValue
        })
        .then(() => {
          // console.log("LOGGED IN");
          this.$router.push("/");
        });
    } else {
      this.message = "Username or password incorrect";
    }
  }
}
</script>
