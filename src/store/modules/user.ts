import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

interface User {
  name: string;
  password: string;
}

@Module({
  namespaced: true
})
export default class UserLogged extends VuexModule {
  user: User = {
    name: "",
    password: ""
  };

  @Mutation
  SET_USER(user: User) {
    console.log("SET_USER: ", user);
    this.user = user;
  }

  @Action({ commit: "SET_USER" })
  setUser(user: User) {
    return user;
  }
  get getUser() {
    return this.user;
  }

  get isLogged(): boolean {
    return (
      this.user &&
      this.user.name != null &&
      this.user.name != "" &&
      this.user.password != null &&
      this.user.password != ""
    );
  }
}
