import store, { State } from "@/store/modules/webup";

const { getters } = store;

describe("mutations", () => {
  let state: State;

  beforeEach(() => {
    state = {
      main: {
        root: {
          id: "",
          loaded: false,
          type: ""
        }
      },
      componentsById: {
        id: {
          component: {
            id: "aaa",
            loaded: true,
            type: "XXX"
          }
        }
      }
    };
  });

  it("getComponentById", () => {
    expect(getters.getComponentById(state)("id")).toEqual({
      component: {
        id: "aaa",
        loaded: true,
        type: "XXX"
      }
    });

    expect(getters.getComponentById(state)("wrong")).toBeUndefined();
  });

  it("getRoot", () => {
    const root = getters.getRoot(state);

    expect(root).toEqual({
      id: "",
      loaded: false,
      type: ""
    });
  });

  it("getMain", () => {
    const main = getters.getMain(state);

    expect(main).toEqual({
      root: {
        id: "",
        loaded: false,
        type: ""
      }
    });
  });
});
