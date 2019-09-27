import store, { State } from "@/store/modules/webup";

const { mutations } = store;

describe("mutations", () => {
  let state: State;

  beforeEach(() => {
    state = {
      main: {
        root: {
          id: "webup",
          type: "WUP",
          loaded: true,
          variables: {}
        }
      },
      componentsById: {}
    };
  });

  it("clearRoot", () => {
    // faking new root
    state.main.root = {
      id: "fakeroot",
      loaded: false,
      type: "ASD"
    };

    expect(state).toEqual({
      main: {
        root: {
          id: "fakeroot",
          loaded: false,
          type: "ASD"
        }
      },
      componentsById: {}
    });

    mutations.clearRoot(state);

    expect(state).toEqual({
      main: {
        root: {
          id: "webup",
          type: "WUP",
          loaded: true,
          variables: {}
        }
      },
      componentsById: {}
    });
  });

  it("setRoot", () => {
    mutations.setRoot(state, {
      id: "myTestRoot",
      loaded: false,
      type: "WUP",
      variables: {
        pippo: "pluto"
      }
    });

    expect(state).toEqual({
      main: {
        root: {
          id: "myTestRoot",
          loaded: false,
          type: "WUP",
          variables: {
            pippo: "pluto"
          }
        }
      },
      componentsById: {}
    });
  });

  it("setMain", () => {
    mutations.setMain(state, {
      root: {
        id: "newRoot",
        loaded: false,
        type: "KEK"
      }
    });

    expect(state).toEqual({
      main: {
        root: {
          id: "newRoot",
          loaded: false,
          type: "KEK"
        }
      },
      componentsById: {}
    });
  });

  it("addComponent", () => {
    const compToAdd = {
      component: {
        id: "pippo",
        loaded: true,
        type: "EXD"
      }
    };

    mutations.addComponent(state, compToAdd);

    expect(state).toEqual({
      main: {
        root: {
          id: "webup",
          type: "WUP",
          loaded: true,
          variables: {}
        }
      },
      componentsById: {
        pippo: {
          component: {
            id: "pippo",
            loaded: true,
            type: "EXD"
          }
        }
      }
    });
  });

  it("removeComponent", () => {
    const id = "myCompId";
    const component = {
      component: {
        id,
        loaded: true,
        type: "EXD"
      }
    };

    state.componentsById[id] = component;

    expect(state).toEqual({
      main: {
        root: {
          id: "webup",
          type: "WUP",
          loaded: true,
          variables: {}
        }
      },
      componentsById: {
        myCompId: {
          component: {
            id,
            loaded: true,
            type: "EXD"
          }
        }
      }
    });

    mutations.removeComponent(state, component);

    expect(state).toEqual({
      main: {
        root: {
          id: "webup",
          type: "WUP",
          loaded: true,
          variables: {}
        }
      },
      componentsById: {}
    });
  });

  it("reloadComponent", () => {
    // TODO: aye aye captain... focaccina is too tired for this
  });

  it("reloadDataComponent", () => {
    // TODO: aye aye captain... focaccina is too tired for this
  });
});
