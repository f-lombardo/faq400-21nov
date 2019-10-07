import { shallowMount } from "@vue/test-utils";
import SEC from "@/components/smeup/SEC.vue";
import MAT from "@/components/smeup/MAT.vue";

describe("SEC", () => {
  it("has no sections or component", () => {
    const sec = shallowMount(SEC, {
      propsData: {
        section: {}
      }
    });

    expect(sec.text()).toEqual("Non ci sono componenti in questa scheda");
  });

  it("renders a single component", () => {
    const sec = shallowMount(SEC, {
      components: { MAT },
      propsData: {
        section: {
          components: [
            {
              type: "EXB",
              id: "",
              title: "",
              loaded: false,
              fun: "F(EXD;A37;LIST)",
              data: {},
              messages: [],
              actions: {},
              variables: [],
              dynamisms: []
            }
          ]
        }
      }
    });

    expect(sec.contains(MAT)).toBe(true);
  });

  it("renders multiple components", () => {
    // TODO update vuetify first
  });

  it("renders sections (column layout)", () => {
    const sec = shallowMount(SEC, {
      propsData: {
        section: {
          sections: [
            {
              components: [
                {
                  type: "EXB",
                  id: "ID1",
                  title: "",
                  loaded: false,
                  fun: "",
                  data: {},
                  messages: [],
                  actions: {},
                  variables: [],
                  dynamisms: []
                }
              ]
            },
            {
              components: [
                {
                  type: "EXB",
                  id: "ID2",
                  title: "",
                  loaded: false,
                  fun: "",
                  data: {},
                  messages: [],
                  actions: {},
                  variables: [],
                  dynamisms: []
                }
              ]
            }
          ]
        }
      }
    });

    const sections = sec.findAll(".section");
    expect(sections).toHaveLength(2);
    expect(sections.at(0).html()).toBe(
      `<div class="section"><div class="section"><sec-stub section="[object Object]"></sec-stub><sec-stub section="[object Object]"></sec-stub></div></div>`
    );
  });

  it("renders sections (row layout)", () => {
    const sec = shallowMount(SEC, {
      propsData: {
        section: {
          layout: "row",
          sections: [
            {
              components: [
                {
                  type: "EXB",
                  id: "ID1",
                  title: "",
                  loaded: false,
                  fun: "",
                  data: {},
                  messages: [],
                  actions: {},
                  variables: [],
                  dynamisms: []
                }
              ]
            },
            {
              components: [
                {
                  type: "EXB",
                  id: "ID2",
                  title: "",
                  loaded: false,
                  fun: "",
                  data: {},
                  messages: [],
                  actions: {},
                  variables: [],
                  dynamisms: []
                }
              ]
            }
          ]
        }
      }
    });

    const sections = sec.findAll(".section");
    expect(sections).toHaveLength(2);
    expect(sections.at(0).html()).toBe(
      `<div class="section"><div class="section row"><sec-stub section="[object Object]"></sec-stub><sec-stub section="[object Object]"></sec-stub></div></div>`
    );
  });
});
